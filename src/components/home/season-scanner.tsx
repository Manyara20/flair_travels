"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { destinations, months } from "@/data/destinations";
import { nairobiMonthIndex, useNow } from "@/lib/use-now";
import { KenyaMap } from "../kenya-map";

const STATUS = [
  { label: "Low", className: "border border-bone/20 text-dust" },
  { label: "Good", className: "border border-bone/60 text-bone" },
  { label: "Prime", className: "bg-volt text-ink" },
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
        <div role="radiogroup" aria-label="Travel month" className="grid grid-cols-6 border-t border-l border-bone/15 sm:grid-cols-12">
          {months.map((m, i) => {
            const selected = i === month;
            return (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setPicked(i)}
                className={`group relative flex h-28 flex-col justify-end border-r border-b border-bone/15 p-2 text-left transition-colors ${
                  selected ? "bg-laterite text-ink" : "hover:bg-bone/5"
                }`}
              >
                <span
                  aria-hidden
                  className={`mb-auto block w-full origin-bottom transition-colors ${selected ? "bg-ink/30" : "bg-bone/15 group-hover:bg-volt/50"}`}
                  style={{ height: `${(primeCount[i] / maxPrime) * 48}px`, marginTop: `${48 - (primeCount[i] / maxPrime) * 48}px` }}
                />
                <span className="mt-2 font-display text-xl leading-none font-bold uppercase">{m}</span>
                <span className={`font-mono text-[0.55rem] tracking-widest ${selected ? "text-ink/70" : "text-dust"}`}>
                  {primeCount[i]}
                  <span className="sr-only"> destinations in prime season</span>
                  <span aria-hidden> ◆</span>
                </span>
                {i === current && (
                  <span className={`absolute top-2 right-2 size-1.5 ${selected ? "bg-ink" : "bg-volt"}`} title="Current month" />
                )}
              </button>
            );
          })}
        </div>

        <ul className="mt-10 divide-y divide-bone/10 border-y border-bone/10">
          {ranked.map((d) => {
            const s = d.season[month];
            return (
              <motion.li key={d.slug} layout transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <Link
                  href={`/destinations/${d.slug}`}
                  onMouseEnter={() => setHovered(d.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group grid grid-cols-[4.5rem_1fr] items-center gap-4 py-3 transition-opacity sm:grid-cols-[4.5rem_1fr_auto] ${
                    s === 0 ? "opacity-45 hover:opacity-100" : ""
                  }`}
                >
                  <span className={`py-1 text-center font-mono text-[0.6rem] font-semibold tracking-[0.2em] uppercase ${STATUS[s].className}`}>
                    {STATUS[s].label}
                  </span>
                  <span className="flex items-baseline gap-3">
                    <span className="font-display text-2xl font-bold uppercase transition-colors group-hover:text-volt">{d.name}</span>
                    <span className="hidden font-mono text-[0.6rem] tracking-[0.2em] text-dust uppercase md:inline">{d.region}</span>
                  </span>
                  <span className="hidden gap-px sm:flex" aria-label={`${d.name} season by month`}>
                    {d.season.map((v, i) => (
                      <span
                        key={i}
                        title={`${months[i]}: ${STATUS[v].label}`}
                        className={`h-5 w-3 ${v === 2 ? "bg-volt" : v === 1 ? "bg-bone/40" : "bg-bone/10"} ${
                          i === month ? "outline outline-1 outline-offset-1 outline-laterite" : ""
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
        <div className="sticky top-28">
          <div className="mb-4 flex items-baseline justify-between border-b border-bone/10 pb-4">
            <p className="font-display text-6xl leading-none font-black uppercase">{months[month]}</p>
            <p className="font-mono text-[0.65rem] tracking-[0.2em] text-dust uppercase">
              <span className="text-volt">◆</span> prime <span className="ml-3 text-bone">◆</span> good{" "}
              <span className="ml-3 text-bone/30">◆</span> low
            </p>
          </div>
          <KenyaMap strength={strength} activeSlug={hovered} onActiveChange={setHovered} />
        </div>
      </div>
    </div>
  );
}
