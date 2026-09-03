"use client";

import { FormEvent, useState } from "react";
import Reveal from "@/components/Reveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "", website: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
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

  return <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
    <section className="relative overflow-hidden border-y border-[var(--border)] pt-28 sm:pt-36"><div className="pointer-events-none absolute right-[-8%] top-1/4 h-96 w-96 rounded-full bg-blue-500/[0.08] blur-[140px]" /><div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20"><Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">Contact</p><h1 className="mt-4 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">Get in touch.</h1></Reveal></div></section>
    <section className="py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8"><Reveal><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">Start a conversation</p><h2 className="mt-4 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Have an idea, challenge, or project?</h2><div className="mt-8 space-y-3 text-sm text-[var(--muted)]"><a href="mailto:hello@olyrlabs.com" className="block transition hover:text-[var(--text)]">hello@olyrlabs.com</a><span className="block">Sri Lanka</span></div></div></Reveal>
      <Reveal delay={100}><div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-10"><div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/[0.10] blur-3xl" />{submitted ? <div className="relative flex min-h-[420px] flex-col items-center justify-center text-center"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-400/10 text-xl text-blue-400">✓</div><h3 className="mt-6 text-2xl font-semibold">Message received.</h3><p className="mt-3 max-w-md text-sm leading-7 text-[var(--muted)]">Thanks for contacting OLYR Labs. We&apos;ll get back to you soon.</p><button onClick={() => setSubmitted(false)} className="mt-7 text-sm font-semibold text-[var(--accent)]">Send another message →</button></div> : <form onSubmit={handleSubmit} className="relative space-y-6"><input type="text" name="website" value={formData.website} onChange={handleChange} className="hidden" autoComplete="off" /><div className="grid gap-6 sm:grid-cols-2"><Input label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" /><Input label="Email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" /></div><Input label="Company" name="company" value={formData.company} onChange={handleChange} placeholder="Company (optional)" /><div><label className="mb-2 block text-sm text-[var(--muted)]">Message</label><textarea rows={6} name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us about your project..." className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 text-[var(--text)] outline-none placeholder:text-[var(--subtle)] focus:border-[var(--accent)]" /></div>{error && <p className="text-sm text-red-400">{error}</p>}<button disabled={sending} className="w-full rounded-full bg-[var(--text)] py-4 text-sm font-semibold text-[var(--background)] transition hover:bg-[var(--accent)] hover:text-white disabled:opacity-50">{sending ? "Sending..." : "Send Message →"}</button></form>}</div></Reveal>
    </div></section>
  </main>;
}

function Input({ label, name, value, onChange, placeholder }: any) { return <div><label className="mb-2 block text-sm text-[var(--muted)]">{label}</label><input name={name} value={value} onChange={onChange} placeholder={placeholder} required={name !== "company"} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3.5 text-[var(--text)] outline-none placeholder:text-[var(--subtle)] focus:border-[var(--accent)]" /></div>; }
