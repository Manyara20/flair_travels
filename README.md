# Flair Travels

Marketing site for a Kenya tours & travel company, built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4 and Motion.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Design system: "Zero Line"

Kenya sits on the equator, so the whole visual language is built around survey and expedition instruments.

- **Hard edges only.** Radius tokens are removed in `globals.css` (`--radius-*: initial`) and reset globally. Corners are cut with the `chamfer`, `chamfer-tr` and `chamfer-bl` utilities instead.
- **Palette:** ink `#0c0c0a`, bone `#eee8da`, laterite `#ff4f1f` (Kenyan red earth), volt `#d4ff3a` for live data.
- **Type:** Big Shoulders (display), Instrument Serif italic (accents), Instrument Sans (body), JetBrains Mono (data labels).
- **Motifs:** the dashed equator line, survey grids, viewfinder crop marks, coordinates, film grain.

## Structure

| Path | What it is |
| --- | --- |
| `src/app/page.tsx` | Home: hero, manifesto, destination index, expeditions rail, season scanner, field logs |
| `src/app/destinations/[slug]` | Destination pages (statically generated) |
| `src/app/tours/[slug]` | Expedition itineraries with an animated route map |
| `src/app/plan` | Route builder form with a server action (`actions.ts`) |
| `src/data/*` | All content: destinations, tours, site copy, photo credits |
| `src/components/kenya-map.tsx` | SVG map of Kenya, projected from lat/lon |
| `src/proxy.ts` | Sends a real 404 for unknown destination/tour slugs |

## Before launch

- `src/app/plan/actions.ts` validates enquiries but does not deliver them yet. Connect an email provider or CRM where the comment says to.
- Contact details, stats, testimonials and prices in `src/data/` are placeholders.
- Photos come from Wikimedia Commons under CC licences. Attribution is listed at `/credits` and must stay published while the photos are in use.
