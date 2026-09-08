import { Reveal } from "./reveal";

export function ProductDemo() {
  return (
    <section className="shell flex flex-col gap-4 pt-20 sm:pt-30">
      <Reveal variant="scale">
        <div className="relative aspect-[1420/440] overflow-hidden rounded-xl border border-hairline bg-[#0b0b0b]">
          <video
            src="/assets/product-demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Product walkthrough of the doublespeed terminal"
            className="absolute inset-0 block h-full w-full object-contain"
          />
        </div>
      </Reveal>

      {/* The reel was the strongest proof on the page and carried no numbers.
          The caption is split so the stat is attributed to the account it came
          from, not to the terminal footage above it. */}
      <Reveal variant="fade" delay={0.1}>
        <div className="flex flex-col gap-1.5 text-[14.5px] leading-[1.5] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <span className="text-muted-foreground">
            The doublespeed terminal, running a fleet of hosted accounts.
          </span>
          <span className="font-medium text-foreground">
            @jake.rivera, an AI persona on real devices. 312K, 142K and 78K
            views on his last three posts.
          </span>
        </div>
      </Reveal>
    </section>
  );
}
