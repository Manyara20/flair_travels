# Flair Travels

Website for Flair Travels (flairtravels.com), a Nairobi travel company covering Kenya, Africa and the rest of the world, built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4 and Motion.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Design system: "Zero Line"

Kenya sits on the equator, so the whole visual language is built around survey and expedition instruments.

- **Hard edges only.** Radius tokens are removed in `globals.css` (`--radius-*: initial`) and reset globally. Corners are cut with the `chamfer`, `chamfer-tr` and `chamfer-bl` utilities instead.
- **Palette (brand):** cyan `#14A0DC`, pink `#E8439F`, soft pink `#DC78B4`, sky blue `#CDE9F7`, navy `#2C3C4C`, white. Derived shades: `navy-deep` `#1E2A36` for dark sections and `mist` `#EEF7FC` for pale ones. Tokens live in `globals.css`.
- **Type:** Big Shoulders (display), Instrument Serif italic (accents), Instrument Sans (body), JetBrains Mono (data labels).
- **Motifs:** the dashed equator line, survey grids, viewfinder crop marks, coordinates, film grain.

## Brand

The logo in `public/logo.jpg` was traced to vector (no background, trimmed) and lives in `public/brand/`:

| File | Use |
| --- | --- |
| `logo-color.svg` / `.png` | Default: on white and light backgrounds |
| `logo-reverse.svg` / `.png` | On navy and over photos (white "Flair", pink "travels") |
| `logo-white.svg`, `logo-navy.svg` | Single-colour (print, embroidery, watermarks) |
| `logo-*-tagline.svg` | Lockup with **Tours & Travel** |
| `logo-*-easy.svg` | Lockup with **Travel made easy** |
| `mark-*.svg` | Plane and contrail on their own |
| `icon.svg`, `icon-512.png` | App icon (pink plane on navy) |

The site uses them via `src/components/logo.tsx`: colour logo on the white header, reverse logo over hero photos, reverse "Travel made easy" lockup in the footer. The favicon, Apple touch icon, web manifest and social share image are in `src/app/`.

## Form email

The contact form and the trip planner email **info@flairtravels.com** over SMTP (Nodemailer), with Reply-To set to the visitor. Copy `.env.example` to `.env.local` (or set the variables on your host) and fill in the mailbox's SMTP details. Without them, development logs the email to the console, and production shows visitors your email and phone as a fallback. A hidden honeypot field and a per-IP limit (5 per 10 minutes) cut down on spam.

## Structure

| Path | What it is |
| --- | --- |
| `src/app/page.tsx` | Home: photo slideshow hero, services bento, Kenya index, Africa & world mosaic with flight map, expeditions, season scanner |
| `src/app/about`, `src/app/services`, `src/app/contact` | About Us, the six services (index plus a page each) and the contact form |
| `src/app/destinations/[slug]` | 22 destination pages in three groups: Kenya, Africa, Rest of the World |
| `src/app/tours/[slug]` | Expedition itineraries with an animated route map |
| `src/app/plan` | Route builder form with a server action (`actions.ts`) |
| `src/data/*` | All content: destinations, tours, site copy, photo credits |
| `src/components/kenya-map.tsx` | SVG map of Kenya, projected from lat/lon |
| `src/components/world-route-map.tsx` | "Routes from Nairobi" flight-arc chart for destinations outside Kenya |
| `src/components/site-header.tsx` | Header with Services and Destinations mega menus |
| `src/proxy.ts` | Sends a real 404 for unknown destination, tour and service slugs |
| `src/app/sitemap.ts`, `src/app/robots.ts` | SEO files for flairtravels.com |

## Before launch

- Set the SMTP variables from `.env.example` on the host, then send a test enquiry from the live site.
- Contact details in `src/data/site.ts` are real. Stats, testimonials, prices and service promises (e.g. "24/7", "same working day") are placeholders to confirm.
- Photos come from Wikimedia Commons under CC licences. Attribution is listed at `/credits` and must stay published while the photos are in use.
