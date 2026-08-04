
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Insights", href: "/insights" },
    { name: "SecureScan", href: "/secure-scan" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-[9999] border-b border-white/[0.10] bg-white/[0.025] shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl backdrop-saturate-150">
      {/* Soft blue ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-24 w-[500px] -translate-x-1/2 rounded-full bg-blue-500/[0.04] blur-3xl" />

      {/* Bottom glow line */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-400/[0.20] to-transparent" />

      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group relative flex items-center"
        >
          <div className="absolute inset-0 rounded-full bg-blue-400/10 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

          <Image
            src="/olyrlabslogo.png"
            alt="OLYR Labs"
            width={140}
            height={50}
            className="relative h-auto w-[120px] object-contain transition duration-500 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 text-sm text-[#A1A1AA] md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative transition duration-300 hover:text-white after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden rounded-full border border-white/[0.15] bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-300 hover:border-blue-400/50 hover:bg-white/[0.06] md:block"
        >
          Let&apos;s Talk
        </Link>

        {/* Mobile Button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.025] md:hidden"
        >
          <span
            className={`h-px w-5 bg-white transition ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />

          <span
            className={`h-px w-5 bg-white transition ${
              open ? "opacity-0" : ""
            }`}
          />

          <span
            className={`h-px w-5 bg-white transition ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 md:hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 px-6 py-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-[#A1A1AA] transition hover:bg-white/[0.06] hover:text-white"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-[#F5F5F5] px-6 py-3 text-center text-sm font-semibold text-black"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </nav>
  );
}

