"use client";

import { useState } from "react";

export default function ContactPage() {
const [submitted, setSubmitted] = useState(false);

return ( <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
{/* Hero */} <section className="relative overflow-hidden border-b border-white/10 pt-20"> <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />


    <div className="absolute right-[-10%] top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />

    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">
      <p className="mb-8 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
        Contact OLYR Labs
      </p>

      <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
        Let's build
        <br />
        <span className="text-[#A1A1AA]">what's next.</span>
      </h1>

      <p className="mt-10 max-w-2xl text-lg leading-8 text-[#A1A1AA] sm:text-xl">
        Have an idea, a challenge, or a problem worth solving? Tell us
        about it. We'd love to explore what we can build together.
      </p>
    </div>
  </section>

  {/* Contact Content */}
  <section className="border-b border-white/10 py-32">
    <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2 lg:px-8">

      {/* Left Side */}
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
          Start a Conversation
        </p>

        <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
          Tell us what you're working on.
        </h2>

        <p className="mt-8 max-w-lg text-lg leading-8 text-[#A1A1AA]">
          Whether you're exploring an idea, looking for a technology
          partner, or simply want to talk about what's possible, we'd be
          happy to hear from you.
        </p>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm uppercase tracking-[0.2em] text-[#52525B]">
            Email
          </p>

          <p className="mt-3 text-lg text-[#A1A1AA]">
            Coming soon
          </p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8">
          <p className="text-sm uppercase tracking-[0.2em] text-[#52525B]">
            Location
          </p>

          <p className="mt-3 text-lg text-[#A1A1AA]">
            Sri Lanka
          </p>
        </div>
      </div>

      {/* Contact Box */}
      <div className="border border-white/10 bg-white/[0.02] p-8 sm:p-10 lg:p-12">

        {submitted ? (
          <div className="flex min-h-[500px] flex-col items-center justify-center text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/30 bg-blue-400/10 text-2xl text-blue-400">
              ✓
            </div>

            <h3 className="mt-8 text-3xl font-semibold">
              Message received.
            </h3>

            <p className="mt-4 max-w-md leading-7 text-[#A1A1AA]">
              Thanks for reaching out to OLYR Labs. We'll be in touch as
              soon as possible.
            </p>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-8 text-sm font-medium text-blue-400 transition hover:text-blue-300"
            >
              Send another message →
            </button>

          </div>
        ) : (
          <div className="space-y-8">

            <div className="grid gap-8 sm:grid-cols-2">

              <div>
                <label className="mb-3 block text-sm text-[#A1A1AA]">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm text-[#A1A1AA]">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
                />
              </div>

            </div>

            <div>
              <label className="mb-3 block text-sm text-[#A1A1AA]">
                Company
              </label>

              <input
                type="text"
                placeholder="Your company (optional)"
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm text-[#A1A1AA]">
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Tell us about your idea or challenge..."
                className="w-full resize-none border-b border-white/20 bg-transparent px-0 py-3 text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
              />
            </div>

            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="w-full rounded-full bg-[#F5F5F5] px-8 py-4 text-sm font-semibold text-black transition hover:bg-white"
            >
              Send Message →
            </button>

            <p className="text-center text-xs leading-5 text-[#52525B]">
              This form is currently a demonstration. Message delivery
              will be connected soon.
            </p>

          </div>
        )}

      </div>
    </div>
  </section>

  {/* Final CTA */}
  <section className="py-40">
    <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

      <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
        OLYR Labs
      </p>

      <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
        Technology for what's next.
      </h2>

      <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-[#A1A1AA]">
        We're at the beginning of our journey. Let's build something
        meaningful together.
      </p>

    </div>
  </section>
</main>


);
}
