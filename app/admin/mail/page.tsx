
"use client";

import {
  DragEvent,
  FormEvent,
  useRef,
  useState,
} from "react";

const MAX_FILES = 10;
const MAX_TOTAL_SIZE = 25 * 1024 * 1024;

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function InternalMailPage() {
  const [authenticated, setAuthenticated] =
    useState(false);

  const [password, setPassword] = useState("");

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [attachments, setAttachments] =
    useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  function addFiles(newFiles: FileList | File[]) {
    setError("");

    const incomingFiles = Array.from(newFiles);

    if (!incomingFiles.length) {
      return;
    }

    const combined = [
      ...attachments,
      ...incomingFiles,
    ];

    if (combined.length > MAX_FILES) {
      setError(
        `You can attach a maximum of ${MAX_FILES} files.`
      );
      return;
    }

    const totalSize = combined.reduce(
      (total, file) => total + file.size,
      0
    );

    if (totalSize > MAX_TOTAL_SIZE) {
      setError(
        "Total attachment size cannot exceed 25 MB."
      );
      return;
    }

    setAttachments(combined);
  }

  function removeAttachment(index: number) {
    setAttachments((current) =>
      current.filter((_, i) => i !== index)
    );
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files) {
      addFiles(event.target.files);
    }

    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (event.dataTransfer.files) {
      addFiles(event.dataTransfer.files);
    }
  }

  async function login(event: FormEvent) {
    event.preventDefault();

    setLoginLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/internal-mail/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Authentication failed."
        );
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

  async function sendEmail(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();

      formData.append("to", to);
      formData.append("subject", subject);
      formData.append("message", message);

      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      const response = await fetch(
        "/api/internal-mail/send",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to send email."
        );
      }

      setSuccess(
        attachments.length
          ? `Email sent successfully with ${attachments.length} attachment${
              attachments.length === 1 ? "" : "s"
            }.`
          : "Email sent successfully from hello@olyrlabs.com."
      );

      setTo("");
      setSubject("");
      setMessage("");
      setAttachments([]);
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
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
          <div className="w-full">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
                OLYR Labs
              </p>

              <h1 className="mt-4 text-3xl font-semibold">
                Internal Mail
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#71717A]">
                This area is restricted to authorized
                OLYR Labs team members.
              </p>
            </div>

            <form
              onSubmit={login}
              className="mt-8 border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >
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
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 lg:py-16">

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
            OLYR Labs
          </p>

          <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                Internal Mail
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#71717A]">
                Send professional client emails through
                the verified OLYR Labs domain.
              </p>
            </div>

            <div className="border border-blue-400/20 bg-blue-400/[0.05] px-4 py-3 text-xs text-blue-300">
              Sending as{" "}
              <span className="font-semibold">
                hello@olyrlabs.com
              </span>
            </div>
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

            {/* Attachments */}
            <div>
              <div className="mb-3 flex items-center justify-between gap-4">
                <label className="text-sm font-medium text-white">
                  Attachments
                </label>

                <span className="text-xs text-[#71717A]">
                  {attachments.length}/{MAX_FILES} files
                  {" · "}
                  25 MB total
                </span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onDragOver={(event) =>
                  event.preventDefault()
                }
                onDrop={handleDrop}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="group cursor-pointer border border-dashed border-white/15 bg-white/[0.015] px-6 py-10 text-center transition hover:border-blue-400/50 hover:bg-blue-400/[0.025]"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl transition group-hover:border-blue-400/40 group-hover:bg-blue-400/[0.08]">
                  📎
                </div>

                <p className="mt-4 text-sm font-medium text-white">
                  Drop files here or click to browse
                </p>

                <p className="mt-2 text-xs text-[#71717A]">
                  Up to 10 files · 25 MB total
                </p>
              </div>

              {attachments.length > 0 && (
                <div className="mt-4 grid gap-2">
                  {attachments.map((file, index) => (
                    <div
                      key={`${file.name}-${file.size}-${index}`}
                      className="flex items-center gap-3 border border-white/10 bg-white/[0.025] px-4 py-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-sm">
                        📄
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-white">
                          {file.name}
                        </p>

                        <p className="mt-0.5 text-xs text-[#71717A]">
                          {formatFileSize(file.size)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          removeAttachment(index);
                        }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#71717A] transition hover:bg-red-400/10 hover:text-red-400"
                        aria-label={`Remove ${file.name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
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

