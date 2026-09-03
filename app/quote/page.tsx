import QuoteForm from "@/components/QuoteForm";

export default function QuotePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--text)]">
      <section className="relative pt-28 sm:pt-36">
        <div className="pointer-events-none absolute left-[6%] top-24 h-80 w-80 rounded-full bg-blue-500/[0.10] blur-[130px]" />
        <div className="pointer-events-none absolute right-[-8%] top-1/3 h-96 w-96 rounded-full bg-cyan-400/[0.07] blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">Request a quote</p>
              <h1 className="mt-5 max-w-xl font-[var(--font-space-grotesk)] text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-6xl lg:text-7xl">Tell us what you&apos;re building.</h1>
              <p className="mt-7 max-w-md text-base leading-7 text-[var(--muted)]">Give us the context. We&apos;ll help shape the right technology, scope, and next step.</p>
              <div className="mt-10 border-t border-[var(--border)] pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Prefer email?</p>
                <a href="mailto:hello@olyrlabs.com" className="mt-3 inline-block text-sm font-medium transition hover:text-[var(--accent)]">hello@olyrlabs.com</a>
              </div>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </main>
  );
}
