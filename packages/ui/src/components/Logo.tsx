import type { SVGProps } from "react";
import { cn } from "../lib/cn";

type P = SVGProps<SVGSVGElement> & { size?: number };

/**
 * ── Logo sementara (placeholder) ────────────────────────────────────────────
 *
 * Ini BUKAN logo final. Ini penanda identitas yang diturunkan langsung dari
 * data filosofi, supaya situs tidak lagi memakai "inisial dalam kotak" yang
 * terasa generik. Kalau logo buatan sendiri sudah siap, cukup ganti berkas
 * ini / arahkan `brand.logo` ke file baru.
 *
 * Aturan desainnya: geometris, satu warna aksen + aksen kedua, dan tetap
 * terbaca di ukuran 16px (favicon) sampai 160px (footer).
 */

/* ------------------------------------------------------------------ *
 * aruthtale — "Tale Flower"
 *
 * Empat kelopak = empat unsur nama: Arsene, Rue, Hyacinth, Tale.
 * Intinya satu: apa pun unsurnya, semuanya bermuara pada satu kisah.
 * Bunga juga mewakili Rue & Hyacinth (keduanya tumbuhan), sedangkan
 * simetri presisinya mewakili Arsene.
 * ------------------------------------------------------------------ */
export function AruthtaleMark({ size = 28, className, ...p }: P) {
  const petals = [
    { rot: 0, fill: "var(--accent)" },
    { rot: 90, fill: "color-mix(in srgb, var(--accent) 58%, var(--accent-2))" },
    { rot: 180, fill: "var(--accent-2)" },
    { rot: 270, fill: "color-mix(in srgb, var(--accent-2) 58%, var(--accent))" },
  ];
  return (
    <svg
      viewBox="0 0 48 48" width={size} height={size}
      aria-hidden="true" focusable="false"
      className={cn("shrink-0", className)} {...p}
    >
      {petals.map((pt) => (
        <path
          key={pt.rot}
          d="M24 21 Q31 15 24 4 Q17 15 24 21 Z"
          fill={pt.fill}
          transform={`rotate(${pt.rot} 24 24)`}
        />
      ))}
      {/* Inti kisah — lubang kecil dengan satu titik aksen */}
      <circle cx="24" cy="24" r="3.6" fill="var(--bg)" />
      <circle cx="24" cy="24" r="1.7" fill="var(--accent-2)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Rchibnu — "R · I"
 *
 * Monogram dari dua huruf yang ditekankan: R dan I.
 * Batang tegak R dipakai ulang sebagai huruf I (dengan kait atas-bawah),
 * jadi satu bentuk membaca dua huruf sekaligus.
 * Gradiennya mengikuti urutan tema: Indigo → Wisteria → Fox → Autumn →
 * Drizzle → Mirror — dibaca dari bawah ke atas, seperti senja yang pudar.
 * ------------------------------------------------------------------ */
export function RchibnuMark({ size = 28, className, ...p }: P) {
  return (
    <svg
      viewBox="0 0 48 48" width={size} height={size}
      aria-hidden="true" focusable="false"
      className={cn("shrink-0", className)} {...p}
    >
      <defs>
        <linearGradient id="rch-mark-grad" x1="8" y1="46" x2="34" y2="3" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9AA6B2" />{/* Mirror */}
          <stop offset=".2" stopColor="#8FA6BC" />{/* Drizzle */}
          <stop offset=".4" stopColor="#C97F4E" />{/* Autumn */}
          <stop offset=".6" stopColor="#E3A57C" />{/* Fox */}
          <stop offset=".8" stopColor="#B79CE0" />{/* Wisteria */}
          <stop offset="1" stopColor="#6366F1" />{/* Indigo */}
        </linearGradient>
      </defs>
      <g
        fill="none" stroke="url(#rch-mark-grad)" strokeWidth="4.4"
        strokeLinecap="round" strokeLinejoin="round"
      >
        {/* I — batang tegak dengan kait */}
        <path d="M17 42 V6" />
        <path d="M11.5 6 H22.5 M11.5 42 H22.5" />
        {/* R — perut (bowl) */}
        <path d="M17 8 H22 a8 8 0 0 1 0 16 H17" />
        {/* R — kaki (leg) */}
        <path d="M21.5 24 L32 42" />
      </g>
    </svg>
  );
}

/** Lambang sesuai situs — dipakai Navbar/Footer agar tidak salah pasang. */
export function Mark({ site, size = 28, className }: { site: "showcase" | "profile"; size?: number; className?: string }) {
  return site === "profile"
    ? <RchibnuMark size={size} className={className} />
    : <AruthtaleMark size={size} className={className} />;
}
