export type WebSecurityFinding = {
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low" | "Info";
  category: "Headers" | "Cookies" | "CORS" | "HTTP" | "Information Disclosure" | "Client-Side" | "Configuration";
  description: string;
  evidence: string;
  location: string;
  confidence: "High" | "Medium";
};

export type WebSecurityAnalysis = {
  score: number;
  findings: WebSecurityFinding[];
  headers: Record<string, string | null>;
  cookies: Array<{
    name: string;
    secure: boolean;
    httpOnly: boolean;
    sameSite: string | null;
  }>;
  cors: {
    allowOrigin: string | null;
    allowCredentials: boolean;
    risky: boolean;
  };
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
] as const;

function add(findings: WebSecurityFinding[], finding: WebSecurityFinding) {
  findings.push(finding);
}

function parseCookies(headers: Headers) {
  const raw = headers.getSetCookie?.() ?? [];
  return raw.map((value) => {
    const parts = value.split(";").map((part) => part.trim());
    const name = parts[0]?.split("=")[0] || "unknown";
    const lower = value.toLowerCase();
    const sameSite = parts.find((part) => part.toLowerCase().startsWith("samesite="))?.split("=")[1] ?? null;
    return {
      name,
      secure: lower.includes("; secure"),
      httpOnly: lower.includes("; httponly"),
      sameSite,
    };
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
      score -= severity === "High" ? 12 : severity === "Medium" ? 8 : 4;
      add(findings, {
        title: `${name} header missing`, severity, category: "Headers",
        description: `The ${name} response header is not present.`,
        evidence: header, location: url.toString(), confidence: "High",
      });
    }
  }

  const csp = headers.get("content-security-policy") || "";
  if (/unsafe-inline/i.test(csp) || /unsafe-eval/i.test(csp)) {
    score -= 5;
    add(findings, {
      title: "Weak Content Security Policy", severity: "Medium", category: "Headers",
      description: "The Content Security Policy permits unsafe script execution directives.",
      evidence: csp.slice(0, 500), location: url.toString(), confidence: "High",
    });
  }

  const hsts = headers.get("strict-transport-security") || "";
  if (url.protocol === "https:" && hsts && !/max-age=\d{6,}/i.test(hsts)) {
    score -= 4;
    add(findings, {
      title: "Weak HSTS configuration", severity: "Low", category: "Headers",
      description: "HSTS is present but its max-age is shorter than a strong production baseline.",
      evidence: hsts, location: url.toString(), confidence: "Medium",
    });
  }

  const server = headers.get("server");
  const poweredBy = headers.get("x-powered-by");
  if (server || poweredBy) {
    add(findings, {
      title: "Server technology disclosure", severity: "Low", category: "Information Disclosure",
      description: "Response headers disclose server or framework implementation details.",
      evidence: [server && `Server: ${server}`, poweredBy && `X-Powered-By: ${poweredBy}`].filter(Boolean).join(" | "),
      location: url.toString(), confidence: "High",
    });
  }

  const cookies = parseCookies(headers);
  for (const cookie of cookies) {
    if (url.protocol === "https:" && !cookie.secure) {
      score -= 5;
      add(findings, {
        title: `Cookie missing Secure flag: ${cookie.name}`, severity: "Medium", category: "Cookies",
        description: "A cookie is set without the Secure attribute on an HTTPS site.",
        evidence: cookie.name, location: url.toString(), confidence: "High",
      });
    }
    if (!cookie.httpOnly && /session|auth|token|sid/i.test(cookie.name)) {
      score -= 8;
      add(findings, {
        title: `Sensitive cookie missing HttpOnly: ${cookie.name}`, severity: "High", category: "Cookies",
        description: "A cookie that appears related to authentication or sessions can be accessed by client-side JavaScript.",
        evidence: cookie.name, location: url.toString(), confidence: "Medium",
      });
    }
    if (!cookie.sameSite) {
      score -= 3;
      add(findings, {
        title: `Cookie missing SameSite attribute: ${cookie.name}`, severity: "Low", category: "Cookies",
        description: "The cookie does not explicitly declare a SameSite policy.",
        evidence: cookie.name, location: url.toString(), confidence: "High",
      });
    }
  }

  const allowOrigin = headers.get("access-control-allow-origin");
  const allowCredentials = /true/i.test(headers.get("access-control-allow-credentials") || "");
  const riskyCors = allowOrigin === "*" || (allowCredentials && !!allowOrigin);
  if (riskyCors) {
    score -= allowCredentials && allowOrigin === "*" ? 15 : 7;
    add(findings, {
      title: "Potentially permissive CORS policy", severity: allowCredentials && allowOrigin === "*" ? "High" : "Medium", category: "CORS",
      description: "The response permits a broad cross-origin policy that may expose resources to untrusted origins.",
      evidence: `Access-Control-Allow-Origin: ${allowOrigin}; credentials: ${allowCredentials}`,
      location: url.toString(), confidence: "Medium",
    });
  }

  const allowMethods = headers.get("allow") || headers.get("access-control-allow-methods") || "";
  const methods = allowMethods.split(",").map((method) => method.trim().toUpperCase()).filter(Boolean);
  if (methods.includes("TRACE")) {
    score -= 5;
    add(findings, {
      title: "TRACE method advertised", severity: "Medium", category: "HTTP",
      description: "The target advertises the TRACE HTTP method, which is usually unnecessary for production applications.",
      evidence: allowMethods, location: url.toString(), confidence: "High",
    });
  }

  const mixedContent: string[] = [];
  if (url.protocol === "https:") {
    const resourcePattern = /(?:src|href|action)\s*=\s*["'](http:\/\/[^"']+)["']/gi;
    let match: RegExpExecArray | null;
    while ((match = resourcePattern.exec(html)) && mixedContent.length < 20) mixedContent.push(match[1]);
    if (mixedContent.length) {
      score -= Math.min(10, mixedContent.length * 2);
      add(findings, {
        title: "Mixed content detected", severity: "Medium", category: "Configuration",
        description: "The HTTPS page references resources over unencrypted HTTP.",
        evidence: mixedContent.slice(0, 5).join(" | "), location: url.toString(), confidence: "High",
      });
    }
  }

  const disclosure: string[] = [];
  if (/stack trace|stacktrace|exception|syntaxerror|referenceerror|fatal error|traceback/i.test(html)) disclosure.push("Possible application error details");
  if (/node_modules\//i.test(html)) disclosure.push("node_modules path reference");
  if (/\/home\/[^\s"'<]+/i.test(html)) disclosure.push("Unix home-directory path reference");
  if (disclosure.length) {
    score -= 8;
    add(findings, {
      title: "Potential information disclosure", severity: "Medium", category: "Information Disclosure",
      description: "Public response content appears to contain implementation or diagnostic details.",
      evidence: disclosure.join(" | "), location: url.toString(), confidence: "Medium",
    });
  }

  if (status >= 500) {
    add(findings, {
      title: "Server error exposed to scanner", severity: "Medium", category: "Information Disclosure",
      description: "The target returned a server-side error response during the assessment.",
      evidence: `HTTP ${status}`, location: url.toString(), confidence: "High",
    });
  }

  return {
    score: Math.max(0, Math.min(100, score)), findings,
    headers: headerValues,
    cookies,
    cors: { allowOrigin, allowCredentials, risky: riskyCors },
    methods,
    mixedContent,
    disclosure,
  };
}
