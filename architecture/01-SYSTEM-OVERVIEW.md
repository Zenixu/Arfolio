# System Overview — Arufolio (C4)

## Level 1 — Context

```
┌──────────────┐     melihat      ┌────────────────────────────┐
│  Pengunjung   │ ───────────────► │  Arufolio (2 situs web)     │
│ (rekruter,    │                  │  Showcase + Profile         │
│  klien, dev)  │ ◄─────────────── │                            │
└──────────────┘     konten        └───────────┬────────────────┘
                                               │ membaca konten
                                               ▼
                                   ┌────────────────────────────┐
                                   │  Repo GitHub (sumber data)  │
                                   │  JSON + MDX                 │
                                   └────────────────────────────┘
```

**Aktor:** pengunjung. **Sistem:** dua situs statis. **Sumber data:** repo (build-time).

## Level 2 — Container

| Container | Teknologi | Tanggung jawab |
|---|---|---|
| Showcase app | Next.js (App Router) | Menyajikan karya & case study |
| Profile app | Next.js (App Router) | Menyajikan profil, sertifikat, CV |
| `packages/ui` | React + Tailwind | Komponen & token bersama |
| `packages/data` | JSON + TS types | Sumber tunggal konten |
| `packages/config` | TS | Token desain, konstanta SEO |
| Vercel | Platform | Build & hosting 2 project |
| DNS | Registrar/Vercel NS | Pemetaan domain & subdomain |

## Level 3 — Komponen (per app)

```
Showcase app
├── layout (Navbar, Footer, ThemeProvider)
├── pages: Home, Work, WorkDetail, Contact
└── components: ProjectCard, ProjectFilter, Hero, CTA

Profile app
├── layout (Navbar, Footer, ThemeProvider)  ← shared via ui
├── pages: Home, About/Timeline, Certificates, Skills, Contact
└── components: Timeline, CertificateCard, SkillGroup, Hero
```

## Alur Data

```
projects.json ─┐
rchibnu.json  ─┼─► packages/data (parse + validate zod) ─► apps (build) ─► HTML statis ─► Vercel CDN
certificates  ─┘
```

- **Build-time:** data divalidasi; error build bila skema salah.
- **Runtime:** tidak ada database; konten sudah jadi HTML.
- **Update konten:** edit JSON/MDX → push → Vercel redeploy otomatis.

## Non-Functional

- **Performa:** SSG, tanpa runtime DB → sangat cepat & murah.
- **Skalabilitas:** tidak relevan (statis); CDN menangani trafik.
- **Keamanan:** tidak ada input server di MVP (form kontak via layanan pihak ketiga).
- **Biaya:** Vercel Hobby gratis; domain tahunan.
