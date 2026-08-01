"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";


const values = [
  {
    number: "01",
    title: "Build with Purpose",
    description:
      "Technology should solve meaningful problems. We focus on building solutions that create measurable value for the people and businesses we work with.",
  },
  {
    number: "02",
    title: "Security by Design",
    description:
      "Security is not something added at the end. We believe secure thinking should be part of the foundation of every digital solution.",
  },
  {
    number: "03",
    title: "Think Beyond Today",
    description:
      "The best technology is built for change. We design with scalability, adaptability, and long-term possibilities in mind.",
  },
  {
    number: "04",
    title: "Stay Curious",
    description:
      "Technology evolves every day. We continuously learn, experiment, and explore new ideas to discover what comes next.",
  },
];


const capabilities = [
  "Artificial Intelligence",
  "Software Development",
  "Cloud Infrastructure",
  "Cybersecurity",
];


export default function AboutPage() {


return (

<main className="min-h-screen bg-[#050505] text-[#F5F5F5]">


{/* Hero */}

<section className="relative overflow-hidden border-b border-white/10 pt-20">


<div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />


<div className="absolute right-[-10%] top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />


<div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">


<Reveal>


<p className="mb-8 text-sm uppercase tracking-[0.25em] text-blue-400">
About OLYR Labs
</p>



<h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">

Building technology

<br />

<span className="text-[#A1A1AA]">
for what's next.
</span>

</h1>



<p className="mt-10 max-w-2xl text-lg leading-8 text-[#A1A1AA] sm:text-xl">

OLYR Labs is a technology company focused on creating innovative
solutions that help individuals and businesses grow, improve, and
stay secure in an increasingly digital world.

</p>


</Reveal>


</div>


</section>





{/* Who We Are */}


<section className="border-b border-white/10 py-32">


<div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">


<Reveal>

<p className="text-sm uppercase tracking-[0.25em] text-blue-400">
Who We Are
</p>

</Reveal>



<Reveal delay={150}>


<div className="space-y-8">


<h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">

We believe technology should make things better.

</h2>



<div className="space-y-6 text-lg leading-8 text-[#A1A1AA]">

<p>
OLYR Labs was created with a simple idea: technology should not
exist just for the sake of technology. It should solve problems,
create opportunities, and help people and businesses move forward.
</p>


<p>
We explore the intersection of artificial intelligence,
software, cloud infrastructure, and cybersecurity to create
solutions for an increasingly connected world.
</p>


<p>
We are building OLYR Labs with a long-term vision. Starting
small, learning continuously, and developing the capabilities
needed to grow into a global technology organization.
</p>


</div>


</div>


</Reveal>


</div>


</section>







{/* Capabilities */}


<section className="border-b border-white/10 py-32">


<div className="mx-auto max-w-7xl px-6 lg:px-8">


<Reveal>


<div className="mb-20 max-w-2xl">


<p className="mb-6 text-sm uppercase tracking-[0.25em] text-blue-400">
What We Explore
</p>


<h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
Four areas shaping our journey.
</h2>


</div>


</Reveal>





<div className="grid border-l border-t border-white/10 sm:grid-cols-2">


{capabilities.map((item,index)=>(


<Reveal
key={item}
delay={index*100}
>


<div
className="
group
border-b
border-r
border-white/10
p-8
transition
duration-500
hover:bg-white/[0.03]
sm:p-12
"
>


<div className="mb-20 text-sm text-[#52525B]">
0{index+1}
</div>


<h3 className="text-2xl font-semibold">
{item}
</h3>


<div className="mt-6 h-px w-0 bg-blue-400 transition-all duration-500 group-hover:w-16" />


</div>


</Reveal>


))}


</div>


</div>


</section>







{/* Values */}


<section className="border-b border-white/10 py-32">


<div className="mx-auto max-w-7xl px-6 lg:px-8">


<Reveal>


<div className="mb-20 max-w-2xl">

<p className="mb-6 text-sm uppercase tracking-[0.25em] text-blue-400">
Our Principles
</p>


<h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
How we approach technology.
</h2>


</div>


</Reveal>





<div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">


{values.map((value,index)=>(


<Reveal
key={value.number}
delay={index*120}
>


<div className="bg-[#050505] p-8 transition hover:bg-white/[0.03] sm:p-12">


<div className="mb-16 text-sm text-[#52525B]">
{value.number}
</div>


<h3 className="text-2xl font-semibold">
{value.title}
</h3>


<p className="mt-5 max-w-md leading-7 text-[#A1A1AA]">
{value.description}
</p>


</div>


</Reveal>


))}


</div>


</div>


</section>







{/* Vision */}


<section className="border-b border-white/10 py-40">


<Reveal>


<div className="mx-auto max-w-7xl px-6 lg:px-8">


<p className="mb-8 text-sm uppercase tracking-[0.25em] text-blue-400">
Our Vision
</p>



<h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">

To build technology that earns trust, creates opportunity,
and helps shape a better digital future.

</h2>


</div>


</Reveal>


</section>








{/* CTA */}


<section className="py-40">


<Reveal>


<div className="mx-auto max-w-7xl px-6 text-center lg:px-8">


<p className="mb-6 text-sm uppercase tracking-[0.25em] text-blue-400">
Work With Us
</p>



<h2 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
Let's build what's next.
</h2>



<p className="mx-auto mt-8 max-w-xl text-lg text-[#A1A1AA]">
Have an idea, challenge, or problem worth solving?
We'd love to explore what's possible.
</p>



<Link
href="/contact"
className="mt-10 inline-flex rounded-full bg-[#F5F5F5] px-8 py-4 text-sm font-semibold text-black transition hover:bg-white"
>

Start a Conversation →

</Link>


</div>


</Reveal>


</section>


</main>

);

}