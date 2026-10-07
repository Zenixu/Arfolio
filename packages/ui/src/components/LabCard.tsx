import type { Lab } from "@arufolio/data";
import { Tag } from "./Tag";
import { Thumb } from "./Thumb";

export function LabCard({ item }: { item: Lab }) {
  // Arsip: repo sudah tidak publik → jangan jadikan tautan mati.
  const repo = item.links.repo;
  const clickable = Boolean(repo) && !item.archived;

  const base =
    "flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] transition-all duration-300";

  const inner = (
    <>
      {item.thumb && (
        <div className="aspect-[16/9] w-full shrink-0 overflow-hidden bg-[var(--bg-elevated)]">
          <Thumb
            src={item.thumb}
            alt={`Tangkapan layar ${item.title}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-medium leading-snug transition-colors group-hover:text-[var(--accent)]">
              {item.title}
            </h3>
            {item.archived && (
              <span className="mono-label shrink-0 rounded-full border border-[var(--border)] px-2 py-0.5">
                arsip
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
            {item.summary}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {item.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
    </>
  );

  if (!clickable) {
    return (
      <div
        className={`${base} ${item.archived ? "opacity-60" : ""}`}
        aria-label={item.archived ? `${item.title} — arsip, repo tidak lagi publik` : item.title}
      >
        {inner}
      </div>
    );
  }

  return (
    <a
      href={repo ?? "#"}
      target="_blank"
      rel="noreferrer"
      className={`group ${base} hover:-translate-y-0.5 hover:border-[var(--accent)]`}
    >
      {inner}
    </a>
  );
}
