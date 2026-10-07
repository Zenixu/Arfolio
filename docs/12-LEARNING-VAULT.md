# Learning Vault — Nama, Penyajian & Aturan Halaman `/lab`

> Dokumen ini menetapkan **penamaan**, **positioning**, dan **cara menyajikan** kumpulan proyek belajar (`type: "lab"`) di situs Showcase.
> Terkait: `docs/03-CONTENT-STRATEGY.md` §2, `architecture/03-ROUTING-AND-IA.md`, `architecture/06-ADR.md` (ADR-009).

---

## 1. Keputusan Nama 

| Aspek | Nilai |
|---|---|
| **Nama halaman** | **Learning Vault** |
| **Sub-judul** | *Things I built to learn — not to impress.* |
| **Sub-judul (ID)** | *Yang saya bangun untuk belajar, bukan untuk pamer.* |
| **Rute** | `/lab` |
| **Field data** | `type: "lab"` di `data/projects.json` |
| **Nama lama (dihapus)** | ~~Learning and Dummy Project~~ |

### Mengapa bukan "Dummy"?

Kata *dummy* menyabotase nilainya sendiri — ia berkata *"ini tidak penting"* kepada pembaca. Padahal 21 repo itu adalah **bukti konsistensi dan pertumbuhan**, bukan sisa latihan. Di portofolio, **proses adalah aset**. Nama harus memberi nilai pada proses itu, bukan meminta maaf karenanya.

### Mengapa "Vault"?

- **Konsisten dengan tema aruthtale** — "menyimpan cerita"; cocok dengan filosofi brand (`docs/10-BRAND-PHILOSOPHY.md`).
- **Pasangan seimbang** dengan **The Work** di halaman utama: satu soal *hasil*, satu soal *proses*.
- **Berkesan terkurasi**, bukan gudang sampah — tepat untuk audiens teknis yang menilai rekam jejak.
- Pendek, mudah diucapkan, dan enak di URL: `aruthtales.my.id/lab`.

### Alternatif (jika ingin nada berbeda)

| Nama | Kesan | Pilih bila… |
|---|---|---|
| **The Lab** | eksperimen, rasa ingin tahu | ingin terdengar teknis/saintifik |
| **Workbench** | meja kerja, mengotak-atik | ingin terdengar seperti "pengrajin" |
| **Archive** | kronik perjalanan | ingin menonjolkan *timeline* belajar |
| **Sandbox** | bebas, tanpa tekanan | ingin jujur bahwa ini latihan |
| **Journey** | pertumbuhan | ingin menyentuh sisi personal (Afterglow) |

> **Rekomendasi tetap: `Learning Vault`.** Nama lain hanya dipakai bila arah brand berubah.

---

## 2. Positioning: The Work vs Learning Vault

Dua bagian ini **bukan** yang penting vs tidak penting — keduanya menjawab pertanyaan berbeda.

| | **The Work** (`/work`) | **Learning Vault** (`/lab`) |
|---|---|---|
| Pertanyaan yang dijawab | *"Apa yang bisa dia lakukan?"* | *"Bagaimana dia belajar?"* |
| Isi | Karya nyata, case study, dampak | Eksperimen, latihan, repo belajar |
| Bukti | Metrik, link live, hasil | Tanggal, stack, jumlah repo |
| Nada | Percaya diri, profesional | Rendah hati, jujur, tekun |
| Jumlah | **8** | **21** |
| Prioritas tampilan | Di halaman depan | Halaman terpisah, tidak di hero |

**Aturan kunci:** Learning Vault **tidak pernah** mengklaim sebagai karya profesional. Ia jujur menyebut dirinya latihan — dan justru karena itu terasa kredibel.

---

## 3. Struktur Halaman `/lab`

```
/lab                Indeks — dikelompokkan per kategori
/lab/[slug]         Detail eksperimen (opsional; cukup untuk entri unggulan)
```

### Hierarki konten

1. **Hero ringkas** — judul *Learning Vault* + sub-judul + satu baris konteks
   ("21 eksperimen & latihan sepanjang perjalanan belajar — dari HTML pertama sampai fullstack.").
2. **Statistik ringkas** — jumlah repo, bahasa terbanyak, rentang tahun. *(Menambah bobot tanpa berbohong.)*
3. **Filter kategori** — pills/chips (lihat §5).
4. **Grid kartu** — tiap kartu ringkas: judul, deskripsi 1 baris, stack, tahun, link repo.
5. **Catatan penutup** — kalimat rendah hati yang mengarahkan kembali ke `/work`
   ("Yang paling matang sudah naik ke The Work →").
6. **Footer** — sama dengan halaman lain.

### Aturan penyajian

- **Kartu lebih ringkas** daripada kartu `/work` — tanpa metrik, tanpa case study panjang.
- **Selalu tampilkan tahun/tanggal** → menegaskan ini *rekam jejak*, bukan pajangan.
- **Selalu tampilkan bahasa/stack** → bukti luasnya eksplorasi.
- **Tanpa pagination agresif**; cukup grid responsif + filter. 21 entri masih ringan.
- **Repo yang tidak lagi publik** (mis. `bun-course`, `maybehtml`, `HTML-CSS-Exercise1`) → tandai abu-abu + label *"arsip"*, atau sembunyikan. Jangan biarkan link mati tanpa penjelasan.
- **Jangan taruh Learning Vault di hero / halaman depan.** Ia pintu kedua, bukan panggung utama.

---

## 4. Kategori

Pengelompokan agar 21 entri tidak terasa seperti daftar acak. Urutan: dari fondasi → keahlian modern.

### 4.1 Foundations — HTML, CSS & JavaScript
| Repo | Catatan |
|---|---|
| Maybe HTML | Latihan dasar HTML & CSS *(repo tidak lagi publik)* |
| HTML/CSS Exercise 1 | Latihan struktur & styling *(repo tidak lagi publik)* |
| JavaScript Exercises | Kumpulan tugas JavaScript |
| ZListTask | To-do list dengan penyimpanan lokal |
| Z-API Pokémon | Latihan konsumsi API eksternal |
| Bun Course | Belajar runtime Bun *(repo tidak lagi publik)* |

### 4.2 PHP & Laravel
| Repo | Stack |
|---|---|
| ZieBukuTamu | PHP · MySQL · PhpSpreadsheet — buku tamu + laporan Excel |
| Komikizen | PHP · MySQL — situs baca komik |
| Laravel POS | Laravel 12 · Vite · Tailwind |
| ZieMart | Laravel + React — e-commerce latihan |
| Invenzie | Laravel 12 · Sanctum — sistem inventaris |
| React Fullstack | Laravel 11 API + React CRUD |

### 4.3 Frontend Frameworks & Landing Page
| Repo | Stack |
|---|---|
| React Learning | React — First, Second, tic-tac-toe |
| TEFA POS Merch | Next.js · TypeScript · Prisma · AI SDK |
| Cozwin Coffee Landing Page | React 19 · Vite · Tailwind · Framer Motion · Lenis |
| Tanjosu Landing Page | React 19 · Vite · Tailwind · Playfair Display |

### 4.4 Mobile & Python
| Repo | Stack |
|---|---|
| Muslim App | Flutter · Dart |
| Ku-Money | Flutter · Dart — pencatat keuangan |
| Data Siswa | Flutter + Node/Express + MySQL |
| QrCode | Python · `qrcode` |
| Pythonzie | Python — kumpulan latihan |

---

## 5. Saran Copywriting

| Elemen | Teks usulan |
|---|---|
| **Judul** | Learning Vault |
| **Sub-judul (EN)** | *Things I built to learn — not to impress.* |
| **Sub-judul (ID)** | Yang saya bangun untuk belajar, bukan untuk pamer. |
| **Deskripsi hero** | Sebelum ada Arplication dan RoutineZie, ada 21 repo kecil yang membuat saya paham cara kerjanya. Ini arsipnya. |
| **Label filter "semua"** | Semua (21) |
| **Catatan penutup** | Yang paling matang sudah naik ke **The Work** → |
| **Empty state (filter kosong)** | Belum ada di kategori ini. Coba kategori lain. |
| **Label repo arsip** | arsip — tidak lagi publik |

**Nada suara:** jujur, tenang, tanpa meminta maaf, tanpa melebih-lebihkan. Mengikuti "quiet introspection" dari tema Afterglow, tapi tetap dalam palet indigo Showcase.

---

## 6. Catatan Implementasi

- Sumber data: `data/projects.json`, filter `type === "lab"` (lihat `architecture/04-DATA-ARCHITECTURE.md`).
- **Naik kelas tanpa pindah tempat:** saat sebuah eksperimen jadi karya serius, ubah `type` dari `"lab"` → `"project"` dan lengkapi field case study (role, metrics, gallery). Entri otomatis pindah dari `/lab` ke `/work`.
- **Field opsional entri lab:** `commits`, `activity`, `archived: true`. Semua boleh `null` + `_note` bila belum ada (lihat aturan data).
- **SEO:** `/lab` diberi `noindex` opsional bila ingin fokus otoritas ke `/work`; atau `index` dengan judul "Learning Vault — aruthtale" bila ingin menangkap pencarian repo belajar.
- **Performa:** 21 kartu ringan; tidak perlu gambar besar. Cukup teks + ikon bahasa.

---

## 7. Ringkasan

- Nama: **Learning Vault** · Rute: `/lab` · Data: `type: "lab"`.
- Pasangan **The Work** (`/work`, 8 karya) ↔ **Learning Vault** (`/lab`, 21 eksperimen).
- Pisah di **tampilan**, satukan di **data** (ADR-009).
- Nada: jujur, rendah hati, tunjukkan **proses** sebagai aset — bukan minta maaf.
