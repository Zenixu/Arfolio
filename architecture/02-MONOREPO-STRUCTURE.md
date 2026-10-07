# Monorepo Structure — Arufolio

## Struktur Folder (target)

```
Arufolio/
├── apps/
│   ├── showcase/                 # → aruthtales.my.id
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx          # Home
│   │   │   ├── work/
│   │   │   │   ├── page.tsx      # daftar proyek
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── components/
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   └── profile/                  # → rchibnu.aruthtales.my.id
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx          # Home/bio
│       │   ├── about/page.tsx    # timeline
│       │   ├── certificates/page.tsx
│       │   ├── skills/page.tsx
│       │   └── contact/page.tsx
│       ├── components/
│       ├── public/
│       └── package.json
│
├── packages/
│   ├── ui/                       # komponen & token bersama
│   │   ├── src/
│   │   │   ├── components/       # Navbar, Footer, Button, Tag, Card, Marquee...
│   │   │   ├── styles/tokens.css
│   │   │   └── index.ts
│   │   └── package.json
│   ├── data/                     # sumber konten tunggal
│   │   ├── src/
│   │   │   ├── aruthtales.json   # brand: identitas, filosofi, layanan
│   │   │   ├── rchibnu.json      # profil personal
│   │   │   ├── certificates.json # sertifikat & penghargaan
│   │   │   ├── projects.json     # karya/proyek
│   │   │   ├── schema.ts         # zod
│   │   │   └── index.ts
│   │   └── package.json
│   └── config/                   # konstanta & token
│       ├── src/
│       │   ├── site.ts           # nama, domain, sosial
│       │   └── seo.ts
│       └── package.json
│
├── content/                      # (opsional) case study MDX
│   └── work/
│       ├── proyek-a.mdx
│       └── proyek-b.mdx
│
├── Sertifikat/                   # PDF sertifikat & penghargaan (aset konten)
│   ├── dicoding-front-end-web-pemula.pdf
│   ├── dicoding-dasar-pemrograman-web.pdf
│   ├── dicoding-dasar-javascript.pdf
│   ├── dicoding-prinsip-solid.pdf
│   ├── dicoding-manajemen-proyek.pdf
│   ├── dicoding-financial-literacy.pdf
│   ├── uns-steam-fair-2024-juara-2.pdf
│   └── smkn1-cianjur-tangible-coding-2024.pdf
│
├── data/                         # (kini hanya _archive/ JSON mentah awal)
│
├── docs/                         # dokumentasi produk (folder ini)
├── architecture/                 # dokumentasi teknis
├── turbo.json                    # (opsional) Turborepo
├── pnpm-workspace.yaml
├── package.json
├── .gitignore
└── README.md
```

## `pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "packages/*"

allowBuilds:      # pnpm 11 (pengganti onlyBuiltDependencies)
  esbuild: true
  sharp: true
```

> **Catatan scaffold (pnpm 11):** setting build-script pindah dari field `pnpm` di `package.json` ke `allowBuilds` di `pnpm-workspace.yaml`. Field lama **diabaikan** dan memunculkan `ERR_PNPM_IGNORED_BUILDS`.

## Root `package.json` (skrip)

```json
{
  "name": "arufolio",
  "private": true,
  "scripts": {
    "dev:showcase": "pnpm --filter showcase dev",
    "dev:profile": "pnpm --filter profile dev",
    "build": "pnpm -r build",
    "lint": "pnpm -r lint",
    "typecheck": "pnpm -r typecheck"
  }
}
```

## Status Implementasi (scaffold)

Sudah dibuat & **build sukses**:

```
apps/showcase   → 17 halaman statis   (Next 15.5 · React 19 · Tailwind v4)
apps/profile    → 10 halaman statis   (tema Afterglow)
packages/data   → JSON + zod, validasi saat impor
packages/ui     → 11 komponen + tokens.css + afterglow.css
packages/config → identitas situs & navigasi
```

> **Catatan impor:** import relatif antar-file dalam `packages/*` **tanpa** akhiran `.js` (mis. `./schema`, bukan `./schema.js`) — bundler Next/webpack tidak me-resolve `.js` ke `.ts`. `packages/ui` mendeklarasikan `@arufolio/data` sebagai dependency karena mengimpor **tipe** darinya.

## Catatan Operasional

1. **Jangan jalankan `pnpm build` saat `pnpm dev` hidup.** Keduanya menulis ke `apps/<app>/.next` yang sama; build akan menghapus artefak dev dan semua rute dev balas **HTTP 500**. Hentikan dev dulu, `rm -rf apps/*/.next`, lalu jalankan ulang.
2. **Placeholder aset aman.** Komponen `Thumb` (`packages/ui`) menampilkan placeholder bila gambar 404, dengan pemeriksaan `complete && naturalWidth === 0` saat mount — karena `onError` tidak menyala untuk kegagalan yang terjadi sebelum hydrate. Jadi path thumbnail sudah boleh diisi di data walau file belum ada.
3. **Path aset proyek:** `apps/showcase/public/images/projects/<slug>/thumb.webp`. Sertifikat: `apps/profile/public/certificates/`.

## Aturan Monorepo

1. **`packages/data` adalah sumber tunggal konten.** Tidak ada teks proyek/profil di-hardcode di app.
2. **`packages/ui` tidak boleh mengimpor dari `apps/*`.** Arah dependensi satu arah: `apps → packages`.
3. **Setiap app punya `next.config.ts` sendiri** dengan `transpilePackages: ["ui","data","config"]`.
4. **Root directory Vercel** di-set ke `apps/showcase` dan `apps/profile` (lihat `05-DNS-AND-DEPLOYMENT.md`).
5. **Aset bersama** (logo, font) diletakkan di `packages/ui/assets` atau di-`public` masing-masing bila spesifik.
6. Nama paket pakai prefix `@arufolio/*` (mis. `@arufolio/ui`).

## Kenapa Monorepo (bukan 2 repo)

- Komponen & token **dijamin konsisten** (satu sumber).
- Perubahan lintas situs dalam **satu PR**.
- Deploy tetap terpisah (2 project Vercel) → tidak ada trade-off.
- Bila nanti ingin pisah repo, `packages/*` mudah di-ekstrak.
