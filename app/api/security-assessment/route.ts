import { NextResponse } from "next/server";
import { rateLimit, rateLimitedResponse } from "@/lib/rate-limit";
import { analyzeHeaders } from "@/lib/headers";
import { calculateSecurityScore } from "@/lib/scoring";
import { analyzeSSL } from "@/lib/ssl";
import { analyzeDomain } from "@/lib/domain";
import { analyzeTechnology } from "@/lib/technology";
import { analyzeDNS } from "@/lib/dns";
import { analyzeExposure } from "@/lib/security-scan/exposure";
import { analyzeWebSecurity } from "@/lib/security-scan/web-security";

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
  } finally {
    reader.releaseLock();
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}

function scoreFromFindings(base: number, findings: Array<{ severity: string }>) {
  const penalties = { Critical: 30, High: 15, Medium: 7, Low: 3, Info: 0 } as Record<string, number>;
  const penalty = findings.reduce((total, item) => total + (penalties[item.severity] ?? 0), 0);
  return Math.max(0, Math.min(100, base - Math.min(70, penalty)));
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
      const [sslAnalysis, domainAnalysis, dnsAnalysis] = await Promise.all([
        analyzeSSL(target),
        analyzeDomain(hostname),
        analyzeDNS(hostname),
      ]);
      const response = await fetch(target, {
        method: "GET",
        headers: { "User-Agent": "OLYR-SecureScan/2.0" },
        redirect: "error",
        signal: controller.signal,
        cache: "no-store",
      });
      const html = await readLimitedBody(response);
      const headerAnalysis = analyzeHeaders(response.headers);
      const webAnalysis = await analyzeWebSecurity(response, html, targetUrl, controller.signal);
      const technologyAnalysis = analyzeTechnology(response.headers, html);
      const exposureAnalysis = await analyzeExposure(targetUrl, controller.signal).catch(() => ({ findings: [], discoveredUrls: [], probedUrls: [], exposedUrls: [], scannedUrls: [] }));

      const baseScore = calculateSecurityScore([
        targetUrl.protocol === "https:" ? 100 : 40,
        headerAnalysis.score,
        webAnalysis.score,
        sslAnalysis.valid ? (sslAnalysis.daysRemaining > 30 ? 100 : 70) : 20,
        domainAnalysis.score,
        dnsAnalysis.score,
        technologyAnalysis.technologies.length > 0 ? 90 : 60,
      ]);

      const findings = [
        ...headerAnalysis.findings.map((item) => ({ ...item, category: "Headers" })),
        ...webAnalysis.findings,
        ...dnsAnalysis.findings.map((item) => ({ ...item, category: "DNS" })),
        ...exposureAnalysis.findings,
      ];
      if (!sslAnalysis.valid) findings.push({ title: "SSL certificate could not be verified", severity: "High", description: "SecureScan could not verify the target certificate.", category: "TLS" });
      else if (sslAnalysis.daysRemaining < 30) findings.push({ title: "SSL certificate expires soon", severity: "Medium", description: `The certificate expires in ${sslAnalysis.daysRemaining} days.`, category: "TLS" });
      if (!domainAnalysis.emailSecurity.SPF) findings.push({ title: "Missing SPF record", severity: "Medium", description: "The domain does not publish SPF protection.", category: "Email Security" });
      if (!domainAnalysis.emailSecurity.DMARC) findings.push({ title: "Missing DMARC protection", severity: "Medium", description: "The domain does not publish a DMARC policy.", category: "Email Security" });

      const overallScore = scoreFromFindings(baseScore, findings);
      const counts = findings.reduce((acc, item) => { const key = item.severity as keyof typeof acc; if (key in acc) acc[key] += 1; return acc; }, { Critical: 0, High: 0, Medium: 0, Low: 0, Info: 0 });

      return NextResponse.json({
        target,
        overview: {
          overallScore,
          grade: overallScore >= 90 ? "Excellent" : overallScore >= 75 ? "Good" : overallScore >= 50 ? "Needs Improvement" : "Critical",
          findingCounts: counts,
        },
        categories: {
          websiteSecurity: Math.round((headerAnalysis.score + webAnalysis.score) / 2),
          infrastructure: sslAnalysis.valid ? 90 : 40,
          domainSecurity: domainAnalysis.score,
          technology: technologyAnalysis.technologies.length > 0 ? 90 : 60,
          dns: dnsAnalysis.score,
          exposure: exposureAnalysis.findings.length ? Math.max(0, 100 - exposureAnalysis.findings.length * 15) : 100,
        },
        ssl: sslAnalysis,
        domain: domainAnalysis,
        dns: dnsAnalysis,
        technology: technologyAnalysis,
        webSecurity: webAnalysis,
        exposure: {
          discoveredUrls: exposureAnalysis.discoveredUrls,
          probedUrls: exposureAnalysis.probedUrls,
          exposedUrls: exposureAnalysis.exposedUrls,
          scannedUrls: exposureAnalysis.scannedUrls,
          findings: exposureAnalysis.findings.length,
        },
        findings,
        checks: { https: targetUrl.protocol === "https:", status: response.status },
      }, { headers: { "Cache-Control": "no-store" } });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const status = ["INVALID_TARGET", "INVALID_PROTOCOL", "CREDENTIALS_NOT_ALLOWED", "BLOCKED_TARGET", "PORT_NOT_ALLOWED"].includes(message) ? 400 : message === "RESPONSE_TOO_LARGE" ? 413 : 502;
    if (message !== "INVALID_TARGET" && message !== "BLOCKED_TARGET") console.error("Security Assessment Error:", error);
    return NextResponse.json({ error: status === 400 ? "Please provide a valid public HTTP(S) website URL." : status === 413 ? "The target response is too large to scan." : "Security assessment failed." }, { status, headers: { "Cache-Control": "no-store" } });
  }
}
