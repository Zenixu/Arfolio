import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@arufolio/data";
import { Tag, Button, SectionHeading, Thumb } from "@arufolio/ui";

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

  return (
    <article className="section container max-w-3xl">
      <p className="mono-label mb-4">{p.category} · {p.year}</p>
      <h1 className="h1">{p.title}</h1>
      <p className="mt-5 text-lg text-[var(--text-muted)] leading-relaxed">{p.summary}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>

      <dl className="mt-10 grid gap-6 border-y border-[var(--border)] py-8 sm:grid-cols-3">
        <div><dt className="mono-label">Peran</dt><dd className="mt-1.5 text-sm">{p.role}</dd></div>
        <div><dt className="mono-label">Durasi</dt><dd className="mt-1.5 text-sm">{p.duration ?? "—"}</dd></div>
        <div><dt className="mono-label">Tahun</dt><dd className="mt-1.5 text-sm">{p.year}</dd></div>
      </dl>

      <div className="mt-10 aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)]">
        <Thumb
          src={p.thumbnail}
          alt={`Tangkapan layar ${p.title}`}
          placeholder="screenshot menyusul"
          className="h-full w-full object-cover"
        />
      </div>

      {p.highlights.length > 0 && (
        <div className="mt-12">
          <SectionHeading eyebrow="Sorotan" title="Yang dibangun" />
          <ul className="space-y-3">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[var(--text-muted)] leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {p.metrics.length > 0 && (
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
              <p className="font-mono text-2xl">{m.value}</p>
              <p className="mono-label mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-14 flex flex-wrap gap-3">
        {p.links.live && <Button href={p.links.live}>Kunjungi Situs ↗</Button>}
        {p.links.repo && <Button href={p.links.repo} variant="ghost">Lihat Repo ↗</Button>}
        <Button href="/work" variant="link">← Semua karya</Button>
      </div>
    </article>
  );
}
