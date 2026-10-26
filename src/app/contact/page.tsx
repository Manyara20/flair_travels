import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { CropMarks, Eyebrow } from "@/components/ui";
import { formatCoords } from "@/data/destinations";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Flair Travels in Nairobi: ${site.phone}, ${site.email}, ${site.postal}, ${site.city}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  const channels = [
    { label: "Call", value: site.phone, href: site.phoneHref },
    { label: "WhatsApp", value: site.phone, href: site.whatsappHref },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Post", value: `${site.postal}, ${site.city}` },
  ];

  return (
    <>
      <PageHero
        index="✉"
        eyebrow="Contact"
        photo="transfer"
        inset="nairobi"
        alt="Arrivals curb at Jomo Kenyatta International Airport"
        title={
          <>
            Talk to <span className="font-serif font-normal normal-case text-blush italic">us</span>
          </>
        }
        intro="Flights, visas, a safari, a conference or something in between: tell us what you need and a planner in Nairobi will reply."
      />

      <section className="bg-white text-navy">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index="A" className="text-navy/70">
              Send a message
            </Eyebrow>
            <div className="mt-10">
              {/* Inert placeholder in the static shell; the real form streams in with ?service= applied. */}
              <Suspense fallback={<ContactForm placeholder />}>
                <ContactFormFromParams searchParams={searchParams} />
              </Suspense>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28">
              <Eyebrow index="B" className="text-navy/70">
                Direct lines
              </Eyebrow>
              <ul className="mt-10 divide-y divide-white/10 bg-navy-deep text-white">
                {channels.map((c) => {
                  const body = (
                    <>
                      <span className="font-mono text-[0.6rem] tracking-[0.3em] text-cyan uppercase">{c.label}</span>
                      <span className="mt-1 block font-display text-3xl leading-tight font-black">{c.value}</span>
                    </>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block p-6 transition-colors hover:bg-pink">
                          {body}
                        </a>
                      ) : (
                        <div className="p-6">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="relative mt-8 bg-sky p-6">
                <p className="font-mono text-[0.6rem] tracking-[0.3em] text-navy/60 uppercase">Nairobi HQ</p>
                <p className="mt-2 font-display text-4xl font-black">{formatCoords(site.hq.lat, site.hq.lon)}</p>
                <p className="mt-1 text-sm text-navy/70">East Africa Time (UTC+3)</p>
                <CropMarks className="-m-2 text-pink" />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

async function ContactFormFromParams({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const { service } = await searchParams;
  return <ContactForm initialService={typeof service === "string" ? service : undefined} />;
}
