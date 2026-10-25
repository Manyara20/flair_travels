import { fieldLogs } from "@/data/site";
import { Reveal } from "../reveal";
import { Eyebrow } from "../ui";

export function FieldLogs() {
  return (
    <section className="relative border-t border-bone/10 bg-ink-2">
      <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow index="04" className="text-bone/70">
              Field logs
            </Eyebrow>
            <h2 className="mt-6 font-display text-6xl leading-[0.9] font-black uppercase md:text-8xl">
              Sent back <span className="font-serif font-normal normal-case text-laterite italic">from</span> the bush
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-bone/60">
            Messages from guests after they got home. They’re unedited apart from length.
          </p>
        </div>

        <div className="mt-16 grid gap-px bg-bone/10 md:grid-cols-3">
          {fieldLogs.map((log, i) => (
            <Reveal key={log.name} delay={i * 0.12} className="bg-ink-2">
              <figure className="flex h-full flex-col p-8">
                <p className="flex items-center justify-between font-mono text-[0.6rem] tracking-[0.25em] text-dust uppercase">
                  <span>
                    LOG_{String(i + 1).padStart(3, "0")} · {log.trip}
                  </span>
                  <span className="text-volt">● Received</span>
                </p>
                <blockquote className="mt-8 flex-1 font-serif text-2xl leading-snug text-bone/90 md:text-[1.7rem]">
                  “{log.quote}”
                </blockquote>
                <figcaption className="mt-10 flex items-end justify-between border-t border-bone/10 pt-5">
                  <span className="font-display text-xl font-bold uppercase">{log.name}</span>
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] text-dust uppercase">{log.origin}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
