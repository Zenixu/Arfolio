"use client";

import type { ComponentType } from "react";
import { cn } from "../lib/cn";
import { TechIcon, hasTechIcon } from "./TechIcon";
import {
  Cube, Kanban, Key, Network, Cpu, Workflow,
  Code, Server, Smartphone, Wrench, Sparkle, Layers,
} from "./Icon";

/**
 * SkillOrbit — keahlian ditampilkan sebagai tata surya, bukan kotak grid.
 *
 * Kenapa dibuat: deretan kartu berisi daftar nama terasa datar dan "polos".
 * Di sini tiap kategori menjadi inti (hub), dan tiap teknologi mengorbit
 * mengelilinginya pada satu dari tiga lintasan. Ikonnya logo asli, jadi
 * "Next.js" benar-benar menampilkan logo Next.js.
 *
 * Semua gerak memakai CSS murni (rotate pada pembungkus + rotasi balik pada
 * isi supaya ikon tidak ikut miring). Tidak ada WebGL, tidak ada dependensi
 * baru, dan saat kursor berhenti di atasnya orbit berhenti agar bisa dibaca.
 */

type IconCmp = ComponentType<{ size?: number; className?: string }>;

/** Ikon untuk kategori. */
const CATEGORY_ICON: Record<string, IconCmp> = {
  frontend: Code,
  backend: Server,
  mobile: Smartphone,
  konsep: Cube,
  tools: Wrench,
  "sedang dipelajari": Sparkle,
  lainnya: Layers,
};

/** Ikon untuk keahlian tanpa logo resmi (OOP, SOLID, RBAC, …). */
const CONCEPT_ICON: Record<string, IconCmp> = {
  oop: Cube,
  "prinsip solid": Cube,
  "manajemen proyek": Kanban,
  "rbac & auth": Key,
  rbac: Key,
  "computational thinking": Network,
  ai: Cpu,
  automation: Workflow,
};

/** Jari-jari lintasan (rem) — harus satuan panjang, lihat catatan CSS. */
const RADII = [3.2, 4.8, 6.1];
/** Durasi putar per lintasan (detik) — makin luar makin lambat. */
const DURATIONS = [46, 38, 30];

export function SkillOrbit({
  groups, className,
}: {
  groups: { name: string; items: string[] }[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {groups.map((g, gi) => {
        const Hub = CATEGORY_ICON[g.name.trim().toLowerCase()] ?? Layers;
        const count = g.items.length;
        // 1–3 item: satu lintasan. 4–6: dua. Lebih: tiga.
        const ringCount = count <= 3 ? 1 : count <= 6 ? 2 : 3;

        // Sebar item bergiliran ke tiap lintasan supaya jaraknya rata.
        const buckets: number[][] = Array.from({ length: ringCount }, () => []);
        g.items.forEach((_, i) => buckets[i % ringCount].push(i));

        return (
          <article
            key={g.name}
            className="card group/card relative flex flex-col items-center overflow-hidden p-6 pb-7"
          >
            {/* Kepala kartu */}
            <div className="flex w-full items-center justify-between gap-3">
              <h2 className="mono-label inline-flex items-center gap-2">
                <span className="text-[var(--accent)]"><Hub size={13} /></span>
                {g.name}
              </h2>
              <span className="index-num">{String(gi + 1).padStart(2, "0")}</span>
            </div>

            {/* Panggung orbit */}
            <div className="orbit-stage mt-6">
              {/* Lintasan (cincin) */}
              {Array.from({ length: ringCount }).map((_, ri) => (
                <span
                  key={ri}
                  className="orbit-ring"
                  aria-hidden="true"
                  style={{ ["--r" as string]: `${RADII[ri]}rem` }}
                />
              ))}

              {/* Inti: ikon kategori */}
              <span className="orbit-hub" aria-hidden="true">
                <Hub size={22} />
              </span>

              {/* Satelit */}
              {buckets.map((bucket, ri) =>
                bucket.map((itemIndex, j) => {
                  const name = g.items[itemIndex];
                  const angle = (360 / bucket.length) * j + ri * 26;
                  const dur = DURATIONS[ri];
                  const dir = ri % 2 === 0 ? 1 : -1;
                  const Concept = CONCEPT_ICON[name.trim().toLowerCase()];
                  const hasLogo = hasTechIcon(name);
                  return (
                    <span
                      key={name}
                      className="orbit-sat"
                      style={{
                        ["--a" as string]: `${angle}deg`,
                        ["--r" as string]: `${RADII[ri]}rem`,
                        ["--dur" as string]: `${dur}s`,
                        ["--dir" as string]: String(dir),
                      }}
                    >
                      <span className="orbit-face" title={name} aria-label={name} role="img">
                        {hasLogo ? (
                          <TechIcon name={name} size={17} />
                        ) : Concept ? (
                          <Concept size={16} className="text-[var(--text-muted)]" />
                        ) : (
                          <span className="font-mono text-[9px] uppercase text-[var(--text-muted)]">
                            {name.slice(0, 3)}
                          </span>
                        )}
                      </span>
                    </span>
                  );
                })
              )}
            </div>

            {/* Nama tetap terbaca — orbit untuk kesan, daftar untuk isi */}
            <p className="mt-6 text-center text-[0.8125rem] leading-relaxed text-[var(--text-muted)]">
              {g.items.join(" · ")}
            </p>
          </article>
        );
      })}
    </div>
  );
}
