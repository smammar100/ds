import { press } from "@/content/v2";
import { cn } from "@/lib/utils";

/*
 * Three treatments of the press row. Each keeps every logo linked (the
 * hrefs are still TODO in content) and every mark at full contrast.
 */

function Logo({ logo, className }: { logo: (typeof press)[number]; className?: string }) {
  return (
    <a
      href={logo.href}
      aria-label={`${logo.alt} coverage of doublespeed`}
      className={cn("flex items-center opacity-85 transition-opacity hover:opacity-100", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.alt}
        style={{ maxHeight: logo.h }}
        className="w-auto max-w-full object-contain"
      />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* A. Tiles (Slash / Cosmos): one bordered tile per publication          */
/* ------------------------------------------------------------------ */

export function PressTiles() {
  return (
    <section className="shell flex flex-col items-center gap-6 py-14">
      <span className="font-mono text-[11px] tracking-[0.08em] text-dim uppercase">
        As seen in
      </span>
      <ul className="m-0 grid w-full list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4">
        {press.map((logo) => (
          <li key={logo.alt}>
            <Logo
              logo={logo}
              className="h-[88px] justify-center rounded-xl border border-hairline bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0)_60%)] bg-surface px-6 transition-[border-color,opacity] hover:border-white/20"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B. Strip (Notion / Giga): label left, logos in a tight divided row    */
/* ------------------------------------------------------------------ */

export function PressStrip() {
  return (
    <section className="shell py-10">
      <div className="flex flex-col items-center gap-5 border-y border-hairline py-5 sm:flex-row sm:gap-0">
        <span className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-dim uppercase sm:pr-8">
          Press
        </span>
        <ul className="m-0 grid w-full list-none grid-cols-2 gap-y-5 p-0 sm:flex sm:flex-1 sm:items-center sm:justify-around sm:divide-x sm:divide-hairline">
          {press.map((logo) => (
            <li key={logo.alt} className="flex h-7 items-center justify-center sm:flex-1 sm:px-6">
              <Logo logo={logo} className="h-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* C. Marquee (Giga / Voiceflow): logos drift, fade at the edges         */
/* ------------------------------------------------------------------ */

export function PressMarquee() {
  const set = [...press, ...press, ...press];
  return (
    <section className="flex flex-col items-center gap-6 py-14">
      <p className="m-0 text-[15px] leading-[1.5] text-muted-foreground">
        As seen in press
      </p>
      <div
        className="press-marquee w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)]"
        aria-label="Press coverage"
      >
        <ul className="press-track m-0 flex w-max list-none items-center gap-20 p-0 pr-20">
          {set.map((logo, i) => (
            <li key={i} className="flex h-8 shrink-0 items-center" aria-hidden={i >= press.length}>
              <Logo logo={logo} className="h-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
