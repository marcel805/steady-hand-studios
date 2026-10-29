import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Steady Hand Studios",
  description:
    "Get in touch with Steady Hand Studios, a fabrication workshop in Johannesburg.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader label="Get in touch" title="Tell us what needs building." />

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1360px] gap-14 px-6 sm:px-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="cap mb-4 text-sm text-orange-ink">Workshop</p>
            <p className="text-xl">Johannesburg, South Africa</p>
            <a
              href="mailto:info@steadyhandstudios.co.za"
              className="mt-4 block text-xl underline underline-offset-4 hover:text-orange-ink"
            >
              info@steadyhandstudios.co.za
            </a>
            <a
              href="tel:+27664739575"
              className="mt-1 block text-xl underline underline-offset-4 hover:text-orange-ink"
            >
              +27 66 473 9575
            </a>

            <div className="mt-12 border-t-[3px] border-ink pt-5">
              <p className="cap mb-3 text-sm text-orange-ink">
                Looking for work instead?
              </p>
              <p className="text-ink-soft">
                Head to{" "}
                <a
                  href="/careers"
                  className="text-ink underline underline-offset-4 hover:text-orange-ink"
                >
                  Work with us
                </a>{" "}
                to send your portfolio.
              </p>
            </div>
          </div>

          <div className="border-t-[3px] border-ink bg-card p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
