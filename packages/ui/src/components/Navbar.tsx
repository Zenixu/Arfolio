"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Close, Menu } from "./Icon";
import { Mark } from "./Logo";

/**
 * Navbar: grid 3 kolom (brand | nav | aksi) supaya nav benar-benar terpusat.
 * - Brand memakai wordmark bergaya: inisial dalam kotak + nama mono.
 * - Di layar kecil, nav horizontal diganti panel menu (hamburger) yang
 *   dianimasikan masuk, lengkap dengan ikon sosial.
 * - Bilah kemajuan baca dirapel di sini lewat ScrollProgress (dipasang di layout).
 */
export function Navbar({
  brand, links, homeHref = "/", right, socials, crossLink, site = "showcase",
}: {
  brand: string;
  links: readonly { label: string; href: string }[];
  homeHref?: string;
  right?: ReactNode;
  socials?: { label: string; href: string; icon: ReactNode }[];
  crossLink?: { label: string; href: string };
  site?: "showcase" | "profile";
}) {
  const [path, setPath] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Sembunyi saat menggulir ke bawah, muncul lagi begitu menggulir ke atas.
  const [hidden, setHidden] = useState(false);

  useEffect(() => setPath(window.location.pathname), []);
  useEffect(() => { setOpen(false); }, [path]);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 12);

      // Selisih kecil diabaikan supaya getaran gulir (rubber-band di HP,
      // trackpad) tidak membuat navbar berkedip.
      const delta = y - last;
      if (Math.abs(delta) < 6) return;

      if (y < 80) setHidden(false);        // dekat puncak: selalu tampil
      else if (delta > 0) setHidden(true); // ke bawah: sembunyi
      else setHidden(false);               // ke atas: muncul

      last = y;
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Menu yang sedang terbuka tidak boleh ikut tersembunyi.
  const tucked = hidden && !open;

  // Kunci gulir saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(href + "/");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300 [transition-timing-function:var(--ease-out)]",
        tucked ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      {/* Di HP: satu baris flex (brand kiri, aksi kanan).
          Di layar >=sm: grid 3 kolom supaya nav benar-benar terpusat. */}
      <div className="container flex h-16 items-center justify-between gap-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
        {/* Brand — satu kesatuan, bukan dua elemen yang kebetulan berdekatan.
            Jarak 8 px dan huruf display 15 px/600 dibuat sepadan dengan bobot
            lambang (cakram navy bertepi emas) supaya tidak terasa "logo berat,
            teks lemah". `leading-none` membuat kotak teks setinggi huruf saja,
            jadi pensentralan flex benar-benar optis, bukan geometris. */}
        <a href={homeHref} className="group/brand flex items-center gap-2 justify-self-start" aria-label={`${brand} — beranda`}>
          <span className="flex transition-transform duration-300 [transition-timing-function:var(--ease-spring)] group-hover/brand:scale-110 group-hover/brand:rotate-[-6deg]">
            <Mark site={site} size={30} />
          </span>
          <span className="font-display text-[15px] font-semibold leading-none tracking-[-0.01em] text-[var(--text)] transition-colors group-hover/brand:text-[var(--accent)]">
            {brand}
          </span>
        </a>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-0.5 sm:flex" aria-label="Navigasi utama">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200",
                // Keadaan aktif ditandai warna DAN ketebalan huruf — jangan
                // hanya warna (WCAG 1.4.1: warna saja tidak cukup sebagai satu-
                // satunya pembeda).
                isActive(l.href)
                  ? "font-medium text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              )}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute inset-x-3 bottom-1 h-[1.5px] rounded-full bg-[var(--accent)]" aria-hidden="true" />
              )}
            </a>
          ))}
        </nav>

        {/* Aksi — di HP hanya satu grup di kanan; di layar lebar nav ada di
            kolom tengah sehingga grup ini kembali ke tepi kanan. */}
        <div className="flex items-center gap-2 justify-self-end">
          {right}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] text-[var(--text)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] sm:hidden"
          >
            {open ? <Close size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Menu mobile — slide turun */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_96%,transparent)] backdrop-blur-xl transition-[max-height,opacity] duration-400 [transition-timing-function:var(--ease-out)] sm:hidden",
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container flex flex-col gap-1 py-4">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              style={{ transitionDelay: open ? `${i * 45 + 60}ms` : "0ms" }}
              className={cn(
                "flex items-center rounded-[var(--radius-md)] px-3 py-3.5 text-[0.95rem] transition-all duration-300",
                open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
                isActive(l.href)
                  ? "bg-[var(--bg-elevated)] font-medium text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text)]"
              )}
            >
              {/* Tanpa nomor urut: nomor menu (01–03) tidak sejalan dengan
                  nomor bagian di halaman (Kontak = 05), jadi justru
                  membingungkan. Penanda aktif cukup latar + ketebalan. */}
              <span>{l.label}</span>
            </a>
          ))}

          {socials && socials.length > 0 && (
            <div className="mt-3 flex items-center gap-2 border-t border-[var(--border)] pt-4">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          )}

          {crossLink && (
            <a
              href={crossLink.href}
              className="mt-3 flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--border)] px-3 py-3 text-sm text-[var(--accent)]"
            >
              {crossLink.label}
              <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
