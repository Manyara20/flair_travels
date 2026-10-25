import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { photos } from "@/assets/photos";
import { KenyaMap } from "@/components/kenya-map";
import { Reveal, SplitLine } from "@/components/reveal";
import { TourCard } from "@/components/tour-card";
import { ButtonLink, CropMarks, Eyebrow, SegmentBar } from "@/components/ui";
import { getDestination } from "@/data/destinations";
import { getTour, tours } from "@/data/tours";
import { formatUSD } from "@/lib/format";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tours/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = getTour(slug);
  if (!t) return {};
  return { title: t.title, description: t.pitch };
}

export default async function TourPage({ params }: PageProps<"/tours/[slug]">) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const stops = tour.route.map(getDestination).filter((d) => d !== undefined);
  const others = tours.filter((t) => t.slug !== tour.slug).slice(0, 3);

  return (
    <>
      <section className="relative min-h-[88svh] overflow-hidden bg-ink">
        <Image
          src={photos[tour.photo]}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="photo-grade object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-[1600px] flex-col justify-end px-4 pt-32 pb-14 sm:px-8">
          <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase">
            <Link href="/tours" className="text-bone/80 hover:text-volt">
              Expeditions
            </Link>{" "}
            / <span className="bg-laterite px-2 py-1 text-ink">{tour.code}</span>{" "}
            <span className="ml-2 text-dust">{tour.style}</span>
          </p>
          <h1 className="mt-6 max-w-6xl font-display text-[15vw] leading-[0.82] font-black uppercase lg:text-[9.5rem]">
            <SplitLine text={tour.title} />
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-bone/20 pt-6 font-mono text-xs tracking-[0.2em] uppercase">
            <span>
              <span className="text-dust">Days </span>
              {tour.days}
            </span>
            <span>
              <span className="text-dust">Group </span>
              {tour.groupSize}
            </span>
            <span className="flex items-center gap-3">
              <span className="text-dust">Intensity</span>
              <SegmentBar value={tour.intensity} />
            </span>
            <span className="text-laterite">
              <span className="text-dust">From </span>
              {formatUSD(tour.price)} pp
            </span>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="A" className="text-bone/70">
                The idea
              </Eyebrow>
              <p className="mt-8 text-2xl leading-snug text-bone/90 md:text-3xl">{tour.pitch}</p>
            </Reveal>

            <Eyebrow index="B" className="mt-20 text-bone/70">
              Day by day
            </Eyebrow>
            <ol className="relative mt-10">
              <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-bone/15" />
              {tour.itinerary.map((step, i) => (
                <li key={step.day} className="pb-12 last:pb-0">
                  <Reveal delay={i * 0.05} className="relative grid grid-cols-[auto_1fr] gap-x-8">
                    <span aria-hidden className="relative z-10 mt-2 size-[11px] rotate-45 bg-laterite" />
                    <div>
                      <p className="font-mono text-[0.65rem] tracking-[0.25em] text-laterite uppercase">Day {step.day}</p>
                      <h3 className="mt-2 font-display text-3xl font-bold uppercase md:text-4xl">{step.title}</h3>
                      <p className="mt-3 max-w-xl leading-relaxed text-bone/65">{step.detail}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="relative border border-bone/10 p-4">
                <KenyaMap route={tour.route} />
                <CropMarks className="-m-px text-volt" />
              </div>
              <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] uppercase">
                {stops.map((s, i) => (
                  <li key={s.slug} className="flex items-center gap-2">
                    <Link href={`/destinations/${s.slug}`} className="border border-bone/20 px-2 py-1 hover:border-volt hover:text-volt">
                      {s.code} · {s.name}
                    </Link>
                    {i < stops.length - 1 && <span className="text-laterite">→</span>}
                  </li>
                ))}
              </ol>
              <div className="border border-bone/10 bg-ink-2 p-6">
                <p className="font-mono text-[0.6rem] tracking-[0.25em] text-dust uppercase">Included</p>
                <ul className="mt-4 space-y-2">
                  {tour.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-3 text-sm">
                      <span className="size-1.5 bg-volt" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-end justify-between border-t border-bone/10 pt-6">
                  <div>
                    <p className="font-mono text-[0.6rem] tracking-[0.25em] text-dust uppercase">From, per person</p>
                    <p className="font-display text-5xl font-black text-laterite">{formatUSD(tour.price)}</p>
                  </div>
                  <p className="text-right font-mono text-[0.6rem] tracking-[0.2em] text-dust uppercase">
                    Sharing
                    <br />
                    Private vehicle
                  </p>
                </div>
              </div>
              <ButtonLink href={`/plan?tour=${tour.slug}`} className="w-full">
                Request this expedition
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-bone/10 bg-ink">
        <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8">
          <Eyebrow index="C" className="text-bone/70">
            Other routes
          </Eyebrow>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {others.map((t) => (
              <TourCard key={t.slug} tour={t} className="h-full" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
