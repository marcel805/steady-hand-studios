import { ReactNode } from "react";

/**
 * Opening band for interior pages: small label, big capitals, optional
 * intro. Green ground so every page opens the way the homepage does.
 */
export default function PageHeader({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="on-green bg-green text-bone">
      <div className="mx-auto max-w-[1360px] px-6 pb-14 pt-14 sm:px-10 sm:pb-16 sm:pt-20">
        <p className="cap mb-6 text-sm text-cream">{label}</p>
        <h1 className="disp max-w-4xl text-6xl sm:text-7xl lg:text-8xl">
          {title}
        </h1>
        {children && (
          <div className="mt-8 max-w-xl text-lg leading-relaxed text-bone/80">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
