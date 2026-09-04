import { Reveal } from "./reveal";

const CARD =
  "flex min-w-0 flex-col gap-4 rounded-[10px] bg-surface p-7";

export function Bento() {
  return (
    <section className="shell pt-30">
      <Reveal variant="rise">
        <div className="mb-10 flex flex-col gap-3.5">
          <h2 className="font-display text-[clamp(32px,4vw,44px)] leading-[1.05] tracking-[-0.01em]">
            Inside a hosted account
          </h2>
          <p className="max-w-[62ch] text-[17px] leading-[1.6] text-muted-foreground">
            A persona decides who posts, attention data decides what posts next,
            and every session behaves like ordinary device use.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <Reveal variant="scale" as="article" className={CARD}>
          <div className="flex flex-col gap-2.5">
            <h3 className="font-display text-[30px] leading-[1.1] tracking-[-0.01em]">
              Personas you can&apos;t hire
            </h3>
            <p className="max-w-[44ch] text-[15.5px] leading-[1.6] text-muted-foreground">
              Build hyper-specific creators for any niche: 62-year-old mom in
              Phoenix, Gen-Z skater in Atlanta. Demographics you&apos;d never
              find on a roster, now built on demand.
            </p>
          </div>
          <figure className="flex min-h-[210px] flex-1 items-center justify-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/bento-personas.webp"
              alt="A roster of persona figures with one highlighted, linked to a single account profile"
              className="block h-auto max-h-full w-auto max-w-full"
            />
          </figure>
        </Reveal>

        <Reveal variant="scale" delay={0.06} as="article" className={CARD}>
          <div className="flex flex-col gap-2.5">
            <h3 className="font-display text-[30px] leading-[1.1] tracking-[-0.01em]">
              Attention intelligence
            </h3>
            <p className="max-w-[44ch] text-[15.5px] leading-[1.6] text-muted-foreground">
              Our system analyzes what works to make the content smarter over
              time. The best performing content becomes the training data for
              what comes next.
            </p>
          </div>
          <figure className="flex min-h-[210px] flex-1 items-center justify-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/bento-attention.webp"
              alt="Grid of posts tinted by performance, stronger performers marked"
              className="block h-auto max-h-full w-auto max-w-full"
            />
          </figure>
        </Reveal>

        <Reveal
          variant="scale"
          delay={0.1}
          as="article"
          className="grid min-w-0 items-start gap-8 rounded-[10px] bg-surface p-7 md:col-span-2 md:grid-cols-[1fr_1.55fr]"
        >
          <div className="flex min-w-0 flex-col gap-3">
            <h3 className="font-display text-[30px] leading-[1.1] tracking-[-0.01em]">
              Control is all you need
            </h3>
            <p className="max-w-[42ch] text-[15.5px] leading-[1.6] text-muted-foreground">
              Accounts scroll, swipe, comment, warm up, and engage like real
              users. Algorithms interact with our agentic accounts as real
              creators in the ecosystem.
            </p>
          </div>
          <figure className="flex min-h-[300px] min-w-0 items-center justify-center py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/bento-control.webp"
              alt="An account searching its niche, browsing the feed, and posting to it"
              className="block h-auto max-w-full"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
