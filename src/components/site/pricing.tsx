import { Reveal } from "./reveal";
import { plans, type Plan } from "@/content/landing";

/**
 * The plan glyphs build on each other: a phone for a hosted slot, a phone plus
 * the agent mark for Content Agent, and both plus a person for Managed.
 */
function Glyph({ name }: { name: Plan["glyph"] }) {
  // A phone slot, a monitor running the agent, and a team behind it.
  const phone = (
    <svg viewBox="0 0 38 58" className="h-[58px] w-[38px]" aria-hidden>
      <rect width="38" height="58" rx="6" className="fill-white" />
      <rect x="13" y="6" width="12" height="2.5" rx="1.25" className="fill-[#0a0a0a]" />
    </svg>
  );
  const monitor = (
    <svg viewBox="0 0 48 58" className="h-[58px] w-[48px]" aria-hidden>
      <rect width="48" height="38" rx="6" className="fill-white" />
      <path
        d="M17 11l6 8-6 8M26 11l6 8-6 8"
        className="fill-none stroke-[#0a0a0a]"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="18" y="38" width="12" height="10" className="fill-white" />
      <rect x="9" y="48" width="30" height="7" rx="3" className="fill-white" />
    </svg>
  );
  const team = (
    <svg viewBox="0 0 74 58" className="h-[58px] w-[74px]" aria-hidden>
      {/* two people behind, one in front */}
      <g className="fill-[#8b8b8f]">
        <circle cx="17" cy="20" r="10" />
        <path d="M17 33c9 0 16 6.5 16 16v9H1v-9c0-9.5 7-16 16-16Z" />
        <circle cx="57" cy="20" r="10" />
        <path d="M57 33c9 0 16 6.5 16 16v9H41v-9c0-9.5 7-16 16-16Z" />
      </g>
      <g className="fill-[#0a0a0a]">
        <circle cx="37" cy="17" r="14" />
        <path d="M37 33c12 0 21 8 21 20v5H16v-5c0-12 9-20 21-20Z" />
      </g>
      <g className="fill-white">
        <circle cx="37" cy="17" r="11.5" />
        <path d="M37 34.5c10.5 0 18.5 7 18.5 17.5V58h-37v-6c0-10.5 8-17.5 18.5-17.5Z" />
      </g>
    </svg>
  );
  const plus = <span className="text-[24px] leading-none font-light text-white/85">+</span>;

  return (
    <div className="flex h-[58px] items-center gap-2.5" aria-hidden>
      {phone}
      {name !== "phone" && (
        <>
          {plus}
          {monitor}
        </>
      )}
      {name === "team" && (
        <>
          {plus}
          {team}
        </>
      )}
    </div>
  );
}

const CTA =
  "flex h-[48px] items-center justify-center rounded-[10px] bg-white text-[15px] font-medium tracking-[-0.01em] text-[#0a0a0a] transition-colors hover:bg-white/90";

export function Pricing() {
  return (
    <section id="pricing" className="shell pt-20 sm:pt-30">
      <Reveal variant="rise">
        <div className="mb-10 flex flex-col items-center gap-3.5 text-center">
          <h2 className="font-display text-[clamp(36px,5vw,52px)] leading-[1.02] tracking-[-0.01em]">
            Pricing
          </h2>
          <p className="max-w-[48ch] text-base leading-[1.6] text-muted-foreground">
            Buy accounts that post for you, or hand the whole operation to a
            dedicated strategist and creator team.
          </p>
        </div>
      </Reveal>

      <div className="grid items-stretch gap-5 md:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} variant="scale" delay={i * 0.07} className="h-full">
            <article className="relative flex h-full flex-col gap-5 rounded-[14px] border border-hairline bg-surface p-7">
              {plan.badge && (
                <span className="absolute top-5 right-5 rounded-full border border-white/25 px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-white/75 uppercase">
                  {plan.badge}
                </span>
              )}

              <Glyph name={plan.glyph} />

              <div className="flex flex-col gap-2">
                <h3 className="text-[26px] leading-[1.15] font-medium tracking-[-0.015em] text-white">
                  {plan.name}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.45] text-[#9a9a9f]">
                  {plan.who}
                </p>
              </div>

              {/* Price sits between two hairlines, or the CTA words stand in
                  for it on the plan that is quoted on a call. */}
              <div className="flex min-h-[60px] items-center border-y border-hairline py-3">
                {plan.price ? (
                  <p className="m-0 flex items-baseline gap-1.5">
                    <span className="text-[34px] leading-none font-medium tracking-[-0.02em] text-white">
                      {plan.price}
                    </span>
                    <span className="text-[13.5px] text-[#9a9a9f]">{plan.unit}</span>
                  </p>
                ) : (
                  <p className="m-0 text-[26px] leading-none font-medium tracking-[-0.015em] text-white">
                    {plan.cta}
                  </p>
                )}
              </div>

              <p className="m-0 text-[14.5px] leading-[1.55] text-[#9a9a9f]">
                {plan.blurb}
              </p>

              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {plan.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-3 text-[14.5px] leading-[1.45] text-[#dcdcdf]"
                  >
                    <span className="mt-[7px] h-[5px] w-[5px] flex-none bg-[#7d7d82]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <a href={plan.href} className={`${CTA} mt-auto`}>
                {plan.cta}
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      {/* The de-risking a five-figure decision needs, printed rather than
          left for the buyer to ask about on the call. */}
      <Reveal variant="fade" delay={0.12}>
        <p className="mt-7 text-center text-sm leading-[1.6] text-muted-foreground">
          Ten-account minimum on hosted slots. Banned accounts replaced free.
          You own the accounts and the content.
        </p>
      </Reveal>
    </section>
  );
}
