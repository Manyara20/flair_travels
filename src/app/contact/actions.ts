"use server";

import { services } from "@/data/services";
import { site } from "@/data/site";
import { clip, isBot, isRateLimited, makeReference } from "@/lib/form-guard";
import { renderEnquiryEmail, sendMail } from "@/lib/mailer";

export type ContactState =
  | { status: "idle" }
  | { status: "error"; message: string; fields: Partial<Record<"name" | "email" | "message", string>> }
  | { status: "sent"; reference: string; name: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DELIVERY_ERROR = `We couldn’t send your message just now. Please email ${site.email} or call ${site.phone}.`;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = clip(String(formData.get("name") ?? "").trim(), 120);
  const email = clip(String(formData.get("email") ?? "").trim(), 200);
  const phone = clip(String(formData.get("phone") ?? "").trim(), 40);
  const message = clip(String(formData.get("message") ?? "").trim(), 5000);
  const serviceInput = String(formData.get("service") ?? "");
  const service = services.find((s) => s.slug === serviceInput)?.title ?? "General enquiry";

  const fields: Partial<Record<"name" | "email" | "message", string>> = {};
  if (name.length < 2) fields.name = "Tell us your name.";
  if (!EMAIL.test(email)) fields.email = "We need a valid email to reply.";
  if (message.length < 10) fields.message = "A sentence or two helps us reply properly.";
  if (Object.keys(fields).length) {
    return { status: "error", message: "A few details are missing.", fields };
  }

  const reference = makeReference();
  const firstName = name.split(" ")[0];
  // Bots get a convincing success so they don't retry; nothing is sent.
  if (isBot(formData)) return { status: "sent", reference, name: firstName };
  if (await isRateLimited()) {
    return { status: "error", message: `Too many messages from this connection. Please try again later or email ${site.email}.`, fields: {} };
  }

  const { text, html } = renderEnquiryEmail({
    heading: `${service}: message from ${name}`,
    reference,
    rows: [
      ["Service", service],
      ["Name", name],
      ["Email", email],
      ["Phone / WhatsApp", phone],
    ],
    message,
  });
  const result = await sendMail({ subject: `[${reference}] ${service} · ${name}`, replyTo: `"${name.replace(/"/g, "")}" <${email}>`, text, html });
  if (!result.ok) return { status: "error", message: DELIVERY_ERROR, fields: {} };

  return { status: "sent", reference, name: firstName };
}
