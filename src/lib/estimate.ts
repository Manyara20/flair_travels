export const tiers = [
  { id: "explorer", label: "Explorer", note: "Tented camps and lodges", rate: 340 },
  { id: "signature", label: "Signature", note: "Private conservancies", rate: 560 },
  { id: "apex", label: "Apex", note: "Top-end camps, fly-in", rate: 980 },
] as const;

export type TierId = (typeof tiers)[number]["id"];

/** Indicative per-person cost: nightly tier rate plus a hop for each extra destination. */
export function estimatePerPerson(days: number, tier: TierId, stops: number) {
  const rate = tiers.find((t) => t.id === tier)?.rate ?? tiers[0].rate;
  const transfers = Math.max(0, stops - 1) * 180;
  return Math.round((days * rate + transfers) / 10) * 10;
}
