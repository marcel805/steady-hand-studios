import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import RegFrame from "@/components/RegFrame";

export const metadata: Metadata = {
  title: "Services - Steady Hand Studios",
  description:
    "Fabrication services from Steady Hand Studios: brand activations, signage, retail fit-out, props and set builds, designed and built in Johannesburg.",
};

const SERVICES = [
  {
    name: "Brand activations",
    detail:
      "Carts, bars, kiosks and stunt pieces for launches, pop-ups and experiential campaigns. Built to travel, built to survive a weekend of service.",
    spec: "Steel, timber, fibreglass, GRP",
  },
  {
    name: "Signage & lettering",
    detail:
      "Illuminated, fretwork and dimensional lettering - cut, wired and finished in-house, then installed at height or at street level.",
    spec: "Acrylic, LED, aluminium, MDF",
  },
  {
    name: "Retail & event fit-out",
    detail:
      "Counters, shelving, POS fixtures and stand builds made to drawing, with the tolerances a retail environment actually needs.",
    spec: "Joinery, laminate, spray finish",
  },
  {
    name: "Props & set builds",
    detail:
      "One-off pieces for shoots, stages and live events - often on a short brief and a shorter timeline.",
    spec: "Mixed materials, rapid turnaround",
  },
];

const CAPABILITIES = [
  ["Steel fabrication", "MIG/TIG welding, mild steel & aluminium framing"],
  ["Woodwork & CNC", "Panel cutting, joinery, veneer & laminate finishing"],
  ["Spray & finishing", "Automotive-grade spray booth, 2K and powder-style finishes"],
  ["Electrical & lighting", "LED integration, signage wiring, low-voltage install"],
  ["Design & drawing", "Concept sketch through to cut-ready technical drawing"],
  ["Site install", "Load-in, rigging and on-site fit for Johannesburg and beyond"],
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-paper py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-mono-label mb-6 text-xs text-ink-soft">
              Services
            </p>
            <h1 className="max-w-lg font-display text-5xl leading-[0.95] text-ink sm:text-6xl">
              From sketch to cut list to install day.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              We take on the builds that don&rsquo;t fit a supplier
              catalogue - usually because they&rsquo;re one of one. Below is
              what that tends to look like, but if your job doesn&rsquo;t
              fit a category, that&rsquo;s normal too.
            </p>
          </div>
          <RegFrame color="text-ink/40">
            <div className="relative h-72 overflow-hidden bg-ink-2 sm:h-96">
              <Image
                src="/work/bar-cart-concept.jpg"
                alt="A 3D concept render of a navy and brass bar cart, part of the design stage before fabrication"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 flex items-center gap-2 bg-ink/90 px-4 py-2">
                <span className="text-mono-label text-[11px] text-gold-pale">
                  Concept stage - before it hits the shop floor
                </span>
              </div>
            </div>
          </RegFrame>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-paper-2 py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionLabel label="What we build" />
          <div className="grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <div key={s.name} className="bg-paper-2 p-8">
                <h3 className="font-display text-3xl leading-tight text-ink">
                  {s.name}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
                  {s.detail}
                </p>
                <p className="text-mono-label mt-4 text-[11px] text-gold-ink">
                  {s.spec}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-paper py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionLabel label="Shop capability sheet" />
          <div className="overflow-hidden rounded-lg border border-ink/12">
            {CAPABILITIES.map(([name, detail], i) => (
              <div
                key={name}
                className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:gap-6 ${
                  i % 2 === 0 ? "bg-card" : "bg-paper-2"
                }`}
              >
                <span className="text-mono-label w-52 shrink-0 text-xs text-ink">
                  {name}
                </span>
                <span className="text-sm text-ink-soft">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-paper-2">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 sm:px-10 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Got a build that needs a shop like this?
          </h2>
          <Link
            href="/contact"
            className="text-mono-label shrink-0 rounded-full bg-gold-pale px-6 py-3 text-xs text-ink transition-colors hover:bg-paper-2"
          >
            Tell us about it
          </Link>
        </div>
      </section>
    </>
  );
}
