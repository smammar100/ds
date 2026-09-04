import { Reveal } from "./reveal";
import { plans, type Plan } from "@/content/landing";
import { cn } from "@/lib/utils";

function Glyph({ name }: { name: Plan["glyph"] }) {
  const common = {
    viewBox: "0 0 14 14",
    width: 14,
    height: 14,
    fill: "none" as const,
    stroke: "currentColor",
  };
  if (name === "phone")
    return (
      <svg {...common} strokeWidth={1.4}>
        <rect x="3.5" y="1" width="7" height="12" rx="1.5" />
        <path d="M6 3h2" />
      </svg>
    );
  if (name === "agent")
    return (
      <svg
        {...common}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3l4 4-4 4M7 3l4 4-4 4" />
      </svg>
    );
  return (
    <svg {...common} strokeWidth={1.4}>
      <circle cx="5" cy="4.5" r="2.2" />
      <circle cx="10" cy="5.5" r="1.7" />
      <path d="M1 12c0-2.4 1.8-4 4-4s4 1.6 4 4M9.5 8.5c1.9 0 3.5 1.3 3.5 3.2" />
    </svg>
  );
}

const CTA_GHOST =
  "flex h-[46px] items-center justify-center rounded-lg bg-[#1a1a1c] text-base font-medium tracking-[-0.01em] text-[#ededed] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_6px_12px_rgba(0,0,0,0.3)] transition-colors hover:bg-[#232326]";
const CTA_SOLID =
  "flex h-[46px] items-center justify-center rounded-lg bg-[rgba(255,255,255,0.94)] text-base font-medium tracking-[-0.01em] text-[#0a0d14] shadow-[inset_0_0_0_2px_rgba(0,0,0,0.1),0_0_0_2px_rgba(255,255,255,0.07),inset_0_2px_3px_-1px_rgba(255,255,255,0.3),0_7px_16px_-5px_rgba(0,0,0,0.45)] transition-colors hover:bg-white";

export function Pricing() {
  return (
    <section id="pricing" className="shell pt-30">
      <Reveal variant="rise">
        <div className="mb-10 flex flex-col items-center gap-3.5 text-center">
          <h2 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.02] tracking-[-0.01em]">
            Three ways to run it
          </h2>
          <p className="max-w-[48ch] text-base leading-[1.6] text-muted-foreground">
            Start with a hosted slot and bring your own content, hand the
            content to an agent, or let us run the whole operation.
          </p>
        </div>
      </Reveal>

      <div className="grid items-stretch gap-5 md:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal
            key={plan.name}
            variant="scale"
            delay={i * 0.07}
            className="h-full"
          >
            <div className="h-full rounded-[10px] transition-transform duration-200 ease-out hover:z-[2] hover:scale-[1.035]">
              <div className="bg-surface relative flex h-full flex-col gap-9 overflow-hidden rounded-[10px] p-8">
                {plan.featured && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[10px]">
                    <div className="absolute -top-30 -left-[90px] h-[280px] w-[340px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0)_100%)]" />
                  </div>
                )}

                <div className="relative flex flex-col gap-7">
                  <div className="flex items-start justify-between">
                    <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-gradient-to-b from-[#3a3a3d] to-[#232325] text-[#d4d4d8] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_0_1.5px_rgba(0,0,0,0.45)]">
                      <Glyph name={plan.glyph} />
                    </span>
                    {plan.badge && (
                      <span className="flex h-[22px] items-center gap-1.5 rounded-full bg-[#272729] pr-3 pl-2 text-[11px] font-medium tracking-[0.02em] text-white uppercase shadow-[0_0_0_1.5px_rgba(0,0,0,0.25),3px_6px_12px_rgba(0,0,0,0.6)]">
                        <span
                          className="h-3 w-3 bg-white"
                          style={{
                            maskImage: "url(/assets/icon-star.svg)",
                            WebkitMaskImage: "url(/assets/icon-star.svg)",
                            maskSize: "contain",
                            WebkitMaskSize: "contain",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                            maskPosition: "center",
                            WebkitMaskPosition: "center",
                          }}
                        />
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold tracking-[-0.01em] text-[#f6f8fa]">
                      {plan.name}
                    </h3>
                    <p className="min-h-11 text-[14.5px] leading-[1.5] text-[#858585]">
                      {plan.who}
                    </p>
                  </div>
                </div>

                <div className="relative flex min-h-12 items-baseline gap-1.5">
                  <span
                    className={cn(
                      "font-medium tracking-[-0.015em] tabular-nums",
                      plan.featured ? "text-[40px]" : "text-[32px]",
                    )}
                  >
                    {plan.price}
                  </span>
                  <span className="text-[17px] font-medium text-[#858585]">
                    {plan.unit}
                  </span>
                </div>

                <a
                  href="#book"
                  className={plan.featured ? CTA_SOLID : CTA_GHOST}
                >
                  {plan.cta}
                </a>

                <div className="flex items-center gap-2.5">
                  <span className="h-[1.5px] flex-1 bg-[#141414] shadow-[0_1px_1px_rgba(255,255,255,0.11)]" />
                  <span className="text-xs font-semibold tracking-[-0.01em] text-white/30 uppercase">
                    {plan.listLabel}
                  </span>
                  <span className="h-[1.5px] flex-1 bg-[#141414] shadow-[0_1px_1px_rgba(255,255,255,0.11)]" />
                </div>

                <ul className="flex list-none flex-col gap-[18px] p-0">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 text-[15.5px] leading-[1.3] font-medium tracking-[-0.01em] text-white"
                    >
                      <span
                        className="h-5 w-5 flex-none bg-[#737378]"
                        style={{
                          maskImage: "url(/assets/icon-check.svg)",
                          WebkitMaskImage: "url(/assets/icon-check.svg)",
                          maskSize: "contain",
                          WebkitMaskSize: "contain",
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskPosition: "center",
                        }}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
