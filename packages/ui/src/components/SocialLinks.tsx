import { cn } from "../lib/cn";
import { TechIcon, hasTechIcon } from "./TechIcon";

export type Social = { label: string; href: string; icon: React.ReactNode };

/**
 * Deretan ikon sosial sebagai tautan bulat.
 * Semua ikon SVG asli (bukan emoji/teks), aria-label wajib karena ikon-saja.
 */
export function SocialLinks({
  items, size = "md", className,
}: { items: Social[]; size?: "sm" | "md"; className?: string }) {
  const dim = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {items.map((s) => (
        <li key={s.href + s.label}>
          <a
            href={s.href}
            target={s.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            className={cn(
              "grid place-items-center rounded-full border border-[var(--border)] text-[var(--text-muted)]",
              "transition-all duration-200 [transition-timing-function:var(--ease-out)]",
              "hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]",
              dim
            )}
          >
            {s.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Daftar teknologi dengan logo + nama — dipakai untuk grid "stack".
 */
export function TechList({
  items, className,
}: { items: string[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3", className)}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-2.5">
          {hasTechIcon(t) ? (
            <TechIcon name={t} size={20} />
          ) : (
            <span className="grid h-5 w-5 place-items-center rounded-[5px] border border-[var(--border)] font-mono text-[9px] text-[var(--text-muted)]">
              {t.slice(0, 2).toLowerCase()}
            </span>
          )}
          <span className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]">
            {t}
          </span>
        </li>
      ))}
    </ul>
  );
}
