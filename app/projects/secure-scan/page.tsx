"use client";

import { useState } from "react";


type Assessment = {

  target: string;


  overview: {

    overallScore: number;

    grade: string;

  };


  categories: {

    websiteSecurity?: number;

    infrastructure?: number;

    domainSecurity?: number;

    technology?: number;

    vulnerabilities?: number;

  };


  ssl?: {

    valid?: boolean;

    issuer?: string | null;

    expires?: string | null;

    daysRemaining?: number;

    risk?: string;

  };


  domain?: {

    score?: number;

    emailSecurity?: {

      SPF?: boolean;

      DMARC?: boolean;

    };

  };


  technology?: {

    technologies?: string[];

    categories?: {

      frontend?: string[];

      backend?: string[];

      infrastructure?: string[];

    };

  };


  vulnerabilities?: {

    title: string;

    severity: string;

    description: string;

    recommendation?: string;

  }[];


  findings?: {

    title: string;

    severity: string;

    description: string;

  }[];


  checks?: {

    https?: boolean;

    status?: number;

  };

};



function safeArray<T>(value: T[] | undefined | null): T[] {

  return Array.isArray(value) ? value : [];

}




export default function SecureScanPage() {


  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [assessment, setAssessment] =
    useState<Assessment | null>(null);

  const [error, setError] = useState("");





  async function runAssessment() {


    if (!url) {

      setError("Please enter a website URL.");

      return;

    }


    setLoading(true);

    setAssessment(null);

    setError("");



    try {


      const response = await fetch(
        "/api/security-assessment",
        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            url,

          }),

        }
      );



      const data = await response.json();



      if (!response.ok) {

        throw new Error(
          data.error || "Assessment failed"
        );

      }



      setAssessment(data);



    } catch (error) {


      console.error(error);


      setError(
        "Unable to complete security assessment."
      );


    } finally {


      setLoading(false);


    }


  }





  return (

    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">



      {/* HERO */}

      <section className="border-b border-white/10 pt-20">


        <div className="mx-auto max-w-7xl px-6 py-32">


          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">

            OLYR SecureScan Enterprise

          </p>



          <h1 className="mt-8 text-5xl font-semibold tracking-tight sm:text-7xl">


            Digital Security


            <br />


            <span className="text-[#A1A1AA]">

              Intelligence Platform

            </span>


          </h1>




          <p className="mt-8 max-w-2xl text-lg text-[#A1A1AA]">


            Automated enterprise security assessment
            for websites, domains, infrastructure,
            technologies, and vulnerabilities.


          </p>


        </div>


      </section>






      {/* SCANNER INPUT */}


      <section className="py-24">


        <div className="mx-auto max-w-5xl px-6">


          <div className="border border-white/10 bg-white/[0.02] p-8">


            <p className="text-sm uppercase tracking-[0.2em] text-[#71717A]">

              Target Asset

            </p>




            <div className="mt-6 flex flex-col gap-4 sm:flex-row">


              <input


                value={url}


                onChange={(e)=>setUrl(e.target.value)}


                placeholder="company.com"


                className="
                flex-1
                border
                border-white/20
                bg-transparent
                px-5
                py-4
                outline-none
                focus:border-blue-400
                "


              />




              <button


                onClick={runAssessment}


                disabled={loading}


                className="
                rounded-full
                bg-white
                px-8
                py-4
                font-semibold
                text-black
                "


              >


                {loading
                  ? "Scanning..."
                  : "Start Assessment →"
                }


              </button>


            </div>





            {error && (

              <p className="mt-5 text-red-400">

                {error}

              </p>

            )}



          </div>


        </div>


      </section>
      {assessment && (

<section className="border-t border-white/10 py-24">


  <div className="mx-auto max-w-7xl space-y-10 px-6">





    {/* SCORE OVERVIEW */}


    <div className="grid gap-8 md:grid-cols-3">



      <div className="border border-white/10 p-10">


        <p className="text-sm uppercase tracking-[0.2em] text-[#71717A]">

          Security Score

        </p>



        <h2 className="mt-8 text-7xl font-semibold text-blue-400">

          {assessment.overview.overallScore}

        </h2>




        <p className="mt-4 text-[#A1A1AA]">

          {assessment.overview.grade}

        </p>


      </div>







      <div className="border border-white/10 p-10 md:col-span-2">


        <p className="text-sm uppercase tracking-[0.2em] text-[#71717A]">

          Target Asset

        </p>




        <p className="mt-6 break-all text-xl">

          {assessment.target}

        </p>





        <div className="mt-8 flex flex-wrap gap-8 text-sm">


          <span>

            HTTPS:

            {" "}

            {assessment.checks?.https

              ? "Enabled ✓"

              : "Missing ⚠"

            }

          </span>




          <span>

            Status:

            {" "}

            {assessment.checks?.status || "Unknown"}

          </span>


        </div>


      </div>



    </div>








    {/* CATEGORY SCORES */}



    <div className="grid gap-6 md:grid-cols-5">



      {Object.entries(
        assessment.categories || {}
      ).map(([name,value]) => (



        <div

          key={name}

          className="border border-white/10 p-6"

        >



          <p className="text-xs uppercase tracking-[0.2em] text-[#71717A]">

            {name}

          </p>




          <p className="mt-4 text-3xl font-semibold">

            {value ?? 0}

          </p>



        </div>



      ))}



    </div>









    {/* SSL INTELLIGENCE */}



    <div className="border border-white/10 p-8">



      <div className="flex items-center justify-between">


        <h2 className="text-xl font-semibold">

          SSL Intelligence

        </h2>




        <span

          className={`rounded-full px-4 py-1 text-xs ${

            assessment.ssl?.valid

            ? "bg-green-400/10 text-green-400"

            : "bg-red-400/10 text-red-400"

          }`}

        >


          {assessment.ssl?.valid

            ? "Secure"

            : "Risk"

          }


        </span>


      </div>







      <div className="mt-8 grid gap-8 md:grid-cols-3">





        <div>


          <p className="text-xs uppercase tracking-[0.2em] text-[#71717A]">

            Issuer

          </p>



          <p className="mt-3 text-lg">

            {assessment.ssl?.issuer || "Unknown"}

          </p>


        </div>







        <div>


          <p className="text-xs uppercase tracking-[0.2em] text-[#71717A]">

            Expiration

          </p>



          <p className="mt-3 text-lg">


            {assessment.ssl?.daysRemaining ?? 0}

            {" "}

            days


          </p>


        </div>








        <div>


          <p className="text-xs uppercase tracking-[0.2em] text-[#71717A]">

            Risk Level

          </p>



          <p className="mt-3 text-lg">


            {assessment.ssl?.risk || "Unknown"}


          </p>


        </div>





      </div>



    </div>
                {/* TECHNOLOGY INTELLIGENCE */}


                <div className="border border-white/10 p-8">


<h2 className="text-xl font-semibold">

  Technology Intelligence

</h2>



<p className="mt-2 text-sm text-[#71717A]">

  Detected frontend, backend, and infrastructure technologies.

</p>





<div className="mt-8 grid gap-8 md:grid-cols-3">



  {Object.entries(

    assessment.technology?.categories || {

      frontend: [],

      backend: [],

      infrastructure: [],

    }

  ).map(([category,items]) => (




    <div key={category}>


      <p className="text-xs uppercase tracking-[0.2em] text-[#71717A]">

        {category}

      </p>





      <div className="mt-4 flex flex-wrap gap-2">



        {safeArray(items).length > 0 ? (



          safeArray(items).map((item)=>(


            <span

              key={item}

              className="border border-white/10 px-3 py-2 text-sm"

            >

              {item}

            </span>



          ))



        ) : (



          <span className="text-sm text-[#71717A]">

            None detected

          </span>



        )}





      </div>



    </div>



  ))}





</div>




</div>












{/* DOMAIN INTELLIGENCE */}




<div className="border border-white/10 p-8">



<h2 className="text-xl font-semibold">

  Domain Intelligence

</h2>





<p className="mt-2 text-sm text-[#71717A]">

  Email security and domain reputation analysis.

</p>








<div className="mt-8 grid gap-8 md:grid-cols-3">






  <div>


    <p className="text-xs uppercase tracking-[0.2em] text-[#71717A]">

      Domain Score

    </p>




    <p className="mt-3 text-4xl font-semibold">


      {assessment.domain?.score ?? 0}



    </p>



  </div>







  <div>


    <p className="text-xs uppercase tracking-[0.2em] text-[#71717A]">

      SPF Protection

    </p>





    <p

      className={`mt-3 text-lg ${

        assessment.domain?.emailSecurity?.SPF

        ? "text-green-400"

        : "text-red-400"

      }`}

    >



      {assessment.domain?.emailSecurity?.SPF

        ? "Enabled ✓"

        : "Missing ⚠"

      }



    </p>




  </div>









  <div>


    <p className="text-xs uppercase tracking-[0.2em] text-[#71717A]">

      DMARC Protection

    </p>





    <p

      className={`mt-3 text-lg ${

        assessment.domain?.emailSecurity?.DMARC

        ? "text-green-400"

        : "text-red-400"

      }`}

    >



      {assessment.domain?.emailSecurity?.DMARC

        ? "Enabled ✓"

        : "Missing ⚠"

      }



    </p>




  </div>







</div>






</div>
            {/* VULNERABILITY INTELLIGENCE */}


            <div className="border border-white/10 p-8">


              <h2 className="text-xl font-semibold">

                Vulnerability Intelligence

              </h2>




              <p className="mt-2 text-sm text-[#71717A]">

                Security weaknesses discovered during assessment.

              </p>






              <div className="mt-8 space-y-5">



                {safeArray(
                  assessment.vulnerabilities
                ).length === 0 ? (



                  <div className="border border-white/10 p-6 text-green-400">


                    No vulnerabilities detected.


                  </div>




                ) : (



                  safeArray(
                    assessment.vulnerabilities
                  ).map((item)=>(



                    <div

                      key={item.title}

                      className="border border-white/10 p-6"

                    >




                      <div className="flex flex-col justify-between gap-3 sm:flex-row">


                        <h3 className="font-semibold">


                          {item.title}


                        </h3>




                        <span className="text-red-400">


                          {item.severity}


                        </span>



                      </div>





                      <p className="mt-4 text-[#A1A1AA]">


                        {item.description}


                      </p>





                      {item.recommendation && (


                        <p className="mt-4 text-sm text-blue-400">


                          Recommendation:

                          {" "}

                          {item.recommendation}


                        </p>


                      )}




                    </div>



                  ))



                )}



              </div>






            </div>









            {/* SECURITY FINDINGS */}



            <div>




              <h2 className="text-3xl font-semibold">

                Security Findings

              </h2>





              <div className="mt-8 space-y-4">





                {safeArray(
                  assessment.findings
                ).length === 0 ? (




                  <div className="border border-white/10 p-6 text-green-400">


                    No security findings detected.


                  </div>





                ) : (




                  safeArray(
                    assessment.findings
                  ).map((finding,index)=>(




                    <div

                    key={`${finding.title}-${finding.severity}-${index}`}

                      className="border border-white/10 p-6"

                    >





                      <div className="flex flex-col justify-between gap-3 sm:flex-row">



                        <h3 className="font-semibold">


                          {finding.title}


                        </h3>





                        <span className="text-red-400">


                          {finding.severity}


                        </span>




                      </div>





                      <p className="mt-3 text-[#A1A1AA]">


                        {finding.description}


                      </p>




                    </div>




                  ))



                )}






              </div>





            </div>








          </div>


        </section>


      )}



    </main>


  );


}