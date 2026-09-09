import type { Metadata } from "next";
import { editorialOld, fragmentMono, neueMontreal } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "doublespeed — AI creator accounts on real devices",
  description:
    "AI creator accounts that post daily on real US phones, reviewed by humans. For brands and agencies that need distribution without a creator team.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${neueMontreal.variable} ${fragmentMono.variable} ${editorialOld.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}
