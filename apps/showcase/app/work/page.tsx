import type { Metadata } from "next";
import { projects, lab } from "@arufolio/data";
import { ProjectCard, SectionHeading, Reveal, CountUp } from "@arufolio/ui";

export const metadata: Metadata = {
  title: "The Work",
  description: "Karya nyata — aplikasi, platform, dan alat yang sudah dibangun.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const years = new Set(projects.map((p) => p.year));
  const techCount = new Set(projects.flatMap((p) => p.tags)).size;

  return (
    <section className="section container">
      <SectionHeading
        index="01"
        eyebrow="The Work"
        title={<>Yang benar-benar <span className="text-[var(--accent)]">sudah dibangun</span></>}
        description="Yang menjawab pertanyaan: apa yang bisa saya lakukan. Tiap proyek punya peran, stack, dan hasil yang bisa diperiksa — bukan sekadar daftar tautan."
      />

      {/* Ringkasan angka */}
      <div className="mb-14 grid grid-cols-2 gap-x-8 gap-y-8 border-y border-[var(--border)] py-9 sm:grid-cols-4">
        <div>
          <dd className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-tight">
            <CountUp to={projects.length} />
          </dd>
          <dt className="mono-label mt-2.5">Proyek</dt>
        </div>
        <div>
          <dd className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-tight">
            <CountUp to={techCount} />
          </dd>
          <dt className="mono-label mt-2.5">Teknologi</dt>
        </div>
        <div>
          <dd className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-tight">
            <CountUp to={lab.length} />
          </dd>
          <dt className="mono-label mt-2.5">Eksperimen</dt>
        </div>
        <div>
          <dd className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-tight">
            {Math.min(...years)}–{Math.max(...years)}
          </dd>
          <dt className="mono-label mt-2.5">Rentang</dt>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 70} className="h-full">
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
