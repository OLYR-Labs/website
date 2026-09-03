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
import { analyzeAttackSurface } from "@/lib/security-scan/attack-surface";
import { validateScanTarget } from "@/lib/security-scan/target";
import { SecurityFinding, calculateRisk, normalizeFinding } from "@/lib/security-scan/risk";

const MAX_RESPONSE_BYTES = 2_000_000;
const REQUEST_TIMEOUT_MS = 15_000;
const REQUEST_BODY_LIMIT = 16 * 1024;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

async function readLimitedBody(response: Response) {
  const contentLength = Number(response.headers.get("content-length") || 0);
  if (contentLength > MAX_RESPONSE_BYTES) throw new Error("RESPONSE_TOO_LARGE");
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
  for (const chunk of chunks) { merged.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(merged);
}

function legacyFinding(finding: { title: string; severity: string; description: string; evidence?: string; location?: string }, category: string): SecurityFinding {
  const severity = ["Critical", "High", "Medium", "Low", "Info"].includes(finding.severity) ? finding.severity as SecurityFinding["severity"] : "Info";
  return normalizeFinding({
    title: finding.title,
    severity,
    category,
    description: finding.description,
    evidence: finding.evidence || finding.title,
    location: finding.location || "target",
    confidence: severity === "Info" ? "Medium" : "High",
  });
}

function categoryScore(values: number[]) {
  const usable = values.filter((value) => Number.isFinite(value));
  if (!usable.length) return 0;
  return Math.round(usable.reduce((sum, value) => sum + value, 0) / usable.length);
}

export async function POST(request: Request) {
  const limit = rateLimit(request, "security-assessment", RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.allowed) return rateLimitedResponse(limit.retryAfter);

  try {
    const contentLength = request.headers.get("content-length");
    if (contentLength && Number.isFinite(Number(contentLength)) && Number(contentLength) > REQUEST_BODY_LIMIT) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return NextResponse.json({ error: "Invalid request format." }, { status: 415 });
    }

    const body = await request.json();
    const targetUrl = await validateScanTarget(body?.url);
    const target = targetUrl.toString();
    const hostname = targetUrl.hostname;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const startedAt = Date.now();

    try {
      const [sslAnalysis, domainAnalysis, dnsAnalysis] = await Promise.all([
        analyzeSSL(target),
        analyzeDomain(hostname),
        analyzeDNS(hostname),
      ]);

      const response = await fetch(target, {
        method: "GET",
        headers: { "User-Agent": "OLYR-SecureScan/3.0", Accept: "text/html,application/xhtml+xml,text/plain,*/*" },
        redirect: "manual",
        signal: controller.signal,
        cache: "no-store",
      });
      const html = await readLimitedBody(response);
      const headerAnalysis = analyzeHeaders(response.headers);
      const webAnalysis = analyzeWebSecurity(targetUrl, response.headers, html, response.status);
      const technologyAnalysis = analyzeTechnology(response.headers, html);
      const attackSurface = await analyzeAttackSurface(targetUrl, controller.signal, html).catch(() => ({ discoveredUrls: [], resources: [], forms: [], scripts: [], apiReferences: [], specialFiles: [], fetchCount: 0 }));
      const exposureAnalysis = await analyzeExposure(targetUrl, controller.signal, html).catch(() => ({ findings: [], discoveredUrls: [], probedUrls: [], exposedUrls: [], scannedUrls: [] }));

      const redirectLocation = response.headers.get("location");
      const httpFindings: SecurityFinding[] = [];
      if (response.status >= 300 && response.status < 400 && redirectLocation) {
        let safeRedirect = false;
        try { safeRedirect = new URL(redirectLocation, targetUrl).origin === targetUrl.origin; } catch {}
        httpFindings.push(normalizeFinding({
          title: safeRedirect ? "HTTP redirect observed" : "Cross-origin redirect observed",
          severity: safeRedirect ? "Info" : "Low",
          category: "HTTP",
          description: safeRedirect ? "The target returned a redirect without SecureScan following it." : "The target redirects to a different origin; review whether this is intentional.",
          evidence: redirectLocation.slice(0, 500),
          location: target,
          confidence: "High",
          remediation: safeRedirect ? "Ensure the redirect destination is intentional and uses HTTPS." : "Review cross-origin redirects and avoid untrusted redirect destinations.",
        }));
      }

      const categoryScores = {
        websiteSecurity: categoryScore([headerAnalysis.score, webAnalysis.score]),
        infrastructure: sslAnalysis.valid ? (sslAnalysis.daysRemaining > 30 ? 100 : 70) : 20,
        domainSecurity: domainAnalysis.score,
        dns: dnsAnalysis.score,
        technology: technologyAnalysis.technologies.length ? 90 : 60,
        exposure: exposureAnalysis.findings.length ? Math.max(0, 100 - exposureAnalysis.findings.length * 12) : 100,
        attackSurface: attackSurface.discoveredUrls.length <= 30 ? 100 : 85,
      };

      const findings: SecurityFinding[] = [
        ...headerAnalysis.findings.map((item) => legacyFinding(item, "Headers")),
        ...webAnalysis.findings.map((item) => normalizeFinding(item)),
        ...dnsAnalysis.findings.map((item) => legacyFinding(item, "DNS")),
        ...exposureAnalysis.findings.map((item) => normalizeFinding(item)),
        ...httpFindings,
      ];

      if (!sslAnalysis.valid) findings.push(normalizeFinding({ title: "SSL certificate could not be verified", severity: "High", category: "TLS", description: "SecureScan could not verify the target certificate.", evidence: "Certificate verification failed", location: target, confidence: "High", remediation: "Install a valid certificate chain matching the hostname." }));
      else if (sslAnalysis.daysRemaining < 30) findings.push(normalizeFinding({ title: "SSL certificate expires soon", severity: "Medium", category: "TLS", description: `The certificate expires in ${sslAnalysis.daysRemaining} days.`, evidence: `${sslAnalysis.daysRemaining} days remaining`, location: target, confidence: "High", remediation: "Renew the certificate before expiration." }));
      if (!domainAnalysis.emailSecurity.SPF) findings.push(normalizeFinding({ title: "Missing SPF record", severity: "Medium", category: "Email Security", description: "The domain does not publish SPF protection.", evidence: "SPF record not confirmed", location: hostname, confidence: "High", remediation: "Publish an SPF policy that authorizes only legitimate sending services." }));
      if (!domainAnalysis.emailSecurity.DMARC) findings.push(normalizeFinding({ title: "Missing DMARC protection", severity: "Medium", category: "Email Security", description: "The domain does not publish a DMARC policy.", evidence: "DMARC record not confirmed", location: hostname, confidence: "High", remediation: "Publish a DMARC policy and progress from monitoring to enforcement after validating legitimate senders." }));

      const risk = calculateRisk(findings, categoryScores);
      const durationMs = Date.now() - startedAt;

      return NextResponse.json({
        target,
        scan: {
          version: "3.0",
          completedAt: new Date().toISOString(),
          durationMs,
          mode: "external-passive-low-impact",
          scope: "single public HTTP(S) origin",
        },
        overview: { overallScore: risk.score, grade: risk.grade, findingCounts: risk.counts },
        categories: categoryScores,
        ssl: sslAnalysis,
        domain: domainAnalysis,
        dns: dnsAnalysis,
        technology: technologyAnalysis,
        webSecurity: webAnalysis,
        attackSurface,
        exposure: {
          discoveredUrls: exposureAnalysis.discoveredUrls,
          probedUrls: exposureAnalysis.probedUrls,
          exposedUrls: exposureAnalysis.exposedUrls,
          scannedUrls: exposureAnalysis.scannedUrls,
          findings: exposureAnalysis.findings.length,
        },
        report: {
          executiveSummary: risk.counts.Critical || risk.counts.High ? "The assessment identified security findings that should be prioritized." : "No high-impact security findings were identified by the enabled checks.",
          recommendations: risk.findings.filter((item) => item.remediation).slice(0, 20).map((item) => ({ title: item.title, remediation: item.remediation, severity: item.severity })),
          compliance: risk.findings.filter((item) => item.owasp || item.cwe).map((item) => ({ title: item.title, owasp: item.owasp || null, cwe: item.cwe || null })),
        },
        findings: risk.findings,
        checks: {
          https: targetUrl.protocol === "https:",
          status: response.status,
          contentType: response.headers.get("content-type"),
          redirect: redirectLocation,
        },
      }, { headers: { "Cache-Control": "no-store" } });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const status = ["INVALID_TARGET", "INVALID_PROTOCOL", "CREDENTIALS_NOT_ALLOWED", "BLOCKED_TARGET", "PORT_NOT_ALLOWED"].includes(message)
      ? 400
      : message === "RESPONSE_TOO_LARGE" ? 413 : message === "BLOCKED_TARGET" ? 400 : 502;
    if (!message || !["INVALID_TARGET", "BLOCKED_TARGET"].includes(message)) console.error("SecureScan error:", error);
    return NextResponse.json({
      error: status === 400 ? "Please provide a valid public HTTP(S) website URL." : status === 413 ? "The target response is too large to scan." : "Security assessment failed.",
    }, { status, headers: { "Cache-Control": "no-store" } });
  }
}
