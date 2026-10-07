import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { TechIcon, hasTechIcon } from "./TechIcon";

/**
 * Label kecil bergaya mono.
 * `tech` = nama teknologi → otomatis menampilkan logo resminya di depan teks.
 */
export function Tag({
  children, className, tech,
}: { children: ReactNode; className?: string; tech?: boolean }) {
  const name = typeof children === "string" ? children : "";
  const showIcon = tech !== false && name && hasTechIcon(name);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        "font-mono text-[11px] font-medium tracking-wide",
        "border-[var(--border)] text-[var(--text-muted)]",
        "transition-colors duration-200 hover:border-[var(--border-strong)] hover:text-[var(--text)]",
        className
      )}
    >
      {showIcon && <TechIcon name={name} size={12} className="opacity-90" />}
      {children}
    </span>
  );
}
