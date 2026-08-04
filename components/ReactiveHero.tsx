"use client";

import { useEffect, useRef } from "react";

export default function ReactiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;

    if (!container || !glow) return;

    let frame = 0;

    const handleMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        glow.style.transform = `
          translate3d(
            ${x - 250}px,
            ${y - 250}px,
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
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-blue-500/[0.025] blur-[110px] transition-transform duration-700 ease-out will-change-transform"
      />

      <div className="absolute left-1/2 top-1/3 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-white/[0.01] blur-[140px]" />

      <div className="absolute -right-40 top-1/3 h-[350px] w-[350px] rounded-full bg-blue-500/[0.015] blur-[120px]" />

      <div className="absolute left-[20%] top-[30%] h-1 w-1 rounded-full bg-blue-400/[0.4]" />

      <div className="absolute left-[70%] top-[25%] h-1 w-1 rounded-full bg-blue-400/[0.4]" />

      <div className="absolute left-[80%] top-[65%] h-1 w-1 rounded-full bg-blue-400/[0.4]" />
    </div>
  );
}