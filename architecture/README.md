# Architecture — Arufolio

Dokumen teknis untuk monorepo Arufolio (dua situs: Showcase + Profile).

## Daftar Isi

| File | Isi |
|---|---|
| [01-SYSTEM-OVERVIEW.md](01-SYSTEM-OVERVIEW.md) | Gambaran sistem (level C4) |
| [02-MONOREPO-STRUCTURE.md](02-MONOREPO-STRUCTURE.md) | Struktur folder monorepo |
| [03-ROUTING-AND-IA.md](03-ROUTING-AND-IA.md) | Routing & information architecture |
| [04-DATA-ARCHITECTURE.md](04-DATA-ARCHITECTURE.md) | Model data (JSON schema) |
| [05-DNS-AND-DEPLOYMENT.md](05-DNS-AND-DEPLOYMENT.md) | Domain, DNS, Vercel |
| [06-ADR.md](06-ADR.md) | Architecture Decision Records |

## Diagram Sistem (ringkas)

```
                        ┌───────────────────────────────┐
                        │        Pengunjung (web)        │
                        └───────────────┬───────────────┘
                                        │ HTTPS
                 ┌──────────────────────┴──────────────────────┐
                 ▼                                              ▼
   ┌───────────────────────────┐                 ┌───────────────────────────┐
   │  Showcase  (Vercel #1)     │                 │  Profile   (Vercel #2)     │
   │  aruthtales.my.id          │◄─── link ──────►│  rchibnu.aruthtales.my.id  │
   └─────────────┬─────────────┘                 └─────────────┬─────────────┘
                 │                                             │
                 └───────────────┬─────────────────────────────┘
                                 ▼
                    ┌──────────────────────────┐
                    │   packages/ (shared)      │
                    │   • ui   (komponen)       │
                    │   • data (JSON konten)    │
                    │   • config (token, SEO)   │
                    └──────────────────────────┘
                                 ▲
                                 │ build-time import
                    ┌──────────────────────────┐
                    │   Satu repo (GitHub)      │
                    │   2 Vercel project        │
                    └──────────────────────────┘
```

**Kunci:** satu repo → dua deployment → berbagi `packages/ui` + `packages/data`.
