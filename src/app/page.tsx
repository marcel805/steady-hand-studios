import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import RegFrame from "@/components/RegFrame";
import PortfolioCTA from "@/components/PortfolioCTA";

const SERVICES = [
  {
    name: "Brand activations",
    detail: "Carts, bars, kiosks and stunt builds for launches and pop-ups.",
  },
  {
    name: "Signage & lettering",
    detail: "Illuminated, fretwork and dimensional signage, made and installed.",
  },
  {
    name: "Retail & event fit-out",
    detail: "Counters, shelving and fixtures, built to drawing and deadline.",
  },
  {
    name: "Props & set builds",
    detail: "One-off pieces for shoots, stages and experiential work.",
  },
];

const PROCESS = [
  {
    step: "01",
    name: "Brief",
    detail: "We take your drawing, reference or half-formed idea and scope what it takes to build it.",
  },
  {
    step: "02",
    name: "Fabricate",
    detail: "Cut, welded, sprayed and assembled in our Johannesburg workshop - crew sized to the job.",
  },
  {
    step: "03",
    name: "Install",
    detail: "Delivered and fitted on site, on the date it needs to exist.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO - a work-order header, not a headline-on-gradient */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-10 pb-16 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-14">
          <div className="flex flex-col justify-center">
            <p className="text-mono-label mb-6 text-xs text-ink-soft">
              Job No. SHS-2026 - Johannesburg, ZA
            </p>
            <h1 className="font-display text-5xl leading-[0.92] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              We build the
              <br />
              things brands
              <br />
              can&rsquo;t buy off
              <br />
              a shelf.
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ink-soft">
              Steady Hand Studios is a fabrication workshop in Johannesburg.
              Carts, counters, signage, props - if it has to be built once,
              built right, and built on time, it comes through our shop.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/work"
                className="text-mono-label rounded-full bg-ink px-6 py-3 text-xs text-paper-2 transition-colors hover:bg-ink-soft"
              >
                See the work
              </Link>
              <Link
                href="/careers"
                className="text-mono-label rounded-full border border-ink/30 px-6 py-3 text-xs text-ink transition-colors hover:border-ink"
              >
                Work with us
              </Link>
            </div>
          </div>

          <RegFrame color="text-ink/50" className="self-stretch">
            <div className="relative h-full min-h-[320px] overflow-hidden bg-ink-2 lg:min-h-[520px]">
              <Image
                src="/work/ice-tropez-cart.jpg"
                alt="A coral-pink branded beverage cart built by Steady Hand Studios for Ice Tropez, on a beach"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 flex items-center gap-2 bg-ink/90 px-4 py-2">
                <span className="text-mono-label text-[11px] text-gold-pale">
                  Ice Tropez - beach service cart
                </span>
              </div>
            </div>
          </RegFrame>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-b border-ink/10 bg-paper-2 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionLabel label="What we build" />
          <div className="grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.name} className="bg-paper-2 p-7">
                <h3 className="font-display text-2xl leading-tight text-ink">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - a real sequence, so numbering earns its place */}
      <section className="border-b border-ink/10 bg-paper py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionLabel label="How a job moves through the shop" />
          <div className="grid gap-10 lg:grid-cols-3">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="relative">
                <span className="text-mono-label text-xs text-gold-ink">
                  {p.step}
                </span>
                <h3 className="mt-3 font-display text-3xl text-ink">
                  {p.name}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
                  {p.detail}
                </p>
                {i < PROCESS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute right-[-1.25rem] top-1 hidden text-ink/25 lg:block"
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="border-b border-ink/10 bg-ink py-20 text-paper-2">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionLabel label="From the workshop floor" tone="paper" />
          <div className="grid gap-8 sm:grid-cols-2">
            <RegFrame color="text-gold-pale/60">
              <div className="relative h-72 overflow-hidden bg-ink-2 sm:h-96">
                <Image
                  src="/work/teremana-counter-wip.jpg"
                  alt="A fluted MDF bar counter with the Teremana logo cut into it, mid-build in the SHS workshop"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-mono-label mt-3 text-[11px] text-paper-2/60">
                Teremana - fluted counter, in the shop
              </p>
            </RegFrame>
            <RegFrame color="text-gold-pale/60">
              <div className="relative h-72 overflow-hidden bg-ink-2 sm:h-96">
                <Image
                  src="/work/teremana-sign.jpg"
                  alt="An illuminated Teremana sign, backlit, installed on site"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-mono-label mt-3 text-[11px] text-paper-2/60">
                Teremana - illuminated signage, on site
              </p>
            </RegFrame>
          </div>
          <div className="mt-10">
            <Link
              href="/work"
              className="text-mono-label border-b border-gold-pale/40 pb-1 text-xs text-gold-pale hover:border-gold-pale"
            >
              See the full body of work →
            </Link>
          </div>
        </div>
      </section>

      {/* WORK WITH US - no job specifics here, this is a public page */}
      <section className="bg-paper py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionLabel label="Work with us" />
              <h2 className="font-display text-4xl leading-[0.95] text-ink sm:text-5xl">
                Every build needs
                <br />
                hands. Send us yours.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
                Welders, sprayers, riggers, drivers, CNC operators - we bring
                tradespeople onto builds as we need them. Send your
                portfolio and, if it&rsquo;s a fit, we&rsquo;ll set you up
                with a login to our contractor portal.
              </p>
              <Link
                href="/careers"
                className="text-mono-label mt-7 inline-block border-b border-ink/30 pb-1 text-xs text-ink hover:border-ink"
              >
                See how it works →
              </Link>
            </div>
            <PortfolioCTA />
          </div>
        </div>
      </section>
    </>
  );
}
