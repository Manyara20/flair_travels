import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photos } from "@/assets/photos";
import { CtaBand } from "@/components/cta-band";
import { DestinationIndex } from "@/components/destination-index";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { WorldRouteMap } from "@/components/world-route-map";
import { distanceFromNairobi } from "@/lib/geo";
import { collections, destinationsIn } from "@/data/destinations";
import { formatUSD } from "@/lib/format";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Kenya, Africa and the rest of the world: the Maasai Mara, Rwanda, the Serengeti, Seychelles, Mauritius, Uganda, Cape Town, Bali, the Maldives, Dubai, Greece and Italy.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Destinations"
        photo="mauritius"
        inset="maasaiMara"
        alt="Aerial view of Le Morne Brabant, Mauritius"
        title={
          <>
            The <span className="font-serif font-normal normal-case text-blush italic">whole</span> map
          </>
        }
        intro="We start with Kenya, go on across Africa, and reach the rest of the world. That's twenty-two destinations, each with a route from Nairobi."
        aside={
          <nav aria-label="Destination groups" className="grid grid-cols-3 gap-px bg-white/20">
            {collections.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="bg-navy-deep/60 p-3 backdrop-blur hover:bg-pink">
                <span className="block font-display text-3xl font-black">{destinationsIn(c.id).length}</span>
                <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase">{c.label}</span>
              </a>
            ))}
          </nav>
        }
      />

      {/* Kenya */}
      <section id="kenya" className="relative scroll-mt-20 bg-navy-deep text-white">
        <div className="survey-grid absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-[1600px] px-4 py-20 sm:px-8 md:py-28">
          <GroupHead index="K" label="Kenya" blurb={collections[0].blurb} count={destinationsIn("kenya").length} />
          <div className="mt-14">
            <DestinationIndex items={destinationsIn("kenya")} />
          </div>
        </div>
      </section>

      {(["africa", "world"] as const).map((id) => {
        const c = collections.find((x) => x.id === id)!;
        const items = destinationsIn(id);
        // The lead tile spans two rows only when that leaves the 3-column grid without gaps.
        const tallLead = (items.length - 1) % 3 === 2;
        return (
          <section key={id} id={id} className={`scroll-mt-20 text-navy ${id === "africa" ? "bg-white" : "bg-sky"}`}>
            <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 md:py-28">
              <GroupHead index={c.index} label={c.label} blurb={c.blurb} count={items.length} />
              <div className="mt-14 border border-navy/10 bg-white p-4 md:p-6">
                <p className="mb-2 font-mono text-[0.6rem] tracking-[0.25em] text-pink uppercase">◆ Routes from Nairobi</p>
                <WorldRouteMap slugs={items.map((d) => d.slug)} />
              </div>
              <div className="mt-10">
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((d, i) => (
                    <li key={d.slug} className={i === 0 ? `sm:col-span-2 ${tallLead ? "lg:row-span-2" : ""}` : ""}>
                      <Reveal delay={(i % 2) * 0.08} className="h-full">
                        <Link
                          href={`/destinations/${d.slug}`}
                          className={`group relative block overflow-hidden text-white [--cut:36px] chamfer-tr ${i === 0 && tallLead ? "aspect-[4/3] h-full lg:aspect-auto" : i === 0 ? "aspect-[4/3] sm:aspect-[16/7]" : "aspect-[4/3]"}`}
                        >
                          <Image
                            src={photos[d.photo]}
                            alt={d.name}
                            fill
                            placeholder="blur"
                            sizes={i === 0 ? "(min-width: 1280px) 60vw, 100vw" : "(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw"}
                            className="photo-grade object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" />
                          <div className="absolute inset-x-0 top-0 flex justify-between p-4 font-mono text-[0.6rem] tracking-[0.2em] uppercase">
                            <span className="bg-pink px-2 py-1">{d.code}</span>
                            <span className="bg-navy-deep/70 px-2 py-1 backdrop-blur">
                              {distanceFromNairobi(d.lat, d.lon).toLocaleString("en-US")} km from NBO
                            </span>
                          </div>
                          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                            <div>
                              <p className="font-mono text-[0.6rem] tracking-[0.25em] text-cyan uppercase">{d.country}</p>
                              <h3 className={`font-display leading-none font-black uppercase group-hover:text-sky ${i === 0 ? "text-6xl md:text-8xl" : "text-5xl"}`}>
                                {d.name}
                              </h3>
                              <p className="mt-2 font-serif text-lg text-white/90 italic">{d.tagline}</p>
                            </div>
                            <p className="shrink-0 text-right">
                              <span className="block font-mono text-[0.55rem] tracking-[0.2em] uppercase">From</span>
                              <span className="font-display text-2xl font-black">{formatUSD(d.fromPrice)}</span>
                            </p>
                          </div>
                        </Link>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand />
    </>
  );
}

function GroupHead({ index, label, blurb, count }: { index: string; label: string; blurb: string; count: number }) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <Eyebrow index={index} className="opacity-80">
          {count} destinations
        </Eyebrow>
        <h2 className="mt-4 font-display text-6xl leading-none font-black uppercase md:text-8xl">{label}</h2>
      </div>
      <p className="max-w-md leading-relaxed opacity-75">{blurb}</p>
    </div>
  );
}

