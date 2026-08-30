"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const solutions = [
  { number: "01", title: "Websites", description: "High-performance websites and digital experiences designed to turn attention into action.", link: "/services/website-development" },
  { number: "02", title: "ERP Systems", description: "Centralize inventory, purchasing, finance, staff, reporting and operations in one connected platform.", link: "/services/software-development" },
  { number: "03", title: "POS Systems", description: "Reliable point-of-sale software for retail, restaurants and service businesses, with workflows that match your operation.", link: "/services/software-development" },
  { number: "04", title: "Custom Software", description: "Purpose-built applications, portals, dashboards and automation for processes off-the-shelf tools cannot handle.", link: "/services/software-development" },
  { number: "05", title: "AI Solutions", description: "Useful AI assistants, document workflows, automation and integrations that save teams time.", link: "/services/ai-solutions" },
  { number: "06", title: "Cybersecurity", description: "Security assessments, application reviews and practical hardening for the systems your business relies on.", link: "/services/cybersecurity" },
  { number: "07", title: "Cloud & Infrastructure", description: "Scalable deployment, infrastructure and performance engineering for modern digital products.", link: "/services/cloud-solutions" },
];

const process = [
  ["01", "Understand", "We map the business problem, users and workflows before recommending technology."],
  ["02", "Design", "We turn those requirements into a clear experience, architecture and implementation plan."],
  ["03", "Build", "We engineer, test and launch the solution with performance, security and maintainability in mind."],
  ["04", "Evolve", "We improve the system as your business grows, adding capability without creating unnecessary complexity."],
];

export default function ServicesPage() {
  return (
    <main className="overflow-hidden pt-24">
      <section className="relative mx-auto max-w-[1440px] px-5 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28">
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[130px]" />
        <Reveal>
          <span className="eyebrow">SOLUTIONS · OLYR LABS</span>
          <h1 className="mt-7 max-w-6xl text-[clamp(3.4rem,8vw,7.8rem)] font-semibold leading-[.9] tracking-[-.07em]">Technology built <span className="text-[var(--blue)]">around your business.</span></h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">From the website customers see to the ERP and POS systems your team uses every day, we build practical technology that makes operations simpler and businesses stronger.</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <Reveal><div className="max-w-3xl"><p className="section-kicker">What we build</p><h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">One partner. The whole digital stack.</h2></div></Reveal>
        <div className="mt-14 grid border-l border-t border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <Reveal key={solution.number} delay={index * 55}>
              <Link href={solution.link} className="group block min-h-[330px] border-b border-r border-[var(--border)] bg-[var(--background)] p-8 transition-colors duration-300 hover:bg-[var(--surface)] sm:p-10">
                <div className="flex justify-between text-xs font-bold tracking-[.18em] text-[var(--text-subtle)]"><span>{solution.number}</span><span className="text-[var(--blue)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></div>
                <div className="mt-28"><h3 className="text-3xl font-semibold tracking-[-.045em] transition-colors group-hover:text-[var(--blue)]">{solution.title}</h3><p className="mt-4 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">{solution.description}</p></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="grid overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)] lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-16"><p className="section-kicker">Business systems</p><h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">ERP + POS, without the complexity.</h2><p className="mt-6 max-w-xl leading-7 text-[var(--text-secondary)]">We can build a system around your exact workflows instead of forcing your team to adapt to software that was never designed for the way you operate.</p><div className="mt-8 flex flex-wrap gap-2">{["Inventory", "Sales", "Purchasing", "Finance", "Staff", "Reporting"].map((item) => <span key={item} className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">{item}</span>)}</div></div>
          <div className="grid border-t border-[var(--border)] sm:grid-cols-2 lg:border-l lg:border-t-0">
            <div className="border-b border-[var(--border)] p-8 sm:border-r lg:border-b-0"><span className="text-xs font-bold tracking-[.18em] text-[var(--blue)]">ERP</span><h3 className="mt-5 text-2xl font-semibold">Run the business.</h3><p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">Connected operations, inventory, finance, staff and reporting.</p></div>
            <div className="p-8"><span className="text-xs font-bold tracking-[.18em] text-[var(--blue)]">POS</span><h3 className="mt-5 text-2xl font-semibold">Serve the customer.</h3><p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">Fast sales workflows, product management and actionable reporting.</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <Reveal><p className="section-kicker">How we work</p><h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">From business problem to working system.</h2></Reveal>
        <div className="mt-12 border-t border-[var(--border)]">
          {process.map(([number, title, text], index) => <Reveal key={number} delay={index * 70}><div className="grid gap-5 border-b border-[var(--border)] py-9 sm:grid-cols-[90px_190px_1fr]"><span className="text-xs font-bold tracking-[.18em] text-[var(--blue)]">{number}</span><h3 className="text-xl font-semibold">{title}</h3><p className="max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">{text}</p></div></Reveal>)}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-12"><div className="rounded-[32px] bg-[var(--foreground)] px-7 py-20 text-center text-[var(--background)] sm:px-12 lg:py-28"><p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--blue-light)]">Ready to build?</p><h2 className="mx-auto mt-5 max-w-3xl text-5xl font-semibold tracking-[-.06em] sm:text-7xl">Let&apos;s design the right solution.</h2><Link href="/quote" className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-black transition-transform hover:-translate-y-1">Request a quote <span>↗</span></Link></div></section>
    </main>
  );
}
