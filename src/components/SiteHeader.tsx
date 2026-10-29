import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="on-green sticky top-0 z-50 bg-green text-cream">
      <div className="mx-auto flex h-[76px] max-w-[1360px] items-center justify-between gap-6 px-6 sm:px-10">
        <Link href="/" className="shrink-0">
          <Image
            src="/brand/logo-reversed.svg"
            alt="Steady Hand Studios"
            width={160}
            height={86}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="cap text-sm text-bone/85 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="cap shrink-0 rounded-[2px] bg-orange px-5 py-2.5 text-sm text-white transition-colors hover:bg-orange-ink"
        >
          Start a build
        </Link>
      </div>

      {/* mobile nav */}
      <nav className="flex items-center gap-6 overflow-x-auto border-t border-cream/15 px-6 py-2.5 md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="cap whitespace-nowrap text-sm text-bone/85"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
