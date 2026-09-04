import { Reveal } from "./reveal";

export function ProductDemo() {
  return (
    <section className="shell pt-20 sm:pt-30">
      <Reveal variant="scale">
        <div className="relative aspect-[1420/440] overflow-hidden rounded-xl border border-hairline bg-[#0b0b0b]">
          <video
            src="/assets/product-demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Product walkthrough of the doublespeed terminal"
            className="absolute inset-0 block h-full w-full object-contain"
          />
        </div>
      </Reveal>
    </section>
  );
}
