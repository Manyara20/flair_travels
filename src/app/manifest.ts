import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}: ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#2C3C4C",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/brand/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
