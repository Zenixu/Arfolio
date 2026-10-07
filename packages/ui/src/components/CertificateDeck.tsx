"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Certificate } from "@arufolio/data";
import { cn } from "../lib/cn";
import { Thumb } from "./Thumb";
import { ArrowUpRight, ChevronLeft, ChevronRight, Trophy, Verified } from "./Icon";

/**
 * CertificateDeck — sertifikat ditampilkan sebagai KIPAS KARTU, bukan grid.
 *
 * Inspirasi: layar pemilihan "pathway" ala kartu tarot — kartu terpilih
 * berdiri tegak di tengah, kartu lain miring ke kiri/kanan mengikuti busur,
 * dengan panah di kedua sisi untuk berpindah.
 *
 * Kenapa begini: daftar sertifikat sebagai kartu grid membuat tiap gambar
 * kecil dan tak terbaca. Dengan satu kartu besar di tengah, isi sertifikat
 * benar-benar terlihat; kartu tetangga di tepi memberi petunjuk bahwa masih
 * ada yang lain — jadi terasa hidup, bukan tabel.
 *
 * Catatan tata letak:
 * — Geser busur memakai `translateX` + `rotate` + `scale` yang dihitung dari
 *   JARAK ke kartu tengah; kartu jauh (|d| > 2) disembunyikan agar kipasnya
 *   tidak melebar keluar layar.
 * — Di HP jari-jari busur dipersempit lewat `--deck-gap` supaya tidak
 *   terpotong; jumlah kartu yang tampak tetap sama.
 * — Klik kartu tetangga untuk memilihnya; klik kartu tengah membuka
 *   sertifikat. Bisa juga dengan tombol panah / panah keyboard.
 */
export function CertificateDeck({
  items, className,
}: { items: Certificate[]; className?: string }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const count = items.length;
  const stageRef = useRef<HTMLDivElement>(null);

  const go = useCallback((next: number) => {
    if (count === 0) return;
    setDir(next > active ? 1 : -1);
    setActive(((next % count) + count) % count);
  }, [active, count]);

  const step = useCallback((delta: number) => {
    setDir(delta);
    setActive((a) => (((a + delta) % count) + count) % count);
  }, [count]);

  // Panah keyboard saat kipas sedang difokus
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
  };

  if (count === 0) return null;
  const current = items[active];
  const isAward = current.type === "award";
  const href = current.verifyUrl ?? current.image ?? current.file;

  return (
    <div className={cn("cert-deck", className)}>
      {/* ---------- Panggung kipas ---------- */}
      <div
        ref={stageRef}
        className="cert-deck__stage"
        tabIndex={0}
        role="group"
        aria-roledescription="korsel"
        aria-label="Sertifikat & penghargaan"
        onKeyDown={onKey}
      >
        {items.map((c, i) => {
          // Jarak kartu ke kartu tengah, dibungkus supaya kipas mengelilingi
          let d = i - active;
          if (d > count / 2) d -= count;
          if (d < -count / 2) d += count;

          const far = Math.abs(d) > 2;
          const isActive = d === 0;

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => (isActive ? window.open(href, "_blank", "noopener") : go(i))}
              aria-label={isActive ? `Buka ${c.title}` : `Tampilkan ${c.title}`}
              aria-current={isActive ? "true" : undefined}
              className={cn("cert-card", isActive && "is-active")}
              style={{
                ["--d" as string]: String(d),
                // Kartu jauh ditarik ke belakang & diredupkan, bukan dibuang,
                // supaya animasinya mulus saat bergeser.
                opacity: far ? 0 : isActive ? 1 : Math.max(0.32, 0.85 - Math.abs(d) * 0.28),
                zIndex: 20 - Math.abs(d),
                pointerEvents: far ? "none" : "auto",
              }}
            >
              <span className="cert-card__frame">
                <span className="cert-card__art">
                  <Thumb
                    src={c.thumb ?? c.image}
                    alt={c.title}
                    placeholder="gambar menyusul"
                    className="h-full w-full object-cover object-top"
                  />
                </span>
                {/* Nomor urut ala tarot */}
                <span className="cert-card__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {c.type === "award" && (
                  <span className="cert-card__badge">
                    <Trophy size={10} /> Juara
                  </span>
                )}
                <span className="cert-card__caption" aria-hidden={!isActive}>
                  <span className="cert-card__title">{c.title}</span>
                </span>
              </span>
            </button>
          );
        })}

        {/* ---------- Panah ---------- */}
        <button
          type="button"
          className="cert-deck__nav cert-deck__nav--prev"
          onClick={() => step(-1)}
          aria-label="Sertifikat sebelumnya"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          className="cert-deck__nav cert-deck__nav--next"
          onClick={() => step(1)}
          aria-label="Sertifikat berikutnya"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* ---------- Keterangan kartu terpilih ---------- */}
      <div key={current.id} className="cert-deck__meta" data-dir={dir > 0 ? "next" : "prev"}>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
          <span className="mono-label inline-flex items-center gap-1.5">
            {isAward ? <><Trophy size={11} /> Penghargaan</> : <><Verified size={11} /> Sertifikat</>}
          </span>
          <span className="h-2.5 w-px bg-[var(--border-strong)]" aria-hidden="true" />
          <span className="mono-label">{current.issuer}</span>
          <span className="h-2.5 w-px bg-[var(--border-strong)]" aria-hidden="true" />
          <span className="mono-label">{current.date.slice(0, 4)}</span>
        </div>

        <h3 className="cert-deck__headline">{current.title}</h3>

        {current.skills.length > 0 && (
          <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
            {current.skills.slice(0, 4).map((s) => (
              <li key={s} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                {s}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex items-center justify-center gap-5 text-sm">
          <a href={href} target="_blank" rel="noreferrer" className="link-row text-[var(--accent)]">
            Lihat sertifikat <ArrowUpRight size={13} />
          </a>
          {current.verifyUrl && (
            <a href={current.verifyUrl} target="_blank" rel="noreferrer" className="link-row text-[var(--text-muted)] hover:text-[var(--text)]">
              Verifikasi
            </a>
          )}
        </div>

        {/* Penunjuk posisi */}
        <div className="mt-6 flex items-center justify-center gap-1.5" role="tablist" aria-label="Pilih sertifikat">
          {items.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={c.title}
              onClick={() => go(i)}
              className={cn("cert-dot", i === active && "is-active")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
