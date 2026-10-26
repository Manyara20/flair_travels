"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useState } from "react";
import { photos } from "@/assets/photos";
import { type Destination, formatCoords } from "@/data/destinations";
import { formatUSD, pad } from "@/lib/format";
import { KenyaMap } from "./kenya-map";

/**
 * Numbered destination list with a cursor-tracking photo preview and a sticky
 * map that highlights whichever row (or marker) is active.
 */
export function DestinationIndex({ items }: { items: Destination[] }) {
  const [active, setActive] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const activeItem = items.find((d) => d.slug === active);

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="relative lg:col-span-7" onMouseMove={onMove}>
        <ol className="border-t border-white/10">
          {items.map((d, i) => (
            <li key={d.slug}>
              <Link
                href={`/destinations/${d.slug}`}
                onMouseEnter={() => setActive(d.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(d.slug)}
                onBlur={() => setActive(null)}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 border-b border-white/10 py-5 md:gap-x-8 md:py-6"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-white/[0.04] transition-transform duration-700 ease-expo group-hover:scale-x-100"
                />
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-pink transition-transform duration-500 ease-expo group-hover:scale-y-100"
                />
                <span className="relative self-start pt-2 font-mono text-[0.65rem] text-pink">{pad(i + 1)}</span>
                <span className="relative">
                  <span className="block font-display text-4xl leading-none font-bold uppercase transition-[translate,color] duration-500 ease-expo group-hover:translate-x-3 group-hover:text-cyan sm:text-5xl xl:text-6xl">
                    {d.name}
                  </span>
                  <span className="mt-2 block font-mono text-[0.62rem] tracking-[0.2em] text-sky/70 uppercase">
                    {d.region} · {formatCoords(d.lat, d.lon)}
                  </span>
                </span>
                <span className="relative flex items-center gap-4 text-right">
                  <span className="hidden sm:block">
                    <span className="block font-mono text-[0.6rem] tracking-[0.2em] text-sky/70 uppercase">From</span>
                    <span className="block font-display text-2xl font-bold">{formatUSD(d.fromPrice)}</span>
                  </span>
                  <span className="flex size-10 items-center justify-center border border-white/20 transition-colors duration-300 group-hover:border-pink group-hover:bg-pink group-hover:text-white">
                    →
                  </span>
                </span>
                {/* mobile thumbnail */}
                <span className="relative col-span-3 mt-3 block aspect-[16/7] overflow-hidden [--cut:16px] chamfer-tr md:hidden">
                  <Image src={photos[d.photo]} alt="" fill sizes="100vw" className="photo-grade object-cover" />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {/* cursor preview */}
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none absolute top-0 left-0 z-20 hidden md:block"
        >
          <AnimatePresence>
            {activeItem && (
              <motion.div
                key={activeItem.slug}
                initial={{ opacity: 0, scale: 0.85, clipPath: "inset(50% 0 50% 0)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-28 left-10 h-56 w-80 overflow-hidden border border-white/20 [--cut:22px] chamfer"
              >
                <Image src={photos[activeItem.photo]} alt="" fill sizes="320px" className="photo-grade object-cover" />
                <span className="absolute bottom-0 left-0 bg-navy-deep/85 px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.2em] text-cyan uppercase">
                  {activeItem.code} · {activeItem.elevation}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <KenyaMap activeSlug={active} onActiveChange={setActive} />
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[0.65rem] tracking-[0.2em] text-sky/70 uppercase">
            <span>{activeItem ? activeItem.tagline : "Hover a destination"}</span>
            <span className="text-cyan">{activeItem ? formatCoords(activeItem.lat, activeItem.lon) : "—"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
