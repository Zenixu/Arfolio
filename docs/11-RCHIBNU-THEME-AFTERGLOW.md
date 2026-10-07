# Tema Personal Rchibnu — *Afterglow*

> **quiet introspection** — tenang, reflektif, hangat seadanya.
> Sumber data: `data/rchibnu.json` → objek `theme`.

---

## 1. Apa itu "Afterglow"

> *Sesuatu yang sudah berlalu, tetapi masih meninggalkan rasa.*

Afterglow adalah cahaya sisa yang tertinggal setelah sumbernya pergi — senja setelah matahari tenggelam, hangat di kulit setelah seseorang memeluk, rasa yang tetap ada setelah percakapan usai.

Ini tema untuk **`rchibnu.aruthtales.my.id`** (sisi personal), **bukan** untuk `aruthtales.my.id` (sisi karya). Yang satu bercerita tentang *apa yang dibuat*; yang satu tentang *siapa yang merasakannya*.

## 2. Delapan Metafora

Kedelapan nama ini bukan aesthetic acak — ia cara memandang diri sendiri, dikumpulkan satu per satu sampai menemukan satu gambaran.

| # | Nama | Makna |
|---|---|---|
| 1 | **Indigo** | Dalam, tenang, tidak terlalu terang-terangan. |
| 2 | **Wisteria** | Lembut, puitis, sedikit nostalgic. |
| 3 | **Fox** | Mengamati dulu, tidak selalu menunjukkan seluruh dirinya. |
| 4 | **Autumn** | Perubahan, nostalgia, fase transisi. |
| 5 | **Drizzle** | Emosi yang hadir tanpa harus menjadi dramatis. |
| 6 | **Mirror** | Melihat kembali ke diri sendiri dan bertanya, *"sebenarnya aku seperti apa?"* |
| 7 | **Ramen** | Sisi hangat dan sederhana yang menyeimbangkan semuanya. |
| 8 | **Afterglow** | Sesuatu yang sudah berlalu tetapi masih meninggalkan rasa. |

## 3. Dua yang Paling Mengikat

Dari delapan, **Mirror** dan **Afterglow** adalah intinya:

```
   MIRROR                         AFTERGLOW
   "sebenarnya aku seperti apa?"  "apa yang masih terasa setelahnya?"
   ─── melihat ke dalam ───       ─── merasakan sisa cahayanya ───
                    ↘           ↙
                 QUIET INTROSPECTION
```

- **Mirror** = dorongan untuk melihat diri sendiri, mencoba berbagai sudut pandang (warna → musim → lagu → cuaca → makanan → benda → bunga → perasaan → hewan) untuk menemukan satu gambaran.
- **Afterglow** = hasilnya: bukan jawaban tegas, melainkan rasa yang tertinggal. Ia mengikat ketujuh nama lain menjadi satu.

Keduanya menjelaskan **mengapa** halaman profil ini ada: bukan untuk memamerkan diri, tetapi untuk menata potongan-potongan kecil menjadi gambaran yang jujur.

## 4. Cara Tema Ini Membedakan Kedua Situs

| | **aruthtale** (Showcase) | **Rchibnu** (Profile) |
|---|---|---|
| Nuansa | Tegas, profesional, "engineer" | Tenang, reflektif, personal |
| Aksen | **Indigo** `#6366F1` | **Afterglow** `#E3A57C` (senja) |
| Nada | *"Proof, not promises."* | *"Sesuatu yang berlalu, tapi masih terasa."* |
| Konten | Karya, layanan, bukti | Bio, perjalanan, sertifikat, perasaan |
| Metafora | — | Fox, Drizzle, Mirror, Afterglow, dll |

Keduanya tetap satu keluarga (gelap, indigo sebagai warna jangkar), tetapi Profile diberi kehangatan Afterglow.

## 5. Palet Warna — Afterglow

Mode gelap, dengan aksen hangat senja. Indigo tetap ada sebagai warna jangkar (karena kedua situs satu brand).

| Token | Nilai | Fungsi |
|---|---|---|
| `--bg` | `#14121A` | Latar utama (gelap keunguan, tenang) |
| `--bg-elevated` | `#1D1A26` | Kartu/permukaan |
| `--border` | `#2E2939` | Garis |
| `--text` | `#EAE6F0` | Teks utama |
| `--text-muted` | `#9A93A8` | Teks sekunder |
| `--afterglow` | `#E3A57C` | Aksen utama (senja hangat) |
| `--wisteria` | `#B79CE0` | Aksen sekunder (ungu lembut, nostalgic) |
| `--mirror` | `#9AA6B2` | Aksen dingin (reflektif, sejuk) |
| `--ramen` | `#F3E7D6` | Aksen netral hangat (sederhana) |
| `--gradient` | `linear-gradient(135deg, #E3A57C 0%, #B79CE0 100%)` | Gradien Afterglow→Wisteria (dipakai tipis di hero/aksen) |

**Aturan pakai:** aksen utama **Afterglow**; Wisteria/Mirror/Ramen hanya sebagai bumbu (ikon, tag, garis) — jangan semua warna dipakai sekaligus.

## 6. Ekspresi Visual (terjemahan metafora)

| Metafora | Terjemahan desain |
|---|---|
| **Indigo** | Latar gelap, tenang, tanpa warna mencolok |
| **Wisteria** | Gradien lembut, tag ungu pucat, tipografi serif puitis di kutipan |
| **Fox** | Konten tidak semua dibuka — ada "yang belum ditampilkan"; hover reveal, detail tersembunyi |
| **Autumn** | Aksen daun jatuh; transisi/animasi yang melambat di akhir |
| **Drizzle** | Tekstur hujan halus (SVG noise tipis), gerak lambat, bukan dramatis |
| **Mirror** | Efek reflektif pada kartu/foto (subtle), self-portrait, kutipan reflektif |
| **Ramen** | Sisi hangat: kartu "favorit sederhana", tone santai, sudut membulat |
| **Afterglow** | Glow lembut yang memudar (bukan menyala), gradien senja, fade-out lambat |

## 7. Animasi — Nuansa Afterglow

Melengkapi `05-ANIMATION-GUIDE.md` dengan rasa personal:

- **Fade-out lambat** (bukan fade-in cepat): elemen "mengendap" seperti sisa cahaya.
- **Glow yang memudar** saat scroll, bukan glow yang menyala.
- **Reveal tertunda**: konten muncul sedikit lebih lambat, memberi ruang bernapas.
- **Parallax tipis** pada ornamen senja/bunga (Wisteria).
- **Cursor trail lembut** (opsional) — jejak cahaya yang perlahan hilang.
- Semua tetap hormat `prefers-reduced-motion`.

## 8. Tipografi

- **Heading:** serif lembut (mis. *Fraunces*, *Instrument Serif*) untuk sisi puitis — beda dari Sans tegas di Showcase.
- **Body:** Inter / Geist (sama seperti Showcase, agar satu keluarga).
- **Kutipan:** italic serif, warna `--text-muted`, dengan garis Afterglow di kiri.

## 9. Kalimat Kunci (untuk hero Profile)

Beberapa opsi yang selaras dengan tema (pilih/tweak):

- *"Sebagian dari diri saya masih menyala, meski sumbernya sudah pergi."*
- *"Saya mengumpulkan hal-hal kecil untuk memahami diri saya."*
- *"Afterglow — yang berlalu, yang masih terasa."*
- *"Quiet introspection."*

## 10. Catatan

- Tema ini **personal** dan **opsional secara teknis**: bila dirasa terlalu berat, sisi personal tetap bisa memakai aksen indigo saja. Tapi bila ingin profil terasa "milikmu", Afterglow adalah pilihannya.
- Delapan metafora dapat dipakai sebagai **tag/koleksi kecil** di halaman profil (mis. chip "Mirror", "Afterglow") — jangan sebagai menu utama.
- Logo Rchibnu (menyusul) sebaiknya mempertimbangkan nuansa Afterglow (hangat, senja, sisa cahaya).
