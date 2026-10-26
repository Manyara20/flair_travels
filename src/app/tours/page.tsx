import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { TourBrowser } from "@/components/tour-browser";
import { TourCard } from "@/components/tour-card";
import { tours } from "@/data/tours";
import { formatUSD } from "@/lib/format";

export const metadata: Metadata = {
  title: "Expeditions",
  description: "Six tested Kenya itineraries: migration safaris, northern frontier treks, Rift Valley adventures and Swahili coast escapes.",
};

export default function ToursPage() {
  const cheapest = Math.min(...tours.map((t) => t.price));
  const cards = Object.fromEntries(tours.map((t) => [t.slug, <TourCard key={t.slug} tour={t} className="h-full" />]));

  return (
    <>
      <PageHero
        index="S-05"
        eyebrow="Safari expeditions"
        photo="river"
        inset="lioness"
        alt="A river winding through the Maasai Mara, seen from a balloon"
        title={
          <>
            Pick a <span className="font-serif font-normal normal-case text-blush italic">route</span>
          </>
        }
        intro="Each expedition is a fixed route that we adjust to you. Change the pace, upgrade the camps or add the coast at the end. Every one runs privately, with your own vehicle and guide."
        aside={
          <p className="font-mono text-[0.65rem] tracking-[0.25em] text-sky uppercase">
            {tours.length} routes · 4–14 days · from {formatUSD(cheapest)} pp
          </p>
        }
      />
      <section className="bg-white text-navy">
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 md:py-24">
          <TourBrowser cards={cards} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
