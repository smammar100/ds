"use client";

import { Reveal } from "./reveal";
import { pressLogos } from "@/content/landing";

export function Hero() {
  return (
    <section
      id="top"
      className="shell grid items-end gap-8 lg:grid-cols-12"
    >
      <div className="flex flex-col justify-center gap-7 pt-12 sm:pt-20 lg:col-span-6 lg:min-h-[min(760px,88vh)]">
        <Reveal variant="rise">
          <h1 className="font-display m-0 text-[clamp(44px,5.4vw,88px)] leading-[0.96] tracking-[-0.02em]">
            AI creator accounts that post and grow on real devices
          </h1>
        </Reveal>

        <Reveal variant="rise" delay={0.08}>
          {/* Audience and payoff in one line a cold visitor can repeat back:
              who it is for, then what they get, with no creator payroll as
              the close. */}
          <p className="max-w-[44ch] text-[19px] leading-[1.55] text-muted-foreground">
            For brands and agencies that need distribution without a creator
            team.{" "}
            <span className="font-medium text-foreground">
              Accounts posting daily on real US phones, reviewed by humans.
            </span>
          </p>
        </Reveal>

        <Reveal variant="rise" delay={0.14}>
          <div className="flex flex-col gap-2.5 min-[360px]:flex-row">
            <a
              href="#book"
              className="flex h-[46px] items-center justify-center rounded bg-[#ededed] px-6 text-[14.5px] font-medium whitespace-nowrap text-black transition-colors hover:bg-white"
            >
              Book a call
            </a>
            <a
              href="#pricing"
              className="flex h-[46px] items-center justify-center rounded px-6 text-[14.5px] font-medium whitespace-nowrap text-[#ededed] shadow-[inset_0_0_0_1px_#2a2a2a] transition-colors hover:bg-[#141414]"
            >
              See pricing
            </a>
          </div>
        </Reveal>

        <Reveal variant="fade" delay={0.2}>
          {/* Two rows of two on mobile, one row of four from 640px. Each cell
              is a fixed-height box and the logo contains within it, so the
              relative sizing from the design survives the logos scaling down
              when a column gets narrow. */}
          <div className="flex flex-col gap-4 pt-6">
            <span className="font-mono text-[11px] tracking-[0.08em] text-dim uppercase">
              Featured in
            </span>
            <div className="grid grid-cols-2 items-center gap-x-6 gap-y-5 sm:grid-cols-4">
              {pressLogos.map((logo) => (
                <div key={logo.alt} className="flex h-[30px] items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    style={{ maxHeight: logo.h }}
                    className="w-auto max-w-full object-contain object-left"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative min-h-[300px] self-stretch sm:min-h-[420px] lg:col-span-6 lg:min-h-[520px]">
        {/* The footage is a white dither on a near-black field (rgb(1,1,1)),
            which leaves a faint rectangular seam against the page's pure
            black. Screen blending composites that field away exactly, so only
            the hand and eyes remain. */}
        <video
          src="/assets/hero-dither.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          className="absolute inset-0 block h-full w-full object-contain mix-blend-screen"
        />
      </div>
    </section>
  );
}
