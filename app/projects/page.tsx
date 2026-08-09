"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const projects = [
{
number: "01",
category: "Digital Platform",
title: "OLYR Labs Platform",
description:
"The official digital foundation of OLYR Labs, built to showcase our capabilities and connect businesses with modern technology solutions.",
tags: ["Next.js", "React", "Cloud", "Web"],
status: "Live",
link: "/",
},
{
number: "02",
category: "Artificial Intelligence",
title: "AI Business Assistant",
description:
"An AI-powered assistant concept designed to help businesses automate communication, improve workflows, and create smarter customer experiences.",
tags: ["AI", "Automation", "APIs"],
status: "Prototype",
},
{
number: "03",
category: "Software Development",
title: "Digital Products & Platforms",
description:
"Custom software solutions designed to solve operational challenges, improve efficiency, and help businesses scale through technology.",
tags: ["Software", "Platforms", "Systems"],
status: "Building",
},
{
number: "04",
category: "Cloud & Cybersecurity",
title: "Secure Digital Infrastructure",
description:
"Modern infrastructure solutions focused on reliability, scalability, and security for organizations operating in a connected world.",
tags: ["Cloud", "Security", "Infrastructure"],
status: "Research",
},
{
number: "05",
category: "Cybersecurity",
title: "OLYR SecureScan",
description:
"An automated security intelligence platform designed to analyze websites, domains, technologies, and vulnerabilities to identify security risks.",
tags: ["Cybersecurity", "Security", "Assessment"],
status: "Live",
link: "/projects/secure-scan",
},
];

const concepts = [
{
number: "01",
category: "Luxury Jewelry",
title: "AUREL",
description:
"A luxury e-commerce concept exploring editorial storytelling, refined product presentation, and a quiet-luxury digital experience.",
image: "/projects/aurel.jpg",
},
{
number: "02",
category: "Fashion E-Commerce",
title: "VELORA",
description:
"A contemporary fashion commerce concept focused on immersive editorial imagery, premium product discovery, and modern digital interaction.",
image: "/projects/velora.jpg",
},
{
number: "03",
category: "Luxury Hospitality",
title: "LUMIÈRE",
description:
"A cinematic hospitality concept combining immersive imagery, elegant booking experiences, and a refined expression of modern luxury.",
image: "/projects/lumiere.jpg",
},
];

export default function ProjectsPage() {
return ( <main>
{/* HERO */} <section className="relative overflow-hidden border-b border-white/10 pt-16 sm:pt-20"> <div className="pointer-events-none absolute right-[-10%] top-1/4 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[120px] sm:h-[500px] sm:w-[500px] sm:blur-[140px]" />


    <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
      <Reveal>
        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.25em] text-blue-400 sm:mb-8 sm:text-sm">
          Our Work
        </p>

        <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
          Building technology
          <br />
          <span className="text-[#A1A1AA]">for what&apos;s next.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-7 text-[#A1A1AA] sm:mt-10 sm:text-xl sm:leading-8">
          Explore the systems, concepts, and technology initiatives created
          by OLYR Labs across artificial intelligence, software development,
          cloud infrastructure, cybersecurity, commerce, and digital
          experiences.
        </p>
      </Reveal>
    </div>
  </section>

  {/* PROJECTS */}
  <section className="border-b border-white/10 py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-14 max-w-2xl sm:mb-20">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.25em] text-blue-400 sm:mb-6 sm:text-sm">
            Selected Work
          </p>

          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
            Projects, platforms,
            <br />
            and technology.
          </h2>
        </div>
      </Reveal>

      <div className="space-y-px border-y border-white/10">
        {projects.map((project, index) => (
          <Reveal key={project.number} delay={index * 120}>
            <Link
              href={project.link || "#"}
              className={
                project.link
                  ? "block cursor-pointer"
                  : "block cursor-default"
              }
            >
              <article className="group relative overflow-hidden border-b border-white/10 py-10 transition duration-500 hover:bg-white/[0.03] last:border-b-0 sm:py-16">
                <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                <div className="relative grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-1">
                    <span className="text-sm text-[#52525B]">
                      {project.number}
                    </span>
                  </div>

                  <div className="lg:col-span-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 sm:text-sm">
                      {project.category}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-[#71717A]">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      {project.status}
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] transition duration-300 group-hover:text-blue-400 sm:text-4xl">
                      {project.title}
                    </h3>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-[#A1A1AA] sm:mt-6 sm:text-base">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap content-start gap-2 lg:col-span-3 lg:justify-end">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-white/10 px-3 py-2 text-xs text-[#71717A] transition group-hover:border-blue-400/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative mt-8 h-px w-0 bg-blue-400 transition-all duration-500 group-hover:w-24 sm:mt-10" />
              </article>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>

  {/* CONCEPTS */}
  <section className="border-b border-white/10 py-24 sm:py-32 lg:py-40">
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-14 max-w-3xl sm:mb-20">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.25em] text-blue-400 sm:mb-6 sm:text-sm">
            Selected Concepts
          </p>

          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            Digital experiences
            <br />
            <span className="text-[#A1A1AA]">
              imagined for ambitious brands.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#71717A] sm:mt-8 sm:text-base sm:leading-8">
            A collection of visual concepts exploring how OLYR Labs can
            translate different brands, industries, and ideas into
            sophisticated digital experiences.
          </p>
        </div>
      </Reveal>

      <div className="space-y-24 sm:space-y-32 lg:space-y-40">
        {concepts.map((concept, index) => (
          <Reveal key={concept.title} delay={index * 100}>
            <article className="group">
              {/* IMAGE */}
              <div className="relative overflow-hidden border border-white/10 bg-[#0A0A0A]">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={concept.image}
                    alt={`${concept.title} website concept`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 1280px"
                    className="object-cover object-center transition duration-1000 ease-out group-hover:scale-[1.025]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />

                  <div className="pointer-events-none absolute left-5 top-5 border border-white/20 bg-black/40 px-3 py-2 text-[9px] uppercase tracking-[0.25em] text-white/70 backdrop-blur-md sm:left-7 sm:top-7 sm:text-[10px]">
                    Concept Design
                  </div>
                </div>
              </div>

              {/* INFO */}
              <div className="mt-7 grid gap-6 sm:mt-9 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-1">
                  <span className="text-sm text-[#52525B]">
                    {concept.number}
                  </span>
                </div>

                <div className="lg:col-span-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 sm:text-sm">
                    {concept.category}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <h3 className="text-3xl font-semibold tracking-[-0.04em] transition duration-300 group-hover:text-blue-400 sm:text-5xl">
                    {concept.title}
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#A1A1AA] sm:mt-5 sm:text-base">
                    {concept.description}
                  </p>
                </div>

                <div className="flex items-start lg:col-span-3 lg:justify-end">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-[#71717A] transition duration-300 group-hover:border-blue-400/40 group-hover:text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Concept
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="py-28 sm:py-40">
    <Reveal>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 border border-white/10 p-6 sm:gap-12 sm:p-12 lg:grid-cols-2 lg:p-20">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-blue-400 sm:text-sm">
              Start Building
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Have a problem worth solving?
            </h2>
          </div>

          <div>
            <p className="text-base leading-7 text-[#A1A1AA] sm:text-lg sm:leading-8">
              We help businesses explore, design, and build technology
              solutions that move them forward.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-[#F5F5F5] px-8 py-4 text-sm font-semibold text-black transition hover:bg-white sm:mt-10"
            >
              Work With Us →
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
</main>


);
}
