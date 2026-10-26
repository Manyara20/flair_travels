import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photos } from "@/assets/photos";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Reveal, Wipe } from "@/components/reveal";
import { ButtonLink, CropMarks } from "@/components/ui";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Air ticketing, hotel reservations, visa processing, airport transfers, exclusive and safari packages, and MICE & conferences, from Nairobi.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Our services"
        photo="air"
        inset="hotel"
        alt="Kenya Airways Dreamliner on the runway"
        title={
          <>
            One <span className="font-serif font-normal normal-case text-blush italic">desk</span>, six services
          </>
        }
        intro="Book a single service or have us handle the whole trip. Either way you deal with one team that has your details in front of it."
        aside={
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="block border border-white/30 px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.2em] uppercase hover:border-cyan hover:bg-cyan">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        }
      />

      {services.map((s, i) => {
        const flip = i % 2 === 1;
        const dark = i % 3 === 1;
        return (
          <section
            key={s.slug}
            id={s.slug}
            className={`scroll-mt-24 ${dark ? "bg-navy-deep text-white" : i % 3 === 2 ? "bg-sky text-navy" : "bg-white text-navy"}`}
          >
            <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-12">
              <div className={`relative lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                <Wipe from={flip ? "right" : "left"}>
                  <div className="relative aspect-[16/11] overflow-hidden [--cut:48px] chamfer-tr">
                    <Image src={photos[s.photo]} alt={s.title} fill placeholder="blur" sizes="(min-width: 1024px) 58vw, 100vw" className="photo-grade object-cover" />
                    <span className="absolute top-0 left-0 bg-pink px-4 py-3 font-mono text-xs font-semibold tracking-[0.2em] text-white">{s.code}</span>
                  </div>
                </Wipe>
                <CropMarks size={24} className={`-m-3 ${dark ? "text-cyan" : "text-pink"}`} />
              </div>
              <Reveal className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                <h2 className="font-display text-6xl leading-[0.88] font-black uppercase md:text-7xl">{s.title}</h2>
                <p className={`mt-6 text-lg leading-relaxed ${dark ? "text-white/75" : "text-navy/75"}`}>{s.pitch}</p>
                <ul className="mt-8 space-y-2">
                  {s.includes.slice(0, 4).map((inc) => (
                    <li key={inc} className="flex items-start gap-3">
                      <span className="mt-2 size-2 shrink-0 rotate-45 bg-pink" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-4">
                  <ButtonLink href={`/services/${s.slug}`}>Details</ButtonLink>
                  <ButtonLink href={s.cta.href} variant={dark ? "light" : "outline"}>
                    {s.cta.label}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="bg-white">
        <div className="mx-auto max-w-[1600px] px-4 pt-20 sm:px-8">
          <Link href="/contact" className="group flex flex-col items-start justify-between gap-6 border-y-2 border-navy py-10 text-navy md:flex-row md:items-center">
            <span className="font-display text-5xl leading-none font-black uppercase md:text-7xl">
              Not sure where to <span className="text-pink">start?</span>
            </span>
            <span className="font-mono text-xs tracking-[0.25em] uppercase transition-colors group-hover:text-pink">Send us a message →</span>
          </Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
