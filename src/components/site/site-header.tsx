const NAV = [{ href: "#login", label: "Log in" }];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-3 sm:gap-6">
        <a href="#top" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-doublespeed.svg"
            alt="doublespeed"
            className="block h-5 w-auto"
          />
        </a>
        <nav className="flex shrink-0 items-center gap-4 sm:gap-7">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13.5px] whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#book"
            className="whitespace-nowrap rounded bg-[#ededed] px-4 py-2 text-[13.5px] font-medium text-black transition-colors hover:bg-white"
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}
