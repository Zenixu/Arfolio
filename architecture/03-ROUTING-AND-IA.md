# Routing & Information Architecture — Arufolio

## 1. Showcase — `aruthtales.my.id`

| Route | Halaman | Sumber data |
|---|---|---|
| `/` | Home (hero, featured, CTA) | `projects.json` (featured), `aruthtales.json` (brand) |
| `/work` | **Real Projects** — daftar karya nyata + filter | `projects.json` (type=project) |
| `/work/[slug]` | Detail proyek (case study) | `projects.json` + `content/work/[slug].mdx` |
| `/lab` | **Learning Vault** — eksperimen & repo belajar | `projects.json` (type=lab) |
| `/lab/[slug]` | Detail eksperimen (opsional) | `projects.json` (type=lab) |
| `/contact` | Kontak | `aruthtales.json` (kontak brand) |
| `/about` | Ringkas + link Profile (opsional) | `rchibnu.json` |
| `sitemap.xml`, `robots.txt` | SEO | generate |

> **Dua jenis karya:** `/work` menampilkan `type: "project"` (karya nyata, case study, metrics). `/lab` menampilkan `type: "lab"` (Learning Vault — eksperimen, repo belajar, jumlah commit). Satu file data, dua tampilan.

## 2. Profile — `rchibnu.aruthtales.my.id`

| Route | Halaman | Sumber data |
|---|---|---|
| `/` | Home (hero bio, ringkasan, CTA) | `rchibnu.json` |
| `/about` | Perjalanan/timeline | `rchibnu.json` (timeline) |
| `/certificates` | Galeri sertifikat | `certificates.json` |
| `/certificates/[id]` | Detail sertifikat (atau modal) | `certificates.json` |
| `/skills` | Skill & tools | `rchibnu.json` (skills) |
| `/contact` | Kontak | `rchibnu.json` (contact) |
| `sitemap.xml`, `robots.txt` | SEO | generate |

> **MVP simplification:** `/` Profile boleh langsung memuat bio + timeline + preview sertifikat (satu halaman), dan `/about` dialihkan ke `/`. Lihat ADR-004.

## 3. Aturan Navigasi Silang

| Dari | Ke | Pemicu |
|---|---|---|
| Showcase (footer & CTA hero) | `https://rchibnu.aruthtales.my.id` | "Siapa di balik ini?" |
| Showcase (akhir detail proyek) | Profile | "Kenali pembuatnya →" |
| Profile (footer & CTA hero) | `https://aruthtales.my.id` | "Lihat karya saya" |
| Profile (setelah sertifikat) | Showcase | "Lihat hasil kerjanya →" |

**Aturan:** setiap situs punya minimal **2 titik** menuju situs lain (hero + footer), agar keterhubungan terasa.

## 4. Navigasi (Navbar)

- **Showcase:** `Work` · `About` · `Contact` · [Profile ↗] · [Theme]
- **Profile:** `About` · `Certificates` · `Skills` · `Contact` · [Work ↗] · [Theme]
- Tombol silang (`↗`) selalu ada di navbar kedua situs.

## 5. Breadcrumb & Struktur URL

- URL deskriptif, huruf kecil, tanda hubung: `/work/sistem-absensi`.
- Detail proyek: breadcrumb `Home / Work / Nama Proyek`.
- Slug unik & stabil (jangan ubah setelah live, atau pasang redirect).

## 6. Redirect

| Dari | Ke | Kode |
|---|---|---|
| `www.aruthtales.my.id` | `aruthtales.my.id` | 308 |
| `aruthtales.my.id/about` (opsional) | `rchibnu.aruthtales.my.id` | 308 |

## 7. Peta Situs (visual)

```
aruthtales.my.id (Showcase)
├── /                 → Hero + Featured + CTA
├── /work             → daftar + filter
│   └── /work/[slug]  → case study  ──► Profile
├── /about            → ringkas      ──► Profile
└── /contact

rchibnu.aruthtales.my.id (Profile)
├── /                 → bio + timeline + sertifikat preview
├── /certificates     → galeri       ──► Showcase
├── /skills
└── /contact
```
