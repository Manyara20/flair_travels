"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { kenyaDestinations as destinations, months } from "@/data/destinations";
import { nairobiMonthIndex, useNow } from "@/lib/use-now";
import { KenyaMap } from "../kenya-map";

const STATUS = [
  { label: "Low", className: "border border-navy/20 text-navy/55" },
  { label: "Good", className: "border border-navy text-navy" },
  { label: "Prime", className: "bg-cyan text-white" },
] as const;

const primeCount = months.map((_, m) => destinations.filter((d) => d.season[m] === 2).length);
const maxPrime = Math.max(...primeCount);

export function SeasonScanner() {
  const now = useNow();
  const [picked, setPicked] = useState<number | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const current = now === null ? null : nairobiMonthIndex(now);
  const month = picked ?? current ?? 7;

  const ranked = [...destinations].sort((a, b) => b.season[month] - a.season[month]);
  const strength = Object.fromEntries(destinations.map((d) => [d.slug, d.season[month]]));

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        {/* month histogram selector */}
        <div role="radiogroup" aria-label="Travel month" className="grid grid-cols-6 border-t border-l border-navy/15 sm:grid-cols-12">
          {months.map((m, i) => {
            const selected = i === month;
            const h = (primeCount[i] / maxPrime) * 48;
            return (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setPicked(i)}
                className={`group relative flex h-28 flex-col justify-end border-r border-b border-navy/15 p-2 text-left transition-colors ${
                  selected ? "bg-pink text-white" : "bg-white hover:bg-mist"
                }`}
              >
                <span
                  aria-hidden
                  className={`mb-auto block w-full transition-colors ${selected ? "bg-white/40" : "bg-sky group-hover:bg-cyan/60"}`}
                  style={{ height: `${h}px`, marginTop: `${48 - h}px` }}
                />
                <span className="mt-2 font-display text-xl leading-none font-bold uppercase">{m}</span>
                <span className={`font-mono text-[0.55rem] tracking-widest ${selected ? "text-white/80" : "text-navy/55"}`}>
                  {primeCount[i]}
                  <span className="sr-only"> destinations in prime season</span>
                  <span aria-hidden> ◆</span>
                </span>
                {i === current && (
                  <span className={`absolute top-2 right-2 size-1.5 ${selected ? "bg-white" : "bg-cyan"}`} title="Current month" />
                )}
              </button>
            );
          })}
        </div>

        <ul className="mt-10 divide-y divide-navy/10 border-y border-navy/10">
          {ranked.map((d) => {
            const s = d.season[month];
            return (
              <motion.li key={d.slug} layout transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <Link
                  href={`/destinations/${d.slug}`}
                  onMouseEnter={() => setHovered(d.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group grid grid-cols-[4.5rem_1fr] items-center gap-4 py-3 transition-opacity sm:grid-cols-[4.5rem_1fr_auto] ${
                    s === 0 ? "opacity-50 hover:opacity-100" : ""
                  }`}
                >
                  <span className={`py-1 text-center font-mono text-[0.6rem] font-semibold tracking-[0.2em] uppercase ${STATUS[s].className}`}>
                    {STATUS[s].label}
                  </span>
                  <span className="flex items-baseline gap-3">
                    <span className="font-display text-2xl font-bold uppercase transition-colors group-hover:text-pink">{d.name}</span>
                    <span className="hidden font-mono text-[0.6rem] tracking-[0.2em] text-navy/50 uppercase md:inline">{d.region}</span>
                  </span>
                  <span className="hidden gap-px sm:flex" aria-label={`${d.name} season by month`}>
                    {d.season.map((v, i) => (
                      <span
                        key={i}
                        title={`${months[i]}: ${STATUS[v].label}`}
                        className={`h-5 w-3 ${v === 2 ? "bg-cyan" : v === 1 ? "bg-sky" : "bg-navy/10"} ${
                          i === month ? "outline-2 outline-offset-1 outline-pink" : ""
                        }`}
                      />
                    ))}
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-28 text-navy">
          <div className="mb-4 flex items-baseline justify-between border-b border-navy/10 pb-4">
            <p className="font-display text-6xl leading-none font-black text-pink uppercase">{months[month]}</p>
            <p className="font-mono text-[0.65rem] tracking-[0.2em] text-navy/60 uppercase">
              <span className="text-cyan">◆</span> prime <span className="ml-3">◆</span> good{" "}
              <span className="ml-3 text-navy/30">◆</span> low
            </p>
          </div>
          <KenyaMap strength={strength} activeSlug={hovered} onActiveChange={setHovered} />
        </div>
      </div>
    </div>
  );
}
