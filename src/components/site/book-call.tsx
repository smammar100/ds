"use client";

import { Reveal } from "./reveal";
import { pressLogos } from "@/content/landing";
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

export function BookCall() {
  return (
    <section id="book" className="shell grid gap-8 pt-20 sm:pt-30 lg:grid-cols-12">
      <div className="flex min-w-0 flex-col gap-9 lg:col-span-6 lg:pr-8">
        <Reveal variant="rise">
          <div className="flex flex-col gap-3.5">
            <h2 className="font-display text-[clamp(32px,4vw,44px)] leading-[1.05] tracking-[-0.01em]">
              Book a call
            </h2>
            <p className="max-w-[40ch] text-[16.5px] leading-[1.6] text-muted-foreground">
              Schedule a 30 minute audit. We&apos;ll map your niche and show
              what agentic accounts would post this week.
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
            <a href="#terms" className="text-muted-foreground underline">
              terms
            </a>
            .
          </span>
        </form>
      </div>

      <div className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 lg:col-span-6">
        <div className="col-span-full flex flex-col gap-[18px] rounded-[10px] bg-surface p-7">
          <span className="text-[13px] text-dim">Covered by</span>
          <div className="flex min-w-0 flex-wrap items-center gap-x-7 gap-y-5 opacity-70">
            {pressLogos.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                style={{ height: logo.h - 5 }}
                className="w-auto"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 rounded-[10px] bg-surface p-7">
          <span className="font-display text-[44px] leading-none tracking-[-0.02em]">
            2x
          </span>
          <span className="text-[14.5px] leading-[1.5] text-muted-foreground">
            daily posting per managed account, reviewed by you before it ships.
          </span>
        </div>

        <div className="flex flex-col gap-2.5 rounded-[10px] bg-surface p-7">
          <span className="font-display text-[44px] leading-none tracking-[-0.02em]">
            US
          </span>
          <span className="text-[14.5px] leading-[1.5] text-muted-foreground">
            device traffic and posting. Real phones, not emulators or APIs.
          </span>
        </div>

        <div className="col-span-full flex flex-col gap-3 rounded-[10px] bg-surface p-7">
          <p className="text-[17px] leading-[1.5] tracking-[-0.01em]">
            &ldquo;Synthetic creators. Real results.&rdquo;
          </p>
          <span className="text-[13px] text-dim">
            What every call ends with: your niche, mapped, and a week of drafts
            to react to.
          </span>
        </div>
      </div>
    </section>
  );
}
