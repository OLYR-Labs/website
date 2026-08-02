"use client";

import { MouseEvent, useState } from "react";
import Link from "next/link";

type NodeType = {
id: number;
label: string;
x: string;
y: string;
animation: string;
};

const nodes: NodeType[] = [
{
id: 1,
label: "WEBSITES",
x: "18%",
y: "22%",
animation: "animate-[floatNode1_7s_ease-in-out_infinite]",
},
{
id: 2,
label: "AI SYSTEMS",
x: "72%",
y: "20%",
animation: "animate-[floatNode2_9s_ease-in-out_infinite]",
},
{
id: 3,
label: "CLOUD",
x: "82%",
y: "65%",
animation: "animate-[floatNode3_8s_ease-in-out_infinite]",
},
{
id: 4,
label: "SECURITY",
x: "22%",
y: "72%",
animation: "animate-[floatNode4_10s_ease-in-out_infinite]",
},
{
id: 5,
label: "SOFTWARE",
x: "50%",
y: "15%",
animation: "animate-pulse",
},
];

export default function ProjectShowcase() {
const [position, setPosition] = useState({
x: 50,
y: 50,
});

const [rotation, setRotation] = useState({
x: 0,
y: 0,
});

const [hoveredNode, setHoveredNode] = useState<number | null>(null);

const handleMouseMove = (
event: MouseEvent<HTMLDivElement>
) => {
const rect = event.currentTarget.getBoundingClientRect();


const x =
  ((event.clientX - rect.left) / rect.width) * 100;

const y =
  ((event.clientY - rect.top) / rect.height) * 100;

setPosition({
  x,
  y,
});

setRotation({
  x: ((y - 50) / 50) * -2.5,
  y: ((x - 50) / 50) * 2.5,
});


};

const handleMouseLeave = () => {
setPosition({
x: 50,
y: 50,
});


setRotation({
  x: 0,
  y: 0,
});

setHoveredNode(null);


};

return (
<div
onMouseMove={handleMouseMove}
onMouseLeave={handleMouseLeave}
className="group relative min-h-[430px] overflow-hidden rounded-[1.65rem] border border-white/[0.14] bg-black/40 transition-transform duration-300 ease-out sm:min-h-[500px] sm:rounded-[2.4rem]"
style={{
transform: `           perspective(1200px)
          rotateX(${rotation.x}deg)
          rotateY(${rotation.y}deg)
        `,
}}
>
{/* Glass reflection */}


  <div className="pointer-events-none absolute inset-0 z-30 rounded-[1.65rem] bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_25%,transparent_70%,rgba(96,165,250,0.02))] sm:rounded-[2.4rem]" />

  {/* Mouse glow */}

  <div
    className="pointer-events-none absolute h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[130px] transition-[left,top] duration-700 ease-out sm:h-[500px] sm:w-[500px] sm:blur-[150px]"
    style={{
      left: `${position.x}%`,
      top: `${position.y}%`,
    }}
  />

  {/* Floating nodes */}

  <div className="absolute inset-0 z-40">
    {nodes.map((node) => {
      const isHovered = hoveredNode === node.id;

      return (
        <div
          key={node.id}
          className="absolute"
          style={{
            left: node.x,
            top: node.y,
          }}
        >
          <button
            type="button"
            aria-label={`Explore ${node.label}`}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={(event) => event.stopPropagation()}
            className="group/node relative flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] backdrop-blur-xl transition-all duration-500 sm:h-16 sm:w-16"
          >
            {/* Outer glow */}

            <span
              className={`pointer-events-none absolute inset-0 rounded-full bg-blue-500/10 blur-xl transition-all duration-500 ${
                isHovered
                  ? "scale-[2] opacity-100"
                  : "scale-100 opacity-40"
              }`}
            />

            {/* Glass reflection */}

            <span className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_45%,rgba(59,130,246,0.03))]" />

            {/* Node core */}

            <span
              className={`relative z-10 block h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.9)] transition-all duration-500 sm:h-2 sm:w-2 ${node.animation} ${
                isHovered
                  ? "scale-[2.5] bg-white shadow-[0_0_35px_rgba(96,165,250,1)]"
                  : ""
              }`}
            />

            {/* Label */}

            <span
              className={`pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[8px] font-medium tracking-[0.2em] text-white shadow-[0_15px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 sm:mt-4 sm:px-4 sm:py-2 sm:text-[9px] ${
                isHovered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              {node.label}
            </span>
          </button>
        </div>
      );
    })}
  </div>

  {/* Connection lines */}

  <svg
    className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <line
      x1="18%"
      y1="22%"
      x2="50%"
      y2="15%"
      stroke="#3b82f6"
      strokeWidth="1"
      className={
        hoveredNode === 1 || hoveredNode === 5
          ? "opacity-80"
          : "opacity-20"
      }
    />

    <line
      x1="50%"
      y1="15%"
      x2="72%"
      y2="20%"
      stroke="#3b82f6"
      strokeWidth="1"
      className={
        hoveredNode === 2 || hoveredNode === 5
          ? "opacity-80"
          : "opacity-20"
      }
    />

    <line
      x1="72%"
      y1="20%"
      x2="82%"
      y2="65%"
      stroke="#3b82f6"
      strokeWidth="1"
      className={
        hoveredNode === 2 || hoveredNode === 3
          ? "opacity-80"
          : "opacity-20"
      }
    />

    <line
      x1="82%"
      y1="65%"
      x2="22%"
      y2="72%"
      stroke="#3b82f6"
      strokeWidth="1"
      className={
        hoveredNode === 3 || hoveredNode === 4
          ? "opacity-80"
          : "opacity-20"
      }
    />

    <line
      x1="22%"
      y1="72%"
      x2="18%"
      y2="22%"
      stroke="#3b82f6"
      strokeWidth="1"
      className={
        hoveredNode === 4 || hoveredNode === 1
          ? "opacity-80"
          : "opacity-20"
      }
    />
  </svg>

  {/* Clickable content */}

  <Link
    href="/projects"
    aria-label="Explore OLYR Labs projects and case studies"
    className="absolute inset-0 z-50 flex min-h-[430px] flex-col justify-between p-6 sm:min-h-[500px] sm:p-12"
  >
    {/* Top */}

    <div className="flex items-center justify-between">
      <span className="text-[9px] uppercase tracking-[0.3em] text-[#71717A] sm:text-xs">
        OLYR / PROJECTS
      </span>

      <span className="text-xs text-[#52525B] sm:text-sm">
        001
      </span>
    </div>

    {/* Main */}

    <div>
      <p className="text-[9px] uppercase tracking-[0.3em] text-blue-400 sm:text-xs">
        Featured Project
      </p>

      <h3 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.05em] transition duration-500 group-hover:translate-x-2 sm:mt-6 sm:text-7xl">
        Explore what we&apos;re building.
      </h3>
    </div>

    {/* Bottom */}

    <div className="flex items-center justify-between border-t border-white/10 pt-5 sm:pt-6">
      <span className="text-xs text-[#71717A] sm:text-sm">
        Projects &amp; Case Studies
      </span>

      <span className="glass-button flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 group-hover:translate-x-1 group-hover:border-blue-400 group-hover:text-blue-400 sm:h-12 sm:w-12">
        →
      </span>
    </div>
  </Link>
</div>


);
}
