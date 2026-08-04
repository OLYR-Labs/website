import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      company,
      phone,
      service,
      project_type,
      description,
      budget,
      timeline,
      requirements,
    } = body;


    if (!name || !email || !service || !description) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }


    // Save quote request to Supabase
    const { error: supabaseError } = await supabase
      .from("quote_requests")
      .insert([
        {
          name,
          email,
          company,
          phone,
          service,
          project_type,
          description,
          budget,
          timeline,
          requirements,
          status: "New",
        },
      ]);


    if (supabaseError) {
      console.error("Supabase error:", supabaseError);

      return NextResponse.json(
        {
          error: "Database submission failed",
          details: supabaseError.message,
        },
        {
          status: 500,
        }
      );
    }



    // Send notification email to OLYR Labs
    const { error: adminEmailError } = await resend.emails.send({
      from: "OLYR Labs <hello@olyrlabs.com>",
      to: "olyrlabs@gmail.com",
      subject: `New Quote Request - ${service}`,
      html: `

      <div style="font-family: Arial, sans-serif; max-width:700px; margin:auto;">

        <h1>New OLYR Labs Quote Request</h1>

        <p>
        A new quotation request has been submitted.
        </p>


        <h2>Client Information</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Company:</strong> ${company || "Not provided"}</p>

        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>



        <h2>Project Information</h2>

        <p><strong>Service:</strong> ${service}</p>

        <p><strong>Project Type:</strong> ${project_type || "Not provided"}</p>

        <p><strong>Budget:</strong> ${budget || "Not provided"}</p>

        <p><strong>Timeline:</strong> ${timeline || "Not provided"}</p>



        <h2>Description</h2>

        <p>${description}</p>


        <h2>Requirements</h2>

        <p>${requirements || "Not provided"}</p>


      </div>

      `,
    });



    if (adminEmailError) {
      console.error("Admin email error:", adminEmailError);

      return NextResponse.json(
        {
          error: "Quote saved, but admin email failed",
        },
        {
          status: 500,
        }
      );
    }




    // Send confirmation email to client
    const { error: clientEmailError } = await resend.emails.send({

      from: "OLYR Labs <hello@olyrlabs.com>",

      to: email,

      subject:
        "Your OLYR Labs Project Request Has Been Received",

      html: `

      <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#111;">


        <h1>
        Thank you for contacting OLYR Labs
        </h1>


        <p>
        Hello ${name},
        </p>


        <p>
        We have successfully received your project request.
        Our team will review your requirements and contact you regarding the next steps.
        </p>



        <hr />



        <h2>
        Request Summary
        </h2>


        <p>
        <strong>Service:</strong>
        ${service}
        </p>


        <p>
        <strong>Project Type:</strong>
        ${project_type || "Not provided"}
        </p>


        <p>
        <strong>Budget:</strong>
        ${budget || "Not provided"}
        </p>


        <p>
        <strong>Timeline:</strong>
        ${timeline || "Not provided"}
        </p>



        <hr />


        <p>
        We appreciate your interest in OLYR Labs.
        We will get back to you as soon as possible.
        </p>


        <p>
        Regards,<br/>
        OLYR Labs
        </p>


      </div>

      `,
    });



    if (clientEmailError) {
      console.error("Client email error:", clientEmailError);
    }



    return NextResponse.json(
      {
        success: true,
        message: "Quote request submitted successfully",
      },
      {
        status: 200,
      }
    );



  } catch (error) {

    console.error("Quote API error:", error);


    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );

  }
}