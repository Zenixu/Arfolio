import type { Metadata } from "next";
import { lab, labGroups } from "@arufolio/data";
import { LabCard, SectionHeading, Reveal, CountUp, Marquee, TechStack } from "@arufolio/ui";

export const metadata: Metadata = {
  title: "Learning Vault",
  description: "Things I built to learn — not to impress. Arsip eksperimen & latihan.",
};

export default function LabPage() {
  const langs = new Set(lab.flatMap((l) => l.tags));
  const archived = lab.filter((l) => l.archived).length;
  const techList = [...langs];

  return (
    <section className="section container">
      <SectionHeading
        index="02"
        eyebrow="Learning Vault"
        title={<>Things I built to learn — <span className="accent-italic">not to impress.</span></>}
        description={`${lab.length} eksperimen & latihan sepanjang perjalanan belajar. Sebelum ada proyek besar, ada repo-repo kecil yang membuat saya paham cara kerjanya.`}
      />

      {/* Statistik */}
      <div className="mb-12 grid grid-cols-3 gap-x-8 border-y border-[var(--border)] py-9">
        <div>
          <dd className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-tight">
            <CountUp to={lab.length} />
          </dd>
          <dt className="mono-label mt-2.5">Eksperimen</dt>
        </div>
        <div>
          <dd className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-tight">
            <CountUp to={langs.size} />
          </dd>
          <dt className="mono-label mt-2.5">Teknologi</dt>
        </div>
        <div>
          <dd className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-tight">
            <CountUp to={archived} />
          </dd>
          <dt className="mono-label mt-2.5">Arsip</dt>
        </div>
      </div>

      {/* Marquee teknologi */}
      <div className="mb-14 border-y border-[var(--border)] py-6">
        <Marquee duration={52}>
          {techList.map((t) => (
            <span key={t} className="mx-5 inline-flex items-center gap-2.5">
              <TechStack items={[t]} size={20} />
              <span className="whitespace-nowrap font-mono text-xs text-[var(--text-muted)]">{t}</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Kelompok */}
      {labGroups.map((g, gi) => (
        <div key={g.key} className="mb-16 last:mb-0">
          <div className="mb-6 flex items-center gap-4">
            <span className="index-num">{String(gi + 1).padStart(2, "0")}</span>
            <h2 className="mono-label">{g.label}</h2>
            <span className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
            <span className="mono-label">{String(g.items.length).padStart(2, "0")}</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 3) * 55} className="h-full">
                <LabCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      ))}

      <div className="relative mt-16 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-10 text-center">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "var(--glow)" }} />
        <p className="relative text-[var(--text-muted)]">Yang paling matang sudah naik ke</p>
        <a
          href="/work"
          className="link-row relative mt-3 inline-flex font-mono text-lg text-[var(--accent)]"
        >
          The Work <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
