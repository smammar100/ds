import { FooterFx } from "./footer-fx";

const LINKS = [
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
  { href: "mailto:hello@doublespeed.ai", label: "Contact" },
];

const MARKS = [
  { icon: "/assets/icon-bulk.svg", label: "Bulk content creation" },
  { icon: "/assets/icon-usdevice.svg", label: "U.S. device deployment" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-black">
      {/* Dithered wordmark that assembles out of scattered dots on scroll. */}
      <FooterFx
        variant="assemble"
        text="Automating Attention."
        cell="4"
        fit="0.96"
        fit-height="0.3"
        align="bottom"
        style={{ position: "absolute", inset: 0 }}
      />

      <div className="shell relative grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8 pt-20 sm:pt-30 pb-40 sm:pb-64">
        <div className="flex min-w-0 flex-col items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-doublespeed.svg"
            alt="doublespeed"
            className="block h-5 w-auto"
          />
          <nav className="flex flex-wrap items-baseline gap-x-6 gap-y-2.5">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex min-w-0 flex-col gap-2.5">
          {MARKS.map((mark) => (
            <span
              key={mark.label}
              className="flex items-center justify-start gap-2 sm:justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mark.icon}
                alt=""
                aria-hidden
                className="block h-3.5 w-auto flex-none"
              />
              <span className="font-mono text-[11.5px] tracking-[0.06em] text-muted-foreground uppercase">
                {mark.label}
              </span>
            </span>
          ))}
        </div>

        <span className="text-left text-[12.5px] text-dim sm:text-right">
          © 2026 Doublespeed, Inc.
        </span>
      </div>
    </footer>
  );
}
