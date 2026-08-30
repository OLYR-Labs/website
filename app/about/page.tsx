"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const principles = [
  ["01", "Purpose over noise", "Technology should solve a real problem and create a measurable improvement."],
  ["02", "Security from the start", "We treat security, privacy and resilience as engineering requirements, not afterthoughts."],
  ["03", "Built to evolve", "We prefer flexible foundations that can grow with the people and business using them."],
  ["04", "Stay curious", "We keep learning, testing and exploring so our clients can benefit from what is next."],
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden pt-24">
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24"><Reveal><span className="eyebrow">ABOUT OLYR LABS</span></Reveal><Reveal delay={80}><h1 className="mt-7 max-w-6xl text-[clamp(3.5rem,8vw,7.8rem)] font-semibold leading-[.9] tracking-[-.07em]">We build technology with <span className="text-[var(--blue)]">purpose.</span></h1></Reveal><Reveal delay={160}><p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">OLYR Labs is a technology company focused on building practical digital systems — from customer-facing experiences to the software and security that keep businesses moving.</p></Reveal></section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-24 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:px-12 lg:pb-32"><Reveal><p className="section-kicker">Who we are</p></Reveal><Reveal delay={100}><div><h2 className="text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Technology should make complicated things feel simple.</h2><div className="mt-8 space-y-6 text-lg leading-8 text-[var(--text-secondary)]"><p>We started OLYR Labs around a simple belief: businesses deserve technology that fits the way they actually work.</p><p>That means understanding the workflow first, choosing the right tools second, and building an experience that people can use without fighting the software.</p><p>Our work spans websites, ERP and POS systems, custom software, AI, cloud infrastructure and cybersecurity.</p></div></div></Reveal></section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32"><Reveal><div className="mb-12 max-w-3xl"><p className="section-kicker">How we think</p><h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Four principles. One standard: build it properly.</h2></div></Reveal><div className="grid border-l border-t border-[var(--border)] md:grid-cols-2">{principles.map(([num,title,text], i) => <Reveal key={num} delay={i * 60}><article className="min-h-[280px] border-b border-r border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10"><span className="text-xs font-bold tracking-[.18em] text-[var(--blue)]">{num}</span><h3 className="mt-20 text-2xl font-semibold tracking-[-.04em]">{title}</h3><p className="mt-4 max-w-md leading-7 text-[var(--text-secondary)]">{text}</p></article></Reveal>)}</div></section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32"><div className="grid rounded-[30px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)] lg:grid-cols-2"><div className="p-8 sm:p-12 lg:p-16"><p className="section-kicker">Our direction</p><h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Build useful. Secure it. Keep improving.</h2></div><div className="border-t border-[var(--border)] p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-16"><p className="text-lg leading-8 text-[var(--text-secondary)]">We are building OLYR Labs for the long term — growing our capabilities while staying close to the businesses and people our products serve.</p><div className="mt-10 grid grid-cols-2 gap-3">{["Web", "ERP", "POS", "AI", "Cloud", "Security"].map(item => <div key={item} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-sm font-semibold">{item}</div>)}</div></div></div></section>

      <section className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-12"><div className="rounded-[30px] bg-[var(--foreground)] px-7 py-20 text-center text-[var(--background)] sm:px-12"><p className="text-xs font-bold uppercase tracking-[.18em] text-[var(--blue-light)]">Work with us</p><h2 className="mt-5 text-5xl font-semibold tracking-[-.06em] sm:text-7xl">Let&apos;s build what&apos;s next.</h2><Link href="/contact" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-7 text-sm font-bold text-black transition hover:-translate-y-1">Start a conversation ↗</Link></div></section>
    </main>
  );
}
