import type { Metadata } from "next";
import { rchibnu } from "@arufolio/data";
import {
  SectionHeading, Reveal, SpotlightCard, TechList, Marquee, TechStack, CountUp,
} from "@arufolio/ui";

export const metadata: Metadata = {
  title: "Keahlian",
  description: "Teknologi, konsep, dan tools yang saya gunakan.",
};

export default function SkillsPage() {
  const { skills } = rchibnu;
  const total = skills.groups.reduce((n, g) => n + g.items.length, 0);
  const all = skills.groups.flatMap((g) => g.items);

  return (
    <>
      {/* Marquee pembuka */}
      <Reveal>
        <div className="border-b border-[var(--border)] py-6">
          <Marquee duration={44}>
            {all.map((t) => (
              <span key={t} className="mx-5 inline-flex items-center gap-2.5">
                <TechStack items={[t]} size={20} />
                <span className="whitespace-nowrap font-mono text-xs text-[var(--text-muted)]">{t}</span>
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>

      <section className="section container">
        <SectionHeading
          index="01"
          eyebrow="Keahlian"
          title={<>Teknologi & <span className="afterglow-gradient">tools</span></>}
          description="Yang saya pakai sehari-hari untuk membangun aplikasi — dari antarmuka sampai basis data."
        />

        <div className="mb-14 grid grid-cols-3 gap-x-8 border-y border-[var(--border)] py-9">
          <div>
            <dd className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-tight">
              <CountUp to={total} />
            </dd>
            <dt className="mono-label mt-2.5">Teknologi</dt>
          </div>
          <div>
            <dd className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-tight">
              <CountUp to={skills.groups.length} />
            </dd>
            <dt className="mono-label mt-2.5">Kategori</dt>
          </div>
          <div>
            <dd className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-tight">
              <CountUp to={3} suffix="+" />
            </dd>
            <dt className="mono-label mt-2.5">Tahun</dt>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((g, i) => (
            <Reveal key={g.name} delay={i * 50} className="h-full">
              <SpotlightCard className="card h-full p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="mono-label">{g.name}</h2>
                  <span className="index-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <TechList items={g.items} className="mt-6 grid-cols-1 sm:grid-cols-1" />
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
