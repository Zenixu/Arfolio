import type { Metadata } from "next";
import { rchibnu } from "@arufolio/data";
import { SectionHeading, Tag, Reveal } from "@arufolio/ui";

export const metadata: Metadata = { title: "Keahlian", description: "Teknologi, konsep, dan tools yang saya gunakan." };

export default function SkillsPage() {
  return (
    <section className="section container">
      <SectionHeading eyebrow="Keahlian" title="Teknologi & tools" description="Yang saya pakai sehari-hari untuk membangun aplikasi." />
      <div className="grid gap-8 sm:grid-cols-2">
        {rchibnu.skills.groups.map((g, i) => (
          <Reveal key={g.name} delay={i * 50}>
            <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
              <h2 className="mono-label mb-4">{g.name}</h2>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((s) => <Tag key={s}>{s}</Tag>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
