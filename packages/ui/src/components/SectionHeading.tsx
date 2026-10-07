import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow, title, description, action,
}: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
      <div className="max-w-2xl">
        {eyebrow && <p className="mono-label mb-3">{eyebrow}</p>}
        <h2 className="h2">{title}</h2>
        {description && (
          <p className="mt-3 text-[var(--text-muted)] leading-relaxed">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
