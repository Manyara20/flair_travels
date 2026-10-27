import Image from "next/image";
import Link from "next/link";
import { photos } from "@/assets/photos";
import { getDestination } from "@/data/destinations";
import type { Tour } from "@/data/tours";
import { SegmentBar } from "./ui";

/** White expedition card; reads well on both navy and white sections. */
export function TourCard({ tour, className = "" }: { tour: Tour; className?: string }) {
  const codes = tour.route.map((slug) => getDestination(slug)?.code ?? slug);
  return (
    <Link href={`/tours/${tour.slug}`} className={`group block ${className}`}>
      <article className="relative flex h-full flex-col border border-navy/10 bg-white text-navy transition-shadow duration-500 [--cut:32px] chamfer-tr group-hover:shadow-[0_24px_50px_-24px_rgb(44_60_76/0.5)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={photos[tour.photo]}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
            className="photo-grade object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105"
          />
          <span className="absolute top-0 left-0 bg-pink px-3 py-2 font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-white">
            {tour.code}
          </span>
          <span className="absolute right-10 bottom-0 bg-cyan px-3 py-2 font-mono text-[0.6rem] tracking-[0.25em] text-white uppercase">
            {tour.style}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-[0.62rem] tracking-[0.2em] text-navy/55 uppercase">{codes.join(" → ")}</p>
          <h3 className="mt-3 font-display text-4xl leading-[0.95] font-black uppercase transition-colors group-hover:text-pink">
            {tour.title}
          </h3>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-navy/70">{tour.pitch}</p>

          <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-navy/10 pt-5">
            <div>
              <dt className="font-mono text-[0.58rem] tracking-[0.2em] text-navy/55 uppercase">Days</dt>
              <dd className="mt-1 font-display text-2xl font-bold">{tour.days}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.58rem] tracking-[0.2em] text-navy/55 uppercase">Intensity</dt>
              <dd className="mt-2.5">
                <SegmentBar value={tour.intensity} />
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </Link>
  );
}
