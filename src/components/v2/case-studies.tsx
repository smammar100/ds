import { Reveal } from "@/components/site/reveal";
import {
  caseStudies,
  caseStudyHref,
  parseViews,
  type CaseStudy,
} from "@/content/case-studies";
import { cn } from "@/lib/utils";

/*
 * Treatments of the same eight studies. None of them show a client
 * name or a client thumbnail: the post tiles are drawn from view counts,
 * so the proof is the number rather than a blurred screenshot.
 */

const featured = caseStudies.find((s) => s.featured) ?? caseStudies[0];
const rest = caseStudies.filter((s) => s !== featured);

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] tracking-[0.08em] text-dim uppercase">
      {children}
    </span>
  );
}

function ReadLink({ slug, label = "Read the study" }: { slug: string; label?: string }) {
  return (
    <a
      href={caseStudyHref(slug)}
      className="inline-flex items-center gap-1.5 text-[14px] font-medium underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
    >
      {label} <span aria-hidden>→</span>
    </a>
  );
}

/**
 * A post rendered as a phone tile with no imagery: a tonal field whose
 * height encodes views relative to the study's best post, the count printed
 * where the reel caption would be. Reads as a post without showing one.
 */
function PostTile({
  views,
  max,
  tone,
  className,
}: {
  views: string;
  max: number;
  tone: number;
  className?: string;
}) {
  const share = Math.max(0.22, parseViews(views) / max);
  return (
    <div
      className={cn(
        "relative flex aspect-[9/14] flex-col justify-end overflow-hidden rounded-xl bg-[#0e0e10] p-3 ring-1 ring-inset ring-white/10",
        className,
      )}
    >
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: `${share * 100}%`,
          background: `linear-gradient(180deg, hsl(${tone} 12% 26% / 0) 0%, hsl(${tone} 14% 30%) 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_0.6px,transparent_0.7px)] [background-size:4px_4px] opacity-40" />
      <span className="relative flex items-center gap-1.5 text-[15px] font-semibold tabular-nums">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.5]" aria-hidden>
          <path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z" />
          <circle cx="8" cy="8" r="2" />
        </svg>
        {views}
      </span>
      <span className="relative text-[11px] text-white/55">views</span>
    </div>
  );
}

function tileTone(study: CaseStudy) {
  // Stable hue per study so the same study always draws the same colour.
  let h = 0;
  for (const c of study.slug) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}

/* ------------------------------------------------------------------ */
/* A. Featured study with a ledger of the rest (Retool / Amplemarket)   */
/* ------------------------------------------------------------------ */

function FeaturedCard() {
  const max = Math.max(...featured.posts.map(parseViews));
  return (
        <article className="grid gap-8 rounded-xl border border-hairline bg-surface p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
          <div className="flex flex-col gap-5 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-muted-foreground">
              <span className="text-foreground">Featured · {featured.category}</span>
              <span className="text-dim">{featured.period}</span>
            </div>
            <h3 className="font-display text-[clamp(26px,3vw,36px)] leading-[1.05] tracking-[-0.01em] text-balance">
              {featured.title}
            </h3>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[clamp(56px,7vw,92px)] leading-[0.9] tracking-[-0.03em] tabular-nums">
                {featured.metric}
              </span>
              <span className="text-[14px] text-muted-foreground">{featured.metricLabel}</span>
            </div>
            <p className="text-[14px] leading-[1.5] text-muted-foreground">{featured.receipt}</p>
            <ReadLink slug={featured.slug} label="Read the full study" />
          </div>
          <div className="grid grid-cols-3 gap-3 lg:col-span-5">
            {featured.posts.map((v, i) => (
              <PostTile key={i} views={v} max={max} tone={tileTone(featured) + i * 14} />
            ))}
          </div>
        </article>
  );
}

export function CaseStudiesLedger() {
  return (
    <section className="shell flex flex-col gap-10 py-20">
      <Reveal variant="rise">
        <div className="flex flex-col gap-3">
          <Eyebrow>Case studies</Eyebrow>
          <h2 className="font-display max-w-[22ch] text-[clamp(30px,3.6vw,42px)] leading-[1.05] tracking-[-0.01em] text-balance">
            Eight campaigns with post-level receipts
          </h2>
        </div>
      </Reveal>

      <Reveal variant="rise" delay={0.06}>
        <FeaturedCard />
      </Reveal>

      <Reveal variant="rise" delay={0.12}>
        <ol className="m-0 list-none divide-y divide-hairline border-y border-hairline p-0">
          {rest.map((s, i) => (
            <li key={s.slug}>
              <a
                href={caseStudyHref(s.slug)}
                className="group grid grid-cols-[32px_1fr_auto] items-baseline gap-x-4 gap-y-1 py-4 transition-colors hover:bg-white/[0.02] sm:grid-cols-[32px_1.2fr_1fr_auto] sm:gap-x-6"
              >
                <span className="font-mono text-[11px] text-dim tabular-nums">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-medium tracking-[-0.01em]">{s.category}</span>
                  <span className="text-[12.5px] text-dim">{s.period}</span>
                </span>
                <span className="col-span-full flex items-baseline gap-2 pl-12 sm:col-span-1 sm:pl-0">
                  <span className="font-display text-[26px] leading-none tracking-[-0.02em] tabular-nums">
                    {s.metric}
                  </span>
                  <span className="text-[13px] text-muted-foreground">{s.metricLabel}</span>
                </span>
                <span className="hidden text-[13px] text-muted-foreground transition-colors group-hover:text-foreground sm:block">
                  Read <span aria-hidden>→</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B. Stat-card rail (Webflow / Intercom), scroll-snapped, no JS         */
/* ------------------------------------------------------------------ */

function Bars({ study }: { study: CaseStudy }) {
  const values = study.posts.map(parseViews);
  const max = Math.max(...values);
  return (
    <div className="flex h-14 items-end gap-1.5" aria-hidden>
      {study.posts.map((p, i) => (
        <div key={i} className="flex h-full w-7 flex-col items-center justify-end gap-1">
          <div
            className="w-full rounded-sm bg-white/80"
            style={{ height: `${Math.max(14, (values[i] / max) * 100)}%` }}
          />
          <span className="font-mono text-[9px] text-dim tabular-nums">{p}</span>
        </div>
      ))}
    </div>
  );
}

function Rail({ studies }: { studies: CaseStudy[] }) {
  return (
        <ul className="m-0 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto px-[max(20px,calc((100vw-1240px)/2+32px))] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {studies.map((s) => (
            <li key={s.slug} className="w-[280px] shrink-0 snap-start sm:w-[300px]">
              <a
                href={caseStudyHref(s.slug)}
                className="flex h-full flex-col justify-between gap-8 rounded-xl border border-hairline bg-surface p-6 transition-colors hover:border-white/25"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] font-medium">{s.category}</span>
                  <span className="text-[12px] text-dim">{s.period}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="font-display text-[44px] leading-[0.95] tracking-[-0.025em] tabular-nums">
                    {s.metric}
                  </span>
                  <span className="text-[13.5px] leading-[1.4] text-muted-foreground">{s.metricLabel}</span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <Bars study={s} />
                  <span className="text-[13px] text-muted-foreground">Read →</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
  );
}

export function CaseStudiesRail() {
  return (
    <section className="flex flex-col gap-8 py-20">
      <Reveal variant="rise" className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <Eyebrow>Case studies</Eyebrow>
            <h2 className="font-display max-w-[22ch] text-[clamp(30px,3.6vw,42px)] leading-[1.05] tracking-[-0.01em] text-balance">
              Every number is dated and measured from live analytics
            </h2>
          </div>
          <a href="/case-studies" className="text-[14px] text-muted-foreground underline decoration-white/30 underline-offset-4 hover:text-foreground">
            All eight studies →
          </a>
        </div>
      </Reveal>

      <Reveal variant="fade" delay={0.08}>
        <Rail studies={caseStudies} />
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* C. Three story cards with analytics "receipts" instead of thumbnails  */
/* ------------------------------------------------------------------ */

/** A post-level analytics readout, the receipt each study is built on. */
function Receipt({ study }: { study: CaseStudy }) {
  const max = Math.max(...study.posts.map(parseViews));
  return (
    <div className="flex flex-col rounded-lg border border-hairline bg-black font-mono text-[11px]">
      <div className="flex items-center justify-between border-b border-hairline px-3 py-2 text-dim">
        <span>TOP POSTS</span>
        <span>{study.period}</span>
      </div>
      {study.posts.map((p, i) => (
        <div key={i} className="grid grid-cols-[20px_1fr_auto] items-center gap-3 border-b border-hairline px-3 py-2 last:border-b-0">
          <span className="text-dim">{String(i + 1).padStart(2, "0")}</span>
          <span className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <span
              className="block h-full rounded-full bg-white/80"
              style={{ width: `${Math.max(10, (parseViews(p) / max) * 100)}%` }}
            />
          </span>
          <span className="text-foreground tabular-nums">{p}</span>
        </div>
      ))}
    </div>
  );
}

export function CaseStudiesCards() {
  const picks = [featured, ...rest.slice(0, 2)];
  return (
    <section className="shell flex flex-col gap-8 py-20">
      <Reveal variant="rise">
        <div className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>Case studies</Eyebrow>
          <h2 className="font-display max-w-[22ch] text-[clamp(30px,3.6vw,42px)] leading-[1.05] tracking-[-0.01em] text-balance">
            What the receipts say
          </h2>
          <p className="max-w-[52ch] text-[15.5px] leading-[1.6] text-muted-foreground">
            Clients stay unnamed. The posts do not: every study is built from
            per-post analytics you can check against the platform.
          </p>
        </div>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {picks.map((s, i) => (
          <Reveal key={s.slug} variant="rise" delay={i * 0.07}>
            <a
              href={caseStudyHref(s.slug)}
              className="flex h-full flex-col gap-5 rounded-xl border border-hairline bg-surface p-5 transition-colors hover:border-white/25"
            >
              <Receipt study={s} />
              <div className="flex flex-col gap-2">
                <span className="text-[12.5px] text-muted-foreground">{s.category}</span>
                <h3 className="text-[17px] leading-[1.3] font-semibold tracking-[-0.01em] text-balance">
                  {s.title}
                </h3>
              </div>
              <div className="mt-auto flex items-baseline gap-2 border-t border-hairline pt-4">
                <span className="font-display text-[34px] leading-none tracking-[-0.02em] tabular-nums">
                  {s.metric}
                </span>
                <span className="text-[13px] text-muted-foreground">{s.metricLabel}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal variant="fade" delay={0.2} className="flex justify-center">
        <a href="/case-studies" className="text-[14px] text-muted-foreground underline decoration-white/30 underline-offset-4 hover:text-foreground">
          See all eight studies →
        </a>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* D. Bento (Ramp customer stories): one big cell, the rest as tiles     */
/* ------------------------------------------------------------------ */

export function CaseStudiesBento() {
  const max = Math.max(...featured.posts.map(parseViews));
  const tiles = rest.slice(0, 4);
  return (
    <section className="shell flex flex-col gap-8 py-20">
      <Reveal variant="rise">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <Eyebrow>Case studies</Eyebrow>
            <h2 className="font-display max-w-[22ch] text-[clamp(30px,3.6vw,42px)] leading-[1.05] tracking-[-0.01em] text-balance">
              See how networks grow on doublespeed
            </h2>
          </div>
          <a href="/case-studies" className="text-[14px] text-muted-foreground underline decoration-white/30 underline-offset-4 hover:text-foreground">
            All eight studies →
          </a>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
        <Reveal variant="rise" className="md:col-span-2 md:row-span-2">
          <a
            href={caseStudyHref(featured.slug)}
            className="flex h-full flex-col justify-between gap-8 rounded-xl border border-hairline bg-surface p-6 transition-colors hover:border-white/25 sm:p-7"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[12.5px] text-muted-foreground">
                Featured · {featured.category} · {featured.period}
              </span>
              <h3 className="font-display text-[clamp(24px,2.6vw,32px)] leading-[1.08] tracking-[-0.01em] text-balance">
                {featured.title}
              </h3>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[clamp(52px,6vw,80px)] leading-[0.9] tracking-[-0.03em] tabular-nums">
                  {featured.metric}
                </span>
                <span className="text-[14px] text-muted-foreground">{featured.metricLabel}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {featured.posts.map((v, i) => (
                <PostTile key={i} views={v} max={max} tone={tileTone(featured) + i * 14} />
              ))}
            </div>
          </a>
        </Reveal>
        {tiles.map((s, i) => (
          <Reveal key={s.slug} variant="rise" delay={0.06 + i * 0.05}>
            <a
              href={caseStudyHref(s.slug)}
              className="flex h-full min-h-[190px] flex-col justify-between gap-6 rounded-xl border border-hairline bg-surface p-5 transition-colors hover:border-white/25"
            >
              <span className="text-[12.5px] text-muted-foreground">{s.category}</span>
              <div className="flex flex-col gap-1">
                <span className="font-display text-[clamp(32px,3vw,40px)] leading-[0.95] tracking-[-0.025em] tabular-nums">
                  {s.metric}
                </span>
                <span className="text-[13px] leading-[1.4] text-muted-foreground">{s.metricLabel}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* E. Numbers wall (Amplemarket): eight metrics, pure type, hover title   */
/* ------------------------------------------------------------------ */

export function CaseStudiesWall() {
  return (
    <section className="shell flex flex-col gap-10 py-20">
      <Reveal variant="rise">
        <div className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>Case studies</Eyebrow>
          <h2 className="font-display max-w-[22ch] text-[clamp(30px,3.6vw,42px)] leading-[1.05] tracking-[-0.01em] text-balance">
            Eight campaigns. Every number dated.
          </h2>
          <p className="max-w-[52ch] text-[15.5px] leading-[1.6] text-muted-foreground">
            Measured from live account analytics, from oral care to fandom.
          </p>
        </div>
      </Reveal>
      <ul className="m-0 grid list-none grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline p-0 md:grid-cols-4">
        {caseStudies.map((s, i) => (
          <li key={s.slug} className="bg-black">
            <Reveal variant="fade" delay={i * 0.04} className="h-full">
              <a
                href={caseStudyHref(s.slug)}
                className="group flex h-full flex-col justify-between gap-10 p-6 transition-colors hover:bg-surface"
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-[12.5px] text-muted-foreground">{s.category}</span>
                  <span className="font-mono text-[10px] text-dim tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="flex flex-col gap-2">
                  <span className="font-display text-[clamp(40px,4.4vw,60px)] leading-[0.9] tracking-[-0.03em] tabular-nums">
                    {s.metric}
                  </span>
                  <span className="text-[13px] leading-[1.4] text-muted-foreground">{s.metricLabel}</span>
                  {/* The story surfaces on hover; the number holds the wall. */}
                  <span className="max-h-0 overflow-hidden text-[13px] leading-[1.4] text-foreground opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
                    {s.title} →
                  </span>
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* F. Featured card, three stat cards, then the index                    */
/* ------------------------------------------------------------------ */

function StatCard({ study }: { study: CaseStudy }) {
  return (
    <a
      href={caseStudyHref(study.slug)}
      className="flex h-full flex-col justify-between gap-8 rounded-xl border border-hairline bg-surface p-6 transition-colors hover:border-white/25"
    >
      <div className="flex flex-col gap-1">
        <span className="text-[13px] font-medium">{study.category}</span>
        <span className="text-[12px] text-dim">{study.period}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="font-display text-[44px] leading-[0.95] tracking-[-0.025em] tabular-nums">
          {study.metric}
        </span>
        <span className="text-[13.5px] leading-[1.4] text-muted-foreground">{study.metricLabel}</span>
      </div>
      <div className="flex items-end justify-between gap-4">
        <Bars study={study} />
        <span className="text-[13px] text-muted-foreground">Read →</span>
      </div>
    </a>
  );
}

export function CaseStudiesFeaturedRail() {
  const picks = rest.slice(0, 3);
  return (
    <section className="shell flex flex-col gap-6 py-20">
      <Reveal variant="rise">
        <div className="flex flex-col gap-5 pb-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="flex flex-col gap-3">
            <Eyebrow>Case studies</Eyebrow>
            <h2 className="font-display max-w-[22ch] text-[clamp(30px,3.6vw,42px)] leading-[1.05] tracking-[-0.01em] text-balance">
              Eight campaigns with post-level receipts
            </h2>
            <p className="max-w-[52ch] text-[15.5px] leading-[1.6] text-muted-foreground">
              Every number is dated and measured from live account analytics.
            </p>
          </div>
          <a
            href="/case-studies"
            className="flex h-11 shrink-0 items-center justify-center rounded-md px-5 text-[14.5px] font-medium whitespace-nowrap text-[#ededed] shadow-[inset_0_0_0_1px_#2a2a2a] transition-colors hover:bg-[#141414]"
          >
            View all {caseStudies.length} case studies
          </a>
        </div>
      </Reveal>
      <Reveal variant="rise" delay={0.06}>
        <FeaturedCard />
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {picks.map((s, i) => (
          <Reveal key={s.slug} variant="rise" delay={0.1 + i * 0.05}>
            <StatCard study={s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* G. Gallery: three image cards, category and one-line story           */
/* ------------------------------------------------------------------ */

export function CaseStudiesGallery() {
  const picks = [featured, ...rest.slice(0, 2)];
  return (
    <section className="shell flex flex-col gap-10 py-20">
      <Reveal variant="rise">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-[clamp(30px,3.6vw,42px)] leading-[1.05] tracking-[-0.01em] text-balance">
              Case studies from real networks.
            </h2>
            <p className="max-w-[60ch] text-[17px] leading-[1.5] text-muted-foreground">
              See how brands across oral care, fitness, dating and edtech grow
              on doublespeed. Every number dated, measured from live analytics.
            </p>
          </div>
          <a
            href="/case-studies"
            className="inline-flex h-11 w-fit shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 text-[14.5px] font-medium whitespace-nowrap text-foreground backdrop-blur transition-colors hover:bg-white/10"
          >
            View all case studies
            <span aria-hidden className="text-muted-foreground">↗</span>
          </a>
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {picks.map((s, i) => (
          <Reveal key={s.slug} variant="rise" delay={0.06 + i * 0.06}>
            <a
              href={caseStudyHref(s.slug)}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-surface md:aspect-[1.4/1]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 via-45% to-black/15" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-6">
                <span className="text-[17px] font-semibold tracking-[-0.01em] text-white">
                  {s.category}
                </span>
                <span className="max-w-[34ch] text-[15px] leading-[1.45] text-white/75">
                  {s.title}
                </span>
                <span className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-[26px] leading-none tracking-[-0.02em] text-white">
                    {s.metric}
                  </span>
                  <span className="text-[12.5px] text-white/60">{s.metricLabel}</span>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
