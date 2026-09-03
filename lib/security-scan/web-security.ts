export type WebSecurityFinding = {
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low" | "Info";
  category: "Headers" | "Cookies" | "CORS" | "HTTP" | "Information Disclosure" | "Client-Side" | "Configuration";
  description: string;
  evidence: string;
  location: string;
  confidence: "High" | "Medium";
  remediation?: string;
  cwe?: string;
  owasp?: string;
};

export type WebSecurityAnalysis = {
  score: number;
  findings: WebSecurityFinding[];
  headers: Record<string, string | null>;
  cookies: Array<{ name: string; secure: boolean; httpOnly: boolean; sameSite: string | null }>;
  cors: { allowOrigin: string | null; allowCredentials: boolean; risky: boolean };
  methods: string[];
  mixedContent: string[];
  disclosure: string[];
};

const securityHeaders = [
  ["content-security-policy", "Content Security Policy", "High"],
  ["strict-transport-security", "Strict Transport Security", "Medium"],
  ["x-content-type-options", "Content Type Protection", "Low"],
  ["x-frame-options", "Frame Protection", "Medium"],
  ["referrer-policy", "Referrer Policy", "Low"],
  ["permissions-policy", "Permissions Policy", "Low"],
  ["cross-origin-opener-policy", "Cross-Origin Opener Policy", "Low"],
  ["cross-origin-resource-policy", "Cross-Origin Resource Policy", "Low"],
] as const;

function add(findings: WebSecurityFinding[], finding: WebSecurityFinding) { findings.push(finding); }
function parseCookies(headers: Headers) {
  return (headers.getSetCookie?.() ?? []).map((value) => {
    const parts = value.split(";").map((part) => part.trim());
    const name = parts[0]?.split("=")[0] || "unknown";
    const lower = value.toLowerCase();
    const sameSite = parts.find((part) => part.toLowerCase().startsWith("samesite="))?.split("=")[1] ?? null;
    return { name, secure: lower.includes("; secure"), httpOnly: lower.includes("; httponly"), sameSite };
  });
}

export function analyzeWebSecurity(url: URL, headers: Headers, html: string, status: number): WebSecurityAnalysis {
  const findings: WebSecurityFinding[] = [];
  const headerValues: Record<string, string | null> = {};
  let score = 100;

  for (const [header, name, severity] of securityHeaders) {
    const value = headers.get(header);
    headerValues[header] = value;
    if (!value) {
      score -= severity === "High" ? 10 : severity === "Medium" ? 6 : 3;
      add(findings, { title: `${name} header missing`, severity, category: "Headers", description: `The ${name} response header is not present.`, evidence: header, location: url.toString(), confidence: "High", remediation: `Configure ${header} for production responses.` });
    }
  }

  const csp = headers.get("content-security-policy") || "";
  if (/unsafe-inline|unsafe-eval/i.test(csp)) {
    score -= 5;
    add(findings, { title: "Weak Content Security Policy", severity: "Medium", category: "Headers", description: "The Content Security Policy permits unsafe script execution directives.", evidence: csp.slice(0, 500), location: url.toString(), confidence: "High", remediation: "Replace unsafe-inline/unsafe-eval with nonces, hashes, or stricter sources.", cwe: "CWE-693" });
  }
  if (csp && /(?:^|;|\s)script-src\s+[^;]*(?:\*|https?:\/\/[^\s;]+)/i.test(csp)) {
    score -= 3;
    add(findings, { title: "Broad script source in CSP", severity: "Low", category: "Headers", description: "The script policy contains a broad wildcard or unrestricted remote source.", evidence: csp.slice(0, 500), location: url.toString(), confidence: "Medium", remediation: "Allow only the specific script origins required by the application." });
  }

  const hsts = headers.get("strict-transport-security") || "";
  if (url.protocol === "https:" && hsts && !/max-age=\d{6,}/i.test(hsts)) {
    score -= 4;
    add(findings, { title: "Weak HSTS configuration", severity: "Low", category: "Headers", description: "HSTS is present but its max-age is shorter than a strong production baseline.", evidence: hsts, location: url.toString(), confidence: "Medium", remediation: "Use a long-lived HSTS max-age and consider includeSubDomains after validating subdomains." });
  }

  const server = headers.get("server");
  const poweredBy = headers.get("x-powered-by");
  if (server || poweredBy) add(findings, { title: "Server technology disclosure", severity: "Low", category: "Information Disclosure", description: "Response headers disclose server or framework implementation details.", evidence: [server && `Server: ${server}`, poweredBy && `X-Powered-By: ${poweredBy}`].filter(Boolean).join(" | "), location: url.toString(), confidence: "High", remediation: "Remove unnecessary implementation details from public response headers." });

  const contentType = headers.get("content-type") || "";
  if (status >= 200 && status < 300 && !contentType) add(findings, { title: "Successful response lacks Content-Type", severity: "Low", category: "Configuration", description: "The target returned a successful response without a Content-Type header.", evidence: `HTTP ${status}`, location: url.toString(), confidence: "High", remediation: "Return an accurate Content-Type for every successful response." });

  const cacheControl = headers.get("cache-control") || "";
  if (/text\/html/i.test(contentType) && !cacheControl) add(findings, { title: "HTML caching policy not explicit", severity: "Info", category: "Configuration", description: "The HTML response does not expose an explicit Cache-Control policy.", evidence: "Cache-Control: absent", location: url.toString(), confidence: "Medium", remediation: "Define caching behavior explicitly, especially for authenticated or personalized pages." });

  const cookies = parseCookies(headers);
  for (const cookie of cookies) {
    if (url.protocol === "https:" && !cookie.secure) { score -= 5; add(findings, { title: `Cookie missing Secure flag: ${cookie.name}`, severity: "Medium", category: "Cookies", description: "A cookie is set without Secure on an HTTPS site.", evidence: cookie.name, location: url.toString(), confidence: "High", remediation: "Set Secure on cookies transmitted only over HTTPS." }); }
    if (!cookie.httpOnly && /session|auth|token|sid/i.test(cookie.name)) { score -= 8; add(findings, { title: `Sensitive cookie missing HttpOnly: ${cookie.name}`, severity: "High", category: "Cookies", description: "A cookie that appears related to authentication or sessions can be accessed by client-side JavaScript.", evidence: cookie.name, location: url.toString(), confidence: "Medium", remediation: "Set HttpOnly for server-managed authentication/session cookies." }); }
    if (!cookie.sameSite) { score -= 3; add(findings, { title: `Cookie missing SameSite attribute: ${cookie.name}`, severity: "Low", category: "Cookies", description: "The cookie does not explicitly declare a SameSite policy.", evidence: cookie.name, location: url.toString(), confidence: "High", remediation: "Set SameSite=Lax or Strict unless cross-site behavior is intentionally required." }); }
  }

  const allowOrigin = headers.get("access-control-allow-origin");
  const allowCredentials = /^true$/i.test(headers.get("access-control-allow-credentials") || "");
  const riskyCors = allowOrigin === "*" || (allowCredentials && !!allowOrigin);
  if (riskyCors) { score -= allowCredentials && allowOrigin === "*" ? 15 : 7; add(findings, { title: "Potentially permissive CORS policy", severity: allowCredentials && allowOrigin === "*" ? "High" : "Medium", category: "CORS", description: "The response exposes a broad cross-origin policy that may be unsafe for sensitive resources.", evidence: `Access-Control-Allow-Origin: ${allowOrigin}; credentials: ${allowCredentials}`, location: url.toString(), confidence: "Medium", remediation: "Allow only trusted origins and credentials where required." }); }

  const methods = (headers.get("allow") || headers.get("access-control-allow-methods") || "").split(",").map((method) => method.trim().toUpperCase()).filter(Boolean);
  if (methods.includes("TRACE")) { score -= 5; add(findings, { title: "TRACE method advertised", severity: "Medium", category: "HTTP", description: "The target advertises TRACE, which is normally unnecessary for production applications.", evidence: methods.join(", "), location: url.toString(), confidence: "High", remediation: "Disable TRACE unless there is a documented operational need." }); }

  const mixedContent: string[] = [];
  if (url.protocol === "https:") {
    const resourcePattern = /(?:src|href|action|poster)\s*=\s*["'](http:\/\/[^"']+)["']/gi;
    let match: RegExpExecArray | null;
    while ((match = resourcePattern.exec(html)) && mixedContent.length < 20) mixedContent.push(match[1]);
    if (mixedContent.length) { score -= Math.min(10, mixedContent.length * 2); add(findings, { title: "Mixed content detected", severity: "Medium", category: "Configuration", description: "The HTTPS page references resources over unencrypted HTTP.", evidence: mixedContent.slice(0, 5).join(" | "), location: url.toString(), confidence: "High", remediation: "Serve all page resources over HTTPS." }); }
  }

  const disclosure: string[] = [];
  if (/stack trace|stacktrace|exception|syntaxerror|referenceerror|fatal error|traceback/i.test(html)) disclosure.push("Possible application error details");
  if (/node_modules\//i.test(html)) disclosure.push("node_modules path reference");
  if (/\/home\/[^\s"'<]+/i.test(html)) disclosure.push("Unix home-directory path reference");
  if (/\b(?:DEBUG|development|devMode)\s*[:=]\s*(?:true|1)\b/i.test(html)) disclosure.push("Possible debug-mode indicator");
  if (disclosure.length) { score -= 8; add(findings, { title: "Potential information disclosure", severity: "Medium", category: "Information Disclosure", description: "Public response content appears to contain implementation or diagnostic details.", evidence: disclosure.join(" | "), location: url.toString(), confidence: "Medium", remediation: "Disable production diagnostics and remove internal paths and verbose errors from public responses." }); }
  if (status >= 500) add(findings, { title: "Server error exposed to scanner", severity: "Medium", category: "Information Disclosure", description: "The target returned a server-side error response during the assessment.", evidence: `HTTP ${status}`, location: url.toString(), confidence: "High", remediation: "Review server logs and return a controlled production error response." });

  return { score: Math.max(0, Math.min(100, score)), findings, headers: headerValues, cookies, cors: { allowOrigin, allowCredentials, risky: riskyCors }, methods, mixedContent, disclosure };
}
