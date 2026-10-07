"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Gambar dengan fallback rapi.
 *
 * Catatan penting: event `onError` saja TIDAK cukup. Gambar mulai dimuat begitu
 * HTML diparse — sering kali gagal SEBELUM React selesai hydrate, sehingga
 * handler `onError` tidak pernah dipanggil dan ikon gambar rusak tetap tampil.
 * Karena itu saat mount kita periksa ulang `complete && naturalWidth === 0`.
 *
 * Placeholder sengaja didesain (pola titik + ikon + label) supaya kotak kosong
 * terbaca sebagai "belum ada aset", bukan sebagai halaman yang rusak.
 */
export function Thumb({
  src, alt, className, placeholder = "thumbnail menyusul",
}: { src?: string | null; alt: string; className?: string; placeholder?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    if (img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} — ${placeholder}`}
        className="grid h-full w-full place-items-center overflow-hidden"
        style={{
          backgroundColor: "var(--bg)",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <svg
            width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className="text-[var(--text-muted)] opacity-50" aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-4.5-4.5L9 18" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)] opacity-70">
            {placeholder}
          </span>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
