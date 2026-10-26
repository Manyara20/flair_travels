import type { PhotoKey } from "@/assets/photos";

/** 0 = off-season, 1 = good, 2 = prime. One entry per month, Jan → Dec. */
export type Season = readonly [number, number, number, number, number, number, number, number, number, number, number, number];

export type Collection = "kenya" | "africa" | "world";

export const collections: { id: Collection; label: string; index: string; blurb: string }[] = [
  { id: "kenya", label: "Kenya", index: "K", blurb: "Home ground. Eleven places we drive, fly into and guide ourselves." },
  { id: "africa", label: "Africa", index: "A", blurb: "Gorillas, the Serengeti, the Cape and the Indian Ocean islands, all a short hop from Nairobi." },
  { id: "world", label: "Rest of the World", index: "W", blurb: "Beaches, cities and islands further afield, booked with the same care." },
];

export type Destination = {
  slug: string;
  code: string;
  name: string;
  country: string;
  collection: Collection;
  region: string;
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
    country: "Kenya",
    collection: "kenya",
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
    country: "Kenya",
    collection: "kenya",
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
    country: "Kenya",
    collection: "kenya",
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
    country: "Kenya",
    collection: "kenya",
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
    country: "Kenya",
    collection: "kenya",
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
    country: "Kenya",
    collection: "kenya",
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
    country: "Kenya",
    collection: "kenya",
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
    country: "Kenya",
    collection: "kenya",
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
    country: "Kenya",
    collection: "kenya",
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
    country: "Kenya",
    collection: "kenya",
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
    country: "Kenya",
    collection: "kenya",
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

  // ── Africa ──────────────────────────────────────────────────────────────
  {
    slug: "rwanda",
    code: "RWA",
    name: "Rwanda",
    country: "Rwanda",
    collection: "africa",
    region: "East Africa",
    lat: -1.48,
    lon: 29.53,
    elevation: "2,400–4,507 m",
    area: "160 km² Volcanoes NP",
    access: "1 h 15 min flight to Kigali",
    photo: "rwanda",
    tagline: "An hour with mountain gorillas.",
    summary:
      "Bamboo forest on the slopes of the Virunga volcanoes is home to habituated mountain gorilla families. Permits are limited and treks are strenuous, so we handle the permits, the timing and the lodge near the park gate.",
    highlights: [
      "Gorilla trekking in Volcanoes National Park",
      "Golden monkey tracking in the bamboo",
      "Kigali city tour and the Genocide Memorial",
      "Slow days on the shore of Lake Kivu",
    ],
    signatures: [
      { label: "Encounter", value: "1 hour" },
      { label: "Group size", value: "Max 8" },
      { label: "Permit", value: "We secure it" },
    ],
    season: [2, 2, 1, 0, 0, 2, 2, 2, 2, 1, 0, 1],
    fromPrice: 3200,
  },
  {
    slug: "serengeti",
    code: "SRG",
    name: "Serengeti",
    country: "Tanzania",
    collection: "africa",
    region: "East Africa",
    lat: -2.33,
    lon: 34.83,
    elevation: "920–1,850 m",
    area: "14,763 km²",
    access: "Fly to Kilimanjaro, then a bush flight",
    photo: "serengeti",
    tagline: "The other half of the Great Migration.",
    summary:
      "The southern half of the migration loop. The herds calve on the short-grass plains early in the year, then move north towards the Mara. We pair it with the Ngorongoro Crater or run it as a cross-border trip from Kenya.",
    highlights: [
      "Calving season on the southern plains, January to March",
      "Grumeti River crossings in June and July",
      "Day in the Ngorongoro Crater",
      "Mobile camps that follow the herds",
    ],
    signatures: [
      { label: "Wildebeest", value: "1.5M+" },
      { label: "Status", value: "UNESCO site" },
      { label: "Pairs with", value: "Maasai Mara" },
    ],
    season: [2, 2, 1, 0, 0, 2, 2, 2, 2, 1, 1, 1],
    fromPrice: 2950,
  },
  {
    slug: "seychelles",
    code: "SEZ",
    name: "Seychelles",
    country: "Seychelles",
    collection: "africa",
    region: "Indian Ocean",
    lat: -4.68,
    lon: 55.49,
    elevation: "0–905 m",
    area: "115 islands",
    access: "2 h 50 min direct flight",
    photo: "seychelles",
    tagline: "Granite boulders and very clear water.",
    summary:
      "Granite islands with some of the most photographed beaches in the world. We plan island-hopping by ferry and light aircraft between Mahé, Praslin and La Digue.",
    highlights: [
      "Anse Source d'Argent on La Digue",
      "Coco de mer palms in the Vallée de Mai",
      "Giant tortoises on Curieuse Island",
      "Snorkelling in Sainte Anne Marine Park",
    ],
    signatures: [
      { label: "Islands", value: "115" },
      { label: "Flight", value: "Under 3 h" },
      { label: "Best for", value: "Honeymoons" },
    ],
    season: [1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1],
    fromPrice: 2400,
  },
  {
    slug: "mauritius",
    code: "MRU",
    name: "Mauritius",
    country: "Mauritius",
    collection: "africa",
    region: "Indian Ocean",
    lat: -20.35,
    lon: 57.55,
    elevation: "0–828 m",
    area: "2,040 km²",
    access: "4 h direct flight",
    photo: "mauritius",
    tagline: "Lagoons, mountains and a strong food culture.",
    summary:
      "A volcanic island ringed by a coral reef, with calm lagoons for swimming. Inland there are waterfalls and forest. We book resorts on the right coast for the season, plus catamaran days and a food trail through Port Louis.",
    highlights: [
      "Le Morne Brabant, a UNESCO cultural landscape",
      "Catamaran day to Île aux Cerfs",
      "Seven Coloured Earths at Chamarel",
      "Street food in Port Louis",
    ],
    signatures: [
      { label: "Reef", value: "Encircling" },
      { label: "Status", value: "UNESCO site" },
      { label: "Best for", value: "Families" },
    ],
    season: [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
    fromPrice: 2100,
  },
  {
    slug: "uganda",
    code: "UGA",
    name: "Uganda",
    country: "Uganda",
    collection: "africa",
    region: "East Africa",
    lat: -1.03,
    lon: 29.68,
    elevation: "1,160–2,607 m",
    area: "331 km² Bwindi",
    access: "1 h 10 min flight to Entebbe",
    photo: "uganda",
    tagline: "Gorillas, chimpanzees and the Nile.",
    summary:
      "The 'Pearl of Africa' packs a lot into one trip. There are gorillas in Bwindi Impenetrable Forest, chimpanzees in Kibale, tree-climbing lions in Ishasha, and Murchison Falls, where the Nile forces its way through a 7-metre gap.",
    highlights: [
      "Gorilla trekking in Bwindi Impenetrable Forest",
      "Chimpanzee tracking in Kibale",
      "Boat to the foot of Murchison Falls",
      "Source of the Nile at Jinja",
    ],
    signatures: [
      { label: "Primates", value: "13 species" },
      { label: "Gorillas", value: "≈ Half of all" },
      { label: "River", value: "The Nile" },
    ],
    season: [2, 2, 1, 0, 0, 2, 2, 2, 2, 1, 1, 2],
    fromPrice: 2650,
  },
  {
    slug: "cape-town",
    code: "CPT",
    name: "Cape Town",
    country: "South Africa",
    collection: "africa",
    region: "Southern Africa",
    lat: -33.92,
    lon: 18.42,
    elevation: "0–1,085 m",
    area: "Table Mountain NP",
    access: "4 h 45 min direct flight",
    photo: "capeTown",
    tagline: "A mountain, two oceans and a wine region.",
    summary:
      "A city with a national park in the middle and penguins on the beach. We combine the Atlantic seaboard, the drive to Cape Point and two or three days in the Winelands. The Garden Route can be added at the end.",
    highlights: [
      "Cable car up Table Mountain",
      "Chapman's Peak drive to Cape Point",
      "African penguins at Boulders Beach",
      "Wine tasting in Stellenbosch and Franschhoek",
    ],
    signatures: [
      { label: "Oceans", value: "Two" },
      { label: "Summit", value: "1,085 m" },
      { label: "Best for", value: "Food & wine" },
    ],
    season: [2, 2, 2, 1, 1, 0, 0, 0, 1, 1, 2, 2],
    fromPrice: 1850,
  },

  // ── Rest of the world ──────────────────────────────────────────────────
  {
    slug: "bali",
    code: "DPS",
    name: "Bali",
    country: "Indonesia",
    collection: "world",
    region: "Southeast Asia",
    lat: -8.34,
    lon: 115.09,
    elevation: "0–3,031 m",
    area: "5,780 km²",
    access: "Via Doha or Dubai",
    photo: "bali",
    tagline: "Rice terraces, temples and surf.",
    summary:
      "Bali mixes spiritual and lively in a small space. You can spend mornings in the rice terraces around Ubud, evenings at the Uluwatu clifftop temple, and climb a volcano before dawn. We plan the stays to avoid the busy south.",
    highlights: [
      "Tegallalang and Jatiluwih rice terraces",
      "Kecak fire dance at Uluwatu Temple",
      "Sunrise trek on Mount Batur",
      "Day trip to Nusa Penida",
    ],
    signatures: [
      { label: "Temples", value: "Thousands" },
      { label: "Status", value: "UNESCO Subak" },
      { label: "Best for", value: "Culture" },
    ],
    season: [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0],
    fromPrice: 2300,
  },
  {
    slug: "maldives",
    code: "MLE",
    name: "Maldives",
    country: "Maldives",
    collection: "world",
    region: "Indian Ocean",
    lat: 3.2,
    lon: 73.22,
    elevation: "Avg 1.5 m",
    area: "1,192 islands",
    access: "Via Dubai or Doha",
    photo: "maldives",
    tagline: "Overwater villas on a turquoise lagoon.",
    summary:
      "Coral atolls where each resort has its own island. Transfers are by seaplane or speedboat. We match the resort to you, whether that's a house reef for snorkelling, a family kids' club or adults-only quiet.",
    highlights: [
      "Overwater villa with direct lagoon access",
      "Seaplane transfer over the atolls",
      "Manta rays at Hanifaru Bay, June to November",
      "Whale shark snorkelling in South Ari",
    ],
    signatures: [
      { label: "Islands", value: "1,192" },
      { label: "Transfer", value: "Seaplane" },
      { label: "Best for", value: "Honeymoons" },
    ],
    season: [2, 2, 2, 2, 1, 0, 0, 0, 1, 1, 1, 2],
    fromPrice: 3600,
  },
  {
    slug: "dubai",
    code: "DXB",
    name: "Dubai",
    country: "United Arab Emirates",
    collection: "world",
    region: "Middle East",
    lat: 25.2,
    lon: 55.27,
    elevation: "828 m Burj Khalifa",
    area: "4,114 km²",
    access: "4 h 45 min direct flight",
    photo: "dubai",
    tagline: "Desert and skyscrapers, under five hours away.",
    summary:
      "The easiest long weekend from Nairobi, and a useful stopover. You can spend a morning on the observation deck, the afternoon in the dunes and the evening in the old souks. We also arrange UAE visas.",
    highlights: [
      "At the Top, Burj Khalifa",
      "Desert safari with a dune drive and camp dinner",
      "Abra across the Creek to the gold and spice souks",
      "Museum of the Future",
    ],
    signatures: [
      { label: "Flight", value: "Under 5 h" },
      { label: "Visa", value: "We process it" },
      { label: "Best for", value: "Shopping" },
    ],
    season: [2, 2, 2, 1, 0, 0, 0, 0, 0, 1, 2, 2],
    fromPrice: 1450,
  },
  {
    slug: "greece",
    code: "ATH",
    name: "Greece",
    country: "Greece",
    collection: "world",
    region: "Mediterranean",
    lat: 37.98,
    lon: 23.73,
    elevation: "0–2,917 m",
    area: "6,000 islands",
    access: "Via Addis Ababa, Cairo or Doha",
    photo: "greece",
    tagline: "Ancient sites and whitewashed islands.",
    summary:
      "Athens for the Acropolis, then the islands by ferry. Santorini has the caldera sunsets and Mykonos the beaches, or you can pick a quieter Cycladic island. We take care of the Schengen visa and the ferry timetable.",
    highlights: [
      "The Acropolis and Plaka in Athens",
      "Sunset in Oia, Santorini",
      "Island-hopping across the Cyclades",
      "Clifftop monasteries at Meteora",
    ],
    signatures: [
      { label: "Islands", value: "≈ 6,000" },
      { label: "Visa", value: "Schengen" },
      { label: "Best for", value: "History" },
    ],
    season: [0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0],
    fromPrice: 2800,
  },
  {
    slug: "italy",
    code: "FCO",
    name: "Italy",
    country: "Italy",
    collection: "world",
    region: "Mediterranean",
    lat: 41.9,
    lon: 12.5,
    elevation: "0–4,808 m",
    area: "301,340 km²",
    access: "Via Addis Ababa, Doha or Dubai",
    photo: "italy",
    tagline: "Rome, Florence and the Amalfi Coast.",
    summary:
      "Our standard Italy route runs Rome, then Florence and Tuscany, then south to the Amalfi Coast, with Venice added if you have the days. It moves by fast train between cities and by car or boat on the coast.",
    highlights: [
      "Colosseum and Vatican Museums in Rome",
      "Florence, the Uffizi and Tuscan hill towns",
      "Positano and the Amalfi Coast by boat",
      "Gondola through the canals of Venice",
    ],
    signatures: [
      { label: "UNESCO", value: "60+ sites" },
      { label: "Visa", value: "Schengen" },
      { label: "Best for", value: "Food & art" },
    ],
    season: [0, 0, 1, 2, 2, 2, 1, 1, 2, 2, 1, 0],
    fromPrice: 2900,
  },
];

export const kenyaDestinations = destinations.filter((d) => d.collection === "kenya");

export function destinationsIn(collection: Collection) {
  return destinations.filter((d) => d.collection === collection);
}

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
