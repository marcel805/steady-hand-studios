import Link from "next/link";
import Image from "next/image";
import { Project, PROJECTS } from "@/lib/work";

/**
 * The index of work: a ruled list, one project per row, each with its
 * rally-door number. Shared by the homepage (first few) and /work (all).
 */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <div className="border-t-[3px] border-ink">
      {projects.map((p) => {
        const n = String(PROJECTS.indexOf(p) + 1).padStart(2, "0");
        return (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-ink/25 py-4 transition-colors hover:bg-paper-2 sm:gap-6 md:grid-cols-[auto_1.1fr_1.1fr_220px_auto] md:gap-8"
          >
            <span className="roundel">{n}</span>
            <span className="disp text-3xl sm:text-4xl lg:text-5xl">
              {p.client}
            </span>
            <span className="hidden text-ink-soft md:block">
              {p.type}
              {p.materials ? ` / ${p.materials}` : ""}
            </span>
            <span className="relative hidden aspect-[3/2] w-full overflow-hidden bg-green-2 md:block">
              <Image
                src={p.cover.src}
                alt=""
                fill
                sizes="220px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: p.cover.position }}
              />
            </span>
            <span className="text-3xl text-orange-ink transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        );
      })}
    </div>
  );
}
