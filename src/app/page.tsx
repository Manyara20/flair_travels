import { CtaBand } from "@/components/cta-band";
import { DestinationIndex } from "@/components/destination-index";
import { BeyondKenya } from "@/components/home/beyond-kenya";
import { ExpeditionRail } from "@/components/home/expedition-rail";
import { FieldLogs } from "@/components/home/field-logs";
import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { SeasonScanner } from "@/components/home/season-scanner";
import { ServicesShowcase } from "@/components/home/services-showcase";
import { PhotoStrip } from "@/components/photo-strip";
import { SectionHead } from "@/components/section-head";
import { TourCard } from "@/components/tour-card";
import { kenyaDestinations } from "@/data/destinations";
import { tours } from "@/data/tours";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />

      <section id="services" className="bg-white text-navy">
        <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-32">
          <SectionHead
            index="01"
            eyebrow="Our services"
            title={
              <>
                Everything <span className="font-serif font-normal normal-case text-pink italic">but</span> the packing
              </>
            }
            body="Flights, hotels, visas, transfers, safaris and conferences. Book one or let us handle the whole trip."
            cta={{ href: "/services", label: "All services" }}
          />
          <div className="mt-16">
            <ServicesShowcase />
          </div>
        </div>
      </section>

      <PhotoStrip />

      <section id="kenya" className="relative bg-navy-deep text-white">
        <div className="survey-grid absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-32">
          <SectionHead
            tone="dark"
            index="02"
            eyebrow="Destinations · Kenya"
            title={
              <>
                Eleven places. <span className="font-serif font-normal normal-case text-blush italic">One</span> country.
              </>
            }
            body="Home ground. We drive, fly into and know every one of these personally. Hover a row to find it on the map."
            cta={{ href: "/destinations#kenya", label: "Kenya destinations" }}
          />
          <div className="mt-16">
            <DestinationIndex items={kenyaDestinations.slice(0, 8)} />
          </div>
        </div>
      </section>

      <section id="beyond" className="bg-mist text-navy">
        <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-32">
          <SectionHead
            index="03"
            eyebrow="Africa & the world"
            title={
              <>
                Beyond the <span className="font-serif font-normal normal-case text-cyan italic">border</span>
              </>
            }
            body="Gorillas in Rwanda, the Serengeti, the Cape and the islands, then Bali, the Maldives, Dubai, Greece and Italy. Every route starts at NBO."
            cta={{ href: "/destinations", label: "All destinations" }}
          />
          <div className="mt-16">
            <BeyondKenya />
          </div>
        </div>
      </section>

      <section className="relative bg-navy py-24 text-white md:py-32">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <SectionHead
            tone="dark"
            index="04"
            eyebrow="Safari expeditions"
            title={
              <>
                Routes <span className="font-serif font-normal normal-case text-blush italic">already</span> tested
              </>
            }
            body="Six safari and coast itineraries our guides have refined over many seasons. Use one as it is or as a starting point."
            cta={{ href: "/tours", label: "Compare expeditions" }}
          />
        </div>
        <div className="mt-16">
          <ExpeditionRail count={tours.length}>
            {tours.map((t) => (
              <div key={t.slug} data-rail-item className="w-[85vw] max-w-[440px] shrink-0 snap-start">
                <TourCard tour={t} className="h-full" />
              </div>
            ))}
          </ExpeditionRail>
        </div>
      </section>

      <section id="seasons" className="survey-grid relative scroll-mt-20 bg-white text-navy">
        <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-32">
          <SectionHead
            index="05"
            eyebrow="Kenya season scanner"
            title={
              <>
                When to go, <span className="font-serif font-normal normal-case text-pink italic">month</span> by month
              </>
            }
            body="Kenya has two rainy seasons, and each region responds differently. Pick a month to see which places are at their best."
          />
          <div className="mt-16">
            <SeasonScanner />
          </div>
        </div>
      </section>

      <FieldLogs />
      <CtaBand />
    </>
  );
}
