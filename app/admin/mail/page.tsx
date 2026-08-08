"use client";

import { FormEvent, useState } from "react";

export default function InternalMailPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoginLoading(true);
    setError("");

    try {
      const response = await fetch("/api/internal-mail/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      setAuthenticated(true);
      setPassword("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Authentication failed."
      );
    } finally {
      setLoginLoading(false);
    }
  }

  async function sendEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/internal-mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to send email."
        );
      }

      setSuccess(
        "Email sent successfully from hello@olyrlabs.com."
      );

      setTo("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to send email."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
        <div className="mx-auto max-w-md">
          <div className="border border-white/10 bg-white/[0.02] p-8 shadow-[0_0_80px_rgba(59,130,246,0.06)]">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-400">
              OLYR Labs
            </p>

            <h1 className="mt-4 text-3xl font-semibold">
              Internal Mail
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#71717A]">
              This area is restricted to authorized OLYR Labs
              team members.
            </p>

            <form onSubmit={login} className="mt-8">
              <label className="text-sm font-medium text-white">
                Internal Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter internal password"
                autoComplete="current-password"
                required
                className="mt-3 w-full border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
              />

              {error && (
                <div className="mt-4 border border-red-400/20 bg-red-400/[0.05] px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="mt-6 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loginLoading
                  ? "Authenticating..."
                  : "Access Internal Mail →"}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-12 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-400">
              OLYR Labs
            </p>

            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Internal Mail
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#71717A]">
              Send professional client emails through the verified
              OLYR Labs domain.
            </p>
          </div>

          <div className="border border-blue-400/20 bg-blue-400/[0.05] px-4 py-3 text-xs text-blue-300">
            Sending as{" "}
            <span className="font-semibold">
              hello@olyrlabs.com
            </span>
          </div>
        </div>

        <form
          onSubmit={sendEmail}
          className="border border-white/10 bg-white/[0.02] p-6 sm:p-10"
        >
          <div className="grid gap-6">
            <div>
              <label className="text-sm font-medium text-white">
                Recipient
              </label>

              <input
                type="email"
                value={to}
                onChange={(event) =>
                  setTo(event.target.value)
                }
                placeholder="client@example.com"
                required
                className="mt-3 w-full border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                Subject
              </label>

              <input
                type="text"
                value={subject}
                onChange={(event) =>
                  setSubject(event.target.value)
                }
                placeholder="Website Development — OLYR Labs"
                required
                className="mt-3 w-full border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                Message
              </label>

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Write your email here..."
                rows={16}
                required
                className="mt-3 w-full resize-y border border-white/10 bg-white/[0.02] px-5 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
              />
            </div>
          </div>

          {error && (
            <div className="mt-6 border border-red-400/20 bg-red-400/[0.05] px-5 py-4 text-sm text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 border border-blue-400/20 bg-blue-400/[0.05] px-5 py-4 text-sm text-blue-300">
              {success}
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-blue-400 px-8 py-3 text-sm font-semibold text-black transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Sending..."
                : "Send Email →"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}