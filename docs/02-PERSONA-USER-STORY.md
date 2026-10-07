# Persona & User Story — Arufolio

## 1. Persona

### P1 — Rekha, Rekruter Teknologi
- **Tujuan:** menilai kandidat dengan cepat sebelum wawancara.
- **Perilaku:** scan 30–60 detik, cari bukti karya + kredibilitas, sering dari mobile.
- **Kebutuhan:** ringkasan jelas, proyek nyata, CV sekali klik, kontak mudah.
- **Frustrasi:** portofolio penuh teks tanpa hasil nyata; tidak ada link live/repo.

### P2 — Dimas, Calon Klien / Kolaborator
- **Tujuan:** memastikan orang ini bisa mewujudkan idenya.
- **Perilaku:** lihat kualitas karya, cara berpikir, kecepatan situs (sebagai sinyal skill).
- **Kebutuhan:** case study (masalah→solusi→hasil), demo live, kontak.
- **Frustrasi:** hanya mockup tanpa penjelasan; situs berat/berantakan.

### P3 — Sari, Sesama Developer
- **Tujuan:** menilai kualitas teknis, ingin belajar dari kode.
- **Perilaku:** buka DevTools, cek repo, lihat stack & arsitektur.
- **Kebutuhan:** link repo, stack jelas, aksesibilitas & performa bagus.
- **Frustrasi:** animasi berlebihan, aksesibilitas diabaikan.

### P4 — Bayu, Pengunjung Umum
- **Tujuan:** kepo "siapa orang ini", mungkin dari media sosial.
- **Perilaku:** membaca profil, melihat foto, cek sosial.
- **Kebutuhan:** halaman profil yang ramah, menarik, cepat.
- **Frustrasi:** jargon teknis tanpa konteks manusia.

---

## 2. User Story

### Showcase
- **US-S1** — Sebagai rekruter, saya ingin melihat daftar proyek unggulan di halaman depan, **agar** saya cepat menilai kualitas kandidat.
- **US-S2** — Sebagai klien, saya ingin membuka detail satu proyek, **agar** saya paham masalah yang dipecahkan dan hasilnya.
- **US-S3** — Sebagai developer, saya ingin menuju repo/demo live proyek, **agar** saya bisa memeriksa kodenya.
- **US-S4** — Sebagai pengunjung, saya ingin memfilter proyek berdasarkan teknologi, **agar** saya hanya melihat yang relevan.
- **US-S5** — Sebagai rekruter, saya ingin tahu siapa orang di balik karya ini, **agar** saya bisa menilai kredibilitasnya → klik ke Profile.

### Profile
- **US-P1** — Sebagai pengunjung umum, saya ingin membaca bio singkat & perjalanan, **agar** saya mengenal orangnya.
- **US-P2** — Sebagai rekruter, saya ingin melihat sertifikat & pengalaman, **agar** saya yakin akan kredibilitasnya.
- **US-P3** — Sebagai rekruter, saya ingin mengunduh CV, **agar** saya bisa memprosesnya.
- **US-P4** — Sebagai klien, saya ingin melihat karya setelah membaca profil, **agar** saya menilai kemampuannya → klik ke Showcase.

### Bersama
- **US-C1** — Sebagai pengunjung mobile, saya ingin situs tetap nyaman & cepat, **agar** saya tidak menunggu.
- **US-C2** — Sebagai pengunjung, saya ingin mode gelap/terang, **agar** nyaman sesuai preferensi.
- **US-C3** — Sebagai pengguna keyboard, saya ingin bisa menavigasi tanpa mouse, **agar** situs dapat diakses semua orang.

---

## 3. Perjalanan Pengguna (ringkas)

**Jalur A — "Karya dulu" (rekruter/klien):**
Landing Showcase → Hero (value prop) → Featured Projects → Detail Proyek → CTA "Siapa di balik ini?" → Profile → CV/Contact.

**Jalur B — "Orang dulu" (dari sosmed):**
Landing Profile → Bio & timeline → Sertifikat → CTA "Lihat karya saya" → Showcase → Proyek → Contact.

**Jalur C — "Cek teknis" (developer):**
Landing → repo/demo → DevTools (aksesibilitas & performa).

---

## 4. Prioritas (MoSCoW)

| Prioritas | Item |
|---|---|
| **Must** | FR-S1..S4, FR-P1..P5, FR-C1..C4, navigasi silang |
| **Should** | Filter proyek (FR-S3), animasi halus, OG dinamis |
| **Could** | Halaman Writing, command palette, versi EN |
| **Won't (kini)** | CMS admin, e-commerce, 3D berat |
