"use client";

import Link from "next/link";

const services = [
{
number: "01",
title: "Cloud Infrastructure",
description:
"Build reliable, scalable, and secure cloud infrastructure designed to support modern applications and growing businesses.",
features: [
"Cloud Architecture",
"Infrastructure Deployment",
"Scalable Systems",
"Performance Optimization",
"Infrastructure Management",
],
},
{
number: "02",
title: "Cybersecurity",
description:
"Strengthen your digital environment with security-focused solutions designed to protect applications, systems, and critical data.",
features: [
"Security Assessments",
"Application Security",
"Security Best Practices",
"Risk Analysis",
"Security Strategy",
],
},
{
number: "03",
title: "Artificial Intelligence",
description:
"Turn emerging AI technologies into practical solutions that improve workflows, automate processes, and create new possibilities.",
features: [
"AI-Powered Applications",
"Intelligent Automation",
"AI Integrations",
"Custom AI Solutions",
"AI Strategy & Consulting",
],
},
{
number: "04",
title: "Software Development",
description:
"Design and build modern software solutions that are reliable, scalable, and tailored to your unique business requirements.",
features: [
"Web Applications",
"Business Software",
"Custom Platforms",
"APIs & Integrations",
"Digital Products",
],
},
];

export default function ServicesPage() {
return ( <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
{/* Hero */} <section className="relative overflow-hidden border-b border-white/10 pt-20"> <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />


    <div className="absolute left-[-10%] top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />

    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">
      <p className="mb-8 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
        Our Services
      </p>

      <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
        Technology
        <br />
        <span className="text-[#A1A1AA]">for what&apos;s next.</span>
      </h1>

      <p className="mt-10 max-w-2xl text-lg leading-8 text-[#A1A1AA] sm:text-xl">
        We help businesses turn ambitious ideas into reliable technology
        through cloud infrastructure, cybersecurity, artificial
        intelligence, and software development.
      </p>
    </div>
  </section>

  {/* Services */}
  <section className="border-b border-white/10 py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mb-20 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
          What We Do
        </p>

        <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
          Technology solutions built around your goals.
        </h2>
      </div>

      <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.number}
            className="bg-[#050505] p-8 sm:p-10 lg:p-12"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-blue-400">
                {service.number}
              </span>

              <span className="text-sm text-[#52525B]">OLYR Labs</span>
            </div>

            <h3 className="mt-16 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {service.title}
            </h3>

            <p className="mt-6 max-w-lg text-lg leading-8 text-[#A1A1AA]">
              {service.description}
            </p>

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#52525B]">
                Capabilities
              </p>

              <ul className="mt-6 space-y-4">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-[#A1A1AA]"
                  >
                    <span className="h-1 w-1 rounded-full bg-blue-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>

  {/* Process */}
  <section className="border-b border-white/10 py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid gap-20 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
            How We Work
          </p>

          <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
            From idea to implementation.
          </h2>
        </div>

        <div className="space-y-0">
          <div className="border-t border-white/10 py-8">
            <p className="text-sm font-medium text-blue-400">01</p>

            <h3 className="mt-4 text-2xl font-semibold">
              Understand
            </h3>

            <p className="mt-4 leading-7 text-[#A1A1AA]">
              We start by understanding your goals, challenges, and the
              outcomes you want to achieve.
            </p>
          </div>

          <div className="border-t border-white/10 py-8">
            <p className="text-sm font-medium text-blue-400">02</p>

            <h3 className="mt-4 text-2xl font-semibold">
              Strategize
            </h3>

            <p className="mt-4 leading-7 text-[#A1A1AA]">
              We identify the right technology and approach for your
              specific needs.
            </p>
          </div>

          <div className="border-t border-white/10 py-8">
            <p className="text-sm font-medium text-blue-400">03</p>

            <h3 className="mt-4 text-2xl font-semibold">
              Build
            </h3>

            <p className="mt-4 leading-7 text-[#A1A1AA]">
              We turn the strategy into a working, tested, and refined
              technology solution.
            </p>
          </div>

          <div className="border-t border-white/10 py-8">
            <p className="text-sm font-medium text-blue-400">04</p>

            <h3 className="mt-4 text-2xl font-semibold">
              Evolve
            </h3>

            <p className="mt-4 leading-7 text-[#A1A1AA]">
              We help you improve, scale, and adapt your technology as
              your needs change.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="py-40">
    <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
      <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
        Start a Conversation
      </p>

      <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
        Have a technology challenge?
      </h2>

      <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-[#A1A1AA]">
        Tell us what you&apos;re building, what you&apos;re solving, or
        where you want to go. Let&apos;s explore what&apos;s possible.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/contact"
          className="rounded-full bg-[#F5F5F5] px-8 py-4 text-sm font-semibold text-black transition hover:bg-white"
        >
          Start a Project →
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
