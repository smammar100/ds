const NAV = [
  { href: "#capabilities", label: "Platform" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#login", label: "Log in" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-doublespeed.svg"
            alt="doublespeed"
            className="block h-5 w-auto"
          />
        </a>
        <nav className="flex items-center gap-5 sm:gap-7">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden text-[13.5px] text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#book"
            className="rounded bg-[#ededed] px-4 py-2 text-[13.5px] font-medium text-black transition-colors hover:bg-white"
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}
