/**
 * The rally stripe: three bars (orange / cream / green, or bone on a green
 * ground). The site's one repeated device - use it once per section at most.
 */
export default function Stripe({ className = "" }: { className?: string }) {
  return (
    <div className={`stripe ${className}`} aria-hidden>
      <i />
      <i />
      <i />
    </div>
  );
}
