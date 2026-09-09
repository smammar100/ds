"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
 * Three animated treatments of the "real US phones" illustration. All three
 * are drawn from the site's own vocabulary (mono eyebrows, hairlines, the
 * white-on-black dither, the green posting dot) and none use imagery.
 * Each respects reduced motion by settling into its final frame.
 */

const GREEN = "#9be36a";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const t = window.setTimeout(() => setReduced(mq.matches), 0);
    return () => clearTimeout(t);
  }, []);
  return reduced;
}

function Panel({
  label,
  status,
  children,
  className,
}: {
  label: string;
  status: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] flex-col overflow-hidden rounded-xl border border-hairline bg-surface p-5 sm:p-6",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.08em] text-dim uppercase">
          {label}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground tabular-nums">
          {status}
        </span>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* A. Live board: slots wake, warm, post, and log it                     */
/* ------------------------------------------------------------------ */

type SlotState = "idle" | "warming" | "posting";
const STATES: SlotState[] = ["idle", "warming", "posting"];
const HANDLES = [
  "fit.marcus", "med.sara", "style.jo", "food.lena", "tech.ravi", "run.kai",
  "glow.mia", "home.dee", "trip.ash", "pet.noa", "read.eli", "art.zoe",
];

export function FleetLive() {
  const reduced = useReducedMotion();
  const [slots, setSlots] = useState<SlotState[]>(() =>
    Array.from({ length: 12 }, (_, i) => STATES[(i * 7) % 3]),
  );
  const [ticks, setTicks] = useState<SlotState[]>(() =>
    Array.from({ length: 36 }, (_, i) => STATES[(i * 5) % 3]),
  );
  const [log, setLog] = useState<string[]>([
    "slot 03 · posted · 0:14 ago",
    "slot 09 · warming · 0:41 ago",
    "slot 05 · posted · 1:02 ago",
  ]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      const i = Math.floor(Math.random() * 12);
      setSlots((prev) => {
        const next = [...prev];
        next[i] = STATES[(STATES.indexOf(prev[i]) + 1) % 3];
        const verb =
          next[i] === "posting" ? "posted" : next[i] === "warming" ? "warming" : "resting";
        setLog((l) =>
          [`slot ${String(i + 1).padStart(2, "0")} · ${verb} · just now`, ...l].slice(0, 3),
        );
        setTicks((t) => [...t.slice(1), next[i]]);
        return next;
      });
    }, 1100);
    return () => clearInterval(id);
  }, [reduced]);

  const posting = slots.filter((s) => s === "posting").length;

  return (
    <Panel
      label="US device fleet"
      status={
        <>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
          {posting} posting
        </>
      }
    >
      <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-6">
        {slots.map((state, n) => (
          <div
            key={n}
            data-state={state}
            className="fleet-slot relative flex aspect-[9/16] flex-col justify-between overflow-hidden rounded-md border border-[#262626] bg-black p-1.5"
          >
            {/* Screen: dither field that brightens as the slot goes live. */}
            <div className="fleet-screen absolute inset-[3px] top-[10px] rounded-[3px]" />
            <span className="relative h-1 w-3 rounded-full bg-[#2a2a2a]" />
            <div className="relative flex items-end justify-between">
              <span className="font-mono text-[9px] tracking-[0.04em] text-dim">
                {String(n + 1).padStart(2, "0")}
              </span>
              <span className="fleet-dot h-1.5 w-1.5 rounded-full" />
            </div>
            <div className="fleet-bar absolute inset-x-1.5 bottom-[18px] h-[2px] overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full origin-left rounded-full bg-white/80" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto grid gap-6 pt-5 sm:grid-cols-2 sm:items-end">
        <ol className="m-0 flex list-none flex-col gap-1 p-0 font-mono text-[10.5px] text-muted-foreground">
          {log.map((line, i) => (
            <li key={line + i} className={cn("fleet-log", i === 0 && "text-foreground")}>
              {line.replace(/^slot (\d+)/, "@" + HANDLES[Number(line.slice(5, 7)) - 1] + " · slot $1")}
            </li>
          ))}
        </ol>
        {/* The last 36 state changes, newest on the right. */}
        <div className="flex flex-col gap-1.5" aria-hidden>
          <div className="flex h-7 items-end gap-[3px]">
            {ticks.map((st, i) => (
              <span
                key={i}
                className="w-full rounded-[1px] transition-[height,background-color] duration-300"
                style={{
                  height: st === "posting" ? "100%" : st === "warming" ? "55%" : "22%",
                  background: st === "posting" ? GREEN : st === "warming" ? "#5c5c5c" : "#262626",
                }}
              />
            ))}
          </div>
          <span className="font-mono text-[9.5px] tracking-[0.06em] text-dim uppercase">
            activity · last 36 events
          </span>
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* B. Signal: phones on a US carrier, traffic travelling up the lines    */
/* ------------------------------------------------------------------ */

export function FleetSignal() {
  const phones = 7;
  const W = 640;
  const H = 480;
  const towerX = W / 2;
  const towerY = 92;
  const baseY = 350;
  return (
    <Panel
      label="Carrier traffic"
      status={
        <>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
          residential · US
        </>
      }
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full"
        aria-hidden
        style={{ fontFamily: "var(--font-mono-face), ui-monospace, monospace" }}
      >
        <defs>
          <pattern id="dots" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="rgba(255,255,255,0.14)" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#dots)" opacity="0.6" />

        {/* Tower node with expanding pings. */}
        {[0, 1, 2].map((k) => (
          <circle
            key={k}
            cx={towerX}
            cy={towerY}
            r="8"
            fill="none"
            stroke={GREEN}
            strokeWidth="1"
            className="signal-ping"
            style={{ animationDelay: `${k * 0.9}s` }}
          />
        ))}
        <circle cx={towerX} cy={towerY} r="5" fill={GREEN} />
        <text x={towerX} y={towerY - 22} textAnchor="middle" fontSize="11" fill="#a1a1a1" letterSpacing="1">
          US CARRIER
        </text>

        {Array.from({ length: phones }, (_, i) => {
          const x = 60 + (i * (W - 120)) / (phones - 1);
          const cx = x;
          const midY = (towerY + baseY) / 2;
          const d = `M${cx},${baseY} C${cx},${midY} ${towerX},${midY} ${towerX},${towerY + 8}`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <path
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.5"
                strokeDasharray="2 14"
                strokeLinecap="round"
                className="signal-flow"
                style={{ animationDelay: `${-i * 0.55}s`, animationDuration: `${2.6 + (i % 3) * 0.4}s` }}
              />
              {/* Phone */}
              <rect x={cx - 18} y={baseY} width="36" height="64" rx="6" fill="#0b0b0b" stroke="#2a2a2a" />
              <rect x={cx - 14} y={baseY + 8} width="28" height="48" rx="2" fill="url(#dots)" />
              <rect
                x={cx - 14}
                y={baseY + 8}
                width="28"
                height="48"
                rx="2"
                fill={GREEN}
                className="signal-screen"
                style={{ animationDelay: `${i * 0.7}s` }}
              />
              <text x={cx} y={baseY + 84} textAnchor="middle" fontSize="10" fill="#6e6e6e" letterSpacing="1">
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
        <text x={W / 2} y={H - 14} textAnchor="middle" fontSize="10" fill="#6e6e6e" letterSpacing="1.5">
          REAL IMEI · REAL SIM · RESIDENTIAL IP
        </text>
      </svg>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* C. Dither rack: a canvas rack of phones in the site's dot field,      */
/*    with a review sweep that clears the final 5%                       */
/* ------------------------------------------------------------------ */

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export function FleetRack() {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;image-rendering:pixelated";
    host.appendChild(canvas);

    const CELL = 3;
    let w = 0;
    let h = 0;
    let scene: HTMLCanvasElement;
    let sctx: CanvasRenderingContext2D;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const r = host.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width / CELL));
      h = Math.max(1, Math.floor(r.height / CELL));
      canvas.width = w;
      canvas.height = h;
      scene = document.createElement("canvas");
      scene.width = w;
      scene.height = h;
      sctx = scene.getContext("2d")!;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const ROWS = 3;
    const COLS = 8;
    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const t = reduced ? 9999 : (now - start) / 1000;
      const sweep = reduced ? 1 : (t % 7) / 5.2; // 0..1 across, then rests
      sctx.fillStyle = "#000";
      sctx.fillRect(0, 0, w, h);

      // Shelves.
      const padX = w * 0.08;
      const padY = h * 0.12;
      const shelfH = (h - padY * 2) / ROWS;
      const phoneW = (w - padX * 2) / COLS;
      for (let r = 0; r < ROWS; r++) {
        const y = padY + r * shelfH;
        sctx.fillStyle = "rgba(255,255,255,0.28)";
        sctx.fillRect(padX - 4, y + shelfH - 3, w - padX * 2 + 8, 2);
        for (let c = 0; c < COLS; c++) {
          const x = padX + c * phoneW + phoneW * 0.18;
          const pw = phoneW * 0.64;
          const ph = shelfH * 0.72;
          const py = y + shelfH * 0.14;
          const idx = r * COLS + c;
          const xNorm = (x + pw / 2 - padX) / (w - padX * 2);
          const lit = xNorm < sweep;
          // Body
          sctx.fillStyle = lit ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)";
          sctx.fillRect(x, py, pw, ph);
          // Screen
          const flicker = lit ? 0.62 + 0.18 * Math.sin(t * 6 + idx) : 0.08;
          sctx.fillStyle = `rgba(255,255,255,${flicker})`;
          sctx.fillRect(x + 2, py + 3, pw - 4, ph - 8);
        }
      }
      // Sweep line.
      if (sweep < 1.02) {
        const sx = padX + sweep * (w - padX * 2);
        sctx.fillStyle = "rgba(255,255,255,0.95)";
        sctx.fillRect(sx, padY - 6, 1, h - padY * 2 + 12);
      }

      // Ordered dither the scene into the output.
      const src = sctx.getImageData(0, 0, w, h).data;
      const out = ctx.createImageData(w, h);
      const o = out.data;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const lum = src[i] / 255;
          const th = (BAYER[y & 3][x & 3] + 0.5) / 16;
          const on = lum > th;
          o[i] = o[i + 1] = o[i + 2] = on ? 235 : 0;
          o[i + 3] = 255;
        }
      }
      ctx.putImageData(out, 0, 0);

      // Review ticks: every ~20th phone behind the sweep gets a green mark.
      ctx.fillStyle = GREEN;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          if (idx % 5 !== 2) continue;
          const x = padX + c * phoneW + phoneW * 0.18;
          const xNorm = (x + (phoneW * 0.64) / 2 - padX) / (w - padX * 2);
          if (xNorm >= sweep) continue;
          const y = padY + r * shelfH + shelfH * 0.14;
          ctx.fillRect(Math.round(x + phoneW * 0.64 - 4), Math.round(y - 2), 3, 3);
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.remove();
    };
  }, [reduced]);

  return (
    <Panel
      label="Device rack"
      status={
        <>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
          human review · 5%
        </>
      }
    >
      <div ref={hostRef} className="relative -mx-5 -mb-5 flex-1 sm:-mx-6 sm:-mb-6" aria-hidden />
    </Panel>
  );
}
