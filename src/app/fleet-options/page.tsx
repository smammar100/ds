import type { Metadata } from "next";
import { V2Header, V2RealPhones } from "@/components/v2/sections";
import { FleetLive, FleetRack, FleetSignal } from "@/components/v2/fleet-fx";

export const metadata: Metadata = {
  title: "Fleet illustration — options",
  description: "Three animated treatments of the real-phones illustration.",
};

const OPTIONS = [
  {
    id: "a",
    name: "Live board",
    note: "The current board, alive. Slots wake, warm and post on their own clock; the screen dithers brighter as a slot goes live and a mono log underneath records each event. Says: this is running right now.",
    Illustration: FleetLive,
  },
  {
    id: "b",
    name: "Carrier signal",
    note: "Seven phones on a US carrier node. Traffic travels up the lines as moving dashes, the node pings, screens flash green as posts leave. Says: real SIMs on a real network, not an API.",
    Illustration: FleetSignal,
  },
  {
    id: "c",
    name: "Dither rack",
    note: "A rack of phones rendered in the footer's ordered-dither field, on canvas. A review line sweeps across; phones light as it passes and one in five earns a green tick. Says: human review on the final 5%.",
    Illustration: FleetRack,
  },
];

/** Internal review page: the three fleet illustrations in the real section. */
export default function FleetOptions() {
  return (
    <div className="min-h-screen bg-black">
      <V2Header />
      <main>
        <div className="shell flex flex-col gap-3 pt-16 pb-2">
          <span className="font-mono text-[11px] tracking-[0.08em] text-dim uppercase">
            Internal · fleet illustration
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
            <V2RealPhones illustration={<o.Illustration />} />
          </div>
        ))}
      </main>
    </div>
  );
}
