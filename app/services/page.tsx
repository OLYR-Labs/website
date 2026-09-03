"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const services = [
  { title: "Website Development", description: "Premium websites that are fast, responsive, and built around your brand.", features: ["Business & corporate sites", "E-commerce", "CMS, SEO & analytics"], link: "/services/website-development" },
  { title: "Software Development", description: "Custom software for the processes that off-the-shelf tools cannot handle.", features: ["Business systems", "Web applications", "APIs & integrations"], link: "/services/software-development" },
  { title: "Web Apps & Mobile", description: "Useful digital products for customers, teams, and the people behind your business.", features: ["iOS & Android", "Portals & dashboards", "Cross-platform apps"], link: "/services/mobile-development" },
  { title: "ERP & POS Systems", description: "One connected system for sales, inventory, operations, customers, and reporting.", features: ["ERP & management", "POS & sales", "Inventory & reports"], link: "/services/ecommerce" },
  { title: "AI Integration", description: "Practical AI that removes repetitive work and makes your existing systems smarter.", features: ["AI assistants", "Document & data AI", "Workflow automation"], link: "/services/ai-solutions" },
  { title: "Cybersecurity", description: "Security assessments and engineering that help you understand and reduce risk.", features: ["Security reviews", "Vulnerability testing", "SecureScan"], link: "/secure-scan" },
  { title: "Business Automation", description: "Connect the tools you use and automate the work you should not have to repeat.", features: ["Workflow automation", "System integrations", "Notifications & tasks"], link: "/services/cloud-solutions" },
];

export default function ServicesPage() {
  return <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
    <section className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="pointer-events-none absolute right-[-10%] top-1/4 h-96 w-96 rounded-full bg-blue-500/[0.08] blur-[140px]" />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">Our Solutions</p>
          <h1 className="mt-4 max-w-2xl font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">Services we provide.</h1>
        </Reveal>
      </div>
    </section>

    <section className="border-y border-[var(--border)] py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{services.map((service,index)=><Reveal key={service.title} delay={index*70} className={index===6 ? "xl:col-span-2" : undefined}><Link href={service.link} className="group relative block h-full overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 transition duration-500 hover:-translate-y-1 hover:border-blue-400/40 sm:p-8"><div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/[0.10] blur-3xl transition duration-700 group-hover:scale-150" /><div className="relative flex h-full flex-col"><div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-400/25 to-cyan-300/5 ring-1 ring-blue-300/20" /><h2 className="mt-12 font-[var(--font-space-grotesk)] text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{service.title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">{service.description}</p><div className="mt-auto pt-7"><div className="flex flex-wrap gap-2">{service.features.map(feature=><span key={feature} className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs text-[var(--muted)]">{feature}</span>)}</div><span className="mt-7 inline-flex text-sm font-semibold text-[var(--accent)] transition group-hover:translate-x-1">Explore →</span></div></div></Link></Reveal>)}</div></div></section>

    <section className="py-24 sm:py-32"><Reveal><div className="mx-auto max-w-4xl px-5 text-center sm:px-6"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">Start a project</p><h2 className="mt-4 font-[var(--font-space-grotesk)] text-5xl font-semibold tracking-[-0.07em] sm:text-6xl">Let&apos;s build it.</h2><Link href="/quote" className="mt-8 inline-flex rounded-full bg-[var(--text)] px-7 py-3.5 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5 hover:bg-[var(--accent)] hover:text-white">Request a Quote →</Link></div></Reveal></section>
  </main>;
}
