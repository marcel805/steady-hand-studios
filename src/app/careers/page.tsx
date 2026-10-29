import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PortfolioCTA from "@/components/PortfolioCTA";

export const metadata: Metadata = {
  title: "Work with us - Steady Hand Studios",
  description:
    "Steady Hand Studios brings tradespeople onto builds as needed. Send your portfolio and we'll keep it on file.",
};

const STEPS = [
  {
    name: "Send your portfolio",
    detail:
      "Email us a few photos of your work, your trade and where you're based. That's it to start.",
  },
  {
    name: "We review it",
    detail:
      "We look at fit for the kind of builds we run: steel, wood, spray, rigging, driving. No reply yet doesn't mean no; we keep portfolios on file.",
  },
  {
    name: "We get in touch",
    detail:
      "When a build comes up that suits your trade and your dates, we call you.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        label="Work with us"
        title={
          <>
            Send your portfolio.
            <br />
            <span className="text-orange">We&rsquo;ll take it from there.</span>
          </>
        }
      >
        <p>
          Steady Hand Studios brings welders, sprayers, riggers, drivers and
          CNC operators onto builds as we need them. Send us your work and
          we&rsquo;ll keep it on file.
        </p>
        <div className="mt-8">
          <PortfolioCTA />
        </div>
      </PageHeader>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
          <h2 className="disp mb-10 text-6xl sm:text-7xl">How it works</h2>
          <div className="grid border-t-[3px] border-ink md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div
                key={s.name}
                className="border-b border-ink/25 py-7 md:border-b-0 md:border-r md:pr-8 md:last:border-r-0 md:[&:not(:first-child)]:pl-8"
              >
                <span className="roundel mb-5">{i + 1}</span>
                <h3 className="disp text-4xl">{s.name}</h3>
                <p className="mt-3 max-w-[34ch] text-ink-soft">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
