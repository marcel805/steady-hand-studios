import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

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
      <PageHeader label="About the studio" title="A workshop, not an agency.">
        <p>
          Steady Hand Studios started as the people brands call when the thing
          they need doesn&rsquo;t exist yet: no catalogue, no supplier, just a
          reference photo and a deadline. We&rsquo;re based in Johannesburg and
          we build for clients across the country.
        </p>
      </PageHeader>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1360px] items-center gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16">
          <Image
            src="/work/crew-teremana.jpg"
            alt="Three Steady Hand Studios crew members working together on the Teremana counter in the workshop"
            width={1280}
            height={960}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-auto w-full"
          />
          <div>
            <p className="cap mb-4 text-sm text-orange-ink">On the floor</p>
            <p className="max-w-[44ch] text-xl leading-snug">
              Most of what we build starts as a sketch or a mood board and ends
              as something with weight, wiring and a delivery address. The
              people who make that jump (welders, sprayers, joiners, riggers)
              are the studio. Some are on staff; a lot come on for a specific
              build once we&rsquo;ve vetted them.
            </p>
            <Link
              href="/careers"
              className="cap mt-7 inline-block border-b-2 border-orange pb-1 text-sm hover:text-orange-ink"
            >
              Want to be one of them? &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-16 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
          <h2 className="disp mb-10 text-6xl sm:text-7xl">How we work</h2>
          <div className="grid border-t-[3px] border-ink md:grid-cols-3">
            {VALUES.map((v, i) => (
              <div
                key={v.name}
                className="border-b border-ink/25 py-7 md:border-b-0 md:border-r md:pr-8 md:last:border-r-0 md:[&:not(:first-child)]:pl-8"
              >
                <span className="roundel mb-5">{i + 1}</span>
                <h3 className="disp text-4xl">{v.name}</h3>
                <p className="mt-3 max-w-[34ch] text-ink-soft">{v.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
