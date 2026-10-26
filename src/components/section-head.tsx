import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { ButtonLink, Eyebrow } from "./ui";

export function SectionHead({
  index,
  eyebrow,
  title,
  body,
  cta,
  tone = "light",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  body: string;
  cta?: { href: string; label: string };
  /** Background the heading sits on. */
  tone?: "light" | "dark";
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <Reveal className="lg:col-span-8">
        <Eyebrow index={index} className="opacity-80">
          {eyebrow}
        </Eyebrow>
        <h2 className="mt-6 font-display text-[14vw] leading-[0.86] font-black uppercase sm:text-[9vw] lg:text-[6.5rem]">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.15} className="flex flex-col items-start gap-6 lg:col-span-4">
        <p className={`max-w-md leading-relaxed ${tone === "dark" ? "text-white/70" : "text-navy/70"}`}>{body}</p>
        {cta && (
          <ButtonLink href={cta.href} variant={tone === "dark" ? "light" : "outline"}>
            {cta.label}
          </ButtonLink>
        )}
      </Reveal>
    </div>
  );
}
