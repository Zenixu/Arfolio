import type { Metadata } from "next";
import { lab, labGroups } from "@arufolio/data";
import { LabCard, SectionHeading, Reveal } from "@arufolio/ui";

export const metadata: Metadata = {
  title: "Learning Vault",
  description: "Things I built to learn — not to impress. Arsip eksperimen & latihan.",
};

export default function LabPage() {
  const langs = new Set(lab.flatMap((l) => l.tags));
  const archived = lab.filter((l) => l.archived).length;

  return (
    <section className="section container">
      <SectionHeading
        eyebrow="Learning Vault"
        title="Things I built to learn — not to impress."
        description={`${lab.length} eksperimen & latihan sepanjang perjalanan belajar. Sebelum ada proyek besar, ada repo-repo kecil yang membuat saya paham cara kerjanya.`}
      />

      <div className="mb-14 grid gap-6 border-y border-[var(--border)] py-8 sm:grid-cols-3">
        <div><p className="font-mono text-3xl">{lab.length}</p><p className="mono-label mt-1">Eksperimen</p></div>
        <div><p className="font-mono text-3xl">{langs.size}</p><p className="mono-label mt-1">Teknologi</p></div>
        <div><p className="font-mono text-3xl">{archived}</p><p className="mono-label mt-1">Arsip</p></div>
      </div>

      {labGroups.map((g) => (
        <div key={g.key} className="mb-14">
          <h2 className="mono-label mb-5">{g.label}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((item, i) => (
              <Reveal key={item.slug} delay={i * 40} className="h-full">
                <LabCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-16 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-8 text-center">
        <p className="text-[var(--text-muted)]">Yang paling matang sudah naik ke</p>
        <a href="/work" className="mt-2 inline-block font-mono text-lg text-[var(--accent)] hover:underline underline-offset-4">
          The Work →
        </a>
      </div>
    </section>
  );
}
