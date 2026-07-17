"use client";

const CONTACT_EMAIL = "info@steadyhandstudios.co.za";

const SUBJECT = "Portfolio submission - [your trade]";
const BODY = `Trade:
Based in:
Portfolio / photos:

Anything else we should know:
`;

export default function PortfolioCTA({
  label = "Email us your portfolio",
}: {
  label?: string;
}) {
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    SUBJECT
  )}&body=${encodeURIComponent(BODY)}`;

  return (
    <div>
      <a
        href={mailtoHref}
        className="text-mono-label inline-block rounded-full bg-stamp px-6 py-3 text-xs text-paper-2 transition-colors hover:bg-stamp-ink"
      >
        {label}
      </a>
      <p className="text-mono-label mt-3 text-[11px] text-ink-soft">
        Opens your email app, addressed to {CONTACT_EMAIL} - attach a few
        photos or a link to your work.
      </p>
    </div>
  );
}
