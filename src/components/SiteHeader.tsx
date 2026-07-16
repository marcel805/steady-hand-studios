import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-ink text-gold-pale">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/brand/logo-reversed.svg"
            alt="Steady Hand Studios"
            width={160}
            height={86}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-mono-label text-xs text-paper-2/80 transition-colors hover:text-gold-pale"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/careers"
          className="text-mono-label shrink-0 rounded-full border border-gold-pale/40 px-4 py-2 text-xs text-gold-pale transition-colors hover:bg-gold-pale hover:text-ink"
        >
          Work with us
        </Link>
      </div>
      {/* mobile nav */}
      <nav className="flex items-center gap-5 overflow-x-auto border-t border-gold-pale/15 px-6 py-2 md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-mono-label whitespace-nowrap text-[11px] text-paper-2/80"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
