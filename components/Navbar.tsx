"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/services" },
  { name: "Work", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (!open) setHidden(y > lastY && y > 120);
      if (y < 32) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""} ${hidden ? "is-hidden" : ""}`}>
      <div className="site-nav-inner">
        <Link href="/" onClick={() => setOpen(false)} className="brand-mark" aria-label="OLYR Labs home">
          <Image src="/olyrlabslogo.png" alt="OLYR Labs" width={140} height={50} priority className="brand-logo" />
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="nav-link">{link.name}</Link>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <Link href="/quote" className="nav-cta">Start a project <span aria-hidden="true">↗</span></Link>
        </div>

        <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(v => !v)} className="mobile-menu-button">
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-menu ${open ? "is-open" : ""}`}>
        {links.map((link) => <Link key={link.name} href={link.href} onClick={() => setOpen(false)} className="mobile-link">{link.name}</Link>)}
        <div className="mobile-menu-bottom"><ThemeToggle /><Link href="/quote" onClick={() => setOpen(false)} className="mobile-cta">Start a project <span aria-hidden="true">↗</span></Link></div>
      </div>
    </header>
  );
}
