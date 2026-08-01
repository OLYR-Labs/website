"use client";

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
];


export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">


      {/* Hero */}

      <section className="relative overflow-hidden border-b border-white/10 pt-20">

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />


        <div className="absolute right-[-10%] top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />


        <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">

          <Reveal>

            <p className="mb-8 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
              Our Work
            </p>


            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">

              Building technology

              <br />

              <span className="text-[#A1A1AA]">
                for what's next.
              </span>

            </h1>


            <p className="mt-10 max-w-2xl text-lg leading-8 text-[#A1A1AA] sm:text-xl">

              Explore the systems, concepts, and technology initiatives created
              by OLYR Labs across artificial intelligence, software development,
              cloud infrastructure, and cybersecurity.

            </p>

          </Reveal>


        </div>

      </section>






      {/* Projects */}


      <section className="border-b border-white/10 py-32">


        <div className="mx-auto max-w-7xl px-6 lg:px-8">


          <Reveal>


            <div className="mb-20 max-w-2xl">


              <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
                Selected Work
              </p>


              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">

                Projects, platforms,
                <br />
                and technology.

              </h2>


            </div>


          </Reveal>





          <div className="space-y-px border-y border-white/10">


            {projects.map((project,index)=>(


              <Reveal
                key={project.number}
                delay={index * 120}
              >


                <article
                  className="
                  group
                  relative
                  overflow-hidden
                  border-b
                  border-white/10
                  py-12
                  transition
                  duration-500
                  hover:bg-white/[0.03]
                  last:border-b-0
                  sm:py-16
                  "
                >



                  <div
                    className="
                    pointer-events-none
                    absolute
                    right-0
                    top-0
                    h-72
                    w-72
                    rounded-full
                    bg-blue-500/10
                    opacity-0
                    blur-3xl
                    transition
                    duration-500
                    group-hover:opacity-100
                    "
                  />





                  <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-8">


                    <div className="lg:col-span-1">

                      <span className="text-sm text-[#52525B]">

                        {project.number}

                      </span>

                    </div>





                    <div className="lg:col-span-3">


                      <p className="text-sm uppercase tracking-[0.2em] text-blue-400">

                        {project.category}

                      </p>



                      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-[#71717A]">


                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                        {project.status}


                      </div>


                    </div>





                    <div className="lg:col-span-5">


                      <h3 className="text-3xl font-semibold tracking-[-0.03em] transition duration-300 group-hover:text-blue-400 sm:text-4xl">

                        {project.title}

                      </h3>



                      <p className="mt-6 max-w-xl text-base leading-7 text-[#A1A1AA]">

                        {project.description}

                      </p>


                    </div>





                    <div className="flex flex-wrap content-start gap-2 lg:col-span-3 lg:justify-end">


                      {project.tags.map((tag)=>(


                        <span
                          key={tag}
                          className="
                          border
                          border-white/10
                          px-3
                          py-2
                          text-xs
                          text-[#71717A]
                          transition
                          group-hover:border-blue-400/40
                          "
                        >

                          {tag}

                        </span>


                      ))}


                    </div>



                  </div>





                  <div className="relative mt-10 h-px w-0 bg-blue-400 transition-all duration-500 group-hover:w-24" />


                </article>


              </Reveal>


            ))}


          </div>


        </div>


      </section>








      {/* Philosophy */}


      <section className="border-b border-white/10 py-40">


        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">


          <Reveal>


            <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">

              How We Build

            </p>


          </Reveal>





          <Reveal delay={150}>


            <div>


              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">

                Every solution starts with understanding the problem.

              </h2>



              <p className="mt-8 text-lg leading-8 text-[#A1A1AA]">

                We believe meaningful technology begins with identifying real
                challenges, understanding users, and building solutions that
                create measurable value.

              </p>



              <p className="mt-6 text-lg leading-8 text-[#A1A1AA]">

                Our work combines artificial intelligence, software engineering,
                cloud technologies, and security principles to create future-ready
                solutions.

              </p>


            </div>


          </Reveal>



        </div>


      </section>








      {/* CTA */}


      <section className="py-40">


        <Reveal>


          <div className="mx-auto max-w-7xl px-6 lg:px-8">


            <div className="grid gap-12 border border-white/10 p-8 sm:p-12 lg:grid-cols-2 lg:p-20">


              <div>


                <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">

                  Start Building

                </p>



                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">

                  Have a problem worth solving?

                </h2>


              </div>




              <div>


                <p className="text-lg leading-8 text-[#A1A1AA]">

                  We help businesses explore, design, and build technology
                  solutions that move them forward.

                </p>



                <Link
                  href="/contact"
                  className="
                  mt-10
                  inline-flex
                  rounded-full
                  bg-[#F5F5F5]
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  text-black
                  transition
                  hover:bg-white
                  "
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