"use client";

import {
  useEffect, useRef, useState, type ReactNode, type CSSProperties,
} from "react";
import { cn } from "../lib/cn";

/* ------------------------------------------------------------------ *
 * useInView — satu observer sederhana, dipakai ulang banyak komponen.
 * ------------------------------------------------------------------ */
function useInView<T extends HTMLElement>(threshold = 0.15, once = true) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setInView(true); if (once) io.disconnect(); }
        else if (!once) setInView(false);
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return { ref, inView };
}

/* ------------------------------------------------------------------ *
 * SpotlightCard — sorot gradien mengikuti kursor (dribbble-style).
 * Hanya 1 variabel CSS yang di-update lewat rAF; tidak memicu re-render.
 * ------------------------------------------------------------------ */
export function SpotlightCard({
  children, className, as: Tag = "div", ...rest
}: {
  children: ReactNode; className?: string; as?: "div" | "article" | "li" | "a";
} & React.HTMLAttributes<HTMLElement> & { href?: string; target?: string; rel?: string }) {
  const ref = useRef<HTMLElement>(null);
  const raf = useRef(0);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }

  return (
    <Tag ref={ref as React.Ref<never>} onMouseMove={onMove} className={cn("spotlight", className)} {...rest}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * ScrollProgress — garis kemajuan baca di paling atas.
 * ------------------------------------------------------------------ */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="progress-bar" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ *
 * CursorDot — titik kursor yang membesar saat melewati elemen interaktif.
 * Dimatikan otomatis di perangkat sentuh & saat reduced-motion.
 * ------------------------------------------------------------------ */
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y, raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      el.style.transform = `translate3d(${cx - 4}px, ${cy - 4}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement)?.closest?.("a,button,[data-cursor]");
      el.classList.toggle("cursor-dot--lg", Boolean(t));
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="cursor-dot" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ *
 * Marquee — deretan item berjalan; berhenti saat disentuh kursor.
 * `items` digandakan supaya loop mulus (translate -50%).
 * ------------------------------------------------------------------ */
export function Marquee({
  children, duration = 38, className,
}: { children: ReactNode; duration?: number; className?: string }) {
  return (
    <div className={cn("marquee", className)} style={{ ["--marquee-dur" as string]: `${duration}s` }}>
      <div className="marquee__track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
      <div className="marquee__fade marquee__fade--l" aria-hidden="true" />
      <div className="marquee__fade marquee__fade--r" aria-hidden="true" />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * CountUp — angka berhitung naik saat masuk viewport.
 * ------------------------------------------------------------------ */
export function CountUp({
  to, duration = 1200, suffix = "", className,
}: { to: number; duration?: number; suffix?: string; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);           // easeOutCubic
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref} className={cn("mono-num", className)}>{n}{suffix}</span>;
}

/* ------------------------------------------------------------------ *
 * TiltCard — sedikit kemiringan 3D mengikuti kursor.
 * ------------------------------------------------------------------ */
export function TiltCard({
  children, className, max = 5, style,
}: { children: ReactNode; className?: string; max?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  function onMove(e: React.MouseEvent) {
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
  }
  function onLeave() {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  }
  return (
    <div
      ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={style}
      className={cn("transition-transform duration-300 [transition-timing-function:var(--ease-out)] [transform-style:preserve-3d]", className)}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * SkillBar — bilah keahlian yang tumbuh saat terlihat.
 * ------------------------------------------------------------------ */
export function SkillBar({ value = 1, delay = 0 }: { value?: number; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={cn("skill-bar", inView && "is-visible")}>
      <i style={{ transform: inView ? `scaleX(${value})` : undefined, transitionDelay: `${delay}ms` }} />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * useScrollY — nilai gulir yang di-throttle lewat rAF.
 * Dipakai beberapa komponen; tidak ada listener per-elemen.
 * ------------------------------------------------------------------ */
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => { raf = 0; setY(window.scrollY); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return y;
}

/* ------------------------------------------------------------------ *
 * Parallax — elemen bergeser lebih lambat/cepat dari gulir.
 * `speed` positif = tertinggal (terasa jauh), negatif = mendahului.
 * Ditulis ke transform via CSS var supaya tetap di compositor.
 * ------------------------------------------------------------------ */
export function Parallax({
  children, speed = 0.12, className,
}: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(2)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return <div ref={ref} className={cn("will-change-transform", className)}>{children}</div>;
}

/* ------------------------------------------------------------------ *
 * TextReveal — judul muncul kata demi kata.
 *
 * PELAJARAN PENTING (bug nyata): versi pertama memakai `overflow:hidden`
 * pada pembungkus kata. Kalau animasinya tidak pernah jalan — JS gagal,
 * React belum hydrate, atau observer tidak menyala — teks TERTUTUP
 * SELAMANYA dan halaman tampak kosong. Dua kesalahan yang diperbaiki:
 *   1. Teks SELALU terlihat tanpa JS (state tersembunyi hanya via .js).
 *   2. Ada pengaman waktu: apa pun yang terjadi, teks muncul <= 1,8 dtk.
 * `overflow:clip` + ruang ekstra di bawah supaya ekor huruf (p, y, g)
 * tidak terpotong — penyebab "Proof, not promises" terlihat terpangkas.
 * ------------------------------------------------------------------ */
export function TextReveal({
  text, children, className, delay = 0, stagger = 55, as: Tag = "span",
}: {
  text?: string; children?: ReactNode; className?: string;
  delay?: number; stagger?: number;
  as?: "span" | "h1" | "h2" | "p" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOn(true); return; }

    let done = false;
    const reveal = () => { if (!done) { done = true; setOn(true); } };

    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { reveal(); io.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }
    );
    io.observe(el);

    // Pengaman: kalau observer tak pernah menyala, tetap tampilkan.
    const safety = window.setTimeout(reveal, 1800);

    return () => { io.disconnect(); window.clearTimeout(safety); };
  }, []);

  const content = text ?? children;
  const words = typeof content === "string" ? content.split(" ") : null;
  const Component = Tag as unknown as React.ElementType;

  // Konten non-teks: tidak perlu animasi per kata, cukup tampil.
  if (!words) {
    return <Component ref={ref as React.Ref<never>} className={className}>{content}</Component>;
  }

  return (
    <Component ref={ref as React.Ref<never>} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="word-mask" data-reveal={on ? "on" : "off"}>
          <span className="word-inner" style={{ transitionDelay: `${delay + i * stagger}ms` }}>
            {w}
          </span>
          {i < words.length - 1 && <span className="word-gap"> </span>}
        </span>
      ))}
    </Component>
  );
}

/* ------------------------------------------------------------------ *
 * StickyStack — daftar kartu yang menumpuk saat digulir (sticky pin).
 * Anak-anaknya diberi `top` bertingkat supaya terlihat seperti tumpukan.
 * ------------------------------------------------------------------ */
export function StickyStack({
  children, className, offset = 96, step = 18,
}: { children: ReactNode[]; className?: string; offset?: number; step?: number }) {
  return (
    <div className={cn("relative", className)}>
      {children.map((child, i) => (
        <div
          key={i}
          className="sticky"
          style={{ top: `${offset + i * step}px` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * ScrollTicker — garis kata berjalan yang kecepatannya ikut gulir.
 * Memberi "napas" pada halaman tanpa animasi yang mengganggu.
 * ------------------------------------------------------------------ */
export function ScrollTicker({
  children, className, baseSpeed = 0.4,
}: { children: ReactNode; className?: string; baseSpeed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useScrollY();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.style.transform = `translate3d(${(-y * baseSpeed).toFixed(1)}px, 0, 0)`;
  }, [y, baseSpeed]);
  return (
    <div ref={ref} className={cn("will-change-transform", className)} aria-hidden="true">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * ScrollSweep — pita yang MENYAPU: masuk dari kiri saat bagiannya
 * muncul, lalu melaju ke kanan seiring gulir (bukan loop, bukan ikut
 * gulir linier). Progres gulir dipetakan ke satu kali lintasan penuh.
 *
 * Dua hal yang membuatnya enak dilihat:
 *  1. Isi digandakan beberapa kali (di pemanggil) sehingga LEBIH lebar
 *     dari layar. Dengan begitu, selama pita terlihat, layar selalu
 *     tertutup isi — tidak pernah ada celah kosong di tengah.
 *  2. Ada MARGIN ekstra (`--sweep-margin`, kelipatan tinggi layar) di
 *     luar pandangan. Progres baru mulai/habis di luar margin itu, jadi
 *     fase "pita masih di luar layar" terjadi saat bagiannya memang
 *     belum/kembali tak terlihat. Tanpa margin ini, pita melintas
 *     terlalu cepat dan sisi kosongnya terlihat lama.
 * ------------------------------------------------------------------ */
export function ScrollSweep({
  children, className, margin = 0,
}: { children: ReactNode; className?: string; margin?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const row = inner.firstElementChild as HTMLElement | null;
      const W = row ? row.scrollWidth : inner.scrollWidth;
      const vw = window.innerWidth;

      if (reduce) {
        // Tanpa gerak: tahan di posisi yang menutup layar penuh.
        inner.style.transform = "translate3d(0,0,0)";
        return;
      }

      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const E = vh * margin;
      const total = vh + r.height + 2 * E;
      // p=0 saat pita masih E di bawah layar, p=1 saat sudah E di atasnya.
      const p = total > 0 ? Math.max(0, Math.min(1, (vh + E - r.top) / total)) : 0;

      // Tepi kanan tepat di tepi kiri layar (masuk) → tepi kiri tepat di
      // tepi kanan layar (keluar).
      const from = -W;
      const to = vw;
      const x = from + (to - from) * p;
      inner.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
    };

    update();
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [margin]);

  return (
    <div ref={wrapRef} className={cn("overflow-hidden", className)} aria-hidden="true">
      <div ref={innerRef} className="will-change-transform">{children}</div>
    </div>
  );
}

export { useInView };
