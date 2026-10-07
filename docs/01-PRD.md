# PRD — Arufolio (aruthtale Portfolio)

- **Status:** Draft v1.0
- **Owner:** Zenixu (rchibnu)
- **Brand:** aruthtale
- **Domain:** `aruthtales.my.id` + `rchibnu.aruthtales.my.id`
- **Hosting:** Vercel

---

## 1. Ringkasan

Arufolio adalah portofolio pribadi yang dibangun sebagai **satu brand dengan dua situs**:

1. **Showcase** (`aruthtales.my.id`) — etalase karya: aplikasi, proyek, eksperimen, disertai case study.
2. **Profile** (`rchibnu.aruthtales.my.id`) — profil personal: umur, perjalanan, pengalaman, sertifikat, skill, CV.

Keduanya berbagi identitas visual, komponen, dan sumber data yang sama, lalu saling menautkan.

## 2. Latar Belakang / Masalah

- Portofolio yang cuma daftar skill + CV kurang meyakinkan; rekruter/klien ingin melihat **bukti karya**.
- Mencampur "karya" dan "tentang saya" dalam satu halaman panjang membuat keduanya tenggelam.
- Perlu tempat yang menampilkan **kredibilitas personal** (sertifikat, pengalaman, perjalanan) tanpa mengganggu presentasi karya.

## 3. Tujuan (Goals)

| # | Tujuan | Indikator keberhasilan |
|---|---|---|
| G1 | Menampilkan karya dengan jelas & meyakinkan | ≥ 5 proyek unggulan dengan case study |
| G2 | Membangun kredibilitas personal | Halaman sertifikat + timeline pengalaman + CV |
| G3 | Menghubungkan karya ⇄ orang | Setiap situs punya CTA silang yang jelas |
| G4 | Tampil profesional & cepat | Lighthouse ≥ 95 (Perf/A11y/BP/SEO) |
| G5 | Mudah dirawat | Konten dari file data, bukan hard-code |

## 4. Non-Goals (di luar cakupan)

- Bukan blog/CMS berat (maks. 1 halaman "Writing" opsional nanti).
- Bukan toko/e-commerce.
- Bukan dashboard admin (konten dikelola via repo).
- Tidak mengejar efek 3D/WebGL berat di versi awal.
- Belum multi-bahasa penuh (EN menyusul, lihat Roadmap).

## 5. Target Pengguna

Lihat `02-PERSONA-USER-STORY.md`. Ringkas:
- **Rekruter / HR** — ingin cepat menilai kemampuan & kredibilitas.
- **Calon klien / kolaborator** — ingin lihat hasil kerja & cara kerja.
- **Sesama developer** — ingin lihat kualitas teknis & repo.
- **Pengunjung umum/kuriositas** — ingin tahu "siapa orang ini".

## 6. Metrik Keberhasilan (Success Metrics)

- **Kualitatif:** pengunjung paham "siapa & bisa apa" dalam < 30 detik.
- **Kuantitatif:**
  - Bounce rate halaman karya < 55%.
  - ≥ 30% pengunjung berpindah antar situs (Showcase ⇄ Profile) — mengukur keterhubungan.
  - ≥ 1 klik "Contact" / "Download CV" per sesi dari pengunjung referal.
  - Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.

## 7. Lingkup & Prioritas

### MVP (wajib)
- Showcase: Home + **Real Projects** (`/work`) + halaman detail proyek + **Learning Vault** (`/lab`).
- Profile: Home/bio + pengalaman + sertifikat + kontak + CV.
- Navigasi silang antar situs.
- Responsif, dark/light, SEO dasar, deploy di 2 domain.

### V1 (setelah MVP)
- Halaman "Skills" interaktif, filter kategori proyek, halaman sertifikat detail.
- Animasi halus (scroll reveal, marquee, hover) — lihat `05-ANIMATION-GUIDE.md`.
- Open Graph image dinamis, sitemap, JSON-LD.

### V2 (nanti)
- Versi EN (`/en`), halaman Writing, analytics, command palette.

## 8. Functional Requirements

### FR — Showcase (`aruthtales.my.id`)
- **FR-S1** Hero dengan value proposition (bukan cuma nama) + CTA "Lihat karya".
- **FR-S2** **Real Projects** (`/work`): daftar karya nyata (kartu: thumbnail, judul, tag, tahun).
- **FR-S3** Filter/sort proyek berdasarkan kategori/tag/teknologi.
- **FR-S4** Halaman detail proyek dengan struktur: Konteks → Masalah → Pendekatan → Stack → Hasil → Link (live/repo).
- **FR-S5** **Learning Vault** (`/lab`): eksperimen & repo belajar (judul, tags, jumlah commit, aktivitas).
- **FR-S6** CTA silang ke Profile ("Siapa di balik ini?").
- **FR-S7** Kontak (email + sosial).

### FR — Profile (`rchibnu.aruthtales.my.id`)
- **FR-P1** Hero: nama, peran, foto, status, lokasi.
- **FR-P2** Bio ringkas + perjalanan (timeline umur/pengalaman).
- **FR-P3** Galeri sertifikat (klik → lihat credential/issuer/tanggal).
- **FR-P4** Skill & tools (dikelompokkan).
- **FR-P5** Download CV.
- **FR-P6** CTA silang ke Showcase ("Lihat karya saya").

### FR — Bersama
- **FR-C1** Navbar & footer konsisten (brand aruthtale).
- **FR-C2** Tema gelap/terang.
- **FR-C3** Responsif mobile-first.
- **FR-C4** Konten dibaca dari `packages/data` (JSON), bukan hard-code.

## 9. Batasan (Constraints)

- Hosting di Vercel (Hobby/Pro). 2 project dari 1 repo.
- Domain `.my.id` dikelola di registrar; DNS bisa di registrar atau Vercel NS.
- Konten statis (tanpa database) di MVP.

## 10. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Konten tidak siap → situs kosong | Isi data JSON dulu (lihat `04-DATA-ARCHITECTURE.md`) |
| Dua situs jadi tidak konsisten | Design system & komponen bersama (`packages/ui`) |
| Subdomain lemah untuk SEO | Konten kuat di domain utama; subdomain pendukung |
| Animasi berlebihan → lambat | Motion budget + `prefers-reduced-motion` (`05-ANIMATION-GUIDE.md`) |
| Over-engineering | MVP dulu, V1/V2 menyusul |

## 11. Kriteria Penerimaan (Acceptance Criteria)

- [ ] Kedua domain live dengan HTTPS.
- [ ] Setiap situs punya minimal 1 CTA yang mengarah ke situs lain.
- [ ] Semua proyek & data profil berasal dari file JSON di `packages/data`.
- [ ] Lighthouse ≥ 95 di kedua situs.
- [ ] Lulus uji aksesibilitas dasar (keyboard nav, kontras AA).
- [ ] Tampil baik di 360px, 768px, 1440px.
