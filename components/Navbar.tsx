"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Insights", href: "/insights" },
    { name: "SecureScan", href: "/secure-scan" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050505]/70 backdrop-blur-xl animate-nav">

      {/* Static ambient glow */}
      <div className="
        pointer-events-none
        absolute
        left-1/2
        top-0
        -z-10
        h-32
        w-[500px]
        -translate-x-1/2
        rounded-full
        bg-blue-500/10
        blur-3xl
      " />


      {/* Bottom glow line */}
      <div className="
        pointer-events-none
        absolute
        bottom-0
        left-0
        h-px
        w-full
        bg-gradient-to-r
        from-transparent
        via-blue-400/40
        to-transparent
      " />


      <div className="
        mx-auto
        flex
        h-20
        max-w-7xl
        items-center
        justify-between
        px-6
        lg:px-8
      ">


        {/* Logo */}

        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="
          group
          relative
          flex
          items-center
          "
        >

          <div className="
            absolute
            inset-0
            rounded-full
            bg-blue-400/20
            opacity-0
            blur-xl
            transition
            duration-500
            group-hover:opacity-100
          " />


          <Image
            src="/olyrlabslogo.png"
            alt="OLYR Labs"
            width={140}
            height={50}
            className="
            relative
            h-auto
            w-[120px]
            object-contain
            transition
            duration-500
            group-hover:scale-105
            "
            priority
          />

        </Link>





        {/* Desktop Links */}

        <div className="
          hidden
          items-center
          gap-10
          text-sm
          text-[#A1A1AA]
          md:flex
        ">

          {links.map((link)=>(
            <Link
              key={link.name}
              href={link.href}
              className="
              relative
              transition
              duration-300
              hover:text-white
              after:absolute
              after:-bottom-2
              after:left-0
              after:h-px
              after:w-0
              after:bg-blue-400
              after:transition-all
              after:duration-300
              hover:after:w-full
              "
            >
              {link.name}
            </Link>
          ))}

        </div>






        {/* CTA */}

        <Link
          href="/contact"
          className="
          hidden
          rounded-full
          border
          border-white/20
          px-5
          py-2.5
          text-sm
          font-medium
          transition
          duration-300
          hover:border-blue-400/50
          hover:bg-white
          hover:text-black
          md:block
          "
        >

          Let's Talk

        </Link>






        {/* Mobile Button */}

        <button
          onClick={()=>setOpen(!open)}
          className="
          flex
          h-10
          w-10
          flex-col
          items-center
          justify-center
          gap-1.5
          rounded-full
          border
          border-white/10
          md:hidden
          "
        >

          <span className={`
            h-px
            w-5
            bg-white
            transition
            ${open ? "translate-y-2 rotate-45" : ""}
          `}/>


          <span className={`
            h-px
            w-5
            bg-white
            transition
            ${open ? "opacity-0" : ""}
          `}/>


          <span className={`
            h-px
            w-5
            bg-white
            transition
            ${open ? "-translate-y-2 -rotate-45" : ""}
          `}/>


        </button>


      </div>





      {/* Mobile Menu */}

      <div
        className={`
        overflow-hidden
        border-t
        border-white/10
        transition-all
        duration-500
        md:hidden
        ${
          open
          ? "max-h-[500px] opacity-100"
          : "max-h-0 opacity-0"
        }
        `}
      >

        <div className="space-y-2 px-6 py-8">


          {links.map((link)=>(
            <Link
              key={link.name}
              href={link.href}
              onClick={()=>setOpen(false)}
              className="
              block
              rounded-lg
              px-4
              py-3
              text-[#A1A1AA]
              transition
              hover:bg-white/5
              hover:text-white
              "
            >
              {link.name}
            </Link>
          ))}



          <Link
            href="/contact"
            onClick={()=>setOpen(false)}
            className="
            mt-4
            block
            rounded-full
            bg-[#F5F5F5]
            px-6
            py-3
            text-center
            text-sm
            font-semibold
            text-black
            "
          >
            Let's Talk
          </Link>


        </div>

      </div>


    </nav>
  );
}