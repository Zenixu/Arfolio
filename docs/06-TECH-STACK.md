# Tech Stack — Arufolio

> Prinsip: **modern, cepat, mudah dirawat, satu bahasa** untuk dua situs.

## 1. Rekomendasi Utama (Default)

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SSG/ISR, SEO, image, satu framework untuk 2 situs |
| Bahasa | **TypeScript** | Aman, DX baik |
| Styling | **Tailwind CSS v4** + CSS variables | Cepat, konsisten dengan design token |
| Animasi | **motion** (Framer Motion) + CSS | Lihat `05-ANIMATION-GUIDE.md` |
| Konten | **MDX** (case study) + JSON (data) | Fleksibel, tetap versioned di repo |
| Monorepo | **pnpm workspaces** (+ Turborepo opsional) | Berbagi `ui` & `data` |
| Hosting | **Vercel** (2 project) | Deploy otomatis, gratis SSL |
| Analytics | **Vercel Analytics** / **Plausible** (opsional) | Ringan, tanpa cookie berat |

## 2. Alternatif (sesuai selera)

- **Astro** — jika ingin output paling ringan & konten-sentris; island architecture. Sangat cocok untuk portofolio statis. Animasi tetap bisa dengan `motion`/CSS.
- **SvelteKit** — jika lebih suka Svelte; bundle kecil, DX bagus.
- **Vite + React** (SPA) — paling sederhana, tapi SEO lebih lemah (butuh prerender). Kurang disarankan untuk portofolio yang butuh SEO.
- **Nuxt** — jika ekosistem Vue.

> **Rekomendasi:** mulai dengan **Next.js + Tailwind + motion**. Jika ingin sesederhana mungkin dan fokus konten, **Astro** adalah pilihan sangat kuat.

## 3. Library Pendukung

| Kebutuhan | Library |
|---|---|
| Ikon | `lucide-react` / `@phosphor-icons/react` |
| Font | `next/font` (self-host Geist/Inter/JetBrains Mono) |
| MDX | `@next/mdx` atau `contentlayer`-style custom loader |
| Form kontak | Resend / Formspree / server action |
| OG image | `@vercel/og` (Satori) |
| Validasi data | `zod` (validasi JSON saat build) |
| Lint/format | ESLint + Prettier (+ `prettier-plugin-tailwindcss`) |
| Testing | Vitest + Playwright (opsional) |

## 4. Tooling & Konvensi

- **Node:** ≥ 20 (repo ini memakai Node 26).
- **Package manager:** `pnpm` (tersedia 11.x).
- **Struktur:** lihat `architecture/02-MONOREPO-STRUCTURE.md`.
- **Env:** `.env.local` untuk secret; jangan commit.
- **CI:** GitHub Actions (lint + typecheck + build) sebelum deploy.

## 5. Perintah Dasar (target)

```bash
pnpm install          # pasang semua dependency workspace
pnpm dev:showcase     # jalankan situs Showcase
pnpm dev:profile      # jalankan situs Profile
pnpm build            # build semua
pnpm lint             # lint semua
pnpm typecheck        # cek tipe
```
