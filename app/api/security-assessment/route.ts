import { NextResponse } from "next/server";
import { rateLimit, rateLimitedResponse } from "@/lib/rate-limit";
import { analyzeHeaders } from "@/lib/headers";
import { calculateSecurityScore } from "@/lib/scoring";
import { analyzeSSL } from "@/lib/ssl";
import { analyzeDomain } from "@/lib/domain";
import { analyzeTechnology } from "@/lib/technology";
import { analyzeDNS } from "@/lib/dns";
import { analyzeExposure } from "@/lib/security-scan/exposure";

const MAX_URL_LENGTH = 2048;
const MAX_RESPONSE_BYTES = 2_000_000;
const REQUEST_TIMEOUT_MS = 12_000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function isPrivateIpv4(hostname: string) {
  const parts = hostname.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return false;
  const [a, b] = parts;
  return a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && (b === 0 || b === 168)) || (a === 198 && b >= 18 && b <= 19);
}
function isPrivateIpv6(hostname: string) {
  const value = hostname.toLowerCase();
  return value === "::1" || value === "::" || value.startsWith("fc") || value.startsWith("fd") || value.startsWith("fe8") || value.startsWith("fe9") || value.startsWith("fea") || value.startsWith("feb") || value.startsWith("ff");
}
function isBlockedHostname(hostname: string) {
  const normalized = hostname.toLowerCase().replace(/\.$/, "");
  return normalized === "localhost" || normalized.endsWith(".localhost") || normalized.endsWith(".local") || normalized.endsWith(".internal") || isPrivateIpv4(normalized) || isPrivateIpv6(normalized);
}
function validateTarget(input: unknown): URL {
  if (typeof input !== "string" || !input.trim() || input.length > MAX_URL_LENGTH) throw new Error("INVALID_TARGET");
  const target = new URL(/^https?:\/\//i.test(input.trim()) ? input.trim() : `https://${input.trim()}`);
  if (target.protocol !== "http:" && target.protocol !== "https:") throw new Error("INVALID_PROTOCOL");
  if (target.username || target.password) throw new Error("CREDENTIALS_NOT_ALLOWED");
  if (target.port && target.port !== "80" && target.port !== "443") throw new Error("PORT_NOT_ALLOWED");
  if (isBlockedHostname(target.hostname)) throw new Error("BLOCKED_TARGET");
  return target;
}
async function readLimitedBody(response: Response) {
  const contentLength = response.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_RESPONSE_BYTES) throw new Error("RESPONSE_TOO_LARGE");
  if (!response.body) return "";
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_RESPONSE_BYTES) throw new Error("RESPONSE_TOO_LARGE");
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { merged.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(merged);
}

export async function POST(request: Request) {
  try {
    const limit = rateLimit(request, "security-assessment", RATE_LIMIT, RATE_WINDOW_MS);
    if (!limit.allowed) return rateLimitedResponse(limit.retryAfter);
    const contentLength = request.headers.get("content-length");
    if (contentLength && Number.isFinite(Number(contentLength)) && Number(contentLength) > 16 * 1024) return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return NextResponse.json({ error: "Invalid request format." }, { status: 415 });
    const body = await request.json();
    const targetUrl = validateTarget(body?.url);
    const target = targetUrl.toString();
    const hostname = targetUrl.hostname;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const sslAnalysis = await analyzeSSL(target);
      const domainAnalysis = await analyzeDomain(hostname);
      const dnsAnalysis = await analyzeDNS(hostname);
      const response = await fetch(target, { method: "GET", headers: { "User-Agent": "OLYR-SecureScan-Enterprise" }, redirect: "error", signal: controller.signal });
      const html = await readLimitedBody(response);
      const headerAnalysis = analyzeHeaders(response.headers);
      const technologyAnalysis = analyzeTechnology(response.headers, html);
      const exposureAnalysis = await analyzeExposure(targetUrl, controller.signal).catch((error) => ({ findings: [], discoveredUrls: [], scannedUrls: [], error: error instanceof Error ? error.message : "unknown" }));
      const httpsScore = targetUrl.protocol === "https:" ? 100 : 40;
      const sslScore = sslAnalysis.valid ? (sslAnalysis.daysRemaining > 30 ? 100 : 70) : 20;
      const technologyScore = technologyAnalysis.technologies.length > 0 ? 90 : 60;
      const websiteScore = calculateSecurityScore([httpsScore, headerAnalysis.score, sslScore, domainAnalysis.score, dnsAnalysis.score, technologyScore]);
      const findings = [...headerAnalysis.findings, ...dnsAnalysis.findings, ...exposureAnalysis.findings];
      if (!sslAnalysis.valid) findings.push({ title: "SSL Certificate", severity: "High", description: "Unable to verify SSL certificate." });
      if (sslAnalysis.valid && sslAnalysis.daysRemaining < 30) findings.push({ title: "SSL Certificate Expiration", severity: "Medium", description: `Certificate expires in ${sslAnalysis.daysRemaining} days.` });
      if (!domainAnalysis.emailSecurity.SPF) findings.push({ title: "Missing SPF Record", severity: "Medium", description: "Domain does not have SPF email protection configured." });
      if (!domainAnalysis.emailSecurity.DMARC) findings.push({ title: "Missing DMARC Protection", severity: "Medium", description: "Domain does not have DMARC email authentication configured." });
      return NextResponse.json({ target, overview: { overallScore: websiteScore, grade: websiteScore >= 90 ? "Excellent" : websiteScore >= 75 ? "Good" : websiteScore >= 50 ? "Needs Improvement" : "Critical" }, categories: { websiteSecurity: websiteScore, infrastructure: sslAnalysis.valid ? 90 : 40, domainSecurity: domainAnalysis.score, technology: technologyScore, dns: dnsAnalysis.score, exposure: exposureAnalysis.findings.length ? 25 : 100 }, ssl: sslAnalysis, domain: domainAnalysis, dns: dnsAnalysis, technology: technologyAnalysis, exposure: { discoveredUrls: exposureAnalysis.discoveredUrls, scannedUrls: exposureAnalysis.scannedUrls, findings: exposureAnalysis.findings.length }, findings, checks: { https: targetUrl.protocol === "https:", status: response.status } }, { headers: { "Cache-Control": "no-store" } });
    } finally { clearTimeout(timeout); }
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const status = ["INVALID_TARGET", "INVALID_PROTOCOL", "CREDENTIALS_NOT_ALLOWED", "BLOCKED_TARGET", "PORT_NOT_ALLOWED"].includes(message) ? 400 : message === "RESPONSE_TOO_LARGE" ? 413 : 502;
    if (message !== "INVALID_TARGET" && message !== "BLOCKED_TARGET") console.error("Security Assessment Error:", error);
    return NextResponse.json({ error: status === 400 ? "Please provide a valid public HTTP(S) website URL." : status === 413 ? "The target response is too large to scan." : "Security assessment failed." }, { status, headers: { "Cache-Control": "no-store" } });
  }
}
