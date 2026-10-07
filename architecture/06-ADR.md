# Architecture Decision Records — Arufolio

Format: **ADR-NNN — Judul**. Status: Diterima / Diusulkan / Ditolak.

---

## ADR-001 — Satu repo, dua project Vercel (monorepo)
- **Status:** Diterima
- **Konteks:** Dua situs (Showcase & Profile) yang saling terhubung, ingin konsisten & mudah dirawat.
- **Keputusan:** Monorepo (`pnpm workspaces`) dengan `apps/showcase` & `apps/profile`, dibangun sebagai 2 project Vercel dari repo yang sama.
- **Konsekuensi:** (+) konsistensi & berbagi kode; (−) perlu konfigurasi root directory & `transpilePackages`.
- **Alternatif ditolak:** dua repo terpisah (kode tak bisa dibagi); satu project satu domain (kehilangan pemisahan peran).

## ADR-002 — Subdomain terpisah untuk Profile
- **Status:** Diterima
- **Konteks:** Ingin pemisahan "karya" vs "orang", tetapi tetap satu brand.
- **Keputusan:** `aruthtales.my.id` = Showcase (domain utama, SEO), `rchibnu.aruthtales.my.id` = Profile.
- **Konsekuensi:** (+) peran jelas, pengalaman "dua pintu masuk"; (−) subdomain lemah untuk SEO → konten kuat ditaruh di domain utama.

## ADR-003 — Konten sebagai data (JSON) + MDX
- **Status:** Diterima
- **Konteks:** Konten perlu sering diubah, tidak boleh tersebar di kode.
- **Keputusan:** `packages/data` sebagai sumber tunggal (JSON divalidasi zod) + MDX untuk case study.
- **Konsekuensi:** (+) mudah dirawat, build gagal bila data salah; (−) perlu menulis skema.

## ADR-004 — Profile MVP satu halaman
- **Status:** Diusulkan
- **Konteks:** Konten profil mungkin belum banyak di awal.
- **Keputusan:** Sementara gabung bio + timeline + preview sertifikat di `/`; `/about` di-redirect. Pisah lagi bila konten bertambah.
- **Konsekuensi:** (+) lebih cepat jadi, hindari halaman kosong; (−) bisa perlu refactor nanti.

## ADR-005 — Next.js sebagai framework
- **Status:** Diterima (dapat ditinjau)
- **Konteks:** Butuh SEO kuat, SSG, image optimization, ekosistem animasi React.
- **Keputusan:** Next.js 15 App Router + TypeScript + Tailwind.
- **Konsekuensi:** (+) fitur lengkap, SEO baik; (−) lebih berat dari Astro.
- **Alternatif:** Astro (lebih ringan, sangat cocok konten statis) — ditinjau bila prioritas utama adalah bobot minimum.

## ADR-006 — Animasi "tipis" dengan motion + CSS
- **Status:** Diterima
- **Konteks:** Ingin rasa hidup tanpa mengorbankan performa.
- **Keputusan:** `motion` (Framer Motion) + CSS; batas durasi & properti; hormati `prefers-reduced-motion`.
- **Konsekuensi:** (+) terasa halus & profesional; (−) perlu disiplin agar tidak berlebihan.

## ADR-007 — Tanpa database di MVP
- **Status:** Diterima
- **Konteks:** Konten statis, volume kecil, diubah jarang.
- **Keputusan:** Konten dari file di repo; tidak ada DB/CMS.
- **Konsekuensi:** (+) cepat, murah, aman; (−) update via Git (bukan UI admin).
- **Alternatif nanti:** headless CMS bila ingin edit via UI.

## ADR-008 — Tema gelap default
- **Status:** Diterima
- **Konteks:** Estetika developer, ingin kesan premium.
- **Keputusan:** Default gelap, opsi terang, disimpan di localStorage; hormati `prefers-color-scheme` saat pertama.
- **Konsekuensi:** (+) modern; (−) wajib uji kontras di kedua tema.

## ADR-009 — Karya dipisah: Real Projects vs Learning Vault
- **Status:** Diterima
- **Konteks:** Portofolio punya dua jenis karya: proyek nyata (bukti kemampuan) dan eksperimen/repo belajar (bukti konsistensi). Menggabung keduanya mencairkan kesan "karya nyata"; memisah total menyulitkan pemeliharaan.
- **Keputusan:** Satu file `projects.json` dengan field `type` (`"project"` | `"lab"`), ditampilkan di dua rute: `/work` (Real Projects) dan `/lab` (Learning Vault).
- **Konsekuensi:** (+) satu sumber data, dua tampilan, kesan tetap tajam; (−) skema & komponen harus menangani dua bentuk (diselesaikan dengan `discriminatedUnion` zod).
- **Alternatif ditolak:** satu daftar campur (kesan cair); dua file/dua skema terpisah (duplikasi, migrasi sulit).

## ADR-010 — Konten JSON diangkat ke `packages/data` (sumber tunggal)
- **Status:** Diterima
- **Konteks:** Saat scaffold, JSON sempat berada di `data/` di akar repo. Dua app butuh data yang sama (mis. `projects.json` dipakai showcase, profil memakai `certificates.json`).
- **Keputusan:** Semua JSON pindah ke `packages/data/src/`, diekspor lewat `@arufolio/data` dengan **validasi zod saat impor**. App hanya mengimpor dari paket, tidak membaca file JSON langsung.
- **Konsekuensi:** (+) satu sumber, tipe aman, data rusak langsung gagal saat build; (−) menambah satu paket & langkah `transpilePackages`.
- **Alternatif ditolak:** JSON tersebar di tiap app (duplikasi, mudah tidak sinkron); database (berlebihan untuk konten statis).

## ADR-011 — PDF sertifikat dikonversi ke WebP
- **Status:** Diterima
- **Konteks:** 8 sertifikat asli berupa PDF total ~7,1 MB. Menampilkan PDF langsung di kartu galeri berat dan buruk di mobile (butuh viewer, tidak bisa `loading="lazy"`).
- **Keputusan:** Render halaman 1 tiap PDF ke WebP pada 150 dpi — versi **full** (maks 1400 px) dan **thumb** (maks 700 px). File asli tetap disimpan di `Sertifikat/` sebagai arsip & tautan unduh.
- **Konsekuensi:** (+) galeri ringan & cepat, total turun ke **642 KB (hemat 91%)**; (−) perlu regenerasi bila sertifikat ditambah (skrip `pdftoppm` + `magick`).
- **Alternatif ditolak:** PDF langsung di `<iframe>` (berat, tidak konsisten antar browser); PNG (jauh lebih besar).
