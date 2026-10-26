import { site } from "@/data/site";

/** Great-circle distance from Nairobi in km, rounded to the nearest 10. */
export function distanceFromNairobi(lat: number, lon: number) {
  const r = Math.PI / 180;
  const [la1, lo1, la2, lo2] = [site.hq.lat * r, site.hq.lon * r, lat * r, lon * r];
  const a = Math.sin((la2 - la1) / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin((lo2 - lo1) / 2) ** 2;
  return Math.round((6371 * 2 * Math.asin(Math.sqrt(a))) / 10) * 10;
}
