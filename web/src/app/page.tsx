import { SiteHeader } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";
import { ProductDemo } from "@/components/site/product-demo";
import { Bento } from "@/components/site/bento";
import { NicheGrid } from "@/components/site/niche-grid";
import { Capabilities } from "@/components/site/capabilities";
import { Pricing } from "@/components/site/pricing";
import { BookCall } from "@/components/site/book-call";
import { Faq } from "@/components/site/faq";
import { ClosingCta } from "@/components/site/closing-cta";
import { SiteFooter } from "@/components/site/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      <main>
        <Hero />
        <ProductDemo />
        <Bento />
        <NicheGrid />
        <Capabilities />
        <Pricing />
        <BookCall />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
