"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import ReactiveHero from "@/components/ReactiveHero";
import ProjectShowcase from "@/components/ProjectShowcase";

const services = [
{
number: "01",
title: "Websites",
tag: "DIGITAL EXPERIENCES",
},
{
number: "02",
title: "Apps",
tag: "MOBILE & WEB",
},
{
number: "03",
title: "Software",
tag: "DIGITAL PRODUCTS",
},
{
number: "04",
title: "AI",
tag: "INTELLIGENT SYSTEMS",
},
{
number: "05",
title: "Cloud",
tag: "INFRASTRUCTURE",
},
{
number: "06",
title: "Cybersecurity",
tag: "SECURITY",
},
];

const buildItems = [
"WEBSITES",
"APPS",
"SOFTWARE",
"AI SYSTEMS",
"CLOUD",
"SECURITY",
];

export default function Home() {
return ( <main className="min-h-screen overflow-hidden bg-[#030405] text-[#F5F5F5]">
{/* ========================================================= */}
{/* HERO */}
{/* ========================================================= */}


  <section className="relative px-4 py-4 sm:px-6 lg:px-8">
    <div className="glass-panel relative flex min-h-screen items-center rounded-[2rem]">
      {/* Neutral atmospheric lighting */}

      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-white/[0.012] blur-[180px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-500/[0.018] blur-[180px]" />

      {/* Hero visual layer */}

      <ReactiveHero />

      {/* Hero content */}

      <div className="relative z-50 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-8">
        {/* BRAND */}

        <Reveal>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-blue-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400/[0.8] shadow-[0_0_15px_rgba(59,130,246,0.55)]" />
            OLYR LABS
          </div>
        </Reveal>

        {/* HERO TITLE */}

        <Reveal delay={100}>
          <h1 className="mt-10 max-w-6xl text-6xl font-semibold leading-[0.88] tracking-[-0.06em] sm:text-8xl lg:text-[10rem]">
            We build
            <br />
            <span className="text-[#A1A1AA]">digital.</span>
          </h1>
        </Reveal>

        {/* HERO DESCRIPTION */}

        <Reveal delay={200}>
          <div className="mt-12 flex flex-col justify-between gap-10 border-t border-white/[0.08] pt-8 md:flex-row md:items-end">
            <p className="max-w-md text-lg leading-7 text-[#A1A1AA]">
              Websites. Apps. Software. AI.
              <br />
              Cloud. Security.
            </p>

            <Link
              href="/projects"
              aria-label="Explore what we build"
              className="group relative z-50 inline-flex w-fit cursor-pointer items-center gap-4 text-sm font-medium text-white"
            >
              <span className="transition-colors duration-300 group-hover:text-blue-400">
                Explore what we build
              </span>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.16] bg-white/[0.02] text-base transition-all duration-300 group-hover:translate-x-1 group-hover:border-blue-400/70 group-hover:bg-blue-400 group-hover:text-black">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        {/* ===================================================== */}
        {/* HERO VISUAL */}
        {/* ===================================================== */}

        <Reveal delay={300}>
          <div className="group relative mt-24 h-[300px] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#050505] sm:h-[420px]">
            {/* Subtle neutral highlight */}

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.025),transparent_30%,transparent_70%,rgba(59,130,246,0.012))]" />

            {/* Restrained ambient light */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.035] blur-[120px] transition duration-1000 group-hover:scale-150 group-hover:bg-blue-500/[0.06]" />

              {/* Very subtle energy lines */}

              <div className="absolute -left-20 top-1/2 h-px w-[140%] rotate-12 bg-gradient-to-r from-transparent via-blue-400/[0.12] to-transparent animate-[pulse_4s_ease-in-out_infinite]" />

              <div className="absolute -left-20 top-1/2 h-px w-[140%] -rotate-12 bg-gradient-to-r from-transparent via-blue-400/[0.08] to-transparent animate-[pulse_5s_ease-in-out_infinite]" />
            </div>

            {/* Floating points */}

            <div className="pointer-events-none absolute left-[15%] top-[25%] h-1 w-1 animate-pulse rounded-full bg-blue-400/[0.55] shadow-[0_0_12px_rgba(59,130,246,0.35)]" />

            <div className="pointer-events-none absolute left-[75%] top-[20%] h-1 w-1 animate-pulse rounded-full bg-blue-400/[0.55] shadow-[0_0_12px_rgba(59,130,246,0.35)] [animation-delay:1s]" />

            <div className="pointer-events-none absolute left-[85%] top-[70%] h-1 w-1 animate-pulse rounded-full bg-blue-400/[0.55] shadow-[0_0_12px_rgba(59,130,246,0.35)] [animation-delay:2s]" />

            <div className="pointer-events-none absolute left-[25%] top-[75%] h-1 w-1 animate-pulse rounded-full bg-blue-400/[0.55] shadow-[0_0_12px_rgba(59,130,246,0.35)] [animation-delay:3s]" />

            {/* Center content */}

            <div className="pointer-events-none relative flex h-full items-center justify-center">
              <div className="relative text-center">
                <p className="text-xs uppercase tracking-[0.4em] text-[#71717A]">
                  DIGITAL SYSTEMS
                </p>

                <p className="mt-5 text-4xl font-semibold tracking-[-0.04em] transition duration-500 group-hover:scale-105 sm:text-6xl">
                  Built for what&apos;s next.
                </p>

                <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-blue-400/[0.55] to-transparent opacity-60" />
              </div>
            </div>

            {/* Subtle hover border */}

            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition duration-700 group-hover:border-blue-400/[0.18]" />
          </div>
        </Reveal>
      </div>
    </div>
  </section>

  {/* ========================================================= */}
  {/* MARQUEE */}
  {/* ========================================================= */}

  <section className="px-4 py-4 sm:px-6 lg:px-8">
    <div className="glass-card overflow-hidden rounded-2xl py-6">
      <div className="flex overflow-hidden whitespace-nowrap">
        <div className="flex animate-[marquee_20s_linear_infinite] gap-10 text-sm font-medium tracking-[0.2em] text-[#71717A]">
          {[...buildItems, ...buildItems].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-10"
            >
              <span className="text-blue-400/[0.75]">+</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  {/* ========================================================= */}
  {/* SERVICES */}
  {/* ========================================================= */}

  <section className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
    {/* Glass effect removed ONLY from this wrapper */}

    <div className="mx-auto max-w-7xl rounded-[2rem] p-6 sm:p-10 lg:p-12">
      <Reveal>
        <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
              Capabilities
            </p>

            <h2 className="mt-6 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
              What we build.
            </h2>
          </div>

          <Link
            href="/services"
            className="group flex items-center gap-3 text-sm text-[#A1A1AA] transition hover:text-white"
          >
            View all services

            <span className="transition group-hover:translate-x-1 group-hover:text-blue-400">
              →
            </span>
          </Link>
        </div>
      </Reveal>

      {/* SERVICE CARDS */}

      <div className="grid overflow-hidden rounded-2xl border border-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.number} delay={index * 80}>
            <Link
              href="/services"
              className="group relative block min-h-[300px] overflow-hidden border-b border-r border-white/[0.08] bg-[#050505] p-8 transition-colors duration-500 hover:bg-[#08090B] sm:p-10"
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/0 blur-[100px] transition-all duration-700 group-hover:bg-blue-500/[0.045]" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-xs text-[#52525B]">
                    {service.number}
                  </span>

                  <span className="text-[10px] tracking-[0.2em] text-[#52525B]">
                    {service.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-semibold tracking-[-0.04em] transition duration-300 group-hover:translate-x-1 group-hover:text-blue-400">
                    {service.title}
                  </h3>

                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-5">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#52525B]">
                      Explore
                    </span>

                    <span className="transition duration-300 group-hover:translate-x-2 group-hover:text-blue-400">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>

  {/* ========================================================= */}
  {/* PROJECTS */}
  {/* ========================================================= */}

  <section className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
    <div className="mx-auto max-w-7xl">
      <Reveal delay={100}>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.14] bg-white/[0.035] p-[1px] shadow-[0_30px_100px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute -inset-20 bg-blue-500/[0.025] blur-[140px]" />

          <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_25%,transparent_65%,rgba(96,165,250,0.018))]" />

          <div className="relative overflow-hidden rounded-[2.4rem]">
            <ProjectShowcase />
          </div>
        </div>
      </Reveal>
    </div>
  </section>

  {/* ========================================================= */}
  {/* STATEMENT */}
  {/* ========================================================= */}

  <section className="px-4 py-24 sm:px-6 lg:px-8 lg:py-40">
    <div className="glass-section mx-auto max-w-7xl rounded-[2rem] p-8 sm:p-12 lg:p-20">
      <Reveal>
        <p className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-[#F5F5F5] sm:text-7xl lg:text-8xl">
          We turn ideas into
          <span className="text-blue-400">
            {" "}
            digital reality.
          </span>
        </p>
      </Reveal>
    </div>
  </section>

  {/* ========================================================= */}
  {/* CTA */}
  {/* ========================================================= */}

  <section className="px-4 pb-4 sm:px-6 lg:px-8">
    <div className="glass-panel relative overflow-hidden rounded-[2rem] py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.025] blur-[180px]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
            Start something
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-8 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            Let&apos;s build.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group flex items-center gap-4 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition duration-300 hover:bg-blue-400"
            >
              Start a project

              <span className="transition group-hover:translate-x-1">
                →
              </span>
            </Link>

            <a
              href="https://wa.me/94781026353?text=Hi%20OLYR%20Labs!%20I'm%20interested%20in%20working%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/[0.02] px-8 py-4 text-sm font-semibold transition duration-300 hover:border-blue-400/60 hover:bg-blue-400/[0.04]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</main>


);
}
