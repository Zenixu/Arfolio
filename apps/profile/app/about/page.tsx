import type { Metadata } from "next";
import { rchibnu } from "@arufolio/data";
import { SectionHeading, Reveal, Tag } from "@arufolio/ui";

export const metadata: Metadata = { title: "Tentang", description: "Perjalanan, pengalaman, dan pendidikan." };

export default function AboutPage() {
  const { bio, timeline, experience, education, skills } = rchibnu;

  return (
    <section className="section container max-w-3xl">
      <SectionHeading eyebrow="Tentang" title="Perjalanan saya" description={bio.short} />
      <div className="space-y-5 text-[var(--text-muted)] leading-relaxed">
        {bio.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      {/* TIMELINE */}
      <h2 className="mono-label mt-16 mb-6">Linimasa</h2>
      <ol className="relative border-l border-[var(--border)] pl-8">
        {timeline.map((t, i) => (
          <Reveal key={i} delay={i * 60}>
            <li className="relative pb-10 last:pb-0">
              <span className="absolute -left-[35px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--bg)] bg-[var(--accent)]" />
              <p className="mono-label">{t.year}</p>
              <p className="mt-1 font-medium">{t.title}</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{t.detail}</p>
            </li>
          </Reveal>
        ))}
      </ol>

      {/* PENGALAMAN */}
      <h2 className="mono-label mt-16 mb-6">Pengalaman & pendidikan</h2>
      <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {experience.map((e, i) => (
          <li key={i} className="flex flex-wrap items-baseline justify-between gap-2 py-5">
            <div>
              <p className="font-medium">{e.role}</p>
              <p className="text-sm text-[var(--text-muted)]">{e.organization}</p>
            </div>
            <div className="text-right">
              <p className="mono-label">{e.period}</p>
              {e.current && <span className="mono-label text-[var(--accent)]">sekarang</span>}
            </div>
          </li>
        ))}
      </ul>

      {/* SKILLS RINGKAS */}
      <h2 className="mono-label mt-16 mb-6">Keahlian</h2>
      <div className="space-y-6">
        {skills.groups.map((g) => (
          <div key={g.name}>
            <p className="text-sm font-medium mb-2">{g.name}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((s) => <Tag key={s}>{s}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
