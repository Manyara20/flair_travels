import type { MetadataRoute } from "next";
import { destinations } from "@/data/destinations";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { tours } from "@/data/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/services",
    "/destinations",
    "/tours",
    "/plan",
    "/contact",
    ...services.map((s) => `/services/${s.slug}`),
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...tours.map((t) => `/tours/${t.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}`, priority: p === "" ? 1 : 0.7 }));
}
