"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const principles = [
  ["01", "Purpose over noise", "Technology should solve a real problem and create a measurable improvement."],
  ["02", "Security from the start", "Security, privacy and resilience belong in the architecture from day one."],
  ["03", "Built to evolve", "We create flexible foundations that can grow with the people and business using them."],
  ["04", "Stay curious", "We keep learning, testing and exploring so our clients can benefit from what is next."],
];

const capabilities = ["Websites", "ERP", "POS", "Custom Software", "AI", "Cloud", "Cybersecurity"];

export default function AboutPage() {
  return (
    <main className="overflow-hidden pt-24">
      <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-16 sm:px-8 lg:px-12 lg:pb-32 lg:pt-24">
        <Reveal><span className="eyebrow">ABOUT OLYR LABS</span></Reveal>
        <Reveal delay={80}><h1 className="mt-7 max-w-6xl text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[.88] tracking-[-.07em]">We build technology with <span className="text-[var(--blue)]">purpose.</span></h1></Reveal>
        <Reveal delay={160}><p className="mt-9 max-w-3xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">OLYR Labs is a technology company focused on practical digital systems — from customer-facing experiences to the software and security that keep businesses moving.</p></Reveal>
      </section>

      <section className="border-y border-[var(--border)]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.55fr_1.45fr] lg:px-12 lg:py-28">
          <Reveal><div><p className="section-kicker">01 / Who we are</p><div className="mt-10 h-px w-16 bg-[var(--blue)]" /></div></Reveal>
          <Reveal delay={100}><div><h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-.05em] sm:text-6xl">Technology should make complicated things feel simple.</h2><div className="mt-8 max-w-3xl space-y-6 text-lg leading-8 text-[var(--text-secondary)]"><p>We started OLYR Labs around a simple belief: businesses deserve technology that fits the way they actually work.</p><p>We understand the workflow first, choose the right tools second, and build experiences that people can use without fighting the software.</p><p>Our work spans websites, ERP and POS systems, custom software, AI, cloud infrastructure and cybersecurity.</p></div></div></Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <Reveal><div className="max-w-3xl"><p className="section-kicker">02 / How we think</p><h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">A small set of principles keeps the work honest.</h2></div></Reveal>
        <div className="mt-16 divide-y border-y border-[var(--border)]">{principles.map(([num, title, text], i) => <Reveal key={num} delay={i * 60}><article className="group grid gap-5 py-8 sm:grid-cols-[80px_1fr_1.2fr] sm:items-start sm:py-10"><span className="text-xs font-bold tracking-[.18em] text-[var(--blue)]">{num}</span><h3 className="text-2xl font-semibold tracking-[-.04em] transition-transform duration-300 group-hover:translate-x-1">{title}</h3><p className="max-w-xl leading-7 text-[var(--text-secondary)]">{text}</p></article></Reveal>)}</div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]"><div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12 lg:py-28"><Reveal><div><p className="section-kicker">03 / What we build</p><h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">One partner across the stack.</h2><p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">From a first website to the systems running daily operations, we bring product thinking, engineering and security together.</p></div></Reveal><Reveal delay={100}><div className="flex flex-wrap content-start gap-x-8 gap-y-5 border-t border-[var(--border)] pt-7 lg:border-t-0 lg:pt-2">{capabilities.map((item, i) => <Link key={item} href="/services" className="group flex items-center gap-3 text-2xl font-semibold tracking-[-.04em] sm:text-3xl"><span className="text-xs font-bold text-[var(--blue)]">0{i + 1}</span><span className="transition-transform duration-300 group-hover:translate-x-1">{item}</span><span className="text-base text-[var(--text-muted)] transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span></Link>)}</div></Reveal></div></section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"><Reveal><div className="grid gap-10 border-t border-[var(--border)] pt-10 lg:grid-cols-[.55fr_1.45fr]"><p className="section-kicker">04 / Our direction</p><div><h2 className="max-w-4xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Build useful. Secure it. Keep improving.</h2><p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">We are building OLYR Labs for the long term — growing our capabilities while staying close to the businesses and people our products serve.</p></div></div></Reveal></section>

      <section className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-12"><div className="relative overflow-hidden rounded-[32px] bg-[var(--foreground)] px-7 py-20 text-center text-[var(--background)] sm:px-12 lg:py-28"><div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[110px]" /><div className="relative mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[var(--blue-light)]">Work with us</p><h2 className="mt-5 text-5xl font-semibold tracking-[-.06em] sm:text-7xl">Let&apos;s build what&apos;s next.</h2><Link href="/quote" className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-black shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:bg-[var(--blue)] hover:text-white">Start a conversation <span aria-hidden="true">↗</span></Link></div></div></section>
    </main>
  );
}
