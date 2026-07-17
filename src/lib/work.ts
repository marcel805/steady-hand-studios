export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: string;
  location: string;
  description: string;
  images: { src: string; alt: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ice-tropez",
    client: "Ice Tropez",
    title: "A beach service cart built to run all season",
    category: "Brand activation",
    location: "Cape Town coastline",
    description:
      "A coral-pink service cart for beachside pours - wheeled, weatherproofed and finished to match the brand's palette exactly. Built for a season of sand, salt air and daily moves across the beach.",
    images: [
      {
        src: "/work/ice-tropez-cart.jpg",
        alt: "The finished Ice Tropez cart on a beach under a palm tree, coral pink with a neon-lit sign",
      },
    ],
  },
  {
    slug: "teremana",
    client: "Teremana",
    title: "A fluted bar counter, from cut sheet to backlit install",
    category: "Retail fit-out & signage",
    location: "Johannesburg",
    description:
      "A rounded, fluted MDF bar counter with the Teremana wordmark cut straight through the panel and backlit - shown here mid-build in the shop, then finished and glowing on site.",
    images: [
      {
        src: "/work/teremana-counter-wip.jpg",
        alt: "The fluted Teremana counter mid-build in the workshop, unfinished MDF with the logo fretwork cut through",
      },
      {
        src: "/work/teremana-sign.jpg",
        alt: "The finished, illuminated Teremana sign installed on site",
      },
    ],
  },
  {
    slug: "display-system",
    client: "Retail display system",
    title: "Modular steel shelving with integrated edge lighting",
    category: "Retail fit-out",
    location: "Johannesburg workshop",
    description:
      "A run of welded steel display frames with red LED edge lighting and mesh backing, built and wired in-house ahead of a multi-unit rollout.",
    images: [
      {
        src: "/work/led-shelving-crew.jpg",
        alt: "A steel display shelving frame with red LED edge lighting, under construction in the workshop",
      },
    ],
  },
  {
    slug: "bar-cart-concept",
    client: "Concept development",
    title: "Design-stage 3D modelling before a single cut is made",
    category: "Design & concept",
    location: "Studio",
    description:
      "Every build starts as a model, not a guess - dimensions, materials and hardware signed off in 3D before the CNC ever runs. This navy-and-brass bar cart is one of ours, still on the drawing board.",
    images: [
      {
        src: "/work/bar-cart-concept.jpg",
        alt: "A 3D concept render of a navy and brass bar cart with a light timber top",
      },
    ],
  },
];
