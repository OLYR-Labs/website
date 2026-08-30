"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const solutions = [
  { number: "01", title: "Websites", text: "Fast, conversion-focused digital experiences built around your brand." },
  { number: "02", title: "ERP Systems", text: "Connect finance, inventory, operations, HR and reporting in one system." },
  { number: "03", title: "POS Systems", text: "Modern point-of-sale workflows for retail, restaurants and growing teams." },
  { number: "04", title: "Custom Software", text: "Purpose-built platforms that fit the way your business actually works." },
  { number: "05", title: "AI Solutions", text: "Practical automation and intelligent tools that reduce repetitive work." },
  { number: "06", title: "Cybersecurity", text: "Security reviews, hardening and protection for the systems you depend on." },
];

const stats = [
  ["01", "Strategy", "Understand the business before writing the software."],
  ["02", "Build", "Design and engineer a solution around real workflows."],
  ["03", "Scale", "Keep improving as your team, customers and operations grow."],
];

export default function Home() {
  return (
    <main className="overflow-hidden pt-24">
      <section className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute left-1/3 top-1/2 h-[360px] w-[360px] rounded-full bg-sky-400/5 blur-[110px]" />

        <div className="relative grid items-end gap-14 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <Reveal><span className="eyebrow">OLYR LABS · DIGITAL ENGINEERING</span></Reveal>
            <Reveal delay={80}>
              <h1 className="mt-7 max-w-5xl text-[clamp(3.6rem,9vw,8.8rem)] font-semibold leading-[.88] tracking-[-.07em] text-[var(--text-primary)]">
                Technology that<span className="block text-[var(--blue)]">moves business.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">
                We design and build premium websites, ERP and POS systems, custom software, AI solutions and cybersecurity platforms for businesses ready to grow.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/quote" className="nav-cta min-h-12 px-6 text-sm">Start a project <span aria-hidden="true">↗</span></Link>
                <Link href="/services" className="glass-button inline-flex min-h-12 items-center rounded-full px-6 text-sm font-semibold">Explore solutions <span className="ml-2 text-[var(--blue)]" aria-hidden="true">→</span></Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <div className="relative min-h-[360px] overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-lg)]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(23,105,255,.06)_45%,transparent_75%)]" />
              <div className="relative flex h-full min-h-[308px] flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[.18em] text-[var(--text-muted)]"><span>Business systems</span><span>01—06</span></div>
                <div className="space-y-3">
                  {["ERP", "POS", "AI", "SECURITY"].map((item, index) => (
                    <div key={item} className="group flex items-center justify-between border-b border-[var(--border)] py-4">
                      <span className="text-2xl font-semibold tracking-[-.04em] transition-transform duration-300 group-hover:translate-x-2">{item}</span><span className="text-sm text-[var(--text-muted)]">0{index + 1}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm leading-6 text-[var(--text-muted)]">One technology partner. From your first idea to the systems that run the business.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-[1440px] overflow-hidden px-5 py-5 sm:px-8 lg:px-12">
          <div className="flex min-w-max animate-marquee items-center gap-10 text-xs font-bold tracking-[.22em] text-[var(--text-muted)]">
            {["WEBSITES", "ERP SYSTEMS", "POS SYSTEMS", "CUSTOM SOFTWARE", "AI", "CYBERSECURITY", "CLOUD", "AUTOMATION", "WEBSITES", "ERP SYSTEMS", "POS SYSTEMS", "CUSTOM SOFTWARE", "AI", "CYBERSECURITY", "CLOUD", "AUTOMATION"].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-10"><i className="h-1.5 w-1.5 rounded-full bg-[var(--blue)]" />{item}</span>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <Reveal>
          <div className="max-w-3xl"><p className="section-kicker">Solutions</p><h2 className="mt-5 text-5xl font-semibold tracking-[-.06em] sm:text-7xl">The systems behind better businesses.</h2><p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">From the storefront to the back office, we build technology around the problems that actually matter.</p></div>
        </Reveal>
        <div className="mt-14 grid border-l border-t border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <Reveal key={solution.number} delay={index * 60}>
              <Link href="/services" className="group relative block min-h-[290px] border-b border-r border-[var(--border)] bg-[var(--background)] p-7 transition-colors duration-300 hover:bg-[var(--surface)] sm:p-9">
                <div className="flex items-start justify-between"><span className="text-xs font-bold tracking-[.18em] text-[var(--text-subtle)]">{solution.number}</span><span className="text-[var(--blue)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">↗</span></div>
                <div className="mt-24"><h3 className="text-3xl font-semibold tracking-[-.045em] transition-colors duration-300 group-hover:text-[var(--blue)]">{solution.title}</h3><p className="mt-4 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">{solution.text}</p></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="grid overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)] lg:grid-cols-[.75fr_1.25fr]">
          <div className="relative p-8 sm:p-12 lg:p-16"><p className="section-kicker">Why OLYR</p><h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Built with business in mind.</h2><p className="mt-6 max-w-lg leading-7 text-[var(--text-secondary)]">Good software should feel simple to the people using it, even when the systems underneath are sophisticated.</p></div>
          <div className="grid border-t border-[var(--border)] lg:border-l lg:border-t-0">
            {stats.map(([number, title, text], index) => <Reveal key={number} delay={index * 70}><div className="grid gap-6 border-b border-[var(--border)] p-8 last:border-b-0 sm:grid-cols-[90px_160px_1fr] sm:items-start sm:p-10"><span className="text-xs font-bold tracking-[.18em] text-[var(--blue)]">{number}</span><h3 className="text-xl font-semibold tracking-[-.03em]">{title}</h3><p className="text-sm leading-6 text-[var(--text-secondary)]">{text}</p></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--foreground)] px-7 py-20 text-center text-[var(--background)] sm:px-12 lg:py-28">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[110px]" />
          <div className="relative mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--blue-light)]">Have a challenge?</p><h2 className="mt-5 text-5xl font-semibold tracking-[-.06em] sm:text-7xl">Let&apos;s build the right system.</h2><p className="mx-auto mt-6 max-w-xl text-base leading-7 opacity-70">Tell us what you are trying to improve. We&apos;ll help turn it into a clear, practical technology plan.</p><Link href="/quote" className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-black transition-transform duration-200 hover:-translate-y-1">Start a conversation <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
    </main>
  );
}
