import QuoteForm from "@/components/QuoteForm";


export default function QuotePage(){

return (

<main className="min-h-screen bg-[#050505] text-[#F5F5F5]">


<section className="border-b border-white/10 pt-20">


<div className="mx-auto max-w-7xl px-6 py-32">


<p className="text-sm uppercase tracking-[0.25em] text-blue-400">
Request Quote
</p>


<h1 className="mt-8 text-5xl font-semibold sm:text-7xl">

Build something
<br />

<span className="text-[#A1A1AA]">
with OLYR Labs.
</span>

</h1>


<p className="mt-8 max-w-2xl text-lg text-[#A1A1AA]">

Tell us about your project.
We will analyze your requirements
and prepare a custom solution.

</p>


</div>

</section>



<section className="py-24">

<div className="mx-auto max-w-5xl px-6">

<QuoteForm />

</div>

</section>


</main>

);

}