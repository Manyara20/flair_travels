import Image from "next/image";
import Link from "next/link";
import { photos } from "@/assets/photos";
import { services } from "@/data/services";
import { Reveal } from "../reveal";

/**
 * Bento grid of the six services. The first and last tiles are wide so the
 * photography carries the section.
 */
export function ServicesShowcase() {
  return (
    <div className="grid auto-rows-[minmax(260px,auto)] gap-4 md:grid-cols-6">
      {services.map((s, i) => {
        const wide = i === 0 || i === 5;
        return (
          <Reveal
            key={s.slug}
            delay={(i % 3) * 0.08}
            className={wide ? "md:col-span-4" : i === 1 || i === 4 ? "md:col-span-2" : "md:col-span-3"}
          >
            <Link
              href={`/services/${s.slug}`}
              className="group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden text-white [--cut:32px] chamfer-tr"
            >
              <Image
                src={photos[s.photo]}
                alt=""
                fill
                placeholder="blur"
                sizes={wide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                className="photo-grade object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-transparent" />
              <div className="absolute inset-0 bg-pink/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-pink/25" />
              <span className="absolute top-0 left-0 bg-cyan px-3 py-2 font-mono text-[0.65rem] font-semibold tracking-[0.2em]">{s.code}</span>
              <div className="relative p-6 md:p-8">
                <h3 className="font-display text-4xl leading-[0.9] font-black uppercase md:text-5xl">{s.title}</h3>
                <p className="mt-3 max-w-md text-sm text-white/80">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.25em] uppercase">
                  <span className="h-px w-8 bg-pink transition-[width] duration-500 ease-expo group-hover:w-16" />
                  Explore
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
