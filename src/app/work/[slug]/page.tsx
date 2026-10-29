import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Stripe from "@/components/Stripe";
import { PROJECTS, getProject, plateNumber } from "@/lib/work";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.client} - Steady Hand Studios`,
    description: project.summary,
  };
}

export default async function PlatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const [lead, ...rest] = project.images;

  const specs: [string, string | undefined][] = [
    ["Client", project.client],
    ["Type", project.type],
    ["Materials", project.materials],
    ["Overall size", project.size],
    ["Build time", project.buildTime],
    ["Install", project.install],
    ["Year", project.year],
  ];

  return (
    <>
      {/* PLATE */}
      <section className="on-green bg-green text-bone">
        <div className="mx-auto grid max-w-[1360px] items-start gap-12 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <Link
              href="/work"
              className="cap text-sm text-cream hover:text-white"
            >
              &larr; Index of work
            </Link>
            <div className="mt-8 flex items-center gap-4">
              <span className="roundel">{plateNumber(project.slug)}</span>
              <span className="cap text-sm text-cream">Plate</span>
            </div>
            <Stripe className="mt-8 max-w-[120px]" />
            <h1 className="disp mt-8 whitespace-pre-line text-6xl sm:text-7xl lg:text-8xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-[42ch] text-xl leading-snug text-bone/80">
              {project.summary}
            </p>

            <dl className="mt-10 border-b border-cream/30">
              {specs
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[36%_1fr] gap-4 border-t border-cream/30 py-3"
                  >
                    <dt className="cap text-sm text-cream">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
            </dl>
          </div>

          <figure>
            <Image
              src={lead.src}
              alt={lead.alt}
              width={lead.w}
              height={lead.h}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full"
            />
            {lead.caption && (
              <figcaption className="cap mt-3 flex gap-3 text-sm text-bone/70">
                <span className="text-cream">Fig. 1</span>
                {lead.caption}
              </figcaption>
            )}
          </figure>
        </div>
      </section>

      {/* GALLERY */}
      {rest.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
            {/* Landscape shots run full width, portraits pair up; "dense"
                lets a later portrait fill the hole beside an earlier one. */}
            <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 md:[grid-auto-flow:dense]">
              {rest.map((img, i) => (
                <figure
                  key={img.src}
                  className={img.w > img.h ? "md:col-span-2" : ""}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.w}
                    height={img.h}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="h-auto w-full"
                  />
                  <figcaption className="cap mt-3 flex gap-3 text-sm text-ink-soft">
                    <span className="text-orange-ink">Fig. {i + 2}</span>
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEXT PLATE */}
      <Link
        href={`/work/${next.slug}`}
        className="group block border-t-[3px] border-ink bg-paper-2 transition-colors hover:bg-card"
      >
        <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-6 px-6 py-10 sm:px-10">
          <div className="flex items-center gap-5">
            <span className="roundel">{plateNumber(next.slug)}</span>
            <div>
              <p className="cap text-sm text-ink-soft">Next plate</p>
              <p className="disp text-4xl sm:text-5xl">{next.client}</p>
            </div>
          </div>
          <span className="text-4xl text-orange-ink transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </div>
      </Link>
    </>
  );
}
