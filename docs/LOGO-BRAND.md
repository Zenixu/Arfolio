# Logo — aruthtale & Rchibnu

Status: **draft kerja** (boleh dipakai; belum ada uji merek dagang).
Dibuat dengan alur skill `logo-design`: brief → 3 konsep → uji 16 px → koreksi optik → berkas.

---

## 1. aruthtale — “Leaf-nib” (daun + mata pena)

**Ide satu kalimat:** satu bentuk membaca dua hal sekaligus — **daun** (Rue & Hyacinth, dan
“tumbuh”) dan **mata pena** (Ars = seni/keahlian + Tale = kisah yang ditulis).

**Kenapa cocok dengan brief**
- *Arsene · Rue · Hyacinth · Tale* → semua unsur itu tumbuhan/kisah; daun mewakili pertumbuhan,
  mata pena mewakili tulisan.
- Sederhana, satu bentuk, tanpa huruf — terbaca dari favicon 16 px sampai latar CTA besar.
- Ruang negatif (lubang + celah) adalah **tanda tangan** yang bisa dipakai ulang: pola, ikon, animasi.

**Geometri (kanvas 48×48)**
- Bentuk luar: 2 lengkung kuadrat, simetris kiri–kanan (margin L11,1 = R11,1).
- Lubang napas (breather hole): lingkaran r4,0 di (24, 17,6) — **lubang tembus**, bukan titik warna.
- Celah (slit): batang 3,0 × 23,4 turun dari pusat lubang ke ujung.
- Terisi ruang 46% kanvas; sudut bersih, tanpa sudut “nyaris lurus”.

**Koreksi optik yang sudah dilakukan**
- Titik berwarna di dalam bentuk hitam **tak terlihat** → diganti ruang negatif (juga membuat
  logo utuh dalam versi satu warna).
- Lubang r2,4 hilang di 16 px → diperbesar ke r4,0.
- Celah 3,4 terbaca seperti “daun terbelah dua” → diperkecil ke 3,0.
- Potongan **ukuran kecil** (favicon): urat saja, tanpa lubang (lubang menutup di 16 px).

**Warna**
| Nama | HEX | Pakai |
|---|---|---|
| Indigo (aksen) | `#6366F1` | satu-satunya warna lambang |

---

## 2. Rchibnu — monogram “R · I”

**Ide satu kalimat:** huruf **R** dan **I** berbagi satu batang tegak — batang R merangkap huruf I
yang berkait atas-bawah.

**Kenapa cocok dengan brief**
- **R** dan **I** = Rchibnu · **Ibnu**.
- Satu bentuk, dua huruf → sederhana tapi bukan inisial di font standar.
- **Fox** (rubah) hidup di warna senja, bukan di gambar rubah — menghindari klise.

**Geometri (kanvas 48×48)**
- Batang tegak di x19, dari y5 ke y43; kait I (12 lebar) di atas & bawah.
- Perut R: jari-jari 8,2 (diperbesar supaya lubang huruf tetap terbaca kecil).
- Kaki R: tepat **60°** dari horizontal (bukan 61,5° yang terbaca “salah”).
- Tebal garis 4,6 (dipilih dari uji: 4,2 terlalu tipis, 4,9 menggumpal).
- Margin L13,0 = R12,5 (optis seimbang).

**Warna — senja Afterglow (3 warna, bukan 6)**
| Urutan (bawah→atas) | HEX | Tema |
|---|---|---|
| Horizon | `#9AA6B2` | Mirror |
| Tengah | `#E3A57C` | Fox / Afterglow |
| Langit | `#6366F1` | Indigo |

Gradien **hanya** dipakai di berkas web. Versi cetak/satu warna pakai `#E3A57C` rata.

**Potongan ukuran kecil (favicon):** R tanpa kait I + tebal 5,0 (kait menyatu jadi gumpalan di 16 px).

---

## 3. Berkas

| Berkas | Isi |
|---|---|
| `packages/ui/src/components/Logo.tsx` | Komponen React `AruthtaleMark`, `RchibnuMark`, `Mark` |
| `apps/showcase/app/icon.svg` · `apple-icon.svg` · `favicon.ico` | Ikon situs Showcase |
| `apps/profile/app/icon.svg` · `apple-icon.svg` · `favicon.ico` | Ikon situs Profile |
| `brand/concepts/*.svg` | 6 konsep awal (arsip) |
| `brand/final/*.svg` | Salinan lambang final |

## 4. Belum dikerjakan (menunggu keputusan pemilik)
- Nama huruf untuk logotype kata (“aruthtale”, “Rchibnu”) belum dibakukan — sekarang memakai
  font sistem (system-ui) di lockup.
- Belum ada uji merek dagang (disarankan pencarian profesional sebelum dipakai komersial).
- Belum ada berkas PDF/EPS (butuh Inkscape/AI).
- Gradien R belum diuji cetak.

## 5. Aturan pakai cepat
- Ruang kosong minimum di sekeliling lambang = tinggi satu kait I (≈ 25% sisi lambang).
- Ukuran minimum: lambang penuh 24 px; di bawah 24 px pakai potongan favicon.
- Jangan: memiringkan, mengubah warna gradien, memberi bayangan, atau meletakkan lambang di
  latar yang kontrasnya < 3:1.
