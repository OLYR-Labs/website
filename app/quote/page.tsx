import QuoteForm from "@/components/QuoteForm";

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div className="pointer-events-none absolute left-[8%] top-24 h-72 w-72 rounded-full bg-blue-500/[0.10] blur-[120px]" />
        <div className="pointer-events-none absolute right-[-8%] top-1/3 h-96 w-96 rounded-full bg-cyan-400/[0.07] blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20 lg:px-8 lg:py-28">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">Request a quote</p>
            <h1 className="mt-5 max-w-xl font-[var(--font-space-grotesk)] text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl">
              Let&apos;s make it real.
            </h1>
            <div className="mt-10 space-y-5 border-t border-[var(--border)] pt-7 text-sm leading-7 text-[var(--muted)]">
              <p>Tell us what you want to build, improve, secure, or automate.</p>
              <a href="mailto:hello@olyrlabs.com" className="block font-medium text-[var(--text)] transition hover:text-[var(--accent)]">hello@olyrlabs.com</a>
              <p>We&apos;ll review the details and get back to you with the next step.</p>
            </div>
          </div>

          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
