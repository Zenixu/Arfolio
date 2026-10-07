"use client";

import { cn } from "../lib/cn";

/**
 * VideoBanner — latar bergerak untuk hero.
 *
 * Kenapa video, bukan GIF: GIF tidak punya kompresi antar-frame, jadi
 * beberapa detik saja bisa 2–8 MB. Klip H.264 8 detik di sini hanya ~58 KB
 * dan bisa dijeda saat tab tidak aktif. Poster WebP dipakai sebagai gambar
 * pertama sebelum video siap, jadi tidak ada kedipan.
 *
 * Aturan main:
 * — selalu `muted` + `playsInline`, kalau tidak, peramban menolak autoplay
 *   (terutama iOS Safari) dan hanya poster yang tampak.
 * — `pointer-events-none` supaya tidak mencuri klik dari teks di atasnya.
 * — dihormati `prefers-reduced-motion`: video disembunyikan lewat CSS
 *   `.banner-video`, poster tetap tampil.
 */
export function VideoBanner({
  src, poster, opacity = 0.42, scrim = true, className,
}: {
  src: string;
  poster?: string;
  opacity?: number;
  scrim?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className="banner-video h-full w-full object-cover"
        style={{ opacity }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Selubung: menjaga teks tetap terbaca di atas gerakan. */}
      {scrim && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--bg) 58%, transparent) 0%, color-mix(in srgb, var(--bg) 80%, transparent) 62%, var(--bg) 100%)",
          }}
        />
      )}
    </div>
  );
}
