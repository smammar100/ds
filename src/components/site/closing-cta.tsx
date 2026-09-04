import { Reveal } from "./reveal";
import { FooterFx } from "./footer-fx";

const DOTS: Array<[number, number, number]> = [
  [2, 2, 0],
  [5, 5, 0.05],
  [8, 8, 0.1],
  [5, 11, 0.15],
  [2, 14, 0.2],
  [6, 2, 0.05],
  [9, 5, 0.1],
  [12, 8, 0.15],
  [9, 11, 0.2],
  [6, 14, 0.25],
];

/** Five staggered dot-chevrons that slide out of the button on hover. */
function Chevrons() {
  return (
    <>
      {[0, 1, 2, 3, 4].map((k) => (
        <svg
          key={k}
          width={14}
          height={16}
          viewBox="0 0 14 16"
          aria-hidden
          className="shrink-0 overflow-visible"
        >
          <g fill="#0a0a0a">
            {DOTS.map(([cx, cy, d], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={1}
                className="ds-dot"
                style={{ animationDelay: `${k * 0.12 + d}s` }}
              />
            ))}
          </g>
        </svg>
      ))}
    </>
  );
}

export function ClosingCta() {
  return (
    <section className="shell pt-20 sm:pt-30">
      <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-xl bg-black">
        <FooterFx
          variant="image-clear"
          src="/assets/eyes-loop.mp4"
          cell="4"
          gain="2.4"
          radius="190"
          style={{ position: "absolute", inset: 0 }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_50%_50%,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0)_100%)]" />

        <Reveal
          variant="rise"
          className="relative flex flex-col items-center gap-5 px-8 py-24 text-center"
        >
          <h2 className="font-display max-w-[20ch] text-[clamp(38px,4.6vw,64px)] leading-[1.02] tracking-[-0.02em]">
            Synthetic creators. Real results.
          </h2>
          <p className="max-w-[52ch] text-[17px] leading-[1.6] text-[#e5e5e5]">
            It&apos;s never been easier to create and deploy content without
            human cost. Stay up to date with changes and strategies in our
            community.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 pt-2">
            <a
              className="ds-chevbtn relative inline-flex h-11 w-[172px] items-center overflow-hidden rounded-lg border border-[#333] bg-gradient-to-b from-[#141414] to-[#0a0a0a] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              href="#discord"
            >
              <span className="ds-chevlabel absolute right-4 z-[2] text-[14.5px] font-medium tracking-[-0.01em] text-[#ededed]">
                Join Discord
              </span>
              <span
                aria-hidden
                className="ds-chevpanel absolute top-1 bottom-1 left-1 z-[1] flex w-9 items-center gap-2.5 overflow-hidden rounded-[5px] bg-gradient-to-b from-white to-[#ededed] pr-2.5 pl-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_2px_4px_rgba(0,0,0,0.25)] transition-[width] duration-200 ease-[cubic-bezier(.65,0,.35,1)]"
              >
                <Chevrons />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
