"use client";

import Link from "next/link";
import { destinations, months } from "@/data/destinations";
import { formatNairobiTime, nairobiMonthIndex, useNow } from "@/lib/use-now";

/** Shows what is in prime season right now, keyed off Nairobi's current month. */
export function HeroLiveCard() {
  const now = useNow();
  const month = now === null ? null : nairobiMonthIndex(now);
  const prime = month === null ? [] : destinations.filter((d) => d.season[month] === 2).slice(0, 4);

  return (
    <div className="border border-bone/15 bg-ink/70 p-5 backdrop-blur-md [--cut:20px] chamfer-tr">
      <div className="flex items-center justify-between font-mono text-[0.65rem] tracking-[0.25em] uppercase">
        <span className="flex items-center gap-2 text-volt">
          <span className="size-1.5 animate-blink bg-volt" />
          Live field feed
        </span>
        <span className="text-dust tabular-nums">{now ? formatNairobiTime(now) : "--:--:--"} EAT</span>
      </div>

      <p className="mt-5 font-display text-3xl leading-none font-bold uppercase">
        Prime in {month === null ? "…" : months[month]}
      </p>

      <ul className="mt-4 divide-y divide-bone/10 border-y border-bone/10">
        {month === null
          ? Array.from({ length: 3 }, (_, i) => (
              <li key={i} className="h-11 animate-pulse bg-bone/[0.03]" />
            ))
          : prime.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/destinations/${d.slug}`}
                  className="group flex h-11 items-center justify-between gap-4 text-sm transition-colors hover:text-volt"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[0.6rem] text-laterite">{d.code}</span>
                    {d.name}
                  </span>
                  <span className="font-mono text-[0.6rem] tracking-widest text-dust transition-transform group-hover:translate-x-1 group-hover:text-volt">
                    →
                  </span>
                </Link>
              </li>
            ))}
      </ul>

      <Link
        href="/#seasons"
        className="mt-4 inline-block font-mono text-[0.65rem] tracking-[0.25em] text-bone/60 uppercase underline-offset-4 hover:text-volt hover:underline"
      >
        Open season scanner ↓
      </Link>
    </div>
  );
}
