# SEO, Aksesibilitas & Performa — Arufolio

## 0. Status implementasi (yang SUDAH terpasang di kode)

| Elemen | Showcase | Profile | File |
|---|---|---|---|
| `sitemap.xml` | ✅ 12 URL | ✅ 5 URL | `app/sitemap.ts` |
| `robots.txt` | ✅ | ✅ | `app/robots.ts` |
| `canonical` | ✅ semua halaman | ✅ semua halaman | `app/**/page.tsx` (`alternates`) |
| `metadataBase` | ✅ | ✅ | `app/layout.tsx` |
| Title ber-kata kunci | ✅ | ✅ | `packages/config/src/site.ts` |
| `keywords` + `robots` googleBot | ✅ | ✅ | `app/layout.tsx` |
| **OG image dinamis (PNG)** | ✅ + per proyek | ✅ | `app/opengraph-image.tsx` |
| **JSON-LD** | `WebSite` `Organization` `ProfessionalService` + `BreadcrumbList` `SoftwareApplication` (proyek) | `WebSite` `Organization` `Person` | `app/layout.tsx`, `work/[slug]/page.tsx` |

**Pembangun JSON-LD:** `packages/config/src/jsonld.ts`
(`websiteSchema`, `personSchema`, `serviceSchema`, `breadcrumbSchema`, `softwareSchema`, `socialSameAs`)
**Komponen render:** `packages/ui/src/components/JsonLd.tsx` (escape `<` → `\u003c`).

### Yang HARUS dilakukan di luar kode (dashboard)
1. **Google Search Console** — verifikasi domain, kirim `sitemap.xml`, klik *Request Indexing*.
   Ini pengungkit terbesar untuk situs baru; tanpa ini Google hanya menebak.
2. **Bing Webmaster Tools** — impor dari GSC, satu klik.
3. **Redirect `arfolio-eta.vercel.app`** → `aruthtales.my.id` (Vercel → Settings → Domains)
   supaya tidak ada konten kembar yang bersaing.

### Jebakan yang sudah dihindari
- **`og:image` tidak boleh WebP** — Facebook/LinkedIn/WhatsApp menolaknya. Karena itu
  OG image dibuat PNG dinamis via `next/og`, bukan memakai thumbnail `.webp`.
- **Satori (next/og) mewajibkan `display: flex`** pada SETIAP `<div>`, termasuk yang
  berisi satu potong teks. Teks gabungan harus ditulis sebagai satu string
  (`` {`${a} · ${b}`} ``), bukan potongan bersebelahan — kalau tidak, build gagal.

## 1. SEO

### Struktur domain
- **Domain utama** `aruthtales.my.id` = konten terkuat (karya). Google memperlakukan subdomain hampir seperti situs terpisah.
- **Subdomain** `rchibnu.` = profil; tetap diberi metadata lengkap dan saling tautkan.
- Tambahkan **canonical** di setiap halaman.
- Sitemap terpisah per situs + `robots.txt`.

### On-page
- `title` unik & deskriptif (≤ 60 karakter).
- `meta description` menarik (≤ 155 karakter).
- Satu `h1` per halaman, hierarki heading rapi.
- **Open Graph + Twitter Card** tiap halaman (OG image dinamis).
- **JSON-LD:** `Person` (Profile), `WebSite` + `CreativeWork`/`SoftwareApplication` (proyek).
- URL bersih & deskriptif (`/work/nama-proyek`).

### Konten
- Teks unik & bermakna (hindari lorem).
- Alt text deskriptif pada gambar proyek.
- Internal linking kuat (Showcase ⇄ Profile).

### Ekspektasi realistis
- **Pencarian nama merek** (`aruthtale`, `rchibnu`) → bisa peringkat 1 karena tidak ada pesaing.
- **Pencarian umum** (`fullstack developer cianjur`) → butuh 1–3 bulan + backlink; bukan hasil instan.


## 2. Aksesibilitas (WCAG 2.2 AA)

- **Kontras:** teks ≥ 4.5:1, besar ≥ 3:1.
- **Keyboard:** semua fungsi bisa diakses tanpa mouse; focus ring terlihat.
- **Semantik:** elemen HTML benar (`nav`, `main`, `section`, `button`).
- **ARIA** hanya bila perlu; utamakan HTML semantik.
- **Motion:** hormati `prefers-reduced-motion`.
- **Form:** label jelas, pesan error deskriptif.
- **Media:** alt text; video tanpa autoplay bersuara.
- **Target sentuh** ≥ 44×44px.
- Uji dengan **axe DevTools** & navigasi keyboard.

## 3. Performa

### Target (Core Web Vitals)
| Metrik | Target |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| Lighthouse | ≥ 95 (semua kategori) |

### Teknik
- **Static-first** (SSG) — portofolio jarang berubah.
- Gambar: `next/image`/`<Image>` → format AVIF/WebP, `sizes`, lazy load.
- Font: `next/font`, `display: swap`, preload font utama.
- JS: minimalkan, code-split, hindari library berat.
- Animasi: hanya `transform`/`opacity`.
- Cache: header immutable untuk aset statis.
- Uji di **throttle 4× CPU** + Slow 4G.

## 4. Checklist Rilis

- [ ] Lighthouse ≥ 95 di kedua domain.
- [ ] Semua gambar punya alt.
- [ ] Meta + OG + canonical di tiap halaman.
- [ ] `sitemap.xml` + `robots.txt` ada.
- [ ] JSON-LD valid (uji di Rich Results Test).
- [ ] Navigasi keyboard lulus.
- [ ] `prefers-reduced-motion` dihormati.
- [ ] Tidak ada error console.
