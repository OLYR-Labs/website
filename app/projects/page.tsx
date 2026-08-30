"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const projects = [
  { number: "01", type: "Product platform", title: "OLYR Labs Platform", text: "The digital foundation for OLYR Labs — designed around clear service discovery, conversion and a premium technology brand experience.", tags: ["Next.js", "React", "Cloud"], status: "Live", href: "/" },
  { number: "02", type: "Business software", title: "Budget Go", text: "A business-focused software platform built around ordering, branches, operations and management workflows.", tags: ["Software", "ERP", "Operations"], status: "Building" },
  { number: "03", type: "Cybersecurity", title: "OLYR SecureScan", text: "Security intelligence tooling designed to help teams inspect websites, technologies and common security risks.", tags: ["Security", "Assessment", "Automation"], status: "Live", href: "/projects/secure-scan" },
  { number: "04", type: "AI & automation", title: "AI Business Systems", text: "A growing set of concepts exploring how AI can automate repetitive communication, documents and business workflows.", tags: ["AI", "Automation", "APIs"], status: "Prototype" },
];

const concepts = [
  ["AUREL", "Luxury commerce", "/projects/aurel.jpg"],
  ["VELORA", "Fashion commerce", "/projects/velora.jpg"],
  ["LUMIÈRE", "Hospitality", "/projects/lumiere.jpg"],
];

export default function ProjectsPage() {
  return (
    <main className="overflow-hidden pt-24">
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24"><Reveal><span className="eyebrow">SELECTED WORK</span></Reveal><Reveal delay={80}><h1 className="mt-7 max-w-6xl text-[clamp(3.5rem,8vw,7.8rem)] font-semibold leading-[.9] tracking-[-.07em]">Work that turns <span className="text-[var(--blue)]">ideas into systems.</span></h1></Reveal><Reveal delay={160}><p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">Explore products, platforms and concepts from OLYR Labs. Some are live, some are being built, and some exist to explore what a great digital experience could look like.</p></Reveal></section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32"><Reveal><div className="mb-12"><p className="section-kicker">Products & platforms</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Selected work.</h2></div></Reveal><div className="border-y border-[var(--border)]">{projects.map((project, i) => <Reveal key={project.number} delay={i * 60}><article className="group border-b border-[var(--border)] py-9 last:border-b-0 sm:py-12"><div className="grid gap-6 lg:grid-cols-[70px_190px_1fr_180px] lg:items-start lg:gap-8"><span className="text-xs font-bold text-[var(--blue)]">{project.number}</span><div><p className="text-xs font-bold uppercase tracking-[.15em] text-[var(--text-muted)]">{project.type}</p><span className="mt-3 inline-flex rounded-full border border-[var(--border)] px-3 py-1 text-[11px] text-[var(--text-secondary)]"><i className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-[var(--blue)]" />{project.status}</span></div><div><h3 className="text-3xl font-semibold tracking-[-.045em] transition group-hover:text-[var(--blue)] sm:text-4xl">{project.title}</h3><p className="mt-4 max-w-2xl leading-7 text-[var(--text-secondary)]">{project.text}</p><div className="mt-5 flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-muted)]">{tag}</span>)}</div></div><div className="lg:text-right">{project.href ? <Link href={project.href} className="inline-flex text-sm font-bold text-[var(--blue)] transition group-hover:translate-x-1">View project ↗</Link> : <span className="text-sm text-[var(--text-muted)]">In progress</span>}</div></div></article></Reveal>)}</div></section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32"><Reveal><div className="mb-12 max-w-3xl"><p className="section-kicker">Design concepts</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Different brands. Different worlds.</h2><p className="mt-5 leading-7 text-[var(--text-secondary)]">Visual explorations that show how we adapt digital experiences to different industries, audiences and brand personalities.</p></div></Reveal><div className="grid gap-5 md:grid-cols-3">{concepts.map(([title, category, image], i) => <Reveal key={title} delay={i * 80}><article className="group overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)]"><div className="aspect-[4/3] overflow-hidden bg-[var(--surface-soft)]">{image ? <img src={image} alt={`${title} concept`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-4xl font-semibold text-[var(--text-subtle)]">{title}</div>}</div><div className="p-6"><p className="text-xs font-bold uppercase tracking-[.15em] text-[var(--blue)]">{category}</p><h3 className="mt-3 text-2xl font-semibold tracking-[-.04em]">{title}</h3></div></article></Reveal>)}</div></section>

      <section className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-12"><div className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-sm)] sm:p-12 lg:flex lg:items-center lg:justify-between"><div><p className="section-kicker">Your project</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Ready to make the next one?</h2></div><Link href="/quote" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--foreground)] px-7 text-sm font-bold text-[var(--background)] transition hover:-translate-y-1 hover:bg-[var(--blue)] hover:text-white lg:mt-0">Start a project ↗</Link></div></section>
    </main>
  );
}
