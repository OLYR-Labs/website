"use client";

import { useEffect, useRef } from "react";

export default function ReactiveHero() {
const containerRef = useRef<HTMLDivElement>(null);
const glowRef = useRef<HTMLDivElement>(null);

useEffect(() => {
const container = containerRef.current;
const glow = glowRef.current;


if (!container || !glow) return;

const handleMouseMove = (event: MouseEvent) => {
  const rect = container.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const percentX = (x / rect.width) * 100;
  const percentY = (y / rect.height) * 100;

  glow.style.left = `${percentX}%`;
  glow.style.top = `${percentY}%`;
};

const handleMouseLeave = () => {
  glow.style.left = "50%";
  glow.style.top = "50%";
};

container.addEventListener("mousemove", handleMouseMove);
container.addEventListener("mouseleave", handleMouseLeave);

return () => {
  container.removeEventListener("mousemove", handleMouseMove);
  container.removeEventListener("mouseleave", handleMouseLeave);
};


}, []);

return ( <div
   ref={containerRef}
   className="pointer-events-none absolute inset-0 overflow-hidden"
 >
{/* Very subtle interactive blue atmosphere */} <div
     ref={glowRef}
     className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.022] blur-[180px] transition-[left,top] duration-1000 ease-out"
   />


  {/* Neutral central atmosphere */}
  <div className="absolute left-1/2 top-1/3 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-white/[0.01] blur-[200px]" />

  {/* Extremely subtle blue atmosphere */}
  <div className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/[0.015] blur-[180px]" />

  {/* Floating energy particles */}
  <div className="absolute left-[20%] top-[30%] h-1 w-1 animate-pulse rounded-full bg-blue-400/[0.4] shadow-[0_0_10px_rgba(59,130,246,0.25)]" />

  <div className="absolute left-[70%] top-[25%] h-1 w-1 animate-pulse rounded-full bg-blue-400/[0.4] shadow-[0_0_10px_rgba(59,130,246,0.25)] [animation-delay:1s]" />

  <div className="absolute left-[80%] top-[65%] h-1 w-1 animate-pulse rounded-full bg-blue-400/[0.4] shadow-[0_0_10px_rgba(59,130,246,0.25)] [animation-delay:2s]" />

  <div className="absolute left-[35%] top-[75%] h-1 w-1 animate-pulse rounded-full bg-blue-400/[0.4] shadow-[0_0_10px_rgba(59,130,246,0.25)] [animation-delay:3s]" />
</div>


);
}
