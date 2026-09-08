import Link from "next/link";
import type { ReactNode } from "react";

/** Shared shell for the legal pages: narrow measure, plain typography. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="shell flex flex-col gap-10 pt-20 pb-32 sm:pt-28">
      <div className="flex flex-col gap-3">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.08em] text-dim uppercase transition-colors hover:text-foreground"
        >
          ← doublespeed
        </Link>
        <h1 className="font-display m-0 text-[clamp(36px,5vw,56px)] leading-[1.02] tracking-[-0.02em]">
          {title}
        </h1>
        <p className="text-sm text-dim">Last updated {updated}</p>
      </div>

      <div className="flex max-w-[68ch] flex-col gap-8 text-[16px] leading-[1.65] text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_h2]:text-[19px] [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_h2]:text-foreground [&_li]:mb-2 [&_section]:flex [&_section]:flex-col [&_section]:gap-3 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </main>
  );
}
