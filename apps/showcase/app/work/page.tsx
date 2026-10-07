import type { Metadata } from "next";
import { projects } from "@arufolio/data";
import { ProjectCard, SectionHeading, Reveal } from "@arufolio/ui";

export const metadata: Metadata = {
  title: "The Work",
  description: "Karya nyata — aplikasi, platform, dan alat yang sudah dibangun.",
};

export default function WorkPage() {
  return (
    <section className="section container">
      <SectionHeading
        eyebrow="The Work"
        title="Real Projects"
        description="Yang menjawab pertanyaan: apa yang bisa saya lakukan. Tiap proyek punya peran, stack, dan hasil yang bisa diperiksa."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 50} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
