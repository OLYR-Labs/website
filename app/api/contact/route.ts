import { NextResponse } from "next/server";
import { Resend } from "resend";
import { cleanText, hasOversizedBody, isValidEmail } from "@/lib/input-validation";
import { rateLimit, rateLimitedResponse } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const limit = rateLimit(request, "contact", RATE_LIMIT, RATE_WINDOW_MS);
    if (!limit.allowed) return rateLimitedResponse(limit.retryAfter);
    if (hasOversizedBody(request)) return NextResponse.json({ error: "Request is too large." }, { status: 413, headers: { "Cache-Control": "no-store" } });
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return NextResponse.json({ error: "Invalid request format." }, { status: 415, headers: { "Cache-Control": "no-store" } });
    const body = await request.json();
    const name = cleanText(body?.name, 120);
    const email = cleanText(body?.email, 254).toLowerCase();
    const company = cleanText(body?.company, 160);
    const message = cleanText(body?.message, 6000);
    if (!name || !email || !message) return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    if (message.length < 3) return NextResponse.json({ error: "Please provide a little more detail." }, { status: 400 });
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
    }
    const result = await resend.emails.send({ from: "OLYR Labs <contact@olyrlabs.com>", to: ["olyrlabs@gmail.com"], replyTo: email, subject: `New message from ${name}`, text: [`Name: ${name}`, `Email: ${email}`, `Company: ${company || "Not provided"}`, "", "Message:", message].join("\n") });
    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: "Email sent successfully." }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Something went wrong while sending the message." }, { status: 500 });
  }
}
