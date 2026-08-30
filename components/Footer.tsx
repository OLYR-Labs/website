import Image from "next/image";
import Link from "next/link";

const explore = [
  ["Solutions", "/services"],
  ["ERP Systems", "/services#erp"],
  ["POS Systems", "/services#pos"],
  ["Work", "/projects"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

const socials = [
  ["GitHub", "https://github.com/OLYR-Labs"],
  ["Instagram", "https://instagram.com/olyrlabs"],
  ["X", "https://x.com/olyrlabs"],
  ["TikTok", "https://tiktok.com/@olyrlabs"],
] as const;

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_.6fr_.6fr]">
          <div>
            <Link href="/" className="inline-flex" aria-label="OLYR Labs home"><Image src="/olyrlabslogo.png" alt="OLYR Labs" width={140} height={50} className="brand-logo" /></Link>
            <p className="mt-6 max-w-md text-base leading-7 text-[var(--text-secondary)]">We design and build the digital systems that help businesses operate better, sell more and scale with confidence.</p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-xs font-semibold text-[var(--text-muted)]"><span className="h-2 w-2 rounded-full bg-[var(--blue)]" />Technology for what&apos;s next.</div>
          </div>
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[var(--text-muted)]">Explore</p><div className="mt-5 flex flex-col gap-3">{explore.map(([name, href]) => <Link key={name} href={href} className="w-fit text-sm text-[var(--text-secondary)] transition hover:translate-x-1 hover:text-[var(--blue)]">{name}</Link>)}</div></div>
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[var(--text-muted)]">Connect</p><div className="mt-5 flex flex-col gap-3">{socials.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="w-fit text-sm text-[var(--text-secondary)] transition hover:translate-x-1 hover:text-[var(--blue)]">{name} ↗</a>)}<Link href="/admin/mail" className="mt-3 w-fit text-sm font-semibold text-[var(--blue)]">Internal Mail ↗</Link></div></div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--border)] pt-7 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} OLYR Labs. All rights reserved.</p><p>Built in Sri Lanka · Built for growth.</p></div>
      </div>
    </footer>
  );
}
