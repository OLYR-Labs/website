import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import { cleanText, escapeHtml, hasOversizedBody, isValidEmail } from "@/lib/input-validation";
import { rateLimit, rateLimitedResponse } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const limit = rateLimit(request, "quote", RATE_LIMIT, RATE_WINDOW_MS);
    if (!limit.allowed) return rateLimitedResponse(limit.retryAfter);
    if (hasOversizedBody(request)) return NextResponse.json({ error: "Request is too large." }, { status: 413, headers: { "Cache-Control": "no-store" } });
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return NextResponse.json({ error: "Invalid request format." }, { status: 415, headers: { "Cache-Control": "no-store" } });

    const body = await request.json();
    const name = cleanText(body?.name, 120);
    const email = cleanText(body?.email, 254).toLowerCase();
    const company = cleanText(body?.company, 160);
    const phone = cleanText(body?.phone, 40);
    const service = cleanText(body?.service, 120);
    const projectType = cleanText(body?.project_type, 120);
    const description = cleanText(body?.description, 6000);
    const budget = cleanText(body?.budget, 120);
    const timeline = cleanText(body?.timeline, 120);
    const requirements = cleanText(body?.requirements, 6000);
    if (!name || !email || !service || !description) return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    if (description.length < 10) return NextResponse.json({ error: "Please provide more detail about the project." }, { status: 400 });

    const { error: supabaseError } = await supabase.from("quote_requests").insert([{ name, email, company, phone, service, project_type: projectType, description, budget, timeline, requirements, status: "New" }]);
    if (supabaseError) {
      console.error("Supabase error:", supabaseError);
      return NextResponse.json({ error: "Database submission failed." }, { status: 500 });
    }

    const adminEmailError = (await resend.emails.send({
      from: "OLYR Labs <hello@olyrlabs.com>", to: "olyrlabs@gmail.com", subject: `New Quote Request - ${service}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#111;line-height:1.7"><h1>New OLYR Labs Quote Request</h1><p>A new quotation request has been submitted.</p><h2>Client Information</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p><p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p><h2>Project Information</h2><p><strong>Service:</strong> ${escapeHtml(service)}</p><p><strong>Project Type:</strong> ${escapeHtml(projectType || "Not provided")}</p><p><strong>Budget:</strong> ${escapeHtml(budget || "Not provided")}</p><p><strong>Timeline:</strong> ${escapeHtml(timeline || "Not provided")}</p><h2>Description</h2><p>${escapeHtml(description).replace(/\n/g, "<br />")}</p><h2>Requirements</h2><p>${escapeHtml(requirements || "Not provided").replace(/\n/g, "<br />")}</p></div>`,
    })).error;
    if (adminEmailError) {
      console.error("Admin email error:", adminEmailError);
      return NextResponse.json({ error: "Quote saved, but admin email failed." }, { status: 500 });
    }

    const clientEmailError = (await resend.emails.send({
      from: "OLYR Labs <hello@olyrlabs.com>", to: email, subject: "Your OLYR Labs Project Request Has Been Received",
      html: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#111;line-height:1.7"><h1>Thank you for contacting OLYR Labs</h1><p>Hello ${escapeHtml(name)},</p><p>We have successfully received your project request. Our team will review your requirements and contact you regarding the next steps.</p><hr /><h2>Request Summary</h2><p><strong>Service:</strong> ${escapeHtml(service)}</p><p><strong>Project Type:</strong> ${escapeHtml(projectType || "Not provided")}</p><p><strong>Budget:</strong> ${escapeHtml(budget || "Not provided")}</p><p><strong>Timeline:</strong> ${escapeHtml(timeline || "Not provided")}</p><hr /><p>We appreciate your interest in OLYR Labs. We will get back to you as soon as possible.</p><p>Regards,<br />OLYR Labs</p></div>`,
    })).error;
    if (clientEmailError) console.error("Client email error:", clientEmailError);
    return NextResponse.json({ success: true, message: "Quote request submitted successfully" }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
