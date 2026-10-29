export type WorkImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Pixel size of the source file, so photos render at their true ratio. */
  w: number;
  h: number;
};

export type Project = {
  slug: string;
  client: string;
  /** Plate heading. Use \n for a line break. */
  title: string;
  type: string;
  summary: string;
  /** Read off the photos - confirm before relying on these. */
  materials?: string;
  /** Spec rows only show when filled in: size, buildTime, install, year. */
  size?: string;
  buildTime?: string;
  install?: string;
  year?: string;
  /** Thumbnail used in the index. */
  cover: { src: string; position?: string };
  images: WorkImage[];
};

export const PROJECTS: Project[] = [
  {
    slug: "teremana",
    client: "Teremana",
    title: "Teremana\nbar counter",
    type: "Bar counter",
    summary:
      "A rounded counter in vertical slats, with the lettering cut straight through the face. Built and finished in the workshop, then edge-lit.",
    materials: "MDF slats, solid-surface top, LED edge-lighting",
    cover: { src: "/work/teremana-on-site.jpg" },
    images: [
      {
        src: "/work/teremana-during.jpg",
        alt: "The slatted Teremana counter in raw MDF in the workshop, with the lettering cut through the slats",
        caption: "In the workshop, before finishing",
        w: 1800,
        h: 1350,
      },
      {
        src: "/work/teremana-post.jpg",
        alt: "The finished Teremana counter, sprayed navy with an illuminated logo and a lit white top, with the crew checking the fit",
        caption: "Finished, sprayed and lit",
        w: 1800,
        h: 1350,
      },
      {
        src: "/work/teremana-on-site.jpg",
        alt: "The finished blue fluted Teremana bar counter on paving outside, with a white top and illuminated lettering",
        caption: "On site",
        w: 1800,
        h: 1350,
      },
      {
        src: "/work/teremana-detail.jpg",
        alt: "Close-up of the lit Teremana lettering and diamond emblem on the fluted counter",
        caption: "The lettering, lit",
        w: 1800,
        h: 1350,
      },
      {
        src: "/work/teremana-icewell.jpg",
        alt: "Detail of the Teremana counter top with a recessed stainless well set into the white solid-surface",
        caption: "A stainless well set into the top",
        w: 1800,
        h: 1350,
      },
      {
        src: "/work/teremana-glow.jpg",
        alt: "The finished Teremana counter fully lit in a dark workshop, with the backlit lettering glowing",
        caption: "Lit, in the dark",
        w: 1280,
        h: 960,
      },
    ],
  },
  {
    slug: "zyn",
    client: "ZYN",
    title: "ZYN\nDJ booth",
    type: "DJ booth",
    summary:
      "A DJ booth built from sliced birch-ply ribs that flow into one another, lit from beneath and set against a slatted feature wall.",
    materials: "Birch plywood, slatted timber, LED",
    cover: { src: "/work/zyn-during.jpg" },
    images: [
      {
        src: "/work/zyn-during.jpg",
        alt: "The ZYN DJ booth in the workshop, a wave of sliced birch-ply ribs on a base board before it is lit",
        caption: "In the workshop",
        w: 1800,
        h: 1350,
      },
      {
        src: "/work/zyn-booth.jpg",
        alt: "The finished ZYN DJ booth in a venue, ribbed plywood with a lit ZYN logo, blue underglow, and a slatted wall with a screen behind it",
        caption: "On site",
        w: 1350,
        h: 1800,
      },
    ],
  },
  {
    slug: "astral-tequila",
    client: "Astral Tequila",
    title: "Astral Tequila\narch and bars",
    type: "Arch, bars and back unit",
    summary:
      "A freestanding arch in powder blue with a brass edge, relief lettering and a cut-out sun, built in sections and edge-lit. Alongside it, a blue bar counter patterned with constellations and a timber bar with a shelved back unit.",
    materials: "Sprayed board, timber, brass-finish trim, LED edge-lighting",
    cover: { src: "/work/astral-lit.jpg" },
    images: [
      {
        src: "/work/astral-lit.jpg",
        alt: "The Astral Tequila arch edge-lit with warm LED in the workshop",
        caption: "Lit",
        w: 1350,
        h: 1800,
      },
      {
        src: "/work/astral-day.jpg",
        alt: "The Astral Tequila arch in powder blue with a brass edge, relief lettering and a cut-out sun, in the workshop",
        caption: "Finished, in the workshop",
        w: 1800,
        h: 1350,
      },
      {
        src: "/work/astral-bar-blue.jpg",
        alt: "A blue Astral Tequila bar counter with a constellation pattern and an arched cut-out, in the workshop",
        caption: "The blue bar counter",
        w: 1800,
        h: 1350,
      },
      {
        src: "/work/astral-bar-timber.jpg",
        alt: "A timber-clad Astral Tequila bar with the logo on the front and a white top, in the workshop",
        caption: "The timber bar",
        w: 1350,
        h: 1800,
      },
      {
        src: "/work/astral-bar-shelf.jpg",
        alt: "The timber Astral Tequila bar with a back unit of black-framed shelves, seen from the side, in the workshop",
        caption: "Bar and back unit",
        w: 1350,
        h: 1800,
      },
    ],
  },
  {
    slug: "banana-beach-red-bull",
    client: "Banana Beach × Red Bull",
    title: "Banana Beach\n× Red Bull bar",
    type: "Bar and back wall",
    summary:
      "A slatted timber back wall and service counter with warm edge-lighting, carrying an illuminated Banana Beach roundel and Red Bull sign.",
    materials: "Slatted timber, LED edge-lighting, illuminated signage",
    cover: { src: "/work/banana-beach.jpg", position: "center 55%" },
    images: [
      {
        src: "/work/banana-beach.jpg",
        alt: "A slatted timber bar and back wall edge-lit in warm LED, with an orange Banana Beach roundel and a lit Red Bull sign",
        w: 1012,
        h: 1800,
      },
    ],
  },
  {
    slug: "luxurious-marble-circus",
    client: "The Luxurious Marble Circus",
    title: "Luxurious\nMarble Circus bar",
    type: "Festival bar and signage",
    summary:
      "A long festival bar under a timber-and-clear canopy: marble-laminate arches, cut zebra-pattern panels, and a backlit CNC-cut roundel sign.",
    materials: "Marble laminate, sprayed and cut panels, timber, backlit CNC signage",
    cover: { src: "/work/circus-night.jpg" },
    images: [
      {
        src: "/work/circus-night.jpg",
        alt: "The Luxurious Marble Circus bar at night, lit beneath a timber and clear canopy",
        caption: "At night",
        w: 1800,
        h: 1350,
      },
      {
        src: "/work/circus-sign.jpg",
        alt: "The backlit, CNC-cut Luxurious Marble Circus roundel sign, glowing in the workshop",
        caption: "The sign, in the workshop",
        w: 1350,
        h: 1800,
      },
      {
        src: "/work/circus-workshop.jpg",
        alt: "A finished bar panel in the workshop: deep green fluted base, marble laminate top and an arched niche with a brass trim",
        caption: "Bar panel, in the workshop",
        w: 1350,
        h: 1800,
      },
      {
        src: "/work/circus-day.jpg",
        alt: "The Luxurious Marble Circus bar being installed on site in daylight",
        caption: "On site, during install",
        w: 1800,
        h: 1350,
      },
    ],
  },
  {
    slug: "ice-tropez",
    client: "Ice Tropez",
    title: "Ice Tropez\nevent environment",
    type: "Event environment",
    summary:
      "Started as one coral-pink service cart for beachside pours and grew into a full immersive entrance: a glowing sculptural tunnel, produce displays and lounge furniture.",
    cover: { src: "/work/icetropez.jpg" },
    images: [
      {
        src: "/work/icetropez.jpg",
        alt: "The Ice Tropez event space in a large hall, with a glowing orange tunnel entrance, a picket fence and produce displays",
        caption: "The full environment",
        w: 1800,
        h: 1350,
      },
      {
        src: "/work/ice-tropez-tunnel.jpg",
        alt: "A large sculptural glowing tunnel entrance branded Ice Tropez, with produce displays and straw umbrellas",
        caption: "The tunnel",
        w: 960,
        h: 1280,
      },
      {
        src: "/work/ice-tropez-cart.jpg",
        alt: "The original Ice Tropez cart on a beach under a palm tree, coral pink with a neon-lit sign",
        caption: "Where it started: the cart",
        w: 960,
        h: 1280,
      },
      {
        src: "/work/ice-tropez-counter.jpg",
        alt: "A minimal coral Ice Tropez counter with a debossed logo plaque on a white-tiled event floor",
        caption: "The counter",
        w: 960,
        h: 1280,
      },
      {
        src: "/work/icetropez-cart-stage.jpg",
        alt: "The Ice Tropez cart on a lit stage in a hall, with a picket fence and a glowing screen behind it",
        caption: "The cart, indoors",
        w: 1800,
        h: 1350,
      },
      {
        src: "/work/icetropez-hall-wide.jpg",
        alt: "A wide view of the Ice Tropez event space, with the glowing tunnel entrance, picket fence and lounge area",
        caption: "A wider view",
        w: 1800,
        h: 1350,
      },
    ],
  },
  {
    slug: "fyz",
    client: "FYZ",
    title: "FYZ photo booth\nand entrance arch",
    type: "Photo booth and arch",
    summary:
      "A lit photo booth with an open, warm-white interior and a wave-shaped entrance arch, both edged in blue LED.",
    materials: "Printed and sprayed board, LED edge-lighting",
    cover: { src: "/work/fyz-box-lit.jpg" },
    images: [
      {
        src: "/work/fyz-box-lit.jpg",
        alt: "The FYZ photo booth in the workshop, edged in blue LED with a warm white open interior",
        caption: "The booth, in the workshop",
        w: 1350,
        h: 1800,
      },
      {
        src: "/work/fyz-arch.jpg",
        alt: "A wave-shaped blue FYZ entrance arch with neon edging and a blue carpet, flanked by potted palms",
        caption: "The arch, on site",
        w: 1012,
        h: 1800,
      },
      {
        src: "/work/fyz-box.jpg",
        alt: "The FYZ photo booth from the other side, with illustrated artwork and blue LED edging",
        caption: "The booth, other side",
        w: 1350,
        h: 1800,
      },
    ],
  },
  {
    slug: "robertson-winery",
    client: "Robertson Winery",
    title: "Robertson Winery\nphoto frame",
    type: "Photo frame",
    summary:
      "An oversized gradient-orange frame on a rooftop terrace, lettered \"No regular sunset thanks\", so the city does the background.",
    cover: { src: "/work/robertson.jpg" },
    images: [
      {
        src: "/work/robertson.jpg",
        alt: "A large orange photo frame on a rooftop terrace lettered No regular sunset thanks, framing the Johannesburg skyline",
        w: 1800,
        h: 1350,
      },
    ],
  },
  {
    slug: "jagermeister-orange",
    client: "Jägermeister Orange",
    title: "Jägermeister Orange\nlaunch tour",
    type: "Brand activation",
    summary:
      "A full branded bar with lit shelving and menu boards, a working mini bowling lane, and a reupholstered lounge sofa trimmed in neon, plus a photo-op, a table-tennis table and branded stands: a run of different builds for the same events.",
    cover: { src: "/work/jager-bar.jpg" },
    images: [
      {
        src: "/work/jager-bar.jpg",
        alt: "A full-length branded bar for Jägermeister Orange at an outdoor festival, staffed and serving a queue of customers",
        caption: "The bar",
        w: 1600,
        h: 900,
      },
      {
        src: "/work/jager-bowling.jpg",
        alt: "A custom Jägermeister Orange mini bowling lane set up outdoors at a festival, with branded pins and ball",
        caption: "The bowling lane, on site",
        w: 900,
        h: 1600,
      },
      {
        src: "/work/jager-lane-workshop.jpg",
        alt: "The custom orange Jägermeister Orange bowling lane in the workshop, with branded pins, a bottle and an orange ball",
        caption: "The lane, in the workshop",
        w: 960,
        h: 1280,
      },
      {
        src: "/work/jager-sofa-orange.jpg",
        alt: "A reupholstered Victorian-style sofa in orange velvet with a white carved frame, in the workshop",
        caption: "The sofa, in the workshop",
        w: 1350,
        h: 1800,
      },
      {
        src: "/work/jager-photo-op.jpg",
        alt: "A circular Jägermeister Orange photo-op in a venue, an orange ring with greenery behind it and the words I'm in my orange era",
        caption: "The photo-op, on site",
        w: 1012,
        h: 1800,
      },
      {
        src: "/work/jager-table.jpg",
        alt: "A custom orange table-tennis table with a net, set up in a showroom",
        caption: "The table-tennis table",
        w: 1800,
        h: 1350,
      },
      {
        src: "/work/jager-orange-era.jpg",
        alt: "An orange stand topped with a half-orange sign lettered The Orange Era, with a box counter below, in the workshop",
        caption: "The Orange Era stand",
        w: 1350,
        h: 1800,
      },
    ],
  },
  {
    slug: "red-bull-cabinet",
    client: "Red Bull",
    title: "Red Bull\ncabinet",
    type: "Branded cabinet",
    summary:
      "A timber cabinet for a Red Bull mini fridge, with the logo laser-engraved into the wood and a perforated metal side panel.",
    materials: "Timber, laser-engraved logo, perforated metal panel",
    cover: { src: "/work/redbull-cabinet.jpg" },
    images: [
      {
        src: "/work/redbull-cabinet.jpg",
        alt: "A timber cabinet with the Red Bull logo engraved on the front and a perforated metal side panel",
        caption: "The finished cabinet",
        w: 1350,
        h: 1800,
      },
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function plateNumber(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return String(i + 1).padStart(2, "0");
}
