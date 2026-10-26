import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { photos } from "@/assets/photos";
import { CtaBand } from "@/components/cta-band";
import { Reveal, SplitLine } from "@/components/reveal";
import { ButtonLink, CropMarks, Eyebrow } from "@/components/ui";
import { getService, services } from "@/data/services";
import { site } from "@/data/site";
import { pad } from "@/lib/format";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.title, description: s.short, alternates: { canonical: `/services/${s.slug}` } };
}

const steps = [
  { title: "Brief", body: "Tell us dates, names and what you need, by form, email, phone or WhatsApp." },
  { title: "Options", body: "We come back with clear options and prices, usually the same working day." },
  { title: "Confirm", body: "You choose. We book, pay suppliers and send written confirmations." },
  { title: "Travel", body: "We stay reachable while you're away and fix anything that changes." },
];

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const index = services.indexOf(s);
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <section className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden bg-navy-deep text-white">
        <Image src={photos[s.photo]} alt={s.title} fill priority placeholder="blur" sizes="100vw" className="photo-grade animate-kenburns object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-navy-deep/50" />
        <div className="relative mx-auto w-full max-w-[1600px] px-4 pt-40 pb-14 sm:px-8">
          <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase">
            <Link href="/services" className="text-white/80 hover:text-cyan">
              Our services
            </Link>{" "}
            / <span className="bg-pink px-2 py-1">{s.code}</span>
          </p>
          <h1 className="mt-6 max-w-6xl font-display text-[15vw] leading-[0.82] font-black uppercase lg:text-[9.5rem]">
            <SplitLine text={s.title} />
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-2xl text-white/90 italic md:text-3xl">{s.short}</p>
        </div>
      </section>

      <section className="border-b border-navy/10 bg-sky text-navy">
        <dl className="mx-auto grid max-w-[1600px] grid-cols-1 gap-px bg-navy/10 sm:grid-cols-3">
          {s.facts.map((f) => (
            <div key={f.label} className="bg-sky px-4 py-6 sm:px-8">
              <dt className="font-mono text-[0.6rem] tracking-[0.25em] text-navy/60 uppercase">{f.label}</dt>
              <dd className="mt-2 font-display text-3xl font-black uppercase">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-white text-navy">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-4 py-24 sm:px-8 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="A" className="text-navy/70">
                The service
              </Eyebrow>
              <p className="mt-8 text-2xl leading-snug md:text-3xl">{s.pitch}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <Eyebrow index="B" className="mt-20 text-navy/70">
                What’s included
              </Eyebrow>
              <ol className="mt-8 border-t border-navy/10">
                {s.includes.map((inc, i) => (
                  <li key={inc} className="flex gap-6 border-b border-navy/10 py-5">
                    <span className="pt-1 font-mono text-[0.65rem] text-pink">{pad(i + 1)}</span>
                    <span className="font-display text-2xl font-bold uppercase md:text-3xl">{inc}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden [--cut:32px] chamfer-tr">
                  <Image
                    src={photos[others[index % others.length].photo]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="photo-grade object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="font-mono text-[0.6rem] tracking-[0.25em] text-cyan uppercase">Talk to a person</p>
                    <a href={site.phoneHref} className="mt-2 block font-display text-4xl font-black hover:text-pink">
                      {site.phone}
                    </a>
                    <a href={`mailto:${site.email}`} className="mt-1 block text-sm text-white/80 hover:text-pink">
                      {site.email}
                    </a>
                  </div>
                </div>
                <CropMarks className="-m-2 text-pink" />
              </div>
              <ButtonLink href={s.cta.href} className="w-full">
                {s.cta.label}
              </ButtonLink>
              <ButtonLink href={site.whatsappHref} target="_blank" rel="noreferrer" variant="cyan" className="w-full">
                Chat on WhatsApp
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      {/* process */}
      <section className="relative bg-navy-deep text-white">
        <div className="survey-grid absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-[1600px] px-4 py-24 sm:px-8">
          <Eyebrow index="C" className="text-white/75">
            How it works
          </Eyebrow>
          <ol className="mt-12 grid gap-px bg-white/10 md:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="relative bg-navy-deep p-8">
                <span className="font-display text-7xl leading-none font-black text-cyan">{pad(i + 1)}</span>
                <h3 className="mt-6 font-display text-3xl font-black uppercase">{step.title}</h3>
                <p className="mt-3 text-white/70">{step.body}</p>
                {i < steps.length - 1 && (
                  <span aria-hidden className="absolute top-1/2 -right-3 z-10 hidden size-6 -translate-y-1/2 rotate-45 bg-pink md:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* other services */}
      <section className="bg-white text-navy">
        <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8">
          <Eyebrow index="D" className="text-navy/70">
            Other services
          </Eyebrow>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="group relative block aspect-[3/4] overflow-hidden text-white [--cut:20px] chamfer-tr">
                  <Image src={photos[o.photo]} alt="" fill sizes="(min-width: 1024px) 20vw, 50vw" className="photo-grade object-cover transition-transform duration-1000 ease-expo group-hover:scale-110" />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block font-mono text-[0.6rem] tracking-[0.2em] text-cyan">{o.code}</span>
                    <span className="mt-1 block font-display text-2xl leading-none font-black uppercase group-hover:text-pink">{o.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
