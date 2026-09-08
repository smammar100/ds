import type { Metadata } from "next";
import { V2Header } from "@/components/v2/sections";
import { PressMarquee, PressStrip, PressTiles } from "@/components/v2/press-fx";

export const metadata: Metadata = {
  title: "Press section — options",
  description: "Three treatments of the press row for the landing page.",
};

const OPTIONS = [
  {
    id: "a",
    name: "Tiles",
    note: "One bordered tile per publication with a faint top highlight, the Slash and Cosmos pattern. Gives four marks the same visual weight and reads as a set rather than four things floating.",
    Section: PressTiles,
  },
  {
    id: "b",
    name: "Strip",
    note: "A single hairline band: label on the left, logos divided by thin rules. The Notion and Giga pattern. Densest and quietest; sits under the hero without asking for attention.",
    Section: PressStrip,
  },
  {
    id: "c",
    name: "Marquee",
    note: "Logos drift continuously and fade at the edges, pausing on hover. Adds motion to a quiet part of the page and hides that there are only four marks.",
    Section: PressMarquee,
  },
];

/** Internal review page: the three press treatments back to back. */
export default function PressOptions() {
  return (
    <div className="min-h-screen bg-black">
      <V2Header />
      <main>
        <div className="shell flex flex-col gap-3 pt-16 pb-2">
          <span className="font-mono text-[11px] tracking-[0.08em] text-dim uppercase">
            Internal · press section
          </span>
          <h1 className="font-display text-[clamp(30px,3.6vw,42px)] leading-[1.05] tracking-[-0.01em]">
            Three options
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
              <p className="max-w-[70ch] text-[14px] leading-[1.55] text-muted-foreground">
                {o.note}
              </p>
            </div>
            <o.Section />
          </div>
        ))}
      </main>
    </div>
  );
}
