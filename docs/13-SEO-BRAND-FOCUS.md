# SEO — Fokus Brand (Arufolio)

> Audit publik, 22 Oktober 2026. Tidak ada file proyek yang diubah.
> Cakupan: `aruthtales.my.id` dan subdomain `rchibnu.aruthtales.my.id`.

## 1. Target

Prioritas bukan dulu mengejar kata kunci umum seperti "jasa website Cianjur".
Prioritas pertama: nama brand sudah muncul saat dicari.

Brand yang harus konsisten ditampilkan:

- `aruthtale` (brand/studio)
- `Rchibnu` (nama publik personal)
- `Ibnu Hambal Al Bantani Rch` (nama lengkap personal)

## 2. Hasil pemeriksaan publik

| Pemeriksaan | Hasil |
|---|---|
| Halaman utama domain utama | HTTP 200, HTTPS, HSTS aktif |
| Halaman utama subdomain | HTTP 200, HTTPS, HSTS aktif |
| DNS apex | A `216.198.79.1` |
| DNS `www` | CNAME Vercel |
| DNS `rchibnu` | CNAME Vercel |
| Robots | Mengizinkan crawler |
| Sitemap showcase | 11 URL |
| Sitemap profile | 5 URL |
| Canonical | Konsisten |
| OG + JSON-LD | Ada |
| Pencarian publik `aruthtale` | Tidak ada link situs |
| Pencarian publik `Rchibnu` | Tidak ada link situs |
| Pencarian publik `Ibnu Hambal` | Tidak ada link situs |

Kesimpulan: situs secara teknis sehat, tetapi belum ada bukti kuat bahwa Google sudah
menampilkan nama brand di hasil pencarian. Pencarian publik bukan pengganti URL Inspection
di Google Search Console, jadi status index definitif tetap harus dicek di GSC.

## 3. Temuan yang perlu diperbaiki

### A. Homepage domain utama belum menampilkan `aruthtale` pada `<h1>`

Pemeriksaan Googlebot terhadap `https://aruthtales.my.id/` menemukan teks `<h1>` hanya
`Work, not words.` Padahal `aruthtale` sudah kuat di title, JSON-LD, dan konten halaman.

Untuk pencarian nama brand, jangan mengganti seluruh hero dengan hanya kata brand.
Gunakan satu `<h1>` yang berisi `aruthtale` (misalnya `aruthtale — Work, not words.`),
lalu tetap pertahankan kalimat hero sebagai konteks. Hindari menambah H1 kedua.

### B. Homepage subdomain sudah menampilkan `Ibnu`, tetapi belum konsisten dengan nama publik

Homepage `rchibnu.aruthtales.my.id` saat ini memakai H1 `Hai, saya Ibnu`; nama lengkap
sudah tampil di bawahnya, dan JSON-LD memakai `Ibnu Hambal Al Bantani Rch`.

Untuk pencarian nama, gunakan satu H1 yang langsung menampilkan nama publik:
`Rchibnu` atau `Rchibnu — Ibnu Hambal Al Bantani Rch`. Ini membuat brand name ada di
title, H1, JSON-LD, dan tautan masuk dengan bentuk yang sama.

### C. Meta description beberapa halaman terlalu pendek

Contoh dari pemeriksaan HTML:

- `/work` — 63 karakter
- `/lab` — 69 karakter
- `/contact` — 42 karakter
- `/about` — 39 karakter
- `/certificates` — 44 karakter
- `/skills` — 47 karakter

Perbaiki menjadi 120–155 karakter dengan nama brand dan topik halaman, contoh:

```text
Karya aruthtale — aplikasi web, POS, SaaS, dan project nyata dari Fullstack Developer
Rchibnu di Cianjur, Indonesia.
```

### D. Sitemap profil belum punya halaman work/proyek

Sitemap showcase berisi proyek, tetapi sitemap profil hanya berisi profil.
Untuk pencarian nama, ini bisa diterima dulu, tetapi Google perlu melihat tautan dari
profil ke karya agar identitas personal dan brand terhubung.

## 4. Kerja minimum yang disarankan

1. Ubah homepage subdomain agar punya satu H1:
   `Rchibnu` atau `Ibnu Hambal Al Bantani Rch`.
2. Pastikan homepage domain utama tetap punya satu H1 brand `aruthtale`.
3. Samakan nama lengkap di title, JSON-LD, dan data profil:
   `Ibnu Hambal Al Bantani Rch`.
4. Perbaiki meta description halaman utama, work, lab, contact, about, certificates,
   dan skills agar memuat nama brand dan 120–155 karakter.
5. Kirim dua sitemap ke Google Search Console:
   - `https://aruthtales.my.id/sitemap.xml`
   - `https://rchibnu.aruthtales.my.id/sitemap.xml`
6. Pakai URL Inspection di GSC untuk memeriksa homepage domain dan subdomain,
   lalu Request Indexing untuk keduanya.
7. Ulangi permintaan index untuk halaman utama dan halaman work setelah perubahan
   benar-benar ter-deploy.
8. Beri backlink kecil dari profil GitHub/Instagram jika memungkinkan, tetapi jangan
   mengejar backlink spam.

## 5. Yang tidak boleh dijanjikan

Tidak ada cara sah untuk menjamin posisi pertama Google. Nama brand baru biasanya
lebih mungkin muncul daripada keyword umum, tetapi tetap butuh waktu crawl/index dan
bisa berubah tergantung lokasi, perangkat, dan personalisasi pencarian.

## 6. Status teknis

| Aspek | Status |
|---|---|
| Crawlability | Lolos |
| Indexability dasar | Lolos |
| Canonical | Lolos |
| Sitemap | Lolos |
| HTTPS/HSTS | Lolos |
| Structured data | Lolos |
| On-page brand signal | Perlu perbaikan kecil |
| Backlink | Belum ada bukti |
