import { promises as dns } from "dns";

export type DomainAnalysis = {
  score: number;

  emailSecurity: {
    SPF: boolean;
    DMARC: boolean;
  };

  dns: {
    MX: boolean;
    TXT: boolean;
  };
};


function normalizeTXT(
  records: string[][]
) {
  return records
    .flat()
    .join(" ")
    .toLowerCase()
    .replace(/\s+/g, " ");
}



export async function analyzeDomain(
  hostname: string
): Promise<DomainAnalysis> {


  let mxRecords: any[] = [];

  let txtRecords: string[][] = [];

  let dmarcRecords: string[][] = [];



  /*
    MX RECORD CHECK
  */

  try {

    mxRecords =
      await dns.resolveMx(
        hostname
      );

  } catch {

    mxRecords = [];

  }





  /*
    ROOT TXT RECORD CHECK
  */

  try {

    txtRecords =
      await dns.resolveTxt(
        hostname
      );

  } catch {

    txtRecords = [];

  }






  /*
    DMARC RECORD CHECK
  */

  try {

    dmarcRecords =
      await dns.resolveTxt(
        `_dmarc.${hostname}`
      );

  } catch {

    dmarcRecords = [];

  }







  const txtContent =
    normalizeTXT(
      txtRecords
    );



  const dmarcContent =
    normalizeTXT(
      dmarcRecords
    );







  const hasSPF =
    txtContent.includes(
      "v=spf1"
    );



  const hasDMARC =
    dmarcContent.includes(
      "v=dmarc1"
    );







  let score = 100;



  /*
    DOMAIN REPUTATION SCORE
  */


  if (!mxRecords.length) {

    score -= 15;

  }



  if (!hasSPF) {

    score -= 25;

  }



  if (!hasDMARC) {

    score -= 25;

  }



  if (!txtRecords.length) {

    score -= 10;

  }



  score =
    Math.max(
      0,
      score
    );







  return {


    score,



    emailSecurity: {

      SPF:
        hasSPF,

      DMARC:
        hasDMARC,

    },



    dns: {

      MX:
        mxRecords.length > 0,


      TXT:
        txtRecords.length > 0,

    },


  };


}