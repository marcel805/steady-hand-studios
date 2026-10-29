"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
  href: string;
  plate: string;
  label: string;
  /** CSS object-position, to keep the subject in frame when cropped. */
  position?: string;
};

const INTERVAL_MS = 5500;

/**
 * Rotating hero picture: cross-fades through a handful of projects, each
 * linking to its plate. The first slide is rendered immediately, so the
 * page is complete before any script runs. Rotation pauses on hover and
 * focus, and doesn't run at all for visitors who prefer reduced motion.
 */
export default function HeroSlides({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || slides.length < 2) return;
    // Visitors who ask for reduced motion get a still picture they can step
    // through with the markers, not an auto-playing slideshow.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL_MS
    );
    return () => window.clearInterval(id);
  }, [paused, slides.length, index]);

  const current = slides[index];

  return (
    <div
      className="flex flex-col bg-green-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* The picture. Nothing is laid over it, so no slide is ever cropped
          by the caption. */}
      <div className="relative min-h-[70vw] flex-1 overflow-hidden lg:min-h-0">
        {slides.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={i === index ? s.alt : ""}
            aria-hidden={i !== index}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 48vw, 100vw"
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ objectPosition: s.position }}
          />
        ))}

        {/* The picture links to whichever plate is showing. */}
        <Link
          href={current.href}
          aria-label={`View ${current.label}`}
          className="absolute inset-0 z-10"
        />
      </div>

      {/* One bar under the picture: caption on the left, markers on the right. */}
      <div className="flex items-center justify-between gap-4 bg-bone px-5 py-3">
        <p className="cap flex min-w-0 items-center gap-4 text-sm">
          <span className="num shrink-0 text-orange-ink">
            Plate {current.plate}
          </span>
          <span className="truncate">{current.label}</span>
        </p>

        {slides.length > 1 && (
          <div className="flex shrink-0 items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.label}`}
                aria-current={i === index}
                className="flex h-5 items-center px-0.5"
              >
                <span
                  className={`block h-1.5 w-3.5 transition-colors ${
                    i === index ? "bg-orange" : "bg-ink/25 hover:bg-ink/50"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
