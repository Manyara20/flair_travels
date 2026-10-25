"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useActionState, useState, type ReactNode } from "react";
import { type EnquiryState, submitEnquiry } from "@/app/plan/actions";
import { destinations, getDestination, months } from "@/data/destinations";
import { tours } from "@/data/tours";
import { type TierId, estimatePerPerson, tiers } from "@/lib/estimate";
import { formatUSD } from "@/lib/format";
import { KenyaMap } from "./kenya-map";

const initialState: EnquiryState = { status: "idle" };

export function TripBuilder({ initialTour, initialDestination }: { initialTour?: string; initialDestination?: string }) {
  const presetTour = tours.find((t) => t.slug === initialTour);
  const [route, setRoute] = useState<string[]>(
    presetTour?.route ?? (initialDestination && getDestination(initialDestination) ? [initialDestination] : []),
  );
  const [tourSlug, setTourSlug] = useState(presetTour?.slug ?? "");
  const [month, setMonth] = useState(7);
  const [days, setDays] = useState(presetTour?.days ?? 7);
  const [travellers, setTravellers] = useState(2);
  const [tier, setTier] = useState<TierId>("signature");
  const [contact, setContact] = useState({ name: "", email: "", phone: "", notes: "" });
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  const toggle = (slug: string) => {
    setTourSlug("");
    setRoute((r) => (r.includes(slug) ? r.filter((s) => s !== slug) : [...r, slug]));
  };

  const pickTour = (slug: string) => {
    setTourSlug(slug);
    const t = tours.find((x) => x.slug === slug);
    if (t) {
      setRoute(t.route);
      setDays(t.days);
    }
  };

  const perPerson = estimatePerPerson(days, tier, Math.max(route.length, 1));
  const offSeason = route.map(getDestination).filter((d) => d && d.season[month] === 0);
  // Server errors clear as soon as the offending field is fixed.
  const serverErrors = state.status === "error" ? state.fields : {};
  const errors = {
    name: contact.name.trim().length < 2 ? serverErrors.name : undefined,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()) ? undefined : serverErrors.email,
    destinations: route.length === 0 ? serverErrors.destinations : undefined,
  };
  const hasErrors = Object.values(errors).some(Boolean);

  if (state.status === "sent") {
    return (
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="survey-grid border border-volt/40 bg-ink-2 p-8 md:p-16"
        role="status"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-volt uppercase">● Transmission received</p>
        <h2 className="mt-6 font-display text-6xl leading-[0.9] font-black uppercase md:text-8xl">
          Asante, {state.name}.
        </h2>
        <p className="mt-6 max-w-xl text-lg text-bone/75">
          A planner in Nairobi is plotting your route now. Expect a mapped itinerary in your inbox within 24 hours.
        </p>
        <dl className="mt-10 grid max-w-xl grid-cols-2 gap-px bg-bone/10">
          <div className="bg-ink p-5">
            <dt className="font-mono text-[0.6rem] tracking-[0.25em] text-dust uppercase">Reference</dt>
            <dd className="mt-2 font-display text-3xl font-bold">{state.reference}</dd>
          </div>
          <div className="bg-ink p-5">
            <dt className="font-mono text-[0.6rem] tracking-[0.25em] text-dust uppercase">Indicative total</dt>
            <dd className="mt-2 font-display text-3xl font-bold text-laterite">{formatUSD(state.estimate)}</dd>
          </div>
        </dl>
        <Link href="/destinations" className="mt-10 inline-block font-mono text-xs tracking-[0.25em] uppercase underline-offset-4 hover:text-volt hover:underline">
          Keep exploring →
        </Link>
      </motion.div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-12 lg:grid-cols-12">
      {route.map((slug) => (
        <input key={slug} type="hidden" name="destinations" value={slug} />
      ))}
      <input type="hidden" name="days" value={days} />
      <input type="hidden" name="travellers" value={travellers} />
      <input type="hidden" name="tier" value={tier} />
      <input type="hidden" name="month" value={months[month]} />
      <input type="hidden" name="tour" value={tourSlug} />

      <div className="space-y-16 lg:col-span-7">
        <Step index="01" title="Choose destinations" hint="Tap in the order you want to travel." error={errors.destinations}>
          <div className="grid grid-cols-2 gap-px bg-bone/10 sm:grid-cols-3">
            {destinations.map((d) => {
              const pos = route.indexOf(d.slug);
              const on = pos > -1;
              return (
                <button
                  key={d.slug}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(d.slug)}
                  className={`group relative flex min-h-24 flex-col justify-between p-4 text-left transition-colors ${
                    on ? "bg-laterite text-ink" : "bg-ink hover:bg-ink-3"
                  }`}
                >
                  <span className="flex items-center justify-between font-mono text-[0.6rem] tracking-[0.2em] uppercase">
                    <span className={on ? "text-ink/70" : "text-dust"}>{d.code}</span>
                    <span className={`flex size-6 items-center justify-center border ${on ? "border-ink bg-ink text-laterite" : "border-bone/20"}`}>
                      {on ? pos + 1 : "+"}
                    </span>
                  </span>
                  <span className="mt-4 font-display text-xl leading-none font-bold uppercase">{d.name}</span>
                </button>
              );
            })}
          </div>
          <label className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-dust uppercase">Or start from an expedition</span>
            <select
              value={tourSlug}
              onChange={(e) => pickTour(e.target.value)}
              className="flex-1 border border-bone/20 bg-ink px-3 py-3 text-sm"
            >
              <option value="">Custom route</option>
              {tours.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.code} · {t.title} ({t.days} days)
                </option>
              ))}
            </select>
          </label>
        </Step>

        <Step index="02" title="When & how long">
          <p className="mb-3 font-mono text-[0.65rem] tracking-[0.2em] text-dust uppercase">Travel month</p>
          <div className="grid grid-cols-6 gap-px bg-bone/10 sm:grid-cols-12">
            {months.map((m, i) => (
              <button
                key={m}
                type="button"
                aria-pressed={month === i}
                onClick={() => setMonth(i)}
                className={`py-3 font-mono text-xs uppercase transition-colors ${month === i ? "bg-volt text-ink" : "bg-ink hover:bg-ink-3"}`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="days" className="flex items-baseline justify-between font-mono text-[0.65rem] tracking-[0.2em] text-dust uppercase">
                Duration <span className="font-display text-3xl font-bold text-bone">{days} days</span>
              </label>
              <input
                id="days"
                type="range"
                min={3}
                max={21}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="mt-4 w-full accent-laterite"
              />
            </div>
            <div>
              <p className="font-mono text-[0.65rem] tracking-[0.2em] text-dust uppercase">Travellers</p>
              <div className="mt-3 flex items-stretch border border-bone/20">
                <button
                  type="button"
                  aria-label="Fewer travellers"
                  onClick={() => setTravellers((v) => Math.max(1, v - 1))}
                  className="w-14 border-r border-bone/20 text-xl hover:bg-volt hover:text-ink"
                >
                  −
                </button>
                <output className="flex-1 py-2 text-center font-display text-3xl font-bold" aria-live="polite">
                  {travellers}
                </output>
                <button
                  type="button"
                  aria-label="More travellers"
                  onClick={() => setTravellers((v) => Math.min(20, v + 1))}
                  className="w-14 border-l border-bone/20 text-xl hover:bg-volt hover:text-ink"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </Step>

        <Step index="03" title="Comfort level">
          <div role="radiogroup" aria-label="Comfort level" className="grid gap-px bg-bone/10 sm:grid-cols-3">
            {tiers.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={tier === t.id}
                onClick={() => setTier(t.id)}
                className={`p-5 text-left transition-colors ${tier === t.id ? "bg-bone text-ink" : "bg-ink hover:bg-ink-3"}`}
              >
                <span className="block font-display text-2xl font-bold uppercase">{t.label}</span>
                <span className={`mt-1 block text-sm ${tier === t.id ? "text-ink/70" : "text-bone/60"}`}>{t.note}</span>
                <span className="mt-4 block font-mono text-[0.65rem] tracking-[0.2em] uppercase">≈ {formatUSD(t.rate)} / night</span>
              </button>
            ))}
          </div>
        </Step>

        <Step index="04" title="Where to send it">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Full name" name="name" error={errors.name} value={contact.name} onChange={(v) => setContact((c) => ({ ...c, name: v }))} autoComplete="name" />
            <Field label="Email" name="email" type="email" error={errors.email} value={contact.email} onChange={(v) => setContact((c) => ({ ...c, email: v }))} autoComplete="email" />
            <Field label="Phone / WhatsApp (optional)" name="phone" type="tel" value={contact.phone} onChange={(v) => setContact((c) => ({ ...c, phone: v }))} autoComplete="tel" />
            <Field label="Anything else? (optional)" name="notes" value={contact.notes} onChange={(v) => setContact((c) => ({ ...c, notes: v }))} />
          </div>
        </Step>
      </div>

      {/* manifest */}
      <aside className="lg:col-span-5">
        <div className="sticky top-28 border border-bone/15 bg-ink-2">
          <div className="flex items-center justify-between border-b border-bone/10 px-5 py-3 font-mono text-[0.6rem] tracking-[0.25em] uppercase">
            <span className="text-volt">◆ Route manifest</span>
            <span className="text-dust">{route.length} stops</span>
          </div>
          <div className="p-4">
            <KenyaMap route={route} activeSlug={route.at(-1) ?? null} onSelect={toggle} />
          </div>
          <div className="space-y-4 border-t border-bone/10 p-5">
            <p className="min-h-6 font-mono text-xs tracking-[0.15em] uppercase">
              {route.length ? (
                route.map((s, i) => (
                  <span key={s}>
                    {i > 0 && <span className="text-laterite"> → </span>}
                    {getDestination(s)?.code}
                  </span>
                ))
              ) : (
                <span className="text-dust">No stops yet</span>
              )}
            </p>
            <dl className="grid grid-cols-3 gap-px bg-bone/10 text-center">
              {[
                ["Month", months[month]],
                ["Days", days],
                ["Guests", travellers],
              ].map(([k, v]) => (
                <div key={k} className="bg-ink-2 py-3">
                  <dt className="font-mono text-[0.55rem] tracking-[0.2em] text-dust uppercase">{k}</dt>
                  <dd className="font-display text-2xl font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            <AnimatePresence>
              {offSeason.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-l-2 border-laterite bg-laterite/10 px-3 py-2 text-xs text-bone/80"
                >
                  {offSeason.map((d) => d?.name).join(", ")} {offSeason.length > 1 ? "are" : "is"} in low season in {months[month]}. Expect rain, but also fewer people and lower rates.
                </motion.p>
              )}
            </AnimatePresence>
            <div className="flex items-end justify-between border-t border-bone/10 pt-4">
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.2em] text-dust uppercase">Indicative total</p>
                <p className="font-display text-5xl leading-none font-black text-laterite tabular-nums">{formatUSD(perPerson * travellers)}</p>
              </div>
              <p className="text-right font-mono text-[0.6rem] tracking-[0.2em] text-dust uppercase">
                {formatUSD(perPerson)}
                <br />
                per person
              </p>
            </div>
            {state.status === "error" && hasErrors && (
              <p role="alert" className="font-mono text-xs text-laterite">
                {state.message}
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="group flex w-full items-center justify-between bg-laterite px-6 py-5 font-mono text-xs font-semibold tracking-[0.25em] text-ink uppercase transition-colors [--cut:14px] chamfer-tr hover:bg-volt disabled:opacity-60"
            >
              {pending ? "Transmitting…" : "Send to a planner"}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <p className="text-center text-[0.7rem] text-dust">Free, with no obligation. A real person replies.</p>
          </div>
        </div>
      </aside>
    </form>
  );
}

function Step({ index, title, hint, error, children }: { index: string; title: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="flex w-full items-baseline justify-between gap-4 border-b border-bone/10 pb-4">
        <span className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-laterite">{index}</span>
          <span className="font-display text-4xl font-black uppercase md:text-5xl">{title}</span>
        </span>
        {hint && <span className="hidden font-mono text-[0.6rem] tracking-[0.2em] text-dust uppercase md:inline">{hint}</span>}
      </legend>
      {error && (
        <p role="alert" className="mt-4 font-mono text-xs text-laterite">
          ✕ {error}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[0.65rem] tracking-[0.2em] text-dust uppercase">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`mt-2 block w-full border-b bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-bone/30 focus:border-volt ${
          error ? "border-laterite" : "border-bone/25"
        }`}
      />
      {error && <span className="mt-2 block font-mono text-[0.65rem] text-laterite">{error}</span>}
    </label>
  );
}
