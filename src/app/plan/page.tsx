import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { TripBuilder } from "@/components/trip-builder";

export const metadata: Metadata = {
  title: "Plan a trip",
  description: "Build your route across Kenya, Africa and the world: choose destinations, month, duration and comfort level, and get an indicative price.",
  alternates: { canonical: "/plan" },
};

export default function PlanPage({ searchParams }: PageProps<"/plan">) {
  return (
    <>
      <PageHero
        index="→"
        eyebrow="Route builder"
        photo="elephantAerial"
        inset="seychelles"
        alt="An elephant crossing the Mara plains, seen from a balloon"
        title={
          <>
            Plot <span className="font-serif font-normal normal-case text-blush italic">your</span> line
          </>
        }
        intro="Add stops in Kenya, Africa or further afield, in the order you want to visit. Then set the month, length and comfort level. The price updates as you go, and a planner turns it into a real itinerary with flights and visas covered."
      />
      <section className="bg-white text-navy">
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 md:py-24">
          {/* The static shell shows an inert placeholder; the real builder streams in the same
              response with ?tour= / ?destination= applied, so nothing typed can be lost. */}
          <Suspense fallback={<TripBuilder placeholder />}>
            <TripBuilderFromParams searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </>
  );
}

async function TripBuilderFromParams({ searchParams }: { searchParams: PageProps<"/plan">["searchParams"] }) {
  const { tour, destination } = await searchParams;
  return (
    <TripBuilder
      initialTour={typeof tour === "string" ? tour : undefined}
      initialDestination={typeof destination === "string" ? destination : undefined}
    />
  );
}
