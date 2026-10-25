"use client";

import { useSearchParams } from "next/navigation";
import { TripBuilder } from "@/components/trip-builder";

export function TripBuilderFromParams() {
  const params = useSearchParams();
  return (
    <TripBuilder
      initialTour={params.get("tour") ?? undefined}
      initialDestination={params.get("destination") ?? undefined}
    />
  );
}
