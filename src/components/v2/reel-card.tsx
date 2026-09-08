"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Mosaic resolutions the poster steps through once generation starts. */
const STEPS = [5, 8, 12, 18, 28, 44, 72];
/** Share of the run spent on the blank GENERATING state before the mosaic. */
const BLANK = 0.42;

/**
 * A reel card that generates the way the terminal footage does. It waits as
 * a hatched slot, turns black with a date chip, a GENERATING label and a
 * progress bar, then the post arrives as a coarse mosaic that sharpens step
 * by step and crossfades into the real image as the border turns green.
 * Runs once it scrolls into view, staggered by `delay`; reduced motion
 * skips straight to the finished card.
 */
export function ReelCard({
  src,
  delay = 0,
  duration = 2200,
  daysAgo = 0,
  className,
  children,
}: {
  src: string;
  /** ms after entering view before this card starts generating. */
  delay?: number;
  /** ms from the first GENERATING frame to the finished post. */
  duration?: number;
  /** Drives the date chip, counted back from today. */
  daysAgo?: number;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<
    "idle" | "generating" | "resolving" | "ready"
  >("idle");
  const [date, setDate] = useState("");

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const t = window.setTimeout(
      () =>
        setDate(
          `${d.getMonth() + 1}/${String(d.getDate()).padStart(2, "0")}/${String(d.getFullYear()).slice(2)}`,
        ),
      0,
    );
    return () => clearTimeout(t);
  }, [daysAgo]);

  useEffect(() => {
    const el = ref.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) =>
      timers.push(window.setTimeout(fn, ms));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      later(() => setPhase("ready"), 0);
      return () => timers.forEach(clearTimeout);
    }

    const img = new Image();
    img.src = src;

    // Draw the poster at `cols` pixels across and let the canvas scale it up
    // with nearest neighbour, so each step is a visibly finer mosaic.
    const drawMosaic = (cols: number) => {
      const rect = el.getBoundingClientRect();
      const rows = Math.max(1, Math.round((cols * rect.height) / rect.width));
      canvas.width = cols;
      canvas.height = rows;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (cols - w) / 2, (rows - h) / 2, w, h);
    };

    const run = () => {
      setPhase("generating");
      const blank = duration * BLANK;
      const stepMs = (duration - blank) / STEPS.length;
      later(() => setPhase("resolving"), blank);
      STEPS.forEach((cols, i) =>
        later(() => drawMosaic(cols), blank + i * stepMs),
      );
      later(() => setPhase("ready"), duration);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        later(() => {
          if (img.complete) run();
          else img.onload = run;
        }, delay);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [src, delay, duration]);

  return (
    <figure
      ref={ref}
      data-phase={phase}
      className={cn(
        "reel-card relative m-0 aspect-[9/14] overflow-hidden rounded-xl bg-[#070707] ring-1 ring-inset ring-white/10",
        className,
      )}
      style={{ "--gen": `${duration}ms` } as React.CSSProperties}
    >
      {/* The post's date, carried through generation and onto the result. */}
      <span className="reel-date absolute top-2.5 left-2.5 z-10 flex items-center gap-1 rounded-[4px] border border-white/15 bg-black/70 px-1.5 py-[3px] font-mono text-[9px] tracking-[0.06em] text-white/80 backdrop-blur-sm">
        <svg viewBox="0 0 10 10" className="h-2 w-2 fill-none stroke-current stroke-[1.2]" aria-hidden>
          <rect x="1" y="2" width="8" height="7" rx="1" />
          <path d="M1 4.5h8M3.5 1v2M6.5 1v2" />
        </svg>
        <span suppressHydrationWarning>{date}</span>
      </span>

      {/* Finished post. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="reel-img absolute inset-0 h-full w-full object-cover"
      />
      <div className="reel-chrome absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/90 to-transparent p-3 pt-10 text-left">
        {children}
      </div>

      {/* Waiting slot: the diagonal hatch from the footage. */}
      <div className="reel-hatch absolute inset-0" />

      {/* Generation layer: mosaic canvas, date chip, label, progress. */}
      <div className="reel-gen absolute inset-0 bg-[#070707]">
        <canvas
          ref={canvasRef}
          className="reel-mosaic absolute inset-0 h-full w-full [image-rendering:pixelated]"
        />
        <span className="reel-label absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-mono text-[11.5px] font-medium tracking-[0.12em] text-white uppercase">
          Generating
        </span>
        <div className="absolute inset-x-3 bottom-3 h-[2px] overflow-hidden rounded-full bg-white/15">
          <div className="reel-bar h-full w-full origin-left rounded-full bg-white" />
        </div>
      </div>
    </figure>
  );
}
