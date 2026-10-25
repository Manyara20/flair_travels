import Link from "next/link";
import { destinations, formatCoords } from "@/data/destinations";
import { nav, site } from "@/data/site";
import { tours } from "@/data/tours";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink">
      <div className="survey-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-[1600px] px-4 pt-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-bone/60">{site.description}</p>
            <p className="mt-6 font-mono text-[0.7rem] tracking-[0.25em] text-dust uppercase">
              HQ · {formatCoords(site.hq.lat, site.hq.lon)}
            </p>
          </div>

          <FooterColumn title="Navigate" className="md:col-span-2">
            {nav.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
            <FooterLink href="/credits">Photo credits</FooterLink>
          </FooterColumn>

          <FooterColumn title="Destinations" className="md:col-span-3">
            <div className="grid grid-cols-2 gap-x-6">
              {destinations.map((d) => (
                <FooterLink key={d.slug} href={`/destinations/${d.slug}`}>
                  {d.name}
                </FooterLink>
              ))}
            </div>
          </FooterColumn>

          <FooterColumn title="Contact" className="md:col-span-3">
            <a href={`mailto:${site.email}`} className="block py-1 text-sm text-bone/70 hover:text-volt">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="block py-1 text-sm text-bone/70 hover:text-volt">
              {site.phone}
            </a>
            <p className="py-1 text-sm text-bone/70">{site.address}</p>
            <p className="mt-4 font-mono text-[0.65rem] tracking-[0.2em] text-dust uppercase">
              {tours.length} expeditions · {destinations.length} destinations
            </p>
          </FooterColumn>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-3 border-t border-bone/10 py-6 font-mono text-[0.65rem] tracking-[0.2em] text-dust uppercase sm:flex-row">
          <p>© Flair Travels Ltd · Nairobi, Kenya</p>
          <p>Crafted on the equator</p>
        </div>
      </div>

      <p
        aria-hidden
        className="relative -mb-[0.16em] text-center font-display text-[24vw] leading-[0.8] font-black tracking-tight text-bone/[0.06] uppercase select-none"
      >
        Flair
      </p>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="mb-4 font-mono text-[0.65rem] tracking-[0.3em] text-laterite uppercase">{title}</p>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block py-1 text-sm text-bone/70 transition-colors hover:text-volt">
      {children}
    </Link>
  );
}
