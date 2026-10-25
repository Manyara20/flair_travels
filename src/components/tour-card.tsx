import Image from "next/image";
import Link from "next/link";
import { photos } from "@/assets/photos";
import { getDestination } from "@/data/destinations";
import type { Tour } from "@/data/tours";
import { formatUSD } from "@/lib/format";
import { SegmentBar } from "./ui";

export function TourCard({ tour, className = "" }: { tour: Tour; className?: string }) {
  const codes = tour.route.map((slug) => getDestination(slug)?.code ?? slug);
  return (
    <Link href={`/tours/${tour.slug}`} className={`group block ${className}`}>
      <article className="relative flex h-full flex-col border border-bone/10 bg-ink-2 transition-colors duration-500 [--cut:32px] chamfer-tr hover:border-bone/30">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={photos[tour.photo]}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
            className="photo-grade object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent" />
          <span className="absolute top-0 left-0 bg-laterite px-3 py-2 font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-ink">
            {tour.code}
          </span>
          <span className="absolute top-0 right-10 border-x border-b border-bone/20 bg-ink/70 px-3 py-2 font-mono text-[0.6rem] tracking-[0.25em] uppercase backdrop-blur">
            {tour.style}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-[0.62rem] tracking-[0.2em] text-dust uppercase">
            {codes.join(" → ")}
          </p>
          <h3 className="mt-3 font-display text-4xl leading-[0.95] font-bold uppercase transition-colors group-hover:text-volt">
            {tour.title}
          </h3>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-bone/60">{tour.pitch}</p>

          <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-bone/10 pt-5">
            <div>
              <dt className="font-mono text-[0.58rem] tracking-[0.2em] text-dust uppercase">Days</dt>
              <dd className="mt-1 font-display text-2xl font-bold">{tour.days}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.58rem] tracking-[0.2em] text-dust uppercase">Intensity</dt>
              <dd className="mt-2.5 text-bone">
                <SegmentBar value={tour.intensity} />
              </dd>
            </div>
            <div className="text-right">
              <dt className="font-mono text-[0.58rem] tracking-[0.2em] text-dust uppercase">From</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-laterite">{formatUSD(tour.price)}</dd>
            </div>
          </dl>
        </div>
      </article>
    </Link>
  );
}
