import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Mail, ArrowUpRight } from "./Icon";
import { Mark } from "./Logo";

export type SocialLink = { label: string; href: string; icon?: ReactNode };

/**
 * Footer — bukan sekadar grid 3 kolom yang kaku.
 *
 * Yang membuatnya hidup:
 * 1. Baris pembuka: logo asli + satu kalimat penutup + tombol "mulai percakapan".
 * 2. Peta tautan 4 kolom; tiap tautan punya garis pendek yang tumbuh saat hover.
 * 3. Wordmark raksasa bergaris (outline) yang terpotong tepi bawah — kolofon
 *    halaman cetak, bukan footer template.
 * 4. Baris hak cipta + tombol "ke atas".
 */
export function Footer({
  brand, tagline, columns, socials, crossLink, note, site = "showcase", email,
}: {
  brand: string;
  tagline?: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
  socials?: SocialLink[];
  crossLink?: ReactNode;
  note?: string;
  site?: "showcase" | "profile";
  email?: string;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-[var(--section-y)] overflow-hidden border-t border-[var(--border)]">
      {/* Cahaya dari atas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-48 opacity-70"
        style={{ background: "var(--glow)" }}
      />
      {/* Garis aksen tipis di tepi atas */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: .55 }}
      />

      {/* ── Baris pembuka ── */}
      <div className="container relative pt-16">
        <div className="flex flex-wrap items-start justify-between gap-8 border-b border-[var(--border)] pb-10">
          <div className="flex items-start gap-4">
            <Mark site={site} size={40} className="mt-0.5" />
            <div className="max-w-md">
              <p className="h3">{tagline ?? "Mari bangun sesuatu yang bisa dibuktikan."}</p>
              {note && (
                <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  {note}
                </p>
              )}
            </div>
          </div>

          {email && (
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-strong)] px-5 py-3 text-sm transition-all duration-200 [transition-timing-function:var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Mulai percakapan
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>

        {/* ── Peta tautan + jejaring ── */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="mono-label mb-5">{c.title}</p>
              <ul className="space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l.href + l.label}>
                    <a
                      href={l.href}
                      className="group/link inline-flex items-center gap-2 text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text)]"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-0 bg-[var(--accent)] transition-all duration-300 [transition-timing-function:var(--ease-out)] group-hover/link:w-4"
                      />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="mono-label mb-5">Jejaring</p>
            <ul className="space-y-3">
              {socials?.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="group/s inline-flex items-center gap-3 text-sm text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] transition-all duration-200 [transition-timing-function:var(--ease-out)] group-hover/s:-translate-y-0.5 group-hover/s:border-[var(--accent)]">
                      {s.icon ?? <Mail size={15} />}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            {crossLink && <div className="mt-5">{crossLink}</div>}
          </div>
        </div>
      </div>

      {/* ── Wordmark raksasa terpotong (kolofon) ── */}
      <div className="relative select-none" aria-hidden="true">
        <p
          className="container whitespace-nowrap font-bold leading-[0.8] tracking-[-0.05em]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 19vw, 15rem)",
            color: "transparent",
            WebkitTextStroke: "1px var(--border-strong)",
            marginBottom: "-0.2em",
          }}
        >
          {brand}
        </p>
      </div>

      {/* ── Baris hak cipta ── */}
      <div className="container relative flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] py-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-[11px] text-[var(--text-muted)]">© {year} {brand}</p>
          <span className="h-3 w-px bg-[var(--border-strong)]" aria-hidden="true" />
          <p className="font-mono text-[11px] text-[var(--text-muted)]">Dibangun dengan Next.js & Tailwind</p>
        </div>
        <a
          href="#main"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
        >
          Ke atas
          <span className="grid h-6 w-6 place-items-center rounded-full border border-[var(--border)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-[var(--accent)]">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </span>
        </a>
      </div>
    </footer>
  );
}
