import Image, { type StaticImageData } from "next/image";
import { photos } from "@/assets/photos";
import { stats } from "@/data/site";
import { Reveal, Wipe } from "../reveal";
import { Eyebrow } from "../ui";

function Chip({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <span className="relative mx-[0.12em] inline-block h-[0.78em] w-[1.7em] translate-y-[0.06em] overflow-hidden align-baseline [--cut:10px] chamfer-tr">
      <Image src={src} alt={alt} fill sizes="180px" className="photo-grade object-cover" />
    </span>
  );
}

export function Manifesto() {
  return (
    <section className="survey-grid relative bg-sky text-navy">
      <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-36">
        <div className="grid gap-10 lg:grid-cols-12">
          <Eyebrow index="00" className="text-navy/70 lg:col-span-3">
            Tours &amp; travel
          </Eyebrow>
          <Reveal className="lg:col-span-9">
            <p className="font-display text-[11vw] leading-[0.92] font-bold tracking-[-0.01em] uppercase sm:text-[7.5vw] lg:text-[5.4vw] 2xl:text-[5.6rem]">
              A Nairobi travel desk that plans <Chip src={photos.air} alt="Kenya Airways Dreamliner" /> the flight,
              the visa <Chip src={photos.visa} alt="Passport with border stamps" />, the room and the{" "}
              <span className="font-serif font-normal normal-case text-pink italic">wild</span> part{" "}
              <Chip src={photos.maasaiMara} alt="Wildebeest on a Mara hillside" />, all{" "}
              <span className="text-cyan">from one desk.</span>
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 border-t border-navy/15 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Wipe
              key={s.label}
              delay={i * 0.1}
              className="border-b border-navy/15 py-8 pr-6 odd:border-r odd:border-navy/15 lg:border-r lg:border-b-0 lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <p className="font-display text-6xl leading-none font-black md:text-8xl">
                {s.value}
              </p>
              <p className="mt-3 max-w-[18ch] font-mono text-[0.68rem] tracking-[0.2em] text-navy/65 uppercase">{s.label}</p>
            </Wipe>
          ))}
        </div>
      </div>
    </section>
  );
}
