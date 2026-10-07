"use client";

import { useRef, useState, type MouseEvent } from "react";
import type { Project } from "@arufolio/data";
import { Thumb } from "./Thumb";
import { ArrowUpRight } from "./Icon";
import { cn } from "../lib/cn";

/**
 * ── WorkArchive ─────────────────────────────────────────────────────────────
 *
 * "Karya terpilih" sebagai DAFTAR ARSIP, bukan grid kartu.
 *
 * Kenapa bukan grid kartu lagi: bentuk thumbnail → judul → 2 baris → tag
 * adalah pola yang sama di ribuan portfolio, jadi terbaca generik. Yang lebih
 * penting, deskripsi bagian ini menjanjikan "peran, stack, dan hasil yang bisa
 * diperiksa" — tetapi kartu lama hanya menampilkan ringkasan + tag. Peran dan
 * angkanya sebenarnya SUDAH ada di data (`role`, `metrics`), cuma tidak dipakai.
 *
 * Di sini janji itu ditepati: tiap baris menampilkan peran dan angka nyata,
 * sehingga terbaca sebagai bukti, bukan pajangan. Thumbnail muncul mengikuti
 * kursor saat baris disorot (di HP tidak ada hover → thumbnail tampil inline).
 */
export function WorkArchive({
  projects, className,
}: {
  projects: Project[]; className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  /** Thumbnail mengambang mengikuti kursor, tapi ditahan agar tidak keluar
   *  dari tepi wadah (kalau tidak, ia terpotong di dekat sisi kanan). */
  function onMove(e: MouseEvent) {
    const wrap = wrapRef.current;
    const prev = previewRef.current;
    if (!wrap || !prev) return;
    const r = wrap.getBoundingClientRect();
    const half = prev.offsetWidth / 2;
    const x = Math.max(half + 8, Math.min(r.width - half - 8, e.clientX - r.left));
    const y = e.clientY - r.top;
    prev.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  return (
    <div
      ref={wrapRef}
      className={cn("work-archive", className)}
      onMouseMove={onMove}
      onMouseLeave={() => setActive(null)}
    >
      {/* Pratinjau mengambang — hanya tampil di perangkat ber-hover. Semua
          gambar ditumpuk lalu dinyalakan satu per satu, supaya tidak ada
          gambar yang dimuat ulang saat berpindah baris. */}
      <div ref={previewRef} className="work-archive__preview" aria-hidden="true">
        {projects.map((p, i) => (
          <span
            key={p.slug}
            className={cn("work-archive__shot", active === i && "is-active")}
          >
            <Thumb src={p.thumbnail} alt="" className="h-full w-full object-cover" />
          </span>
        ))}
      </div>

      {projects.map((p, i) => (
        <a
          key={p.slug}
          href={`/work/${p.slug}`}
          className="work-archive__row"
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
        >
          <span className="work-archive__idx">{String(i + 1).padStart(2, "0")}</span>

          {/* Di HP thumbnail tampil inline karena tidak ada hover. */}
          <span className="work-archive__inline-thumb">
            <Thumb src={p.thumbnail} alt={`Tangkapan layar ${p.title}`} className="h-full w-full object-cover" />
          </span>

          <span className="work-archive__body">
            <span className="work-archive__title">{p.title}</span>
            <span className="work-archive__meta">
              {p.role && <span className="work-archive__role">{p.role}</span>}
              {p.metrics?.slice(0, 2).map((m) => (
                <span key={m.label} className="work-archive__metric">
                  {m.value} {m.label}
                </span>
              ))}
            </span>
          </span>

          <span className="work-archive__year">{p.year}</span>
          <ArrowUpRight size={18} className="work-archive__arrow" />
        </a>
      ))}
    </div>
  );
}
