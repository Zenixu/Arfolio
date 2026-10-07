# Design System — Arufolio

> Arah: **modern, gelap, minimal, sedikit playful** — terasa seperti "engineer yang serius tapi punya selera".

## 1. Arah Desain (Design Direction)

Tiga pilar visual:
1. **Kontras tinggi** — tipografi besar, ruang kosong lega, aksen **indigo** tunggal yang kuat.
2. **"Technical elegance"** — grid rapi, monospace untuk detail kecil (label, angka, tag), seperti estetika developer yang matang.
3. **Motion tipis** — animasi halus sebagai bumbu, bukan pertunjukan (lihat `05-ANIMATION-GUIDE.md`).

Inspirasi arah (ambil *prinsip*, bukan meniru mentah): Brittany Chiang (struktur bersih), khadafirafa (sectioning & penamaan), deftvalian (ringkas, identity-first), Linear/Vercel (kegelapan + aksen halus).

## 2. Palet Warna

Filosofi: **1 warna aksen**, sisanya netral. Tema gelap sebagai default, terang sebagai opsi.

> **Dua persona warna:** Showcase (aruthtale) memakai aksen **indigo** — tegas & profesional. Profile (Rchibnu) memakai tema **Afterglow** (aksen senja hangat `#E3A57C`) — tenang & reflektif. Keduanya berbagi latar gelap & jangkar indigo. Lihat `11-RCHIBNU-THEME-AFTERGLOW.md`.

### Dark (default) — Showcase (aruthtale)
| Token | Nilai | Fungsi |
|---|---|---|
| `--bg` | `#0A0A0B` | Latar utama |
| `--bg-elevated` | `#141416` | Kartu/permukaan |
| `--border` | `#26262B` | Garis |
| `--text` | `#EDEDEF` | Teks utama |
| `--text-muted` | `#9A9AA5` | Teks sekunder |
| `--accent` | `#6366F1` | Aksen utama (indigo) |
| `--accent-hover` | `#818CF8` | Indigo terang (hover) |
| `--accent-2` | `#38E1B0` | Aksen sekunder (mint, jarang) |

### Dark — Profile (Rchibnu · Afterglow)
| Token | Nilai | Fungsi |
|---|---|---|
| `--bg` | `#14121A` | Latar utama (gelap keunguan, tenang) |
| `--bg-elevated` | `#1D1A26` | Kartu/permukaan |
| `--border` | `#2E2939` | Garis |
| `--text` | `#EAE6F0` | Teks utama |
| `--text-muted` | `#9A93A8` | Teks sekunder |
| `--accent` | `#E3A57C` | Aksen utama (senja hangat / Afterglow) |
| `--wisteria` | `#B79CE0` | Aksen sekunder (ungu lembut, nostalgic) |
| `--mirror` | `#9AA6B2` | Aksen dingin (reflektif) |
| `--ramen` | `#F3E7D6` | Aksen netral hangat |
| `--gradient` | `linear-gradient(135deg,#E3A57C,#B79CE0)` | Gradien Afterglow→Wisteria |

### Light
| Token | Nilai |
|---|---|
| `--bg` | `#FAFAFA` |
| `--bg-elevated` | `#FFFFFF` |
| `--border` | `#E4E4E7` |
| `--text` | `#111113` |
| `--text-muted` | `#5B5B66` |
| `--accent` | `#4F46E5` |
| `--accent-hover` | `#4338CA` |

> **Palet indigo** (Showcase): `#6366F1` (indigo-500, dark) dan `#4F46E5` (indigo-600, light). Variasi tetap dalam keluarga indigo: `#818CF8` (indigo-400) atau `#4338CA` (indigo-700). Pasangan sekunder harmonis: **mint `#38E1B0`** atau **cyan `#22D3EE`**.
> **Palet Afterglow** (Profile): aksen utama `#E3A57C`; Wisteria/Mirror/Ramen hanya bumbu. Detail di `11-RCHIBNU-THEME-AFTERGLOW.md`. Pilih satu aksen utama per situs, jangan campur.

## 3. Tipografi

| Peran | Font | Catatan |
|---|---|---|
| Display/Heading | **Geist** / **Satoshi** / **General Sans** | Geometris, modern |
| Body | **Inter** | Netral, sangat terbaca |
| Mono | **JetBrains Mono** / **Geist Mono** | Label, tag, angka, kode |

**Skala tipe (fluid, clamp):**
```
display : clamp(2.5rem, 6vw, 5rem)   / lh 1.05 / weight 700
h1      : clamp(2rem, 4vw, 3rem)     / lh 1.1  / weight 700
h2      : clamp(1.5rem, 3vw, 2rem)   / lh 1.2  / weight 600
body    : 1rem (17px)                / lh 1.6  / weight 400
small   : 0.875rem                   / lh 1.5
mono-lbl: 0.75rem                    / tracking 0.08em / uppercase
```

## 4. Spacing & Layout

- **Skala spacing (8pt):** `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`
- **Radius:** `sm 8px`, `md 12px`, `lg 20px`, `pill 999px`
- **Container:** max-width `1120px`, padding horizontal `clamp(20px, 5vw, 48px)`
- **Grid:** 12 kolom desktop, 4 kolom mobile; gap `24px`
- **Section rhythm:** padding vertikal `clamp(64px, 10vh, 128px)`

## 5. Elevasi & Efek

- **Shadow:** halus & gelap (`0 10px 30px rgba(0,0,0,.35)` dark).
- **Glass (opsional):** `backdrop-filter: blur(12px)` + border 1px transparan untuk navbar.
- **Border glow:** saat hover kartu, border aksen tipis + shadow lembut.
- **Grain/noise:** tekstur halus opsional di hero (SVG noise) — dipakai tipis.

## 6. Komponen Inti

| Komponen | Catatan |
|---|---|
| `Navbar` | Sticky, glass, logo + nav + toggle tema; sama di kedua situs |
| `Footer` | Kolom: brand, navigasi, sosial, tautan silang |
| `ProjectCard` | Thumbnail, judul, tag mono, tahun; hover → lift + border aksen |
| `CertificateCard` | Gambar + penerbit + tanggal + tautan |
| `Timeline` | Vertikal, titik + garis, animasi reveal |
| `Tag` / `Chip` | Monospace kecil, border |
| `Button` | Varian: primary (accent), ghost, link-arrow |
| `Marquee` | Baris logo/skill bergulir halus |
| `SectionHeading` | Eyebrow (mono) + judul + deskripsi |
| `ThemeToggle` | Gelap/terang, tersimpan di localStorage |

## 7. Aksesibilitas (ringkas, detail di 07)

- Kontras teks ≥ 4.5:1 (normal), ≥ 3:1 (besar).
- Focus ring jelas (`outline: 2px solid var(--accent)`).
- Jangan andalkan warna saja untuk status.
- Target sentuh ≥ 44×44px.

## 8. Token → Kode (contoh)

```css
/* Showcase — aruthtale (indigo) */
:root[data-theme="dark"] {
  --bg: #0A0A0B; --bg-elevated: #141416; --border: #26262B;
  --text: #EDEDEF; --text-muted: #9A9AA5;
  --accent: #6366F1; --accent-hover: #818CF8; --accent-2: #38E1B0;
  --radius-md: 12px; --container: 1120px;
}

/* Profile — Rchibnu (Afterglow) */
:root[data-theme="dark"] {
  --bg: #14121A; --bg-elevated: #1D1A26; --border: #2E2939;
  --text: #EAE6F0; --text-muted: #9A93A8;
  --accent: #E3A57C; --wisteria: #B79CE0; --mirror: #9AA6B2; --ramen: #F3E7D6;
  --gradient: linear-gradient(135deg, #E3A57C 0%, #B79CE0 100%);
}
```
Token dasar (spacing, radius, container) dipakai bersama via `packages/ui`; tiap app menimpa `--accent*` sesuai personanya.
