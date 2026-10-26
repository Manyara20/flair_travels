import Image from "next/image";
import { photos } from "@/assets/photos";
import { site } from "@/data/site";
import { Reveal, Wipe } from "./reveal";
import { ButtonLink, CropMarks } from "./ui";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-32">
        <div className="relative">
          <Wipe>
            <div className="relative min-h-[560px] overflow-hidden text-white [--cut:56px] chamfer">
              <Image
                src={photos.maldives}
                alt="Jetty across a turquoise lagoon in the Maldives"
                fill
                placeholder="blur"
                sizes="(min-width: 1600px) 1536px, 100vw"
                className="photo-grade object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-navy-deep/0" />
              <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-pink/40 to-transparent mix-blend-multiply md:block" />
              <div className="relative flex min-h-[560px] flex-col justify-between p-6 sm:p-12 md:p-16">
                <p className="font-mono text-[0.65rem] tracking-[0.3em] text-cyan uppercase">◆ Travel made easy</p>
                <Reveal>
                  <h2 className="max-w-4xl font-display text-[15vw] leading-[0.85] font-black uppercase sm:text-[10vw] lg:text-[7.5rem]">
                    Plot your <span className="font-serif font-normal normal-case text-blush italic">own</span> line across
                    the map.
                  </h2>
                  <p className="mt-6 max-w-lg text-white/80">
                    Pick destinations, dates and a budget. A planner in Nairobi sends back an itinerary with flights, stays
                    and visas covered. There’s no obligation and no call centre.
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <ButtonLink href="/plan">Open route builder</ButtonLink>
                    <ButtonLink href={site.whatsappHref} variant="light" target="_blank" rel="noreferrer">
                      WhatsApp {site.phone}
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>
            </div>
          </Wipe>
          <CropMarks size={28} className="-m-4 text-pink" />
        </div>
      </div>
    </section>
  );
}
