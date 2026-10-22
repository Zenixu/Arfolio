import { cn } from "../lib/cn";

type MarkProps = { size?: number; className?: string };

/**
 * ── Lambang aruthtale ───────────────────────────────────────────────────────
 *
 * SATU berkas saja: `aruthtale-mark.webp` — lambang utama brand (arch emas
 * ganda + monogram "A" ivory + bunga, 4 bintang di poros) di atas lempeng navy
 * bundar. Karena lambangnya sudah punya lempeng(latar) sendiri, ia terbaca
 * jelas di tema gelap MAUPUN terang tanpa perlu dua varian gambar.
 *
 * (Dulu ada dua berkas — `-ivory` & `-indigo` — yang ditumpuk lalu ditukar
 * lewat CSS `[data-theme]`. Salah satu berkasnya bahkan tidak pernah ikut
 * ter-build, sehingga di tema gelap lambangnya kosong. Satu berkas
 * menyelesaikan keduanya sekaligus.)
 *
 * WebP, bukan PNG: 512×512 PNG seberat 221 KB; WebP 256×256 cuma 29 KB.
 * Ukuran render terbesar adalah 260 px (watermark 6 % opacity) dan 56 px
 * (kartu profil), jadi 256 px sudah menutup layar 3× pada 56 px.
 */
export function AruthtaleMark({ size = 28, className }: MarkProps) {
  return (
    <span
      className={cn("brand-mark shrink-0", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/aruthtale-mark.webp" alt="" width={size} height={size} />
    </span>
  );
}

/**
 * ── Lambang Rchibnu ─────────────────────────────────────────────────────────
 *
 * Monogram “R · I” bergaya fox + wisteria (senja Afterglow), dibuat oleh
 * pemilik brand. Karena lambangnya sudah berbentuk cakram penuh dengan
 * latarnya sendiri, satu berkas cukup dipakai di tema gelap maupun terang.
 * WebP 256×256 (26 KB), menggantikan PNG 512×512 (278 KB).
 */
export function RchibnuMark({ size = 28, className }: MarkProps) {
  return (
    <span
      className={cn("brand-mark brand-mark--framed shrink-0", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/rchibnu-mark.webp" alt="" width={size} height={size} />
    </span>
  );
}

/** Lambang sesuai situs — dipakai Navbar/Footer agar tidak salah pasang. */
export function Mark({ site, size = 28, className }: { site: "showcase" | "profile"; size?: number; className?: string }) {
  return site === "profile"
    ? <RchibnuMark size={size} className={className} />
    : <AruthtaleMark size={size} className={className} />;
}
