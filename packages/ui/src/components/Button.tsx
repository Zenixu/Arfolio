import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

type Variant = "primary" | "ghost" | "link";

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors duration-150",
  ghost:
    "border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-150",
  link: "text-[var(--accent)] hover:underline underline-offset-4",
};

export function Button({
  children, variant = "primary", className, ...props
}: { children: ReactNode; variant?: Variant } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium",
        "min-h-[44px] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2",
        styles[variant],
        className
      )}
    >
      {children}
    </a>
  );
}
