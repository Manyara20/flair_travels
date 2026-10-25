"use server";

import { destinations } from "@/data/destinations";
import { type TierId, estimatePerPerson, tiers } from "@/lib/estimate";

export type EnquiryState =
  | { status: "idle" }
  | { status: "error"; message: string; fields: Partial<Record<"name" | "email" | "destinations", string>> }
  | { status: "sent"; reference: string; name: string; estimate: number };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const picked = formData.getAll("destinations").map(String);
  const valid = picked.filter((slug) => destinations.some((d) => d.slug === slug));
  const days = Math.min(30, Math.max(2, Number(formData.get("days")) || 7));
  const travellers = Math.min(20, Math.max(1, Number(formData.get("travellers")) || 2));
  const tierInput = String(formData.get("tier"));
  const tier: TierId = tiers.some((t) => t.id === tierInput) ? (tierInput as TierId) : "explorer";

  const fields: Partial<Record<"name" | "email" | "destinations", string>> = {};
  if (name.length < 2) fields.name = "Tell us who we’re planning for.";
  if (!EMAIL.test(email)) fields.email = "We need a valid email to send your route.";
  if (valid.length === 0) fields.destinations = "Pick at least one destination.";
  if (Object.keys(fields).length) {
    return { status: "error", message: "A few details are missing.", fields };
  }

  // Hook up delivery here (email provider, CRM, etc.). The enquiry is
  // fully validated at this point; nothing is persisted yet.
  const reference = `FT-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  return {
    status: "sent",
    reference,
    name: name.split(" ")[0],
    estimate: estimatePerPerson(days, tier, valid.length) * travellers,
  };
}
