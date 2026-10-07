"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "./Icon";

/**
 * Tombol ganti tema. Ikon yang tampil = tema yang akan DIPAKAI setelah diklik
 * (matahari saat gelap, bulan saat terang), sesuai konvensi umum.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  }

  const label = theme === "dark" ? "Ganti ke tema terang" : "Ganti ke tema gelap";

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="group/t grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      {/* render stabil sebelum hydrate agar tidak ada kedipan */}
      <span className="transition-transform duration-500 [transition-timing-function:var(--ease-spring)] group-hover/t:rotate-[35deg]">
        {!mounted ? <Moon size={16} /> : theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </span>
    </button>
  );
}
