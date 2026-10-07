import type { ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * Judul bagian bergaya editorial:
 * nomor indeks (01, 02, …) + label mono + judul besar.
 * Nomor indeks inilah yang memberi kesan "halaman cetak", bukan template SaaS.
 */
export function SectionHeading({
  eyebrow, title, description, action, index, align = "left", className,
}: {
  eyebrow?: string; title: ReactNode; description?: ReactNode;
  action?: ReactNode; index?: string; align?: "left" | "center"; className?: string;
}) {
  return (
    <div className={cn("mb-12", className)}>
      {(eyebrow || index) && (
        <div className={cn("mb-4 flex items-center gap-3", align === "center" && "justify-center")}>
          {index && <span className="index-num">{index}</span>}
          {index && eyebrow && <span className="h-px w-6 bg-[var(--border-strong)]" aria-hidden="true" />}
          {eyebrow && <p className="mono-label">{eyebrow}</p>}
        </div>
      )}
      <div className={cn(
        "flex flex-wrap items-end justify-between gap-x-10 gap-y-5",
        align === "center" && "flex-col items-center text-center"
      )}>
        <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
          <h2 className="h2 text-balance">{title}</h2>
          {description && (
            <p className="mt-4 text-[var(--text-muted)] leading-relaxed">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
