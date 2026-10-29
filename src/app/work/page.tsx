import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectIndex from "@/components/ProjectIndex";
import { PROJECTS } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work - Steady Hand Studios",
  description:
    "Plates from the Steady Hand Studios workshop: Teremana, Astral Tequila, ZYN, Red Bull, Ice Tropez, FYZ and more, from workshop floor to on-site install.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader label="Selected work" title="Index of work">
        <p>
          Every build, from the workshop floor to the day it goes in. Pick a
          plate to see it up close.
        </p>
      </PageHeader>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
          <ProjectIndex projects={PROJECTS} />
        </div>
      </section>
    </>
  );
}
