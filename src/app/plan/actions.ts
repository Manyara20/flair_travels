"use server";

import { destinations, months } from "@/data/destinations";
import { site } from "@/data/site";
import { tours } from "@/data/tours";
import { type TierId, estimatePerPerson, tiers } from "@/lib/estimate";
import { formatUSD } from "@/lib/format";
import { clip, isBot, isRateLimited, makeReference } from "@/lib/form-guard";
import { renderEnquiryEmail, sendMail } from "@/lib/mailer";

export type EnquiryState =
  | { status: "idle" }
  | { status: "error"; message: string; fields: Partial<Record<"name" | "email" | "destinations", string>> }
  | { status: "sent"; reference: string; name: string; estimate: number };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DELIVERY_ERROR = `We couldn’t send your enquiry just now. Please email ${site.email} or call ${site.phone}.`;

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const name = clip(String(formData.get("name") ?? "").trim(), 120);
  const email = clip(String(formData.get("email") ?? "").trim(), 200);
  const phone = clip(String(formData.get("phone") ?? "").trim(), 40);
  const notes = clip(String(formData.get("notes") ?? "").trim(), 3000);
  const picked = formData.getAll("destinations").map(String);
  const valid = picked.filter((slug) => destinations.some((d) => d.slug === slug));
  const days = Math.min(30, Math.max(2, Number(formData.get("days")) || 7));
  const travellers = Math.min(20, Math.max(1, Number(formData.get("travellers")) || 2));
  const tierInput = String(formData.get("tier"));
  const tier: TierId = tiers.some((t) => t.id === tierInput) ? (tierInput as TierId) : "explorer";
  const monthInput = String(formData.get("month") ?? "");
  const month = months.find((m) => m === monthInput) ?? "Flexible";
  const tour = tours.find((t) => t.slug === formData.get("tour"));

  const fields: Partial<Record<"name" | "email" | "destinations", string>> = {};
  if (name.length < 2) fields.name = "Tell us who we’re planning for.";
  if (!EMAIL.test(email)) fields.email = "We need a valid email to send your route.";
  if (valid.length === 0) fields.destinations = "Pick at least one destination.";
  if (Object.keys(fields).length) {
    return { status: "error", message: "A few details are missing.", fields };
  }

  const reference = makeReference();
  const perPerson = estimatePerPerson(days, tier, valid.length);
  const sent = { status: "sent", reference, name: name.split(" ")[0], estimate: perPerson * travellers } as const;
  // Bots get a convincing success so they don't retry; nothing is sent.
  if (isBot(formData)) return sent;
  if (await isRateLimited()) {
    return { status: "error", message: `Too many enquiries from this connection. Please try again later or email ${site.email}.`, fields: {} };
  }

  const route = valid.map((slug) => destinations.find((d) => d.slug === slug)!);
  const { text, html } = renderEnquiryEmail({
    heading: `Trip enquiry from ${name}`,
    reference,
    rows: [
      ["Name", name],
      ["Email", email],
      ["Phone / WhatsApp", phone],
      ["Route", route.map((d) => (d.country !== "Kenya" && d.country !== d.name ? `${d.name} (${d.country})` : d.name)).join(" → ")],
      ["Based on", tour ? `${tour.code} ${tour.title}` : ""],
      ["Month", month],
      ["Duration", `${days} days`],
      ["Travellers", String(travellers)],
      ["Comfort", tiers.find((t) => t.id === tier)!.label],
      ["Indicative", `${formatUSD(perPerson * travellers)} total (${formatUSD(perPerson)} pp)`],
    ],
    message: notes || undefined,
  });
  const result = await sendMail({
    subject: `[${reference}] Trip enquiry · ${name} · ${route.map((d) => d.code).join("→")}`,
    replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
    text,
    html,
  });
  if (!result.ok) return { status: "error", message: DELIVERY_ERROR, fields: {} };

  return sent;
}
