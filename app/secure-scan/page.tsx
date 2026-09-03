"use client";

import { FormEvent, useMemo, useState } from "react";

type Severity = "Critical" | "High" | "Medium" | "Low" | "Info" | string;

type Finding = {
  id?: string;
  title: string;
  severity: Severity;
  category?: string;
  description: string;
  evidence?: string;
  location?: string;
  discovery?: string;
  confidence?: string;
  secretRef?: string;
};

type ScanResponse = {
  target: string;
  overview: { overallScore: number; grade: string };
  categories?: Record<string, number>;
  checks?: { https: boolean; status: number };
  exposure?: { discoveredUrls: string[]; scannedUrls: string[]; findings: number };
  findings?: Finding[];
};

const severityRank: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3, Info: 4 };

function severityClass(severity: Severity) {
  if (severity === "Critical") return "border-red-500/30 bg-red-500/10 text-red-300";
  if (severity === "High") return "border-orange-500/30 bg-orange-500/10 text-orange-300";
  if (severity === "Medium") return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
  if (severity === "Low") return "border-blue-500/30 bg-blue-500/10 text-blue-300";
  return "border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted)]";
}

function statusLabel(status: number) {
  if (status >= 200 && status < 300) return "Reachable";
  if (status >= 300 && status < 400) return "Redirect";
  if (status >= 400 && status < 500) return "Client error";
  if (status >= 500) return "Server error";
  return "Checked";
}

export default function SecureScanPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [developerVerified, setDeveloperVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [revealed, setRevealed] = useState<Record<string, string>>({});
  const [revealLoading, setRevealLoading] = useState<string | null>(null);

  const findings = useMemo(() => [...(result?.findings ?? [])].sort((a, b) => (severityRank[a.severity] ?? 5) - (severityRank[b.severity] ?? 5)), [result]);
  const exposureFindings = findings.filter((finding) => finding.category === "Exposure" || finding.secretRef);
  const credentialFindings = findings.filter((finding) => finding.secretRef);
  const nonExposureFindings = findings.filter((finding) => !finding.secretRef && finding.category !== "Exposure");

  async function scan(event: FormEvent) {
    event.preventDefault();
    setError("");
    setResult(null);
    setRevealed({});
    if (!url.trim()) {
      setError("Enter a website URL to scan.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/security-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "The scan could not be completed.");
      setResult(data as ScanResponse);
    } catch (scanError) {
      setError(scanError instanceof Error ? scanError.message : "The scan could not be completed.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyDeveloper(event: FormEvent) {
    event.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const response = await fetch("/api/security-assessment/developer-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "Developer verification failed.");
      setDeveloperVerified(true);
      setPassword("");
    } catch (authErrorValue) {
      setAuthError(authErrorValue instanceof Error ? authErrorValue.message : "Developer verification failed.");
    } finally {
      setAuthLoading(false);
    }
  }

  async function revealCredential(finding: Finding) {
    if (!finding.secretRef) return;
    setRevealLoading(finding.secretRef);
    setAuthError("");
    try {
      const response = await fetch("/api/security-assessment/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretRef: finding.secretRef }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        if (response.status === 401) setDeveloperVerified(false);
        throw new Error(data?.error || "The secret could not be revealed.");
      }
      setRevealed((current) => ({ ...current, [finding.secretRef as string]: data.value }));
    } catch (revealError) {
      setAuthError(revealError instanceof Error ? revealError.message : "The secret could not be revealed.");
    } finally {
      setRevealLoading(null);
    }
  }

  async function logoutDeveloper() {
    await fetch("/api/security-assessment/developer-auth", { method: "DELETE" }).catch(() => undefined);
    setDeveloperVerified(false);
    setRevealed({});
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <section className="relative overflow-hidden border-b border-[var(--border)] pt-28 sm:pt-36">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-blue-500/[0.09] blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">OLYR Labs · SecureScan</p>
            <h1 className="mt-5 font-[var(--font-space-grotesk)] text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl">See what your website exposes.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">Scan public-facing security signals, discover sensitive routes and inspect exposed credentials without putting discovered accounts at risk.</p>
          </div>

          <form onSubmit={scan} className="mt-10 flex max-w-4xl flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="secure-scan-url">Website URL</label>
            <input id="secure-scan-url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com" type="url" inputMode="url" autoComplete="url" className="min-h-14 flex-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 text-sm outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]" />
            <button disabled={loading} className="min-h-14 rounded-2xl bg-[var(--text)] px-7 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5 hover:bg-[var(--accent)] hover:text-white disabled:cursor-wait disabled:opacity-60">{loading ? "Scanning…" : "Run SecureScan →"}</button>
          </form>
          <p className="mt-3 max-w-3xl text-xs leading-5 text-[var(--muted)]">Only scan systems you own or have explicit permission to assess. SecureScan is limited to public discovery and verification; it does not attempt account takeover or destructive actions.</p>
          {error && <div role="alert" className="mt-5 max-w-4xl rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">{error}</div>}
        </div>
      </section>

      {result && (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Scan result</p>
                  <h2 className="mt-3 break-all font-[var(--font-space-grotesk)] text-2xl font-semibold tracking-[-0.04em]">{result.target}</h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">HTTP {result.checks?.status ?? "—"} · {result.checks?.https ? "HTTPS enabled" : "HTTP only"}</p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-5 py-4 text-center">
                  <div className="font-[var(--font-space-grotesk)] text-4xl font-semibold">{result.overview.overallScore}</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">{result.overview.grade}</div>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Exposure</p>
              <div className="mt-4 font-[var(--font-space-grotesk)] text-4xl font-semibold">{result.exposure?.discoveredUrls.length ?? 0}</div>
              <p className="mt-1 text-sm text-[var(--muted)]">URLs discovered · {result.exposure?.scannedUrls.length ?? 0} checked</p>
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Discovery map</p>
                <h2 className="mt-3 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.05em]">What SecureScan found.</h2>
              </div>
              <span className="text-sm text-[var(--muted)]">{result.exposure?.scannedUrls.length ?? 0} public paths checked</span>
            </div>
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {(result.exposure?.discoveredUrls ?? []).map((discoveredUrl) => {
                const finding = exposureFindings.find((item) => item.location === discoveredUrl);
                return <div key={discoveredUrl} className="flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"><div className="min-w-0"><div className="truncate font-mono text-xs text-[var(--text)]">{discoveredUrl}</div><div className="mt-1 text-xs text-[var(--muted)]">{finding?.discovery || "Publicly referenced"}</div></div><span className="shrink-0 text-xs font-semibold text-[var(--accent)]">Found</span></div>;
              })}
              {(result.exposure?.discoveredUrls.length ?? 0) === 0 && <p className="text-sm text-[var(--muted)]">No additional same-origin public paths were discovered.</p>}
            </div>
          </div>

          {exposureFindings.length > 0 && <div className="mt-10">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Sensitive exposure</p>
              <h2 className="mt-3 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.05em]">Credentials & sensitive routes.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">Credentials are redacted by default. A developer verification session is required before an individual secret can be revealed.</p>
            </div>
            <div className="space-y-4">
              {exposureFindings.map((finding, index) => <article key={finding.id || `${finding.title}-${index}`} className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2"><span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${severityClass(finding.severity)}`}>{finding.severity}</span>{finding.category && <span className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1 text-[11px] text-[var(--muted)]">{finding.category}</span>}</div>
                    <h3 className="mt-4 font-[var(--font-space-grotesk)] text-xl font-semibold tracking-[-0.03em]">{finding.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{finding.description}</p>
                  </div>
                  {finding.location && <code className="max-w-full break-all rounded-xl bg-[var(--surface-muted)] px-3 py-2 text-xs text-[var(--muted)]">{finding.location}</code>}
                </div>
                {finding.evidence && <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Evidence</p><code className="mt-2 block break-all text-xs leading-5 text-[var(--text)]">{finding.evidence}</code></div>}
                {finding.secretRef && <div className="mt-5 rounded-2xl border border-orange-500/20 bg-orange-500/[0.06] p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold">Protected credential</p><p className="mt-1 text-xs leading-5 text-[var(--muted)]">Plaintext is never included in the normal scan response.</p></div>{developerVerified ? <button onClick={() => revealCredential(finding)} disabled={revealLoading === finding.secretRef} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-semibold transition hover:border-[var(--accent)] disabled:opacity-60">{revealLoading === finding.secretRef ? "Revealing…" : revealed[finding.secretRef] ? "Reveal again" : "Reveal credential"}</button> : <span className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-xs text-[var(--muted)]">Developer verification required</span>}</div>{revealed[finding.secretRef] && <div className="mt-4 rounded-xl border border-red-500/20 bg-black/20 p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-300">Developer-only plaintext</p><code className="mt-2 block break-all text-sm text-red-200">{revealed[finding.secretRef]}</code></div>}</div>}
              </article>)}
            </div>
          </div>}

          {credentialFindings.length > 0 && <div className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Developer access</p><h2 className="mt-3 font-[var(--font-space-grotesk)] text-2xl font-semibold tracking-[-0.04em]">{developerVerified ? "Developer access verified." : "Verify to inspect plaintext credentials."}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">This session is short-lived and scoped to the protected reveal endpoint. Credentials remain redacted until you explicitly reveal a finding.</p></div>
              {developerVerified ? <button onClick={logoutDeveloper} className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-xs font-semibold transition hover:border-red-400/50 hover:text-red-300">End verification</button> : <form onSubmit={verifyDeveloper} className="flex w-full max-w-md flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="developer-password">Developer password</label><input id="developer-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Developer password" autoComplete="current-password" className="min-h-11 min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 text-sm outline-none focus:border-[var(--accent)]" /><button disabled={authLoading || !password} className="min-h-11 rounded-xl bg-[var(--text)] px-5 text-xs font-semibold text-[var(--background)] disabled:opacity-60">{authLoading ? "Verifying…" : "Verify developer"}</button></form>}
            </div>
            {authError && <p role="alert" className="mt-4 text-sm text-red-300">{authError}</p>}
          </div>}

          {nonExposureFindings.length > 0 && <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Security findings</p>
            <div className="mt-5 space-y-3">{nonExposureFindings.map((finding, index) => <article key={finding.id || `${finding.title}-${index}`} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${severityClass(finding.severity)}`}>{finding.severity}</span><span className="text-xs text-[var(--muted)]">{finding.category || "Security"}</span></div><h3 className="mt-3 text-base font-semibold">{finding.title}</h3><p className="mt-1 text-sm leading-6 text-[var(--muted)]">{finding.description}</p></div>{finding.location && <code className="break-all text-xs text-[var(--muted)]">{finding.location}</code>}</div></article>)}</div>
          </div>}
        </section>
      )}
    </main>
  );
}
