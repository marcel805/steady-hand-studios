import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="bg-ink-2 text-paper-2">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src="/brand/logo-reversed.svg"
              alt="Steady Hand Studios"
              width={160}
              height={86}
              className="mb-5 h-11 w-auto"
            />
            <p className="max-w-sm text-sm leading-relaxed text-paper-2/70">
              A fabrication studio in Johannesburg. We build the physical
              things brands need - activations, signage, props and
              installs - from first sketch to on-site handover.
            </p>
          </div>

          <div>
            <p className="text-mono-label mb-4 text-xs text-gold-pale/80">
              Studio
            </p>
            <ul className="space-y-2 text-sm text-paper-2/80">
              <li>
                <Link href="/about" className="hover:text-gold-pale">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold-pale">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-gold-pale">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-pale">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-mono-label mb-4 text-xs text-gold-pale/80">
              For contractors
            </p>
            <ul className="space-y-2 text-sm text-paper-2/80">
              <li>
                <Link href="/careers" className="hover:text-gold-pale">
                  Work with us
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-gold-pale">
                  Portal login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper-2/10 pt-6 text-xs text-paper-2/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-mono-label">
            Steady Hand Studios · Johannesburg, South Africa
          </p>
          <p className="text-mono-label">
            © {new Date().getFullYear()} Steady Hand Studios
          </p>
        </div>
      </div>
    </footer>
  );
}
