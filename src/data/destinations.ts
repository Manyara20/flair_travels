import type { PhotoKey } from "@/assets/photos";

/** 0 = off-season, 1 = good, 2 = prime. One entry per month, Jan → Dec. */
export type Season = readonly [number, number, number, number, number, number, number, number, number, number, number, number];

export type Region = "Rift Valley" | "Southern Plains" | "Northern Frontier" | "Central Highlands" | "Swahili Coast";

export type Destination = {
  slug: string;
  code: string;
  name: string;
  region: Region;
  lat: number;
  lon: number;
  elevation: string;
  area: string;
  access: string;
  photo: PhotoKey;
  tagline: string;
  summary: string;
  highlights: string[];
  signatures: { label: string; value: string }[];
  season: Season;
  fromPrice: number;
};

export const destinations: Destination[] = [
  {
    slug: "maasai-mara",
    code: "MMR",
    name: "Maasai Mara",
    region: "Rift Valley",
    lat: -1.49,
    lon: 35.14,
    elevation: "1,500–2,170 m",
    area: "1,510 km²",
    access: "45 min flight from Wilson",
    photo: "maasaiMara",
    tagline: "Where the herds write the calendar.",
    summary:
      "Rolling red-oat grassland that hosts the river crossings of the Great Migration and the densest big-cat sightings on the continent. We base guests in private conservancies so game drives stay quiet, off-road, and after dark.",
    highlights: [
      "Mara River crossings, July to October",
      "Dawn hot-air balloon flight with bush breakfast",
      "Night drives and walking safaris in the conservancies",
      "Time in a Maasai manyatta with local hosts",
    ],
    signatures: [
      { label: "Big Five", value: "All five" },
      { label: "Lions", value: "≈ 850" },
      { label: "Herd peak", value: "1.5M+ wildebeest" },
    ],
    season: [1, 1, 1, 0, 0, 1, 2, 2, 2, 2, 1, 1],
    fromPrice: 2450,
  },
  {
    slug: "amboseli",
    code: "AMB",
    name: "Amboseli",
    region: "Southern Plains",
    lat: -2.65,
    lon: 37.26,
    elevation: "1,150 m",
    area: "392 km²",
    access: "4 h drive · 40 min flight",
    photo: "amboseli",
    tagline: "Elephants, framed by Kilimanjaro.",
    summary:
      "Swamps fed by Kilimanjaro snowmelt draw some of Africa's largest tuskers across open pan. At first light the cloud lifts off the mountain, and that's the photograph everyone comes for.",
    highlights: [
      "Big-tusker elephant families at Enkongo Narok swamp",
      "Observation Hill sunrise over the pans",
      "Photographic hides at waterholes",
      "Cultural visit with the Ilkisongo Maasai",
    ],
    signatures: [
      { label: "Elephants", value: "≈ 1,600" },
      { label: "Peak view", value: "5,895 m Kibo" },
      { label: "Birdlife", value: "400+ species" },
    ],
    season: [2, 2, 1, 0, 0, 1, 2, 2, 2, 2, 1, 1],
    fromPrice: 1890,
  },
  {
    slug: "samburu",
    code: "SMB",
    name: "Samburu",
    region: "Northern Frontier",
    lat: 0.62,
    lon: 37.53,
    elevation: "800–1,230 m",
    area: "165 km²",
    access: "1 h flight · 5 h drive",
    photo: "samburu",
    tagline: "The arid north, and animals found nowhere else.",
    summary:
      "Doum palms line the Ewaso Ng'iro river through dry, ochre country. This is the home of the 'Samburu Special Five': species adapted to the north that you won't see in the southern parks.",
    highlights: [
      "Reticulated giraffe, Grévy's zebra, gerenuk, beisa oryx, Somali ostrich",
      "Riverside leopard tracking along the Ewaso Ng'iro",
      "Camel-supported walking safaris",
      "Evenings with Samburu warriors",
    ],
    signatures: [
      { label: "Endemics", value: "Special Five" },
      { label: "River", value: "Ewaso Ng'iro" },
      { label: "Crowds", value: "Very low" },
    ],
    season: [2, 2, 1, 0, 1, 2, 2, 2, 2, 1, 0, 1],
    fromPrice: 2280,
  },
  {
    slug: "tsavo",
    code: "TSV",
    name: "Tsavo",
    region: "Southern Plains",
    lat: -2.98,
    lon: 38.47,
    elevation: "230–1,800 m",
    area: "22,000 km²",
    access: "SGR train + road transfer",
    photo: "tsavo",
    tagline: "Red-dust elephants and a whole lot of horizon.",
    summary:
      "Kenya's largest protected area. Elephants dust-bathe in the iron-rich soil and come out rust-red. Lava flows, Mzima Springs and the Yatta Plateau make it the most varied landscape on the circuit.",
    highlights: [
      "Red elephants of Tsavo East",
      "Underwater hippo hide at Mzima Springs",
      "Shetani lava flows and Chaimu crater",
      "Yatta Plateau, one of the longest lava flows on Earth",
    ],
    signatures: [
      { label: "Scale", value: "4% of Kenya" },
      { label: "Elephants", value: "≈ 15,000" },
      { label: "Rail access", value: "Nairobi → Voi" },
    ],
    season: [2, 2, 1, 0, 0, 1, 2, 2, 2, 2, 1, 1],
    fromPrice: 1640,
  },
  {
    slug: "lake-nakuru",
    code: "NKR",
    name: "Lake Nakuru",
    region: "Rift Valley",
    lat: -0.36,
    lon: 36.08,
    elevation: "1,759 m",
    area: "188 km²",
    access: "3 h drive",
    photo: "lakeNakuru",
    tagline: "A soda lake with a rhino sanctuary around it.",
    summary:
      "An alkaline lake on the Rift Valley floor, ringed by yellow-fever acacia. Flamingos feed on the shallows, and the fenced sanctuary holds one of the country's densest populations of black and white rhino.",
    highlights: [
      "Black and white rhino at close range",
      "Lesser flamingo feeding grounds",
      "Baboon Cliff viewpoint over the lake",
      "Tree-climbing lions in the acacia forest",
    ],
    signatures: [
      { label: "Rhino", value: "Black + white" },
      { label: "Birdlife", value: "450+ species" },
      { label: "Lake type", value: "Soda / alkaline" },
    ],
    season: [1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1],
    fromPrice: 980,
  },
  {
    slug: "naivasha-hells-gate",
    code: "HGT",
    name: "Naivasha & Hell's Gate",
    region: "Rift Valley",
    lat: -0.91,
    lon: 36.31,
    elevation: "1,890 m",
    area: "68 km² park",
    access: "2 h drive",
    photo: "hellsGate",
    tagline: "Cycle with zebra, then walk down a volcanic gorge.",
    summary:
      "A freshwater lake full of hippos sits next to a park where you can walk and cycle among plains game. Geothermal vents steam beside the trail, and the Ol Njorowa gorge drops through cliffs of volcanic ash.",
    highlights: [
      "Cycling safari through Hell's Gate",
      "Guided descent of the Ol Njorowa gorge",
      "Boat safari among hippos on Lake Naivasha",
      "Walking safari on Crescent Island",
    ],
    signatures: [
      { label: "On foot", value: "Bike + hike" },
      { label: "Hippos", value: "Hundreds" },
      { label: "Geology", value: "Active geothermal" },
    ],
    season: [2, 2, 1, 0, 0, 1, 2, 2, 2, 1, 1, 2],
    fromPrice: 760,
  },
  {
    slug: "mount-kenya",
    code: "MTK",
    name: "Mount Kenya",
    region: "Central Highlands",
    lat: -0.15,
    lon: 37.31,
    elevation: "5,199 m Batian",
    area: "715 km²",
    access: "3 h drive to Nanyuki",
    photo: "mountKenya",
    tagline: "Glaciers almost exactly on the equator.",
    summary:
      "Africa's second-highest mountain is an eroded volcano. Its slopes climb through bamboo forest and giant-lobelia moorland to equatorial glaciers. Point Lenana (4,985 m) is a serious trek, but no technical climbing is needed.",
    highlights: [
      "Sirimon–Chogoria traverse to Point Lenana",
      "Afro-alpine moorland with giant groundsels",
      "Rhino tracking at nearby Ol Pejeta Conservancy",
      "Crossing the equator line at Nanyuki",
    ],
    signatures: [
      { label: "Summit", value: "5,199 m" },
      { label: "Status", value: "UNESCO site" },
      { label: "Trek", value: "4–6 days" },
    ],
    season: [2, 2, 1, 0, 0, 1, 1, 2, 2, 1, 0, 1],
    fromPrice: 1420,
  },
  {
    slug: "nairobi",
    code: "NBO",
    name: "Nairobi",
    region: "Central Highlands",
    lat: -1.29,
    lon: 36.82,
    elevation: "1,795 m",
    area: "117 km² park",
    access: "JKIA international hub",
    photo: "nairobi",
    tagline: "A capital city with lions inside its limits.",
    summary:
      "The only capital in the world with a national park inside its boundary. Giraffes graze in front of the skyline. We use the city as a launch day: orphaned elephants in the morning, then the food and design scene at night.",
    highlights: [
      "Sunrise game drive against the city skyline",
      "Sheldrick Wildlife Trust elephant orphanage",
      "Giraffe Centre and the Karen Blixen Museum",
      "Chef's table across Westlands and Kilimani",
    ],
    signatures: [
      { label: "Distance", value: "7 km to CBD" },
      { label: "Rhino", value: "Black rhino" },
      { label: "Role", value: "Launch hub" },
    ],
    season: [1, 1, 1, 0, 0, 1, 2, 2, 2, 1, 1, 1],
    fromPrice: 540,
  },
  {
    slug: "lamu",
    code: "LAU",
    name: "Lamu",
    region: "Swahili Coast",
    lat: -2.27,
    lon: 40.9,
    elevation: "Sea level",
    area: "UNESCO Old Town",
    access: "1 h 30 min flight",
    photo: "lamu",
    tagline: "An island town where donkeys still outnumber cars.",
    summary:
      "The oldest continuously inhabited Swahili town in East Africa. It has coral-stone lanes, carved doors and dhows under lateen sails. There are no roads to speak of, so you get around on foot, by donkey or by boat.",
    highlights: [
      "Sunset dhow sail across the archipelago",
      "Lamu Old Town walk: carved doors, mosques and museums",
      "Shela beach and the dunes",
      "Lamu Cultural Festival each November",
    ],
    signatures: [
      { label: "Founded", value: "14th century" },
      { label: "Status", value: "UNESCO site" },
      { label: "Cars", value: "Essentially none" },
    ],
    season: [2, 2, 2, 0, 0, 0, 1, 1, 2, 2, 2, 2],
    fromPrice: 1180,
  },
  {
    slug: "diani",
    code: "DIA",
    name: "Diani",
    region: "Swahili Coast",
    lat: -4.32,
    lon: 39.58,
    elevation: "Sea level",
    area: "17 km of beach",
    access: "1 h flight to Ukunda",
    photo: "diani",
    tagline: "White coral sand after the dust of safari.",
    summary:
      "A long white-sand beach backed by coastal forest, with a protected reef offshore. This is where most safaris end: kitesurf on the kaskazi wind, snorkel Kisite-Mpunguti, and watch colobus monkeys in the trees.",
    highlights: [
      "Dolphin dhow trip to Kisite-Mpunguti Marine Park",
      "Kitesurfing in the kaskazi season, December to March",
      "Colobus conservation forest walk",
      "Seafood dinner on Wasini Island",
    ],
    signatures: [
      { label: "Sand", value: "Coral white" },
      { label: "Reef", value: "Protected" },
      { label: "Wind", value: "Kaskazi / Kusi" },
    ],
    season: [2, 2, 2, 0, 0, 1, 1, 2, 2, 2, 1, 2],
    fromPrice: 890,
  },
  {
    slug: "watamu",
    code: "WTM",
    name: "Watamu",
    region: "Swahili Coast",
    lat: -3.35,
    lon: 40.02,
    elevation: "Sea level",
    area: "10 km² marine park",
    access: "1 h flight to Malindi",
    photo: "watamu",
    tagline: "Turtle nesting beaches and a marine park.",
    summary:
      "Coves of coral rock and a marine national park. Turtle conservation runs along the shoreline, and the Gede Ruins sit in the forest just inland. Humpback whales pass offshore from July to October.",
    highlights: [
      "Snorkelling in Watamu Marine National Park",
      "Humpback whale watching, July to October",
      "Gede Ruins, a 12th-century Swahili town",
      "Turtle release with Local Ocean Conservation",
    ],
    signatures: [
      { label: "Turtles", value: "Nesting site" },
      { label: "Whales", value: "Jul–Oct" },
      { label: "Ruins", value: "Gede, 12th c." },
    ],
    season: [2, 2, 2, 0, 0, 1, 1, 2, 2, 2, 1, 2],
    fromPrice: 840,
  },
];

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

/** Formats decimal degrees as e.g. 01°29′S 35°08′E */
export function formatCoords(lat: number, lon: number) {
  const fmt = (v: number, pos: string, neg: string, pad: number) => {
    const abs = Math.abs(v);
    const deg = Math.floor(abs);
    const min = Math.round((abs - deg) * 60);
    return `${String(deg).padStart(pad, "0")}°${String(min).padStart(2, "0")}′${v >= 0 ? pos : neg}`;
  };
  return `${fmt(lat, "N", "S", 2)} ${fmt(lon, "E", "W", 2)}`;
}
