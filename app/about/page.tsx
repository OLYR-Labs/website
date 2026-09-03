"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const capabilities = ["Software", "AI", "Cybersecurity", "Automation"];
const values = [
  { title: "Useful", text: "We build technology that solves a real problem." },
  { title: "Secure", text: "Security and privacy belong in the foundation." },
  { title: "Built to grow", text: "Our systems are designed for the next stage, not just today." },
  { title: "Curious", text: "We keep learning, testing, and improving what we build." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div className="pointer-events-none absolute right-[-8%] top-1/4 h-96 w-96 rounded-full bg-blue-500/[0.10] blur-[140px]" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">About OLYR Labs</p>
            <h1 className="mt-5 max-w-4xl font-[var(--font-space-grotesk)] text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl lg:text-8xl">We build technology<br /><span className="text-[var(--muted)]">people can rely on.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">OLYR Labs is a technology studio building software, digital products, AI systems, and security solutions for modern businesses.</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--border)] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">Who we are</p></Reveal>
          <Reveal delay={100}><div><h2 className="max-w-3xl font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Technology should make business simpler.</h2><p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">We work across software, AI, cybersecurity, and automation to turn ideas and everyday business problems into practical digital products.</p><p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">We care about clean design, dependable engineering, and building things that can grow with the people using them.</p></div></Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-cyan-400/[0.06] blur-[120px]" />
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">What we explore</p><h2 className="mt-4 font-[var(--font-space-grotesk)] text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">Where technology meets opportunity.</h2></Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item, index) => <Reveal key={item} delay={index * 70}><div className="group rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-7 transition duration-500 hover:-translate-y-1 hover:border-blue-400/40"><div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-400/25 to-cyan-300/5 ring-1 ring-blue-300/20" /><h3 className="mt-14 font-[var(--font-space-grotesk)] text-2xl font-semibold tracking-[-0.04em]">{item}</h3></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">How we think</p><h2 className="mt-4 font-[var(--font-space-grotesk)] text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">Simple principles. Better work.</h2></Reveal><div className="mt-12 grid gap-4 md:grid-cols-2">{values.map((value, index) => <Reveal key={value.title} delay={index * 70}><article className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-9"><h3 className="font-[var(--font-space-grotesk)] text-2xl font-semibold">{value.title}</h3><p className="mt-3 max-w-md text-sm leading-7 text-[var(--muted)]">{value.text}</p></article></Reveal>)}</div></div>
      </section>

      <section className="py-24 sm:py-32"><Reveal><div className="mx-auto max-w-4xl px-5 text-center sm:px-6"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">Work with us</p><h2 className="mt-4 font-[var(--font-space-grotesk)] text-5xl font-semibold tracking-[-0.07em] sm:text-7xl">Have something to build?</h2><Link href="/contact" className="mt-8 inline-flex rounded-full bg-[var(--text)] px-7 py-3.5 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5 hover:bg-[var(--accent)] hover:text-white">Start a Conversation →</Link></div></Reveal></section>
    </main>
  );
}
