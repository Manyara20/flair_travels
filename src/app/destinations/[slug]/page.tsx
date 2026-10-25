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
import { destinations, formatCoords, getDestination, months } from "@/data/destinations";
import { tours } from "@/data/tours";
import { formatUSD, pad } from "@/lib/format";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return { title: d.name, description: `${d.tagline} ${d.summary}` };
}

const SEASON_LABEL = ["Low", "Good", "Prime"] as const;

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const index = destinations.indexOf(d);
  const next = destinations[(index + 1) % destinations.length];
  const related = tours.filter((t) => t.route.includes(d.slug));

  const facts = [
    { label: "Coordinates", value: formatCoords(d.lat, d.lon) },
    { label: "Elevation", value: d.elevation },
    { label: "Area", value: d.area },
    { label: "From Nairobi", value: d.access },
    { label: "Region", value: d.region },
    { label: "From", value: `${formatUSD(d.fromPrice)} pp` },
  ];

  return (
    <>
      {/* hero */}
      <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ink">
        <Image
          src={photos[d.photo]}
          alt={`${d.name}, Kenya`}
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="photo-grade object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />
        <div className="relative mx-auto w-full max-w-[1600px] px-4 pt-32 pb-12 sm:px-8 md:pb-16">
          <p className="font-mono text-[0.65rem] tracking-[0.3em] text-bone/80 uppercase">
            <Link href="/destinations" className="hover:text-volt">
              Destinations
            </Link>{" "}
            / <span className="text-laterite">{pad(index + 1)}</span> / {d.code}
          </p>
          <h1 className="mt-6 font-display text-[16vw] leading-[0.8] font-black uppercase lg:text-[11rem]">
            <SplitLine text={d.name} />
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-2xl text-bone/85 italic md:text-3xl">{d.tagline}</p>
        </div>
      </section>

      {/* fact strip */}
      <section className="border-y border-bone/10 bg-ink-2">
        <dl className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px bg-bone/10 md:grid-cols-3 xl:grid-cols-6">
          {facts.map((f) => (
            <div key={f.label} className="bg-ink-2 px-4 py-6 sm:px-8 xl:px-6">
              <dt className="font-mono text-[0.6rem] tracking-[0.25em] text-dust uppercase">{f.label}</dt>
              <dd className="mt-2 font-display text-xl font-bold uppercase md:text-2xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* briefing */}
      <section className="bg-ink">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="A" className="text-bone/70">
                Briefing
              </Eyebrow>
              <p className="mt-8 text-2xl leading-snug text-bone/90 md:text-3xl">{d.summary}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <Eyebrow index="B" className="mt-20 text-bone/70">
                What you’ll do
              </Eyebrow>
              <ol className="mt-8 border-t border-bone/10">
                {d.highlights.map((h, i) => (
                  <li key={h} className="flex gap-6 border-b border-bone/10 py-5">
                    <span className="pt-1 font-mono text-[0.65rem] text-laterite">{pad(i + 1)}</span>
                    <span className="font-display text-2xl font-bold uppercase md:text-3xl">{h}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1}>
              <Eyebrow index="C" className="mt-20 text-bone/70">
                Season curve
              </Eyebrow>
              <div className="mt-8 grid grid-cols-12 items-end gap-1">
                {d.season.map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      title={`${months[i]}: ${SEASON_LABEL[v]}`}
                      className={`w-full ${v === 2 ? "h-28 bg-volt" : v === 1 ? "h-16 bg-bone/40" : "h-6 bg-bone/10"}`}
                    />
                    <span className="font-mono text-[0.55rem] tracking-widest text-dust uppercase">{months[i]}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono text-[0.6rem] tracking-[0.2em] text-dust uppercase">
                Prime: {months.filter((_, i) => d.season[i] === 2).join(" · ")}
              </p>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="relative border border-bone/10 p-4">
                <KenyaMap activeSlug={d.slug} />
                <CropMarks className="-m-px text-laterite" />
              </div>
              <div className="grid grid-cols-3 gap-px bg-bone/10">
                {d.signatures.map((s) => (
                  <div key={s.label} className="bg-ink p-4">
                    <p className="font-mono text-[0.55rem] tracking-[0.2em] text-dust uppercase">{s.label}</p>
                    <p className="mt-2 font-display text-lg leading-tight font-bold uppercase">{s.value}</p>
                  </div>
                ))}
              </div>
              <ButtonLink href={`/plan?destination=${d.slug}`} className="w-full">
                Plan a trip to {d.name}
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-bone/10 bg-ink">
          <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8">
            <Eyebrow index="D" className="text-bone/70">
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

      {/* next destination */}
      <Link href={`/destinations/${next.slug}`} className="group relative block overflow-hidden border-t border-bone/10 bg-ink">
        <Wipe>
          <div className="relative h-[46vh] min-h-80">
            <Image
              src={photos[next.photo]}
              alt=""
              fill
              sizes="100vw"
              className="photo-grade object-cover opacity-50 transition-[opacity,scale] duration-1000 ease-expo group-hover:scale-105 group-hover:opacity-70"
            />
            <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-center px-4 sm:px-8">
              <p className="font-mono text-[0.65rem] tracking-[0.3em] text-volt uppercase">Next destination →</p>
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
