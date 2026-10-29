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
        className="cap inline-block rounded-[2px] bg-orange px-7 py-3.5 text-[15px] text-white transition-colors hover:bg-orange-ink"
      >
        {label}
      </a>
      <p className="mt-3 text-sm text-current opacity-70">
        Opens your email app, addressed to {CONTACT_EMAIL}. Attach a few photos
        or a link to your work.
      </p>
    </div>
  );
}
