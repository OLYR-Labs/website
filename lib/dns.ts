// lib/security/dns.ts

import dns from "dns/promises";


export async function analyzeDNS(domain: string) {

  const result = {

    score: 100,

    records: {

      A: [] as string[],

      MX: [] as string[],

      TXT: [] as string[],

      NS: [] as string[],

    },


    emailSecurity: {

      SPF: false,

      DMARC: false,

    },


    findings: [] as {
      title:string;
      severity:string;
      description:string;
    }[],

  };



  try {


    // A RECORD

    try {

      result.records.A =
        await dns.resolve4(domain);

    } catch {}




    // MX RECORD

    try {

      const mx =
        await dns.resolveMx(domain);


      result.records.MX =
        mx.map(
          item => item.exchange
        );


    } catch {}





    // TXT RECORD

    try {


      const txt =
        await dns.resolveTxt(domain);



      result.records.TXT =
        txt.flat();


      const txtJoined =
        result.records.TXT.join(" ");



      if(
        txtJoined.includes(
          "v=spf1"
        )
      ){

        result.emailSecurity.SPF = true;

      }



    } catch {}





    // DMARC

    try {


      const dmarc =
        await dns.resolveTxt(
          `_dmarc.${domain}`
        );


      const dmarcText =
        dmarc.flat().join(" ");



      if(
        dmarcText.includes(
          "v=DMARC1"
        )
      ){

        result.emailSecurity.DMARC = true;

      }


    } catch {}





    // NAMESERVERS

    try {

      result.records.NS =
        await dns.resolveNs(domain);


    } catch {}







    // SECURITY SCORING


    if(!result.emailSecurity.SPF){

      result.score -= 15;


      result.findings.push({

        title:
        "Missing SPF Record",

        severity:
        "Medium",

        description:
        "Domain does not publish an SPF email authentication policy.",

      });

    }





    if(!result.emailSecurity.DMARC){

      result.score -= 20;


      result.findings.push({

        title:
        "Missing DMARC Protection",

        severity:
        "Medium",

        description:
        "Domain does not have a DMARC policy configured.",

      });

    }





  } catch(error){


    result.score = 40;


    result.findings.push({

      title:
      "DNS Analysis Failed",

      severity:
      "High",

      description:
      "Unable to analyze DNS configuration.",

    });


  }



  return result;


}