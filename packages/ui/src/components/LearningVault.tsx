"use client";

import { useEffect, useRef, useState } from "react";
import type { Lab } from "@arufolio/data";
import { cn } from "../lib/cn";
import { Thumb } from "./Thumb";
import { Tag } from "./Tag";
import { ArrowRight } from "./Icon";

/**
 * Learning Vault — "brankas arsip" yang membuka saat digulir.
 *
 * Kenapa bentuk ini, bukan kisi biasa atau orbit:
 * — nama bagiannya sendiri adalah *vault*; pintu brankas yang membuka
 *   mengubah label menjadi gerak, bukan sekadar judul.
 * — orbit sudah dipakai untuk keahlian di halaman profil; memakai pola yang
 *   sama dua kali justru melemahkan kesan "hal baru".
 * — thumbnail lab berbentuk lanskap 16:10. Kalau diputar kecil di orbit,
 *   isinya tak terbaca; di sini ia justru jadi isi brankas yang bisa dilihat.
 *
 * Prinsip yang sama dengan komponen lain di paket ini: tanpa JS tidak ada
 * pintu sama sekali (isi langsung terbaca), ada pengaman waktu kalau observer
 * tak menyala, dan semua gerak mati saat `prefers-reduced-motion`.
 */
export function LearningVault({
  items, total, href = "/lab", className,
}: {
  items: Lab[]; total: number; href?: string; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOpen(true); return; }

    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOpen(true); io.disconnect(); } },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);

    // Pengaman: apa pun yang terjadi, brankas terbuka <= 2,4 dtk.
    const safety = window.setTimeout(() => setOpen(true), 2400);

    return () => { io.disconnect(); window.clearTimeout(safety); };
  }, []);

  return (
    <div ref={ref} className={cn("vault", open && "is-open", className)}>
      {/* Panggung: pintu brankas hanya menutupi kisi entri, bukan tautan
          "Masuk vault" di bawahnya. */}
      <div className="vault__stage">
        <div className="vault__frame" aria-hidden="true">
          <div className="vault__door vault__door--top" />
          <div className="vault__door vault__door--bottom" />
          <div className="vault__dial">
            <i className="vault__dial-ring" />
            <i className="vault__dial-mark" />
            <i className="vault__dial-core" />
          </div>
          <span className="vault__plate">
            <i className="vault__dot" />
            Learning Vault · {String(total).padStart(2, "0")} entri
          </span>
        </div>

        <ul className="vault__grid">
          {items.map((it, i) => {
            const repo = it.links?.repo ?? undefined;
            const clickable = Boolean(repo) && !it.archived;

            const inner = (
              <>
                <span className="vault-item__media">
                  <Thumb
                    src={it.thumb}
                    alt={`Tangkapan layar ${it.title}`}
                    className="h-full w-full object-cover"
                  />
                  <span className="vault-item__no">{String(i + 1).padStart(2, "0")}</span>
                  {it.archived && <span className="vault-item__flag">arsip</span>}
                </span>
                <span className="vault-item__body">
                  <span className="vault-item__title">{it.title}</span>
                  <span className="vault-item__desc">{it.summary}</span>
                  <span className="vault-item__meta">
                    {it.tags.slice(0, 2).map((t) => <Tag key={t} tech>{t}</Tag>)}
                  </span>
                </span>
              </>
            );

            return (
              <li key={it.slug} className="vault__cell" style={{ ["--i" as string]: String(i) }}>
                {clickable ? (
                  <a className="vault-item" href={repo} target="_blank" rel="noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div
                    className="vault-item vault-item--locked"
                    aria-label={`${it.title} — ${it.archived ? "arsip, repo tidak lagi publik" : "tanpa tautan"}`}
                  >
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <a className="vault__more" href={href}>
        <span>Masuk vault</span>
        <span className="vault__more-n">{Math.max(0, total - items.length)} entri lain</span>
        <ArrowRight size={15} />
      </a>
    </div>
  );
}
