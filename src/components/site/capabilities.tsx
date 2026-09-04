import { Reveal } from "./reveal";
import { capabilities } from "@/content/landing";

export function Capabilities() {
  return (
    <section className="shell pt-20 sm:pt-30">
      <Reveal variant="rise">
        <div className="mb-10 flex max-w-[640px] flex-col gap-3.5">
          <h2 className="font-display text-[clamp(32px,4vw,44px)] leading-[1.05] tracking-[-0.01em]">
            Everything the account needs
          </h2>
          <p className="text-[17px] leading-[1.6] text-muted-foreground">
            Define the persona, generate the content, publish it in bulk, and
            keep every account under your control from one place.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap, i) => (
          <Reveal
            key={cap.title}
            variant="scale"
            delay={(i % 3) * 0.06}
            as="article"
            className="flex flex-col overflow-hidden rounded-[10px] bg-surface"
          >
            <div className="relative aspect-video overflow-hidden bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cap.image}
                alt={cap.alt}
                className="block h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-[#0b0b0b]" />
            </div>
            <div className="flex flex-col gap-2.5 px-6 pt-2 pb-7">
              <h3 className="font-display text-[26px] leading-[1.15]">
                {cap.title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-muted-foreground">
                {cap.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
