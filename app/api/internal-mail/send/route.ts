import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

function createSessionToken() {
  const secret =
    process.env.ADMIN_MAIL_SESSION_SECRET;

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

function isAuthenticated(request: Request) {
  const cookieHeader =
    request.headers.get("cookie") || "";

  const sessionCookie =
    cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) =>
        cookie.startsWith(
          "olyr_internal_mail_session="
        )
      );

  if (!sessionCookie) {
    return false;
  }

  const token =
    sessionCookie.split("=")[1];

  const expectedToken =
    createSessionToken();

  if (
    !token ||
    token.length !== expectedToken.length
  ) {
    return false;
  }

  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(expectedToken)
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        {
          error: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const to = body?.to;
    const subject = body?.subject;
    const message = body?.message;

    if (
      typeof to !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Invalid email data.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !to.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Recipient, subject, and message are required.",
        },
        {
          status: 400,
        }
      );
    }

    const emailResponse =
      await resend.emails.send({
        from: "OLYR Labs <hello@olyrlabs.com>",
        to: to.trim(),
        subject: subject.trim(),
        html: `
          <div
            style="
              font-family: Arial, Helvetica, sans-serif;
              max-width: 700px;
              margin: 0 auto;
              color: #111111;
              line-height: 1.7;
            "
          >
            ${escapeHtml(message)
              .replace(/\n/g, "<br />")}
          </div>
        `,
      });

    if (emailResponse.error) {
      console.error(
        "Internal mail Resend error:",
        emailResponse.error
      );

      return NextResponse.json(
        {
          error:
            "Resend failed to send the email.",
          details:
            emailResponse.error.message,
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
        id: emailResponse.data?.id,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Internal mail error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while sending the email.",
      },
      {
        status: 500,
      }
    );
  }
}