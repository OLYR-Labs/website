import tls from "tls";
import { URL } from "url";


type SSLAnalysis = {
  valid: boolean;
  issuer: string | null;
  expires: string | null;
  daysRemaining: number;
  risk: string;
};



export async function analyzeSSL(
  url: string
): Promise<SSLAnalysis> {


  return new Promise((resolve) => {


    try {


      const hostname =
        new URL(url).hostname;



      const socket =
        tls.connect(
          {
            host: hostname,
            port: 443,
            servername: hostname,
            rejectUnauthorized: false,
          },


          () => {


            const certificate =
              socket.getPeerCertificate();



            socket.end();




            if (!certificate || !certificate.valid_to) {


              resolve({

                valid:false,

                issuer:null,

                expires:null,

                daysRemaining:0,

                risk:"High",

              });


              return;

            }





            const expiry =
              new Date(
                certificate.valid_to
              );



            const now =
              new Date();



            const daysRemaining =
              Math.floor(

                (
                  expiry.getTime()
                  -
                  now.getTime()

                )
                /
                (
                  1000 *
                  60 *
                  60 *
                  24
                )

              );





            resolve({

              valid:true,

              issuer:
                certificate.issuer?.O ||
                certificate.issuer?.CN ||
                "Unknown",


              expires:
                expiry.toISOString(),


              daysRemaining,



              risk:

                daysRemaining < 30

                ? "Medium"

                : "Low",

            });


          }

        );





      socket.on(
        "error",
        () => {


          resolve({

            valid:false,

            issuer:null,

            expires:null,

            daysRemaining:0,

            risk:"High",

          });


        }
      );




    } catch {


      resolve({

        valid:false,

        issuer:null,

        expires:null,

        daysRemaining:0,

        risk:"High",

      });


    }


  });


}