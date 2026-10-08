# DEPLOY — Panduan Cepat

> Satu repo → dua situs. Cukup `git push`, Vercel urus sisanya.
> Dokumen arsitektur lengkap: [`architecture/05-DNS-AND-DEPLOYMENT.md`](architecture/05-DNS-AND-DEPLOYMENT.md)

---

## 1. Peta proyek

| Situs | App | Domain | Project Vercel | Root Directory |
|---|---|---|---|---|
| **Showcase** (karya) | `apps/showcase` | `aruthtales.my.id` | `arfolio` | `apps/showcase` |
| **Profile** (pribadi) | `apps/profile` | `rchibnu.aruthtales.my.id` | `arfolio-ri` | `apps/profile` |

- Repo: `git@github.com-zenixu:Zenixu/Arfolio.git` (branch produksi: `main`)
- Hosting: Vercel **Hobby** (gratis) · DNS: **Rumahweb** · SSL: otomatis

---

## 2. Update konten — 3 langkah

```bash
# 1. edit file yang perlu diubah (lihat tabel di bawah)

# 2. WAJIB: cek dulu di lokal sebelum push
pnpm -w typecheck
pnpm build

# 3. kirim
git add -A
git commit -m "content: deskripsi singkat"
git push origin main
```

Selesai. Buka **Vercel → Deployments** untuk melihat build berjalan.

### Di mana mengedit apa

| Mau ubah | File |
|---|---|
| Proyek (judul, peran, metrics, thumbnail) | `packages/data/src/projects.json` |
| Sertifikat | `packages/data/src/certificates.json` |
| Eksperimen / Lab | `packages/data/src/aruthtales.json` |
| Profil pribadi (bio, kontak) | `packages/data/src/rchibnu.json` |
| Teks halaman showcase | `apps/showcase/app/page.tsx` |
| Teks halaman profile | `apps/profile/app/page.tsx` |
| Domain / URL situs | `packages/config/src/site.ts` |
| Tampilan (warna, jarak, animasi) | `packages/ui/src/styles/tokens.css` |
| Komponen bersama | `packages/ui/src/components/` |

---

## 3. Apa yang ikut rebuild?

Vercel hanya membangun ulang yang **terpengaruh** perubahan:

| File yang diubah | Showcase | Profile |
|---|---|---|
| `apps/showcase/**` | ✅ | — |
| `apps/profile/**` | — | ✅ |
| `packages/ui/**` | ✅ | ✅ |
| `packages/data/**` | ✅ | ✅ |
| `packages/config/**` | ✅ | ✅ |
| root (`package.json`, lockfile) | ✅ | ✅ |

> **Sering terjadi:** mengedit `packages/data/src/projects.json` akan membangun ulang **kedua** situs. Itu normal — keduanya memakai data yang sama.

---

## 4. Yang TIDAK lewat git (atur di dashboard)

Ini tidak akan berubah walau kamu push:

- **Domain** — Vercel → Settings → Domains
- **DNS record** — Rumahweb → Manajemen DNS
- **Environment Variables** — Vercel → Settings → Environment Variables
- **Root Directory**, **Node version**, **Include files outside Root Directory** — Vercel → Settings

---

## 5. Kalau build gagal

**Situsmu TIDAK tumbang.** Vercel tetap menyajikan versi terakhir yang sukses.

1. Buka **Vercel → Deployments** → klik build yang merah → baca log
2. Perbaiki di lokal, lalu push lagi
3. Terburu-buru? Klik deployment lama → **Promote to Production** untuk kembali instan

---

## 6. Setelan Vercel yang WAJIB benar

Periksa sekali per project (jangan sampai lupa):

- [ ] **Root Directory** = `apps/showcase` / `apps/profile` — **bukan** root repo
- [ ] **Include source files outside of the Root Directory in the Build Step** = **ON**
      *(wajib: `packages/ui` ada di luar `apps/*`. Tanpa ini build gagal.)*
- [ ] Framework Preset = **Next.js**
- [ ] Install / Build Command = **default** (biarkan kosong)

---

## 7. DNS (Rumahweb)

| Type | Name | Value | Untuk |
|---|---|---|---|
| `A` | `@` | `216.198.79.1` | apex `aruthtales.my.id` |
| `CNAME` | `www` | `28457d76ff371e13.vercel-dns-017.com` | redirect → apex |
| `CNAME` | `rchibnu` | `e66e03ed75046839.vercel-dns-017.com` | profile |

**Aturan:**
- Nilai CNAME **selalu ambil dari Vercel** (tombol copy) — jangan ketik manual, string hex gampang salah.
- Apex **tidak boleh** CNAME → wajib **A record**.
- TTL **300** saat baru menambah record (cepat menyebar), lalu boleh dinaikkan.
- **Jangan** tambah `www.rchibnu...` — itu subdomain dari subdomain, tidak perlu.
- **Jangan** aktifkan wildcard `*.aruthtales.my.id` kecuali memang mau.

### Cek DNS dari terminal

```bash
dig +short aruthtales.my.id A
dig +short www.aruthtales.my.id CNAME
dig +short rchibnu.aruthtales.my.id CNAME
```

---

## 8. Kalau domain "tidak bisa dibuka" padahal sudah live

Hampir selalu **negative caching**, bukan kesalahan setting. Penyebabnya: saat record
belum ada, resolver internet mencatat *"tidak ada"* dan menyimpannya hingga **24 jam**
(SOA minimum TTL).

**Cek dulu — apakah situsnya benar-benar hidup?** (paksa lewat IP Vercel)

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  --resolve aruthtales.my.id:443:216.198.79.1 https://aruthtales.my.id/
# 200 = situs sehat, masalahnya cuma DNS lokalmu
```

**Solusi, urut dari yang paling ampuh:**

1. Ganti DNS perangkat/router ke `8.8.8.8` + `8.8.4.4` (Google sudah punya record baru)
2. Restart router (router punya cache sendiri)
3. Flush cache DNS:
   - Linux: `sudo resolvectl flush-caches`
   - Windows: `ipconfig /flushdns` (Administrator)
   - macOS: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
4. Tes dari **data seluler** — kalau bisa, berarti masalahnya di jaringan WiFi
5. Masih gagal? **Tunggu maksimal 24 jam.** Bersih sendiri.

---

## 9. Aturan emas

1. **Selalu `pnpm build` sebelum push** — menangkap error lebih awal daripada menunggu Vercel.
2. **Jangan commit rahasia** — pakai Environment Variables di Vercel.
3. **Satu perubahan, satu commit** — pesan commit jelas, gampang di-rollback.
4. **Edit konten → `packages/data`**, bukan hardcode di halaman.
5. **Domain & env itu setelan dashboard**, bukan kode — jangan cari di git.

---

## 10. Perintah harian

```bash
pnpm dev              # jalankan kedua situs (3000 showcase, 3001 profile)
pnpm dev:showcase     # hanya showcase
pnpm dev:profile      # hanya profile
pnpm -w typecheck     # cek tipe seluruh workspace
pnpm build            # build produksi kedua app
pnpm -w lint          # lint
```

> Sebelum `pnpm build`, **matikan dulu `pnpm dev`** dan hapus cache kalau build aneh:
> `rm -rf apps/*/.next`
