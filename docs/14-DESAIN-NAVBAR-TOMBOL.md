# 14 — Navbar & Tombol: perbaikan keterbacaan dan kerapian

Catatan ini menjelaskan **kenapa** label tombol nyaris tak terbaca, apa yang
diubah, dan aturan mana yang dipakai sebagai rujukan. Angka kontras di bawah
diukur dari halaman yang benar-benar dirender (`getComputedStyle`), bukan
perkiraan.

---

## 1. Akar masalahnya bukan pilihan warna

Gejalanya: label `Lihat karya` di tombol utama nyaris hilang. Warna tombol
memang cokelat tua, tapi teksnya **bukan** putih seperti yang tertulis di CSS —
teksnya mewarisi warna teks badan (hampir hitam). Jadi gelap di atas gelap.

Penyebabnya satu baris di `packages/ui/src/styles/tokens.css`:

```css
a { color: inherit; text-decoration: none; }   /* tanpa @layer */
```

Tailwind v4 menaruh semua utility di `@layer utilities`. Aturan **tanpa layer
selalu menang** atas aturan berlayer, berapa pun spesifisitasnya. Akibatnya
setiap `text-[var(--…)]` pada elemen `<a>` tidak pernah berlaku:

- tombol utama mewarisi `--text`, bukan `--accent-ink`;
- semua tautan nav tampak sama, karena `text-[var(--text-muted)]` juga kalah —
  keadaan aktif tidak bisa dibedakan.

Perbaikannya: aturan itu dipindah ke dalam `@layer base` (pola yang sudah
dipakai di file yang sama untuk `body > *`). Satu perbaikan menyelesaikan dua
keluhan sekaligus.

### Kontras sebelum vs sesudah

| Elemen | Sebelum | Sesudah | Ambang WCAG AA |
|---|---|---|---|
| Tombol utama — tema terang | 2,83:1 ✗ | **6,21:1** ✓ | 4,5:1 |
| Tombol utama — tema gelap | ±2,05:1 ✗ | **8,13:1** ✓ | 4,5:1 |
| Nav aktif vs nonaktif | identik ✗ | 16,19:1 vs 6,75:1 ✓ | beda harus terlihat |

---

## 2. Yang diubah

| Berkas | Perubahan | Alasan |
|---|---|---|
| `styles/tokens.css` | `a { color: inherit }` masuk `@layer base` | utility warna akhirnya berlaku |
| `styles/tokens.css` | `.shine::after` diberi `pointer-events: none` | kilau hover tidak menutupi/menangkap label |
| `components/Button.tsx` | varian `primary` → `font-semibold` | label 15 px butuh tepi tegas; sekaligus lolos ambang "teks tebal" |
| `components/Navbar.tsx` | tinggi bar 68 → **64 px** (`h-16`) | ukuran baku toolbar; bar terasa lebih rapat |
| `components/Navbar.tsx` | tombol ikon 40 → **44 px** | target sentuh minimum |
| `components/Navbar.tsx` | ikon menu/tutup 17 → 19 | proporsi terhadap lingkaran 44 px |
| `components/Navbar.tsx` | nav aktif dapat `font-medium` | keadaan aktif ditandai **warna + ketebalan**, bukan warna saja |
| `components/Navbar.tsx` | garis bawah `1px` di `-bottom-px` → `1,5px` di `bottom-1` | menempel wajar di bawah kata, bukan menggantung di tepi kotak |
| `components/ThemeToggle.tsx` | 40 → **44 px**, ikon 16 → 20 | sama seperti tombol menu; ikon tidak lagi tenggelam |

Tata letak tiga kolom (`brand | nav | aksi`) **tidak** diubah — nav memang sudah
benar-benar terpusat (pusat nav 635 px pada layar 1280 px; selisih 5 px berasal
dari lebar scrollbar).

---

## 3. Aturan yang dipakai, dan sumbernya

**Target sentuh minimal 44 × 44 pt.**
Apple: *"a button needs a hit region of at least 44x44 pt"*. Sebelumnya tombol
ikon 40 px — di bawah ambang.
<https://developer.apple.com/design/human-interface-guidelines/buttons>

**Kontras teks minimal 4,5:1 (teks normal), 3:1 (teks ≥18 pt atau tebal).**
Apple memakai tabel WCAG Level AA yang sama; Material dan WCAG sepakat.
<https://developer.apple.com/design/human-interface-guidelines/accessibility>
<https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>

**Kontras non-teks (garis, ikon bermakna, indikator fokus) minimal 3:1.**
<https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html>

**Jangan andalkan warna saja untuk membedakan keadaan.**
WCAG 1.4.1 *Use of Color* — dasar kenapa nav aktif juga diberi ketebalan huruf.
<https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html>

**Tinggi bar: 64 dp, padding luar minimal 16 dp, maksimal tiga kelompok item.**
Material 3 untuk toolbar; Apple untuk pembagian *leading / center / trailing*.
<https://m3.material.io/components/toolbars/specs>
<https://developer.apple.com/design/human-interface-guidelines/toolbars>

**Satu tombol paling menonjol per tampilan, dan beri jarak cukup dari sekitarnya.**
<https://developer.apple.com/design/human-interface-guidelines/buttons>

---

## 4. Cara memeriksa ulang setelah mengubah warna

Jangan menilai dari tangkapan layar — ambil nilai yang benar-benar dipakai
browser:

```js
const el = document.querySelector('a[href="/work"]');
const c = getComputedStyle(el);
c.backgroundColor; c.color;            // lalu hitung rasio kontras
```

Dua jebakan yang pernah menyesatkan di proyek ini:

1. **Transisi yang membeku.** `transition-colors` membuat `getComputedStyle`
   mengembalikan warna antara. Di browser tanpa frame (headless), transisi bisa
   berhenti di `currentTime: 0` selamanya. Selesaikan dulu:
   `document.getAnimations().forEach(a => a.finish())`.
2. **Animasi masuk (`Reveal`).** Elemen beropasitas 0 saat diukur akan terbaca
   seolah tidak ada. Paksa `opacity: 1` sebelum menilai.
