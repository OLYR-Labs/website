"use client";

import { useState } from "react";

const services = [
  "Website Development",
  "Software Development",
  "E-Commerce Development",
  "AI Solutions",
  "Cybersecurity",
  "Cloud Solutions",
];


const websiteTypes = [
  "Starter Website",
  "Startup Business Website",
  "Corporate Website",
  "Premium Website",
];


const budgets = [
  "Below LKR 100,000",
  "LKR 100,000 - 300,000",
  "LKR 300,000 - 500,000",
  "LKR 500,000+",
];


export default function QuoteForm() {


  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);


  const [form, setForm] = useState({

    name: "",
    email: "",
    company: "",
    phone: "",

    service: "",

    project_type: "",

    description: "",

    budget: "",

    timeline: "",

    requirements: "",

  });



  function updateField(
    field: string,
    value: string
  ) {

    setForm((previous)=>({

      ...previous,

      [field]: value,

    }));

  }





  async function submitForm(
    e: React.FormEvent
  ) {

    e.preventDefault();


    setLoading(true);



    try {


      const response = await fetch(
        "/api/quote",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body:
            JSON.stringify(form),

        }
      );



      if(!response.ok){

        throw new Error(
          "Submission failed"
        );

      }



      setSubmitted(true);



    } catch(error){

      console.error(error);

      alert(
        "Something went wrong. Please try again."
      );


    } finally {

      setLoading(false);

    }


  }







  if(submitted){

    return (

      <div className="border border-white/10 bg-white/[0.03] p-12 text-center">


        <h2 className="text-3xl font-semibold">

          Request Received ✓

        </h2>


        <p className="mt-5 text-[#A1A1AA]">

          Thank you for contacting OLYR Labs.
          We will review your requirements
          and prepare a custom quotation.

        </p>


      </div>

    );

  }






  return (

<form
onSubmit={submitForm}
className="space-y-12"
>



<section>


<h2 className="text-2xl font-semibold">
Tell us about yourself
</h2>



<div className="mt-6 grid gap-5 md:grid-cols-2">


<input
required
placeholder="Your Name"
className="input"
onChange={(e)=>
updateField(
"name",
e.target.value
)}
/>



<input
required
placeholder="Email Address"
className="input"
onChange={(e)=>
updateField(
"email",
e.target.value
)}
/>


<input
placeholder="Company Name"
className="input"
onChange={(e)=>
updateField(
"company",
e.target.value
)}
/>



<input
placeholder="Phone Number"
className="input"
onChange={(e)=>
updateField(
"phone",
e.target.value
)}
/>


</div>

</section>







<section>


<h2 className="text-2xl font-semibold">
What do you need?
</h2>



<div className="mt-6 grid gap-4 md:grid-cols-2">


{services.map((service)=>(


<button

type="button"

key={service}

onClick={()=>
updateField(
"service",
service
)
}

className={`border p-5 text-left transition ${
form.service===service
?
"border-blue-400 bg-blue-400/10"
:
"border-white/10 hover:border-white/30"
}`}

>

{service}

</button>


))}


</div>


</section>







{
form.service === "Website Development" &&

<section>


<h2 className="text-2xl font-semibold">
Website Type
</h2>



<div className="mt-6 grid gap-4">


{websiteTypes.map((type)=>(

<button

type="button"

key={type}

onClick={()=>
updateField(
"project_type",
type
)
}

className={`border p-5 text-left ${
form.project_type===type
?
"border-blue-400 bg-blue-400/10"
:
"border-white/10"
}`}

>

{type}

</button>

))}


</div>


</section>

}








<section>


<h2 className="text-2xl font-semibold">
Project Details
</h2>


<textarea

required

placeholder="Describe what you want to build..."

className="input mt-6 min-h-40"

onChange={(e)=>
updateField(
"description",
e.target.value
)
}

/>



<textarea

placeholder="Features or requirements..."

className="input mt-5 min-h-32"

onChange={(e)=>
updateField(
"requirements",
e.target.value
)
}

/>


</section>








<section>


<h2 className="text-2xl font-semibold">
Budget
</h2>



<div className="mt-6 grid gap-4 md:grid-cols-2">


{budgets.map((budget)=>(


<button

type="button"

key={budget}

onClick={()=>
updateField(
"budget",
budget
)
}

className={`border p-5 text-left ${
form.budget===budget
?
"border-blue-400 bg-blue-400/10"
:
"border-white/10"
}`}

>

{budget}

</button>


))}


</div>


</section>







<button

disabled={loading}

className="
rounded-full
bg-white
px-10
py-4
font-semibold
text-black
"

>


{
loading
?
"Sending..."
:
"Request Quote →"
}


</button>



</form>

  );

}