import localFont from "next/font/local";
import { Fragment_Mono } from "next/font/google";

/*
 * The three faces the product itself ships, copied over from the terminal app
 * so the marketing site and the app read as one product. Weights above
 * semibold are deliberately left out: the design system never sets them.
 *
 * next/font requires every value here to be a written literal, so the entries
 * cannot be generated from a helper.
 */

export const neueMontreal = localFont({
  src: [
    { path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-Thin.woff", weight: "100", style: "normal" },
    { path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-ThinItalic.woff", weight: "100", style: "italic" },
    { path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-Light.woff", weight: "300", style: "normal" },
    { path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-LightItalic.woff", weight: "300", style: "italic" },
    { path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-Regular.woff", weight: "400", style: "normal" },
    { path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-Italic.woff", weight: "400", style: "italic" },
    { path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-Book.woff", weight: "450", style: "normal" },
    { path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-BookItalic.woff", weight: "450", style: "italic" },
    { path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-Medium.woff", weight: "500", style: "normal" },
    { path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-MediumItalic.woff", weight: "500", style: "italic" },
    { path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-Semibold.woff", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

/**
 * PP Editorial Old, the display serif, in the single Ultralight cut the design
 * system uses. The woff2 is the name-table-patched build from the app, so iOS
 * Safari resolves the family rather than dropping to a system serif.
 */
export const editorialOld = localFont({
  src: [
    {
      path: "../../public/fonts/PPEditorialOld/PPEditorialOld-Ultralight.woff2",
      weight: "200",
      style: "normal",
    },
  ],
  variable: "--font-editorial",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono-face",
  display: "swap",
});
