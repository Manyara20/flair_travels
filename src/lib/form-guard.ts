import { headers } from "next/headers";

/** Hidden field name used as a spam honeypot. Real visitors never fill it in. */
export const HONEYPOT = "website";

export function isBot(formData: FormData) {
  return String(formData.get(HONEYPOT) ?? "").trim() !== "";
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/**
 * Basic per-IP limit on form submissions (5 per 10 minutes). It's in memory,
 * so it resets on deploy and isn't shared across server instances: enough to
 * blunt casual abuse, not a substitute for a WAF.
 */
export async function isRateLimited() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export function makeReference() {
  return `FT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

export const clip = (s: string, max: number) => s.slice(0, max);
