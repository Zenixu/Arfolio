import type { Project } from "@arufolio/data";
import { Tag } from "./Tag";
import { Thumb } from "./Thumb";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
    >
      <div className="aspect-[16/9] w-full shrink-0 overflow-hidden bg-[var(--bg-elevated)]">
        <Thumb
          src={project.thumbnail}
          alt={`Tangkapan layar ${project.title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-medium leading-snug">{project.title}</h3>
          <span className="mono-label shrink-0">{project.year}</span>
        </div>
        <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
          {project.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.tags.slice(0, 4).map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
    </a>
  );
}
