import Image from "next/image";
import Link from "next/link";
import { photos } from "@/assets/photos";
import { destinations } from "@/data/destinations";
import { Marquee } from "./marquee";

/** A moving contact sheet of every destination: a full-bleed band of photography. */
export function PhotoStrip({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="border-y-8 border-navy-deep bg-navy-deep">
      <Marquee
        duration={90}
        reverse={reverse}
        separator={null}
        itemClassName="px-1"
        items={destinations.map((d) => (
          <Link
            key={d.slug}
            href={`/destinations/${d.slug}`}
            className="group relative block h-44 w-64 overflow-hidden md:h-60 md:w-96"
          >
            <Image
              src={photos[d.photo]}
              alt={d.name}
              fill
              sizes="(min-width: 768px) 384px, 256px"
              className="photo-grade object-cover transition-transform duration-700 ease-expo group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 font-display text-2xl font-black text-white uppercase">{d.name}</span>
            <span className="absolute top-0 right-0 bg-pink px-2 py-1 font-mono text-[0.55rem] tracking-[0.2em] text-white">{d.code}</span>
          </Link>
        ))}
      />
    </div>
  );
}
