import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fallback for the licensed Moret variable face served from Typekit below.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "doublespeed — Automated Attention",
  description:
    "Scale your distribution with agentic social accounts. Hosted on real US devices, posting daily, learning from what performs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${bodoni.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/hky5sxh.css" />
      </head>
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}
