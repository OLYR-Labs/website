"use client";

import { useEffect, useRef } from "react";

export default function ReactiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;

    if (!container || !glow) return;

    // Disable mouse tracking on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let frame = 0;

    const handleMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        glow.style.transform = `
          translate3d(
            ${x - 210}px,
            ${y - 210}px,
            0
          )
        `;
      });
    };

    const handleMouseLeave = () => {
      glow.style.transform =
        "translate3d(-50%, -50%, 0)";
    };

    container.addEventListener(
      "mousemove",
      handleMouseMove
    );

    container.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      cancelAnimationFrame(frame);

      container.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      container.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Main reactive glow */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.025] blur-[90px] transition-transform duration-700 ease-out will-change-transform sm:h-[500px] sm:w-[500px] sm:blur-[140px]"
      />

      {/* Ambient white light */}
      <div className="absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-white/[0.01] blur-[100px] sm:h-[550px] sm:w-[550px] sm:blur-[160px]" />

      {/* Blue atmosphere */}
      <div className="absolute -right-40 top-1/3 h-[280px] w-[280px] rounded-full bg-blue-500/[0.015] blur-[90px] sm:h-[400px] sm:w-[400px] sm:blur-[140px]" />

      {/* Floating particles */}
      <div className="absolute left-[20%] top-[30%] h-1 w-1 rounded-full bg-blue-400/[0.4] sm:animate-pulse" />

      <div className="absolute left-[70%] top-[25%] h-1 w-1 rounded-full bg-blue-400/[0.4] sm:animate-pulse" />

      <div className="absolute left-[80%] top-[65%] h-1 w-1 rounded-full bg-blue-400/[0.4] sm:animate-pulse" />

      <div className="absolute left-[35%] top-[75%] h-1 w-1 rounded-full bg-blue-400/[0.4] sm:animate-pulse" />
    </div>
  );
}