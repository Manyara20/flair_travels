import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photos } from "@/assets/photos";
import { CtaBand } from "@/components/cta-band";
import { DestinationIndex } from "@/components/destination-index";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { type Region, destinations, formatCoords } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Eleven Kenyan destinations, from the Maasai Mara and Amboseli to Samburu, Mount Kenya and the Swahili coast.",
};

const regionOrder: Region[] = ["Rift Valley", "Southern Plains", "Central Highlands", "Northern Frontier", "Swahili Coast"];

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="Destination index"
        title={
          <>
            The <span className="font-serif font-normal normal-case text-laterite italic">whole</span> map
          </>
        }
        intro="Savannah, desert, alpine moorland, soda lakes and coral coast, all within one country and all within a short flight of Nairobi."
        aside={
          <p className="font-mono text-[0.65rem] tracking-[0.25em] text-dust uppercase">
            {destinations.length} entries · 5 regions · 0.6°N to 4.3°S
          </p>
        }
      />

      <section className="bg-ink">
        <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 md:py-28">
          <DestinationIndex items={destinations} />
        </div>
      </section>

      {regionOrder.map((region, r) => {
        const items = destinations.filter((d) => d.region === region);
        return (
          <section key={region} className="border-t border-bone/10 bg-ink">
            <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 md:py-20">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <Eyebrow index={`R${r + 1}`} className="text-bone/60">
                    Region
                  </Eyebrow>
                  <h2 className="mt-4 font-display text-5xl font-black uppercase md:text-7xl">{region}</h2>
                </div>
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-dust uppercase">{items.length} destinations</p>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((d, i) => (
                  <Reveal key={d.slug} delay={i * 0.08}>
                    <Link href={`/destinations/${d.slug}`} className="group block">
                      <div className="relative aspect-[4/5] overflow-hidden [--cut:36px] chamfer">
                        <Image
                          src={photos[d.photo]}
                          alt={d.name}
                          fill
                          placeholder="blur"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="photo-grade object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                        <div className="absolute inset-x-0 top-0 flex justify-between p-5 font-mono text-[0.6rem] tracking-[0.2em] uppercase">
                          <span className="bg-ink/70 px-2 py-1 text-volt backdrop-blur">{d.code}</span>
                          <span className="bg-ink/70 px-2 py-1 backdrop-blur">{formatCoords(d.lat, d.lon)}</span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-6">
                          <h3 className="font-display text-5xl leading-none font-black uppercase transition-colors group-hover:text-volt">
                            {d.name}
                          </h3>
                          <p className="mt-3 font-serif text-xl text-bone/80 italic">{d.tagline}</p>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand />
    </>
  );
}
