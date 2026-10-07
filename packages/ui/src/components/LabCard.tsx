import type { Lab } from "@arufolio/data";
import { cn } from "../lib/cn";
import { Tag } from "./Tag";
import { Thumb } from "./Thumb";
import { ArrowUpRight } from "./Icon";

/**
 * Kartu lab (Learning Vault).
 * Arsip = repo sudah tidak publik → kartu tidak bisa diklik (bukan tautan mati),
 * diberi lencana "arsip" dan diredupkan.
 */
export function LabCard({ item }: { item: Lab }) {
  const repo = item.links.repo;
  const clickable = Boolean(repo) && !item.archived;

  const base =
    "group card flex h-full flex-col hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow)]";

  const inner = (
    <>
      {item.thumb && (
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[var(--bg-sunken)]">
          <Thumb
            src={item.thumb}
            alt={`Tangkapan layar ${item.title}`}
            className="h-full w-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.045]"
          />
          {clickable && (
            <div className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-[rgba(0,0,0,.6)] to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                <ArrowUpRight size={13} />
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className={cn(
              "text-[0.9375rem] font-medium leading-snug transition-colors duration-200",
              clickable && "group-hover:text-[var(--accent)]"
            )}>
              {item.title}
            </h3>
            {item.archived && (
              <span className="mono-label shrink-0 rounded-full border border-[var(--border)] px-2 py-0.5">
                arsip
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] line-clamp-2">
            {item.summary}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {item.tags.map((t) => <Tag key={t} tech>{t}</Tag>)}
        </div>
      </div>
    </>
  );

  if (!clickable) {
    return (
      <div
        className={cn(base, "hover:translate-y-0 hover:shadow-none", item.archived && "opacity-60")}
        aria-label={item.archived ? `${item.title} — arsip, repo tidak lagi publik` : item.title}
      >
        {inner}
      </div>
    );
  }

  return (
    <a href={repo ?? "#"} target="_blank" rel="noreferrer" className={base}>
      {inner}
    </a>
  );
}
