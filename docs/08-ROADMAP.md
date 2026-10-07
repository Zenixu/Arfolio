# Roadmap — Arufolio

> Pendekatan: **konten dulu, kode kemudian.** Situs sebagus apa pun tidak berarti tanpa isi.

## Fase 0 — Fondasi (1–2 hari)
- [ ] Kunci arah desain & pilih aksen warna (`04-DESIGN-SYSTEM.md`).
- [ ] Tentukan stack final (rekomendasi: Next.js + Tailwind + motion).
- [ ] Rapikan `data/aruthtales.json`, `data/rchibnu.json`, `data/certificates.json`, `data/projects.json`.
- [ ] Siapkan aset: foto, thumbnail, CV, logo.

## Fase 1 — Setup Monorepo (1–2 hari)
- [ ] `pnpm init`, workspaces, struktur `apps/*` + `packages/*`.
- [ ] Buat `packages/ui` (token, komponen dasar) & `packages/data`.
- [ ] Konfigurasi Tailwind + design token.
- [ ] Lint, Prettier, TypeScript strict.

## Fase 2 — Showcase MVP (3–5 hari)
- [ ] Layout + Navbar + Footer (shared).
- [ ] Home: Hero + Featured + CTA.
- [ ] `/work` daftar proyek (baca JSON).
- [ ] `/work/[slug]` detail (MDX).
- [ ] `/contact`.
- [ ] SEO dasar + responsif.

## Fase 3 — Profile MVP (2–4 hari)
- [ ] Home: Hero bio + timeline + preview sertifikat.
- [ ] `/certificates`, `/skills`, `/contact`.
- [ ] Download CV.
- [ ] SEO dasar + responsif.

## Fase 4 — Keterhubungan & Polish (2–3 hari)
- [ ] CTA silang Showcase ⇄ Profile di tempat strategis.
- [ ] Tema gelap/terang + persist.
- [ ] Animasi A1–A5 + A11 (`05-ANIMATION-GUIDE.md`).
- [ ] Aksesibilitas (kontras, keyboard, reduced-motion).

## Fase 5 — Deploy & Domain (1 hari)
- [ ] 2 project Vercel dari 1 repo (root directory berbeda).
- [ ] DNS: `aruthtales.my.id` + `rchibnu.aruthtales.my.id` (`05-DNS-AND-DEPLOYMENT.md`).
- [ ] Verifikasi HTTPS + redirect (www/apex).
- [ ] Sitemap, robots, analytics.

## Fase 6 — V1 (setelah live)
- [ ] OG image dinamis, JSON-LD, halaman sertifikat detail.
- [ ] Filter proyek + AutoAnimate.
- [ ] Animasi lanjutan (A6–A10, A12).
- [ ] Halaman Writing (opsional).

## Fase 7 — V2 (nanti)
- [ ] Versi EN (`/en`) + language switcher.
- [ ] Command palette, analytics lanjutan.
- [ ] Optimasi konten berkelanjutan.

## Definisi "Selesai" MVP
Kedua domain live, ≥ 5 proyek & data profil terisi, navigasi silang jalan, Lighthouse ≥ 95, aksesibilitas dasar lulus.
