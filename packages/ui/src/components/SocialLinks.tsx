import type { ComponentType } from "react";
import { cn } from "../lib/cn";
import { TechIcon, hasTechIcon } from "./TechIcon";
import { Cube, Kanban, Key, Network, Cpu, Workflow } from "./Icon";

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

/* ------------------------------------------------------------------ *
 * Ikon untuk keahlian yang TIDAK punya logo resmi.
 *
 * PENTING: sebelumnya item seperti "OOP" atau "RBAC & Auth" dirender
 * sebagai kotak berisi dua huruf pertama — hasilnya "oo", "rb", "pr",
 * "ma" yang terbaca seperti teks rusak. Sekarang tiap konsep punya
 * ikon yang benar-benar mewakilinya.
 * ------------------------------------------------------------------ */
const CONCEPT_ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  "oop": Cube,
  "prinsip solid": Cube,
  "manajemen proyek": Kanban,
  "rbac & auth": Key,
  "rbac": Key,
  "computational thinking": Network,
  "ai": Cpu,
  "automation": Workflow,
};

const conceptIcon = (name: string) => CONCEPT_ICONS[name.trim().toLowerCase()] ?? null;

/**
 * Daftar teknologi dengan logo + nama — dipakai untuk grid "stack".
 *
 * Urutan pencarian ikon: logo resmi (Simple Icons) → ikon konsep → tidak
 * ada ikon sama sekali (teks saja, TIDAK ada kotak inisial).
 */
export function TechList({
  items, className,
}: { items: string[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3", className)}>
      {items.map((t) => {
        const Concept = conceptIcon(t);
        return (
          <li key={t} className="group flex items-center gap-2.5">
            {hasTechIcon(t) ? (
              <TechIcon name={t} size={20} />
            ) : Concept ? (
              <span className="grid h-5 w-5 shrink-0 place-items-center text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--accent)]">
                <Concept size={18} />
              </span>
            ) : null}
            <span className="text-sm text-[var(--text-muted)] transition-colors group-hover:text-[var(--text)]">
              {t}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
