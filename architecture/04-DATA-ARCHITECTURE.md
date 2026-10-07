# Data Architecture — Arufolio

> **Sumber tunggal kebenaran (single source of truth):** folder `data/`. Tidak ada konten di-hardcode di app.

## 1. Prinsip

- Konten = data terstruktur (JSON), divalidasi dengan **zod** saat build.
- Case study panjang = **MDX** (kaya format), frontmatter-nya bagian dari data.
- Bila skema salah → build gagal (mencegah situs rusak).
- **Dua "dunia" dipisah**: `aruthtales.json` (brand/Showcase) vs `rchibnu.json` (personal/Profile).

## 2. Struktur Folder Data (aktual)

```
data/
├── aruthtales.json      # brand aruthtale: identitas, filosofi, layanan, kontak
├── rchibnu.json         # profil personal: bio, pengalaman, timeline, skills, kontak, tema Afterglow
├── certificates.json    # daftar sertifikat & penghargaan
├── projects.json        # daftar proyek/karya
└── account.json         # registry akun (brand & personal)
```

> Saat scaffold monorepo, folder ini diangkat menjadi `packages/data/` (lihat `02-MONOREPO-STRUCTURE.md`). Struktur & isinya tidak berubah — hanya lokasinya.

## 3. `aruthtales.json` — brand & filosofi

```jsonc
{
  "brand": {
    "name": "aruthtale",
    "handle": "aruthtale",
    "tagline": "Proof, not promises.",
    "domain": "aruthtales.my.id",
    "description": "...",
    "logo": null,               // menyusul
    "logoNote": "Logo aruthtale & Rchibnu menyusul."
  },
  "philosophy": {
    "summary": "...",
    "nameOrigin": { "full": "aruthtale", "parts": ["Arsene","Rue","Hyacinth","Tale"], "explanation": "..." },
    "elements": [
      { "element": "Arsene (Ar)",   "symbol": "...", "meaning": "..." },
      { "element": "Rue (Ru)",      "symbol": "...", "meaning": "..." },
      { "element": "Hyacinth (Th)", "symbol": "...", "meaning": "..." },
      { "element": "Tale",          "symbol": "...", "meaning": "..." }
    ],
    "statement": "Kami tidak menjual janji, kami menulis kisah — lalu membuktikannya lewat karya."
  },
  "services": [
    { "slug": "portfolio", "name": "Portfolio Website", "description": "..." }
  ],
  "contact": { "email": null, "github": null, "_note": "..." }
}
```

**Catatan filosofi:** "aruthtale" = gabungan **Ar**sene + **Ru**e + **Hyacinth** + **Tale**. Lihat penjelasan lengkap di `docs/10-BRAND-PHILOSOPHY.md`.

## 4. `rchibnu.json` — profil personal

```jsonc
{
  "identity": {
    "fullName": "Ibnu Hambal Al Bantani Rch",
    "displayName": "Ibnu Hambal",
    "handle": "rchibnu",
    "brand": "aruthtale",
    "role": "Fullstack Developer",
    "headline": "...",
    "age": 17,
    "location": "Cianjur, Jawa Barat, Indonesia",
    "status": "Sedang PKL di PT ASQI Digital Innovation",
    "photo": null,
    "logo": null
  },
  "bio": { "short": "...", "paragraphs": ["..."] },
  "interests": ["Teknologi", "Artificial Intelligence", "Web Development", "Automation"],
  "education": { "school": "...", "major": "...", "grade": "...", "status": "..." },
  "experience": [
    { "type": "internship", "role": "...", "organization": "...", "period": "...", "current": true, "description": "..." }
  ],
  "timeline": [
    { "year": "2024", "title": "...", "detail": "..." }
  ],
  "skills": { "groups": [ { "name": "Frontend", "items": ["..."] } ] },
  "contact": { "email": "maybe4zen@gmail.com", "github": "https://www.github.com/Zenixu", "instagram": "https://www.instagram.com/zennrch" },
  "theme": {
    "name": "Afterglow",
    "concept": "quiet introspection",
    "sequence": ["Indigo","Wisteria","Fox","Autumn","Drizzle","Mirror","Ramen","Afterglow"],
    "core": ["Mirror", "Afterglow"],
    "palette": { "accent": "#E3A57C", "wisteria": "#B79CE0", "mirror": "#9AA6B2", "ramen": "#F3E7D6" }
  },
  "cv": null,
  "cvNote": "CV (PDF) menyusul."
}
```

> **Tema Afterglow:** `rchibnu.json` membawa objek `theme` berisi 8 metafora (Indigo→Afterglow) dengan inti **Mirror + Afterglow**. Detail lengkap di `docs/11-RCHIBNU-THEME-AFTERGLOW.md`.

## 5. `account.json` — registry akun

```jsonc
{
  "brand":    { "label": "aruthtale", "handle": "aruthtale", "email": "aruthtale@gmail.com", "instagram": "...", "github": "..." },
  "personal": { "label": "Rchibnu",    "handle": "zennrch",  "email": "maybe4zen@gmail.com",  "instagram": "...", "github": "..." }
}
```

> Sumber tunggal untuk email & tautan sosial. `brand` dipakai Showcase, `personal` dipakai Profile. Nilai ini disalin ke `contact` di `aruthtales.json` & `rchibnu.json` (boleh juga dibaca langsung dari `account.json`).

## 6. `certificates.json`

Sertifikat asli disimpan sebagai **PDF** di folder `Sertifikat/`, dirujuk lewat field `file`.

```jsonc
[
  {
    "id": "dicoding-front-end-web-pemula",
    "title": "Belajar Membuat Front-End Web untuk Pemula",
    "issuer": "Dicoding Indonesia",
    "credentialId": "6RPN7Y609X2M",
    "date": "2026-04-15",
    "validUntil": "2029-04-15",
    "durationHours": 45,
    "type": "course",              // "course" | "award"
    "skills": ["DOM", "BOM", "Event", "Web Storage"],
    "file": "Sertifikat/dicoding-front-end-web-pemula.pdf",
    "image": "/certificates/dicoding-front-end-web-pemula.webp",
    "thumb": "/certificates/dicoding-front-end-web-pemula-thumb.webp",
    "verifyUrl": "https://www.dicoding.com/certificates/6RPN7Y609X2M",
    "featured": true
  }
]
```

**Daftar sertifikat saat ini (8):**

| ID | Judul | Penerbit | Tanggal | Tipe |
|---|---|---|---|---|
| `dicoding-front-end-web-pemula` | Belajar Membuat Front-End Web untuk Pemula | Dicoding | 2026-04-15 | course |
| `dicoding-dasar-pemrograman-web` | Belajar Dasar Pemrograman Web | Dicoding | 2026-04-02 | course |
| `dicoding-dasar-javascript` | Belajar Dasar Pemrograman JavaScript | Dicoding | 2026-04-30 | course |
| `dicoding-prinsip-solid` | Belajar Prinsip Pemrograman SOLID | Dicoding | 2026-04-06 | course |
| `dicoding-manajemen-proyek` | Belajar Dasar Manajemen Proyek | Dicoding | 2026-04-02 | course |
| `dicoding-financial-literacy` | Introduction to Financial Literacy | Dicoding × DBS | 2026-01-14 | course |
| `uns-steam-fair-2024` | Juara II — STEAM Fair Computational Thinking 2024 | UNS Surakarta | 2024-09-30 | award |
| `smkn1-tangible-coding-2024` | Tangible Coding Tournament 2024 | SMK N 1 Cianjur | 2024-09-30 | award |

> **Field `type`:** `course` (kelas/sertifikasi) vs `award` (penghargaan/kompetisi). Award punya field tambahan `award`/`role`.
> **Field `featured`:** 5 sertifikat ditandai unggulan untuk ditampilkan di preview halaman.

## 7. `projects.json`

Satu file, **dua tipe**: `type: "project"` (Real Projects → `/work`) dan `type: "lab"` (Learning Vault → `/lab`).

### Real Project (`type: "project"`)
```jsonc
[
  {
    "slug": "sistem-absensi",
    "type": "project",
    "title": "Sistem Absensi Sekolah",
    "summary": "Absensi berbasis QR untuk 800 siswa.",
    "year": 2025,
    "role": "Fullstack Developer",
    "duration": "3 bulan",
    "category": "web",
    "tags": ["Next.js", "PostgreSQL", "Prisma"],
    "featured": true,
    "thumbnail": "/images/projects/absensi/thumb.webp",
    "gallery": ["/images/projects/absensi/1.webp"],
    "links": { "live": "https://...", "repo": "https://github.com/..." },
    "metrics": [{ "label": "Siswa", "value": 800 }],
    "body": "content/work/sistem-absensi.mdx"
  }
]
```

### Lab / Learning Vault (`type: "lab"`)
```jsonc
{
  "slug": "express-learning",
  "type": "lab",
  "title": "Express.js Learning",
  "summary": "REST API & backend service pakai Express.js + Node.",
  "year": 2026,
  "tags": ["Express", "Node.js"],
  "featured": false,
  "links": { "repo": "https://github.com/..." },
  "commits": 225,
  "activity": "2026"
}
```

### Perbandingan field

| Field | `project` | `lab` |
|---|---|---|
| `type` | **wajib** = `"project"` | **wajib** = `"lab"` |
| `role`, `duration`, `category` | wajib | — |
| `thumbnail`, `gallery`, `metrics`, `highlights`, `body` | ada | — |
| `commits`, `activity` | — | ada |
| `featured` | untuk halaman depan | boleh |
| Tampil di | `/work` | `/lab` |

> **Naik kelas:** saat eksperimen matang, cukup ubah `type` dari `"lab"` → `"project"` dan lengkapi field-nya.
> Saat ini `projects.json` berisi 1 contoh tiap tipe. Ganti dengan proyek nyata.

## 8. Skema Validasi (contoh `schema.ts`)

```ts
import { z } from "zod";

// Tipe bersama
const Base = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  year: z.number(),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
  links: z.object({
    live: z.string().url().nullable().optional(),
    repo: z.string().url().nullable().optional(),
  }),
});

// Real Project → /work
export const ProjectSchema = Base.extend({
  type: z.literal("project"),
  role: z.string(),
  duration: z.string().optional(),
  category: z.string(),
  thumbnail: z.string(),
  gallery: z.array(z.string()).default([]),
  metrics: z.array(z.object({ label: z.string(), value: z.number() })).default([]),
  highlights: z.array(z.string()).default([]),
  body: z.string().optional(),
});

// Learning Vault → /lab
export const LabSchema = Base.extend({
  type: z.literal("lab"),
  commits: z.number().default(0),
  activity: z.string().optional(),
});

// Satu file, dua tipe
export const WorkItemSchema = z.discriminatedUnion("type", [ProjectSchema, LabSchema]);

export const CertificateSchema = z.object({
  id: z.string(),
  title: z.string(),
  issuer: z.string(),
  credentialId: z.string().nullable().optional(),
  date: z.string(),                 // YYYY-MM-DD
  validUntil: z.string().nullable().optional(),
  type: z.enum(["course", "award"]),
  award: z.string().optional(),
  role: z.string().optional(),
  skills: z.array(z.string()).default([]),
  file: z.string(),                 // path ke PDF
  verifyUrl: z.string().url().nullable().optional(),
  featured: z.boolean().default(false),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Lab = z.infer<typeof LabSchema>;
export type WorkItem = z.infer<typeof WorkItemSchema>;
export type Certificate = z.infer<typeof CertificateSchema>;
```

## 9. Alur Data

```
packages/data/src/*.json + Sertifikat/*.pdf
apps/profile/public/certificates/*.webp
      │
      ▼  (build-time, zod validate)
   apps/*  ──► generateStaticParams() ──► HTML statis ──► Vercel CDN
```

## 10. Aturan

1. **Jangan** menulis teks proyek/profil langsung di komponen.
2. Slug / id **unik** dan stabil.
3. Sertifikat PDF: path relatif dari root repo (`Sertifikat/...`). Bila di-`public`, sesuaikan path.
4. Gambar proyek pakai path absolut dari `public/`.
5. Tambah field baru = update zod + semua entri (build akan menolak bila tak sesuai).
6. Data disimpan di Git → riwayat perubahan konten terjaga.
7. Field bernilai `null` = **belum diisi** (ditampilkan sebagai "menyusul" / disembunyikan), bukan dihapus.
