# Logo — aruthtale & Rchibnu

Status: **draft kerja** (boleh dipakai; belum ada uji merek dagang).
Dibuat dengan alur skill `logo-design`: brief → 3 konsep → uji 16 px → koreksi optik → berkas.

> **PERINGATAN — dokumen ini tertinggal.** Bagian 1–2 menjelaskan konsep "Leaf-nib"
> dan monogram "R · I" hasil 7 Oktober 2026. Lambang yang benar-benar dipakai situs
> sekarang berbeda; lihat **Bagian 0** di bawah. Tabel berkas di Bagian 3 juga sudah
> tidak cocok (ikon situs sekarang `.png`, bukan `.svg`).

---

## 0. Lambang yang dipakai sekarang (22 Oktober 2026)

| Situs | Lambang | Sumber |
|---|---|---|
| showcase `aruthtales.my.id` | Emblem arch emas + monogram "A" ivory + bunga + 4 bintang, di atas lempeng navy + cincin emas | `brand/Aruthtales_logo.jpg` (master 1792×2400) |
| profil `rchibnu.aruthtales.my.id` | Monogram "R" + kepala rubah + wisteria, emas di atas indigo | `brand/rchibnu-logo.png` |

Semua turunan (mark halaman, `icon.png`, `apple-icon.png`, `favicon.ico`, lambang
kartu `og:image`) dibangkitkan oleh `scripts/make-brand-marks.py` dari kedua master
itu. Jangan menyunting berkas turunan langsung — ubah master lalu jalankan skrip.

Arsip gambar brand lain: `brand/zcharacter.png` (lembar ilustrasi karakter),
`brand/rchibnu-mark.png`, `brand/aruthtale-mark.png`. Keduanya **tidak** lagi berada
di `public/`, jadi tidak ter-serv sebagai berkas publik.

---

## 1. aruthtale — “Leaf-nib” (daun + mata pena) — konsep lama, tidak dipakai

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
| `scripts/make-brand-marks.py` | Generator semua berkas turunan lambang (mark, ikon, favicon, lambang og:image) dari `brand/` |
| `brand/Aruthtales_logo.jpg` | Master lambang aruthtale (1792×2400) |
| `brand/rchibnu-logo.png` | Master lambang Rchibnu (monogram R + rubah + wisteria) |
| `packages/ui/src/components/Logo.tsx` | Komponen React `AruthtaleMark`, `RchibnuMark`, `Mark` |
| `apps/showcase/app/icon.png` · `apple-icon.png` · `favicon.ico` | Ikon situs Showcase |
| `apps/profile/app/icon.png` · `apple-icon.png` · `favicon.ico` | Ikon situs Profile |
| `brand/concepts/*.svg` | 6 konsep awal (arsip) |
| `brand/final/*.svg` | Salinan lambang final |
| `brand/zcharacter.png` | Lembar ilustrasi karakter (arsip, tidak dipakai situs) |

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
