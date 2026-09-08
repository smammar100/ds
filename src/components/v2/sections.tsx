import { Reveal } from "@/components/site/reveal";
import { FooterFx } from "@/components/site/footer-fx";
import { ReelCard } from "./reel-card";
import { FleetLive } from "./fleet-fx";
import {
  closing,
  footerColumns,
  hero,
  realPhones,
  whatYouGet,
} from "@/content/v2";

const BTN_SOLID =
  "flex h-11 items-center justify-center rounded-md bg-[#ededed] px-5 text-[14.5px] font-medium whitespace-nowrap text-black transition-colors hover:bg-white";
const BTN_GHOST =
  "flex h-11 items-center justify-center rounded-md px-5 text-[14.5px] font-medium whitespace-nowrap text-[#ededed] shadow-[inset_0_0_0_1px_#2a2a2a] transition-colors hover:bg-[#141414]";

/** Small caps label above a section, the wireframe's "FEATURED IN" register. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] tracking-[0.08em] text-dim uppercase">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(30px,3.6vw,42px)] leading-[1.05] tracking-[-0.01em]">
      {children}
    </h2>
  );
}

export function V2Header() {
  return (
    <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-doublespeed.svg"
            alt="doublespeed"
            className="block h-5 w-auto"
          />
        </a>
        <nav className="flex items-center gap-5 sm:gap-7">
          {[
            { href: "#pricing", label: "Pricing" },
            { href: "#faq", label: "FAQ" },
            { href: "#login", label: "Log in" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden text-[13.5px] whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              {item.label}
            </a>
          ))}
          <a
            href={hero.primary.href}
            className="flex h-9 items-center rounded-md bg-[#ededed] px-4 text-[13.5px] font-medium whitespace-nowrap text-black transition-colors hover:bg-white"
          >
            {hero.primary.label}
          </a>
        </nav>
      </div>
    </header>
  );
}

export function V2Hero() {
  return (
    <section id="top" className="shell flex flex-col items-center gap-10 pt-16 pb-20 text-center sm:pt-24">
      <div className="flex max-w-[1040px] flex-col items-center gap-5">
        <Reveal variant="rise">
          <h1 className="font-display m-0 max-w-[24ch] text-[clamp(40px,5.6vw,72px)] leading-[1] tracking-[-0.02em] text-balance">
            {hero.headline}
          </h1>
        </Reveal>
        <Reveal variant="rise" delay={0.08}>
          <div className="flex flex-col gap-2">
            <p className="text-[18px] leading-[1.5] text-muted-foreground">
              {hero.audience}
            </p>
            <p className="text-[16px] leading-[1.5] font-medium text-foreground">
              {hero.payoff}
            </p>
          </div>
        </Reveal>
        <Reveal variant="rise" delay={0.14}>
          <div className="flex flex-col gap-2.5 pt-2 min-[360px]:flex-row">
            <a href={hero.primary.href} className={BTN_SOLID}>
              {hero.primary.label}
            </a>
            <a href={hero.secondary.href} className={BTN_GHOST}>
              {hero.secondary.label}
            </a>
          </div>
        </Reveal>
      </div>

      {/* Proof reel: four posts from one persona, each generating in before
          it resolves. Every card carries its own number so the proof survives
          being screenshot without the caption. */}
      <Reveal variant="scale" delay={0.2} className="w-full">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {hero.reel.map((post, i) => (
              <ReelCard
                key={post.poster}
                src={post.poster}
                delay={200 + i * 650}
                daysAgo={hero.reel.length - 1 - i}
              >
                <span className="text-[12px] text-white/70">{post.label}</span>
                <span className="text-[15px] font-semibold tabular-nums">
                  ▶ {post.stat}
                </span>
              </ReelCard>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Press logos in a contained panel rather than spread across the page. */
export function V2RealPhones({
  illustration,
}: {
  /** Right-hand panel; defaults to the live fleet board. */
  illustration?: React.ReactNode;
}) {
  return (
    <section className="shell grid gap-10 py-20 lg:grid-cols-12 lg:items-center">
      <div className="flex flex-col gap-6 lg:col-span-5">
        <Reveal variant="rise">
          <SectionTitle>{realPhones.headline}</SectionTitle>
        </Reveal>
        <Reveal variant="rise" delay={0.08}>
          <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
            {realPhones.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-[16px] leading-[1.5] text-foreground"
              >
                <span
                  className="mt-[3px] h-4 w-4 flex-none bg-[#9be36a]"
                  style={{
                    maskImage: "url(/assets/icon-check.svg)",
                    WebkitMaskImage: "url(/assets/icon-check.svg)",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal variant="rise" delay={0.14}>
          <p className="max-w-[44ch] text-[15.5px] leading-[1.6] text-muted-foreground">
            {realPhones.body}
          </p>
        </Reveal>
      </div>
      <Reveal variant="scale" delay={0.1} className="lg:col-span-7">
        {illustration ?? <FleetLive />}
      </Reveal>
    </section>
  );
}

export function V2WhatYouGet() {
  return (
    <section className="shell flex flex-col gap-8 py-20">
      <Reveal variant="rise">
        <SectionTitle>What you get</SectionTitle>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {whatYouGet.map((item, i) => (
          <Reveal key={item.title} variant="rise" delay={i * 0.07}>
            <article className="flex h-full flex-col gap-4 rounded-xl border border-hairline bg-surface p-4">
              <div className="aspect-[16/10] overflow-hidden rounded-lg border border-hairline bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1.5 px-1 pb-1">
                <h3 className="text-[17px] font-semibold tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="text-[14.5px] leading-[1.55] text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function V2Closing() {
  return (
    <section className="shell py-20 sm:py-24">
      {/* The dithered eye collage from the original close, pointer-cleared
          around the cursor, but ending on the two revenue actions instead of
          an off-site exit. */}
      <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-xl bg-black">
        <FooterFx
          variant="image-clear"
          src="/assets/eyes-loop.mp4"
          cell="4"
          gain="2.4"
          radius="190"
          style={{ position: "absolute", inset: 0 }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_50%_50%,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0)_100%)]" />

        <Reveal
          variant="rise"
          className="relative flex flex-col items-center gap-5 px-8 py-24 text-center"
        >
          <h2 className="font-display max-w-[18ch] text-[clamp(36px,4.6vw,60px)] leading-[1.02] tracking-[-0.02em] text-balance">
            {closing.headline}
          </h2>
          <p className="max-w-[48ch] text-[16.5px] leading-[1.6] text-[#e5e5e5]">
            {closing.body}
          </p>
          <div className="flex flex-col gap-2.5 pt-2 min-[360px]:flex-row">
            <a href={hero.primary.href} className={BTN_SOLID}>
              {hero.primary.label}
            </a>
            <a href={hero.secondary.href} className={BTN_GHOST}>
              {hero.secondary.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function V2Footer() {
  return (
    <footer className="pt-6">
      <div className="shell grid gap-10 py-14 sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-doublespeed.svg"
            alt="doublespeed"
            className="block h-5 w-auto"
          />
          <span className="text-[13.5px] text-muted-foreground">
            Automating attention.
          </span>
        </div>
        {footerColumns.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <Eyebrow>{col.heading}</Eyebrow>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="shell flex items-center justify-between py-5 text-[12.5px] text-dim">
        <span>© 2026 Doublespeed, Inc.</span>
        <span>Real devices. Human review.</span>
      </div>
    </footer>
  );
}
