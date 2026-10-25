export const site = {
  name: "Flair Travels",
  description:
    "Tailor-made safaris, treks and coastal journeys across Kenya, from the Maasai Mara to Lamu. Designed by a Nairobi team that has driven every route.",
  email: "hello@flairtravels.co.ke",
  phone: "+254 700 000 000",
  address: "Riverside Drive, Nairobi, Kenya",
  hq: { lat: -1.2921, lon: 36.8219 },
};

export const nav = [
  { href: "/destinations", label: "Destinations", index: "01" },
  { href: "/tours", label: "Expeditions", index: "02" },
  { href: "/#seasons", label: "Seasons", index: "03" },
  { href: "/plan", label: "Plan a trip", index: "04" },
] as const;

export const fieldLogs = [
  {
    quote:
      "Our guide Joseph had us parked at the crossing for 40 minutes before the first wildebeest jumped. Twelve other vehicles arrived after it started. He knew where they'd cross.",
    name: "Anja & Tomas R.",
    origin: "Rotterdam",
    trip: "FT-01",
  },
  {
    quote:
      "We emailed with a vague idea and a budget. We got back a route with a map, rough drive times and why each stop was there. It was the best planned trip we've done.",
    name: "Priya M.",
    origin: "Singapore",
    trip: "FT-00",
  },
  {
    quote:
      "I'd done the Mara before. I hadn't seen Samburu. The camel walk alone was worth the flight from Toronto.",
    name: "Daniel O.",
    origin: "Toronto",
    trip: "FT-03",
  },
] as const;

export const stats = [
  { value: "11", label: "Destinations we run ourselves" },
  { value: "38", label: "Guides, all Kenyan" },
  { value: "4.9", label: "Average guest rating" },
  { value: "0°", label: "Latitude: we work on the equator" },
] as const;
