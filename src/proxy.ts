import { type NextRequest, NextResponse } from "next/server";
import { destinations } from "@/data/destinations";
import { services } from "@/data/services";
import { tours } from "@/data/tours";

const known = {
  destinations: new Set(destinations.map((d) => d.slug)),
  tours: new Set(tours.map((t) => t.slug)),
  services: new Set(services.map((s) => s.slug)),
};

/**
 * Cache Components streams dynamic-param pages, so a late `notFound()` would
 * still answer 200. Reject unknown slugs here so they get a real 404 status.
 */
export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  const slugs = known[section as keyof typeof known];
  if (slugs && slug && !slugs.has(slug)) {
    return NextResponse.rewrite(new URL("/_unknown-route", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/destinations/:slug", "/tours/:slug", "/services/:slug"],
};
