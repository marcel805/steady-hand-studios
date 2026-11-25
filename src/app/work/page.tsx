import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectGrid from "@/components/ProjectGrid";
import { PROJECTS } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work - Steady Hand Studios",
  description:
    "Projects from the Steady Hand Studios workshop: Teremana, Astral Tequila, ZYN, Red Bull, Ice Tropez, FYZ and more, from workshop floor to on-site install.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader compact label="Selected work" title="Our work">
        <p>Explore a project to see what we built, from workshop to install.</p>
      </PageHeader>

      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
          <ProjectGrid projects={PROJECTS} />
        </div>
      </section>
    </>
  );
}
