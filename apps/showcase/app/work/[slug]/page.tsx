import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@arufolio/data";
import {
  Button, SectionHeading, Thumb, Reveal, CountUp,
  SpotlightCard, ArrowUpRight, TechList, GitHub, Globe,
} from "@arufolio/ui";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: p.title, description: p.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      {/* ── Kepala ── */}
      <header className="relative overflow-hidden border-b border-[var(--border)] pt-[clamp(48px,9vh,104px)] pb-[clamp(40px,6vh,72px)]">
        <div
          aria-hidden="true"
          className="aurora -left-20 top-0 h-[360px] w-[360px] rounded-full"
          style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 34%, transparent), transparent 68%)" }}
        />
        <div className="container relative">
          <a href="/work" className="link-row mono-label mb-8">
            <span aria-hidden="true">←</span> Semua karya
          </a>

          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="mono-label">{p.category}</span>
              <span className="h-3 w-px bg-[var(--border-strong)]" aria-hidden="true" />
              <span className="mono-label">{p.year}</span>
              <span className="h-3 w-px bg-[var(--border-strong)]" aria-hidden="true" />
              <span className="index-num">#{String(idx + 1).padStart(2, "0")}</span>
            </div>
          </Reveal>

          <Reveal variant="mask" delay={60}>
            <h1 className="h1 mt-5 max-w-3xl text-balance">{p.title}</h1>
          </Reveal>

          <Reveal delay={130}>
            <p className="lede mt-5">{p.summary}</p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {p.links.live && (
                <Button href={p.links.live} withArrow>Kunjungi Situs</Button>
              )}
              {p.links.repo && (
                <Button href={p.links.repo} variant="ghost">
                  <GitHub size={15} /> Lihat Repo
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── Tangkapan layar ── */}
      <section className="container pt-[clamp(40px,6vh,72px)]">
        <Reveal variant="scale">
          <div className="card brackets overflow-hidden">
            <div className="aspect-[16/10] w-full bg-[var(--bg-sunken)]">
              <Thumb
                src={p.thumbnail}
                alt={`Tangkapan layar ${p.title}`}
                placeholder="screenshot menyusul"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        {/* Metadata */}
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-y border-[var(--border)] py-9 sm:grid-cols-4">
          <div>
            <dt className="mono-label">Peran</dt>
            <dd className="mt-2 text-sm">{p.role}</dd>
          </div>
          <div>
            <dt className="mono-label">Durasi</dt>
            <dd className="mt-2 text-sm">{p.duration ?? "—"}</dd>
          </div>
          <div>
            <dt className="mono-label">Tahun</dt>
            <dd className="mt-2 font-mono text-sm">{p.year}</dd>
          </div>
          <div>
            <dt className="mono-label">Tipe</dt>
            <dd className="mt-2 text-sm capitalize">{p.category}</dd>
          </div>
        </dl>
      </section>

      {/* ── Isi ── */}
      <section className="container grid-12 py-[clamp(56px,9vh,110px)]">
        {/* Kolom kiri: sorotan */}
        <div className="col-span-12 lg:col-span-7">
          {p.highlights.length > 0 && (
            <>
              <SectionHeading index="01" eyebrow="Sorotan" title="Yang dibangun" className="mb-8" />
              <ul className="space-y-5">
                {p.highlights.map((h, i) => (
                  <Reveal key={h} delay={i * 60} as="li" className="flex gap-4">
                    <span className="mt-0.5 font-mono text-[11px] text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed text-[var(--text-muted)]">{h}</span>
                  </Reveal>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Kolom kanan: metrik + stack */}
        <aside className="col-span-12 mt-12 space-y-10 lg:col-span-5 lg:mt-0 lg:pl-8">
          {p.metrics.length > 0 && (
            <div>
              <p className="mono-label mb-4">Angka</p>
              <div className="grid grid-cols-2 gap-3">
                {p.metrics.map((m) => (
                  <SpotlightCard key={m.label} className="card p-5">
                    <p className="font-mono text-[clamp(1.5rem,3vw,2rem)] font-medium leading-none tracking-tight">
                      <CountUp to={m.value} />
                    </p>
                    <p className="mono-label mt-2.5">{m.label}</p>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mono-label mb-4">Teknologi</p>
            <TechList items={p.tags} className="sm:grid-cols-2" />
          </div>

          {(p.links.live || p.links.repo) && (
            <div>
              <p className="mono-label mb-4">Tautan</p>
              <ul className="space-y-2.5">
                {p.links.live && (
                  <li>
                    <a href={p.links.live} target="_blank" rel="noreferrer" className="link-row text-sm text-[var(--text-muted)] hover:text-[var(--accent)]">
                      <Globe size={14} /> Situs langsung
                    </a>
                  </li>
                )}
                {p.links.repo && (
                  <li>
                    <a href={p.links.repo} target="_blank" rel="noreferrer" className="link-row text-sm text-[var(--text-muted)] hover:text-[var(--accent)]">
                      <GitHub size={14} /> Repositori
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </aside>
      </section>

      {/* ── Proyek berikutnya ── */}
      <section className="container border-t border-[var(--border)] py-12">
        <a href={`/work/${next.slug}`} className="group flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mono-label">Proyek berikutnya</p>
            <p className="h2 mt-2 transition-colors duration-200 group-hover:text-[var(--accent)]">
              {next.title}
            </p>
          </div>
          <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
            <ArrowUpRight size={18} />
          </span>
        </a>
      </section>
    </article>
  );
}
