"use client";

import { useEffect, useRef } from "react";

export default function ReactiveHero() {
const containerRef = useRef<HTMLDivElement>(null);
const glowRef = useRef<HTMLDivElement>(null);
const gridRef = useRef<HTMLDivElement>(null);

useEffect(() => {
const container = containerRef.current;
const glow = glowRef.current;
const grid = gridRef.current;

if (!container || !glow || !grid) return;

const handleMouseMove = (event: MouseEvent) => {
  const rect = container.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const percentX = (x / rect.width) * 100;
  const percentY = (y / rect.height) * 100;

  glow.style.left = `${percentX}%`;
  glow.style.top = `${percentY}%`;

  grid.style.transform = `
    translate(
      ${(percentX - 50) * 0.08}px,
      ${(percentY - 50) * 0.08}px
    )
  `;
};

const handleMouseLeave = () => {
  glow.style.left = "50%";
  glow.style.top = "50%";

  grid.style.transform = "translate(0px, 0px)";
};

container.addEventListener("mousemove", handleMouseMove);
container.addEventListener("mouseleave", handleMouseLeave);

return () => {
  container.removeEventListener("mousemove", handleMouseMove);
  container.removeEventListener("mouseleave", handleMouseLeave);
};

}, []);

return (
<div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" >
{/* Interactive blue energy */}
<div ref={glowRef} className="absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px] transition-[left,top] duration-700 ease-out" />

  {/* Moving grid */}
  <div
    ref={gridRef}
    className="absolute -inset-20 transition-transform duration-1000 ease-out"
  >
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px]" />
  </div>

  {/* Secondary ambient glow */}
  <div className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[140px]" />

  {/* Floating energy particles */}
  <div className="absolute left-[20%] top-[30%] h-1 w-1 animate-pulse rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.9)]" />

  <div className="absolute left-[70%] top-[25%] h-1 w-1 animate-pulse rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.9)] [animation-delay:1s]" />

  <div className="absolute left-[80%] top-[65%] h-1 w-1 animate-pulse rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.9)] [animation-delay:2s]" />

  <div className="absolute left-[35%] top-[75%] h-1 w-1 animate-pulse rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.9)] [animation-delay:3s]" />
</div>

);
}