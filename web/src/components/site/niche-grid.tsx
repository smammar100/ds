"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COUNT = 36;

/**
 * Perspective image field that sweeps past as the section scrolls, with the
 * section headline pinned over it. Reduced-motion viewers get a static grid.
 */
export function NicheGrid() {
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
    <section id="capabilities" ref={sectionRef} className="relative mt-30">
      <div
        className="grid w-full place-items-center overflow-hidden py-8"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={wrapRef}
          className="grid w-full grid-cols-4 gap-[2vw]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {Array.from({ length: COUNT }, (_, i) => (
            <div
              key={i}
              className="ng-item relative grid aspect-[1.5] w-full place-items-center overflow-hidden rounded-lg"
            >
              <div
                className="ng-inner relative h-[200%] w-[200%] bg-cover bg-center"
                style={{ backgroundImage: `url(/grid/${i + 1}.jpg)` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[220px] bg-gradient-to-b from-transparent to-black" />

      <div className="pointer-events-none absolute inset-0 z-[2]">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-4 px-8 text-center">
          <h2 className="font-display max-w-[20ch] text-[clamp(40px,7vw,96px)] leading-[0.98] tracking-[-0.02em]">
            An agent in every niche
          </h2>
          <p className="max-w-[52ch] text-[17px] leading-[1.6] text-muted-foreground">
            Our hosted accounts interact with relevant content around your
            product and post daily to drive attention.
          </p>
        </div>
      </div>
    </section>
  );
}

