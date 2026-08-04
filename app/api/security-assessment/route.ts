import { NextResponse } from "next/server";

import { analyzeHeaders } from "@/lib/headers";
import { calculateSecurityScore } from "@/lib/scoring";
import { analyzeSSL } from "@/lib/ssl";
import { analyzeDomain } from "@/lib/domain";
import { analyzeTechnology } from "@/lib/technology";
import { analyzeDNS } from "@/lib/dns";




export async function POST(request: Request) {

  try {


    const { url } = await request.json();



    if (!url) {

      return NextResponse.json(
        {
          error: "Website URL is required",
        },
        {
          status:400,
        }
      );

    }





    const target =
      url.startsWith("http")
      ? url
      : `https://${url}`;





    const hostname =
      new URL(target).hostname;






    /*
      SSL INTELLIGENCE
    */

    const sslAnalysis =
      await analyzeSSL(target);







    /*
      DOMAIN INTELLIGENCE
    */

    const domainAnalysis =
      await analyzeDomain(hostname);







    /*
      DNS INTELLIGENCE
    */

    const dnsAnalysis =
      await analyzeDNS(hostname);









    /*
      WEBSITE FETCH
    */

    const response =
      await fetch(
        target,
        {

          method:"GET",

          headers:{
            "User-Agent":
            "OLYR-SecureScan-Enterprise",
          },

        }
      );





    const html =
      await response.text();








    /*
      HEADER SECURITY
    */

    const headerAnalysis =
      analyzeHeaders(
        response.headers
      );









    /*
      TECHNOLOGY INTELLIGENCE
    */

    const technologyAnalysis =
      analyzeTechnology(
        response.headers,
        html
      );









    /*
      SECURITY SCORING
    */


    const httpsScore =
      target.startsWith("https")
      ? 100
      : 40;





    const sslScore =
      sslAnalysis.valid

      ? sslAnalysis.daysRemaining > 30
        ? 100
        : 70

      : 20;





    const technologyScore =
      technologyAnalysis.technologies.length > 0
      ? 90
      : 60;





    const websiteScore =
      calculateSecurityScore([

        httpsScore,

        headerAnalysis.score,

        sslScore,

        domainAnalysis.score,

        dnsAnalysis.score,

        technologyScore,

      ]);









    /*
      SECURITY FINDINGS
    */


    const findings = [

      ...headerAnalysis.findings,

      ...dnsAnalysis.findings,

    ];






    if (!sslAnalysis.valid) {


      findings.push({

        title:
        "SSL Certificate",

        severity:
        "High",

        description:
        "Unable to verify SSL certificate.",

      });


    }








    if (
      sslAnalysis.valid &&
      sslAnalysis.daysRemaining < 30
    ) {


      findings.push({

        title:
        "SSL Certificate Expiration",

        severity:
        "Medium",

        description:
        `Certificate expires in ${sslAnalysis.daysRemaining} days.`,

      });


    }








    if (!domainAnalysis.emailSecurity.SPF) {


      findings.push({

        title:
        "Missing SPF Record",

        severity:
        "Medium",

        description:
        "Domain does not have SPF email protection configured.",

      });


    }









    if (!domainAnalysis.emailSecurity.DMARC) {


      findings.push({

        title:
        "Missing DMARC Protection",

        severity:
        "Medium",

        description:
        "Domain does not have DMARC email authentication configured.",

      });


    }









    return NextResponse.json({

      target,




      overview: {

        overallScore:
        websiteScore,


        grade:

          websiteScore >= 90
          ? "Excellent"

          : websiteScore >=75
          ? "Good"

          : websiteScore >=50
          ? "Needs Improvement"

          : "Critical",

      },








      categories: {


        websiteSecurity:
        websiteScore,



        infrastructure:
        sslAnalysis.valid
        ? 90
        : 40,



        domainSecurity:
        domainAnalysis.score,



        technology:
        technologyScore,



        dns:
        dnsAnalysis.score,


      },








      ssl:
      sslAnalysis,







      domain:
      domainAnalysis,








      dns:
      dnsAnalysis,







      technology:
      technologyAnalysis,








      findings,








      checks: {


        https:
        target.startsWith("https"),



        status:
        response.status,


      },


    });





  } catch(error) {


    console.error(
      "Security Assessment Error:",
      error
    );



    return NextResponse.json(

      {
        error:
        "Security assessment failed.",
      },

      {
        status:500,
      }

    );


  }

}