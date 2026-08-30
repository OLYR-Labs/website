"use client";

import { FormEvent, useState } from "react";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "", website: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setSending(true); setError("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send message.");
      setSubmitted(true); setFormData({ name: "", email: "", company: "", message: "", website: "" });
    } catch (err) { console.error(err); setError("Something went wrong while sending your message. Please try again."); }
    finally { setSending(false); }
  };

  return (
    <main className="overflow-hidden pt-24">
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24">
        <Reveal><span className="eyebrow">START A CONVERSATION</span></Reveal>
        <Reveal delay={80}><h1 className="mt-7 max-w-5xl text-[clamp(3.5rem,8vw,7.8rem)] font-semibold leading-[.9] tracking-[-.07em]">Let&apos;s build <span className="text-[var(--blue)]">what&apos;s next.</span></h1></Reveal>
        <Reveal delay={150}><p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">Have a product idea, operational problem, or security challenge? Give us the context. We&apos;ll help you find the right technology path.</p></Reveal>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-24 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:px-12 lg:pb-32">
        <Reveal>
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-sm)] sm:p-10">
            <p className="section-kicker">Why talk to us?</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Start with the problem, not the technology.</h2>
            <p className="mt-5 leading-7 text-[var(--text-secondary)]">We can help scope websites, ERP and POS systems, custom software, AI automation and cybersecurity work without forcing you into a predefined package.</p>
            <div className="mt-10 space-y-3">
              {["Web & e-commerce", "ERP & POS", "Custom software & automation", "AI & cybersecurity"].map((item, i) => <div key={item} className="flex items-center gap-3 border-t border-[var(--border)] py-4 text-sm"><span className="text-xs font-bold text-[var(--blue)]">0{i + 1}</span>{item}</div>)}
            </div>
            <div className="mt-10 border-t border-[var(--border)] pt-7"><p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--text-muted)]">Email</p><a href="mailto:olyrlabs@gmail.com" className="mt-2 inline-block text-lg font-semibold hover:text-[var(--blue)]">olyrlabs@gmail.com</a><p className="mt-7 text-xs font-bold uppercase tracking-[.16em] text-[var(--text-muted)]">Location</p><p className="mt-2 text-lg font-semibold">Sri Lanka</p></div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-md)] sm:p-10 lg:p-12">
            {submitted ? <div className="flex min-h-[520px] flex-col items-center justify-center text-center"><div className="grid h-16 w-16 place-items-center rounded-full bg-[var(--blue-soft)] text-2xl font-bold text-[var(--blue)]">✓</div><h2 className="mt-7 text-3xl font-semibold">Message received.</h2><p className="mt-4 max-w-md leading-7 text-[var(--text-secondary)]">Thanks for contacting OLYR Labs. We&apos;ll get back to you soon.</p><button onClick={() => setSubmitted(false)} className="mt-8 text-sm font-semibold text-[var(--blue)]">Send another message →</button></div> : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <input type="text" name="website" value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} className="hidden" autoComplete="off" />
                <div className="grid gap-6 sm:grid-cols-2"><Input label="Name" name="name" value={formData.name} setFormData={setFormData} placeholder="Your name" required /><Input label="Email" name="email" value={formData.email} setFormData={setFormData} placeholder="you@example.com" required /></div>
                <Input label="Company" name="company" value={formData.company} setFormData={setFormData} placeholder="Company (optional)" />
                <div><label htmlFor="message" className="mb-3 block text-sm font-medium">Message</label><textarea id="message" rows={7} name="message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required placeholder="What are you trying to build or improve?" className="input resize-none" /></div>
                {error && <p className="text-sm font-medium text-red-500">{error}</p>}
                <button disabled={sending} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--foreground)] px-6 text-sm font-bold text-[var(--background)] transition hover:-translate-y-0.5 hover:bg-[var(--blue)] hover:text-white disabled:opacity-50">{sending ? "Sending…" : "Send message ↗"}</button>
                <p className="text-center text-xs leading-5 text-[var(--text-muted)]">By sending this form, you&apos;re asking OLYR Labs to contact you about your enquiry.</p>
              </form>
            )}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-12"><div className="rounded-[30px] bg-[var(--foreground)] px-7 py-16 text-center text-[var(--background)] sm:px-12"><p className="text-xs font-bold uppercase tracking-[.18em] text-[var(--blue-light)]">Prefer a quick chat?</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em]">We&apos;re one message away.</h2><a href="https://wa.me/94781026353?text=Hi%20OLYR%20Labs!%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-bold text-black transition hover:-translate-y-1">Chat on WhatsApp ↗</a></div></section>
    </main>
  );
}

function Input({ label, name, value, setFormData, placeholder, required = false }: { label: string; name: string; value: string; setFormData: React.Dispatch<React.SetStateAction<{ name: string; email: string; company: string; message: string; website: string }>>; placeholder: string; required?: boolean }) {
  return <div><label htmlFor={name} className="mb-3 block text-sm font-medium">{label}</label><input id={name} name={name} value={value} onChange={e => setFormData(prev => ({ ...prev, [name]: e.target.value }))} placeholder={placeholder} required={required} className="input" /></div>;
}
