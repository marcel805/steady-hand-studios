import Link from "next/link";
import Stripe from "@/components/Stripe";
import HeroSlides, { HeroSlide } from "@/components/HeroSlides";
import ProjectIndex from "@/components/ProjectIndex";
import { PROJECTS, getProject, plateNumber } from "@/lib/work";

const RULES = [
  {
    name: "Brief",
    detail:
      "We take your drawing, reference or idea and scope what it takes to build it.",
  },
  {
    name: "Fabricate",
    detail:
      "Cut, welded, sprayed and assembled in our Johannesburg workshop, with a crew sized to the job.",
  },
  {
    name: "Install",
    detail: "Delivered and fitted on site, on the date it needs to exist.",
  },
];

// Pictures the homepage rotates through: [project slug, image index, crop].
const HERO_PICKS: [string, number, string?][] = [
  ["astral-tequila", 0],
  ["banana-beach-red-bull", 0, "center 55%"],
  ["teremana", 2],
  ["luxurious-marble-circus", 1],
  ["zyn", 0],
  ["jagermeister-orange", 4],
  ["fyz", 0],
  ["ice-tropez", 0, "78% center"],
];

const HERO_SLIDES: HeroSlide[] = HERO_PICKS.map(([slug, n, position]) => {
  const p = getProject(slug)!;
  const img = p.images[n];
  return {
    src: img.src,
    alt: img.alt,
    href: `/work/${p.slug}`,
    plate: plateNumber(p.slug),
    label: `${p.client} / ${p.type}`,
    position,
  };
});

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="grid lg:min-h-[clamp(640px,calc(100vh-76px),820px)] lg:grid-cols-[1.05fr_1fr]">
        <div className="on-green flex flex-col justify-between gap-12 bg-green px-6 py-14 text-bone sm:px-10 lg:py-16 lg:pl-[max(2.5rem,calc((100vw-1360px)/2+2.5rem))] lg:pr-14">
          <div className="flex items-center gap-4">
            <span className="roundel">01</span>
            <span className="cap text-sm text-cream">
              Fabrication / Johannesburg
            </span>
          </div>

          <div>
            <h1 className="disp text-[clamp(4.25rem,9vw,9.5rem)] text-bone">
              Built once.
              <br />
              <span className="text-orange">Built right.</span>
            </h1>
            <p className="mt-7 max-w-[34ch] text-xl leading-snug text-bone/80">
              Counters, arches, signage and stands for brands that can&rsquo;t
              buy them off a shelf, and custom furniture for the home. Drawn,
              cut, finished and installed in one workshop.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/work"
                className="cap rounded-[2px] bg-orange px-6 py-3.5 text-[15px] text-white transition-colors hover:bg-orange-ink"
              >
                See the work
              </Link>
              <Link
                href="/services"
                className="cap rounded-[2px] border-[1.5px] border-cream px-6 py-3 text-[15px] text-cream transition-colors hover:bg-cream hover:text-green"
              >
                Our method
              </Link>
            </div>
          </div>

          <Stripe />
        </div>

        <HeroSlides slides={HERO_SLIDES} />
      </section>

      {/* INDEX OF WORK */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="disp text-6xl sm:text-7xl lg:text-8xl">
              Index of work
            </h2>
            <Link
              href="/work"
              className="cap border-b-2 border-orange pb-1 text-sm hover:text-orange-ink"
            >
              {`All ${PROJECTS.length} plates`} &rarr;
            </Link>
          </div>
          <ProjectIndex projects={PROJECTS.slice(0, 6)} />
        </div>
      </section>

      {/* METHOD */}
      <section className="bg-paper-2 py-20 lg:py-28">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
          <h2 className="disp mb-10 text-6xl sm:text-7xl">Three rules</h2>
          <div className="grid border-t-[3px] border-ink md:grid-cols-3">
            {RULES.map((r, i) => (
              <div
                key={r.name}
                className="border-b border-ink/25 py-7 md:border-b-0 md:border-r md:pr-8 md:last:border-r-0 md:[&:not(:first-child)]:pl-8"
              >
                <span className="roundel mb-5">{i + 1}</span>
                <h3 className="disp text-5xl">{r.name}</h3>
                <p className="mt-3 max-w-[32ch] text-ink-soft">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTRACTORS - kept deliberately small; this site is for clients */}
      <section className="border-t border-ink/20 py-10">
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-4 px-6 sm:px-10">
          <p className="max-w-xl text-ink-soft">
            Welders, sprayers, riggers, drivers and CNC operators: we bring
            tradespeople onto builds as we need them.
          </p>
          <Link
            href="/careers"
            className="cap border-b-2 border-orange pb-1 text-sm hover:text-orange-ink"
          >
            Work with us &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
