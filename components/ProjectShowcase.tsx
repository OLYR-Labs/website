"use client";

import {
MouseEvent,
useState,
} from "react";

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
const rect =
event.currentTarget.getBoundingClientRect();


const x =
  ((event.clientX - rect.left) /
    rect.width) *
  100;

const y =
  ((event.clientY - rect.top) /
    rect.height) *
  100;

setPosition({
  x,
  y,
});

setRotation({
  x:
    ((y - 50) / 50) *
    -2.5,

  y:
    ((x - 50) / 50) *
    2.5,
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
className="
group
relative
min-h-[500px]
overflow-hidden
rounded-[2.4rem]
border
border-white/[0.14]
bg-black/40
transition-transform
duration-300
ease-out
"
style={{
transform: `           perspective(1200px)
          rotateX(${rotation.x}deg)
          rotateY(${rotation.y}deg)
        `,
}}
>
{/* ===================================================== */}
{/* GLASS REFLECTION */}
{/* ===================================================== */}

```
  <div
    className="
      pointer-events-none
      absolute
      inset-0
      z-30
      rounded-[2.4rem]
      bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_25%,transparent_70%,rgba(96,165,250,0.02))]
    "
  />

  {/* ===================================================== */}
  {/* BACKGROUND GRID */}
  {/* ===================================================== */}

  <div
    className="
      pointer-events-none
      absolute
      inset-[-50px]
      opacity-30
      animate-[gridMove_20s_linear_infinite]
      bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]
      bg-[size:60px_60px]
    "
  />

  {/* ===================================================== */}
  {/* MOUSE GLOW */}
  {/* ===================================================== */}

  <div
    className="
      pointer-events-none
      absolute
      h-[500px]
      w-[500px]
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-blue-600/10
      blur-[150px]
      transition-[left,top]
      duration-700
      ease-out
    "
    style={{
      left: `${position.x}%`,
      top: `${position.y}%`,
    }}
  />

  {/* ===================================================== */}
  {/* FLOATING NODES */}
  {/* ===================================================== */}

  <div className="absolute inset-0 z-40">
    {nodes.map((node) => {
      const isHovered =
        hoveredNode === node.id;

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
            aria-label={node.label}
            onMouseEnter={() =>
              setHoveredNode(node.id)
            }
            onMouseLeave={() =>
              setHoveredNode(null)
            }
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              group/node
              relative
              flex
              h-16
              w-16
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.025]
              backdrop-blur-xl
              transition-all
              duration-500
            "
          >
            {/* Outer glow */}

            <span
              className={`
                pointer-events-none
                absolute
                inset-0
                rounded-full
                bg-blue-500/10
                blur-xl
                transition-all
                duration-500
                ${
                  isHovered
                    ? "scale-[2] opacity-100"
                    : "scale-100 opacity-40"
                }
              `}
            />

            {/* Glass reflection */}

            <span
              className="
                pointer-events-none
                absolute
                inset-[1px]
                rounded-full
                bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_45%,rgba(59,130,246,0.03))]
              "
            />

            {/* Node core */}

            <span
              className={`
                relative
                z-10
                block
                h-2
                w-2
                rounded-full
                bg-blue-400
                shadow-[0_0_20px_rgba(59,130,246,0.9)]
                transition-all
                duration-500
                ${node.animation}
                ${
                  isHovered
                    ? "scale-[2.5] bg-white shadow-[0_0_35px_rgba(96,165,250,1)]"
                    : ""
                }
              `}
            />

            {/* Label */}

            <span
              className={`
                pointer-events-none
                absolute
                left-1/2
                top-full
                mt-4
                -translate-x-1/2
                whitespace-nowrap
                rounded-full
                border
                border-white/15
                bg-black/50
                px-4
                py-2
                text-[9px]
                font-medium
                tracking-[0.2em]
                text-white
                shadow-[0_15px_50px_rgba(0,0,0,0.5)]
                backdrop-blur-2xl
                transition-all
                duration-300
                ${
                  isHovered
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }
              `}
            >
              {node.label}
            </span>
          </button>
        </div>
      );
    })}
  </div>

  {/* ===================================================== */}
  {/* CONNECTION LINES */}
  {/* ===================================================== */}

  <svg
    className="
      pointer-events-none
      absolute
      inset-0
      z-10
      h-full
      w-full
    "
    preserveAspectRatio="none"
  >
    <line
      x1="18%"
      y1="22%"
      x2="50%"
      y2="15%"
      stroke="#3b82f6"
      strokeWidth="1"
      className={
        hoveredNode === 1 ||
        hoveredNode === 5
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
        hoveredNode === 2 ||
        hoveredNode === 5
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
        hoveredNode === 2 ||
        hoveredNode === 3
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
        hoveredNode === 3 ||
        hoveredNode === 4
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
        hoveredNode === 4 ||
        hoveredNode === 1
          ? "opacity-80"
          : "opacity-20"
      }
    />
  </svg>

  {/* ===================================================== */}
  {/* CLICKABLE CONTENT */}
  {/* ===================================================== */}

  <Link
    href="/projects"
    aria-label="Explore OLYR Labs projects and case studies"
    className="
      absolute
      inset-0
      z-50
      flex
      min-h-[500px]
      flex-col
      justify-between
      p-8
      sm:p-12
    "
  >
    {/* Top */}

    <div className="flex items-center justify-between">
      <span
        className="
          text-xs
          uppercase
          tracking-[0.3em]
          text-[#71717A]
        "
      >
        OLYR / PROJECTS
      </span>

      <span
        className="
          text-sm
          text-[#52525B]
        "
      >
        001
      </span>
    </div>

    {/* Main */}

    <div>
      <p
        className="
          text-xs
          uppercase
          tracking-[0.3em]
          text-blue-400
        "
      >
        Featured Project
      </p>

      <h3
        className="
          mt-6
          max-w-3xl
          text-5xl
          font-semibold
          tracking-[-0.05em]
          transition
          duration-500
          group-hover:translate-x-2
          sm:text-7xl
        "
      >
        Explore what we&apos;re building.
      </h3>
    </div>

    {/* Bottom */}

    <div
      className="
        flex
        items-center
        justify-between
        border-t
        border-white/10
        pt-6
      "
    >
      <span
        className="
          text-sm
          text-[#71717A]
        "
      >
        Projects & Case Studies
      </span>

      {/* REAL CLICKABLE ARROW */}

      <span
        className="
          glass-button
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          text-white
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:border-blue-400
          group-hover:text-blue-400
        "
      >
        →
      </span>
    </div>
  </Link>
</div>


);
}
