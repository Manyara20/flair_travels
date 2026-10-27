"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { photos } from "@/assets/photos";
import { collections, type Destination, destinations } from "@/data/destinations";
import { distanceFromNairobi } from "@/lib/geo";
import { WorldRouteMap } from "../world-route-map";

const abroad = destinations.filter((d) => d.collection !== "kenya");

/**
 * Photo mosaic of Africa and Rest-of-the-World destinations, linked to a
 * flight-arc map: hovering a tile lights up its route from Nairobi and vice versa.
 */
export function BeyondKenya() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      <div className="border border-navy/10 bg-white p-4 text-navy md:p-6">
        <p className="mb-2 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.25em] uppercase">
          <span className="text-pink">◆ Routes from Nairobi</span>
          <span className="text-navy/50">Hover a photo or a point to trace it</span>
        </p>
        <WorldRouteMap activeSlug={active} onActiveChange={setActive} />
      </div>
      <div className="grid gap-12 lg:grid-cols-2">
        {collections
          .filter((c) => c.id !== "kenya")
          .map((c) => {
            const items = abroad.filter((d) => d.collection === c.id);
            return (
              <div key={c.id} className="min-w-0">
                <div className="mb-4 flex items-baseline justify-between border-b border-navy/15 pb-3">
                  <p className="flex items-baseline gap-3 font-display text-3xl font-black uppercase">
                    <span className="font-mono text-xs text-pink">{c.index}</span>
                    {c.label}
                  </p>
                  <Link href={`/destinations#${c.id}`} className="font-mono text-[0.65rem] tracking-[0.2em] uppercase hover:text-pink">
                    View all →
                  </Link>
                </div>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {items.map((d, i) => (
                    // A tall lead tile only when the rest fill the grid evenly.
                    <Tile key={d.slug} d={d} tall={i === 0 && items.length % 2 === 1} active={active === d.slug} onActive={setActive} />
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function Tile({ d, tall, active, onActive }: { d: Destination; tall: boolean; active: boolean; onActive: (s: string | null) => void }) {
  return (
    <li className={`min-w-0 ${tall ? "row-span-2" : ""}`}>
      <Link
        href={`/destinations/${d.slug}`}
        onMouseEnter={() => onActive(d.slug)}
        onMouseLeave={() => onActive(null)}
        onFocus={() => onActive(d.slug)}
        onBlur={() => onActive(null)}
        className={`group relative block overflow-hidden text-white [--cut:20px] chamfer-tr ${tall ? "h-full min-h-[360px]" : "aspect-[4/3] w-full"}`}
      >
        <Image
          src={photos[d.photo]}
          alt={d.name}
          fill
          placeholder="blur"
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw"
          className={`photo-grade object-cover transition-transform duration-[1.2s] ease-expo ${active ? "scale-110" : "group-hover:scale-110"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent" />
        <div className={`absolute inset-0 border-4 transition-colors duration-300 ${active ? "border-pink" : "border-transparent"}`} />
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
          <p className="truncate font-mono text-[0.55rem] tracking-[0.2em] text-sky uppercase">
            {d.country !== d.name ? d.country : d.region} · {distanceFromNairobi(d.lat, d.lon).toLocaleString("en-US")} km
          </p>
          <p className="font-display text-2xl leading-none font-black uppercase md:text-3xl">{d.name}</p>
        </div>
      </Link>
    </li>
  );
}
