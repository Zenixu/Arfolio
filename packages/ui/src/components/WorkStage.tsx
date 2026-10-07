"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@arufolio/data";
import { Thumb } from "./Thumb";
import { ArrowUpRight } from "./Icon";
import { cn } from "../lib/cn";

/**
 * ── WorkStage ───────────────────────────────────────────────────────────────
 *
 * "Karya terpilih" sebagai PANGGUNG LENGKET (sticky stage).
 *
 * Kenapa bukan daftar arsip telanjang lagi: daftar itu jujur (menampilkan
 * peran + angka nyata) tetapi pada keadaan diam ia hanya teks di atas hitam —
 * delapan tangkapan layar proyek yang SUDAH ada di `public/images/projects`
 * tidak pernah hadir kecuali saat kursor menyentuh baris. Hasilnya terbaca
 * polos: satu kolom, tanpa ritme, tanpa hadiah interaksi.
 *
 * Di sini kolom kiri MENEMPEL (sticky) dan menampilkan satu tangkapan layar
 * besar yang berganti (crossfade) mengikuti baris yang sedang dibaca di kolom
 * kanan. Jadi gambar selalu hadir, dan gulir terasa seperti membalik halaman
 * sebuah buku — bukan menggulir daftar teks.
 *
 * Catatan teknis penting:
 *  - Kolom kiri WAJIB meregang setinggi kolom kanan (grid default stretch,
 *    jangan `align-items: start`) supaya elemen sticky punya ruang untuk
 *    menempel. Kalau kolomnya hanya setinggi isinya, sticky tak bergerak.
 *  - Baris aktif dipilih dari yang pusatnya paling dekat dengan titik fokus
 *    (±45% tinggi layar), dihitung di dalam requestAnimationFrame agar tidak
 *    membanjiri utas utama saat menggulir.
 *  - Di HP (tanpa hover, layar sempit) panggung dimatikan; tiap baris
 *    menampilkan thumbnail inline supaya gambarnya tetap terlihat.
 */
export function WorkStage({
  projects, className,
}: {
  projects: Project[]; className?: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);

  /* Baris aktif mengikuti gulir: pilih baris terdekat dengan titik fokus. */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-row]"));
    if (!rows.length) return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const focusY = window.innerHeight * 0.45;
      let best = 0;
      let bestDist = Infinity;
      rows.forEach((row, i) => {
        const r = row.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - focusY);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActive((prev) => (prev === best ? prev : best));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(compute); };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [projects.length]);

  /* Reveal sekali saat bagian masuk: baris muncul bertahap. */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setEntered(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setEntered(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(list);
    const safety = window.setTimeout(() => setEntered(true), 1600);
    return () => { io.disconnect(); window.clearTimeout(safety); };
  }, []);

  const total = projects.length;
  const current = projects[active];

  return (
    <div ref={listRef} className={cn("work-stage", className)}>
      <div className="work-stage__grid">
        {/* ── Panggung lengket: satu layar, gambar berganti mengikuti gulir ── */}
        <div className="work-stage__screen-col">
          <div className="work-stage__screen">
            {projects.map((p, i) => (
              <span
                key={p.slug}
                className={cn("work-stage__frame", i === active && "is-active")}
                aria-hidden={i !== active}
              >
                <Thumb
                  src={p.thumbnail}
                  alt={`Tangkapan layar ${p.title}`}
                  className="h-full w-full object-cover"
                />
              </span>
            ))}

            {/* Nomor raksasa samar: memberi bobot editorial tanpa mengganggu gambar. */}
            <span className="work-stage__big-index" aria-hidden="true">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="work-stage__big-total" aria-hidden="true">/ {String(total).padStart(2, "0")}</span>

            {/* Keterangan bawah layar: judul proyek aktif, ikut berganti. */}
            <span className="work-stage__caption">
              <span className="work-stage__caption-title">{current?.title}</span>
              <span className="work-stage__caption-meta">
                {current?.category}{current?.duration ? ` · ${current.duration}` : ""}
              </span>
            </span>
          </div>

          {/* Garis progres: menunjukkan posisi di dalam bagian. */}
          <div className="work-stage__progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${total ? (active + 1) / total : 0})` }} />
          </div>
        </div>

        {/* ── Daftar: dibaca sambil panggung menempel ── */}
        <div className="work-stage__list">
          {projects.map((p, i) => (
            <a
              key={p.slug}
              href={`/work/${p.slug}`}
              data-row
              className={cn(
                "work-stage__row",
                i === active && "is-active",
                entered && "is-in"
              )}
              style={{ transitionDelay: entered ? `${i * 70}ms` : undefined }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="work-stage__idx">{String(i + 1).padStart(2, "0")}</span>

              {/* Di HP thumbnail tampil inline karena tidak ada hover/panggung. */}
              <span className="work-stage__inline-thumb">
                <Thumb src={p.thumbnail} alt={`Tangkapan layar ${p.title}`} className="h-full w-full object-cover" />
              </span>

              <span className="work-stage__main">
                <span className="work-stage__title">{p.title}</span>
                <span className="work-stage__meta">
                  {p.role && <span className="work-stage__role">{p.role}</span>}
                  {p.metrics?.slice(0, 2).map((m) => (
                    <span key={m.label} className="work-stage__metric">
                      {m.value} {m.label}
                    </span>
                  ))}
                </span>
              </span>

              <span className="work-stage__year">{p.year}</span>
              <ArrowUpRight size={18} className="work-stage__arrow" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
