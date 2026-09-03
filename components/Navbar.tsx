"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Solutions", href: "/services" },
  { name: "Work", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

const phone = "+94781026353";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav fixed inset-x-0 top-0 z-[9999] px-3 pt-3 sm:px-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[var(--border)] bg-[var(--nav-bg)] px-3 py-2 shadow-[0_12px_40px_var(--nav-shadow)] backdrop-blur-xl sm:px-4">
        <Link href="/" onClick={() => setOpen(false)} className="relative flex items-center px-2" aria-label="OLYR Labs home">
          <Image src="/olyrlabslogo.png" alt="OLYR Labs" width={140} height={50} className="site-logo h-auto w-[104px] object-contain sm:w-[116px]" priority />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="nav-link text-sm font-medium">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a href={`tel:${phone}`} className="call-button inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5 hover:bg-[var(--accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Call us
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)]">
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 top-1 h-px w-5 bg-[var(--text)] transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute left-0 top-2.5 h-px w-5 bg-[var(--text)] transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-4 h-px w-5 bg-[var(--text)] transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <div className={`mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--nav-bg)] shadow-[0_18px_50px_var(--nav-shadow)] backdrop-blur-xl transition-all duration-300 md:hidden ${open ? "max-h-[520px] opacity-100" : "max-h-0 border-transparent opacity-0"}`}>
        <div className="p-4">
          {links.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setOpen(false)} className="mobile-nav-link block rounded-2xl px-4 py-3.5 text-base font-medium">
              {link.name}
            </Link>
          ))}
          <a href={`tel:${phone}`} onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center rounded-2xl bg-[var(--text)] px-4 py-3.5 text-sm font-semibold text-[var(--background)]">
            Call +94 78 102 6353
          </a>
        </div>
      </div>
    </header>
  );
}
