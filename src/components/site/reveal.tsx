"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "rise" | "fade" | "left" | "right" | "scale";

const HIDDEN: Record<Variant, string> = {
  rise: "translateY(28px)",
  fade: "none",
  left: "translateX(-28px)",
  right: "translateX(28px)",
  scale: "translateY(20px) scale(0.985)",
};

/**
 * Scroll-in reveal driven by IntersectionObserver rather than by scroll
 * position maths, so it cannot be thrown off by the page height shifting as
 * videos and canvases load.
 *
 * The element renders visible on the server and is only hidden once the
 * observer is actually attached, so a failed or blocked script leaves the
 * content readable instead of blank.
 *
 * Under reduced motion the reveal keeps its fade but drops the travel: an
 * opacity change carries no vestibular risk, while the movement does.
 */
export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReduced(prefersReduced);
    setArmed(true);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = armed && !shown;
  const duration = reduced ? 500 : 850;

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden && !reduced ? HIDDEN[variant] : "none",
        transition: armed
          ? `opacity ${duration}ms cubic-bezier(0.22,0.61,0.36,1) ${delay}s, transform ${duration}ms cubic-bezier(0.22,0.61,0.36,1) ${delay}s`
          : undefined,
        willChange: hidden ? "opacity, transform" : undefined,
      }}
    >
      {children}
    </Tag>
  );
}
