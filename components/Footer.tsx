import Link from "next/link";

export default function Footer() {
  const links = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Insights", href: "/insights" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505]">


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

              <span className="
              text-blue-400
              transition
              duration-300
              group-hover:text-blue-300
              ">
                .
              </span>

            </Link>



            <p className="
            mt-6
            max-w-sm
            text-sm
            leading-7
            text-[#71717A]
            ">

              Technology for what's next.
              Building intelligent software,
              secure infrastructure, and future-ready
              solutions for a digital world.

            </p>



            <div className="
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
            ">

              <span className="
              h-2
              w-2
              rounded-full
              bg-blue-400
              shadow-[0_0_12px_rgba(96,165,250,0.8)]
              " />

              Building the future

            </div>


          </div>






          {/* Explore */}

          <div>

            <h3 className="text-sm font-semibold text-white">
              Explore
            </h3>


            <div className="
            mt-6
            flex
            flex-col
            gap-4
            text-sm
            text-[#71717A]
            ">


              {links.map((link)=>(
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



            <div className="
            mt-6
            flex
            flex-col
            gap-4
            text-sm
            text-[#71717A]
            ">


              <a
                href="https://github.com/OLYR-Labs"
                target="_blank"
                rel="noopener noreferrer"
                className="
                transition
                hover:text-white
                "
              >
                GitHub
              </a>



              <a
                href="#"
                className="
                transition
                hover:text-white
                "
              >
                Instagram
              </a>



              <a
                href="#"
                className="
                transition
                hover:text-white
                "
              >
                X
              </a>



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
            © {new Date().getFullYear()} OLYR Labs. All rights reserved.
          </p>


          <p>
            Technology for what's next.
          </p>


        </div>


      </div>


    </footer>
  );
}