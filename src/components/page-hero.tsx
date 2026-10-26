import Image from "next/image";
import type { ReactNode } from "react";
import { photos, type PhotoKey } from "@/assets/photos";
import { Reveal } from "./reveal";
import { CropMarks, Eyebrow } from "./ui";

/**
 * Inner-page header: full-bleed photo with a navy wash, plus an optional
 * inset second photo for a layered, collage feel.
 */
export function PageHero({
  index,
  eyebrow,
  title,
  intro,
  aside,
  photo,
  inset,
  alt = "",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  aside?: ReactNode;
  photo: PhotoKey;
  inset?: PhotoKey;
  alt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep pt-36 text-white md:pt-52">
      <Image src={photos[photo]} alt={alt} fill priority placeholder="blur" sizes="100vw" className="photo-grade animate-kenburns object-cover" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy-deep/40" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-24 hidden text-pink lg:block">
        <div className="dashed-line w-full" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] gap-10 px-4 pb-16 sm:px-8 md:pb-24 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-8">
          <Eyebrow index={index} className="text-white/85">
            {eyebrow}
          </Eyebrow>
          <h1 className="mt-8 font-display text-[17vw] leading-[0.82] font-black uppercase sm:text-[12vw] lg:text-[9.5rem]">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-4">
          {inset && (
            <div className="relative mb-8 hidden lg:block">
              <div className="relative aspect-[16/10] overflow-hidden [--cut:24px] chamfer-tr">
                <Image src={photos[inset]} alt="" fill sizes="30vw" className="photo-grade object-cover" />
              </div>
              <CropMarks className="-m-2 text-cyan" />
            </div>
          )}
          <p className="max-w-md text-lg leading-relaxed text-white/85">{intro}</p>
          {aside && <div className="mt-8">{aside}</div>}
        </Reveal>
      </div>
    </section>
  );
}
