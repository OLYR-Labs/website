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
      const rect = container.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const moveX = x - rect.width / 2;
      const moveY = y - rect.height / 2;

      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        glow.style.transform = `
          translate3d(
            calc(-50% + ${moveX * 0.08}px),
            calc(-50% + ${moveY * 0.08}px),
            0
          )
        `;
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(frame);

      glow.style.transform =
        "translate3d(-50%, -50%, 0)";
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Interactive glow */}
      <div
        ref={glowRef}
        className="
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/[0.035]
          blur-[120px]
          will-change-transform
        "
      />

      {/* Neutral ambient light */}
      <div
        className="
          absolute
          left-1/2
          top-1/3
          h-[450px]
          w-[450px]
          -translate-x-1/2
          rounded-full
          bg-white/[0.012]
          blur-[130px]
          will-change-transform
        "
      />

      {/* Blue atmosphere */}
      <div
        className="
          absolute
          -right-40
          top-1/3
          h-[350px]
          w-[350px]
          rounded-full
          bg-blue-500/[0.025]
          blur-[120px]
          will-change-transform
        "
      />

      {/* Floating particles */}
      <div className="absolute left-[20%] top-[30%] h-1 w-1 animate-pulse rounded-full bg-blue-400/[0.55] shadow-[0_0_12px_rgba(59,130,246,0.35)]" />

      <div className="absolute left-[70%] top-[25%] h-1 w-1 animate-pulse rounded-full bg-blue-400/[0.55] shadow-[0_0_12px_rgba(59,130,246,0.35)] [animation-delay:1s]" />

      <div className="absolute left-[80%] top-[65%] h-1 w-1 animate-pulse rounded-full bg-blue-400/[0.55] shadow-[0_0_12px_rgba(59,130,246,0.35)] [animation-delay:2s]" />

      <div className="absolute left-[35%] top-[75%] h-1 w-1 animate-pulse rounded-full bg-blue-400/[0.55] shadow-[0_0_12px_rgba(59,130,246,0.35)] [animation-delay:3s]" />
    </div>
  );
}