"use client";

import { cn } from "../lib/cn";
import { TechIcon, hasTechIcon } from "./TechIcon";
import { RchibnuMark } from "./Logo";

/**
 * SkillGlobe — keahlian sebagai SATU tata surya, bukan enam kartu sebentuk.
 *
 * Kenapa dibuat: enam kartu orbit yang tingginya sama persis (378px) terbaca
 * sebagai pengulangan, dan ada kartu yang cincinnya kosong karena isinya
 * cuma 2 item (Mobile). Halaman depan juga jadi kembar dengan /skills,
 * sehingga tautan "Selengkapnya" tidak memberi apa pun yang baru.
 *
 * Di sini: satu globe memuat logo yang paling mewakili, lalu di bawahnya
 * enam pil kategori berangka yang menautkan ke /skills. Jadi halaman depan
 * memberi KESAN (satu visual tanda tangan) dan /skills memberi ISI
 * (rincian per kategori) — keduanya tidak lagi kembar.
 *
 * Semua gerak memakai CSS murni yang sudah ada (rotate pembungkus + rotasi
 * balik isi). Tanpa WebGL, tanpa dependensi baru.
 */

/** Logo yang paling mewakili — dipakai kalau memang ada di data. */
const PREFERRED = [
  "TypeScript", "React 19", "Next.js", "Tailwind CSS v4", "Node.js",
  "Laravel 12", "PostgreSQL", "Supabase", "Git", "Figma",
];

/** Batas jumlah logo di globe. Lebih dari ini cincin jadi kabut tak terbaca. */
const MAX = 10;

/** Jari-jari tiap lintasan memakai variabel CSS supaya bisa mengecil di HP
 *  tanpa mengubah JS. (Satuan WAJIB panjang — persen diresolusi terhadap
 *  induk berukuran 0 dan membuat semua ikon menumpuk di tengah.) */
const DURATIONS = [54, 44, 34];

export function SkillGlobe({
  groups,
  href = "/skills",
  className,
}: {
  groups: { name: string; items: string[] }[];
  href?: string;
  className?: string;
}) {
  const all = groups.flatMap((g) => g.items);

  // Ambil yang diutamakan, lalu lengkapi dengan sisa yang punya logo asli
  // (konsep seperti OOP/SOLID tidak punya logo, jadi tidak masuk globe).
  const featured = PREFERRED.filter((n) => all.includes(n));
  for (const n of all) {
    if (featured.length >= MAX) break;
    if (!featured.includes(n) && hasTechIcon(n)) featured.push(n);
  }

  // Sebar bergiliran ke tiga lintasan supaya jaraknya rata.
  const ringCount = featured.length <= 4 ? 1 : featured.length <= 7 ? 2 : 3;
  const buckets: number[][] = Array.from({ length: ringCount }, () => []);
  featured.forEach((_, i) => buckets[i % ringCount].push(i));

  const total = all.length;

  return (
    <div className={cn("globe-wrap", className)}>
      {/* Pembungkus ber-perspektif: memberi kedalaman (ikon di sisi jauh
          tampak sedikit lebih kecil). Bidang orbitnya dimiringkan di dalam. */}
      <div className="globe-3d">
        <div className="orbit-stage globe">
        {/* Lintasan */}
        {Array.from({ length: ringCount }).map((_, ri) => (
          <span
            key={ri}
            className="orbit-ring"
            aria-hidden="true"
            style={{ ["--r" as string]: `var(--globe-r${ri + 1})` }}
          />
        ))}

        {/* Inti: mark Rchibnu */}
        <span className="orbit-hub globe-hub" aria-hidden="true">
          <RchibnuMark size={34} />
        </span>

        {/* Satelit */}
        {buckets.map((bucket, ri) =>
          bucket.map((itemIndex, j) => {
            const name = featured[itemIndex];
            const angle = (360 / bucket.length) * j + ri * 24;
            const dir = ri % 2 === 0 ? 1 : -1;
            return (
              <span
                key={name}
                className="orbit-sat"
                style={{
                  ["--a" as string]: `${angle}deg`,
                  ["--r" as string]: `var(--globe-r${ri + 1})`,
                  ["--dur" as string]: `${DURATIONS[ri]}s`,
                  ["--dir" as string]: String(dir),
                }}
              >
                <span className="orbit-face" title={name} aria-label={name} role="img">
                  <TechIcon name={name} size={21} />
                </span>
              </span>
            );
          })
        )}
        </div>
      </div>

      {/* Enam pil kategori — inilah "isi" yang menaut ke rincian. */}
      <ul className="globe-pills">
        {groups.map((g) => (
          <li key={g.name}>
            <a className="globe-pill" href={href}>
              <span className="globe-pill__name">{g.name}</span>
              <span className="globe-pill__count">
                {String(g.items.length).padStart(2, "0")}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="globe-note">
        {featured.length} dari {total} teknologi di globe —{" "}
        <a href={href}>lihat rincian per kategori</a>.
      </p>
    </div>
  );
}
