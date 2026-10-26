import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photos } from "@/assets/photos";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { PhotoStrip } from "@/components/photo-strip";
import { Reveal, Wipe } from "@/components/reveal";
import { ButtonLink, CropMarks, Eyebrow } from "@/components/ui";
import { formatCoords } from "@/data/destinations";
import { services } from "@/data/services";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Flair Travels is a Nairobi travel company handling flights, hotels, visas, transfers, safaris and conferences across Kenya, Africa and the world.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "One desk, whole trip",
    body: "Flight, visa, transfer, hotel and safari are booked by one team that can see the whole picture. If one piece moves, we move the rest.",
  },
  {
    title: "Local first",
    body: "We're based in Nairobi and know Kenya from the ground. That knowledge shapes how we plan everywhere else too.",
  },
  {
    title: "Timed to the season",
    body: "Every recommendation takes the calendar into account: migrations, rains, monsoons, festival dates and school holidays.",
  },
  {
    title: "Straight answers",
    body: "Clear prices, written confirmations and a real person on the phone. If something isn't a good idea, we'll tell you.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="About us"
        photo="nairobi"
        inset="culture"
        alt="Nairobi skyline seen across the national park"
        title={
          <>
            Made in <span className="font-serif font-normal normal-case text-blush italic">Nairobi</span>
          </>
        }
        intro="Flair Travels is a full-service travel company on the equator. We send people across Kenya, around Africa and out to the rest of the world, and we bring them home again."
      />

      {/* story */}
      <section className="bg-white text-navy">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow index="A" className="text-navy/70">
              Who we are
            </Eyebrow>
            <p className="mt-8 font-display text-5xl leading-[0.95] font-black uppercase md:text-6xl">
              Safari roots, <span className="text-pink">full-service</span> reach.
            </p>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-navy/75">
              <p>
                Travellers rarely need just one thing. A safari also needs a flight, perhaps a visa, a few days on the
                beach afterwards and someone waiting at arrivals. We handle all of it from one desk.
              </p>
              <p>
                The same team that plans a Maasai Mara migration safari also books a corporate delegation to Dubai,
                prepares Schengen visas for a family trip to Italy, and meets a 2 a.m. arrival at JKIA.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/services">Our services</ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Talk to us
              </ButtonLink>
            </div>
          </Reveal>

          {/* collage */}
          <div className="relative min-h-[560px] lg:col-span-6">
            <Wipe className="absolute top-0 right-0 h-[62%] w-[78%]">
              <div className="relative h-full overflow-hidden [--cut:40px] chamfer-tr">
                <Image src={photos.lioness} alt="Lioness beside a safari vehicle in the Maasai Mara" fill placeholder="blur" sizes="40vw" className="photo-grade object-cover" />
              </div>
            </Wipe>
            <Wipe delay={0.2} from="left" className="absolute bottom-0 left-0 h-[48%] w-[58%]">
              <div className="relative h-full overflow-hidden border-8 border-white [--cut:28px] chamfer-bl">
                <Image src={photos.air} alt="Kenya Airways Dreamliner" fill placeholder="blur" sizes="30vw" className="photo-grade object-cover" />
              </div>
            </Wipe>
            <Wipe delay={0.35} from="right" className="absolute right-6 bottom-6 h-[30%] w-[34%]">
              <div className="relative h-full overflow-hidden border-8 border-white">
                <Image src={photos.greece} alt="Santorini" fill placeholder="blur" sizes="20vw" className="photo-grade object-cover" />
              </div>
            </Wipe>
            <div aria-hidden className="absolute top-[58%] left-[-4%] h-24 w-24 bg-cyan" />
            <div aria-hidden className="absolute top-6 left-6 size-14 bg-pink" />
          </div>
        </div>
      </section>

      {/* what we do */}
      <section className="relative bg-navy-deep text-white">
        <div className="survey-grid absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-32">
          <Eyebrow index="B" className="text-white/75">
            What we do
          </Eyebrow>
          <ul className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.slug} className="bg-navy-deep">
                <Reveal delay={(i % 3) * 0.08}>
                  <Link href={`/services/${s.slug}`} className="group flex items-center gap-5 p-6 transition-colors hover:bg-white/5">
                    <span className="relative size-20 shrink-0 overflow-hidden [--cut:14px] chamfer-tr">
                      <Image src={photos[s.photo]} alt="" fill sizes="80px" className="photo-grade object-cover transition-transform duration-700 group-hover:scale-110" />
                    </span>
                    <span>
                      <span className="font-mono text-[0.6rem] tracking-[0.2em] text-pink">{s.code}</span>
                      <span className="mt-1 block font-display text-2xl leading-none font-black uppercase group-hover:text-cyan">{s.title}</span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* principles */}
      <section className="bg-sky text-navy">
        <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-32">
          <Eyebrow index="C" className="text-navy/70">
            How we work
          </Eyebrow>
          <div className="mt-12 grid gap-px bg-navy/15 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="bg-sky">
                <div className="flex h-full flex-col p-8">
                  <span className="font-display text-7xl leading-none font-black text-pink">0{i + 1}</span>
                  <h3 className="mt-8 font-display text-3xl font-black uppercase">{p.title}</h3>
                  <p className="mt-4 leading-relaxed text-navy/75">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PhotoStrip reverse />

      {/* office */}
      <section className="bg-white text-navy">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Eyebrow index="D" className="text-navy/70">
              Find us
            </Eyebrow>
            <p className="mt-8 font-display text-6xl leading-[0.9] font-black uppercase">
              On the <span className="text-pink">equator</span>, give or take 143 km.
            </p>
            <dl className="mt-10 divide-y divide-navy/10 border-y border-navy/10">
              {[
                ["Phone & WhatsApp", <a key="p" href={site.phoneHref} className="hover:text-pink">{site.phone}</a>],
                ["Email", <a key="e" href={`mailto:${site.email}`} className="hover:text-pink">{site.email}</a>],
                ["Post", `${site.postal}, ${site.city}`],
                ["Web", "flairtravels.com"],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <dt className="font-mono text-[0.65rem] tracking-[0.25em] text-navy/55 uppercase">{k}</dt>
                  <dd className="font-display text-2xl font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden [--cut:48px] chamfer">
              <Image src={photos.mice} alt="Kenyatta International Convention Centre, Nairobi" fill placeholder="blur" sizes="(min-width: 1024px) 58vw, 100vw" className="photo-grade object-cover" />
              <div className="absolute bottom-0 left-0 bg-navy-deep/90 px-5 py-4 font-mono text-xs tracking-[0.2em] text-white uppercase">
                <span className="text-cyan">◆</span> Nairobi · {formatCoords(site.hq.lat, site.hq.lon)}
              </div>
            </div>
            <CropMarks size={24} className="-m-3 text-pink" />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
