import Image from "next/image";
import { photos } from "@/assets/photos";
import { destinations } from "@/data/destinations";
import { Marquee } from "../marquee";
import { SplitLine } from "../reveal";
import { CropMarks } from "../ui";
import { HeroLiveCard } from "./hero-live-card";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      <Image
        src={photos.hero}
        alt="Hot-air balloons drifting over the Maasai Mara at dawn"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="photo-grade object-cover object-[60%_center]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />

      {/* column guides */}
      <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto grid max-w-[1600px] grid-cols-4 px-4 sm:px-8">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className="border-l border-bone/[0.07] last:border-r" />
        ))}
      </div>

      {/* scanning line */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 animate-scan bg-gradient-to-b from-transparent via-volt/[0.04] to-transparent" />

      {/* equator */}
      <div aria-hidden className="absolute inset-x-0 top-[58%] text-laterite">
        <div className="dashed-line w-full" />
        <p className="absolute top-2 right-4 font-mono text-[0.65rem] tracking-[0.3em] sm:right-8">0°00′00″ — EQUATOR</p>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 pt-28 pb-10 sm:px-8 md:pt-32">
        <div className="flex items-start justify-between gap-6 font-mono text-[0.65rem] tracking-[0.3em] text-bone/70 uppercase">
          <p>
            FT/26 — Expedition system
            <br />
            <span className="text-dust">Kenya · East Africa</span>
          </p>
          <p className="hidden text-right sm:block">
            {destinations.length} destinations
            <br />
            <span className="text-dust">4.6°N → 4.7°S</span>
          </p>
        </div>

        <div className="mt-auto grid items-end gap-10 lg:grid-cols-12">
          <h1 className="lg:col-span-8">
            <span className="block font-mono text-xs tracking-[0.4em] text-volt uppercase">
              <SplitLine text="Safaris · Treks · Coast" />
            </span>
            <span className="mt-4 block font-display text-[27vw] leading-[0.78] font-black tracking-[-0.02em] uppercase sm:text-[22vw] lg:text-[15.5vw] 2xl:text-[15rem]">
              <SplitLine text="Kenya" delay={0.1} />
            </span>
            <span className="mt-2 flex flex-wrap items-baseline gap-x-4 text-[11vw] leading-[0.9] sm:text-[8vw] lg:text-[5.6vw] 2xl:text-[5.6rem]">
              <span className="font-serif text-bone/80 italic">
                <SplitLine text="on the" delay={0.3} />
              </span>
              <span className="font-display font-black text-laterite uppercase">
                <SplitLine text="zero line." delay={0.42} />
              </span>
            </span>
          </h1>

          <div className="relative lg:col-span-4">
            <HeroLiveCard />
            <CropMarks className="-m-3 text-bone/50" />
          </div>
        </div>
      </div>

      <Marquee
        duration={55}
        className="relative border-y border-bone/10 bg-ink/80 py-4 font-display text-2xl font-bold tracking-wide text-bone/80 uppercase backdrop-blur-sm md:text-3xl"
        separator={<span className="text-laterite">◆</span>}
        items={destinations.map((d) => (
          <span key={d.slug} className="inline-flex items-baseline gap-3">
            {d.name}
            <span className="font-mono text-[0.6rem] tracking-[0.3em] text-dust">{d.code}</span>
          </span>
        ))}
      />
    </section>
  );
}
