const MAX_URLS = 100;
const MAX_FETCHES = 50;
const MAX_JS = 8;

export type AttackSurfaceResource = {
  url: string;
  kind: "page" | "api" | "script" | "form" | "file";
  status: number | null;
  contentType: string | null;
  reachable: boolean;
};

export type AttackSurfaceAnalysis = {
  discoveredUrls: string[];
  resources: AttackSurfaceResource[];
  forms: string[];
  scripts: string[];
  apiReferences: string[];
  specialFiles: string[];
  fetchCount: number;
};

function sameOrigin(raw: string, base: URL) {
  try {
    const url = new URL(raw, base);
    if (url.origin !== base.origin || !/^https?:$/.test(url.protocol)) return null;
    url.hash = "";
    return url;
  } catch {
    return null;
  }
}

function extractAttributes(html: string, base: URL) {
  const urls = new Map<string, AttackSurfaceResource["kind"]>();
  const pattern = /<(?:a|link|script|img|iframe|source)\b[^>]*?(?:href|src)\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) && urls.size < MAX_URLS) {
    const url = sameOrigin(match[1], base);
    if (!url) continue;
    const tag = match[0].slice(0, 20).toLowerCase();
    const kind = tag.startsWith("<script") ? "script" : tag.startsWith("<a") || tag.startsWith("<link") ? "page" : "file";
    urls.set(url.toString(), kind);
  }
  return urls;
}

function extractForms(html: string, base: URL) {
  const forms = new Set<string>();
  const pattern = /<form\b[^>]*?action\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) && forms.size < 30) {
    const url = sameOrigin(match[1], base);
    if (url) forms.add(url.toString());
  }
  return [...forms];
}

function extractApiReferences(source: string, base: URL) {
  const refs = new Set<string>();
  const patterns = [
    /(?:fetch|axios\.(?:get|post|put|patch|delete)|\.request)\s*\(\s*["'`]([^"'`]+)["'`]/gi,
    /["'`]((?:\/api\/|\/graphql\b)[^"'`\s]{0,300})["'`]/gi,
  ];
  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(source)) && refs.size < 60) {
      const url = sameOrigin(match[1], base);
      if (url) refs.add(url.toString());
    }
  }
  return [...refs];
}

async function fetchText(url: URL, signal: AbortSignal) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "User-Agent": "OLYR-SecureScan-AttackSurface/2.0", Accept: "text/html,application/javascript,text/plain,*/*" },
      redirect: "error",
      cache: "no-store",
      signal,
    });
    const length = Number(response.headers.get("content-length") || 0);
    if (length > 500_000 || !response.body) return null;
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        total += value.byteLength;
        if (total > 500_000) return null;
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    const body = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
    return { response, text: new TextDecoder().decode(body) };
  } catch {
    return null;
  }
}

export async function analyzeAttackSurface(target: URL, signal: AbortSignal, rootHtml: string) {
  const discovered = extractAttributes(rootHtml, target);
  const forms = extractForms(rootHtml, target);
  const scripts = [...discovered.entries()].filter(([, kind]) => kind === "script").map(([url]) => url).slice(0, MAX_JS);
  const apiReferences = new Set(extractApiReferences(rootHtml, target));
  const resources: AttackSurfaceResource[] = [];
  let fetchCount = 0;

  for (const [raw, kind] of discovered) {
    if (fetchCount >= MAX_FETCHES) break;
    if (kind === "script" || raw === target.toString()) continue;
    const url = new URL(raw);
    const result = await fetchText(url, signal);
    fetchCount += 1;
    resources.push({ url: raw, kind, status: result?.response.status ?? null, contentType: result?.response.headers.get("content-type") ?? null, reachable: !!result });
    if (result) for (const ref of extractApiReferences(result.text, target)) apiReferences.add(ref);
  }

  for (const raw of scripts) {
    if (fetchCount >= MAX_FETCHES) break;
    const result = await fetchText(new URL(raw), signal);
    fetchCount += 1;
    resources.push({ url: raw, kind: "script", status: result?.response.status ?? null, contentType: result?.response.headers.get("content-type") ?? null, reachable: !!result });
    if (result) for (const ref of extractApiReferences(result.text, target)) apiReferences.add(ref);
  }

  const specialFiles = ["/robots.txt", "/sitemap.xml", "/.well-known/security.txt"];
  for (const path of specialFiles) {
    if (fetchCount >= MAX_FETCHES) break;
    const raw = new URL(path, target).toString();
    const result = await fetchText(new URL(raw), signal);
    fetchCount += 1;
    resources.push({ url: raw, kind: "file", status: result?.response.status ?? null, contentType: result?.response.headers.get("content-type") ?? null, reachable: !!result });
  }

  return {
    discoveredUrls: [...new Set([...discovered.keys(), ...apiReferences])].slice(0, MAX_URLS),
    resources,
    forms,
    scripts,
    apiReferences: [...apiReferences].slice(0, 60),
    specialFiles,
    fetchCount,
  } satisfies AttackSurfaceAnalysis;
}
