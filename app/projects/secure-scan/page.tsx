"use client";

import { useState } from "react";

type Finding = { title: string; severity: string; description: string; recommendation?: string };
type Assessment = {
  target: string;
  overview: { overallScore: number; grade: string };
  categories: Record<string, number | undefined>;
  ssl?: { valid?: boolean; issuer?: string | null; expires?: string | null; daysRemaining?: number; risk?: string };
  domain?: { score?: number; emailSecurity?: { SPF?: boolean; DMARC?: boolean } };
  technology?: { technologies?: string[]; categories?: { frontend?: string[]; backend?: string[]; infrastructure?: string[] } };
  vulnerabilities?: Finding[];
  findings?: Finding[];
  checks?: { https?: boolean; status?: number };
};

function safeArray<T>(value: T[] | undefined | null): T[] { return Array.isArray(value) ? value : []; }
function statusTone(value?: boolean) {
  return value ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-red-500/10 text-red-600 dark:text-red-400";
}

export default function SecureScanPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [error, setError] = useState("");

  async function runAssessment() {
    if (!url.trim()) { setError("Please enter a website URL."); return; }
    setLoading(true); setAssessment(null); setError("");
    try {
      const response = await fetch("/api/security-assessment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: url.trim() }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Assessment failed");
      setAssessment(data);
    } catch (err) {
      console.error(err);
      setError("Unable to complete security assessment.");
    } finally { setLoading(false); }
  }

  const findings: Finding[] = assessment ? [...safeArray(assessment.vulnerabilities), ...safeArray(assessment.findings)] : [];

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--text)]">
      <section className="relative pt-28 sm:pt-36">
        <div className="pointer-events-none absolute left-[10%] top-24 h-72 w-72 rounded-full bg-blue-500/[0.10] blur-[120px]" />
        <div className="pointer-events-none absolute right-[-10%] top-64 h-96 w-96 rounded-full bg-cyan-400/[0.07] blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">OLYR SecureScan</p>
            <h1 className="mt-5 font-[var(--font-space-grotesk)] text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl">See the security posture of a website before it becomes a problem.</h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">A focused security assessment covering HTTPS, certificates, domain email protection, technology exposure, and discovered weaknesses.</p>
          </div>
          <div className="mt-12 max-w-5xl rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-7">
            <div className="flex flex-col gap-4 lg:flex-row">
              <label className="sr-only" htmlFor="secure-scan-url">Website URL</label>
              <input id="secure-scan-url" value={url} onChange={(event) => setUrl(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") runAssessment(); }} placeholder="https://company.com" className="min-h-14 flex-1 rounded-2xl border border-[var(--border)] bg-[var(--background)] px-5 text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-4 focus:ring-blue-500/10" />
              <button type="button" onClick={runAssessment} disabled={loading} className="min-h-14 rounded-2xl bg-[var(--text)] px-7 font-semibold text-[var(--background)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">{loading ? "Scanning…" : "Run security scan"}</button>
            </div>
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </section>

      {assessment && (
        <section className="relative pb-24 sm:pb-32">
          <div className="mx-auto max-w-7xl space-y-6 px-5 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Security score</p>
                <div className="mt-6 flex items-end gap-3"><span className="font-[var(--font-space-grotesk)] text-7xl font-semibold tracking-[-0.08em]">{assessment.overview.overallScore}</span><span className="mb-2 text-sm text-[var(--muted)]">/ 100</span></div>
                <p className="mt-3 text-sm font-medium text-[var(--accent)]">{assessment.overview.grade}</p>
              </div>
              <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Assessed target</p>
                <p className="mt-5 break-all text-lg font-medium sm:text-xl">{assessment.target}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className={`rounded-full px-4 py-2 text-xs font-semibold ${statusTone(assessment.checks?.https)}`}>HTTPS {assessment.checks?.https ? "enabled" : "missing"}</span>
                  <span className="rounded-full bg-[var(--background)] px-4 py-2 text-xs font-semibold text-[var(--muted)]">HTTP status {assessment.checks?.status || "unknown"}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {Object.entries(assessment.categories || {}).map(([name, value]) => (
                <div key={name} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{name.replace(/([A-Z])/g, " $1")}</p>
                  <p className="mt-4 font-[var(--font-space-grotesk)] text-3xl font-semibold">{value ?? 0}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-9">
                <div className="flex items-center justify-between gap-4"><h2 className="text-xl font-semibold">SSL certificate</h2><span className={`rounded-full px-4 py-2 text-xs font-semibold ${statusTone(assessment.ssl?.valid)}`}>{assessment.ssl?.valid ? "Valid" : "Risk"}</span></div>
                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                  <div><p className="text-xs text-[var(--muted)]">Issuer</p><p className="mt-2 text-sm font-medium">{assessment.ssl?.issuer || "Unknown"}</p></div>
                  <div><p className="text-xs text-[var(--muted)]">Expires</p><p className="mt-2 text-sm font-medium">{assessment.ssl?.expires || "Unknown"}</p></div>
                  <div><p className="text-xs text-[var(--muted)]">Remaining</p><p className="mt-2 text-sm font-medium">{assessment.ssl?.daysRemaining ?? 0} days</p></div>
                </div>
                <p className="mt-6 text-sm text-[var(--muted)]">Risk level: {assessment.ssl?.risk || "Unknown"}</p>
              </article>
              <article className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-9">
                <h2 className="text-xl font-semibold">Domain protection</h2>
                <div className="mt-8 flex flex-wrap gap-3"><span className={`rounded-full px-4 py-2 text-xs font-semibold ${statusTone(assessment.domain?.emailSecurity?.SPF)}`}>SPF {assessment.domain?.emailSecurity?.SPF ? "enabled" : "missing"}</span><span className={`rounded-full px-4 py-2 text-xs font-semibold ${statusTone(assessment.domain?.emailSecurity?.DMARC)}`}>DMARC {assessment.domain?.emailSecurity?.DMARC ? "enabled" : "missing"}</span></div>
                <div className="mt-8"><p className="text-xs text-[var(--muted)]">Domain score</p><p className="mt-2 font-[var(--font-space-grotesk)] text-4xl font-semibold">{assessment.domain?.score ?? 0}</p></div>
              </article>
            </div>

            <article className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-9">
              <h2 className="text-xl font-semibold">Technology detected</h2>
              <div className="mt-8 grid gap-8 md:grid-cols-3">
                {Object.entries(assessment.technology?.categories || { frontend: [], backend: [], infrastructure: [] }).map(([category, items]) => (
                  <div key={category}><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{category}</p><div className="mt-4 flex flex-wrap gap-2">{safeArray(items).length ? safeArray(items).map((item) => <span key={item} className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm">{item}</span>) : <span className="text-sm text-[var(--muted)]">None detected</span>}</div></div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-9">
              <h2 className="text-xl font-semibold">Security findings</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">Weaknesses and observations returned by the assessment.</p>
              <div className="mt-8 space-y-3">
                {findings.length === 0 ? <div className="rounded-2xl bg-emerald-500/10 p-5 text-sm font-medium text-emerald-600 dark:text-emerald-400">No security findings were returned.</div> : findings.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"><h3 className="font-semibold">{item.title}</h3><span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{item.severity}</span></div>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                    {item.recommendation && <p className="mt-4 text-sm leading-6 text-[var(--text)]"><span className="font-semibold">Recommendation:</span> {item.recommendation}</p>}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      )}
    </main>
  );
}
