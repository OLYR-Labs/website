
"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

const CARD_URL = "https://olyrlabs.com/card/yasangi";
const EMAIL = "hello@olyrlabs.com";
const WEBSITE = "https://olyrlabs.com";

export default function YasangiCard() {
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(CARD_URL, {
      width: 900,
      margin: 4,
      errorCorrectionLevel: "H",
      color: {
        dark: "#ffffff",
        light: "#0b0b0b",
      },
    }).then(setQr);
  }, []);

  const downloadQR = () => {
    if (!qr) return;

    const link = document.createElement("a");

    link.href = qr;
    link.download = "Yasangi-Sanjani-OLYR-Labs-QR.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveContact = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Yasangi Sanjani",
      "N:Yasangi;Sanjani;;;",
      "ORG:OLYR Labs",
      "TITLE:Client Relations Consultant",
      "EMAIL;TYPE=WORK:hello@olyrlabs.com",
      "URL:https://olyrlabs.com",
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vcard], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "Yasangi-Sanjani-OLYR-Labs.vcf";
    a.click();

    URL.revokeObjectURL(url);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Yasangi Sanjani — OLYR Labs",
        text: "Connect with Yasangi Sanjani at OLYR Labs.",
        url: CARD_URL,
      });
    } else {
      await navigator.clipboard.writeText(CARD_URL);
      setCopied(true);

      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">

          <div className="overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#101010] shadow-[0_40px_120px_rgba(0,0,0,.6)]">

            <div className="p-7 sm:p-9">

              <div className="mb-8 flex justify-center">
                <img
                  src="/olyrlabslogo.png"
                  alt="OLYR Labs"
                  className="h-24 w-24 object-contain"
                />
              </div>

              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                  OLYR Labs
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                  Yasangi Sanjani
                </h1>

                <p className="mt-2 text-sm text-white/45">
                  Client Relations Consultant
                </p>
              </div>

              <div className="mt-8 space-y-3">

                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      EMAIL
                    );

                    setCopied(true);

                    setTimeout(
                      () => setCopied(false),
                      1800
                    );
                  }}
                  className="flex w-full items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  <span>
                    {copied
                      ? "Email copied"
                      : EMAIL}
                  </span>

                  <span>→</span>
                </button>

                <a
                  href={WEBSITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-sm text-white/70 transition hover:bg-white/[0.07]"
                >
                  <span>olyrlabs.com</span>
                  <span>↗</span>
                </a>

              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">

                <button
                  onClick={saveContact}
                  className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-medium transition hover:bg-white hover:text-black"
                >
                  Save Contact
                </button>

                <button
                  onClick={share}
                  className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-medium transition hover:bg-white hover:text-black"
                >
                  Share
                </button>

              </div>

              <div className="mt-7 rounded-3xl border border-white/[0.07] bg-black/40 p-5">

                <div className="flex justify-center">
                  {qr && (
                    <div className="rounded-2xl bg-black p-4">
                      <img
                        src={qr}
                        alt="QR code for Yasangi Sanjani"
                        className="h-44 w-44"
                      />
                    </div>
                  )}
                </div>

                <p className="mt-4 text-center text-[10px] uppercase tracking-[0.25em] text-white/25">
                  Scan to connect
                </p>

                <button
                  onClick={downloadQR}
                  disabled={!qr}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span>↓</span>
                  <span>Download QR Code</span>
                </button>

              </div>

              <p className="mt-7 text-center text-[10px] uppercase tracking-[0.25em] text-white/20">
                OLYR Labs
              </p>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

