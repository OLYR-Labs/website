import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollDirectionButton from "@/components/ScrollDirectionButton";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OLYR Labs — Technology for what's next.",
  description: "OLYR Labs builds websites, mobile apps, custom software, ERP and POS systems, AI integrations, cybersecurity solutions, and business automation.",
  metadataBase: new URL("https://olyrlabs.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "OLYR Labs — Technology for what's next.",
    description: "Websites, apps, software, ERP/POS, AI, cybersecurity, and automation built around your business.",
    url: "https://olyrlabs.com",
    siteName: "OLYR Labs",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <WhatsAppButton />
          <ScrollDirectionButton />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
