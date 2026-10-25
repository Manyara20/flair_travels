import { CtaBand } from "@/components/cta-band";
import { DestinationIndex } from "@/components/destination-index";
import { ExpeditionRail } from "@/components/home/expedition-rail";
import { FieldLogs } from "@/components/home/field-logs";
import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { SeasonScanner } from "@/components/home/season-scanner";
import { Reveal } from "@/components/reveal";
import { TourCard } from "@/components/tour-card";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />

      <section id="destinations" className="relative bg-ink">
        <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-32">
          <SectionHead
            index="01"
            eyebrow="Destination index"
            title={
              <>
                Eleven places. <span className="font-serif font-normal normal-case text-dust italic">One</span> country.
              </>
            }
            body="Every destination here is one we drive, fly into and know personally. Hover a row to find it on the map."
            cta={{ href: "/destinations", label: "All destinations" }}
          />
          <div className="mt-16">
            <DestinationIndex items={destinations.slice(0, 8)} />
          </div>
        </div>
      </section>

      <section className="relative border-t border-bone/10 bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <SectionHead
            index="02"
            eyebrow="Expeditions"
            title={
              <>
                Routes <span className="font-serif font-normal normal-case text-laterite italic">already</span> tested
              </>
            }
            body="Six itineraries our guides have refined over many seasons. Use one as it is or as a starting point for your own."
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

      <section id="seasons" className="survey-grid relative scroll-mt-20 border-t border-bone/10 bg-ink">
        <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-32">
          <SectionHead
            index="03"
            eyebrow="Season scanner"
            title={
              <>
                When to go, <span className="font-serif font-normal normal-case text-volt italic">month</span> by month
              </>
            }
            body="Kenya has two rainy seasons, and each region responds differently. Pick a month to see which destinations are at their best."
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

function SectionHead({
  index,
  eyebrow,
  title,
  body,
  cta,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <Reveal className="lg:col-span-8">
        <Eyebrow index={index} className="text-bone/70">
          {eyebrow}
        </Eyebrow>
        <h2 className="mt-6 font-display text-[14vw] leading-[0.86] font-black uppercase sm:text-[9vw] lg:text-[6.5rem]">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.15} className="flex flex-col items-start gap-6 lg:col-span-4">
        <p className="max-w-md leading-relaxed text-bone/60">{body}</p>
        {cta && (
          <ButtonLink href={cta.href} variant="ghost">
            {cta.label}
          </ButtonLink>
        )}
      </Reveal>
    </div>
  );
}
