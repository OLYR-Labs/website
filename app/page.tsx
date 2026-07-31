import Link from "next/link";

const capabilities = [
{
number: "01",
title: "Artificial Intelligence",
description:
"Intelligent systems and AI-driven solutions designed to solve real-world problems and unlock new possibilities.",
},
{
number: "02",
title: "Software",
description:
"Modern digital products and software solutions built with performance, usability, and scalability in mind.",
},
{
number: "03",
title: "Cloud",
description:
"Reliable and secure cloud infrastructure designed to support modern digital operations and future growth.",
},
{
number: "04",
title: "Cybersecurity",
description:
"Security-focused solutions that help protect systems, data, and businesses in an increasingly connected world.",
},
];

const principles = [
{
title: "Build with Purpose",
description:
"We focus on creating technology that solves meaningful problems and delivers real value.",
},
{
title: "Security by Design",
description:
"Security isn't an afterthought. We believe it should be considered from the foundation.",
},
{
title: "Think Beyond Today",
description:
"We build with scalability, adaptability, and the future in mind.",
},
{
title: "Stay Curious",
description:
"Technology never stands still. Neither do we.",
},
];

export default function Home() {
return ( <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
{/* Hero */} <section className="relative flex min-h-screen items-center overflow-hidden"> <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />

```
    <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

    <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-8">
      <div className="max-w-5xl">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[#A1A1AA]">
          <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
          Building technology for what's next
        </div>

        <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
          Technology
          <br />
          <span className="text-[#A1A1AA]">for what's next.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#A1A1AA] sm:text-xl">
          We build intelligent software, secure digital infrastructure,
          and technology solutions that help businesses grow, improve, and
          stay secure.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/services"
            className="rounded-full bg-[#F5F5F5] px-7 py-4 text-center text-sm font-semibold text-black transition hover:bg-white"
          >
            Explore Our Services →
          </Link>

          <Link
            href="/contact"
            className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-semibold transition hover:border-white/50 hover:bg-white/5"
          >
            Start a Conversation →
          </Link>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-2 gap-8 border-t border-white/10 pt-8 text-sm text-[#71717A] sm:grid-cols-4">
        <div>AI</div>
        <div>SOFTWARE</div>
        <div>CLOUD</div>
        <div>CYBERSECURITY</div>
      </div>
    </div>
  </section>

  {/* About Preview */}
  <section className="border-t border-white/10 py-32">
    <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
          About OLYR Labs
        </p>

        <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Technology should move your business forward.
        </h2>
      </div>

      <div className="space-y-6 text-lg leading-8 text-[#A1A1AA]">
        <p>
          OLYR Labs is a technology company focused on building innovative
          solutions for an increasingly digital world.
        </p>

        <p>
          From intelligent software and artificial intelligence to cloud
          infrastructure and cybersecurity, we explore technology that
          helps individuals and businesses grow, improve, and stay secure.
        </p>

        <Link
          href="/about"
          className="inline-block pt-2 text-sm font-medium text-white transition hover:text-blue-400"
        >
          Discover OLYR Labs →
        </Link>
      </div>
    </div>
  </section>

  {/* Capabilities */}
  <section id="capabilities" className="border-t border-white/10 py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mb-20 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
            Our Services
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Technology solutions built for what's next.
          </h2>
        </div>

        <Link
          href="/services"
          className="text-sm font-medium text-[#A1A1AA] transition hover:text-white"
        >
          Explore all services →
        </Link>
      </div>

      <div className="grid border-l border-t border-white/10 sm:grid-cols-2">
        {capabilities.map((capability) => (
          <Link
            key={capability.number}
            href="/services"
            className="group border-b border-r border-white/10 p-8 transition hover:bg-white/[0.03] sm:p-10"
          >
            <div className="mb-16 text-sm text-[#52525B]">
              {capability.number}
            </div>

            <h3 className="text-2xl font-semibold">
              {capability.title}
            </h3>

            <p className="mt-4 max-w-md leading-7 text-[#A1A1AA]">
              {capability.description}
            </p>

            <div className="mt-8 text-sm text-blue-400 transition group-hover:translate-x-1">
              Explore service →
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>

  {/* What We Build */}
  <section id="work" className="border-t border-white/10 py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
            What We Build
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Technology designed
            <br />
            to solve real problems.
          </h2>
        </div>

        <Link
          href="/projects"
          className="text-sm font-medium text-[#A1A1AA] transition hover:text-white"
        >
          Explore our work →
        </Link>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-8 transition hover:border-white/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_40%)] opacity-0 transition group-hover:opacity-100" />

          <div className="relative flex h-full flex-col justify-between">
            <span className="text-sm text-[#71717A]">
              DIGITAL PRODUCTS
            </span>

            <div>
              <h3 className="text-2xl font-semibold">
                Modern software experiences.
              </h3>

              <p className="mt-4 text-[#A1A1AA]">
                Scalable digital products and software solutions designed
                around real business needs.
              </p>
            </div>
          </div>
        </div>

        <div className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-8 transition hover:border-white/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_40%)] opacity-0 transition group-hover:opacity-100" />

          <div className="relative flex h-full flex-col justify-between">
            <span className="text-sm text-[#71717A]">
              INTELLIGENT SYSTEMS
            </span>

            <div>
              <h3 className="text-2xl font-semibold">
                AI-powered possibilities.
              </h3>

              <p className="mt-4 text-[#A1A1AA]">
                Intelligent technology and automation designed to improve
                workflows and unlock new opportunities.
              </p>
            </div>
          </div>
        </div>

        <div className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-8 transition hover:border-white/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_40%)] opacity-0 transition group-hover:opacity-100" />

          <div className="relative flex h-full flex-col justify-between">
            <span className="text-sm text-[#71717A]">
              DIGITAL INFRASTRUCTURE
            </span>

            <div>
              <h3 className="text-2xl font-semibold">
                Secure foundations.
              </h3>

              <p className="mt-4 text-[#A1A1AA]">
                Cloud infrastructure and security-focused solutions built
                to support reliable digital operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Principles */}
  <section className="border-t border-white/10 py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mb-20 max-w-2xl">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
          How We Think
        </p>

        <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Principles that guide our work.
        </h2>
      </div>

      <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
        {principles.map((principle) => (
          <div key={principle.title} className="bg-[#050505] p-8 sm:p-10">
            <h3 className="text-xl font-semibold">{principle.title}</h3>

            <p className="mt-4 leading-7 text-[#A1A1AA]">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* CTA */}
  <section id="contact" className="border-t border-white/10 py-40">
    <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
      <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
        Let's Build
      </p>

      <h2 className="mx-auto max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
        Have a problem
        <br />
        worth solving?
      </h2>

      <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-[#A1A1AA]">
        Let's explore what's possible and build technology that moves you
        forward.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/contact"
          className="rounded-full bg-[#F5F5F5] px-8 py-4 text-sm font-semibold text-black transition hover:bg-white"
        >
          Start a Conversation →
        </Link>

        <a
          href="https://wa.me/94781026353?text=Hi%20OLYR%20Labs!%20I%27m%20interested%20in%20working%20with%20you.%20I%27d%20like%20to%20know%20more%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
        >
          Chat on WhatsApp →
        </a>
      </div>
    </div>
  </section>
</main>


);
}
