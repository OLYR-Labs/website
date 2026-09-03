import Link from "next/link";
import Reveal from "@/components/Reveal";

const solutions = [
  {
    number: "01",
    title: "Web Development",
    summary: "High-performance websites and digital experiences built to represent your business properly.",
    includes: ["Business & corporate websites", "Landing pages & campaign sites", "E-commerce experiences", "CMS, SEO & analytics setup"],
  },
  {
    number: "02",
    title: "Mobile Apps",
    summary: "Customer and internal mobile applications for iOS and Android, designed around real workflows.",
    includes: ["iOS & Android applications", "Cross-platform development", "Customer & staff apps", "API and service integrations"],
  },
  {
    number: "03",
    title: "Software & Web Apps",
    summary: "Custom digital products that turn complex business processes into simple, usable systems.",
    includes: ["Custom business software", "Web applications & portals", "SaaS products", "APIs and integrations"],
  },
  {
    number: "04",
    title: "ERP & POS Systems",
    summary: "Business systems that connect operations, sales, inventory, customers, and reporting in one place.",
    includes: ["ERP & business management", "POS and sales workflows", "Inventory & stock control", "Roles, reports & operational dashboards"],
  },
  {
    number: "05",
    title: "AI Integration",
    summary: "Practical AI embedded into products and workflows to automate repetitive work and improve decisions.",
    includes: ["AI assistants & copilots", "Document and data intelligence", "AI-powered workflows", "Model and API integration"],
  },
  {
    number: "06",
    title: "Cybersecurity",
    summary: "Security engineering and assessments that help identify weaknesses before they become expensive problems.",
    includes: ["Website & application security", "Vulnerability assessments", "Security reviews", "Risk and hardening guidance"],
  },
  {
    number: "07",
    title: "Business Automation",
    summary: "Connected systems that reduce manual work and move information between the tools your business already uses.",
    includes: ["Workflow automation", "System integrations", "Notifications & task automation", "Operational process design"],
  },
];

const principles = [
  ["01", "Built around the business", "We start with the problem, users, workflows, and outcome — then choose the technology."],
  ["02", "Designed to be used", "Clear interfaces, responsive experiences, and thoughtful interactions are part of the build, not decoration."],
  ["03", "Security from the foundation", "We treat security, privacy, reliability, and maintainability as engineering requirements."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <section className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-[var(--border)] pt-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.06] blur-[140px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
          <Reveal>
            <div className="mx-auto max-w-5xl text-center">
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)] sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                OLYR Labs · Technology Studio
              </div>
              <h1 className="font-[var(--font-space-grotesk)] text-[clamp(3.5rem,9vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
                Technology built
                <br />
                <span className="text-[var(--muted)]">around your business.</span>
              </h1>
              <p className="mx-auto mt-9 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                OLYR Labs designs and builds websites, mobile apps, custom software, ERP and POS systems, AI integrations, cybersecurity solutions, and business automation.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/quote" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--text)] px-7 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5 hover:bg-[var(--accent)] hover:text-white">
                  Request a Quote <span className="ml-3">→</span>
                </Link>
                <Link href="#solutions" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-7 text-sm font-semibold text-[var(--text)] transition hover:-translate-y-0.5 hover:border-[var(--accent)]">
                  Explore solutions
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="solutions" className="border-b border-[var(--border)] py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-14 max-w-3xl sm:mb-20">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)] sm:text-xs">Solutions</p>
              <h2 className="mt-5 font-[var(--font-space-grotesk)] text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">
                If your business needs it,
                <br />
                <span className="text-[var(--muted)]">we can build it.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)]">
                No vague technology packages. Each solution below tells you exactly what we can build and where it fits.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution, index) => (
              <Reveal key={solution.number} delay={index * 70}>
                <article className="group flex h-full flex-col bg-[var(--surface)] p-7 transition duration-500 hover:bg-[var(--surface-muted)] sm:p-9">
                  <div className="flex items-center justify-between text-xs text-[var(--subtle)]">
                    <span>{solution.number}</span>
                    <span className="h-px w-10 bg-[var(--border-strong)] transition-all duration-500 group-hover:w-16 group-hover:bg-[var(--accent)]" />
                  </div>
                  <h3 className="mt-16 font-[var(--font-space-grotesk)] text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{solution.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{solution.summary}</p>
                  <div className="mt-8 border-t border-[var(--border)] pt-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--subtle)]">What&apos;s included</p>
                    <ul className="mt-4 space-y-3">
                      {solution.includes.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-[var(--text)]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)] sm:text-xs">How we build</p>
                <h2 className="mt-5 font-[var(--font-space-grotesk)] text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Good technology starts with understanding.</h2>
              </div>
              <div className="border-t border-[var(--border)]">
                {principles.map(([number, title, text]) => (
                  <div key={number} className="grid gap-5 border-b border-[var(--border)] py-7 sm:grid-cols-[48px_0.8fr_1.2fr] sm:items-start sm:gap-6">
                    <span className="text-xs text-[var(--subtle)]">{number}</span>
                    <h3 className="font-[var(--font-space-grotesk)] text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                    <p className="text-sm leading-7 text-[var(--muted)]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-36">
        <Reveal>
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)] sm:text-xs">Start a conversation</p>
            <h2 className="mt-5 font-[var(--font-space-grotesk)] text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">Have something to build?</h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[var(--muted)]">Tell us what you need. We&apos;ll help you work out the right technology, scope, and next step.</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/quote" className="rounded-full bg-[var(--text)] px-7 py-3.5 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5 hover:bg-[var(--accent)] hover:text-white">Request a Quote →</Link>
              <a href="tel:+94781026353" className="rounded-full border border-[var(--border)] px-7 py-3.5 text-sm font-semibold transition hover:border-[var(--accent)]">Call +94 78 102 6353</a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
