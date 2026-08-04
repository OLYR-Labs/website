"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";

const services = [
  {
    number: "01",
    title: "Website Development",
    description:
      "Build modern, high-performance websites that help businesses establish their digital presence, attract customers, and grow online.",
    features: [
      "Business Websites",
      "Corporate Websites",
      "Landing Pages",
      "Premium Web Experiences",
      "CMS & SEO Integration",
    ],
    link: "/services/website-development",
  },

  {
    number: "02",
    title: "Software Development",
    description:
      "Create custom software solutions designed around your business processes, challenges, and long-term growth objectives.",
    features: [
      "Business Management Systems",
      "Custom Web Applications",
      "Internal Tools",
      "Automation Systems",
      "API Development",
    ],
    link: "/services/software-development",
  },

  {
    number: "03",
    title: "E-Commerce Development",
    description:
      "Develop powerful online stores that help businesses sell products, manage operations, and deliver better customer experiences.",
    features: [
      "Online Stores",
      "Inventory Management",
      "Payment Integration",
      "Order Management",
      "Sales Analytics",
    ],
    link: "/services/ecommerce",
  },

  {
    number: "04",
    title: "Mobile Applications",
    description:
      "Build mobile applications that improve customer engagement, streamline workflows, and create new digital experiences.",
    features: [
      "Business Applications",
      "Customer Apps",
      "Employee Applications",
      "Mobile Platforms",
      "App Integrations",
    ],
    link: "/services/mobile-development",
  },

  {
    number: "05",
    title: "Artificial Intelligence",
    description:
      "Transform business operations with practical AI solutions that automate processes, improve efficiency, and unlock new possibilities.",
    features: [
      "AI Assistants",
      "Business Automation",
      "Document Analysis",
      "AI Integrations",
      "Custom AI Solutions",
    ],
    link: "/services/ai-solutions",
  },

  {
    number: "06",
    title: "Cybersecurity",
    description:
      "Protect your digital environment with security solutions designed to identify weaknesses, reduce risks, and strengthen systems.",
    features: [
      "Security Assessments",
      "Vulnerability Reviews",
      "Application Security",
      "Risk Analysis",
      "Security Consulting",
    ],
    link: "/services/cybersecurity",
  },

  {
    number: "07",
    title: "Cloud Solutions",
    description:
      "Deploy reliable and scalable cloud infrastructure designed to support modern applications and growing businesses.",
    features: [
      "Cloud Deployment",
      "Infrastructure Setup",
      "Scalable Systems",
      "Performance Optimization",
      "Cloud Management",
    ],
    link: "/services/cloud-solutions",
  },
];

const process = [
  {
    number: "01",
    title: "Understand",
    description:
      "We begin by understanding your goals, challenges, and the outcomes you want your technology to achieve.",
  },

  {
    number: "02",
    title: "Strategize",
    description:
      "We design the right technical approach, selecting solutions that match your requirements and future growth.",
  },

  {
    number: "03",
    title: "Build",
    description:
      "We transform ideas into reliable, secure, and scalable technology solutions through careful development and testing.",
  },

  {
    number: "04",
    title: "Evolve",
    description:
      "We help improve, maintain, and scale your technology as your business continues to grow.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">

      {/* Hero */}

      <section className="relative overflow-hidden border-b border-white/10 pt-20">

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="absolute left-[-10%] top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">

          <Reveal>

            <p className="mb-8 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
              Our Services
            </p>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">

              Technology

              <br />

              <span className="text-[#A1A1AA]">
                built for growth.
              </span>

            </h1>

            <p className="mt-10 max-w-3xl text-lg leading-8 text-[#A1A1AA] sm:text-xl">

              We design and build digital solutions that help businesses grow,
              automate, secure, and scale — from websites and software platforms
              to artificial intelligence and cybersecurity solutions.

            </p>

          </Reveal>

        </div>

      </section>



      {/* Services */}

      <section className="border-b border-white/10 py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <Reveal>

            <div className="mb-20 max-w-2xl">

              <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
                What We Build
              </p>

              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">

                Technology solutions designed around your business.

              </h2>

            </div>

          </Reveal>



          <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">


            {services.map((service, index) => (

              <Reveal
                key={service.number}
                delay={index * 100}
              >

                <article
                  className="
                  group
                  relative
                  overflow-hidden
                  bg-[#050505]
                  p-8
                  transition
                  duration-500
                  hover:bg-white/[0.03]
                  sm:p-10
                  lg:p-12
                  "
                >

                  <div
                    className="
                    pointer-events-none
                    absolute
                    right-0
                    top-0
                    h-64
                    w-64
                    rounded-full
                    bg-blue-500/10
                    opacity-0
                    blur-3xl
                    transition
                    duration-500
                    group-hover:opacity-100
                    "
                  />


                  <span className="text-sm font-medium text-blue-400">
                    {service.number}
                  </span>


                  <h3 className="mt-16 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">

                    {service.title}

                  </h3>


                  <p className="mt-6 max-w-lg text-lg leading-8 text-[#A1A1AA]">

                    {service.description}

                  </p>


                  <div className="mt-10 border-t border-white/10 pt-8">

                    <p className="text-xs uppercase tracking-[0.2em] text-[#52525B]">
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


                  <Link
                    href={service.link}
                    className="mt-10 inline-flex text-sm font-medium text-blue-400 transition hover:text-blue-300"
                  >
                    Explore Service →
                  </Link>


                </article>

              </Reveal>

            ))}


          </div>

        </div>

      </section>




      {/* Process */}

      <section className="border-b border-white/10 py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <Reveal>

            <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
              How We Work
            </p>


            <h2 className="mt-6 max-w-xl text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">

              From idea to implementation.

            </h2>

          </Reveal>



          <div className="mt-20">

            {process.map((item, index) => (

              <Reveal
                key={item.number}
                delay={index * 100}
              >

                <div className="border-t border-white/10 py-10">

                  <span className="text-sm text-blue-400">
                    {item.number}
                  </span>


                  <h3 className="mt-4 text-2xl font-semibold">
                    {item.title}
                  </h3>


                  <p className="mt-4 max-w-xl text-[#A1A1AA]">
                    {item.description}
                  </p>

                </div>

              </Reveal>

            ))}

          </div>

        </div>

      </section>




      {/* CTA */}

      <section className="py-40">

        <Reveal>

          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">


            <p className="mb-6 text-sm uppercase tracking-[0.25em] text-blue-400">
              Start a Project
            </p>


            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">

              Have a technology challenge?

            </h2>


            <p className="mx-auto mt-8 max-w-xl text-lg text-[#A1A1AA]">

              Tell us what you are building and we will help find the right
              technology solution.

            </p>


            <div className="mt-10 flex justify-center">


              <Link
                href="/quote"
                className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-[#e4e4e4]"
              >

                Request a Quote →

              </Link>


            </div>


          </div>

        </Reveal>

      </section>


    </main>
  );
}