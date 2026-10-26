"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { type Destination, kenyaDestinations } from "@/data/destinations";

// Simplified national boundary (lon, lat), derived from Natural Earth 1:110m.
const BORDER: [number, number][] = [
  [40.993, -0.858], [41.585, -1.683], [40.885, -2.083], [40.638, -2.5], [40.263, -2.573],
  [40.121, -3.278], [39.8, -3.681], [39.605, -4.347], [39.202, -4.677], [37.767, -3.677],
  [37.699, -3.097], [34.073, -1.06], [33.904, -0.95], [33.894, 0.11], [34.18, 0.515],
  [34.672, 1.177], [35.036, 1.906], [34.596, 3.054], [34.479, 3.556], [34.005, 4.25],
  [34.62, 4.847], [35.298, 5.506], [35.817, 5.338], [35.817, 4.777], [36.159, 4.448],
  [36.855, 4.448], [38.121, 3.599], [38.437, 3.589], [38.671, 3.616], [38.893, 3.501],
  [39.559, 3.422], [39.855, 3.839], [40.768, 4.257], [41.172, 3.919], [41.855, 3.919],
  [40.981, 2.785], [40.993, -0.858],
];

// Rough outline of Lake Turkana, for orientation only.
const TURKANA: [number, number][] = [
  [35.95, 4.5], [36.1, 4.3], [36.2, 3.9], [36.35, 3.5], [36.45, 3.1], [36.6, 2.7], [36.55, 2.45],
  [36.4, 2.6], [36.2, 3.0], [36.05, 3.5], [35.95, 4.0],
];

const LON0 = 33.5;
const LAT0 = 5.8;
const K = 100;
const project = (lon: number, lat: number) => [(lon - LON0) * K, (LAT0 - lat) * K] as const;
const toPath = (pts: [number, number][]) =>
  pts.map(([lon, lat], i) => `${i ? "L" : "M"}${project(lon, lat).join(" ")}`).join(" ") + " Z";

const EQUATOR_Y = project(0, 0)[1];

type Props = {
  activeSlug?: string | null;
  onActiveChange?: (slug: string | null) => void;
  /** Slugs to connect with an animated route line, in order. Non-Kenyan slugs are ignored. */
  route?: string[];
  /** 0–2 strength per slug; markers fade when weak (used by the season scanner). */
  strength?: Record<string, number>;
  /** When set, markers become toggles that call this instead of linking out. */
  onSelect?: (slug: string) => void;
  className?: string;
};

/**
 * Map of Kenya drawn in `currentColor`, so it works on light and dark
 * sections alike. Pink marks the active place and route; cyan marks prime season.
 */
export function KenyaMap({ activeSlug, onActiveChange, route, strength, onSelect, className = "" }: Props) {
  const reduce = useReducedMotion();
  // Tracks pointer/keyboard focus locally so every map gives feedback, even uncontrolled ones.
  const [hovered, setHovered] = useState<string | null>(null);
  const routePoints = route
    ?.map((slug) => kenyaDestinations.find((d) => d.slug === slug))
    .filter((d): d is Destination => Boolean(d))
    .map((d) => project(d.lon, d.lat));

  return (
    <svg viewBox="-40 -20 960 1120" className={`h-auto w-full ${className}`} role="img" aria-label="Map of Kenya with Flair Travels destinations">
      {/* graticule */}
      <g stroke="currentColor" strokeOpacity="0.1">
        {Array.from({ length: 10 }, (_, i) => {
          const x = (34 + i - LON0) * K;
          return <line key={`v${i}`} x1={x} y1={0} x2={x} y2={1080} />;
        })}
        {Array.from({ length: 11 }, (_, i) => {
          const y = (LAT0 - (5 - i)) * K;
          return <line key={`h${i}`} x1={0} y1={y} x2={880} y2={y} />;
        })}
      </g>
      <g className="fill-current font-mono" fillOpacity="0.55" fontSize="14" letterSpacing="2">
        {Array.from({ length: 9 }, (_, i) => (
          <text key={i} x={(34 + i - LON0) * K + 6} y={1070}>
            {34 + i}°E
          </text>
        ))}
        {[4, 2, -2, -4].map((lat) => (
          <text key={lat} x={6} y={(LAT0 - lat) * K - 6}>
            {Math.abs(lat)}°{lat > 0 ? "N" : "S"}
          </text>
        ))}
      </g>

      {/* country */}
      <motion.path
        d={toPath(BORDER)}
        fill="currentColor"
        fillOpacity="0.05"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <path d={toPath(TURKANA)} className="fill-cyan" fillOpacity="0.35" />
      <text x={(36.9 - LON0) * K} y={(LAT0 - 3.3) * K} className="fill-current font-mono" fillOpacity="0.55" fontSize="12" letterSpacing="2">
        L. TURKANA
      </text>
      <text
        transform={`translate(${(41.2 - LON0) * K} ${(LAT0 + 3.2) * K}) rotate(-58)`}
        className="fill-cyan font-mono"
        fontSize="14"
        letterSpacing="6"
      >
        INDIAN OCEAN
      </text>

      {/* equator */}
      <line x1={-40} x2={920} y1={EQUATOR_Y} y2={EQUATOR_Y} className="stroke-pink" strokeWidth="1.5" strokeDasharray="10 8" />
      <text x={600} y={EQUATOR_Y - 10} className="fill-pink font-mono" fontSize="14" letterSpacing="3">
        0°00′00″ EQUATOR
      </text>

      {/* route */}
      {routePoints && routePoints.length > 1 && (
        <motion.polyline
          key={route?.join("-")}
          points={routePoints.map((p) => p.join(",")).join(" ")}
          fill="none"
          className="stroke-cyan"
          strokeWidth="3"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      {/* markers */}
      {kenyaDestinations.map((d) => {
        const [x, y] = project(d.lon, d.lat);
        const active = activeSlug === d.slug || hovered === d.slug;
        const s = strength?.[d.slug];
        const inRoute = route?.includes(d.slug);
        const labelLeft = d.lon > 39.5;
        const hover = {
          onMouseEnter: () => (setHovered(d.slug), onActiveChange?.(d.slug)),
          onMouseLeave: () => (setHovered(null), onActiveChange?.(null)),
          onFocus: () => (setHovered(d.slug), onActiveChange?.(d.slug)),
          onBlur: () => (setHovered(null), onActiveChange?.(null)),
        };
        const marker = (
          <g transform={`translate(${x} ${y})`} className="transition-opacity duration-500" opacity={s === 0 && !active ? 0.3 : 1}>
            <rect x={-22} y={-22} width={44} height={44} fill="transparent" />
            {active && (
              <motion.rect layoutId="map-active" x={-16} y={-16} width={32} height={32} fill="none" className="stroke-pink" strokeWidth="2" />
            )}
            <rect
              x={-7}
              y={-7}
              width={14}
              height={14}
              transform="rotate(45)"
              className={active || inRoute ? "fill-pink" : s === 2 ? "fill-cyan" : "fill-current"}
            />
            <line x1={-26} x2={-12} y1={0} y2={0} stroke="currentColor" strokeOpacity="0.4" />
            <line x1={12} x2={26} y1={0} y2={0} stroke="currentColor" strokeOpacity="0.4" />
            {active && (
              <g transform={`translate(${labelLeft ? -32 : 32} 0)`} textAnchor={labelLeft ? "end" : "start"}>
                <text y={-4} className="fill-pink font-display" fontSize="28" fontWeight="800">
                  {d.name.toUpperCase()}
                </text>
                <text y={16} className="fill-current font-mono" fillOpacity="0.65" fontSize="12" letterSpacing="2">
                  {d.code} · {d.elevation}
                </text>
              </g>
            )}
          </g>
        );
        return onSelect ? (
          <g
            key={d.slug}
            role="button"
            tabIndex={0}
            aria-label={`${inRoute ? "Remove" : "Add"} ${d.name}`}
            aria-pressed={Boolean(inRoute)}
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
