import Link from "next/link";
import { collections, destinationsIn, formatCoords } from "@/data/destinations";
import { services } from "@/data/services";
import { nav, site } from "@/data/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div className="survey-grid absolute inset-0 text-white opacity-60" aria-hidden />
      <div aria-hidden className="h-1.5 bg-gradient-to-r from-cyan via-blush to-pink" />

      {/* contact strip */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto grid max-w-[1600px] gap-px px-4 sm:px-8 md:grid-cols-3">
          <ContactCell label="Call or WhatsApp" href={site.phoneHref}>
            {site.phone}
          </ContactCell>
          <ContactCell label="Email" href={`mailto:${site.email}`}>
            {site.email}
          </ContactCell>
          <ContactCell label="Post">
            {site.postal}
            <br />
            {site.city}
          </ContactCell>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Logo variant="reverse" tagline="easy" height={124} className="max-w-full" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">{site.description}</p>
            <p className="mt-6 font-mono text-[0.65rem] tracking-[0.25em] text-sky/70 uppercase">
              HQ · {formatCoords(site.hq.lat, site.hq.lon)}
            </p>
          </div>

          <FooterColumn title="Company" className="md:col-span-2">
            {nav.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
            <FooterLink href="/tours">Expeditions</FooterLink>
            <FooterLink href="/plan">Plan a trip</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/credits">Photo credits</FooterLink>
          </FooterColumn>

          <FooterColumn title="Services" className="md:col-span-2">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <div className="grid gap-8 sm:grid-cols-3 md:col-span-5">
            {collections.map((c) => (
              <FooterColumn key={c.id} title={c.label}>
                {destinationsIn(c.id).map((d) => (
                  <FooterLink key={d.slug} href={`/destinations/${d.slug}`}>
                    {d.name}
                  </FooterLink>
                ))}
              </FooterColumn>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 py-6 font-mono text-[0.65rem] tracking-[0.2em] text-white/50 uppercase sm:flex-row">
          <p>© Flair Travels · flairtravels.com</p>
          <p>Crafted on the equator · Nairobi</p>
        </div>
      </div>

      <p
        aria-hidden
        className="relative -mb-[0.14em] text-center font-display text-[10.5vw] leading-[0.8] font-black tracking-tight whitespace-nowrap text-white/[0.06] uppercase select-none"
      >
        Travel made easy
      </p>
    </footer>
  );
}

function ContactCell({ label, href, children }: { label: string; href?: string; children: React.ReactNode }) {
  const body = (
    <>
      <span className="block font-mono text-[0.6rem] tracking-[0.3em] text-pink uppercase">{label}</span>
      <span className="mt-2 block font-display text-2xl leading-tight font-bold md:text-3xl">{children}</span>
    </>
  );
  const cls = "block border-white/10 py-8 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0";
  return href ? (
    <a href={href} className={`${cls} transition-colors hover:text-cyan`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="mb-4 font-mono text-[0.65rem] tracking-[0.3em] text-cyan uppercase">{title}</p>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block py-1 text-sm text-white/70 transition-colors hover:text-pink">
      {children}
    </Link>
  );
}
