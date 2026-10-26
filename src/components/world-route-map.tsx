"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { destinations } from "@/data/destinations";
import { site } from "@/data/site";
import { distanceFromNairobi } from "@/lib/geo";

// Equirectangular window: 25°W → 130°E, 50°N → 42°S, 10 px per degree.
const LON0 = -25;
const LAT0 = 50;
const K = 10;
const W = 155 * K;
const H = 92 * K;
const project = (lon: number, lat: number) => [(lon - LON0) * K, (LAT0 - lat) * K] as const;

const HUB = project(site.hq.lon, site.hq.lat);

/**
 * Zooms the chart to the plotted points (plus Nairobi), keeping a sensible
 * aspect ratio so single short routes don't look lost in the full window.
 */
function fitViewBox(points: (readonly [number, number])[]) {
  const pad = 190;
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  let [x0, x1, y0, y1] = [Math.min(...xs) - pad, Math.max(...xs) + pad, Math.min(...ys) - pad, Math.max(...ys) + pad];
  const grow = (lo: number, hi: number, size: number) => {
    const extra = Math.max(0, size - (hi - lo)) / 2;
    return [lo - extra, hi + extra] as const;
  };
  [x0, x1] = grow(x0, x1, Math.max(640, (y1 - y0) * 1.6));
  [y0, y1] = grow(y0, y1, Math.max(400, (x1 - x0) / 2.1));
  // Keep inside the drawn window.
  const shift = (lo: number, hi: number, min: number, max: number) => {
    if (hi - lo >= max - min) return [min, max] as const;
    if (lo < min) return [min, hi + (min - lo)] as const;
    if (hi > max) return [lo - (hi - max), max] as const;
    return [lo, hi] as const;
  };
  [x0, x1] = shift(x0, x1, -20, W + 20);
  [y0, y1] = shift(y0, y1, -20, H + 20);
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}

/** A curved flight arc from Nairobi, bowed to one side in proportion to its length. */
function arcPath(x: number, y: number) {
  const [x0, y0] = HUB;
  const dx = x - x0;
  const dy = y - y0;
  const len = Math.hypot(dx, dy);
  const bow = Math.min(len * 0.22, 140);
  const cx = (x0 + x) / 2 + (-dy / len) * bow;
  const cy = (y0 + y) / 2 + (dx / len) * bow;
  return `M${x0} ${y0} Q${cx} ${cy} ${x} ${y}`;
}

// Rwanda, Uganda and the Serengeti sit close to Nairobi; nudge their labels apart.
const LABEL_NUDGE: Record<string, { dy: number; left?: boolean }> = {
  uganda: { dy: -30, left: true },
  rwanda: { dy: 34, left: true },
  serengeti: { dy: 52 },
};

const WATERMARKS = [
  { label: "AFRICA", lon: 8, lat: 8 },
  { label: "EUROPE", lon: 8, lat: 47 },
  { label: "ASIA", lon: 85, lat: 40 },
  { label: "INDIAN OCEAN", lon: 68, lat: -22 },
  { label: "ATLANTIC", lon: -20, lat: -20 },
];

type Props = {
  /** Which destinations to plot. Defaults to everything outside Kenya. */
  slugs?: string[];
  activeSlug?: string | null;
  onActiveChange?: (slug: string | null) => void;
  /** When set, markers become toggles that call this instead of linking out. */
  onSelect?: (slug: string) => void;
  selected?: string[];
  className?: string;
};

/**
 * "Flights from Nairobi" chart: a graticule with the equator and tropics,
 * and an arc from NBO to every destination beyond Kenya. Drawn in currentColor.
 */
export function WorldRouteMap({ slugs, activeSlug, onActiveChange, onSelect, selected, className = "" }: Props) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const items = destinations.filter((d) => (slugs ? slugs.includes(d.slug) : d.collection !== "kenya"));
  const active = hovered ?? activeSlug ?? null;
  const vb = fitViewBox([HUB, ...items.map((d) => project(d.lon, d.lat))]);

  return (
    <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} className={`h-auto w-full ${className}`} role="img" aria-label="Flight routes from Nairobi">
      {/* graticule every 15° */}
      <g stroke="currentColor" strokeOpacity="0.1">
        {Array.from({ length: 10 }, (_, i) => {
          const x = (-15 + i * 15 - LON0) * K;
          return <line key={`v${i}`} x1={x} y1={0} x2={x} y2={H} />;
        })}
        {[45, 30, 15, -15, -30].map((lat) => (
          <line key={lat} x1={0} x2={W} y1={(LAT0 - lat) * K} y2={(LAT0 - lat) * K} />
        ))}
      </g>
      <g className="fill-current font-display" fillOpacity="0.07" fontSize="64" fontWeight="900" letterSpacing="8">
        {WATERMARKS.map((w) => {
          const [x, y] = project(w.lon, w.lat);
          return (
            <text key={w.label} x={x} y={y}>
              {w.label}
            </text>
          );
        })}
      </g>

      {/* equator and tropics */}
      {[
        { lat: 0, label: "0° EQUATOR", cls: "stroke-pink", dash: "12 8", text: "fill-pink" },
        { lat: 23.44, label: "TROPIC OF CANCER", cls: "stroke-current", dash: "2 8", text: "fill-current" },
        { lat: -23.44, label: "TROPIC OF CAPRICORN", cls: "stroke-current", dash: "2 8", text: "fill-current" },
      ].map((l) => {
        const y = (LAT0 - l.lat) * K;
        return (
          <g key={l.label}>
            <line x1={0} x2={W} y1={y} y2={y} className={l.cls} strokeOpacity={l.lat === 0 ? 1 : 0.35} strokeWidth="1.5" strokeDasharray={l.dash} />
            <text x={vb.x + vb.w - 12} y={y - 8} textAnchor="end" className={`${l.text} font-mono`} fillOpacity={l.lat === 0 ? 1 : 0.5} fontSize="13" letterSpacing="3">
              {l.label}
            </text>
          </g>
        );
      })}

      {/* arcs */}
      {items.map((d, i) => {
        const [x, y] = project(d.lon, d.lat);
        const on = active === d.slug || selected?.includes(d.slug);
        return (
          <motion.path
            key={`arc-${d.slug}`}
            d={arcPath(x, y)}
            fill="none"
            className={on ? "stroke-pink" : "stroke-cyan"}
            strokeWidth={on ? 3 : 1.5}
            strokeOpacity={active && !on ? 0.25 : 0.9}
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: reduce ? 0 : 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}

      {/* hub */}
      <g transform={`translate(${HUB[0]} ${HUB[1]})`}>
        <rect x={-11} y={-11} width={22} height={22} className="fill-pink" />
        <rect x={-18} y={-18} width={36} height={36} fill="none" className="stroke-pink" strokeWidth="1.5" />
        <text x={0} y={-30} textAnchor="middle" className="fill-pink font-display" fontSize="28" fontWeight="900">
          NBO
        </text>
      </g>

      {/* destinations */}
      {items.map((d) => {
        const [x, y] = project(d.lon, d.lat);
        const on = active === d.slug || selected?.includes(d.slug);
        const nudge = LABEL_NUDGE[d.slug];
        const left = nudge?.left ?? (x > W - 260 || d.slug === "cape-town");
        const hover = {
          onMouseEnter: () => (setHovered(d.slug), onActiveChange?.(d.slug)),
          onMouseLeave: () => (setHovered(null), onActiveChange?.(null)),
          onFocus: () => (setHovered(d.slug), onActiveChange?.(d.slug)),
          onBlur: () => (setHovered(null), onActiveChange?.(null)),
        };
        const marker = (
          <g transform={`translate(${x} ${y})`}>
            <rect x={-26} y={-26} width={52} height={52} fill="transparent" />
            <rect x={-8} y={-8} width={16} height={16} transform="rotate(45)" className={on ? "fill-pink" : "fill-cyan"} />
            <g transform={`translate(${left ? -18 : 18} ${nudge?.dy ?? 0})`} textAnchor={left ? "end" : "start"}>
              <text y={-2} className={`font-display ${on ? "fill-pink" : "fill-current"}`} fontSize={on ? 34 : 26} fontWeight="800">
                {d.name.toUpperCase()}
              </text>
              <text y={20} className="fill-current font-mono" fillOpacity="0.6" fontSize="15" letterSpacing="2">
                {d.code}
                {on ? ` · ${distanceFromNairobi(d.lat, d.lon).toLocaleString("en-US")} KM` : ""}
              </text>
            </g>
          </g>
        );
        return onSelect ? (
          <g
            key={d.slug}
            role="button"
            tabIndex={0}
            aria-label={`${selected?.includes(d.slug) ? "Remove" : "Add"} ${d.name}`}
            aria-pressed={Boolean(selected?.includes(d.slug))}
            onClick={() => onSelect(d.slug)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(d.slug);
              }
            }}
            className="cursor-pointer outline-none"
            {...hover}
          >
            {marker}
          </g>
        ) : (
          <Link key={d.slug} href={`/destinations/${d.slug}`} aria-label={d.name} className="outline-none" {...hover}>
            {marker}
          </Link>
        );
      })}
    </svg>
  );
}
