import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { ArrowRight } from "./Icon";

type Variant = "primary" | "ghost" | "link" | "soft";
type Size = "md" | "lg";

const styles: Record<Variant, string> = {
  // `font-semibold` pada primary: label 15 px di atas bidang gelap butuh
  // bobot lebih supaya tepinya tegas. Kontras warnanya sudah 6,2:1 (terang)
  // dan 8,1:1 (gelap) — di atas ambang WCAG AA 4,5:1.
  primary:
    "bg-[var(--accent)] text-[var(--accent-ink)] font-semibold hover:bg-[var(--accent-hover)] shadow-[0_10px_30px_-12px_color-mix(in_srgb,var(--accent)_70%,transparent)] hover:shadow-[0_16px_38px_-12px_color-mix(in_srgb,var(--accent)_80%,transparent)]",
  ghost:
    "border border-[var(--border-strong)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-soft)]",
  soft:
    "bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--border-strong)]",
  link: "text-[var(--accent)] px-0 hover:gap-3",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[0.9375rem]",
};

/**
 * Tombol tautan. Varian `primary` mendapat kilau menyapu (`shine`) saat hover —
 * satu aksen gerak yang disengaja, bukan animasi di mana-mana.
 */
export function Button({
  children, variant = "primary", size = "md", className, withArrow, ...props
}: {
  children: ReactNode; variant?: Variant; size?: Size; withArrow?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isLink = variant === "link";
  return (
    <a
      {...props}
      className={cn(
        "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium",
        "transition-all duration-200 [transition-timing-function:var(--ease-out)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2",
        isLink ? "min-h-0" : cn("min-h-[44px]", sizes[size]),
        variant === "primary" && "shine",
        styles[variant],
        className
      )}
    >
      {children}
      {(withArrow || isLink) && (
        <ArrowRight
          size={15}
          className="transition-transform duration-200 [transition-timing-function:var(--ease-out)] group-hover/btn:translate-x-1"
        />
      )}
    </a>
  );
}
