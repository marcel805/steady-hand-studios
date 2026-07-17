import Link from "next/link";
import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import PortfolioCTA from "@/components/PortfolioCTA";

export const metadata: Metadata = {
  title: "Work with us - Steady Hand Studios",
  description:
    "Steady Hand Studios brings tradespeople onto builds job by job. Send your portfolio to get vetted and set up with a portal login.",
};

const STEPS = [
  {
    step: "01",
    name: "Send your portfolio",
    detail:
      "Email us a few photos of your work, your trade and where you're based. That's it to start.",
  },
  {
    step: "02",
    name: "We review it",
    detail:
      "We look at fit for the kind of builds we run - steel, wood, spray, rigging, driving. No reply yet doesn't mean no; we keep portfolios on file.",
  },
  {
    step: "03",
    name: "We set you up with a login",
    detail:
      "If it's a fit, we create your portal login ourselves and send it to you directly. There's no public sign-up.",
  },
  {
    step: "04",
    name: "You see the jobs and nominate yourself",
    detail:
      "Once you're in, the portal shows what's running. Put your name on the tickets that suit you and your dates.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-paper py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <p className="text-mono-label mb-6 text-xs text-ink-soft">
            Work with us
          </p>
          <h1 className="max-w-2xl font-display text-5xl leading-[0.95] text-ink sm:text-6xl">
            Send your portfolio.
            <br />
            We&rsquo;ll take it from there.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
            Steady Hand Studios brings welders, sprayers, riggers, drivers
            and CNC operators onto builds as we need them. We don&rsquo;t
            run an open jobs board - every tradesperson who gets access to
            our portal is vetted first.
          </p>
          <div className="mt-8">
            <PortfolioCTA />
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-ink py-16 text-paper-2">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <SectionLabel label="How it works" tone="paper" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.step}>
                <span className="text-mono-label text-xs text-gold-pale">
                  {s.step}
                </span>
                <h3 className="mt-3 font-display text-2xl leading-tight">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-2/70">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <p className="text-sm text-ink-soft">
            Already got a login?{" "}
            <Link href="/portal" className="text-ink underline hover:no-underline">
              Go to the portal
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
