import { Reveal } from "./reveal";
import { faqs } from "@/content/landing";

export function Faq() {
  return (
    <section id="faq" className="shell flex flex-col items-center gap-10 pt-30">
      <Reveal variant="rise">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-display text-[clamp(32px,4vw,44px)] leading-[1.05] tracking-[-0.01em]">
            Frequently asked
          </h2>
          <p className="text-[15px] leading-[1.6] text-dim">
            Questions from audit calls this quarter.
          </p>
        </div>
      </Reveal>

      <div className="flex w-full max-w-[680px] flex-col gap-7">
        {faqs.map((faq) => (
          <div key={faq.q} className="flex flex-col gap-3">
            <Reveal variant="right">
              <div className="ml-auto w-fit max-w-[78%] rounded-[14px_14px_4px_14px] bg-[#141414] px-[18px] py-3.5 text-base leading-[1.5]">
                {faq.q}
              </div>
            </Reveal>
            <Reveal variant="left" delay={0.1}>
              <div className="grid max-w-[88%] grid-cols-[28px_1fr] items-start gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#ededed] text-[13px] font-semibold text-black">
                  &raquo;
                </span>
                <div className="flex flex-col gap-2.5 pt-[3px] text-base leading-[1.6] text-[#c9c9c9]">
                  {faq.a.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                  {faq.list.map((item, i) => (
                    <p key={item} className="grid grid-cols-[auto_1fr] gap-2.5">
                      <span className="text-dim tabular-nums">{i + 1}.</span>
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
