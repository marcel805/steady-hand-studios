import { ReactNode } from "react";

/**
 * Opening band for interior pages: small label, big capitals, optional
 * intro. Green ground so every page opens the way the homepage does.
 */
export default function PageHeader({
  label,
  title,
  children,
  compact = false,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
  /** Tighter band for pages where the content below is the point. */
  compact?: boolean;
}) {
  return (
    <section className="on-green bg-green text-bone">
      <div
        className={
          compact
            ? "mx-auto max-w-[1360px] px-6 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10"
            : "mx-auto max-w-[1360px] px-6 pb-14 pt-14 sm:px-10 sm:pb-16 sm:pt-20"
        }
      >
        <p className={`cap text-sm text-cream ${compact ? "mb-3" : "mb-6"}`}>
          {label}
        </p>
        <h1
          className={`disp max-w-4xl ${
            compact
              ? "text-5xl sm:text-6xl lg:text-7xl"
              : "text-6xl sm:text-7xl lg:text-8xl"
          }`}
        >
          {title}
        </h1>
        {children && (
          <div
            className={`max-w-xl text-lg leading-relaxed text-bone/80 ${
              compact ? "mt-4" : "mt-8"
            }`}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
