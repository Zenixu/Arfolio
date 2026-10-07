"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Navbar dengan grid 3 kolom: brand | nav | aksi.
 * Grid membuat nav benar-benar terpusat (bukan sekadar "space-between"),
 * sehingga titik tengah nav tetap sama walau panjang brand berubah.
 *
 * Di layar < sm, nav horizontal disembunyikan dan diganti panel menu
 * (tombol hamburger) supaya navigasi tetap bisa diakses di ponsel.
 */
export function Navbar({
  brand, links, homeHref = "/", right,
}: {
  brand: string;
  links: readonly { label: string; href: string }[];
  homeHref?: string;
  right?: ReactNode;
}) {
  const [path, setPath] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => setPath(window.location.pathname), []);
  useEffect(() => { setOpen(false); }, [path]);

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md">
      <div className="container grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-6">
        <a
          href={homeHref}
          className="justify-self-start font-mono text-sm font-medium tracking-tight text-[var(--text)] transition-colors hover:text-[var(--accent)]"
        >
          {brand}
        </a>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                isActive(l.href)
                  ? "bg-[var(--bg-elevated)] text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text)]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 justify-self-end">
          {right}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="grid h-9 w-9 place-items-center rounded-full text-[var(--text)] transition-colors hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)] sm:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>
              ) : (
                <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav id="mobile-menu" className="border-t border-[var(--border)] sm:hidden">
          <div className="container flex flex-col py-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-[var(--radius-sm)] px-3 py-3 text-sm transition-colors ${
                  isActive(l.href)
                    ? "bg-[var(--bg-elevated)] text-[var(--text)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text)]"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
