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

    let done = false;
    let raf = 0;

    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };

    const reveal = () => {
      if (done) return;
      done = true;
      setOpen(true);
      stop();
    };

    // Pemicu: titik tengah brankas mencapai titik tengah layar.
    //
    // Inilah yang membuat pintu terlihat membuka DARI TENGAH: saat puncak
    // animasi mulai, bagian tengah brankas (tempat kedua daun pintu bertemu
    // dan roda dial berada) tepat berada di tengah layar — sama perilakunya
    // di HP maupun di PC, karena keduanya memakai tinggi viewport.
    //
    // Perhitungan ini juga tahan terhadap elemen yang lebih tinggi daripada
    // layar (kisi asimetris bisa 1331px di layar 633px) — hal yang membuat
    // ambang persentase IntersectionObserver gagal sebelumnya.
    const check = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const viewportCenter = window.innerHeight / 2;

      // Sedikit toleransi supaya tepat di titik tengah pun sudah tersulut
      // (tanpa ini, pembulatan sub-piksel bisa membuatnya meleset 0,5px dan
      // pintu tidak pernah terbuka saat pengguna berhenti tepat di tengah).
      if (center <= viewportCenter + 2) { reveal(); return; }

      // Jaring terakhir: kalau halaman sudah di dasar tetapi tengah brankas
      // belum sempat mencapai tengah layar (mis. brankas di ujung halaman).
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom && r.top < window.innerHeight) reveal();
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();

    return stop;
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

        <ul className={cn("vault__grid", items.length % 2 === 1 && "vault__grid--odd")}>
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
