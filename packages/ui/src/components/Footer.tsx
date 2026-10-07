import type { ReactNode } from "react";
import { Mail, ArrowUpRight, WhatsApp } from "./Icon";
import { Mark } from "./Logo";
import { waLink } from "../lib/wa";

export type SocialLink = { label: string; href: string; icon?: ReactNode };

/**
 * Footer — kolofon editorial, bukan grid 3 kolom yang kaku.
 *
 * ATURAN KONSISTENSI (dulu dilanggar, itu yang membuatnya terasa "jelek"):
 * — SETIAP bagian punya perlakuan yang sama: judul `mono-label` + daftar
 *   tautan biasa. Tidak ada satu bagian yang dibungkus kotak ber-border
 *   sementara yang lain telanjang. Pemisah antar-zona hanya garis tipis
 *   di atas (pembuka) dan di bawah (hak cipta).
 * — Deretan sosial tidak lagi jadi pil ber-border sendiri; ia jadi kolom
 *   daftar yang sama seperti kolom lain, hanya ditambah ikon.
 *
 * Tata letak 4 kolom di layar lebar (dulu hanya terisi 3 sehingga sisi
 * kanan menganga kosong): dua kolom tautan + jejaring + satu kolom status.
 * Kolom status inilah tempat yang tepat untuk "Tersedia untuk proyek ·
 * Cianjur · Est." — informasi itu terlalu berisik bila dipasang di puncak
 * hero, tetapi wajar di kaki halaman.
 */
export function Footer({
  brand, tagline, columns, socials, note, site = "showcase", email, whatsapp, status,
}: {
  brand: string;
  tagline?: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
  socials?: SocialLink[];
  note?: string;
  site?: "showcase" | "profile";
  email?: string;
  whatsapp?: string;
  status?: { available?: boolean; location?: string; since?: string };
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

          {(email || whatsapp) && (
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              {whatsapp && (
                <a
                  href={waLink(whatsapp, `Halo, saya menemukan ${brand} dan ingin bertanya.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-all duration-200 [transition-timing-function:var(--ease-out)] hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
                >
                  <WhatsApp size={16} />
                  Chat WhatsApp
                </a>
              )}
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
          )}
        </div>

        {/* ── Peta tautan + jejaring + status ──
            Semua kolom memakai perlakuan yang SAMA (judul mono-label +
            daftar tautan), jadi tidak ada lagi bagian yang "beda sendiri". */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 sm:gap-10 sm:py-12 lg:grid-cols-4">
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

          {/* Jejaring — sekarang kolom daftar biasa (dulu pil di dalam kotak
              ber-border, satu-satunya bagian yang tampil beda). */}
          {socials && socials.length > 0 && (
            <nav aria-label="Jejaring">
              <p className="mono-label mb-4 sm:mb-5">Jejaring</p>
              <ul className="space-y-2.5 text-sm sm:space-y-3">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-2.5 text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text)]"
                    >
                      <span className="text-[var(--text-muted)] transition-colors duration-200 group-hover/link:text-[var(--accent)]">
                        {s.icon ?? <Mail size={15} />}
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Status — tempat yang wajar untuk ketersediaan & lokasi. */}
          {status && (
            <div>
              <p className="mono-label mb-4 sm:mb-5">Status</p>
              <ul className="space-y-2.5 text-sm text-[var(--text-muted)] sm:space-y-3">
                {status.available && (
                  <li className="inline-flex items-center gap-2 text-[var(--text)]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-2)]" aria-hidden="true" />
                    Available for projects
                  </li>
                )}
                {status.location && <li>{status.location}</li>}
                {status.since && (
                  <li className="font-mono text-[11px] uppercase tracking-[0.14em]">Est. {status.since}</li>
                )}
              </ul>
            </div>
          )}
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
