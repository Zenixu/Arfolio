# Arufolio

> Payung (umbrella) proyek portofolio **aruthtale** — satu brand, dua pintu masuk.

Arufolio adalah monorepo yang menampung **dua situs** yang saling terhubung:

| Situs | Domain | Peran | Fokus |
|---|---|---|---|
| **Showcase** | `aruthtales.my.id` | THE WORK | Aplikasi/karya, layanan, bukti teknis, demo, case study |
| **Profile** | `rchibnu.aruthtales.my.id` | THE PERSON | Bio, pengalaman, sertifikat, CV, kontak |

Situs utama (karya) ada di domain utama untuk alasan SEO; profil berada di subdomain sebagai pendukung kredibilitas.

> **Filosofi:** *"Proof, not promises."* — lihat `docs/10-BRAND-PHILOSOPHY.md`.

---

## Peta Dokumentasi

### `docs/` — Produk & Desain
| File | Isi |
|---|---|
| [01-PRD.md](docs/01-PRD.md) | Product Requirements Document lengkap |
| [02-PERSONA-USER-STORY.md](docs/02-PERSONA-USER-STORY.md) | Persona & user story |
| [03-CONTENT-STRATEGY.md](docs/03-CONTENT-STRATEGY.md) | Strategi konten & IA |
| [04-DESIGN-SYSTEM.md](docs/04-DESIGN-SYSTEM.md) | Arah desain, token (palet **indigo**), komponen |
| [05-ANIMATION-GUIDE.md](docs/05-ANIMATION-GUIDE.md) | Motion design + referensi animasi |
| [06-TECH-STACK.md](docs/06-TECH-STACK.md) | Pilihan teknologi |
| [07-SEO-A11Y-PERF.md](docs/07-SEO-A11Y-PERF.md) | SEO, aksesibilitas, performa |
| [08-ROADMAP.md](docs/08-ROADMAP.md) | Rencana fase pengerjaan |
| [09-REFERENCES.md](docs/09-REFERENCES.md) | Referensi & inspirasi |
| [10-BRAND-PHILOSOPHY.md](docs/10-BRAND-PHILOSOPHY.md) | Filosofi nama & makna aruthtale |
| [11-RCHIBNU-THEME-AFTERGLOW.md](docs/11-RCHIBNU-THEME-AFTERGLOW.md) | Tema personal Rchibnu — *Afterglow* |
| [12-LEARNING-VAULT.md](docs/12-LEARNING-VAULT.md) | Nama, penyajian & aturan halaman `/lab` (**Learning Vault**) |

### `architecture/` — Teknis
| File | Isi |
|---|---|
| [README.md](architecture/README.md) | Indeks arsitektur + diagram |
| [01-SYSTEM-OVERVIEW.md](architecture/01-SYSTEM-OVERVIEW.md) | Gambaran sistem (C4) |
| [02-MONOREPO-STRUCTURE.md](architecture/02-MONOREPO-STRUCTURE.md) | Struktur monorepo |
| [03-ROUTING-AND-IA.md](architecture/03-ROUTING-AND-IA.md) | Routing & information architecture |
| [04-DATA-ARCHITECTURE.md](architecture/04-DATA-ARCHITECTURE.md) | Model data (JSON schema) |
| [05-DNS-AND-DEPLOYMENT.md](architecture/05-DNS-AND-DEPLOYMENT.md) | Domain, DNS, Vercel |
| [06-ADR.md](architecture/06-ADR.md) | Architecture Decision Records |

### `packages/` — Kode bersama
| Paket | Isi |
|---|---|
| [`packages/data`](packages/data) | **Sumber konten tunggal** — JSON + skema zod + helper (`projects`, `lab`, `certificates`, `aruthtale`, `rchibnu`) |
| [`packages/ui`](packages/ui) | Komponen & token desain bersama (Navbar, Footer, Card, Tag, Button, Reveal, ThemeToggle) + `tokens.css` & `afterglow.css` |
| [`packages/config`](packages/config) | Identitas situs, domain, navigasi |

### `apps/` — Dua situs
| App | Domain | Rute |
|---|---|---|
| [`apps/showcase`](apps/showcase) | `aruthtales.my.id` | `/` · `/work` · `/work/[slug]` · `/lab` · `/contact` |
| [`apps/profile`](apps/profile) | `rchibnu.aruthtales.my.id` | `/` · `/about` · `/certificates` · `/skills` · `/contact` |

### Konten & aset
| Lokasi | Isi |
|---|---|
| [`packages/data/src/*.json`](packages/data/src) | `aruthtales` · `rchibnu` · `certificates` · `projects` · `account` |
| [`Sertifikat/`](Sertifikat) | 8 PDF asli (Dicoding, UNS, SMK N 1 Cianjur) |
| [`apps/profile/public/certificates/`](apps/profile/public/certificates) | 16 WebP hasil konversi PDF (full + thumb) — **642 KB** dari 7,1 MB |

---

## Status

| Aspek | Keadaan |
|---|---|
| Dokumentasi | ✅ 12 dokumen produk + 7 arsitektur |
| Data | ✅ JSON + skema zod, tervalidasi saat impor |
| Scaffold monorepo | ✅ pnpm workspaces, 2 app + 3 paket |
| Build | ✅ Showcase 17 halaman statis · Profile 10 halaman statis |
| Aset sertifikat | ✅ PDF → WebP (hemat 91%) |
| **Menunggu** | ⏳ logo, thumbnail 8 proyek, CV, live URL |

## Menjalankan

```bash
pnpm install
pnpm dev              # kedua situs sekaligus (showcase :3000, profile :3001)
pnpm dev:showcase     # hanya showcase
pnpm dev:profile      # hanya profile
pnpm build            # build keduanya
pnpm data:validate    # validasi semua JSON terhadap skema zod
```

## Langkah Berikutnya
1. **Logo** aruthtale & Rchibnu (indigo untuk brand, nuansa Afterglow untuk personal).
2. **Thumbnail 8 proyek** → taruh di `apps/showcase/public/images/projects/<slug>/thumb.webp`, lalu isi field `thumbnail`.
3. **Live URL** untuk proyek yang sudah deploy → isi `links.live` di `projects.json`.
4. **CV** (PDF) → taruh di `apps/profile/public/`, isi field `cv`.
5. **Case study MDX** untuk 5 proyek unggulan di `content/work/*.mdx`.
6. **Deploy ke Vercel**: 2 project, Root Directory `apps/showcase` & `apps/profile` (lihat `architecture/05-DNS-AND-DEPLOYMENT.md`).
