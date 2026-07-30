const services = [
    {
    number: "01",
    title: "Artificial Intelligence",
    description:
    "We explore intelligent technologies that help businesses automate processes, uncover insights, and create smarter digital experiences.",
    features: [
    "AI-powered solutions",
    "Intelligent automation",
    "Data-driven insights",
    "AI integration",
    ],
    },
    {
    number: "02",
    title: "Software Development",
    description:
    "We build modern, scalable software solutions designed around real-world problems, business needs, and long-term growth.",
    features: [
    "Web applications",
    "Custom software",
    "API development",
    "Digital platforms",
    ],
    },
    {
    number: "03",
    title: "Cloud Infrastructure",
    description:
    "We help organizations build reliable and scalable cloud environments that support modern applications and digital operations.",
    features: [
    "Cloud architecture",
    "Infrastructure design",
    "Scalable systems",
    "Cloud security",
    ],
    },
    {
    number: "04",
    title: "Cybersecurity",
    description:
    "We focus on protecting digital environments through security-focused thinking, proactive assessment, and resilient technology.",
    features: [
    "Security assessment",
    "Vulnerability analysis",
    "Security architecture",
    "Risk awareness",
    ],
    },
    ];
    
    export default function ServicesPage() {
    return ( <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
    {/* Hero */} <section className="relative overflow-hidden border-b border-white/10 pt-20"> <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
    
    
        <div className="absolute left-[-10%] top-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />
    
        <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">
          <p className="mb-8 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
            Our Capabilities
          </p>
    
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            Technology built
            <br />
            <span className="text-[#A1A1AA]">for what's next.</span>
          </h1>
    
          <p className="mt-10 max-w-2xl text-lg leading-8 text-[#A1A1AA] sm:text-xl">
            From intelligent systems to secure digital infrastructure, we
            explore and build technology that helps individuals and businesses
            move forward.
          </p>
        </div>
      </section>
    
      {/* Services */}
      <section className="border-b border-white/10 py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-20 max-w-2xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
              What We Do
            </p>
    
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
              Four capabilities.
              <br />
              One vision.
            </h2>
          </div>
    
          <div className="grid border-l border-t border-white/10 lg:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.number}
                className="group border-b border-r border-white/10 p-8 transition-colors duration-500 hover:bg-white/[0.02] sm:p-12 lg:p-16"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm text-[#52525B]">
                    {service.number}
                  </span>
    
                  <span className="text-[#52525B] transition-colors duration-300 group-hover:text-blue-400">
                    ↗
                  </span>
                </div>
    
                <h3 className="mt-24 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  {service.title}
                </h3>
    
                <p className="mt-6 max-w-lg text-base leading-7 text-[#A1A1AA]">
                  {service.description}
                </p>
    
                <div className="mt-10 grid grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="border border-white/10 px-4 py-3 text-sm text-[#A1A1AA] transition-colors duration-300 group-hover:border-white/20"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
    
                <div className="mt-12 h-px w-0 bg-blue-400 transition-all duration-500 group-hover:w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    
      {/* Approach */}
      <section className="border-b border-white/10 py-40">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
              Our Approach
            </p>
          </div>
    
          <div>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
              We don't just build technology.
              <br />
              <span className="text-[#A1A1AA]">
                We build with purpose.
              </span>
            </h2>
    
            <p className="mt-8 text-lg leading-8 text-[#A1A1AA]">
              Every project starts with understanding the problem. We believe
              the best technology is practical, secure, scalable, and designed
              to create meaningful value.
            </p>
    
            <div className="mt-12 space-y-6">
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-medium">01 — Understand</h3>
    
                <p className="mt-2 text-[#71717A]">
                  We start by understanding the challenge, the environment,
                  and the people involved.
                </p>
              </div>
    
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-medium">02 — Design</h3>
    
                <p className="mt-2 text-[#71717A]">
                  We explore solutions that balance innovation, usability,
                  security, and long-term value.
                </p>
              </div>
    
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-medium">03 — Build</h3>
    
                <p className="mt-2 text-[#71717A]">
                  We turn ideas into reliable technology through thoughtful
                  engineering and continuous improvement.
                </p>
              </div>
    
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-medium">04 — Evolve</h3>
    
                <p className="mt-2 text-[#71717A]">
                  Technology never stands still. We design with the future in
                  mind and continuously look for ways to improve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      {/* CTA */}
      <section className="py-40">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
            Start Something
          </p>
    
          <h2 className="mx-auto max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
            Have a problem worth solving?
          </h2>
    
          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-[#A1A1AA]">
            Let's explore what's possible and build something meaningful
            together.
          </p>
    
          <a
            href="/#contact"
            className="mt-10 inline-flex rounded-full bg-[#F5F5F5] px-8 py-4 text-sm font-semibold text-black transition hover:bg-white"
          >
            Start a Conversation →
          </a>
        </div>
      </section>
    </main>
    
    
    );
    }
    