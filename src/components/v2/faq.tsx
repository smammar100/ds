"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/site/reveal";
import { faqs } from "@/content/landing";

/** The wireframe's plus-prefixed list, with the answers behind each row. */
export function V2Faq() {
  return (
    <section
      id="faq"
      className="shell flex flex-col items-center gap-8 py-20"
    >
      <Reveal variant="rise">
        <h2 className="font-display text-center text-[clamp(30px,3.6vw,42px)] leading-[1.05] tracking-[-0.01em]">
          Frequently asked
        </h2>
      </Reveal>
      <Reveal variant="rise" delay={0.08} className="w-full max-w-[720px]">
        <Accordion className="gap-2">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.q}
              value={faq.q}
              className="rounded-lg border border-hairline bg-surface not-last:border-b"
            >
              <AccordionTrigger className="px-4 py-3.5 text-[15px] hover:no-underline [&>svg]:hidden!">
                <span className="flex items-baseline gap-3">
                  <span className="text-dim transition-transform group-aria-expanded/accordion-trigger:rotate-45">
                    +
                  </span>
                  {faq.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-[14.5px] leading-[1.6] text-[#c9c9c9]">
                {faq.a.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {faq.list.length > 0 && (
                  <ol className="m-0 flex list-decimal flex-col gap-1.5 pl-5">
                    {faq.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
