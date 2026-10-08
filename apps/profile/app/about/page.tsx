import type { Metadata } from "next";
import { rchibnu } from "@arufolio/data";
import {
  SectionHeading, Reveal, Tag, SpotlightCard, Briefcase, MapPin,
} from "@arufolio/ui";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Perjalanan, pengalaman, dan pendidikan.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { bio, timeline, experience, education, skills, identity } = rchibnu;

  return (
    <>
      {/* Kepala */}
      <section className="section--tight container pt-[clamp(56px,9vh,96px)]">
        <SectionHeading
          index="01"
          eyebrow="Tentang"
          title={<>Perjalanan <span className="afterglow-gradient">saya</span></>}
          description={bio.short}
          divider
        />
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg-elevated)_45%,transparent)] p-6 sm:p-8">
              <span
                aria-hidden="true"
                className="absolute inset-y-6 left-0 w-px"
                style={{ background: "linear-gradient(180deg, transparent, var(--accent), transparent)" }}
              />
              <div className="space-y-5 leading-relaxed text-[var(--text-muted)]">
                {bio.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
          <aside className="col-span-12 mt-10 space-y-4 lg:col-span-5 lg:mt-0 lg:pl-8">
            <SpotlightCard className="card p-6">
              <p className="mono-label inline-flex items-center gap-2"><MapPin size={12} /> Berbasis di</p>
              <p className="mt-3 text-sm">{identity.location}</p>
            </SpotlightCard>
            <SpotlightCard className="card p-6">
              <p className="mono-label inline-flex items-center gap-2"><Briefcase size={12} /> Pendidikan</p>
              <p className="mt-3 text-sm font-medium">{education.school}</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{education.major} · {education.grade}</p>
            </SpotlightCard>
          </aside>
        </div>
      </section>

      {/* Linimasa */}
      <section className="section container">
        <SectionHeading index="02" eyebrow="Linimasa" title="Jejak langkah" />
        <ol className="relative border-l border-[var(--border)] pl-8">
          {timeline.map((t, i) => (
            <Reveal key={`${t.year}-${t.title}`} delay={i * 60} as="li" className="relative pb-10 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[35px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--bg)] bg-[var(--accent)]"
              />
              <p className="mono-label">{t.year}</p>
              <p className="mt-1.5 font-medium">{t.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">{t.detail}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Pengalaman & pendidikan */}
      <section className="section container">
        <SectionHeading index="03" eyebrow="Pengalaman" title="Pengalaman & pendidikan" />
        <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {experience.map((e, i) => (
            <Reveal key={`${e.role}-${e.organization}`} delay={i * 55} as="li">
              <div className="group flex flex-wrap items-start justify-between gap-4 py-6">
                <div className="flex gap-4">
                  <span className="index-num mt-1">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-medium">{e.role}</p>
                    <p className="mt-1 text-sm text-[var(--accent)]">{e.organization}</p>
                    {e.description && (
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">{e.description}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="mono-label">{e.period}</p>
                  {e.current && (
                    <span className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" /> sekarang
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Keahlian ringkas */}
      <section className="section container">
        <SectionHeading
          index="04"
          eyebrow="Keahlian"
          title="Yang saya kuasai"
          description={`${skills.groups.reduce((n, g) => n + g.items.length, 0)} teknologi, konsep, dan tools.`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((g, i) => (
            <Reveal key={g.name} delay={i * 45} className="h-full">
              <SpotlightCard className="card h-full p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="mono-label">{g.name}</h3>
                  <span className="index-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {g.items.map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
