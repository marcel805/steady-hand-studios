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
    slug: "jagermeister-orange",
    client: "Jagermeister Orange",
    title: "A full festival bar, a bowling lane, and a neon-lit sofa",
    category: "Brand activation",
    location: "Festivals & events, South Africa",
    description:
      "The build for Jagermeister Orange's launch tour - a full branded bar with lit shelving and menu boards, a working mini bowling lane with custom pins and ball, and a reupholstered lounge sofa trimmed in neon. One client, three completely different builds running at the same events.",
    images: [
      {
        src: "/work/jager-bar.jpg",
        alt: "A full-length branded bar for Jagermeister Orange at an outdoor festival, staffed and serving a queue of customers",
      },
      {
        src: "/work/jager-bowling.jpg",
        alt: "A custom Jagermeister Orange mini bowling lane set up outdoors at a festival, with branded pins and ball",
      },
      {
        src: "/work/jager-sofa.jpg",
        alt: "A reupholstered Victorian-style loveseat in orange velvet, trimmed with neon-orange LED edge lighting",
      },
    ],
  },
  {
    slug: "ice-tropez",
    client: "Ice Tropez",
    title: "From a single beach cart to a full event environment",
    category: "Brand activation",
    location: "South Africa, multiple venues",
    description:
      "Started as one coral-pink service cart for beachside pours. Grew into a full immersive entrance build - a sculptural glowing tunnel, produce displays and lounge furniture - for the brand's anniversary event.",
    images: [
      {
        src: "/work/ice-tropez-tunnel.jpg",
        alt: "A large sculptural glowing tunnel entrance branded Ice Tropez, with produce displays and straw umbrellas at an indoor event",
      },
      {
        src: "/work/ice-tropez-cart.jpg",
        alt: "The original Ice Tropez cart on a beach under a palm tree, coral pink with a neon-lit sign",
      },
    ],
  },
  {
    slug: "teremana",
    client: "Teremana",
    title: "A fluted bar counter, from the shop floor to fully lit",
    category: "Retail fit-out & signage",
    location: "Johannesburg",
    description:
      "A rounded, fluted counter with the Teremana wordmark backlit straight through the panel - shown here getting its finishing touches in the shop, then fully lit and ready to ship.",
    images: [
      {
        src: "/work/teremana-workshop-finished.jpg",
        alt: "The fluted, backlit Teremana counter getting finishing touches from the crew in the workshop",
      },
      {
        src: "/work/teremana-glow.jpg",
        alt: "The finished Teremana counter fully lit in a dark workshop, backlit lettering glowing",
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
        src: "/work/led-shelving-glow.jpg",
        alt: "A finished steel display shelving frame lit end to end with red LED edge lighting in a dark workshop",
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
