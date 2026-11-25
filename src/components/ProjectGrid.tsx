import Link from "next/link";
import Image from "next/image";
import { Project, PROJECTS } from "@/lib/work";

/**
 * Large-photo grid for the Work page: one project per card, photo first,
 * then the name and what was built. Two across from tablet up.
 */
export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2">
      {projects.map((p, i) => {
        const n = String(PROJECTS.indexOf(p) + 1).padStart(2, "0");
        return (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="group block">
              <span className="relative block aspect-[4/3] overflow-hidden bg-green-2">
                <Image
                  src={p.cover.src}
                  alt={`${p.client}: ${p.type}`}
                  fill
                  priority={i < 2}
                  sizes="(min-width: 1360px) 660px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ objectPosition: p.cover.position }}
                />
              </span>

              <span className="mt-4 flex items-start gap-4">
                <span className="roundel">{n}</span>
                <span className="min-w-0 flex-1">
                  <span className="disp block text-4xl sm:text-5xl">
                    {p.client}
                  </span>
                  <span className="cap mt-2 block text-sm text-orange-ink">
                    {p.type}
                  </span>
                  {p.materials && (
                    <span className="mt-1 block text-ink-soft">
                      {p.materials}
                    </span>
                  )}
                </span>
                <span className="cap mt-1 hidden shrink-0 border-b-2 border-orange pb-0.5 text-sm group-hover:text-orange-ink sm:block">
                  View project &rarr;
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
