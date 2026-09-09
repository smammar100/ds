"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * One finished post in the hero's proof reel: the image, a "Posted" date chip,
 * and the account's numbers along the bottom. These are receipts, so the card
 * shows the result rather than the machinery that produced it.
 */
export function ReelCard({
  src,
  daysAgo = 0,
  className,
  children,
}: {
  src: string;
  /** How many days before today this post went out. */
  daysAgo?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  // Resolved on the client: the date is relative to today, so rendering it on
  // the server would bake in the build date and mismatch on hydration.
  const [date, setDate] = useState("");
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    setDate(
      d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    );
  }, [daysAgo]);

  return (
    <figure
      className={cn(
        "relative m-0 aspect-[9/14] overflow-hidden rounded-xl bg-[#070707] ring-1 ring-inset ring-white/10",
        className,
      )}
    >
      <span className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 rounded-[4px] border border-white/15 bg-black/70 px-1.5 py-[3px] font-mono text-[9px] tracking-[0.06em] text-white/80 backdrop-blur-sm">
        <svg
          viewBox="0 0 10 10"
          className="h-2 w-2 fill-none stroke-current stroke-[1.2]"
          aria-hidden
        >
          <rect x="1" y="2" width="8" height="7" rx="1" />
          <path d="M1 4.5h8M3.5 1v2M6.5 1v2" />
        </svg>
        <span suppressHydrationWarning>{date ? `Posted ${date}` : "Posted"}</span>
      </span>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/90 to-transparent p-3 pt-10 text-left">
        {children}
      </div>
    </figure>
  );
}
