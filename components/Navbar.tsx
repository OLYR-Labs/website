import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/olyrlabslogo.png"
            alt="OLYR Labs"
            width={140}
            height={50}
            className="h-auto w-[120px] object-contain"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 text-sm text-[#A1A1AA] md:flex">
          <Link href="/about" className="transition hover:text-white">
            About
          </Link>

          <Link href="/services" className="transition hover:text-white">
            Services
          </Link>

          <Link href="/projects" className="transition hover:text-white">
            Projects
          </Link>

          <Link href="/insights" className="transition hover:text-white">
            Insights
          </Link>

          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
        </div>

        <Link
          href="/contact"
          className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition hover:border-white/50 hover:bg-white hover:text-black"
        >
          Let's Talk
        </Link>
      </div>
    </nav>
  );
}