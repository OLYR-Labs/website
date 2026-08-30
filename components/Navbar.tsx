"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <Link href="/" onClick={() => setOpen(false)} className="brand-mark" aria-label="OLYR Labs home">
          <Image src="/olyrlabslogo.png" alt="OLYR Labs" width={140} height={50} priority className="brand-logo" />
        </Link>

        <div className="nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="nav-link">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <ThemeToggle />
          <Link href="/quote" className="nav-cta">Start a project <span aria-hidden="true">↗</span></Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="mobile-menu-button"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-menu ${open ? "is-open" : ""}`}>
        {links.map((link) => (
          <Link key={link.name} href={link.href} onClick={() => setOpen(false)} className="mobile-link">
            {link.name}
          </Link>
        ))}
        <Link href="/quote" onClick={() => setOpen(false)} className="mobile-cta">Start a project <span aria-hidden="true">↗</span></Link>
      </div>
    </nav>
  );
}
