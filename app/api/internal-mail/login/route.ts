import { NextResponse } from "next/server";
import crypto from "crypto";
import { rateLimit, rateLimitedResponse } from "@/lib/rate-limit";

const SESSION_COOKIE = "olyr_internal_mail_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

function createSessionToken() {
  const secret = process.env.ADMIN_MAIL_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("ADMIN_MAIL_SESSION_SECRET is not configured or is too short.");
  const issuedAt = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomBytes(32).toString("hex");
  const payload = `${issuedAt}.${nonce}`;
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

export async function POST(request: Request) {
  try {
    const limit = rateLimit(request, "internal-mail-login", LOGIN_LIMIT, LOGIN_WINDOW_MS);
    if (!limit.allowed) return rateLimitedResponse(limit.retryAfter);
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return NextResponse.json({ error: "Invalid request format." }, { status: 415, headers: { "Cache-Control": "no-store" } });
    const body = await request.json();
    const password = body?.password;
    if (typeof password !== "string" || password.length === 0 || password.length > 512) return NextResponse.json({ error: "Invalid credentials." }, { status: 401, headers: { "Cache-Control": "no-store" } });
    const adminPassword = process.env.ADMIN_MAIL_PASSWORD;
    if (!adminPassword) {
      console.error("ADMIN_MAIL_PASSWORD is not configured.");
      return NextResponse.json({ error: "Internal mail system is not configured." }, { status: 500, headers: { "Cache-Control": "no-store" } });
    }
    const passwordBuffer = Buffer.from(password);
    const adminPasswordBuffer = Buffer.from(adminPassword);
    const passwordsMatch = passwordBuffer.length === adminPasswordBuffer.length && crypto.timingSafeEqual(passwordBuffer, adminPasswordBuffer);
    if (!passwordsMatch) return NextResponse.json({ error: "Invalid credentials." }, { status: 401, headers: { "Cache-Control": "no-store" } });
    const response = NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set(SESSION_COOKIE, createSessionToken(), { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: SESSION_TTL_SECONDS });
    return response;
  } catch (error) {
    console.error("Internal mail login error:", error);
    return NextResponse.json({ error: "Unable to authenticate." }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
