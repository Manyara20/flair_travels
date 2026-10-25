import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { Eyebrow } from "./ui";

export function PageHero({
  index,
  eyebrow,
  title,
  intro,
  aside,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  aside?: ReactNode;
}) {
  return (
    <section className="survey-grid relative overflow-hidden border-b border-bone/10 bg-ink pt-32 md:pt-44">
      <div aria-hidden className="absolute inset-x-0 bottom-24 hidden text-laterite opacity-60 lg:block">
        <div className="dashed-line w-full" />
      </div>
      <div className="relative mx-auto grid max-w-[1600px] gap-10 px-4 pb-16 sm:px-8 md:pb-24 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-8">
          <Eyebrow index={index} className="text-bone/70">
            {eyebrow}
          </Eyebrow>
          <h1 className="mt-8 font-display text-[17vw] leading-[0.82] font-black uppercase sm:text-[12vw] lg:text-[9.5rem]">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-4">
          <p className="max-w-md text-lg leading-relaxed text-bone/70">{intro}</p>
          {aside && <div className="mt-8">{aside}</div>}
        </Reveal>
      </div>
    </section>
  );
}
