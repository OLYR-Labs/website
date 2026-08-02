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


  <section className="relative px-3 py-3 sm:px-5 sm:py-5 lg:px-6">
    <div className="glass-panel relative flex min-h-[calc(100vh-1.5rem)] items-center rounded-[1.5rem] sm:min-h-[calc(100vh-2.5rem)] sm:rounded-[2rem]">
      {/* Ambient lighting */}

      <div className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/[0.08] blur-[140px] sm:h-[500px] sm:w-[500px] sm:blur-[160px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[350px] w-[350px] rounded-full bg-blue-500/[0.05] blur-[140px] sm:h-[450px] sm:w-[450px] sm:blur-[160px]" />

      {/* Hero visual */}

      <ReactiveHero />

      {/* Hero content */}

      <div className="relative z-50 mx-auto w-full max-w-7xl px-5 pb-12 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:px-8">
        {/* Brand */}

        <Reveal>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-blue-400 sm:text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.9)]" />
            OLYR LABS
          </div>
        </Reveal>

        {/* Hero title */}

        <Reveal delay={100}>
          <h1 className="mt-8 max-w-6xl text-[3.5rem] font-semibold leading-[0.88] tracking-[-0.07em] sm:mt-10 sm:text-8xl lg:text-[10rem]">
            We build
            <br />
            <span className="text-[#A1A1AA]">digital.</span>
          </h1>
        </Reveal>

        {/* Hero description */}

        <Reveal delay={200}>
          <div className="mt-10 flex flex-col justify-between gap-8 border-t border-white/10 pt-7 sm:mt-12 sm:gap-10 sm:pt-8 md:flex-row md:items-end">
            <p className="max-w-md text-base leading-7 text-[#A1A1AA] sm:text-lg">
              Websites. Apps. Software. AI.
              <br />
              Cloud. Security.
            </p>

            <Link
              href="/projects"
              aria-label="Explore what OLYR Labs builds"
              className="group relative z-50 inline-flex w-fit cursor-pointer items-center gap-4 text-sm font-medium text-white"
            >
              <span className="transition-colors duration-300 group-hover:text-blue-400">
                Explore what we build
              </span>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.025] text-base transition-all duration-300 group-hover:translate-x-1 group-hover:border-blue-400 group-hover:bg-blue-400 group-hover:text-black">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Hero visual */}

        <Reveal delay={300}>
          <div className="group relative mt-16 h-[300px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050505] sm:mt-24 sm:h-[420px] sm:rounded-3xl">
            {/* Subtle highlight */}

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.025),transparent_30%,transparent_70%,rgba(59,130,246,0.025))]" />

            {/* Ambient blue glow */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.08] blur-[80px] transition duration-1000 group-hover:scale-150 group-hover:bg-blue-500/[0.14] sm:h-[300px] sm:w-[300px] sm:blur-[100px]" />

              {/* Energy lines */}

              <div className="absolute -left-20 top-1/2 h-px w-[140%] rotate-12 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-[pulse_4s_ease-in-out_infinite]" />

              <div className="absolute -left-20 top-1/2 h-px w-[140%] -rotate-12 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-[pulse_5s_ease-in-out_infinite]" />
            </div>

            {/* Floating points */}

            <div className="pointer-events-none absolute left-[15%] top-[25%] h-1 w-1 animate-pulse rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.9)]" />

            <div className="pointer-events-none absolute left-[75%] top-[20%] h-1 w-1 animate-pulse rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.9)] [animation-delay:1s]" />

            <div className="pointer-events-none absolute left-[85%] top-[70%] h-1 w-1 animate-pulse rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.9)] [animation-delay:2s]" />

            <div className="pointer-events-none absolute left-[25%] top-[75%] h-1 w-1 animate-pulse rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.9)] [animation-delay:3s]" />

            {/* Center content */}

            <div className="pointer-events-none relative flex h-full items-center justify-center px-6">
              <div className="relative text-center">
                <p className="text-[9px] uppercase tracking-[0.35em] text-[#71717A] sm:text-xs sm:tracking-[0.4em]">
                  DIGITAL SYSTEMS
                </p>

                <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] transition duration-500 group-hover:scale-105 sm:mt-5 sm:text-6xl">
                  Built for what&apos;s next.
                </p>

                <div className="mx-auto mt-7 h-px w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 sm:mt-8 sm:w-24" />
              </div>
            </div>

            {/* Hover border */}

            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition duration-700 group-hover:border-blue-400/20 sm:rounded-3xl" />
          </div>
        </Reveal>
      </div>
    </div>
  </section>

  {/* ========================================================= */}
  {/* MARQUEE */}
  {/* ========================================================= */}

  <section className="px-3 py-3 sm:px-5 sm:py-5 lg:px-6">
    <div className="glass-card overflow-hidden rounded-xl py-5 sm:rounded-2xl sm:py-6">
      <div className="flex overflow-hidden whitespace-nowrap">
        <div className="flex min-w-max animate-[marquee_20s_linear_infinite] gap-8 text-[10px] font-medium tracking-[0.2em] text-[#71717A] sm:gap-10 sm:text-sm">
          {[...buildItems, ...buildItems].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-8 sm:gap-10"
            >
              <span className="text-blue-400">+</span>
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

  <section className="px-3 py-20 sm:px-5 sm:py-24 lg:px-6 lg:py-32">
    <div className="glass-section mx-auto max-w-7xl rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-10 lg:p-12">
      <Reveal>
        <div className="mb-14 flex flex-col justify-between gap-8 sm:mb-20 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400 sm:text-xs">
              Capabilities
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:mt-6 sm:text-7xl">
              What we build.
            </h2>
          </div>

          <Link
            href="/services"
            className="group flex w-fit items-center gap-3 text-sm text-[#A1A1AA] transition hover:text-white"
          >
            View all services

            <span className="transition group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>

      {/* Service cards */}

      <div className="grid overflow-hidden rounded-xl border border-white/[0.08] sm:rounded-2xl md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.number} delay={index * 80}>
            <Link
              href="/services"
              className="group relative block min-h-[270px] overflow-hidden border-b border-r border-white/[0.08] bg-[#050505] p-6 transition-colors duration-500 hover:bg-[#080b10] sm:min-h-[300px] sm:p-10"
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/0 blur-[100px] transition-all duration-700 group-hover:bg-blue-500/10" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs text-[#52525B]">
                    {service.number}
                  </span>

                  <span className="text-right text-[9px] tracking-[0.2em] text-[#52525B] sm:text-[10px]">
                    {service.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] transition duration-300 group-hover:translate-x-1 group-hover:text-blue-400 sm:text-3xl">
                    {service.title}
                  </h3>

                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#52525B] sm:text-xs">
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

  <section className="px-3 py-20 sm:px-5 sm:py-24 lg:px-6 lg:py-32">
    <div className="mx-auto max-w-7xl">
      <Reveal delay={100}>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.18] bg-white/[0.055] p-[1px] shadow-[0_30px_100px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl sm:rounded-[2.5rem]">
          <div className="pointer-events-none absolute -inset-20 bg-blue-500/[0.06] blur-[120px]" />

          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[linear-gradient(120deg,rgba(255,255,255,0.10),transparent_25%,transparent_65%,rgba(96,165,250,0.06))] sm:rounded-[2.5rem]" />

          <div className="relative overflow-hidden rounded-[1.65rem] sm:rounded-[2.4rem]">
            <ProjectShowcase />
          </div>
        </div>
      </Reveal>
    </div>
  </section>

  {/* ========================================================= */}
  {/* STATEMENT */}
  {/* ========================================================= */}

  <section className="px-3 py-20 sm:px-5 sm:py-24 lg:px-6 lg:py-40">
    <div className="glass-section mx-auto max-w-7xl rounded-[1.5rem] p-7 sm:rounded-[2rem] sm:p-12 lg:p-20">
      <Reveal>
        <p className="max-w-5xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
          We turn ideas into
          <span className="text-blue-400"> digital reality.</span>
        </p>
      </Reveal>
    </div>
  </section>

  {/* ========================================================= */}
  {/* CTA */}
  {/* ========================================================= */}

  <section className="px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6">
    <div className="glass-panel relative overflow-hidden rounded-[1.5rem] py-28 sm:rounded-[2rem] sm:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px] sm:h-[500px] sm:w-[500px] sm:blur-[160px]" />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400 sm:text-xs">
            Start something
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.06em] sm:mt-8 sm:text-7xl lg:text-8xl">
            Let&apos;s build.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row">
            <Link
              href="/contact"
              className="group flex w-full items-center justify-center gap-4 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition duration-300 hover:bg-blue-400 sm:w-auto"
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
              className="flex w-full items-center justify-center rounded-full border border-white/20 bg-white/[0.02] px-8 py-4 text-sm font-semibold transition duration-300 hover:border-blue-400 hover:bg-blue-400/5 sm:w-auto"
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
