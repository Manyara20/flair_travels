export const site = {
  name: "Flair Travels",
  url: "https://flairtravels.com",
  tagline: "Tours & Travel",
  slogan: "Travel made easy",
  description:
    "Tours & travel, made easy. Flair Travels is a Nairobi travel company offering air ticketing, hotel reservations, visa processing, airport transfers, safari packages and MICE, with trips across Kenya, Africa and the rest of the world.",
  email: "info@flairtravels.com",
  phone: "+254 721 214 428",
  phoneHref: "tel:+254721214428",
  whatsappHref: "https://wa.me/254721214428",
  postal: "P.O. Box 3334-00100",
  city: "Nairobi, Kenya",
  hq: { lat: -1.2921, lon: 36.8219 },
};

export const nav = [
  { href: "/about", label: "About Us", index: "01", menu: null },
  { href: "/services", label: "Our Services", index: "02", menu: "services" },
  { href: "/destinations", label: "Destinations", index: "03", menu: "destinations" },
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
      "Flights, Schengen visas and hotels for 14 of us to Italy, with nothing missed. They even rebooked two people overnight when a connection was cancelled.",
    name: "Grace W.",
    origin: "Nairobi",
    trip: "ITALY",
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
  { value: "22", label: "Destinations across three continents" },
  { value: "6", label: "Services under one roof" },
  { value: "24/7", label: "Support while you travel" },
  { value: "0°", label: "Latitude: we work on the equator" },
] as const;
