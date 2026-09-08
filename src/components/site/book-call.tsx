"use client";

import { Reveal } from "./reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FIELD =
  "h-auto w-full min-w-0 rounded-md border-[#262626] bg-black px-3.5 py-3 text-[14.5px] md:text-[14.5px]";

type Stat = { value: string; label: string };

const DEFAULT_STATS: Stat[] = [
  { value: "2x", label: "posts per managed account, every day" },
  { value: "US", label: "real phones, not emulators or APIs" },
];

/** What the 30 minutes actually produce, so the ask is not a black box. */
const EXPECT = [
  {
    title: "Your niche, mapped",
    body: "Which personas fit your product and what they would post first.",
  },
  {
    title: "A week of drafts to react to",
    body: "Real posts for real accounts, so you judge output, not slides.",
  },
  {
    title: "A plan and a price",
    body: "Account count, posting cadence and the number that goes with it.",
  },
];

export function BookCall({ stats = DEFAULT_STATS }: { stats?: Stat[] }) {
  return (
    <section id="book" className="shell grid gap-8 pt-20 sm:pt-30 lg:grid-cols-12">
      <div className="flex min-w-0 flex-col gap-9 lg:col-span-6 lg:pr-8">
        <Reveal variant="rise">
          <div className="flex flex-col gap-3.5">
            <h2 className="font-display text-[clamp(32px,4vw,44px)] leading-[1.05] tracking-[-0.01em]">
              Book a call
            </h2>
            <p className="max-w-[40ch] text-[16.5px] leading-[1.6] text-muted-foreground">
              A 30 minute doublespeed walkthrough. Come with your niche, leave
              with a plan for what your accounts would post this week.
            </p>
            {/* Printing the floor here is what keeps the calendar full of
                buyers who can actually sign. */}
            <p className="text-[15px] leading-[1.6] font-medium text-foreground">
              Managed plans start at $4,500/mo.
            </p>
          </div>
        </Reveal>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5"
        >
          <div className="flex min-w-0 flex-col gap-2">
            <Label htmlFor="ds-name" className="text-[13px] text-muted-foreground">
              Name
            </Label>
            <Input id="ds-name" required placeholder="Your name" className={FIELD} />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <Label htmlFor="ds-email" className="text-[13px] text-muted-foreground">
              Work email
            </Label>
            <Input
              id="ds-email"
              type="email"
              required
              placeholder="you@company.com"
              className={FIELD}
            />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <Label htmlFor="ds-site" className="text-[13px] text-muted-foreground">
              Website
            </Label>
            <Input
              id="ds-site"
              required
              placeholder="yourproduct.com"
              className={FIELD}
            />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <Label htmlFor="ds-spend" className="text-[13px] text-muted-foreground">
              Monthly marketing spend
            </Label>
            <Select>
              <SelectTrigger
                id="ds-spend"
                className="!h-auto w-full min-w-0 rounded-md border-[#262626] bg-black px-3.5 py-3 text-[14.5px]"
              >
                <SelectValue placeholder="Select a range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-10k">Under $10k</SelectItem>
                <SelectItem value="10k-50k">$10k to $50k</SelectItem>
                <SelectItem value="50k-250k">$50k to $250k</SelectItem>
                <SelectItem value="over-250k">Over $250k</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="col-span-full h-auto rounded-md bg-[#ededed] px-5 py-4 text-[15px] font-medium text-black hover:bg-white"
          >
            See available times
          </Button>
          <span className="col-span-full text-[13px] text-dim">
            By submitting, you agree to our{" "}
            <a href="/terms/" className="text-muted-foreground underline">
              terms
            </a>
            .
          </span>
        </form>
      </div>

      <div className="flex min-w-0 flex-col rounded-[10px] bg-surface lg:col-span-6">
        <div className="flex flex-col gap-5 p-7">
          <span className="font-mono text-[11px] tracking-[0.08em] text-dim uppercase">
            What to expect
          </span>
          <ol className="m-0 flex list-none flex-col gap-4 p-0">
            {EXPECT.map((item, i) => (
              <li key={item.title} className="grid grid-cols-[28px_1fr] gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1a1a1c] font-mono text-[11px] text-muted-foreground tabular-nums shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                  {i + 1}
                </span>
                <span className="flex flex-col gap-0.5 pt-[3px]">
                  <span className="text-[15.5px] font-medium tracking-[-0.01em]">
                    {item.title}
                  </span>
                  <span className="text-[14px] leading-[1.5] text-muted-foreground">
                    {item.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <dl className="m-0 grid grid-cols-1 border-t border-hairline sm:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={
                "flex flex-col gap-1 px-7 py-5" +
                (i > 0 ? " border-t border-hairline sm:border-t-0 sm:border-l" : "")
              }
            >
              <dd className="font-display m-0 text-[30px] leading-none tracking-[-0.02em] tabular-nums">
                {stat.value}
              </dd>
              <dt className="text-[13px] leading-[1.45] text-muted-foreground">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        <figure className="m-0 flex flex-col gap-2 border-t border-hairline p-7">
          <blockquote className="m-0 text-[16.5px] leading-[1.45] tracking-[-0.01em]">
            &ldquo;Synthetic creators. Real results.&rdquo;
          </blockquote>
          <figcaption className="text-[13px] text-dim">
            What every call ends with: your niche, mapped, and a week of drafts
            to react to.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
