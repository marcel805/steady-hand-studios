import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Services - Steady Hand Studios",
  description:
    "Fabrication services from Steady Hand Studios: brand activations, signage, retail fit-out, props and set builds, designed and built in Johannesburg.",
};

const SERVICES = [
  {
    name: "Brand activations",
    detail:
      "Carts, bars, kiosks and stunt pieces for launches, pop-ups and experiential campaigns. Built to last, and to need minimal maintenance.",
    spec: "Steel, timber, fibreglass, GRP",
  },
  {
    name: "Signage & lettering",
    detail:
      "Illuminated, fretwork and dimensional lettering, cut, wired and finished in-house, then installed wherever it needs to go.",
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
      "One-off pieces for shoots, stages and live events, often on a short brief and a shorter timeline.",
    spec: "Mixed materials, rapid turnaround",
  },
  {
    name: "Custom home furniture",
    detail:
      "Tables, shelving, cabinetry and other pieces for the home, made to measure and built to last.",
    spec: "Joinery, timber, spray finish",
  },
];

const CAPABILITIES = [
  ["Steel fabrication", "MIG/TIG welding, mild steel & aluminium framing"],
  ["Woodwork & CNC", "Panel cutting, joinery, veneer & laminate finishing"],
  ["Spray & finishing", "In-house spray finishing to your brand colours"],
  ["Electrical & lighting", "LED integration, signage wiring, low-voltage install"],
  ["Design & drawing", "Concept sketch through to cut-ready technical drawing"],
  ["Site install", "Load-in, rigging and on-site fit for Johannesburg and beyond"],
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader label="Services" title="From sketch to cut list to install day.">
        <p>
          We take on the builds that don&rsquo;t fit a supplier catalogue,
          usually because they&rsquo;re one of one. Below is what that tends to
          look like, but if your job doesn&rsquo;t fit a category, that&rsquo;s
          normal too.
        </p>
      </PageHeader>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
          <h2 className="disp mb-10 text-6xl sm:text-7xl">What we build</h2>
          <div className="border-t-[3px] border-ink">
            {SERVICES.map((s, i) => (
              <div
                key={s.name}
                className="grid items-start gap-3 border-b border-ink/25 py-7 md:grid-cols-[auto_1fr_1.2fr_1fr] md:gap-10"
              >
                <span className="roundel">{i + 1}</span>
                <h3 className="disp text-4xl sm:text-5xl">{s.name}</h3>
                <p className="max-w-[46ch] text-ink-soft">{s.detail}</p>
                <p className="cap text-sm text-orange-ink">{s.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-16 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
          <h2 className="disp mb-10 text-6xl sm:text-7xl">Shop capability</h2>
          <dl className="border-t-[3px] border-ink">
            {CAPABILITIES.map(([name, detail]) => (
              <div
                key={name}
                className="grid gap-1 border-b border-ink/25 py-4 sm:grid-cols-[18rem_1fr] sm:gap-8"
              >
                <dt className="cap text-base">{name}</dt>
                <dd className="text-ink-soft">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="on-green bg-green py-16 text-bone">
        <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-6 px-6 sm:px-10 md:flex-row md:items-center">
          <h2 className="disp text-5xl sm:text-6xl">
            Got a build that needs a shop like this?
          </h2>
          <Link
            href="/contact"
            className="cap shrink-0 rounded-[2px] bg-orange px-7 py-3.5 text-[15px] text-white transition-colors hover:bg-orange-ink"
          >
            Tell us about it
          </Link>
        </div>
      </section>
    </>
  );
}
