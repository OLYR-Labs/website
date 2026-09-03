import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { rateLimit, rateLimitedResponse } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);
const SESSION_COOKIE = "olyr_internal_mail_session";
const MAX_FILES = 10;
const MAX_TOTAL_SIZE = 25 * 1024 * 1024;
const MAX_REQUEST_SIZE = 30 * 1024 * 1024;
const MAX_RECIPIENTS = 10;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 100_000;
const SEND_LIMIT = 20;
const SEND_WINDOW_MS = 10 * 60 * 1000;
const BLOCKED_EXTENSIONS = new Set([".exe", ".dll", ".bat", ".cmd", ".com", ".scr", ".msi", ".vbs", ".vbe", ".js", ".jse", ".ws", ".wsf", ".wsc", ".wsh", ".ps1", ".psm1", ".psd1", ".jar", ".hta", ".cpl", ".sh", ".bash", ".zsh", ".apk", ".appx", ".deb", ".rpm"]);

function readCookie(request: Request, name: string) {
  return request.headers.get("cookie")?.split(";").map((value) => value.trim()).find((value) => value.startsWith(`${name}=`))?.slice(name.length + 1) || "";
}
function isAuthenticated(request: Request) {
  const secret = process.env.ADMIN_MAIL_SESSION_SECRET;
  const token = readCookie(request, SESSION_COOKIE);
  if (!secret || secret.length < 32 || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [issuedAt, nonce, signature] = parts;
  if (!/^\d+$/.test(issuedAt) || !/^[a-f0-9]{64}$/i.test(nonce) || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  const issued = Number(issuedAt);
  const now = Math.floor(Date.now() / 1000);
  if (!Number.isSafeInteger(issued) || issued > now + 60 || now - issued > 60 * 60 * 8) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${issuedAt}.${nonce}`).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"));
}
function escapeHtml(value: string) { return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;"); }
function getExtension(filename: string) { const lastDot = filename.lastIndexOf("."); return lastDot === -1 ? "" : filename.slice(lastDot).toLowerCase(); }
function sanitizeFilename(filename: string) { return filename.replace(/[^\w.\-() ]/g, "_").replace(/\.{2,}/g, ".").slice(0, 180) || "attachment"; }
function parseRecipients(value: string) {
  const recipients = value.split(/[;,]/).map((item) => item.trim()).filter(Boolean);
  if (recipients.length === 0 || recipients.length > MAX_RECIPIENTS) return null;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (recipients.some((email) => email.length > 254 || !emailPattern.test(email))) return null;
  return [...new Set(recipients.map((email) => email.toLowerCase()))];
}

export async function POST(request: Request) {
  try {
    const limit = rateLimit(request, "internal-mail-send", SEND_LIMIT, SEND_WINDOW_MS);
    if (!limit.allowed) return rateLimitedResponse(limit.retryAfter);
    if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401, headers: { "Cache-Control": "no-store" } });
    const contentLength = request.headers.get("content-length");
    if (contentLength && Number.isFinite(Number(contentLength)) && Number(contentLength) > MAX_REQUEST_SIZE) return NextResponse.json({ error: "Request is too large." }, { status: 413, headers: { "Cache-Control": "no-store" } });
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("multipart/form-data")) return NextResponse.json({ error: "Invalid request format." }, { status: 415, headers: { "Cache-Control": "no-store" } });
    const formData = await request.formData();
    const to = formData.get("to");
    const subject = formData.get("subject");
    const message = formData.get("message");
    if (typeof to !== "string" || typeof subject !== "string" || typeof message !== "string") return NextResponse.json({ error: "Invalid email data." }, { status: 400 });
    const recipients = parseRecipients(to);
    if (!recipients || !subject.trim() || !message.trim() || subject.length > MAX_SUBJECT_LENGTH || message.length > MAX_MESSAGE_LENGTH) return NextResponse.json({ error: "Invalid email data." }, { status: 400 });
    const attachmentEntries = formData.getAll("attachments");
    const files = attachmentEntries.filter((entry): entry is File => entry instanceof File && entry.size > 0);
    if (files.length > MAX_FILES) return NextResponse.json({ error: `A maximum of ${MAX_FILES} attachments is allowed.` }, { status: 400 });
    const totalSize = files.reduce((total, file) => total + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) return NextResponse.json({ error: "Total attachment size cannot exceed 25 MB." }, { status: 400 });
    for (const file of files) if (file.name.length > 255 || BLOCKED_EXTENSIONS.has(getExtension(file.name))) return NextResponse.json({ error: "One or more attachments are not allowed." }, { status: 400 });
    const attachments = await Promise.all(files.map(async (file) => ({ filename: sanitizeFilename(file.name), content: Buffer.from(await file.arrayBuffer()).toString("base64") })));
    const emailResponse = await resend.emails.send({ from: "OLYR Labs <hello@olyrlabs.com>", to: recipients, subject: subject.trim(), html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:700px;margin:0 auto;color:#111;line-height:1.7">${escapeHtml(message).replace(/\n/g, "<br />")}</div>`, ...(attachments.length > 0 ? { attachments } : {}) });
    if (emailResponse.error) {
      console.error("Internal mail Resend error:", emailResponse.error);
      return NextResponse.json({ error: "Failed to send the email." }, { status: 500, headers: { "Cache-Control": "no-store" } });
    }
    return NextResponse.json({ success: true, message: "Email sent successfully.", id: emailResponse.data?.id, attachmentCount: attachments.length }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Internal mail error:", error);
    return NextResponse.json({ error: "Something went wrong while sending the email." }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
