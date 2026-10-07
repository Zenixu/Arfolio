import { cn } from "../lib/cn";
import { Mark } from "./Logo";
import { ArrowUpRight } from "./Icon";

/**
 * CrossLink — tombol lintas-situs yang "spesial".
 *
 * Dipakai untuk dua jalur penting: "Kenal Saya" (Showcase → Profile) dan
 * "Lihat Karya" (Profile → Showcase). Bukan tombol ghost biasa karena dua
 * hal ini adalah alasan utama orang menyeberang antar situs — jadi dibuat
 * seperti kartu kecil: lambang situs tujuan, judul, keterangan, dan panah.
 *
 * Detail gerak sengaja tipis: garis gradien di tepi kiri yang menyala saat
 * hover, kartu terangkat 2 px, panah bergeser keluar — tidak lebih.
 */
export function CrossLink({
  href, site, label, sub, className,
}: {
  href: string;
  site: "showcase" | "profile";
  label: string;
  sub?: string;
  className?: string;
}) {
  return (
    <a href={href} className={cn("crosslink group/cross", className)}>
      <span className="crosslink__mark">
        <Mark site={site} size={30} />
      </span>
      <span className="crosslink__text">
        <span className="crosslink__label">
          {label}
          <ArrowUpRight size={14} className="crosslink__arrow" />
        </span>
        {sub && <span className="crosslink__sub">{sub}</span>}
      </span>
    </a>
  );
}
