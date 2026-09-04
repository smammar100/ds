"use client";

import Script from "next/script";
import type { CSSProperties, ElementType } from "react";

/**
 * Wrapper around the original <footer-fx> custom element (public/footer-fx.js),
 * ported verbatim from the design canvas. It paints a dithered canvas field:
 * "assemble" scatters a wordmark into place as the band scrolls in, and
 * "image-clear" dithers a video with a true-colour window under the pointer.
 *
 * The element upgrades itself whenever the script finishes loading, so the
 * script tag does not need to precede the markup. Attributes are passed through
 * verbatim (including hyphenated ones like `fit-height`) because the element
 * reads them with getAttribute.
 */
const FooterFxElement = "footer-fx" as unknown as ElementType;

type FooterFxProps = {
  style?: CSSProperties;
  className?: string;
} & Record<string, unknown>;

export function FooterFx({ style, ...attrs }: FooterFxProps) {
  return (
    <>
      <Script src="/footer-fx.js" strategy="afterInteractive" />
      <FooterFxElement {...attrs} style={style} />
    </>
  );
}
