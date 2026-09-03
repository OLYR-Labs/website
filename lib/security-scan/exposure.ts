import crypto from "crypto";

export type ExposureFinding = {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium";
  category: "Credentials" | "Endpoints" | "Sensitive Files";
  description: string;
  evidence: string;
  location: string;
  discovery: string;
  confidence: "High" | "Medium";
  secretRef?: string;
};

type Secret = {
  kind: string;
  value: string;
  location: string;
  source: string;
  expiresAt: number;
};

type FetchResult = { response: Response; text: string };

type ExposureAnalysis = {
  findings: ExposureFinding[];
  discoveredUrls: string[];
  probedUrls: string[];
  exposedUrls: string[];
  scannedUrls: string[];
};

const SECRET_TTL = 15 * 60 * 1000;
const MAX_BODY_BYTES = 600_000;
const MAX_DISCOVERED_URLS = 80;
const MAX_PROBED_PATHS = 40;
const MAX_JS_BUNDLES = 8;

const candidatePaths = [
  "/admin",
  "/admin/login",
  "/login",
  "/signin",
  "/dashboard",
  "/register",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/api",
  "/api/auth",
  "/api/users",
  "/api/admin",
  "/graphql",
  "/debug",
  "/debug/config",
  "/health",
  "/.env",
  "/.env.local",
  "/.git/config",
  "/robots.txt",
  "/sitemap.xml",
  "/swagger",
  "/swagger.json",
  "/openapi.json",
  "/api-docs",
  "/server-status",
  "/backup.zip",
];

function encryptionKey() {
  const secret = process.env.SECURESCAN_DEVELOPER_SECRET;
  if (!secret || secret.length < 32) throw new Error("SECURESCAN_DEVELOPER_SECRET_MISSING");
  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptSecret(value: Omit<Secret, "expiresAt">) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const payload = Buffer.from(JSON.stringify({ ...value, expiresAt: Date.now() + SECRET_TTL }));
  const encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);
  return `${iv.toString("base64url")}.${cipher.getAuthTag().toString("base64url")}.${encrypted.toString("base64url")}`;
}

export function decryptSecret(token: string): Secret | null {
  try {
    const [iv, tag, encrypted] = token.split(".");
    if (!iv || !tag || !encrypted) return null;
    const decipher = crypto.createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(iv, "base64url"));
    decipher.setAuthTag(Buffer.from(tag, "base64url"));
    const secret = JSON.parse(Buffer.concat([decipher.update(Buffer.from(encrypted, "base64url")), decipher.final()]).toString()) as Secret;
    return secret.expiresAt > Date.now() ? secret : null;
  } catch {
    return null;
  }
}

function sameOrigin(raw: string, base: URL) {
  try {
    const url = new URL(raw, base);
    if (url.origin !== base.origin || (url.protocol !== "https:" && url.protocol !== "http:")) return null;
    return url;
  } catch {
    return null;
  }
}

async function fetchText(url: URL, signal: AbortSignal): Promise<FetchResult | null> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "OLYR-SecureScan-Exposure/1.2",
        Accept: "text/html,application/javascript,application/json,text/plain,*/*",
      },
      redirect: "error",
      signal,
      cache: "no-store",
    });

    const contentLength = Number(response.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES || !response.body) return null;

    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        total += value.byteLength;
        if (total > MAX_BODY_BYTES) return null;
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

    return { response, text: new TextDecoder().decode(merged) };
  } catch {
    return null;
  }
}

function extractUrls(html: string, base: URL) {
  const urls = new Set<string>();
  const attributePattern = /(?:href|src|action)\s*=\s*["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;

  while ((match = attributePattern.exec(html)) && urls.size < MAX_DISCOVERED_URLS) {
    const url = sameOrigin(match[1], base);
    if (url) urls.add(url.toString());
  }

  return [...urls];
}

function extractEndpointReferences(source: string, base: URL) {
  const endpoints = new Set<string>();
  const pattern = /(?:fetch|axios\.(?:get|post|put|patch|delete)|\.request)\s*\(\s*["'`]([^"'`]+)["'`]/gi;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(source)) && endpoints.size < 60) {
    const url = sameOrigin(match[1], base);
    if (url) endpoints.add(url.pathname + url.search);
  }

  return [...endpoints];
}

function extractSecrets(source: string) {
  const matches: { kind: string; value: string }[] = [];
  const patterns = [
    { kind: "Password", re: /(?:password|passwd|pwd)\s*[:=]\s*["'`]([^"'`\r\n]{6,160})["'`]/gi },
    { kind: "API key", re: /(?:api[_-]?key|access[_-]?key)\s*[:=]\s*["'`]([A-Za-z0-9_.-]{16,200})["'`]/gi },
    { kind: "Secret", re: /(?:client[_-]?secret|app[_-]?secret|secret[_-]?key)\s*[:=]\s*["'`]([^"'`\r\n]{12,200})["'`]/gi },
    { kind: "Bearer token", re: /Bearer\s+([A-Za-z0-9._~+\/=\-]{20,500})/gi },
  ];

  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.re.exec(source)) && matches.length < 20) {
      const value = match[1].trim();
      if (/^(your_|your-|example|sample|changeme|placeholder|test|dummy|undefined|null)$/i.test(value)) continue;
      matches.push({ kind: pattern.kind, value });
    }
  }

  return matches;
}

function safeSecretRef(secret: { kind: string; value: string }, location: string, source: string) {
  try {
    return encryptSecret({ kind: secret.kind, value: secret.value, location, source });
  } catch {
    return undefined;
  }
}

function addSecretFindings(findings: ExposureFinding[], sourceText: string, location: string, discovery: string) {
  for (const secret of extractSecrets(sourceText)) {
    const secretRef = safeSecretRef(secret, location, discovery);
    findings.push({
      id: crypto.randomUUID(),
      title: `${secret.kind} exposed in public content`,
      severity: secret.kind === "Password" ? "Critical" : "High",
      category: "Credentials",
      description: `A ${secret.kind.toLowerCase()} pattern was found in unauthenticated public content.`,
      evidence: `Detected value: ${secret.value.slice(0, 2)}••••••••${secret.value.slice(-2)} (${secret.value.length} characters)`,
      location,
      discovery,
      confidence: "High",
      ...(secretRef ? { secretRef } : {}),
    });
  }
}

function isSensitiveRoute(pathname: string) {
  return /\/(admin|admin\/login|login|signin|dashboard|debug|internal)(?:\/|$)/i.test(pathname);
}

function isSensitiveFile(pathname: string) {
  return /\/(\.env(?:\.[^/]+)?|\.git\/config|backup\.(?:zip|tar|gz)|server-status)(?:$|\/)/i.test(pathname);
}

export async function analyzeExposure(target: URL, signal: AbortSignal, rootHtml?: string): Promise<ExposureAnalysis> {
  const root = rootHtml !== undefined
    ? { response: new Response(rootHtml, { status: 200 }), text: rootHtml }
    : await fetchText(target, signal);

  if (!root) return { findings: [], discoveredUrls: [], probedUrls: [], exposedUrls: [], scannedUrls: [] };

  const findings: ExposureFinding[] = [];
  const discovered = new Set<string>(extractUrls(root.text, target));
  const probed = new Set<string>();
  const exposed = new Set<string>();
  const scanned = new Set<string>([target.toString()]);
  const bodies: { text: string; url: string; source: string }[] = [{ text: root.text, url: target.toString(), source: "HTML" }];

  addSecretFindings(findings, root.text, target.toString(), "HTML");

  const htmlUrls = extractUrls(root.text, target);
  for (const url of htmlUrls.filter((value) => /\.m?js(?:\?|$)/i.test(value)).slice(0, MAX_JS_BUNDLES)) {
    const javascript = await fetchText(new URL(url), signal);
    if (!javascript) continue;
    scanned.add(url);
    bodies.push({ text: javascript.text, url, source: "JavaScript bundle" });
  }

  for (const body of bodies) {
    for (const endpoint of extractEndpointReferences(body.text, target)) {
      const full = new URL(endpoint, target).toString();
      discovered.add(full);
      if (isSensitiveRoute(new URL(full).pathname)) {
        findings.push({
          id: crypto.randomUUID(),
          title: "Sensitive endpoint referenced by client code",
          severity: "High",
          category: "Endpoints",
          description: "Public client code references a potentially sensitive endpoint.",
          evidence: endpoint,
          location: body.url,
          discovery: body.source,
          confidence: "Medium",
        });
      }
    }
  }

  for (const path of candidatePaths.slice(0, MAX_PROBED_PATHS)) {
    if (signal.aborted) break;
    const url = new URL(path, target);
    const raw = url.toString();
    probed.add(raw);

    const result = await fetchText(url, signal);
    if (!result) continue;

    scanned.add(raw);
    if (result.response.status >= 200 && result.response.status < 400) {
      exposed.add(raw);
      addSecretFindings(findings, result.text, raw, "Controlled path probe");

      if (isSensitiveRoute(url.pathname)) {
        findings.push({
          id: crypto.randomUUID(),
          title: "Sensitive route is publicly reachable",
          severity: /\/(admin|debug|internal)(?:\/|$)/i.test(url.pathname) ? "High" : "Medium",
          category: "Endpoints",
          description: "A sensitive-looking route responded successfully without an authentication challenge.",
          evidence: `${url.pathname} → HTTP ${result.response.status}`,
          location: raw,
          discovery: "Controlled path probe",
          confidence: "High",
        });
      }

      if (isSensitiveFile(url.pathname)) {
        findings.push({
          id: crypto.randomUUID(),
          title: "Sensitive file is publicly reachable",
          severity: "Critical",
          category: "Sensitive Files",
          description: "A potentially sensitive file or diagnostic resource responded to an unauthenticated request.",
          evidence: `${url.pathname} → HTTP ${result.response.status}`,
          location: raw,
          discovery: "Controlled path probe",
          confidence: "High",
        });
      }
    }
  }

  return {
    findings,
    discoveredUrls: [...discovered].slice(0, MAX_DISCOVERED_URLS),
    probedUrls: [...probed],
    exposedUrls: [...exposed],
    scannedUrls: [...scanned],
  };
}
