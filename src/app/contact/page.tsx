import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Steady Hand Studios",
  description:
    "Get in touch with Steady Hand Studios, a fabrication workshop in Johannesburg.",
};

export default function ContactPage() {
  return (
    <section className="bg-paper py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="text-mono-label mb-6 text-xs text-ink-soft">
          Get in touch
        </p>
        <h1 className="max-w-xl font-display text-5xl leading-[0.95] text-ink sm:text-6xl">
          Tell us what needs building.
        </h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionLabel label="Workshop" />
            <p className="text-mono-label text-sm leading-relaxed text-ink">
              Johannesburg, South Africa
            </p>
            <a
              href="mailto:info@steadyhandstudios.co.za"
              className="text-mono-label mt-4 block text-sm text-ink hover:text-gold-ink"
            >
              info@steadyhandstudios.co.za
            </a>
            <a
              href="tel:+27664739575"
              className="text-mono-label mt-1 block text-sm text-ink hover:text-gold-ink"
            >
              +27 66 473 9575
            </a>

            <div className="mt-10">
              <SectionLabel label="Looking for work instead?" />
              <p className="text-sm leading-relaxed text-ink-soft">
                Head to{" "}
                <a href="/careers" className="text-ink underline hover:no-underline">
                  Work with us
                </a>{" "}
                to send your portfolio.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-ink/12 bg-card p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
