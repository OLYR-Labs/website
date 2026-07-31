"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
const [submitted, setSubmitted] = useState(false);
const [sending, setSending] = useState(false);
const [error, setError] = useState("");

const [formData, setFormData] = useState({
name: "",
email: "",
company: "",
message: "",
website: "",
});

const handleChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
const { name, value } = e.target;


setFormData((previous) => ({
  ...previous,
  [name]: value,
}));


};

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
e.preventDefault();


setSending(true);
setError("");

try {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to send message.");
  }

  setSubmitted(true);

  setFormData({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "",
  });
} catch (error) {
  console.error("Contact form error:", error);

  setError(
    "Something went wrong while sending your message. Please try again."
  );
} finally {
  setSending(false);
}


};

return ( <main className="min-h-screen bg-[#050505] text-[#F5F5F5]"> <section className="relative overflow-hidden border-b border-white/10 pt-20"> <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />


    <div className="absolute right-[-10%] top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />

    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">
      <p className="mb-8 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
        Contact OLYR Labs
      </p>

      <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
        Let&apos;s build
        <br />
        <span className="text-[#A1A1AA]">what&apos;s next.</span>
      </h1>

      <p className="mt-10 max-w-2xl text-lg leading-8 text-[#A1A1AA] sm:text-xl">
        Have an idea, a challenge, or a problem worth solving? Tell us
        about it. We&apos;d love to explore what we can build together.
      </p>
    </div>
  </section>

  <section className="border-b border-white/10 py-32">
    <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
          Start a Conversation
        </p>

        <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
          Tell us what you&apos;re working on.
        </h2>

        <p className="mt-8 max-w-lg text-lg leading-8 text-[#A1A1AA]">
          Whether you&apos;re exploring an idea, looking for a technology
          partner, or simply want to talk about what&apos;s possible,
          we&apos;d be happy to hear from you.
        </p>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm uppercase tracking-[0.2em] text-[#52525B]">
            Email
          </p>

          <p className="mt-3 text-lg text-[#A1A1AA]">
            olyrlabs@gmail.com
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
              Thanks for reaching out to OLYR Labs. We&apos;ll be in touch
              as soon as possible.
            </p>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setError("");
              }}
              className="mt-8 text-sm font-medium text-blue-400 transition hover:text-blue-300"
            >
              Send another message →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm text-[#A1A1AA]">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm text-[#A1A1AA]">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
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
                name="company"
                value={formData.company}
                onChange={handleChange}
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
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your idea or challenge..."
                required
                className="w-full resize-none border-b border-white/20 bg-transparent px-0 py-3 text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-[#F5F5F5] px-8 py-4 text-sm font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Message →"}
            </button>

            <p className="text-center text-xs leading-5 text-[#52525B]">
              Your message will be sent securely to OLYR Labs.
            </p>
          </form>
        )}
      </div>
    </div>
  </section>

  <section className="py-40">
    <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
      <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
        OLYR Labs
      </p>

      <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
        Technology for what&apos;s next.
      </h2>

      <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-[#A1A1AA]">
        We&apos;re at the beginning of our journey. Let&apos;s build
        something meaningful together.
      </p>
    </div>
  </section>
</main>


);
}
