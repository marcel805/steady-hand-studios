import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import RegFrame from "@/components/RegFrame";

export const metadata: Metadata = {
  title: "About - Steady Hand Studios",
  description:
    "Steady Hand Studios is a fabrication workshop in Johannesburg, built around a crew that can turn a brief into a physical build fast.",
};

const VALUES = [
  {
    name: "Built once, built right",
    detail:
      "We don't ship a second draft on install day. Tolerances get checked in the shop, not on site.",
  },
  {
    name: "Crew sized to the job",
    detail:
      "A three-day CNC run and a six-week activation build need different hands. We staff for the job in front of us, not a fixed headcount.",
  },
  {
    name: "One workshop, start to finish",
    detail:
      "Steel, wood, spray, electrical and install sit under one roof in Johannesburg, so a build doesn't lose a week to a handover between suppliers.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-paper py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <p className="text-mono-label mb-6 text-xs text-ink-soft">
            About the studio
          </p>
          <h1 className="max-w-3xl font-display text-5xl leading-[0.95] text-ink sm:text-6xl">
            A workshop, not an agency.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
            Steady Hand Studios started as the people brands call when the
            thing they need doesn&rsquo;t exist yet - no catalogue, no
            supplier, just a reference photo and a deadline. We&rsquo;re
            based in Johannesburg and we build for clients across the
            country.
          </p>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-paper-2 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:items-center">
          <RegFrame color="text-ink/40">
            <div className="relative h-80 overflow-hidden bg-ink-2 sm:h-[420px]">
              <Image
                src="/work/crew-teremana.jpg"
                alt="Three Steady Hand Studios crew members working together on the fluted Teremana counter in the workshop"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </RegFrame>
          <div>
            <SectionLabel label="On the floor" />
            <p className="max-w-md text-base leading-relaxed text-ink-soft">
              Most of what we build starts as a sketch or a mood board and
              ends as something with weight, wiring and a delivery address.
              The people who make that jump - welders, sprayers, joiners,
              riggers - are the studio. Some are on staff; a lot come on for
              a specific build once we&rsquo;ve vetted them.
            </p>
            <Link
              href="/careers"
              className="text-mono-label mt-6 inline-block border-b border-ink/30 pb-1 text-xs text-ink hover:border-ink"
            >
              Want to be one of them? →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionLabel label="How we work" />
          <div className="grid gap-10 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.name}>
                <h3 className="font-display text-2xl leading-tight text-ink">
                  {v.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {v.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
