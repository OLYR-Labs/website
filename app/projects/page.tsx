const projects = [
    {
    number: "01",
    category: "Cybersecurity",
    title: "Security & Digital Resilience",
    description:
    "Exploring practical approaches to protecting digital environments, identifying security risks, and building stronger foundations for modern organizations.",
    tags: ["Security", "Risk", "Resilience"],
    status: "Exploring",
    },
    {
    number: "02",
    category: "Software",
    title: "Digital Products & Platforms",
    description:
    "Building modern software experiences designed to solve real problems, improve operations, and create meaningful value for users and businesses.",
    tags: ["Web", "Software", "Platforms"],
    status: "Building",
    },
    {
    number: "03",
    category: "Artificial Intelligence",
    title: "Intelligent Technology",
    description:
    "Exploring how artificial intelligence can be applied to automate processes, improve decision-making, and create smarter digital experiences.",
    tags: ["AI", "Automation", "Innovation"],
    status: "Researching",
    },
    {
    number: "04",
    category: "Cloud",
    title: "Scalable Digital Infrastructure",
    description:
    "Exploring cloud technologies and infrastructure approaches that enable organizations to build reliable, scalable, and secure digital systems.",
    tags: ["Cloud", "Infrastructure", "Scalability"],
    status: "Exploring",
    },
    ];
    
    export default function ProjectsPage() {
    return ( <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
    {/* Hero */} <section className="relative overflow-hidden border-b border-white/10 pt-20"> <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
    
    
        <div className="absolute right-[-10%] top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />
    
        <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">
          <p className="mb-8 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
            Our Work
          </p>
    
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            Ideas become
            <br />
            <span className="text-[#A1A1AA]">technology.</span>
          </h1>
    
          <p className="mt-10 max-w-2xl text-lg leading-8 text-[#A1A1AA] sm:text-xl">
            We explore ideas, technologies, and projects across artificial
            intelligence, software, cloud infrastructure, and cybersecurity.
            Our work is driven by curiosity, practical problem-solving, and a
            desire to build technology that matters.
          </p>
        </div>
      </section>
    
      {/* Projects */}
      <section className="border-b border-white/10 py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-20 max-w-2xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
              Selected Work
            </p>
    
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
              Building, researching,
              <br />
              and exploring.
            </h2>
          </div>
    
          <div className="space-y-px border-y border-white/10">
            {projects.map((project) => (
              <article
                key={project.number}
                className="group border-b border-white/10 py-12 last:border-b-0 sm:py-16"
              >
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-1">
                    <span className="text-sm text-[#52525B]">
                      {project.number}
                    </span>
                  </div>
    
                  <div className="lg:col-span-3">
                    <p className="text-sm uppercase tracking-[0.2em] text-blue-400">
                      {project.category}
                    </p>
    
                    <div className="mt-4 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-[#71717A]">
                      {project.status}
                    </div>
                  </div>
    
                  <div className="lg:col-span-5">
                    <h3 className="text-3xl font-semibold tracking-[-0.03em] transition-colors duration-300 group-hover:text-blue-400 sm:text-4xl">
                      {project.title}
                    </h3>
    
                    <p className="mt-6 max-w-xl text-base leading-7 text-[#A1A1AA]">
                      {project.description}
                    </p>
                  </div>
    
                  <div className="flex flex-wrap content-start gap-2 lg:col-span-3 lg:justify-end">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-white/10 px-3 py-2 text-xs text-[#71717A]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
    
                <div className="mt-10 h-px w-0 bg-blue-400 transition-all duration-500 group-hover:w-24" />
              </article>
            ))}
          </div>
        </div>
      </section>
    
      {/* Philosophy */}
      <section className="border-b border-white/10 py-40">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
              How We Build
            </p>
          </div>
    
          <div>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
              Every project starts with a question.
            </h2>
    
            <p className="mt-8 text-lg leading-8 text-[#A1A1AA]">
              What can technology do better? We believe meaningful innovation
              starts by asking the right questions, understanding the problem,
              and exploring solutions that can create real value.
            </p>
    
            <p className="mt-6 text-lg leading-8 text-[#A1A1AA]">
              As OLYR Labs grows, this space will become a collection of our
              completed projects, experiments, research, and technology
              initiatives.
            </p>
          </div>
        </div>
      </section>
    
      {/* Future Work */}
      <section className="py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 border border-white/10 p-8 sm:p-12 lg:grid-cols-2 lg:p-20">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
                What's Next
              </p>
    
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                This is only the beginning.
              </h2>
            </div>
    
            <div>
              <p className="text-lg leading-8 text-[#A1A1AA]">
                We're building OLYR Labs from the ground up. As we develop new
                products, complete projects, and explore new technologies,
                we'll share the work here.
              </p>
    
              <a
                href="/#contact"
                className="mt-10 inline-flex rounded-full bg-[#F5F5F5] px-8 py-4 text-sm font-semibold text-black transition hover:bg-white"
              >
                Work With Us →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    
    );
    }
    