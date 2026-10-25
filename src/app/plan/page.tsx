import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { TripBuilder } from "@/components/trip-builder";
import { TripBuilderFromParams } from "./trip-builder-from-params";

export const metadata: Metadata = {
  title: "Plan a trip",
  description: "Build your Kenya route: choose destinations, month, duration and comfort level, and get an indicative price.",
};

export default function PlanPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="Route builder"
        title={
          <>
            Plot <span className="font-serif font-normal normal-case text-volt italic">your</span> line
          </>
        }
        intro="Add stops in the order you want to visit, then set the month, length and comfort level. The price updates as you go, and a planner turns it into a real itinerary."
      />
      <section className="bg-ink">
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 md:py-24">
          {/* The shell prerenders an empty builder; query params (?tour=, ?destination=) preload it on the client. */}
          <Suspense fallback={<TripBuilder />}>
            <TripBuilderFromParams />
          </Suspense>
        </div>
      </section>
    </>
  );
}
