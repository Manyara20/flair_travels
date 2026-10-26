"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { photos, type PhotoKey } from "@/assets/photos";
import { destinations, formatCoords } from "@/data/destinations";
import { Marquee } from "../marquee";
import { CropMarks } from "../ui";
import { HeroLiveCard } from "./hero-live-card";

const SLIDE_MS = 6500;
const ease = [0.16, 1, 0.3, 1] as const;

/** Each slide's giant word is kept short so it fits the viewport at any width. */
const slides: { word: string; slug: string; photo: PhotoKey; alt: string }[] = [
  { word: "Kenya", slug: "maasai-mara", photo: "hero", alt: "Hot-air balloons over the Maasai Mara at dawn" },
  { word: "Maldives", slug: "maldives", photo: "maldives", alt: "Jetty leading to overwater villas in the Maldives" },
  { word: "Rwanda", slug: "rwanda", photo: "rwanda", alt: "Mountain gorilla in Volcanoes National Park" },
  { word: "Greece", slug: "greece", photo: "greece", alt: "Blue domes above the caldera in Oia, Santorini" },
  { word: "Seychelles", slug: "seychelles", photo: "seychelles", alt: "Granite boulders and white sand in the Seychelles" },
  { word: "Dubai", slug: "dubai", photo: "dubai", alt: "Dubai skyline at sunset with the Burj Khalifa" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduce]);

  const slide = slides[index];
  const dest = destinations.find((d) => d.slug === slide.slug)!;

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy-deep text-white" aria-roledescription="carousel" aria-label="Featured destinations">
      {slides.map((s, i) => (
        <div
          key={s.slug}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1.4s] ease-expo ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={photos[s.photo]}
            alt={s.alt}
            fill
            priority={i === 0}
            placeholder="blur"
            sizes="100vw"
            className={`photo-grade object-cover ${i === index && !reduce ? "animate-kenburns" : ""}`}
            key={i === index ? `on-${index}` : "off"}
          />
        </div>
      ))}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-navy-deep/60" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy-deep/20 to-transparent" />

      {/* column guides */}
      <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto grid max-w-[1600px] grid-cols-4 px-4 sm:px-8">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className="border-l border-white/[0.08] last:border-r" />
        ))}
      </div>

      {/* equator */}
      <div aria-hidden className="absolute inset-x-0 top-[58%] text-pink">
        <div className="dashed-line w-full" />
        <p className="absolute top-2 right-4 font-mono text-[0.65rem] tracking-[0.3em] sm:right-8">0°00′00″ — EQUATOR</p>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 pt-28 pb-10 sm:px-8 md:pt-40">
        <div className="flex items-start justify-between gap-6 font-mono text-[0.65rem] tracking-[0.3em] text-white/80 uppercase">
          <p>
            Flair Travels · Tours &amp; Travel
            <br />
            <span className="text-sky">Travel made easy, from Nairobi</span>
          </p>
          <Link href={`/destinations/${dest.slug}`} className="hidden text-right hover:text-cyan sm:block">
            Now showing · {dest.code}
            <br />
            <span className="text-sky">{formatCoords(dest.lat, dest.lon)}</span>
          </Link>
        </div>

        <div className="mt-auto grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="inline-block bg-navy-deep/75 px-3 py-2 font-mono text-[0.68rem] tracking-[0.3em] text-white uppercase backdrop-blur-sm">
              <span className="text-cyan">◆</span> Flights · Hotels · Visas · Transfers · Safaris · MICE
            </p>
            <h1 className="mt-4">
              <span className="sr-only">Flair Travels, tours and travel: travel made easy. </span>
              <span className="relative block h-[0.8em] overflow-hidden font-display text-[18vw] leading-[0.8] font-black tracking-[-0.02em] uppercase sm:text-[15vw] lg:text-[12.5vw] 2xl:text-[12.5rem]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={slide.word}
                    initial={reduce ? false : { y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.9, ease }}
                    className="block"
                  >
                    {slide.word}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="mt-3 flex flex-wrap items-baseline gap-x-4 text-[11vw] leading-[0.9] sm:text-[8vw] lg:text-[5.4vw] 2xl:text-[5.4rem]">
                <span className="font-serif text-white/85 italic">from the</span>
                <span className="font-display font-black text-pink uppercase">zero line.</span>
              </span>
            </h1>

            {/* slide controls */}
            <div className="mt-8 flex max-w-xl items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${s.word}`}
                  aria-current={i === index}
                  className="group relative h-8 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-white/25 group-hover:bg-white/50" />
                  {i === index && (
                    <span
                      key={`${index}-${paused}`}
                      className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-cyan"
                      style={{
                        width: paused || reduce ? "100%" : undefined,
                        animation: paused || reduce ? undefined : `hero-progress ${SLIDE_MS}ms linear forwards`,
                      }}
                    />
                  )}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="ml-3 flex size-8 shrink-0 items-center justify-center border border-white/30 font-mono text-[0.6rem] hover:border-cyan hover:text-cyan"
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              >
                {paused ? "▶" : "❚❚"}
              </button>
            </div>
          </div>

          <div className="relative lg:col-span-4">
            <HeroLiveCard />
            <CropMarks className="-m-3 text-cyan" />
          </div>
        </div>
      </div>

      <Marquee
        duration={70}
        className="relative border-y border-white/10 bg-navy-deep/80 py-4 font-display text-2xl font-bold tracking-wide text-white/85 uppercase backdrop-blur-sm md:text-3xl"
        separator={<span className="text-pink">◆</span>}
        items={destinations.map((d) => (
          <Link key={d.slug} href={`/destinations/${d.slug}`} className="inline-flex items-baseline gap-3 hover:text-cyan">
            {d.name}
            <span className="font-mono text-[0.6rem] tracking-[0.3em] text-sky/70">{d.code}</span>
          </Link>
        ))}
      />
    </section>
  );
}
