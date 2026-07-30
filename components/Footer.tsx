import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold tracking-[-0.04em]"
            >
              OLYR<span className="text-blue-400">.</span>
            </Link>

            <p className="mt-5 max-w-sm leading-7 text-[#71717A]">
              Technology for what's next. Building intelligent software,
              secure infrastructure, and technology solutions for a digital
              world.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Explore</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-[#71717A]">
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
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Connect</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-[#71717A]">
              <a
                href="https://github.com/OLYR-Labs"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                GitHub
              </a>

              <a
                href="#"
                className="transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href="#"
                className="transition hover:text-white"
              >
                X
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-[#52525B] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} OLYR Labs. All rights reserved.
          </p>

          <p>Technology for what's next.</p>
        </div>
      </div>
    </footer>
  );
}