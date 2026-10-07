import type { ReactNode } from "react";

export function Footer({
  brand, tagline, columns, socials, crossLink,
}: {
  brand: string;
  tagline?: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
  socials?: { label: string; href: string }[];
  crossLink?: ReactNode;
}) {
  return (
    <footer className="border-t border-[var(--border)] mt-[var(--section-y)]">
      <div className="container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-mono text-sm">{brand}</p>
            {tagline && <p className="mt-3 text-sm text-[var(--text-muted)] max-w-xs">{tagline}</p>}
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <p className="mono-label mb-3">{c.title}</p>
              <ul className="space-y-2 text-sm">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} {brand}. Dibangun dengan Next.js.</p>
          <div className="flex items-center gap-4">
            {socials?.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors">
                {s.label}
              </a>
            ))}
            {crossLink}
          </div>
        </div>
      </div>
    </footer>
  );
}
