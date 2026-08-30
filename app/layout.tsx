import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ReactiveCursor from "@/components/ReactiveCursor";
import ScrollDirectionButton from "@/components/ScrollDirectionButton";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "OLYR Labs — Digital systems for what's next.",
  description:
    "OLYR Labs builds websites, apps, ERP and POS systems, custom software, AI solutions, cloud infrastructure, and cybersecurity solutions for growing businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          <ReactiveCursor />
          {children}
          <WhatsAppButton />
          <ScrollDirectionButton />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
