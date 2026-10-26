import type { PhotoKey } from "@/assets/photos";

export type Service = {
  slug: string;
  code: string;
  title: string;
  short: string;
  photo: PhotoKey;
  pitch: string;
  includes: string[];
  facts: { label: string; value: string }[];
  /** Where the main call-to-action should send people. */
  cta: { label: string; href: string };
};

export const services: Service[] = [
  {
    slug: "air-ticketing",
    code: "S-01",
    title: "Air Ticketing",
    short: "Local and international flights, including multi-city routes and group fares.",
    photo: "air",
    pitch:
      "We compare fares across scheduled airlines and pick the routing that suits you, whether that's the cheapest, the shortest or the one with the most sensible layover. If plans change, call us rather than an airline call centre.",
    includes: [
      "Local flights within Kenya and East Africa",
      "International, multi-city and round-the-world itineraries",
      "Group and corporate fares",
      "Date changes, reissues and refunds handled for you",
      "Seat, meal and special-assistance requests",
    ],
    facts: [
      { label: "Coverage", value: "Worldwide" },
      { label: "Support", value: "Before & during" },
      { label: "Groups", value: "Any size" },
    ],
    cta: { label: "Request a fare", href: "/contact?service=air-ticketing" },
  },
  {
    slug: "hotel-reservations",
    code: "S-02",
    title: "Hotel Reservations",
    short: "Hotels, lodges, camps and resorts, confirmed in writing.",
    photo: "hotel",
    pitch:
      "We book city hotels for business trips, safari lodges, beach resorts and boutique stays. We have stayed in or inspected many of them ourselves. You get a confirmed voucher, and we stay in touch with the property until you check out.",
    includes: [
      "City and business hotels in Kenya and abroad",
      "Safari lodges and tented camps",
      "Beach and island resorts",
      "Group room blocks for events and weddings",
      "Room upgrades and special-occasion setups where available",
    ],
    facts: [
      { label: "Types", value: "City to camp" },
      { label: "Vouchers", value: "Written" },
      { label: "Groups", value: "Room blocks" },
    ],
    cta: { label: "Book a stay", href: "/contact?service=hotel-reservations" },
  },
  {
    slug: "visa-processing",
    code: "S-03",
    title: "Visa Processing",
    short: "Checklists, forms and appointments for Schengen, UK, US, UAE and more.",
    photo: "visa",
    pitch:
      "Visa rules change often and small mistakes cause delays. We tell you exactly which documents you need, check your application before it's submitted, and book the appointment. The decision is always the embassy's, but your file will be complete.",
    includes: [
      "Document checklists for your nationality and destination",
      "Application form completion and review",
      "Appointment booking at the visa centre",
      "Supporting letters, itineraries and hotel confirmations",
      "eVisa and Electronic Travel Authorisation applications",
    ],
    facts: [
      { label: "Common", value: "Schengen · UK · UAE" },
      { label: "File check", value: "Before submission" },
      { label: "eVisas", value: "Yes" },
    ],
    cta: { label: "Start a visa file", href: "/contact?service=visa-processing" },
  },
  {
    slug: "airport-transfers",
    code: "S-04",
    title: "Airport Transfers",
    short: "Meet-and-greet pickups at JKIA, Wilson and the coast airports.",
    photo: "transfer",
    pitch:
      "A driver waits at arrivals with your name on a board. They track your flight, so a delay doesn't leave you stranded. We quote a fixed price up front and use vehicles sized for your group and luggage.",
    includes: [
      "Jomo Kenyatta International and Wilson Airport, Nairobi",
      "Moi International (Mombasa), Malindi and Ukunda airstrips",
      "Flight tracking for delayed arrivals",
      "Saloon cars, vans and coaches for groups",
      "Hotel-to-airport and inter-city transfers",
    ],
    facts: [
      { label: "Pricing", value: "Fixed" },
      { label: "Flights", value: "Tracked" },
      { label: "Hours", value: "Around the clock" },
    ],
    cta: { label: "Book a transfer", href: "/contact?service=airport-transfers" },
  },
  {
    slug: "safari-packages",
    code: "S-05",
    title: "Exclusive & Safari Packages",
    short: "Private safaris, beach holidays and tailor-made trips.",
    photo: "elephantAerial",
    pitch:
      "This is our core business. We plan private safaris with your own vehicle and guide, honeymoons, family holidays and multi-country trips. You can start from one of our tested expeditions or describe the trip you want and we'll design it.",
    includes: [
      "Private safaris in Kenya, Tanzania, Uganda and Rwanda",
      "Beach and island extensions",
      "Honeymoon and celebration packages",
      "Family-friendly itineraries",
      "Fly-in safaris and balloon flights",
    ],
    facts: [
      { label: "Vehicles", value: "Private 4×4" },
      { label: "Routes", value: "Tailor-made" },
      { label: "Countries", value: "Kenya & beyond" },
    ],
    cta: { label: "See expeditions", href: "/tours" },
  },
  {
    slug: "mice",
    code: "S-06",
    title: "MICE & Conferences",
    short: "Meetings, incentive trips, conferences and events.",
    photo: "mice",
    pitch:
      "We run the logistics so your team can focus on the event itself. That covers venue sourcing, delegate flights and rooms, airport handling, gala dinners and incentive add-ons such as a day in the Mara or a weekend at the coast.",
    includes: [
      "Venue sourcing and contracting",
      "Delegate registration, flights and accommodation",
      "Airport meet-and-greet and ground transport",
      "Gala dinners, team-building and excursions",
      "Incentive trips to reward high performers",
    ],
    facts: [
      { label: "M · I · C · E", value: "All four" },
      { label: "Scale", value: "10 to 1,000+" },
      { label: "Add-ons", value: "Safari days" },
    ],
    cta: { label: "Brief us on an event", href: "/contact?service=mice" },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
