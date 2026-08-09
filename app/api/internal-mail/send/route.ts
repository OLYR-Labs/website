
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const MAX_FILES = 10;
const MAX_TOTAL_SIZE = 25 * 1024 * 1024;

const BLOCKED_EXTENSIONS = new Set([
  ".exe",
  ".dll",
  ".bat",
  ".cmd",
  ".com",
  ".scr",
  ".msi",
  ".vbs",
  ".vbe",
  ".js",
  ".jse",
  ".ws",
  ".wsf",
  ".wsc",
  ".wsh",
  ".ps1",
  ".psm1",
  ".psd1",
  ".jar",
  ".hta",
  ".cpl",
]);

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

  const sessionCookie = cookieHeader
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

function getExtension(filename: string) {
  const lastDot = filename.lastIndexOf(".");

  if (lastDot === -1) {
    return "";
  }

  return filename
    .slice(lastDot)
    .toLowerCase();
}

function sanitizeFilename(filename: string) {
  return filename
    .replace(/[^\w.\-() ]/g, "_")
    .slice(0, 180);
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

    const formData =
      await request.formData();

    const to = formData.get("to");
    const subject =
      formData.get("subject");
    const message =
      formData.get("message");

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

    const attachmentEntries =
      formData.getAll("attachments");

    const files = attachmentEntries.filter(
      (entry): entry is File =>
        entry instanceof File &&
        entry.size > 0
    );

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        {
          error: `A maximum of ${MAX_FILES} attachments is allowed.`,
        },
        {
          status: 400,
        }
      );
    }

    const totalSize = files.reduce(
      (total, file) =>
        total + file.size,
      0
    );

    if (totalSize > MAX_TOTAL_SIZE) {
      return NextResponse.json(
        {
          error:
            "Total attachment size cannot exceed 25 MB.",
        },
        {
          status: 400,
        }
      );
    }

    for (const file of files) {
      const extension =
        getExtension(file.name);

      if (
        BLOCKED_EXTENSIONS.has(
          extension
        )
      ) {
        return NextResponse.json(
          {
            error: `The file "${file.name}" is not allowed as an email attachment.`,
          },
          {
            status: 400,
          }
        );
      }
    }

    const attachments = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer =
          await file.arrayBuffer();

        const buffer =
          Buffer.from(arrayBuffer);

        return {
          filename: sanitizeFilename(
            file.name
          ),
          content: buffer.toString(
            "base64"
          ),
        };
      })
    );

    const emailResponse =
      await resend.emails.send({
        from:
          "OLYR Labs <hello@olyrlabs.com>",
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
              .replace(
                /\n/g,
                "<br />"
              )}
          </div>
        `,

        ...(attachments.length > 0
          ? {
              attachments,
            }
          : {}),
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
        message:
          "Email sent successfully.",
        id: emailResponse.data?.id,
        attachmentCount:
          attachments.length,
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

