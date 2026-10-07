"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";

type Variant = "up" | "mask" | "left" | "scale" | "line";

/**
 * Animasi reveal saat elemen masuk viewport.
 *
 * Prinsip penting: konten SELALU terlihat tanpa JS (kelas `.js` yang
 * mengaktifkan state tersembunyi). Jadi kalau skrip gagal, halaman tetap
 * terbaca — bukan kosong.
 */
export function Reveal({
  children, delay = 0, className, variant = "up", as: Tag = "div",
}: {
  children: ReactNode; delay?: number; className?: string;
  variant?: Variant; as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const variantClass = variant === "up" ? "reveal" : `reveal-${variant}`;

  const Component = Tag as unknown as React.ElementType;

  return (
    <Component
      ref={ref as React.Ref<never>}
      className={cn(variantClass, visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
