"use client";

import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";
import { type TourStyle, tourStyles, tours } from "@/data/tours";

type Sort = "days-asc" | "days-desc";

const sorts: { value: Sort; label: string }[] = [
  { value: "days-asc", label: "Duration ↑" },
  { value: "days-desc", label: "Duration ↓" },
];

/**
 * Filter + sort controls for the expeditions grid. Cards are rendered on the
 * server and passed in keyed by slug, so this component only reorders them.
 */
export function TourBrowser({ cards }: { cards: Record<string, ReactNode> }) {
  const [style, setStyle] = useState<TourStyle | "All">("All");
  const [sort, setSort] = useState<Sort>("days-asc");

  const visible = tours
    .filter((t) => style === "All" || t.style === style)
    .sort((a, b) => (sort === "days-asc" ? a.days - b.days : b.days - a.days));

  return (
    <div>
      <div className="flex flex-col justify-between gap-6 border-y border-navy/10 py-4 md:flex-row md:items-center">
        <div role="group" aria-label="Filter by style" className="flex flex-wrap">
          {(["All", ...tourStyles] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={style === s}
              onClick={() => setStyle(s)}
              className={`-ml-px border px-4 py-2.5 font-mono text-[0.68rem] tracking-[0.2em] uppercase transition-colors first:ml-0 ${
                style === s ? "relative z-10 border-pink bg-pink text-white" : "border-navy/20 text-navy/70 hover:text-pink"
              }`}
            >
              {s}
              <span className="ml-2 opacity-60">
                {s === "All" ? tours.length : tours.filter((t) => t.style === s).length}
              </span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.2em] text-navy/60 uppercase">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-navy/20 bg-white px-3 py-2.5 text-navy uppercase"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <motion.ul layout className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((t) => (
            <motion.li
              key={t.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {cards[t.slug]}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
