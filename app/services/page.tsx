"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const solutions = [
  { number: "01", title: "Website Development", text: "High-performance websites and digital experiences built to communicate clearly and convert visitors into customers.", points: ["Corporate & business websites", "Landing pages", "CMS & SEO", "Performance-first builds"] },
  { number: "02", title: "ERP Systems", text: "Bring the operational side of your business together with software built around your real workflows.", points: ["Inventory & purchasing", "Sales & finance", "HR & staff management", "Reporting & dashboards"], id: "erp" },
  { number: "03", title: "POS Systems", text: "Modern point-of-sale systems for retail, restaurants and growing businesses that need speed, control and better data.", points: ["Fast checkout", "Products & inventory", "Staff permissions", "Sales & business reports"], id: "pos" },
  { number: "04", title: "Custom Software", text: "Purpose-built platforms for processes that off-the-shelf software cannot handle well.", points: ["Business applications", "Internal tools", "Automation", "API integrations"] },
  { number: "05", title: "AI Solutions", text: "Practical AI that reduces repetitive work, improves decisions and gives teams useful new capabilities.", points: ["AI assistants", "Document workflows", "Intelligent automation", "AI integrations"] },
  { number: "06", title: "Cybersecurity", text: "Security assessments and engineering that reduce risk across applications, infrastructure and business systems.", points: ["Security assessments", "Vulnerability reviews", "Application security", "Risk & hardening"] },
  { number: "07", title: "Cloud Solutions", text: "Reliable infrastructure and deployment foundations designed for performance, resilience and growth.", points: ["Cloud deployment", "Infrastructure", "Monitoring", "Performance optimisation"] },
];

const process = [
  ["01", "Discover", "We understand your business, users, constraints and the outcome that matters."],
  ["02", "Design", "We map the experience and system architecture before development starts."],
  ["03", "Build", "We engineer, test and refine the product with performance and security in mind."],
  ["04", "Grow", "We keep improving the system as your business, team and customers evolve."],
];

export default function ServicesPage() {
  return (
    <main className="overflow-hidden pt-24">
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24">
        <Reveal><span className="eyebrow">SOLUTIONS · DIGITAL ENGINEERING</span></Reveal>
        <Reveal delay={80}><h1 className="mt-7 max-w-6xl text-[clamp(3.4rem,8vw,7.8rem)] font-semibold leading-[.9] tracking-[-.07em]">Technology designed around <span className="text-[var(--blue)]">your business.</span></h1></Reveal>
        <Reveal delay={160}><p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">Choose the outcome you need. We&apos;ll help you find the right combination of software, automation, infrastructure and security.</p></Reveal>
        <Reveal delay={230}><div className="mt-10 flex flex-wrap gap-3"><Link href="/quote" className="nav-cta min-h-12 px-6">Request a quote ↗</Link><a href="#solutions" className="glass-button inline-flex min-h-12 items-center rounded-full px-6 text-sm font-semibold">Browse solutions ↓</a></div></Reveal>
      </section>

      <section id="solutions" className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <Reveal><div className="mb-12 max-w-3xl"><p className="section-kicker">What we build</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">From the customer experience to the back office.</h2></div></Reveal>
        <div className="grid border-l border-t border-[var(--border)] md:grid-cols-2">
          {solutions.map((solution, index) => <Reveal key={solution.number} delay={index * 50}><article id={solution.id} className="group relative min-h-[380px] border-b border-r border-[var(--border)] bg-[var(--background)] p-8 transition-colors duration-300 hover:bg-[var(--surface)] sm:p-10 lg:p-12"><div className="flex items-start justify-between"><span className="text-xs font-bold tracking-[.18em] text-[var(--blue)]">{solution.number}</span><span className="text-[var(--text-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></div><div className="mt-20"><h3 className="text-3xl font-semibold tracking-[-.045em] sm:text-4xl">{solution.title}</h3><p className="mt-4 max-w-xl leading-7 text-[var(--text-secondary)]">{solution.text}</p></div><ul className="mt-8 grid gap-2 sm:grid-cols-2">{solution.points.map(point => <li key={point} className="text-sm text-[var(--text-secondary)]"><span className="mr-2 text-[var(--blue)]">+</span>{point}</li>)}</ul></article></Reveal>)}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)]"><div className="grid lg:grid-cols-[.7fr_1.3fr]"><div className="p-8 sm:p-12 lg:p-16"><p className="section-kicker">Our process</p><h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Clear from day one.</h2></div><div className="border-t border-[var(--border)] lg:border-l lg:border-t-0">{process.map(([num,title,text], i) => <Reveal key={num} delay={i * 70}><div className="grid gap-4 border-b border-[var(--border)] p-8 last:border-b-0 sm:grid-cols-[70px_150px_1fr] sm:p-10"><span className="text-xs font-bold text-[var(--blue)]">{num}</span><h3 className="font-semibold">{title}</h3><p className="text-sm leading-6 text-[var(--text-secondary)]">{text}</p></div></Reveal>)}</div></div></div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-12"><div className="rounded-[30px] bg-[var(--foreground)] px-7 py-20 text-center text-[var(--background)] sm:px-12"><p className="text-xs font-bold uppercase tracking-[.18em] text-[var(--blue-light)]">Not sure what you need?</p><h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Start with the problem.</h2><p className="mx-auto mt-5 max-w-xl leading-7 opacity-70">Tell us how your business works today. We&apos;ll help identify where technology can make the biggest difference.</p><Link href="/quote" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-7 text-sm font-bold text-black transition hover:-translate-y-1">Tell us about it ↗</Link></div></section>
    </main>
  );
}
