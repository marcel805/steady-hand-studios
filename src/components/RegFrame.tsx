import { ReactNode } from "react";

/**
 * Wraps media in the studio's registration-mark corners - the alignment
 * ticks used to register material before a cut. `color` sets the mark
 * color (usually gold-pale on dark image backgrounds, ink on paper).
 */
export default function RegFrame({
  children,
  color = "text-gold-pale",
  className = "",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`reg-marks ${color} ${className}`}>
      <span className="reg-tl" />
      <span className="reg-tr" />
      {children}
    </div>
  );
}
