import Link from "next/link";

const legal = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cookie Policy", href: "/cookies" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer className="site-footer border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.06em]">
              OLYR<span className="text-[var(--accent)]">.</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--muted)]">
              Technology for what&apos;s next. We build websites, apps, software, ERP and POS systems, AI integrations, cybersecurity solutions, and business automation.
            </p>
            <a href="mailto:hello@olyrlabs.com" className="mt-6 inline-flex text-sm font-medium text-[var(--text)] transition hover:text-[var(--accent)]">
              hello@olyrlabs.com
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Explore</p>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              {[
                ["About", "/about"],
                ["Solutions", "/services"],
                ["Work", "/projects"],
                ["Contact", "/contact"],
                ["Request a Quote", "/quote"],
              ].map(([name, href]) => (
                <Link key={href} href={href} className="text-[var(--muted)] transition hover:text-[var(--text)]">{name}</Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Legal</p>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              {legal.map((item) => (
                <Link key={item.href} href={item.href} className="text-[var(--muted)] transition hover:text-[var(--text)]">{item.name}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--border)] pt-7 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OLYR Labs. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://github.com/OLYR-Labs" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)]">GitHub</a>
            <a href="https://instagram.com/olyrlabs" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)]">Instagram</a>
            <Link href="/admin/mail" className="hover:text-[var(--text)]">Internal Mail</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
