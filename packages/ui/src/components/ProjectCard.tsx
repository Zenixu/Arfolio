import type { Project } from "@arufolio/data";
import { Tag } from "./Tag";
import { Thumb } from "./Thumb";
import { ArrowUpRight } from "./Icon";

/**
 * Kartu proyek. Detail yang membuatnya tidak "template":
 * — nomor indeks mono di sudut (01, 02, …)
 * — logo teknologi asli di baris tag
 * — overlay "Lihat proyek" yang muncul saat hover
 */
export function ProjectCard({ project, index }: { project: Project; index?: number }) {
  return (
    <a
      href={`/work/${project.slug}`}
      className="group card spotlight flex h-full flex-col hover:-translate-y-1.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[var(--bg-sunken)]">
        <Thumb
          src={project.thumbnail}
          alt={`Tangkapan layar ${project.title}`}
          className="h-full w-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.045]"
        />
        {/* Overlay aksi saat hover */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-[rgba(0,0,0,.72)] via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 font-mono text-[11px] text-white backdrop-blur-sm">
            Lihat proyek <ArrowUpRight size={12} />
          </span>
        </div>
        {typeof index === "number" && (
          <span className="absolute left-3 top-3 grid h-7 min-w-7 place-items-center rounded-full bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] px-2 font-mono text-[10px] text-[var(--text)] backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="h3 transition-colors duration-200 group-hover:text-[var(--accent)]">
            {project.title}
          </h3>
          <span className="mono-label shrink-0">{project.year}</span>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-muted)] line-clamp-2">
          {project.summary}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
          {project.tags.slice(0, 3).map((t) => (
            <Tag key={t} tech>{t}</Tag>
          ))}
          {project.tags.length > 3 && (
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
