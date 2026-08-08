import { NextResponse } from "next/server";
import crypto from "crypto";

function createSessionToken() {
  const secret = process.env.ADMIN_MAIL_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      "ADMIN_MAIL_SESSION_SECRET is not configured."
    );
  }

  return crypto
    .createHmac("sha256", secret)
    .update("olyr-internal-mail-session")
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const password = body?.password;

    if (
      !password ||
      typeof password !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Password is required.",
        },
        {
          status: 400,
        }
      );
    }

    const adminPassword =
      process.env.ADMIN_MAIL_PASSWORD;

    if (!adminPassword) {
      console.error(
        "ADMIN_MAIL_PASSWORD is not configured."
      );

      return NextResponse.json(
        {
          error: "Internal mail system is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const passwordBuffer = Buffer.from(password);
    const adminPasswordBuffer =
      Buffer.from(adminPassword);

    const passwordsMatch =
      passwordBuffer.length ===
        adminPasswordBuffer.length &&
      crypto.timingSafeEqual(
        passwordBuffer,
        adminPasswordBuffer
      );

    if (!passwordsMatch) {
      return NextResponse.json(
        {
          error: "Incorrect password.",
        },
        {
          status: 401,
        }
      );
    }

    const sessionToken = createSessionToken();

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set(
      "olyr_internal_mail_session",
      sessionToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 8,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Internal mail login error:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to authenticate.",
      },
      {
        status: 500,
      }
    );
  }
}