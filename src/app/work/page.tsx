import Image from "next/image";
import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import RegFrame from "@/components/RegFrame";
import { CASE_STUDIES } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work - Steady Hand Studios",
  description:
    "Case studies from the Steady Hand Studios workshop: Jagermeister Orange, Ice Tropez, Teremana and other builds, from concept to on-site install.",
};

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-paper py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <p className="text-mono-label mb-6 text-xs text-ink-soft">
            Selected work
          </p>
          <h1 className="max-w-2xl font-display text-5xl leading-[0.95] text-ink sm:text-6xl">
            Real builds, still bearing the sawdust.
          </h1>
        </div>
      </section>

      {CASE_STUDIES.map((cs, i) => (
        <section
          key={cs.slug}
          className={`border-b border-ink/10 py-16 ${
            i % 2 === 0 ? "bg-paper-2" : "bg-paper"
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <SectionLabel label={cs.category} />
            <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
              <div>
                <p className="text-mono-label text-xs text-gold-ink">
                  {cs.client} - {cs.location}
                </p>
                <h2 className="mt-3 font-display text-4xl leading-tight text-ink">
                  {cs.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
                  {cs.description}
                </p>
              </div>
              <div
                className={`grid gap-4 ${
                  cs.images.length > 1 ? "sm:grid-cols-2" : ""
                }`}
              >
                {cs.images.map((img) => (
                  <RegFrame key={img.src} color="text-ink/40">
                    <div className="relative h-72 overflow-hidden bg-ink-2 sm:h-96">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </RegFrame>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
