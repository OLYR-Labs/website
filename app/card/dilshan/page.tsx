
"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

const CARD_URL = "https://olyrlabs.com/card/dilshan";
const PHONE = "+94781026353";
const DISPLAY_PHONE = "+94 78 102 6353";
const EMAIL = "hello@olyrlabs.com";
const WEBSITE = "https://olyrlabs.com";

export default function DilshanCard() {
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

  const saveContact = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:D.A.B. Dilshan",
      "N:Dilshan;D.A.B.;;;",
      "ORG:OLYR Labs",
      "TITLE:Business & Technology Consultant",
      "TEL;TYPE=WORK,CELL:+94781026353",
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
    a.download = "DAB-Dilshan-OLYR-Labs.vcf";
    a.click();

    URL.revokeObjectURL(url);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "D.A.B. Dilshan — OLYR Labs",
        text: "Connect with D.A.B. Dilshan at OLYR Labs.",
        url: CARD_URL,
      });
    } else {
      await navigator.clipboard.writeText(CARD_URL);
      setCopied(true);

      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <main className="min-h-screen bg-[#070707] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white/[0.04] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-white/[0.03] blur-[120px]" />
      </div>

      <section className="relative z-10 min-h-screen flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">

          <div className="rounded-[32px] overflow-hidden border border-white/[0.08] bg-[#101010] shadow-[0_40px_120px_rgba(0,0,0,.6)]">

            <div className="p-7 sm:p-9">

              <div className="flex justify-center mb-8">
                <img
                  src="/olyrlabslogo.png"
                  alt="OLYR Labs"
                  className="w-24 h-24 object-contain"
                />
              </div>

              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                  OLYR Labs
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                  D.A.B. Dilshan
                </h1>

                <p className="mt-2 text-sm text-white/45">
                  Business & Technology Consultant
                </p>
              </div>

              <div className="mt-8 space-y-3">

                <a
                  href={`https://wa.me/${PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl bg-white text-black px-5 py-4 text-sm font-medium transition hover:bg-white/90 hover:-translate-y-0.5"
                >
                  <span>WhatsApp</span>
                  <span>→</span>
                </a>

                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-sm transition hover:bg-white/[0.07]"
                >
                  <span>{DISPLAY_PHONE}</span>
                  <span>↗</span>
                </a>

                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(EMAIL);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1800);
                  }}
                  className="w-full flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-sm text-white/70 transition hover:bg-white/[0.07]"
                >
                  <span>{copied ? "Email copied" : EMAIL}</span>
                  <span>⧉</span>
                </button>

                <a
                  href={WEBSITE}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-sm text-white/70 transition hover:bg-white/[0.07]"
                >
                  <span>olyrlabs.com</span>
                  <span>↗</span>
                </a>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">

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
                        alt="QR code for D.A.B. Dilshan"
                        className="w-44 h-44"
                      />
                    </div>
                  )}
                </div>

                <p className="mt-4 text-center text-[10px] uppercase tracking-[0.25em] text-white/25">
                  Scan to connect
                </p>

              </div>

              <p className="text-center text-[10px] uppercase tracking-[0.25em] text-white/20 mt-7">
                OLYR Labs
              </p>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

