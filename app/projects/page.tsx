"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const projects = [
  { category: "OLYR Labs", title: "Digital Platform", description: "The technology foundation behind OLYR Labs.", tags: ["Next.js", "React", "Cloud"], link: "/" },
  { category: "AI", title: "AI Business Assistant", description: "A practical assistant concept for smarter communication and workflows.", tags: ["AI", "Automation", "APIs"] },
  { category: "Software", title: "Digital Products & Platforms", description: "Custom systems designed around operational challenges.", tags: ["Software", "Platforms", "Systems"] },
  { category: "Cybersecurity", title: "OLYR SecureScan", description: "Security intelligence for understanding website and application risk.", tags: ["Security", "Assessment"], link: "/projects/secure-scan" },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <section className="relative overflow-hidden pt-28 sm:pt-36"><div className="pointer-events-none absolute right-[-8%] top-1/4 h-96 w-96 rounded-full bg-blue-500/[0.10] blur-[140px]" /><div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28"><Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">Our work</p><h1 className="mt-5 max-w-4xl font-[var(--font-space-grotesk)] text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl lg:text-8xl">Built, tested,<br /><span className="text-[var(--muted)]">and in progress.</span></h1><p className="mt-7 max-w-2xl text-base leading-7 text-[var(--muted)]">A look at the products, platforms, and technology we are building at OLYR Labs.</p></Reveal></div></section>
      <section className="border-y border-[var(--border)] py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><div className="grid gap-5 md:grid-cols-2">{projects.map((project,index)=><Reveal key={project.title} delay={index*80}><Link href={project.link || "#"} className="group block h-full rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 transition duration-500 hover:-translate-y-1 hover:border-blue-400/40 sm:p-9"><div className="pointer-events-none absolute" /><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{project.category}</p><h2 className="mt-14 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">{project.title}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">{project.description}</p><div className="mt-7 flex flex-wrap gap-2">{project.tags.map(tag=><span key={tag} className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs text-[var(--muted)]">{tag}</span>)}</div><span className="mt-8 inline-flex text-sm font-semibold text-[var(--accent)] transition group-hover:translate-x-1">View project →</span></Link></Reveal>)}</div></div></section>
      <section className="py-24 sm:py-32"><Reveal><div className="mx-auto max-w-4xl px-5 text-center sm:px-6"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">Start building</p><h2 className="mt-4 font-[var(--font-space-grotesk)] text-5xl font-semibold tracking-[-0.07em] sm:text-7xl">Your project could be next.</h2><Link href="/quote" className="mt-8 inline-flex rounded-full bg-[var(--text)] px-7 py-3.5 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5 hover:bg-[var(--accent)] hover:text-white">Request a Quote →</Link></div></Reveal></section>
    </main>
  );
}
