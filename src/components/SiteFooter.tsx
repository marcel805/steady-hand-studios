import Link from "next/link";
import Image from "next/image";
import Stripe from "@/components/Stripe";

export default function SiteFooter() {
  return (
    <footer className="on-green bg-green-2 text-bone">
      <div className="mx-auto max-w-[1360px] px-6 pb-9 pt-16 sm:px-10">
        <div className="grid items-end gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/patch.png"
              alt="Steady Hand Studios"
              width={1000}
              height={619}
              className="mb-6 h-auto w-44"
            />
            <p className="disp text-5xl text-bone sm:text-6xl lg:text-7xl">
              Got a build
              <br />
              in mind?
            </p>
          </div>

          <ul className="cap text-sm text-bone/85">
            <li>
              <Link href="/work" className="inline-block py-1.5 hover:text-white">
                Work
              </Link>
            </li>
            <li>
              <Link href="/services" className="inline-block py-1.5 hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="inline-block py-1.5 hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="inline-block py-1.5 hover:text-white">
                Contact
              </Link>
            </li>
            <li className="pt-3 text-cream/70">
              <Link href="/careers" className="inline-block py-1.5 hover:text-white">
                Work with us
              </Link>
            </li>
          </ul>

          <div className="text-bone/85">
            <p>
              <a
                href="mailto:info@steadyhandstudios.co.za"
                className="inline-block py-1.5 hover:text-white"
              >
                info@steadyhandstudios.co.za
              </a>
            </p>
            <p>
              <a href="tel:+27664739575" className="inline-block py-1.5 hover:text-white">
                +27 66 473 9575
              </a>
            </p>
            <p>Johannesburg, South Africa</p>
          </div>
        </div>

        <Stripe className="mt-14" />

        <div className="cap mt-5 flex flex-col gap-2 text-xs text-bone/55 sm:flex-row sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Steady Hand Studios</span>
          <span>Fabrication / Johannesburg</span>
        </div>
      </div>
    </footer>
  );
}
