import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { photos } from "@/assets/photos";
import { CtaBand } from "@/components/cta-band";
import { KenyaMap } from "@/components/kenya-map";
import { Reveal, SplitLine, Wipe } from "@/components/reveal";
import { TourCard } from "@/components/tour-card";
import { ButtonLink, CropMarks, Eyebrow } from "@/components/ui";
import { WorldRouteMap } from "@/components/world-route-map";
import { distanceFromNairobi } from "@/lib/geo";
import { collections, destinations, destinationsIn, formatCoords, getDestination, months } from "@/data/destinations";
import { tours } from "@/data/tours";
import { pad } from "@/lib/format";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return {
    title: d.country === d.name || d.country === "Kenya" ? d.name : `${d.name}, ${d.country}`,
    description: `${d.tagline} ${d.summary}`,
    alternates: { canonical: `/destinations/${d.slug}` },
  };
}

const SEASON_LABEL = ["Low", "Good", "Prime"] as const;

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const group = destinationsIn(d.collection);
  const collection = collections.find((c) => c.id === d.collection)!;
  const index = group.indexOf(d);
  const next = group[(index + 1) % group.length];
  const more = group.filter((o) => o.slug !== d.slug).slice(0, 4);
  const related = tours.filter((t) => t.route.includes(d.slug));
  const inKenya = d.collection === "kenya";

  const facts = [
    { label: inKenya ? "Region" : "Country", value: inKenya ? d.region : d.country },
    { label: "Coordinates", value: formatCoords(d.lat, d.lon) },
    { label: "Elevation", value: d.elevation },
    { label: "Area", value: d.area },
    inKenya
      ? { label: "From Nairobi", value: d.access }
      : { label: "From NBO", value: `${distanceFromNairobi(d.lat, d.lon).toLocaleString("en-US")} km` },
  ];

  return (
    <>
      {/* hero */}
      <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-navy-deep text-white">
        <Image src={photos[d.photo]} alt={`${d.name}, ${d.country}`} fill priority placeholder="blur" sizes="100vw" className="photo-grade animate-kenburns object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/25 to-navy-deep/50" />
        <div className="relative mx-auto w-full max-w-[1600px] px-4 pt-40 pb-12 sm:px-8 md:pb-16">
          <p className="font-mono text-[0.65rem] tracking-[0.3em] text-white/85 uppercase">
            <Link href="/destinations" className="hover:text-cyan">
              Destinations
            </Link>{" "}
            /{" "}
            <Link href={`/destinations#${d.collection}`} className="hover:text-cyan">
              {collection.label}
            </Link>{" "}
            / <span className="bg-pink px-2 py-1 text-white">{d.code}</span>
          </p>
          <h1 className="mt-6 font-display text-[16vw] leading-[0.8] font-black uppercase lg:text-[11rem]">
            <SplitLine text={d.name} />
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-2xl text-white/90 italic md:text-3xl">{d.tagline}</p>
        </div>
      </section>

      {/* fact strip */}
      <section className="bg-sky text-navy">
        <dl className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px bg-navy/10 md:grid-cols-3 xl:grid-cols-6">
          {facts.map((f) => (
            <div key={f.label} className="bg-sky px-4 py-6 sm:px-8 xl:px-6">
              <dt className="font-mono text-[0.6rem] tracking-[0.25em] text-navy/60 uppercase">{f.label}</dt>
              <dd className="mt-2 font-display text-xl font-bold uppercase md:text-2xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* briefing */}
      <section className="bg-white text-navy">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="A" className="text-navy/70">
                Briefing
              </Eyebrow>
              <p className="mt-8 text-2xl leading-snug md:text-3xl">{d.summary}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <Eyebrow index="B" className="mt-20 text-navy/70">
                What you’ll do
              </Eyebrow>
              <ol className="mt-8 border-t border-navy/10">
                {d.highlights.map((h, i) => (
                  <li key={h} className="flex gap-6 border-b border-navy/10 py-5">
                    <span className="pt-1 font-mono text-[0.65rem] text-pink">{pad(i + 1)}</span>
                    <span className="font-display text-2xl font-bold uppercase md:text-3xl">{h}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1}>
              <Eyebrow index="C" className="mt-20 text-navy/70">
                Season curve
              </Eyebrow>
              <div className="mt-8 grid grid-cols-12 items-end gap-1">
                {d.season.map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      title={`${months[i]}: ${SEASON_LABEL[v]}`}
                      className={`w-full ${v === 2 ? "h-28 bg-cyan" : v === 1 ? "h-16 bg-sky" : "h-6 bg-navy/10"}`}
                    />
                    <span className="font-mono text-[0.55rem] tracking-widest text-navy/60 uppercase">{months[i]}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono text-[0.6rem] tracking-[0.2em] text-navy/60 uppercase">
                Prime: {months.filter((_, i) => d.season[i] === 2).join(" · ")}
              </p>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="relative border border-navy/10 bg-mist p-4">
                {inKenya ? <KenyaMap activeSlug={d.slug} /> : <WorldRouteMap slugs={[d.slug]} activeSlug={d.slug} />}
                <CropMarks className="-m-px text-pink" />
              </div>
              <div className="grid grid-cols-3 gap-px bg-navy/10">
                {d.signatures.map((s) => (
                  <div key={s.label} className="bg-white p-4">
                    <p className="font-mono text-[0.55rem] tracking-[0.2em] text-navy/55 uppercase">{s.label}</p>
                    <p className="mt-2 font-display text-lg leading-tight font-bold uppercase">{s.value}</p>
                  </div>
                ))}
              </div>
              <ButtonLink href={`/plan?destination=${d.slug}`} className="w-full">
                Plan a trip to {d.name}
              </ButtonLink>
              {!inKenya && (
                <p className="text-sm text-navy/65">
                  We also handle the{" "}
                  <Link href="/services/air-ticketing" className="text-pink underline-offset-4 hover:underline">
                    flights
                  </Link>
                  ,{" "}
                  <Link href="/services/visa-processing" className="text-pink underline-offset-4 hover:underline">
                    visa
                  </Link>{" "}
                  and{" "}
                  <Link href="/services/hotel-reservations" className="text-pink underline-offset-4 hover:underline">
                    hotels
                  </Link>{" "}
                  for {d.name}.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-navy text-white">
          <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8">
            <Eyebrow index="D" className="text-white/75">
              Expeditions through {d.name}
            </Eyebrow>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((t, i) => (
                <Reveal key={t.slug} delay={i * 0.1} className="h-full">
                  <TourCard tour={t} className="h-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* more in this collection */}
      <section className="bg-white text-navy">
        <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8">
          <Eyebrow index="E" className="text-navy/70">
            More in {collection.label}
          </Eyebrow>
          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {more.map((o) => (
              <li key={o.slug}>
                <Link href={`/destinations/${o.slug}`} className="group relative block aspect-[3/4] overflow-hidden text-white [--cut:20px] chamfer-tr">
                  <Image src={photos[o.photo]} alt={o.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="photo-grade object-cover transition-transform duration-1000 ease-expo group-hover:scale-110" />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block font-mono text-[0.6rem] tracking-[0.2em] text-cyan">{o.code}</span>
                    <span className="mt-1 block font-display text-3xl leading-none font-black uppercase group-hover:text-sky">{o.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* next destination */}
      <Link href={`/destinations/${next.slug}`} className="group relative block overflow-hidden bg-navy-deep text-white">
        <Wipe>
          <div className="relative h-[46vh] min-h-80">
            <Image
              src={photos[next.photo]}
              alt=""
              fill
              sizes="100vw"
              className="photo-grade object-cover opacity-60 transition-[opacity,scale] duration-1000 ease-expo group-hover:scale-105 group-hover:opacity-80"
            />
            <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-center px-4 sm:px-8">
              <p className="font-mono text-[0.65rem] tracking-[0.3em] text-cyan uppercase">Next destination →</p>
              <p className="mt-4 font-display text-[14vw] leading-[0.85] font-black uppercase transition-transform duration-700 ease-expo group-hover:translate-x-4 lg:text-[9rem]">
                {next.name}
              </p>
            </div>
          </div>
        </Wipe>
      </Link>

      <CtaBand />
    </>
  );
}
