"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { niches } from "@/content/v2";

const COUNT = 36;

/** Reel chrome drawn over a tile: persona pill, caption, action column. */
function ReelChrome({ index }: { index: number }) {
  const n = niches[index % niches.length];
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-end text-left text-white">
      {/* Caption sits in the lower third; the action column hangs to its
          right, and the progress bar gets its own band below both. */}
      <div className="flex items-end justify-between gap-[6%] px-[8%]">
        <div className="flex min-w-0 flex-col gap-[3%] leading-[1.15]">
          <span className="truncate text-[clamp(10px,1.1vw,16px)] font-semibold tracking-[-0.01em]">
            {n.niche}
          </span>
          <span className="truncate text-[clamp(8px,0.8vw,12.5px)] text-white/70 tabular-nums">
            {n.views.replace("/mo", " monthly views")}
          </span>
        </div>
        {/* Heart, comment, share — the column every reel viewer recognises. */}
        <svg
          viewBox="0 0 20 88"
          className="w-[13%] shrink-0 fill-none stroke-white stroke-[1.6]"
          aria-hidden
        >
          <path
            strokeLinejoin="round"
            d="M10 18 4.2 12.4a3.6 3.6 0 0 1 5.1-5.1L10 8l.7-.7a3.6 3.6 0 0 1 5.1 5.1Z"
          />
          <ellipse cx="10" cy="44" rx="7" ry="5.5" />
          <path strokeLinecap="round" d="m6.5 49-1.5 4.5 5-3.2" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 78c1.5-6 6-9 12-8.5M11.5 66l4 3.5-4 3.5"
          />
        </svg>
      </div>
      <div className="mx-[8%] mt-[7%] mb-[7%] h-[2px] rounded-full bg-white/20">
        <div className="h-full w-[38%] rounded-full bg-white/90" />
      </div>
    </div>
  );
}

/**
 * Perspective image field that sweeps past as the section scrolls, with the
 * section headline pinned over it. Reduced-motion viewers get a static grid.
 */
export function NicheGrid({
  reel = false,
  cta = { label: "See pricing", href: "#pricing" },
}: {
  /** Portrait 9:16 tiles with short-form video chrome instead of landscape cards. */
  reel?: boolean;
  cta?: { label: string; href: string };
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;
    // The sweep is scroll-scrubbed, so it only ever moves as fast as the reader
    // scrolls. Reduced motion therefore softens it rather than removing it:
    // less rotation, a shallower Z spread, and much shorter lateral travel.
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const depth = reduced ? { min: -420, max: 60 } : { min: -1600, max: 200 };
    const travel = reduced ? { from: -140, to: 140 } : { from: -1000, to: 500 };

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".ng-item", wrap);
      const inners = gsap.utils.toArray<HTMLElement>(".ng-inner", wrap);

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top bottom+=5%",
            end: "bottom top+=35%",
            scrub: true,
          },
        })
        .set(wrap, { rotationY: reduced ? 10 : 25 })
        .set(items, { z: () => gsap.utils.random(depth.min, depth.max) })
        .fromTo(
          items,
          {
            xPercent: () =>
              gsap.utils.random(travel.from, travel.from / 2),
          },
          { xPercent: () => gsap.utils.random(travel.to / 2, travel.to * 2) },
          0,
        )
        .fromTo(
          inners,
          { scale: reduced ? 1.4 : 2 },
          { scale: reduced ? 0.85 : 0.5 },
          0,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="capabilities" ref={sectionRef} className="relative mt-20 sm:mt-30">
      <div
        className="grid w-full place-items-center overflow-hidden py-8"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={wrapRef}
          className={cn(
            "grid w-full gap-[2vw]",
            reel ? "grid-cols-4 sm:grid-cols-6" : "grid-cols-3 sm:grid-cols-4",
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {Array.from({ length: COUNT }, (_, i) => (
            <div
              key={i}
              className={cn(
                "ng-item relative grid w-full place-items-center overflow-hidden",
                reel
                  ? "aspect-[9/16] rounded-2xl ring-1 ring-white/15 sm:rounded-3xl"
                  : "aspect-[1.5] rounded-lg",
              )}
            >
              <div
                className="ng-inner relative h-[200%] w-[200%] bg-cover bg-center"
                style={{ backgroundImage: `url(/grid/${i + 1}.jpg)` }}
              />
              {reel && (
                <>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                  <ReelChrome index={i} />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[220px] bg-gradient-to-b from-transparent to-black" />

      <div className="pointer-events-none absolute inset-0 z-[2]">
        {/* Scrim keeps the headline legible where tiles sit behind it. On
            narrow screens the section is short, so the sweep never fully
            clears the centre and the text would otherwise fight the images. */}
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-4 bg-[radial-gradient(65%_42%_at_50%_50%,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_45%,rgba(0,0,0,0)_100%)] px-6 text-center sm:px-8">
          <h2 className="font-display max-w-[20ch] text-[clamp(40px,7vw,96px)] leading-[0.98] tracking-[-0.02em]">
            An agent in every niche
          </h2>
          <p className="max-w-[52ch] text-[17px] leading-[1.6] text-muted-foreground">
            Our hosted accounts interact with relevant content around your
            product and post daily to drive attention.
          </p>
          {/* The section is the clearest promise on the page and used to end
              on dead air; the scrim is click-through, so the link opts back
              into pointer events on its own. */}
          <a
            href={cta.href}
            className="pointer-events-auto mt-3 flex h-[46px] items-center justify-center rounded bg-[#ededed] px-6 text-[14.5px] font-medium text-black transition-colors hover:bg-white"
          >
            {cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}

