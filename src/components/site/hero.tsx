"use client";

import { Reveal } from "./reveal";
import { pressLogos } from "@/content/landing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  return (
    <section
      id="top"
      className="shell grid items-end gap-8 lg:grid-cols-12"
    >
      <div className="flex flex-col justify-center gap-7 pt-12 sm:pt-20 lg:col-span-6 lg:min-h-[min(760px,88vh)]">
        <Reveal variant="rise">
          <h1 className="font-display m-0 text-[clamp(52px,6.4vw,104px)] leading-[0.94] tracking-[-0.02em]">
            Automated Attention
          </h1>
        </Reveal>

        <Reveal variant="rise" delay={0.08}>
          <p className="max-w-[34ch] text-[19px] leading-[1.55] text-muted-foreground">
            Scale your distribution with agentic social accounts. Hosted on real
            US devices, posting daily, learning from what performs.
          </p>
        </Reveal>

        <Reveal variant="rise" delay={0.14}>
          <form
            className="flex max-w-[440px] flex-col gap-2 min-[380px]:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              required
              aria-label="Work email"
              placeholder="you@company.com"
              className="h-auto min-w-0 flex-1 rounded border-[#262626] bg-[#0a0a0a] px-3.5 py-3 text-[14.5px] md:text-[14.5px]"
            />
            <Button
              type="submit"
              className="h-auto shrink-0 rounded bg-[#ededed] px-5 py-3 text-[14.5px] font-medium text-black hover:bg-white"
            >
              Free audit call
            </Button>
          </form>
        </Reveal>

        <Reveal variant="fade" delay={0.2}>
          <div className="flex max-w-[440px] flex-wrap items-center gap-8 pt-6">
            {pressLogos.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                style={{ height: logo.h }}
                className="w-auto opacity-60"
              />
            ))}
          </div>
        </Reveal>
      </div>

      <div className="relative min-h-[300px] self-stretch sm:min-h-[420px] lg:col-span-6 lg:min-h-[520px]">
        <video
          src="/assets/hero-dither.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          className="absolute inset-0 block h-full w-full object-contain"
        />
      </div>
    </section>
  );
}
