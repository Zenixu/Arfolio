import { cn } from "../lib/cn";
import { TechIcon, hasTechIcon } from "./TechIcon";
import { AruthtaleMark } from "./Logo";

/**
 * ── Ouroboros ───────────────────────────────────────────────────────────────
 *
 * Tech stack sebagai SATU cincin yang berputar tanpa ujung — ulang tak
 * berkesudahan, bukan deretan yang berhenti di tepi. Ini bukan gaya baru yang
 * ditempel: halaman ini sudah punya bahasa "orbit" (SkillOrbit, SkillGlobe),
 * jadi cincin ini memakai mesin yang sama (putar pembungkus + rotasi-balik isi
 * supaya logo tidak ikut miring).
 *
 * Kenapa satu cincin (bukan ∞): dua loop yang berpotongan memaksa ikon
 * melintasi titik tengah dan saling bertabrakan; di CSS murni hasilnya hampir
 * selalu berantakan. Satu cincin tetap bermakna "tak berujung" dan bersih.
 *
 * Aturan geometri (sama seperti orbit): jarak antar-ikon = 2·r·sin(180/N).
 * Nilainya diatur lewat CSS (`--o-r`, `--o-face`) supaya mengecil di HP tanpa
 * JS — lihat tokens.css untuk perhitungannya.
 *
 * Nama teknologi muncul saat wajahnya disorot (cincin ikut berhenti), jadi
 * tidak ada info yang hilang walau label tidak ikut berputar.
 */
const DUR = 64; // detik per putaran penuh — lambat & tenang, tidak berebut fokus

export function Ouroboros({
  items, size = 22, className,
}: {
  items: string[]; size?: number; className?: string;
}) {
  const list = items.filter(hasTechIcon);
  const n = list.length || 1;

  return (
    <div className={cn("ouroboros", className)} role="group" aria-label="Tech stack">
      {/* Lintasan */}
      <span className="ouroboros__ring" aria-hidden="true" />

      {/* Inti: lambang aruthtale */}
      <span className="ouroboros__hub" aria-hidden="true">
        <AruthtaleMark size={38} />
      </span>

      {/* Satelit: logo-logo mengelilingi inti */}
      {list.map((name, i) => (
        <span
          key={name}
          className="ouroboros__orbit"
          style={{
            ["--a" as string]: `${(360 / n) * i}deg`,
            ["--dir" as string]: "1",
            ["--dur" as string]: `${DUR}s`,
          }}
        >
          <span className="ouroboros__face" role="img" aria-label={name}>
            {/* title dikosongkan supaya tidak ada tooltip ganda dengan label
                kustom di bawah; aksesibilitas dijaga oleh aria-label. */}
            <TechIcon name={name} size={size} title="" />
            <span className="ouroboros__tag">{name}</span>
          </span>
        </span>
      ))}
    </div>
  );
}
