import QuoteForm from "@/components/QuoteForm";

export default function QuotePage() {
  return (
    <main className="overflow-hidden pt-24">
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-16 sm:px-8 lg:px-12 lg:pb-20 lg:pt-24">
        <span className="eyebrow">PROJECT ENQUIRY</span>
        <h1 className="mt-7 max-w-5xl text-[clamp(3.5rem,8vw,7.6rem)] font-semibold leading-[.9] tracking-[-.07em]">Tell us what you want to <span className="text-[var(--blue)]">build.</span></h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">A few details help us understand your goals, recommend the right solution and give you a useful starting point.</p>
      </section>
      <section className="mx-auto max-w-[1100px] px-5 pb-8 sm:px-8 lg:px-12"><div className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-md)] sm:p-8 lg:p-12"><QuoteForm /></div></section>
    </main>
  );
}
