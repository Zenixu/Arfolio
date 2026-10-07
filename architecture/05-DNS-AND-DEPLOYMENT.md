# DNS & Deployment — Arufolio

## 1. Ringkasan

- **1 repo GitHub** → **2 project Vercel** (root directory berbeda).
- **2 domain**: `aruthtales.my.id` (Showcase) + `rchibnu.aruthtales.my.id` (Profile).
- HTTPS otomatis dari Vercel.

## 2. Setup di Vercel

### Project #1 — Showcase
1. New Project → import repo `arufolio`.
2. **Root Directory:** `apps/showcase`.
3. Framework preset: Next.js (auto). Build: `pnpm build` (sesuaikan).
4. Deploy.
5. Settings → Domains → tambah `aruthtales.my.id`.

### Project #2 — Profile
1. New Project → import repo yang **sama**.
2. **Root Directory:** `apps/profile`.
3. Deploy.
4. Settings → Domains → tambah `rchibnu.aruthtales.my.id`.

> Vercel menampilkan record DNS yang harus ditambahkan (biasanya CNAME ke `cname.vercel-dns.com`).

## 3. Konfigurasi DNS

### Opsi A — Kelola DNS di registrar (paling umum)
| Type | Name/Host | Value | Untuk |
|---|---|---|---|
| A | `@` | (IP dari Vercel) | apex `aruthtales.my.id` |
| CNAME | `www` | `cname.vercel-dns.com` | www |
| CNAME | `rchibnu` | `cname.vercel-dns.com` | subdomain Profile |

> Apex tidak boleh CNAME → pakai **A record** (Vercel memberi IP) atau **ALIAS/ANAME** bila didukung registrar.

### Opsi B — Nameserver Vercel
- Arahkan NS domain ke `ns1.vercel-dns.com` & `ns2.vercel-dns.com`.
- Kelola **semua** DNS dari dashboard Vercel (tambah domain + subdomain di sana).
- **Jangan campur** dengan record lama di registrar (NS mengalihkan seluruh DNS).

### Wildcard (opsional, hati-hati)
- Vercel: tambah `*.aruthtales.my.id` ke project tertentu.
- DNS: CNAME `*` → `cname.vercel-dns.com`.
- Konsekuensi: **semua** subdomain jadi valid. Hanya pakai bila memang mau.

## 4. Verifikasi

- Vercel menandai domain **Valid** setelah propagasi (menit–jam).
- Cek: `dig rchibnu.aruthtales.my.id CNAME +short`.
- Pastikan HTTPS aktif & redirect `www → apex`.

## 5. Redirect

- `www.aruthtales.my.id` → `aruthtales.my.id` (308).
- Bila perlu, `aruthtales.my.id/about` → `rchibnu.aruthtales.my.id`.

## 6. Environment & Deploy Flow

```
git push (branch main)
   │
   ▼
Vercel build (2 project, paralel)
   │  root: apps/showcase  → aruthtales.my.id
   │  root: apps/profile   → rchibnu.aruthtales.my.id
   ▼
Preview per PR  +  Production per merge ke main
```

- **Preview deployments** tiap PR (URL unik) untuk review.
- **Production** dari branch `main`.

## 7. Checklist Deploy

- [ ] Repo terhubung ke 2 project Vercel.
- [ ] Root directory masing-masing benar.
- [ ] `transpilePackages` mencakup `@arufolio/*`.
- [ ] DNS: apex (A) + www (CNAME) + `rchibnu` (CNAME).
- [ ] Kedua domain "Valid" + HTTPS aktif.
- [ ] Redirect www → apex jalan.
- [ ] `sitemap.xml` + `robots.txt` dapat diakses.
- [ ] Environment variables (bila ada, mis. API form) di-set.

## 8. Biaya

| Item | Perkiraan |
|---|---|
| Vercel Hobby | Gratis |
| Domain `.my.id` | ~Rp15.000–25.000/tahun |
| Subdomain | Gratis |
