import Link from "next/link";

type Section = { title: string; body: React.ReactNode };

export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: Section[];
}) {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)] pt-28">
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)] sm:text-xs">{eyebrow}</p>
          <h1 className="mt-5 font-[var(--font-space-grotesk)] text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">{title}</h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">{intro}</p>
          <p className="mt-6 text-xs text-[var(--subtle)]">Last updated: {updated}</p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <article className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <section key={section.title} className="grid gap-5 border-t border-[var(--border)] pt-8 md:grid-cols-[56px_0.7fr_1.3fr] md:gap-8">
                <span className="text-xs text-[var(--subtle)]">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="font-[var(--font-space-grotesk)] text-xl font-semibold tracking-[-0.03em]">{section.title}</h2>
                <div className="space-y-4 text-sm leading-8 text-[var(--muted)]">{section.body}</div>
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-[var(--border)] pt-8 text-sm leading-7 text-[var(--muted)]">
            <Link href="/contact" className="font-medium text-[var(--text)] underline decoration-[var(--accent)] underline-offset-4 hover:text-[var(--accent)]">Contact OLYR Labs</Link> if you have a privacy, legal, or website-use question.
          </div>
        </article>
      </section>
    </main>
  );
}
