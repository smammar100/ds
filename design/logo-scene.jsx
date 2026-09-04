// logo-scene.jsx — doublespeed logo reveal. One tree, rendered from T.
(function () {
  // Resolve engine globals lazily: sibling files load in parallel, so they may not exist at parse time.
  const W = () => window;
  const MOTION = {
    enter: (from, to, start, end) => W().animate({ from, to, start, end, ease: W().Easing.easeOutExpo }),
    draw: (from, to, start, end) => W().animate({ from, to, start, end, ease: W().Easing.easeInOutCubic }),
    pop: (from, to, start, end) => W().animate({ from, to, start, end, ease: W().Easing.easeOutBack }),
  };

  // Deterministic pseudo-random so scatter is stable frame to frame.
  const rnd = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };

  // Bayer-ish dot field as an SVG pattern; density driven by T.
  function DitherField({ T, CUES, total }) {
    const inA = MOTION.enter(0, 1, 0, 0.9)(T);
    const outA = MOTION.draw(1, 0, CUES.Wordmark - 0.2, CUES.Wordmark + 1.2)(T);
    const loopBack = MOTION.enter(0, 0.35, total - 0.8, total)(T);
    const a = Math.max(inA * outA * 0.55, loopBack);
    const drift = (T * 6) % 8;
    return (
      <svg width="1920" height="1080" style={{ position: "absolute", inset: 0, opacity: a }}>
        <defs>
          <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform={`translate(${drift} ${drift * 0.5})`}>
            <rect x="1" y="1" width="2" height="2" fill="#ededed" />
            <rect x="5" y="5" width="2" height="2" fill="#ededed" opacity="0.5" />
          </pattern>
          <radialGradient id="vig" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="vigm"><rect width="1920" height="1080" fill="url(#vig)" /></mask>
        </defs>
        <rect width="1920" height="1080" fill="url(#dots)" mask="url(#vigm)" />
      </svg>
    );
  }

  // Three chevrons: each draws tip-first, then the trio pulses in a wave.
  function Mark({ T, CUES, x, y, scale }) {
    const paths = ["M0 0l5 6-5 6", "M7 0l5 6-5 6", "M14 0l5 6-5 6"];
    return (
      <svg viewBox="0 0 22 12" width={22 * scale} height={12 * scale} style={{ position: "absolute", left: x, top: y, overflow: "visible" }}>
        {paths.map((d, i) => {
          const t0 = CUES.Chevrons + i * 0.22;
          const len = MOTION.draw(0, 1, t0, t0 + 0.55)(T);
          const snap = MOTION.pop(1.6, 1, t0 + 0.3, t0 + 0.9)(T);
          const wave = T > CUES.Wordmark ? 0.55 + 0.45 * Math.max(0, Math.sin((T - CUES.Wordmark) * 4 - i * 0.9)) : 1;
          return (
            <path key={i} d={d} fill="none" stroke="#ededed" strokeWidth={1.6} strokeLinecap="square"
              pathLength="1" strokeDasharray="1" strokeDashoffset={1 - len}
              opacity={wave}
              style={{ transformOrigin: `${i * 7 + 2.5}px 6px`, transform: `scale(${snap})` }} />
          );
        })}
      </svg>
    );
  }

  // Wordmark: letters assemble out of scatter, tracking tightens as they land.
  function Wordmark({ T, CUES, x, y, size }) {
    const word = "doublespeed".split("");
    return (
      <div style={{ position: "absolute", left: x, top: y, display: "flex", fontFamily: "'Geist', system-ui, sans-serif", fontWeight: 600, fontSize: size, letterSpacing: "-0.03em", color: "#ededed", lineHeight: 1, overflow: "visible", whiteSpace: "nowrap" }}>
        {word.map((ch, i) => {
          const t0 = CUES.Wordmark + i * 0.06;
          const p = MOTION.enter(0, 1, t0, t0 + 0.9)(T);
          const dx = (rnd(i, 1) - 0.5) * 160 * (1 - p);
          const dy = (rnd(i, 2) - 0.5) * 120 * (1 - p);
          const blur = (1 - p) * 14;
          return (
            <span key={i} style={{ display: "inline-block", opacity: p, transform: `translate(${dx}px, ${dy}px)`, filter: `blur(${blur}px)` }}>{ch}</span>
          );
        })}
      </div>
    );
  }

  function Tagline({ T, CUES }) {
    const words = ["Automating", "Attention."];
    return (
      <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", gap: 22, fontFamily: "'moret-variable','Bodoni Moda',serif", fontSize: 88, lineHeight: 1, letterSpacing: "-0.02em", color: "#ededed" }}>
        {words.map((w, i) => {
          const t0 = CUES.Tagline + i * 0.28;
          const y = MOTION.enter(40, 0, t0, t0 + 1.0)(T);
          const o = MOTION.enter(0, 1, t0, t0 + 0.8)(T);
          return <span key={i} style={{ display: "inline-block", overflow: "hidden" }}><span style={{ display: "inline-block", transform: `translateY(${y}px)`, opacity: o }}>{w}</span></span>;
        })}
      </div>
    );
  }

  // Scan bar: one pass across the lockup as the wordmark lands.
  function Scan({ T, CUES }) {
    const x = MOTION.draw(-300, 2200, CUES.Wordmark + 0.4, CUES.Wordmark + 1.6)(T);
    const o = T > CUES.Wordmark + 0.3 && T < CUES.Wordmark + 1.7 ? 0.5 : 0;
    return <div style={{ position: "absolute", top: 0, bottom: 0, left: x, width: 140, opacity: o, background: "linear-gradient(90deg, rgba(237,237,237,0), rgba(237,237,237,0.9), rgba(237,237,237,0))", mixBlendMode: "screen", filter: "blur(6px)" }} />;
  }

  function LogoPiece() {
    const { T, CUES, authoredTotal } = W().useComposition();
    // Lockup geometry: mark + wordmark centred; the whole group eases up to make room for the tagline.
    const groupY = MOTION.draw(0, -70, CUES.Tagline - 0.2, CUES.Tagline + 0.9)(T);
    const groupS = MOTION.draw(1, 0.92, CUES.Tagline - 0.2, CUES.Tagline + 0.9)(T);
    const fade = MOTION.draw(1, 0, authoredTotal - 0.6, authoredTotal)(T);
    const markScale = 9;
    const wordSize = 168;
    const markW = 22 * markScale;
    const gap = 44;
    const wordW = wordSize * 0.52 * 11; // approx advance for Geist 600
    const totalW = markW + gap + wordW;
    const left = (1920 - totalW) / 2;
    const top = 470;
    return (
      <div style={{ position: "absolute", inset: 0, background: "#000", overflow: "hidden", opacity: fade }}>
        <DitherField T={T} CUES={CUES} total={authoredTotal} />
        <div style={{ position: "absolute", inset: 0, transform: `translateY(${groupY}px) scale(${groupS})`, transformOrigin: "50% 52%" }}>
          <Mark T={T} CUES={CUES} x={left} y={top + 24} scale={markScale} />
          <Wordmark T={T} CUES={CUES} x={left + markW + gap} y={top - 28} size={wordSize} />
          <Scan T={T} CUES={CUES} />
        </div>
        <Tagline T={T} CUES={CUES} />
      </div>
    );
  }

  function LogoApp() {
    const useTweaks = window.useTweaks, CompositionStage = window.CompositionStage, TweaksPanel = window.TweaksPanel, TweakSection = window.TweakSection, TweakToggle = window.TweakToggle;
    const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <CompositionStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#000">
          <LogoPiece />
        </CompositionStage>
        <TweaksPanel>
          <TweakSection label="Editor" />
          <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak("motionEditor", v)} />
        </TweaksPanel>
      </div>
    );
  }

  window.LogoApp = LogoApp;
})();
