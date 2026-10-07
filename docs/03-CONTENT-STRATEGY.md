# Strategi Konten & Information Architecture — Arufolio

## 1. Prinsip Konten

1. **Bukti > Klaim.** Tiap proyek tunjukkan hasil nyata (link live, metrik, tangkapan layar), bukan sekadar "saya bisa X".
2. **Sedikit tapi dalam.** 5 proyek dengan case study > 20 proyek tanpa cerita.
3. **Satu suara.** Bahasa konsisten (aku/we), tone percaya diri tapi tidak sombong.
4. **Konten sebagai data.** Semua teks terstruktur → file JSON (lihat `architecture/04-DATA-ARCHITECTURE.md`).
5. **Bahasa:** Indonesia sebagai utama; struktur disiapkan untuk EN menyusul.

## 2. Information Architecture (IA)

### Showcase — `aruthtales.my.id`
```
/                    Home (hero + featured + CTA profil)
/work                Real Projects — karya nyata (filter)
/work/[slug]         Detail proyek (case study)
/lab                 Learning Vault — eksperimen & repo belajar
/lab/[slug]          Detail eksperimen (opsional)
/about               Ringkasan singkat + link ke Profile  (opsional, ringkas)
/contact             Kontak
```

> **Real Projects vs Learning Vault:** karya dipisah jadi dua bagian agar kesan "bukti nyata" tidak cair oleh eksperimen. `/work` = kemampuan (`type: "project"`); `/lab` = konsistensi & pertumbuhan (`type: "lab"`). Satu file `projects.json`, dibedakan field `type`.

### Profile — `rchibnu.aruthtales.my.id`
```
/                    Home (hero bio + ringkasan + CTA karya)
/about               Perjalanan/timeline (umur, pengalaman)
/certificates        Galeri sertifikat
/certificates/[id]   Detail sertifikat (opsional, atau modal)
/skills              Skill & tools
/contact             Kontak
```
> `/` di Profile boleh digabung dengan `/about` bila kontennya sedikit (MVP). Lihat ADR-004.

## 3. Hierarki Konten Tiap Halaman

### Showcase — Home
1. **Hero:** headline value proposition + subheadline + 2 CTA ("Lihat Karya", "Kenal Saya").
2. **Featured Projects:** 3–5 kartu terbaik.
3. **Highlight Skills / Tools:** baris ikon/logo (marquee halus).
4. **CTA band:** "Punya proyek? / Ingin merekrut?" → contact.
5. **Footer:** navigasi + sosial + link ke Profile.

### Showcase — Detail Proyek (template case study)
1. Judul + tahun + peran + durasi.
2. Hero image / demo.
3. **Konteks** — proyek apa, untuk siapa.
4. **Masalah** — apa yang perlu dipecahkan.
5. **Pendekatan** — keputusan & proses (boleh poin).
6. **Stack** — teknologi.
7. **Hasil** — dampak, metrik, tangkapan layar.
8. **Link** — live + repo.
9. **Next/Prev project** + CTA profil.

### Profile — Home
1. **Hero:** foto, nama, peran, status, lokasi, CTA (Contact, CV).
2. **Bio singkat:** 2–3 paragraf.
3. **Timeline:** perjalanan singkat (umur/pengalaman).
4. **Certificates preview:** 3–4 terbaru → halaman lengkap.
5. **Skills:** kelompok (frontend, backend, tools, dsb).
6. **CTA band:** "Lihat karya saya" → Showcase.

## 4. Aturan Penulisan

- Headline < 8 kata, konkret ("Saya membangun aplikasi web yang cepat & rapi").
- Paragraf maks. 3 baris di layar desktop.
- Setiap proyek wajib punya minimal 1 gambar/demo.
- Sertifikat: nama, penerbit, tanggal, tautan verifikasi.
- Hindari jargon tanpa penjelasan bila audiens umum.

## 5. Aset Konten yang Perlu Disiapkan

| Aset | Keterangan | Prioritas |
|---|---|---|
| Foto profil | HD, latar netral | Must |
| Thumbnail proyek | 16:9, konsisten | Must |
| Screenshot/demo proyek | ≥ 2 per proyek | Must |
| CV (PDF) | 1 halaman | Must |
| Logo/brand mark | SVG | Should |
| Sertifikat (gambar/PDF) | + tautan verifikasi | Should |
| OG image | 1200×630 | Should |
| Favicon | SVG/ICO | Should |
| Ikon sosial | SVG | Should |
