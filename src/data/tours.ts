import type { PhotoKey } from "@/assets/photos";

export type TourStyle = "Safari" | "Coast" | "Adventure" | "Signature";

export type Tour = {
  slug: string;
  code: string;
  title: string;
  style: TourStyle;
  days: number;
  price: number;
  /** 1 (easy) → 5 (demanding) */
  intensity: number;
  groupSize: string;
  route: string[];
  photo: PhotoKey;
  pitch: string;
  includes: string[];
  itinerary: { day: string; title: string; detail: string }[];
};

export const tours: Tour[] = [
  {
    slug: "great-migration-pulse",
    code: "FT-01",
    title: "Great Migration Pulse",
    style: "Safari",
    days: 7,
    price: 3480,
    intensity: 2,
    groupSize: "2–6 guests",
    route: ["nairobi", "lake-nakuru", "maasai-mara"],
    photo: "river",
    pitch:
      "Built around the Mara River crossings. You spend four nights in a private conservancy, with a balloon flight and a day at the river with a guide who reads the herds.",
    includes: ["Private 4×4 Land Cruiser", "Balloon flight", "Conservancy fees", "Bush flights"],
    itinerary: [
      { day: "01", title: "Nairobi arrival", detail: "Meet at JKIA, transfer to a garden hotel in Karen, and a briefing over dinner." },
      { day: "02", title: "Lake Nakuru", detail: "Drive down the Rift Valley escarpment. Afternoon rhino and flamingo drive." },
      { day: "03", title: "Into the Mara", detail: "Overland through Narok to a private conservancy camp. Sundowner drive." },
      { day: "04–05", title: "River days", detail: "Full days at the Mara River crossing points, with picnic lunches and patient waiting." },
      { day: "06", title: "Balloon at dawn", detail: "Lift off before sunrise, champagne breakfast on the plains, then a walking safari." },
      { day: "07", title: "Fly out", detail: "Light aircraft back to Wilson Airport in time for international connections." },
    ],
  },
  {
    slug: "kilimanjaro-shadow-line",
    code: "FT-02",
    title: "Kilimanjaro Shadow Line",
    style: "Safari",
    days: 6,
    price: 2690,
    intensity: 2,
    groupSize: "2–6 guests",
    route: ["nairobi", "amboseli", "tsavo"],
    photo: "amboseli",
    pitch:
      "Big tuskers in front of Africa's highest peak, then south into Tsavo's red-earth country. You ride the SGR train back to Nairobi.",
    includes: ["Private 4×4 Land Cruiser", "Photographic hide session", "SGR first class", "Park fees"],
    itinerary: [
      { day: "01", title: "Nairobi to Amboseli", detail: "Morning drive south. Afternoon drive at the swamps as the elephant herds come in." },
      { day: "02", title: "Kibo at first light", detail: "Pre-dawn departure to catch Kilimanjaro before the cloud closes in." },
      { day: "03", title: "Chyulu & Mzima", detail: "Cross into Tsavo West and watch hippos from the underwater hide at Mzima Springs." },
      { day: "04", title: "Shetani lava", detail: "Lava flows, Chaimu crater, and a sunset at the Ngulia escarpment." },
      { day: "05", title: "Red elephants", detail: "Tsavo East: the Galana River, Lugard Falls and the red-dust herds." },
      { day: "06", title: "Rail home", detail: "Afternoon SGR from Voi to Nairobi, with the plains passing the window." },
    ],
  },
  {
    slug: "northern-frontier-signal",
    code: "FT-03",
    title: "Northern Frontier Signal",
    style: "Adventure",
    days: 8,
    price: 3950,
    intensity: 3,
    groupSize: "2–8 guests",
    route: ["nairobi", "mount-kenya", "samburu"],
    photo: "samburu",
    pitch:
      "The quiet north. You cross the equator at Nanyuki, track rhino at Ol Pejeta, then go on to Samburu for species found nowhere else in Kenya and camel-supported walks.",
    includes: ["Expert naturalist guide", "Camel walking safari", "Ol Pejeta rhino tracking", "All meals"],
    itinerary: [
      { day: "01", title: "Up the highlands", detail: "Drive to Nanyuki, step across the equator, and stay at a lodge in the foothills." },
      { day: "02", title: "Ol Pejeta", detail: "Track black rhino and visit the last northern white rhinos." },
      { day: "03", title: "Mount Kenya forest", detail: "Guided forest hike to the moorland edge and a picnic lunch at altitude." },
      { day: "04–05", title: "Samburu", detail: "Drive north into arid country. Game drives along the river for the Special Five." },
      { day: "06", title: "Camel trek", detail: "A full day walking with Samburu guides and camels carrying the kit." },
      { day: "07", title: "Warrior night", detail: "Singing and dancing, then a night under some of the clearest skies in Kenya." },
      { day: "08", title: "Fly south", detail: "Light aircraft back to Nairobi." },
    ],
  },
  {
    slug: "swahili-tide-protocol",
    code: "FT-04",
    title: "Swahili Tide Protocol",
    style: "Coast",
    days: 9,
    price: 2840,
    intensity: 1,
    groupSize: "2–10 guests",
    route: ["lamu", "watamu", "diani"],
    photo: "lamu",
    pitch:
      "Nine days on the Indian Ocean: Lamu's coral-stone lanes, Watamu's turtle beaches, and Diani's reef at the end. Most of it you'll spend on dhows.",
    includes: ["Coastal flights", "Sunset dhow charters", "Marine park fees", "Boutique stays"],
    itinerary: [
      { day: "01–03", title: "Lamu Old Town", detail: "Walk the lanes with a local historian, then a dhow to Shela beach and the dunes." },
      { day: "04", title: "Archipelago sail", detail: "A full day on a dhow out to Manda Toto reef, with lunch grilled aboard." },
      { day: "05–06", title: "Watamu", detail: "Marine park snorkelling, the Gede Ruins, and a turtle release at dawn." },
      { day: "07–08", title: "Diani", detail: "Dolphin dhow to Kisite-Mpunguti, then a seafood afternoon on Wasini Island." },
      { day: "09", title: "Depart", detail: "Fly from Ukunda to Nairobi or out via Mombasa." },
    ],
  },
  {
    slug: "rift-valley-circuit",
    code: "FT-05",
    title: "Rift Valley Circuit",
    style: "Adventure",
    days: 4,
    price: 1290,
    intensity: 3,
    groupSize: "2–12 guests",
    route: ["nairobi", "naivasha-hells-gate", "lake-nakuru"],
    photo: "hellsGate",
    pitch:
      "A short trip that's active the whole way. You cycle among zebra, walk down a volcanic gorge, take a boat out to the hippos, and finish with rhino at Nakuru. It works well for a long weekend.",
    includes: ["Mountain bikes", "Gorge guide", "Lake boat safari", "Park fees"],
    itinerary: [
      { day: "01", title: "Escarpment drop", detail: "Viewpoint stop over the Rift, then an afternoon hippo boat on Lake Naivasha." },
      { day: "02", title: "Hell's Gate", detail: "Cycle past Fischer's Tower and walk down through the Ol Njorowa gorge." },
      { day: "03", title: "Lake Nakuru", detail: "A full day in the park: rhino, flamingos and the Baboon Cliff view." },
      { day: "04", title: "Return", detail: "Morning drive, then back in Nairobi by lunchtime." },
    ],
  },
  {
    slug: "zero-latitude-traverse",
    code: "FT-00",
    title: "Zero Latitude Traverse",
    style: "Signature",
    days: 14,
    price: 7900,
    intensity: 3,
    groupSize: "2–4 guests",
    route: ["nairobi", "samburu", "mount-kenya", "lake-nakuru", "maasai-mara", "diani"],
    photo: "elephantAerial",
    pitch:
      "Our flagship trip covers the whole country in two weeks. You go from the desert north over the equator to the highlands, down through the Rift Valley to the Mara, and finish on the coast, travelling by bush plane, 4×4 and dhow.",
    includes: ["Dedicated guide throughout", "All bush flights", "Balloon flight", "Private conservancies"],
    itinerary: [
      { day: "01–02", title: "Nairobi", detail: "Sheldrick orphans, the Giraffe Centre and a chef's table dinner." },
      { day: "03–05", title: "Samburu", detail: "The Special Five, camel walks and an evening with Samburu warriors." },
      { day: "06–07", title: "Mount Kenya", detail: "Cross the equator, track rhino at Ol Pejeta and hike the forest." },
      { day: "08", title: "Lake Nakuru", detail: "Rhino and flamingos on the Rift floor." },
      { day: "09–11", title: "Maasai Mara", detail: "Conservancy camp, balloon flight and the river crossings in season." },
      { day: "12–14", title: "Diani", detail: "Fly to the coast to finish: reef, dhow and slow days." },
    ],
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}

export const tourStyles: TourStyle[] = ["Safari", "Adventure", "Coast", "Signature"];
