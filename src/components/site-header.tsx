"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/data/site";
import { Logo } from "./logo";
import { NairobiClock } from "./nairobi-clock";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-colors duration-500 ${
          scrolled || open ? "border-bone/10 bg-ink/90 backdrop-blur-md" : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-4 sm:px-8 md:h-20">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-baseline gap-2 px-5 py-2 text-sm tracking-wide uppercase transition-colors ${
                  isActive(item.href) ? "text-bone" : "text-bone/60 hover:text-bone"
                }`}
              >
                <span className="font-mono text-[0.6rem] text-laterite">{item.index}</span>
                {item.label}
                <span
                  className={`absolute inset-x-5 -bottom-px h-px origin-left bg-laterite transition-transform duration-500 ease-expo ${
                    isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <span className="hidden xl:block">
              <NairobiClock className="text-[0.68rem] tracking-widest text-dust" />
            </span>
            <Link
              href="/plan"
              className="hidden items-center gap-3 bg-laterite px-5 py-3 font-mono text-[0.7rem] font-semibold tracking-[0.2em] text-ink uppercase transition-colors hover:bg-volt sm:inline-flex"
            >
              Start a trip <span aria-hidden>→</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative flex size-11 items-center justify-center border border-bone/20 lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span
                className={`absolute h-px w-5 bg-bone transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`}
              />
              <span
                className={`absolute h-px w-5 bg-bone transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`}
              />
            </button>
          </div>
        </div>
        <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-laterite" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="survey-grid fixed inset-x-0 top-16 bottom-0 flex flex-col justify-between overflow-y-auto bg-ink px-4 pt-8 pb-10 sm:px-8 md:top-20 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-bone/10 py-4 font-display text-5xl font-bold uppercase sm:text-6xl"
                  >
                    <span className="font-mono text-xs text-laterite">{item.index}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-10 space-y-2 font-mono text-xs tracking-widest text-dust uppercase">
              <NairobiClock />
              <p>{site.email}</p>
              <p>{site.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
