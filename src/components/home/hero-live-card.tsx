"use client";

import Link from "next/link";
import { collections, destinations, months } from "@/data/destinations";
import { formatNairobiTime, nairobiMonthIndex, useNow } from "@/lib/use-now";

/** Shows what is in prime season right now, keyed off Nairobi's current month. */
export function HeroLiveCard() {
  const now = useNow();
  const month = now === null ? null : nairobiMonthIndex(now);
  // Up to two picks from each collection so the list spans Kenya, Africa and the world.
  const prime =
    month === null
      ? []
      : collections.flatMap((c) => destinations.filter((d) => d.collection === c.id && d.season[month] === 2).slice(0, 2)).slice(0, 5);

  return (
    <div className="bg-white/95 p-5 text-navy backdrop-blur-md [--cut:20px] chamfer-tr">
      <div className="flex items-center justify-between font-mono text-[0.65rem] tracking-[0.25em] uppercase">
        <span className="flex items-center gap-2 text-cyan">
          <span className="size-1.5 animate-blink bg-cyan" />
          Live season feed
        </span>
        <span className="text-navy/60 tabular-nums">{now ? formatNairobiTime(now) : "--:--:--"} EAT</span>
      </div>

      <p className="mt-5 font-display text-3xl leading-none font-black uppercase">
        Best in <span className="text-pink">{month === null ? "…" : months[month]}</span>
      </p>

      <ul className="mt-4 divide-y divide-navy/10 border-y border-navy/10">
        {month === null
          ? Array.from({ length: 4 }, (_, i) => <li key={i} className="h-10 animate-pulse bg-navy/[0.04]" />)
          : prime.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/destinations/${d.slug}`}
                  className="group flex h-10 items-center justify-between gap-4 text-sm transition-colors hover:text-pink"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 font-mono text-[0.6rem] text-cyan">{d.code}</span>
                    {d.name}
                  </span>
                  <span className="font-mono text-[0.6rem] tracking-widest text-navy/50 uppercase">
                    {d.country === d.name ? d.region : d.country}
                  </span>
                </Link>
              </li>
            ))}
      </ul>

      <Link
        href="/#seasons"
        className="mt-4 inline-block font-mono text-[0.65rem] tracking-[0.25em] text-navy/70 uppercase underline-offset-4 hover:text-pink hover:underline"
      >
        Kenya season scanner ↓
      </Link>
    </div>
  );
}
