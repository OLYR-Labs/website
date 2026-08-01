"use client";

import { FormEvent, useState } from "react";
import Reveal from "@/components/Reveal";

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
      console.error(error);

      setError(
        "Something went wrong while sending your message. Please try again."
      );

    } finally {
      setSending(false);
    }
  };


  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">


      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/10 pt-20">


        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />


        <div className="absolute right-[-10%] top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />


        <Reveal>

        <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">

          <p className="mb-8 text-sm uppercase tracking-[0.25em] text-blue-400">
            Contact OLYR Labs
          </p>


          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">

            Let's build

            <br />

            <span className="text-[#A1A1AA]">
              what's next.
            </span>

          </h1>


          <p className="mt-10 max-w-2xl text-lg leading-8 text-[#A1A1AA] sm:text-xl">

            Have an idea, challenge, or opportunity?
            Tell us what you are building and let's explore
            what technology can achieve together.

          </p>


        </div>

        </Reveal>

      </section>





      {/* CONTACT AREA */}


      <section className="border-b border-white/10 py-32">


        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">


          <Reveal>


          <div>


            <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
              Start a Conversation
            </p>



            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">

              Tell us what you're working on.

            </h2>



            <p className="mt-8 max-w-lg text-lg leading-8 text-[#A1A1AA]">

              Whether you need software, AI solutions,
              infrastructure, or cybersecurity expertise,
              we'd love to hear your idea.

            </p>





            <div className="mt-12 space-y-6">


              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-blue-400/40">

                <p className="text-xs uppercase tracking-[0.2em] text-[#52525B]">
                  Email
                </p>

                <p className="mt-3 text-lg">
                  olyrlabs@gmail.com
                </p>

              </div>



              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-blue-400/40">

                <p className="text-xs uppercase tracking-[0.2em] text-[#52525B]">
                  Location
                </p>

                <p className="mt-3 text-lg">
                  Sri Lanka
                </p>

              </div>



            </div>


          </div>


          </Reveal>






          {/* FORM */}


          <Reveal delay={150}>


          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 lg:p-12">


            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />


            {submitted ? (


              <div className="relative flex min-h-[500px] flex-col items-center justify-center text-center">


                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/30 bg-blue-400/10 text-2xl text-blue-400">
                  ✓
                </div>


                <h3 className="mt-8 text-3xl font-semibold">
                  Message received.
                </h3>


                <p className="mt-4 max-w-md text-[#A1A1AA]">
                  Thanks for contacting OLYR Labs.
                  We'll get back to you soon.
                </p>


                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-sm text-blue-400 hover:text-blue-300"
                >
                  Send another message →
                </button>


              </div>


            ) : (


              <form
                onSubmit={handleSubmit}
                className="relative space-y-8"
              >


                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="hidden"
                  autoComplete="off"
                />



                <div className="grid gap-8 sm:grid-cols-2">


                  <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />


                  <Input
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />


                </div>





                <Input
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company (optional)"
                />





                <div>


                  <label className="mb-3 block text-sm text-[#A1A1AA]">
                    Message
                  </label>


                  <textarea
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your project..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
                  />


                </div>



                {error && (
                  <p className="text-sm text-red-400">
                    {error}
                  </p>
                )}




                <button
                  disabled={sending}
                  className="w-full rounded-full bg-[#F5F5F5] py-4 text-sm font-semibold text-black transition hover:bg-white disabled:opacity-50"
                >

                  {sending ? "Sending..." : "Send Message →"}

                </button>



              </form>


            )}


          </div>


          </Reveal>



        </div>


      </section>







      {/* FINAL CTA */}


      <section className="py-40">


        <Reveal>


        <div className="mx-auto max-w-4xl px-6 text-center">


          <p className="mb-6 text-sm uppercase tracking-[0.25em] text-blue-400">
            OLYR Labs
          </p>


          <h2 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
            Technology for what's next.
          </h2>


          <p className="mx-auto mt-8 max-w-xl text-lg text-[#A1A1AA]">
            Building intelligent software, secure systems,
            and future-ready technology.
          </p>


        </div>


        </Reveal>


      </section>


    </main>
  );
}




function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
}: any) {


return (

<div>


<label className="mb-3 block text-sm text-[#A1A1AA]">
{label}
</label>


<input
name={name}
value={value}
onChange={onChange}
placeholder={placeholder}
required={name !== "company"}
className="
w-full
rounded-xl
border
border-white/10
bg-black/20
px-4
py-3
text-white
outline-none
transition
placeholder:text-[#52525B]
focus:border-blue-400
"
/>


</div>

);

}