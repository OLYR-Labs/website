"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Severity = "Critical" | "High" | "Medium" | "Low" | "Info";
type Finding = { id?: string; title: string; severity: Severity; category?: string; description: string; evidence?: string; location?: string; discovery?: string; confidence?: string; remediation?: string; cwe?: string; owasp?: string; secretRef?: string };
type ScanResponse = {
  target: string;
  scan?: { version: string; completedAt: string; durationMs: number; mode: string; scope: string };
  overview: { overallScore: number; grade: string; findingCounts?: Record<Severity, number> };
  categories?: Record<string, number>;
  checks?: { https: boolean; status: number; contentType?: string | null; redirect?: string | null };
  attackSurface?: { discoveredUrls: string[]; resources: { url: string; kind: string; status: number | null; contentType: string | null; reachable: boolean }[]; forms: string[]; scripts: string[]; apiReferences: string[]; specialFiles: string[]; fetchCount: number };
  exposure?: { discoveredUrls: string[]; probedUrls: string[]; exposedUrls: string[]; scannedUrls: string[]; findings: number };
  webSecurity?: { score: number; headers: Record<string, string | null>; cookies: { name: string; secure: boolean; httpOnly: boolean; sameSite: string | null }[]; cors: { allowOrigin: string | null; allowCredentials: boolean; risky: boolean }; methods: string[]; mixedContent: string[]; disclosure: string[] };
  ssl?: { valid: boolean; daysRemaining: number; [key: string]: unknown };
  dns?: { score: number; records: Record<string, string[]>; emailSecurity?: { SPF: boolean; DMARC: boolean; DKIM: boolean; DNSSEC: boolean; SPFRecord?: string | null; DMARCRecord?: string | null; DKIMSelectors?: string[] }; findings?: Finding[] };
  domain?: { score: number; emailSecurity?: { SPF: boolean; DMARC: boolean; DKIM?: boolean; [key: string]: unknown } };
  technology?: { technologies: { name: string; confidence?: string; evidence?: string }[]; [key: string]: unknown };
  report?: { executiveSummary: string; recommendations: { title: string; remediation?: string; severity: Severity }[]; compliance: { title: string; owasp: string | null; cwe: string | null }[] };
  findings?: Finding[];
};

type HistoryItem = { target: string; score: number; grade: string; completedAt: string };
const severityRank: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3, Info: 4 };

function severityClass(severity: Severity) {
  if (severity === "Critical") return "border-red-500/30 bg-red-500/10 text-red-300";
  if (severity === "High") return "border-orange-500/30 bg-orange-500/10 text-orange-300";
  if (severity === "Medium") return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
  if (severity === "Low") return "border-blue-500/30 bg-blue-500/10 text-blue-300";
  return "border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted)]";
}

function scoreTone(score: number) { return score >= 90 ? "text-emerald-400" : score >= 75 ? "text-sky-400" : score >= 50 ? "text-amber-400" : "text-red-400"; }
function prettyKey(key: string) { return key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase()); }

export default function SecureScanPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [developerVerified, setDeveloperVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, string>>({});
  const [revealLoading, setRevealLoading] = useState<string | null>(null);

  useEffect(() => {
    try { setHistory(JSON.parse(localStorage.getItem("olyr-securescan-history") || "[]")); } catch { setHistory([]); }
  }, []);

  const findings = useMemo(() => [...(result?.findings || [])].sort((a, b) => (severityRank[a.severity] ?? 5) - (severityRank[b.severity] ?? 5)), [result]);
  const counts = result?.overview.findingCounts || { Critical: 0, High: 0, Medium: 0, Low: 0, Info: 0 };
  const categoryEntries = Object.entries(result?.categories || {});

  function saveHistory(item: HistoryItem) {
    const next = [item, ...history.filter((entry) => !(entry.target === item.target && entry.completedAt === item.completedAt))].slice(0, 20);
    setHistory(next);
    try { localStorage.setItem("olyr-securescan-history", JSON.stringify(next)); } catch {}
  }

  async function scan(event: FormEvent) {
    event.preventDefault(); setError(""); setAuthError(""); setResult(null); setRevealed({});
    if (!url.trim()) return setError("Enter a website URL to scan.");
    setLoading(true);
    try {
      const response = await fetch("/api/security-assessment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: url.trim() }) });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "The scan could not be completed.");
      setResult(data as ScanResponse);
      saveHistory({ target: data.target, score: data.overview.overallScore, grade: data.overview.grade, completedAt: data.scan?.completedAt || new Date().toISOString() });
    } catch (value) { setError(value instanceof Error ? value.message : "The scan could not be completed."); }
    finally { setLoading(false); }
  }

  async function verifyDeveloper(event: FormEvent) {
    event.preventDefault(); setAuthError(""); setAuthLoading(true);
    try {
      const response = await fetch("/api/security-assessment/developer-auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "Developer verification failed.");
      setDeveloperVerified(true); setPassword("");
    } catch (value) { setAuthError(value instanceof Error ? value.message : "Developer verification failed."); }
    finally { setAuthLoading(false); }
  }

  async function revealCredential(finding: Finding) {
    if (!finding.secretRef) return;
    setRevealLoading(finding.secretRef); setAuthError("");
    try {
      const response = await fetch("/api/security-assessment/reveal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ secretRef: finding.secretRef }) });
      const data = await response.json().catch(() => null);
      if (!response.ok) { if (response.status === 401) setDeveloperVerified(false); throw new Error(data?.error || "The secret could not be revealed."); }
      setRevealed((current) => ({ ...current, [finding.secretRef as string]: data.value }));
    } catch (value) { setAuthError(value instanceof Error ? value.message : "The secret could not be revealed."); }
    finally { setRevealLoading(null); }
  }

  async function logoutDeveloper() { await fetch("/api/security-assessment/developer-auth", { method: "DELETE" }).catch(() => undefined); setDeveloperVerified(false); setRevealed({}); }

  return <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
    <section className="relative overflow-hidden border-b border-[var(--border)] pt-28 sm:pt-36">
      <div className="pointer-events-none absolute left-1/2 top-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-blue-500/[0.09] blur-[150px]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-4xl"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">OLYR Labs · SecureScan 3.0</p><h1 className="mt-5 font-[var(--font-space-grotesk)] text-5xl font-semibold leading-[0.94] tracking-[-0.07em] sm:text-7xl">A deeper view of your public attack surface.</h1><p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">Map public routes, inspect web configuration, evaluate TLS and DNS posture, fingerprint technology, and detect exposed secrets — without performing destructive exploitation.</p></div>
        <form onSubmit={scan} className="mt-10 flex max-w-4xl flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="secure-scan-url">Website URL</label><input id="secure-scan-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" type="url" inputMode="url" autoComplete="url" className="min-h-14 flex-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 text-sm outline-none transition focus:border-[var(--accent)]" /><button disabled={loading} className="min-h-14 rounded-2xl bg-[var(--text)] px-7 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5 hover:bg-[var(--accent)] hover:text-white disabled:cursor-wait disabled:opacity-60">{loading ? "Assessing…" : "Run SecureScan →"}</button></form>
        <p className="mt-3 text-xs leading-5 text-[var(--muted)]">Only scan systems you own or have explicit permission to assess. SecureScan is intentionally limited to public discovery and controlled, low-impact checks.</p>
        {error && <div role="alert" className="mt-5 max-w-4xl rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">{error}</div>}
      </div>
    </section>

    {result && <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"><div className="flex flex-col justify-between gap-6 sm:flex-row"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Assessment</p><h2 className="mt-3 break-all font-[var(--font-space-grotesk)] text-2xl font-semibold tracking-[-0.04em]">{result.target}</h2><p className="mt-2 text-sm text-[var(--muted)]">HTTP {result.checks?.status ?? "—"} · {result.checks?.https ? "HTTPS" : "HTTP"} · {result.scan?.durationMs ?? 0} ms</p></div><div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)]"><span className={`font-[var(--font-space-grotesk)] text-4xl font-semibold ${scoreTone(result.overview.overallScore)}`}>{result.overview.overallScore}</span><span className="text-[10px] uppercase tracking-widest text-[var(--muted)]">{result.overview.grade}</span></div></div></div>
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Finding profile</p><div className="mt-5 grid grid-cols-5 gap-2">{(["Critical","High","Medium","Low","Info"] as Severity[]).map((severity) => <div key={severity} className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-center"><div className="text-xl font-semibold">{counts[severity] || 0}</div><div className="mt-1 text-[9px] uppercase tracking-wider text-[var(--muted)]">{severity}</div></div>)}</div><p className="mt-4 text-sm text-[var(--muted)]">{findings.length} normalized findings across the enabled engines.</p></div>
      </div>

      {categoryEntries.length > 0 && <div className="mt-10"><div className="mb-5"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Risk model</p><h2 className="mt-2 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.05em]">Security posture by category</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{categoryEntries.map(([key, value]) => <div key={key} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><div className="flex items-center justify-between gap-3"><span className="text-sm text-[var(--muted)]">{prettyKey(key)}</span><span className={`font-[var(--font-space-grotesk)] text-2xl font-semibold ${scoreTone(value)}`}>{value}</span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]"><div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div></div>)}</div></div>}

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Attack surface</p><h2 className="mt-2 font-[var(--font-space-grotesk)] text-2xl font-semibold">What is visible?</h2><div className="mt-6 space-y-3">{[["URLs discovered", result.attackSurface?.discoveredUrls.length || result.exposure?.discoveredUrls.length || 0],["API references", result.attackSurface?.apiReferences.length || 0],["Forms", result.attackSurface?.forms.length || 0],["Scripts inspected", result.attackSurface?.scripts.length || 0],["Fetches", result.attackSurface?.fetchCount || 0]].map(([label, value]) => <div key={label} className="flex items-center justify-between border-b border-[var(--border)] pb-3 text-sm"><span className="text-[var(--muted)]">{label}</span><span className="font-semibold">{value}</span></div>)}</div></section>
        <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Infrastructure</p><h2 className="mt-2 font-[var(--font-space-grotesk)] text-2xl font-semibold">TLS · DNS · Email</h2><div className="mt-6 space-y-3">{[["Certificate", result.ssl?.valid ? "Valid" : "Needs review"],["Certificate days", String(result.ssl?.daysRemaining ?? "—")],["SPF", result.dns?.emailSecurity?.SPF ? "Confirmed" : "Missing"],["DMARC", result.dns?.emailSecurity?.DMARC ? "Confirmed" : "Missing"],["DKIM", result.dns?.emailSecurity?.DKIM ? "Confirmed" : "Not confirmed"],["DNSSEC", result.dns?.emailSecurity?.DNSSEC ? "Confirmed" : "Not confirmed"]].map(([label, value]) => <div key={label} className="flex items-center justify-between border-b border-[var(--border)] pb-3 text-sm"><span className="text-[var(--muted)]">{label}</span><span className="font-semibold">{value}</span></div>)}</div></section>
        <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Technology</p><h2 className="mt-2 font-[var(--font-space-grotesk)] text-2xl font-semibold">Observed stack</h2><div className="mt-6 flex flex-wrap gap-2">{(result.technology?.technologies || []).map((tech, index) => <span key={`${tech.name}-${index}`} className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-xs">{tech.name}{tech.confidence ? ` · ${tech.confidence}` : ""}</span>)}{!(result.technology?.technologies || []).length && <p className="text-sm text-[var(--muted)]">No technology fingerprint met the current confidence threshold.</p>}</div></section>
      </div>

      <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Findings</p><h2 className="mt-2 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.05em]">Prioritized security findings</h2></div><button onClick={() => window.print()} className="rounded-xl border border-[var(--border)] px-4 py-2 text-xs font-semibold transition hover:border-[var(--accent)]">Print / Save report</button></div><div className="mt-7 space-y-4">{findings.map((finding, index) => <article key={finding.id || `${finding.title}-${index}`} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-5 sm:p-6"><div className="flex flex-col gap-4 sm:flex-row sm:justify-between"><div className="min-w-0"><div className="flex flex-wrap gap-2"><span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${severityClass(finding.severity)}`}>{finding.severity}</span><span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] text-[var(--muted)]">{finding.category || "General"}</span><span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] text-[var(--muted)]">{finding.confidence || "Medium"} confidence</span></div><h3 className="mt-3 text-lg font-semibold tracking-[-0.02em]">{finding.title}</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{finding.description}</p>{finding.evidence && <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 text-[11px] leading-5 text-[var(--muted)]">{finding.evidence}</pre>}{finding.location && <p className="mt-3 truncate text-[11px] text-[var(--muted)]">{finding.location}</p>}{finding.remediation && <div className="mt-4 rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/[0.05] p-3 text-xs leading-5"><span className="font-semibold">Remediation: </span>{finding.remediation}</div>}{(finding.cwe || finding.owasp) && <p className="mt-3 text-[10px] uppercase tracking-wider text-[var(--muted)]">{finding.cwe ? `CWE ${finding.cwe.replace(/^CWE-/, "")}` : ""}{finding.cwe && finding.owasp ? " · " : ""}{finding.owasp || ""}</p>}</div>{finding.secretRef && <div className="shrink-0 sm:w-48">{revealed[finding.secretRef] ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3"><p className="text-[10px] uppercase tracking-wider text-red-300">Developer view</p><code className="mt-2 block break-all text-xs text-red-200">{revealed[finding.secretRef]}</code></div> : <button onClick={() => developerVerified ? revealCredential(finding) : setAuthError("Developer verification is required before revealing a protected value.")} disabled={revealLoading === finding.secretRef} className="w-full rounded-xl border border-red-500/30 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/10 disabled:opacity-50">{revealLoading === finding.secretRef ? "Revealing…" : "Reveal protected value"}</button>}</div>}</div></article>)}{findings.length === 0 && <p className="rounded-2xl border border-[var(--border)] p-6 text-sm text-[var(--muted)]">No findings were produced by the enabled checks.</p>}</div></section>

      {result.report && <section className="mt-10 grid gap-5 lg:grid-cols-2"><div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Executive summary</p><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{result.report.executiveSummary}</p><h3 className="mt-7 font-semibold">Top recommendations</h3><div className="mt-4 space-y-3">{result.report.recommendations.slice(0, 8).map((item, index) => <div key={`${item.title}-${index}`} className="rounded-xl border border-[var(--border)] p-4"><div className="flex items-center gap-2"><span className={`rounded-full border px-2 py-1 text-[10px] ${severityClass(item.severity)}`}>{item.severity}</span><span className="text-sm font-semibold">{item.title}</span></div>{item.remediation && <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{item.remediation}</p>}</div>)}</div></div><div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Compliance mapping</p><h3 className="mt-2 font-[var(--font-space-grotesk)] text-2xl font-semibold">OWASP / CWE context</h3><div className="mt-6 space-y-3">{result.report.compliance.slice(0, 12).map((item, index) => <div key={`${item.title}-${index}`} className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] p-4"><span className="min-w-0 truncate text-sm">{item.title}</span><span className="shrink-0 text-[10px] uppercase tracking-wider text-[var(--muted)]">{item.owasp || item.cwe || "Observed"}</span></div>)}{!result.report.compliance.length && <p className="text-sm text-[var(--muted)]">No formal mapping was attached to the current findings.</p>}</div></div></section>}

      <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Developer controls</p><h2 className="mt-2 font-[var(--font-space-grotesk)] text-2xl font-semibold">Protected credential verification</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">Sensitive values remain redacted in normal results. Developer authentication creates a short-lived session before a specific protected finding can be revealed.</p></div>{developerVerified && <button onClick={logoutDeveloper} className="rounded-xl border border-[var(--border)] px-4 py-2 text-xs font-semibold">End session</button>}</div>{!developerVerified && <form onSubmit={verifyDeveloper} className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row"><input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Developer verification password" className="min-h-12 flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 text-sm outline-none focus:border-[var(--accent)]" /><button disabled={authLoading} className="min-h-12 rounded-xl bg-[var(--text)] px-5 text-xs font-semibold text-[var(--background)]">{authLoading ? "Verifying…" : "Verify developer"}</button></form>}{authError && <p role="alert" className="mt-4 text-xs text-red-300">{authError}</p>}</section>
    </section>}

    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">{history.length > 0 && <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Local history</p><h2 className="mt-2 font-[var(--font-space-grotesk)] text-2xl font-semibold">Recent assessments on this device</h2></div><button onClick={() => { setHistory([]); localStorage.removeItem("olyr-securescan-history"); }} className="text-xs text-[var(--muted)] hover:text-[var(--text)]">Clear</button></div><div className="mt-6 space-y-2">{history.map((item, index) => <button key={`${item.completedAt}-${index}`} onClick={() => setUrl(item.target)} className="flex w-full items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 text-left transition hover:border-[var(--accent)]"><span className="min-w-0 truncate text-sm">{item.target}</span><span className={`shrink-0 text-sm font-semibold ${scoreTone(item.score)}`}>{item.score} · {item.grade}</span></button>)}</div></div>}</section>
  </main>;
}
