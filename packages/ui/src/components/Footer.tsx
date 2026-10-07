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
 * 2. Peta tautan; tiap tautan punya garis pendek yang tumbuh saat hover.
 * 3. Wordmark raksasa bergaris (outline) yang terpotong tepi bawah — kolofon
 *    halaman cetak, bukan footer template.
 * 4. Baris hak cipta + tombol "ke atas".
 *
 * Di HP tata letaknya dirapikan: dua kolom tautan berdampingan (bukan satu
 * kolom panjang), jejaring jadi deretan pil mendatar, dan tombol CTA selebar
 * layar supaya mudah disentuh.
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
      <div className="container relative pt-14 sm:pt-16">
        <div className="flex flex-col gap-7 border-b border-[var(--border)] pb-9 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-8 sm:pb-10">
          <div className="flex items-start gap-4">
            <Mark site={site} size={40} className="mt-0.5" />
            <div className="max-w-md">
              <p className="h3 text-balance">{tagline ?? "Mari bangun sesuatu yang bisa dibuktikan."}</p>
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
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-[var(--border-strong)] px-5 py-3 text-sm transition-all duration-200 [transition-timing-function:var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] sm:w-auto"
            >
              Mulai percakapan
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>

        {/* ── Peta tautan + jejaring ── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 py-10 sm:gap-10 sm:py-12 lg:grid-cols-4">
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="mono-label mb-4 sm:mb-5">{c.title}</p>
              <ul className="space-y-2.5 text-sm sm:space-y-3">
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

          <div className="col-span-2 lg:col-span-1">
            <p className="mono-label mb-4 sm:mb-5">Jejaring</p>
            {/* Deretan pil mendatar — lebih enak disentuh daripada daftar tegak */}
            <ul className="flex flex-wrap gap-2">
              {socials?.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="group/s inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] py-1.5 pl-1.5 pr-4 text-[0.8125rem] text-[var(--text-muted)] transition-all duration-200 [transition-timing-function:var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-[var(--border)] transition-colors duration-200 group-hover/s:border-[var(--accent)]">
                      {s.icon ?? <Mail size={14} />}
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
            fontSize: "clamp(3.2rem, 19vw, 15rem)",
            color: "transparent",
            WebkitTextStroke: "1px var(--border-strong)",
            marginBottom: "-0.2em",
          }}
        >
          {brand}
        </p>
      </div>

      {/* ── Baris hak cipta ── */}
      <div className="container relative flex flex-col gap-4 border-t border-[var(--border)] py-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <p className="font-mono text-[11px] text-[var(--text-muted)]">© {year} {brand}</p>
          <span className="hidden h-3 w-px bg-[var(--border-strong)] sm:block" aria-hidden="true" />
          <p className="font-mono text-[11px] text-[var(--text-muted)]">Dibangun dengan Next.js & Tailwind</p>
        </div>
        <a
          href="#main"
          className="group inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)] sm:self-auto"
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
