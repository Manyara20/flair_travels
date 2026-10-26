"use client";

import { motion } from "motion/react";
import { useActionState, useState } from "react";
import { type ContactState, submitContact } from "@/app/contact/actions";
import { services } from "@/data/services";

const initialState: ContactState = { status: "idle" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({
  initialService = "",
  placeholder = false,
}: {
  initialService?: string;
  /** Non-interactive copy shown while the real form streams in. */
  placeholder?: boolean;
}) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    service: services.some((s) => s.slug === initialService) ? initialService : "",
    message: "",
  });
  const set = (k: keyof typeof values) => (v: string) => setValues((x) => ({ ...x, [k]: v }));

  // Server errors clear as soon as the offending field is fixed.
  const server = state.status === "error" ? state.fields : {};
  const errors = {
    name: values.name.trim().length < 2 ? server.name : undefined,
    email: EMAIL.test(values.email.trim()) ? undefined : server.email,
    message: values.message.trim().length < 10 ? server.message : undefined,
  };

  if (state.status === "sent") {
    return (
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        role="status"
        className="border-2 border-cyan bg-sky p-8 text-navy md:p-12"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-cyan uppercase">● Message received</p>
        <h2 className="mt-4 font-display text-6xl leading-[0.9] font-black uppercase">Asante, {state.name}.</h2>
        <p className="mt-4 text-lg text-navy/75">We’ll reply by email shortly. Your reference is below.</p>
        <p className="mt-6 inline-block bg-white px-4 py-3 font-display text-3xl font-black">{state.reference}</p>
      </motion.div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      inert={placeholder || undefined}
      aria-busy={placeholder || undefined}
      className="relative space-y-8"
    >
      {/* Spam honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <div>
        <p className="font-mono text-[0.65rem] tracking-[0.2em] text-navy/60 uppercase">I’m asking about</p>
        <div role="radiogroup" aria-label="Service" className="mt-3 flex flex-wrap gap-2">
          {[{ slug: "", title: "General" }, ...services].map((s) => (
            <label
              key={s.slug || "general"}
              className={`cursor-pointer border px-3 py-2 font-mono text-[0.65rem] tracking-[0.15em] uppercase transition-colors has-focus-visible:outline-2 has-focus-visible:outline-cyan ${
                values.service === s.slug ? "border-pink bg-pink text-white" : "border-navy/20 hover:border-pink hover:text-pink"
              }`}
            >
              <input type="radio" name="service" value={s.slug} checked={values.service === s.slug} onChange={() => set("service")(s.slug)} className="sr-only" />
              {s.title}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" />
        <Field label="Email" name="email" type="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" />
        <Field label="Phone / WhatsApp (optional)" name="phone" type="tel" value={values.phone} onChange={set("phone")} autoComplete="tel" />
      </div>

      <label className="block">
        <span className="font-mono text-[0.65rem] tracking-[0.2em] text-navy/60 uppercase">Message</span>
        <textarea
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          placeholder="Dates, number of travellers, destinations, anything we should know…"
          className={`mt-2 block w-full resize-y border bg-white p-4 text-lg outline-none placeholder:text-navy/35 focus:border-cyan ${
            errors.message ? "border-pink" : "border-navy/20"
          }`}
        />
        {errors.message && <span className="mt-2 block font-mono text-[0.65rem] text-pink">{errors.message}</span>}
      </label>

      {state.status === "error" && (Object.values(errors).some(Boolean) || Object.keys(state.fields).length === 0) && (
        <p role="alert" className="font-mono text-xs text-pink">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="group flex w-full items-center justify-between bg-pink px-6 py-5 font-mono text-xs font-semibold tracking-[0.25em] text-white uppercase transition-colors [--cut:14px] chamfer-tr hover:bg-cyan disabled:opacity-60 sm:w-auto sm:min-w-80"
      >
        {pending ? "Sending…" : "Send message"}
        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </form>
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
      <span className="font-mono text-[0.65rem] tracking-[0.2em] text-navy/60 uppercase">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`mt-2 block w-full border-b bg-transparent py-3 text-lg outline-none transition-colors focus:border-cyan ${
          error ? "border-pink" : "border-navy/25"
        }`}
      />
      {error && <span className="mt-2 block font-mono text-[0.65rem] text-pink">{error}</span>}
    </label>
  );
}
