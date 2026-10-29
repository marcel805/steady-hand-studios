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
    cover: { src: "/work/teremana-post.jpg" },
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
    title: "Astral Tequila\nentrance arch",
    type: "Entrance arch",
    summary:
      "A freestanding arch in powder blue with a brass edge, relief lettering and a cut-out sun, built in sections and edge-lit.",
    materials: "Sprayed board, brass-finish trim, LED edge-lighting",
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
      "A full branded bar with lit shelving and menu boards, a working mini bowling lane, and a reupholstered lounge sofa trimmed in neon: three different builds for the same events.",
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
        caption: "The bowling lane",
        w: 900,
        h: 1600,
      },
      {
        src: "/work/jager-sofa.jpg",
        alt: "A reupholstered Victorian-style loveseat in orange velvet, trimmed with neon-orange LED edge lighting",
        caption: "The sofa",
        w: 960,
        h: 1280,
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
