"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { photos } from "@/assets/photos";
import { collections, destinationsIn } from "@/data/destinations";
import { services } from "@/data/services";
import { nav, site } from "@/data/site";
import { LogoImage } from "./logo";
import { NairobiClock } from "./nairobi-clock";

type MenuId = "services" | "destinations";
const ease = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  const solid = scrolled || mobileOpen || menu !== null;
  const isActive = (href: string) => pathname.startsWith(href);
  const close = () => {
    setMenu(null);
    setMobileOpen(false);
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      onMouseLeave={() => setMenu(null)}
      onKeyDown={(e) => e.key === "Escape" && setMenu(null)}
    >
      <div
        className={`border-b transition-colors duration-500 ${
          solid ? "border-navy/10 bg-white/95 text-navy backdrop-blur-md" : "border-white/10 bg-transparent text-white"
        }`}
      >
        {/* utility bar */}
        <div
          className={`hidden overflow-hidden border-b transition-[height,border-color] duration-500 ease-expo md:block ${
            scrolled ? "h-0 border-transparent" : "h-9 border-current/10"
          }`}
        >
          <div className="mx-auto flex h-9 max-w-[1600px] items-center justify-between px-4 font-mono text-[0.65rem] tracking-[0.2em] uppercase opacity-80 sm:px-8">
            <div className="flex items-center gap-6">
              <a href={site.phoneHref} className="hover:text-pink">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="normal-case tracking-[0.1em] hover:text-pink">
                {site.email}
              </a>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden lg:inline">{site.postal} · {site.city}</span>
              <NairobiClock />
            </div>
          </div>
        </div>

        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-4 sm:px-8 md:h-20">
          <Link href="/" aria-label="Flair Travels home" onClick={close} className="flex shrink-0 items-center gap-4">
            {/* Colour logo on the white header, reversed logo over the photo heroes. */}
            <span className="relative block">
              <LogoImage
                variant="color"
                height={52}
                priority
                className={`h-11 w-auto transition-opacity duration-500 md:h-[52px] ${solid ? "opacity-100" : "opacity-0"}`}
              />
              <LogoImage
                variant="reverse"
                height={52}
                priority
                className={`absolute inset-0 h-11 w-auto transition-opacity duration-500 md:h-[52px] ${solid ? "opacity-0" : "opacity-100"}`}
              />
            </span>
            <span className="hidden border-l border-current/25 pl-4 font-mono text-[0.6rem] leading-relaxed tracking-[0.3em] uppercase opacity-80 xl:block">
              Tours &amp;
              <br />
              Travel
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden h-full items-stretch lg:flex">
            {nav.map((item) => {
              const open = item.menu !== null && menu === item.menu;
              return (
                <div key={item.href} className="flex" onMouseEnter={() => setMenu(item.menu)}>
                  <Link
                    href={item.href}
                    onClick={close}
                    onFocus={() => setMenu(item.menu)}
                    aria-expanded={item.menu ? open : undefined}
                    aria-haspopup={item.menu ? "true" : undefined}
                    className="group relative flex items-center gap-2 px-5 text-sm tracking-wide uppercase"
                  >
                    <span className="font-mono text-[0.6rem] text-pink">{item.index}</span>
                    {item.label}
                    {item.menu && (
                      <span aria-hidden className={`text-[0.6rem] transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                        ▾
                      </span>
                    )}
                    <span
                      className={`absolute inset-x-5 bottom-0 h-0.5 origin-left bg-pink transition-transform duration-500 ease-expo ${
                        isActive(item.href) || open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/plan"
              onClick={close}
              className="hidden items-center gap-3 bg-pink px-5 py-3 font-mono text-[0.7rem] font-semibold tracking-[0.2em] text-white uppercase transition-colors [--cut:10px] chamfer-tr hover:bg-cyan sm:inline-flex"
            >
              Plan a trip <span aria-hidden>→</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="relative flex size-11 items-center justify-center border border-current/25 lg:hidden"
            >
              <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
              <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${mobileOpen ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${mobileOpen ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </div>
        <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="h-0.5 origin-left bg-gradient-to-r from-cyan to-pink" />
      </div>

      {/* desktop mega menus */}
      <AnimatePresence>
        {menu && (
          <motion.div
            key={menu}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease }}
            className="absolute inset-x-0 top-full hidden border-b border-navy/10 bg-white text-navy shadow-[0_30px_60px_-30px_rgb(44_60_76/0.45)] lg:block"
          >
            {menu === "services" ? <ServicesPanel onNavigate={close} /> : <DestinationsPanel onNavigate={close} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto bg-white px-4 pt-6 pb-10 text-navy sm:px-8 lg:hidden"
          >
            <MobileNav onNavigate={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-8 px-8 py-10">
      <div className="col-span-3 flex flex-col justify-between border-r border-navy/10 pr-8">
        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.3em] text-pink uppercase">[02] Our services</p>
          <p className="mt-4 font-display text-5xl leading-[0.9] font-black uppercase">
            One desk for <span className="font-serif font-normal normal-case text-cyan italic">every</span> part of the trip
          </p>
        </div>
        <Link href="/services" onClick={onNavigate} className="mt-8 font-mono text-xs tracking-[0.2em] uppercase hover:text-pink">
          All services →
        </Link>
      </div>
      <ul className="col-span-9 grid grid-cols-3 gap-4">
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`} onClick={onNavigate} className="group flex gap-4 border border-navy/10 p-3 transition-colors hover:border-pink">
              <span className="relative size-24 shrink-0 overflow-hidden [--cut:14px] chamfer-tr">
                <Image src={photos[s.photo]} alt="" fill sizes="96px" className="photo-grade object-cover transition-transform duration-700 ease-expo group-hover:scale-110" />
              </span>
              <span className="flex flex-col justify-center">
                <span className="font-mono text-[0.6rem] tracking-[0.2em] text-pink">{s.code}</span>
                <span className="mt-1 font-display text-xl leading-none font-bold uppercase group-hover:text-cyan">{s.title}</span>
                <span className="mt-2 line-clamp-2 text-xs text-navy/60">{s.short}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DestinationsPanel({ onNavigate }: { onNavigate: () => void }) {
  const [preview, setPreview] = useState("maasai-mara");
  const all = collections.flatMap((c) => destinationsIn(c.id));
  const current = all.find((d) => d.slug === preview) ?? all[0];

  return (
    <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-8 px-8 py-10">
      {collections.map((c) => (
        <div key={c.id} className={c.id === "kenya" ? "col-span-3" : "col-span-2"}>
          <Link
            href={`/destinations#${c.id}`}
            onClick={onNavigate}
            className="flex items-baseline gap-2 border-b border-navy/10 pb-3 font-display text-2xl font-black uppercase hover:text-pink"
          >
            <span className="font-mono text-[0.6rem] text-pink">{c.index}</span>
            {c.label}
          </Link>
          <ul className={`mt-3 ${c.id === "kenya" ? "grid grid-cols-2 gap-x-4" : ""}`}>
            {destinationsIn(c.id).map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/destinations/${d.slug}`}
                  onClick={onNavigate}
                  onMouseEnter={() => setPreview(d.slug)}
                  onFocus={() => setPreview(d.slug)}
                  className={`block py-1.5 text-sm transition-colors hover:text-pink ${preview === d.slug ? "text-pink" : ""}`}
                >
                  {d.name}
                  {d.country !== "Kenya" && d.country !== d.name && <span className="ml-1 text-navy/40">· {d.country}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link href={`/destinations/${current.slug}`} onClick={onNavigate} className="relative col-span-5 block min-h-72 overflow-hidden [--cut:32px] chamfer-tr">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="absolute inset-0"
          >
            <Image src={photos[current.photo]} alt="" fill sizes="40vw" className="photo-grade object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="font-mono text-[0.6rem] tracking-[0.25em] text-sky uppercase">
            {current.code} · {current.country}
          </p>
          <p className="mt-1 font-display text-5xl leading-none font-black uppercase">{current.name}</p>
          <p className="mt-2 font-serif text-lg italic">{current.tagline}</p>
        </div>
      </Link>
    </div>
  );
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const [section, setSection] = useState<MenuId | null>(null);
  return (
    <nav aria-label="Mobile" className="flex flex-col">
      {nav.map((item, i) => (
        <motion.div
          key={item.href}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12 + i * 0.06, duration: 0.6, ease }}
          className="border-b border-navy/10"
        >
          <div className="flex items-center justify-between">
            <Link href={item.href} onClick={onNavigate} className="flex items-baseline gap-4 py-4 font-display text-5xl font-bold uppercase">
              <span className="font-mono text-xs text-pink">{item.index}</span>
              {item.label}
            </Link>
            {item.menu && (
              <button
                type="button"
                aria-expanded={section === item.menu}
                aria-label={`Show ${item.label}`}
                onClick={() => setSection((s) => (s === item.menu ? null : item.menu))}
                className="flex size-11 items-center justify-center border border-navy/20 text-lg"
              >
                {section === item.menu ? "−" : "+"}
              </button>
            )}
          </div>
          <AnimatePresence initial={false}>
            {item.menu && section === item.menu && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.4, ease }}
                className="overflow-hidden"
              >
                {item.menu === "services" ? (
                  <ul className="grid grid-cols-2 gap-2 pb-5">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} onClick={onNavigate} className="relative block aspect-[4/3] overflow-hidden">
                          <Image src={photos[s.photo]} alt="" fill sizes="50vw" className="photo-grade object-cover" />
                          <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 to-transparent" />
                          <span className="absolute inset-x-0 bottom-0 p-2 font-display text-lg leading-none font-bold text-white uppercase">{s.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-5 pb-5">
                    {collections.map((c) => (
                      <div key={c.id}>
                        <p className="font-mono text-[0.65rem] tracking-[0.25em] text-pink uppercase">{c.label}</p>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {destinationsIn(c.id).map((d) => (
                            <li key={d.slug}>
                              <Link href={`/destinations/${d.slug}`} onClick={onNavigate} className="block border border-navy/20 px-3 py-2 text-sm">
                                {d.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
      <Link href="/plan" onClick={onNavigate} className="mt-8 flex items-center justify-between bg-pink px-5 py-4 font-mono text-xs font-semibold tracking-[0.2em] text-white uppercase">
        Plan a trip <span aria-hidden>→</span>
      </Link>
      <div className="mt-8 space-y-2 font-mono text-xs tracking-widest text-navy/70 uppercase">
        <NairobiClock />
        <p>
          <a href={site.phoneHref}>{site.phone}</a>
        </p>
        <p className="normal-case">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p>
          {site.postal}, {site.city}
        </p>
      </div>
    </nav>
  );
}
