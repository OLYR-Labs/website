import Link from "next/link";

const legal = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cookie Policy", href: "/cookies" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer className="site-footer border-t border-white/10 bg-[#07090d] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-[-0.06em]">OLYR<span className="text-blue-400">.</span></Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">Websites, apps, software, ERP/POS, AI, cybersecurity, and business automation.</p>
            <a href="mailto:hello@olyrlabs.com" className="mt-6 inline-flex text-sm font-medium text-white transition hover:text-blue-400">hello@olyrlabs.com</a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Explore</p>
            <div className="mt-5 flex flex-col gap-3 text-sm">{[["About","/about"],["Solutions","/services"],["Work","/projects"],["Contact","/contact"],["Request a Quote","/quote"]].map(([name,href])=><Link key={href} href={href} className="text-white/55 transition hover:text-white">{name}</Link>)}</div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Legal</p>
            <div className="mt-5 flex flex-col gap-3 text-sm">{legal.map((item)=><Link key={item.href} href={item.href} className="text-white/55 transition hover:text-white">{item.name}</Link>)}</div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OLYR Labs. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4"><a href="https://github.com/OLYR-Labs" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a><a href="https://instagram.com/olyrlabs" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a><Link href="/admin/mail" className="hover:text-white">Internal Mail</Link></div>
        </div>
      </div>
    </footer>
  );
}
