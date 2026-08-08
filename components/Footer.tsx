
import Link from "next/link";

export default function Footer() {
  const links = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/OLYR-Labs",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/olyrlabs",
    },
    {
      name: "X",
      href: "https://x.com/olyrlabs",
    },
    {
      name: "TikTok",
      href: "https://tiktok.com/@olyrlabs",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          -z-10
          h-72
          w-[600px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/10
          blur-[120px]
        "
      />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="
                group
                inline-flex
                items-center
                font-[var(--font-space-grotesk)]
                text-3xl
                font-semibold
                tracking-[-0.05em]
              "
            >
              <span className="transition duration-300 group-hover:text-white">
                OLYR
              </span>

              <span
                className="
                  text-blue-400
                  transition
                  duration-300
                  group-hover:text-blue-300
                "
              >
                .
              </span>
            </Link>

            <p
              className="
                mt-6
                max-w-sm
                text-sm
                leading-7
                text-[#71717A]
              "
            >
              Technology for what&apos;s next.
              Building intelligent software, secure
              infrastructure, and future-ready
              solutions for a digital world.
            </p>

            <div
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-2
                text-xs
                text-[#71717A]
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-blue-400
                  shadow-[0_0_12px_rgba(96,165,250,0.8)]
                "
              />

              Building the future
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Explore
            </h3>

            <div
              className="
                mt-6
                flex
                flex-col
                gap-4
                text-sm
                text-[#71717A]
              "
            >
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="
                    group
                    relative
                    w-fit
                    transition
                    hover:text-white
                  "
                >
                  {link.name}

                  <span
                    className="
                      absolute
                      -bottom-1
                      left-0
                      h-px
                      w-0
                      bg-blue-400
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Connect
            </h3>

            <div
              className="
                mt-6
                flex
                flex-col
                gap-4
                text-sm
                text-[#71717A]
              "
            >
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    transition
                    hover:text-white
                  "
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-16
            flex
            flex-col
            gap-4
            border-t
            border-white/10
            pt-8
            text-sm
            text-[#52525B]
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} OLYR Labs.
            All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <p>Technology for what&apos;s next.</p>

            {/* Internal Mail */}
            <div className="group relative">
              <Link
                href="/admin/mail"
                aria-label="OLYR Labs Internal Mail"
                className="
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-[#71717A]
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-blue-400/40
                  hover:bg-blue-400/10
                  hover:text-blue-300
                  hover:shadow-[0_0_24px_rgba(96,165,250,0.18)]
                  active:scale-95
                "
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                >
                  <path
                    d="M4 6.5C4 5.672 4.672 5 5.5 5h13c.828 0 1.5.672 1.5 1.5v11c0 .828-.672 1.5-1.5 1.5h-13C4.672 18 4 17.328 4 16.5v-10Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />

                  <path
                    d="m5 7 7 5 7-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Hover glow */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-full
                    bg-blue-400/10
                    opacity-0
                    blur-md
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />
              </Link>

              {/* Tooltip */}
              <span
                className="
                  pointer-events-none
                  absolute
                  bottom-full
                  right-0
                  mb-3
                  whitespace-nowrap
                  rounded-md
                  border
                  border-white/10
                  bg-[#0A0A0A]
                  px-3
                  py-1.5
                  text-[11px]
                  font-medium
                  text-white
                  opacity-0
                  shadow-xl
                  transition-all
                  duration-200
                  group-hover:-translate-y-1
                  group-hover:opacity-100
                "
              >
                Internal Mail
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

