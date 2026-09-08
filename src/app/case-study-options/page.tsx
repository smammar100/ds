import type { Metadata } from "next";
import { V2Header } from "@/components/v2/sections";
import {
  CaseStudiesBento,
  CaseStudiesCards,
  CaseStudiesFeaturedRail,
  CaseStudiesLedger,
  CaseStudiesRail,
  CaseStudiesWall,
} from "@/components/v2/case-studies";

export const metadata: Metadata = {
  title: "Case study section — options",
  description: "Three treatments of the case-study section for the landing page.",
};

const OPTIONS = [
  {
    id: "f",
    name: "Featured + three",
    note: "The oral-care study told in full with its view tiles, three more as stat cards, then one button to the full index.",
    Section: CaseStudiesFeaturedRail,
  },
  {
    id: "a",
    name: "Featured + ledger",
    note: "One study gets the full pitch with its top posts drawn as view tiles; the other seven sit in a scannable ledger of category, metric and date.",
    Section: CaseStudiesLedger,
  },
  {
    id: "b",
    name: "Stat rail",
    note: "All eight as equal cards on a snap-scrolling rail. Each carries its headline metric and a bar chart of its top posts. Best if you want breadth over depth.",
    Section: CaseStudiesRail,
  },
  {
    id: "c",
    name: "Receipt cards",
    note: "Three studies, each led by a mock analytics readout of its top posts. Leans into the 'post-level receipts' line and needs no imagery at all.",
    Section: CaseStudiesCards,
  },
  {
    id: "d",
    name: "Bento",
    note: "One featured cell at double size with its view tiles, four studies as metric tiles beside it. Dense, scannable, and the whole section fits in one viewport.",
    Section: CaseStudiesBento,
  },
  {
    id: "e",
    name: "Numbers wall",
    note: "All eight metrics set large in a hairline grid, pure type. The study title only appears on hover. The most on-brand with the display face, and the least it can ever look like hiding a client.",
    Section: CaseStudiesWall,
  },
];

/** Internal review page: the three case-study treatments, back to back. */
export default function CaseStudyOptions() {
  return (
    <div className="min-h-screen bg-black">
      <V2Header />
      <main>
        <div className="shell flex flex-col gap-3 pt-16 pb-6">
          <span className="font-mono text-[11px] tracking-[0.08em] text-dim uppercase">
            Internal · case study section
          </span>
          <h1 className="font-display text-[clamp(30px,3.6vw,42px)] leading-[1.05] tracking-[-0.01em]">
            Seven options
          </h1>
          <nav className="flex gap-4 text-[14px] text-muted-foreground">
            {OPTIONS.map((o) => (
              <a key={o.id} href={`#option-${o.id}`} className="hover:text-foreground">
                {o.id.toUpperCase()} · {o.name}
              </a>
            ))}
          </nav>
        </div>

        {OPTIONS.map((o) => (
          <div key={o.id} id={`option-${o.id}`} className="scroll-mt-16">
            <div className="shell flex flex-col gap-1 pt-14">
              <span className="font-mono text-[11px] tracking-[0.08em] text-[#9be36a] uppercase">
                Option {o.id.toUpperCase()} · {o.name}
              </span>
              <p className="max-w-[70ch] text-[14px] leading-[1.55] text-muted-foreground">{o.note}</p>
            </div>
            <o.Section />
          </div>
        ))}
      </main>
    </div>
  );
}
