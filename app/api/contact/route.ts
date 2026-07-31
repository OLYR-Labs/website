import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
try {
const body = await request.json();


const name = body.name;
const email = body.email;
const company = body.company || "";
const message = body.message;

if (!name || !email || !message) {
  return NextResponse.json(
    {
      error: "Name, email, and message are required.",
    },
    {
      status: 400,
    }
  );
}

if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not configured.");

  return NextResponse.json(
    {
      error: "Email service is not configured.",
    },
    {
      status: 500,
    }
  );
}

const result = await resend.emails.send({
  from: "OLYR Labs <onboarding@resend.dev>",
  to: ["olyrlabs@gmail.com"],
  replyTo: email,
  subject: `New message from ${name}`,
  text: [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    "",
    "Message:",
    message,
  ].join("\n"),
});

if (result.error) {
  console.error("Resend error:", result.error);

  return NextResponse.json(
    {
      error: "Failed to send email.",
    },
    {
      status: 500,
    }
  );
}

return NextResponse.json(
  {
    success: true,
    message: "Email sent successfully.",
  },
  {
    status: 200,
  }
);


} catch (error) {
console.error("Contact API error:", error);


return NextResponse.json(
  {
    error: "Something went wrong while sending the message.",
  },
  {
    status: 500,
  }
);


}
}
