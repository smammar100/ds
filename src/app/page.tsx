import type { Metadata } from "next";
import { Pricing } from "@/components/site/pricing";
import { BookCall } from "@/components/site/book-call";
import { NicheGrid } from "@/components/site/niche-grid";
import { stats } from "@/content/v2";
import { V2Faq } from "@/components/v2/faq";
import { PressMarquee } from "@/components/v2/press-fx";
import { CaseStudiesGallery } from "@/components/v2/case-studies";
import {
  V2Closing,
  V2Footer,
  V2Header,
  V2Hero,
  V2RealPhones,
  V2WhatYouGet,
} from "@/components/v2/sections";

export const metadata: Metadata = {
  title: "doublespeed — AI creator accounts on real devices",
  description:
    "AI creator accounts that post daily on real US phones, reviewed by humans. For brands and agencies that need distribution without a creator team.",
};

/** The landing page: the revised wireframe, section for section. */
export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <V2Header />
      <main>
        <V2Hero />
        <PressMarquee />
        <V2RealPhones />
        <V2WhatYouGet />
        <NicheGrid reel cta={{ label: "Book a call", href: "#book" }} />
        <CaseStudiesGallery />
        <Pricing />
        <V2Faq />
        <div className="pb-20">
          <BookCall stats={stats} />
        </div>
        <V2Closing />
      </main>
      <V2Footer />
    </div>
  );
}
