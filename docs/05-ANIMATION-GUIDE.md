# Animation Guide — Arufolio

> Prinsip: **tipis, cepat, bermakna.** Animasi memperkuat hierarki & memberi rasa hidup — bukan menghibur diri sendiri.

## 1. Aturan Dasar (Motion Budget)

- **Durasi:** micro `120–180ms`, transisi `200–300ms`, reveal `400–600ms`. Tidak ada yang > 800ms.
- **Easing:** masuk pakai `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out ekspresif); keluar lebih cepat.
- **Jarak:** reveal geser maks. `12–24px` — jangan lempar elemen dari jauh.
- **Satu hal sekaligus:** jangan animasikan > 2 properti per elemen.
- **Hormati preferensi:** `@media (prefers-reduced-motion: reduce)` → matikan transform/auto-play, sisakan fade.
- **Jangan animasikan:** layout shift besar, scroll-jacking, autoplay video berkuat.
- **Target performa:** animasikan hanya `transform` & `opacity` (compositor-friendly).

## 2. Katalog Animasi (yang akan dipakai)

| # | Nama | Di mana | Detail |
|---|---|---|---|
| A1 | **Fade-up reveal** | Section, kartu | opacity 0→1 + translateY 16px→0, stagger 60ms |
| A2 | **Staggered list** | Grid proyek, sertifikat | Muncul berurutan saat masuk viewport |
| A3 | **Hover lift** | ProjectCard | translateY -4px + border aksen + shadow |
| A4 | **Marquee** | Baris skill/logo | Loop horizontal mulus, pause saat hover |
| A5 | **Magnetic button** | CTA utama | Tombol sedikit mengikuti kursor |
| A6 | **Text mask reveal** | Headline hero | Teks muncul dari balik mask (clip) |
| A7 | **Blur-in image** | Thumbnail proyek | placeholder blur → tajam saat load |
| A8 | **Underline sweep** | Link nav | Garis bawah menyapu dari kiri |
| A9 | **Number count-up** | Statistik (commit, proyek) | Angka naik saat terlihat |
| A10 | **Cursor glow** | Latar hero | Gradien aksen mengikuti kursor (halus) |
| A11 | **Page transition** | Antar halaman | Fade + slide 8px, 250ms |
| A12 | **Scroll progress** | Atas halaman | Garis tipis progres scroll |

> Mulai dari **A1–A5 + A11** (MVP). Sisanya masuk V1. Jangan pakai semuanya sekaligus.

## 3. Implementasi Teknis

- **CSS-first** untuk micro-interaction (hover, underline) — `transition`, `@keyframes`.
- **IntersectionObserver** untuk reveal (atau `motion`/Framer Motion `whileInView`).
- **`motion` (Framer Motion)** untuk stagger, page transition, layout animation.
- **`lenis`** (opsional) untuk smooth scroll halus — jangan berlebihan.
- **View Transitions API** (opsional) untuk page transition native.

Contoh reveal:
```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
/>
```

## 4. Referensi Animasi (untuk diambil inspirasinya)

> Catatan: ini tautan **inspirasi** — tiru *prinsip geraknya*, bukan menjiplak aset/kode berlisensi. Untuk kode siap pakai, lihat bagian 5.

### Galeri inspirasi
- **Dribbble — "portfolio web animation"**: https://dribbble.com/tags/web-animation — referensi visual micro-interaction & reveal.
- **Dribbble — "scroll animation"**: https://dribbble.com/tags/scroll-animation — ide reveal & parallax tipis.
- **Dribbble — "hover effect"**: https://dribbble.com/tags/hover-effect — ide A3/A5/A8.
- **Awwwards — Portfolio**: https://www.awwwards.com/websites/portfolio/ — contoh eksekusi kelas atas.
- **Awwwards — Collections (Animation)**: https://www.awwwards.com/websites/animation/ — pola motion premium.
- **Godly (godly.website)** — situs dengan motion berkelas.
- **Landbook (land-book.com)** — inspirasi landing page & sectioning.
- **Mobbin (mobbin.com)** — pola UI/motion mobile & web.
- **Codrops (tympanus.net/codrops)** — demo & tutorial motion tingkat lanjut (mis. page transition, WebGL ringan).

### Situs referensi langsung (pola motion)
- **brittanychiang.com** — scroll reveal halus, sidebar, tidak berlebihan.
- **bruno-simon.com** — contoh ambisi 3D (jangan ditiru di MVP).
- **rauno.me** — micro-interaction & craft detail (Rauno Freiberg).
- **emilkowalski.com** — prinsip animasi & kurva easing yang benar.

## 5. Library Siap Pakai (kode)

| Library | Fungsi | Cocok untuk |
|---|---|---|
| **motion** (Framer Motion) | Reveal, stagger, layout, page transition | React/Next utama |
| **GSAP** + ScrollTrigger | Timeline kompleks, scroll-linked | A12, animasi lanjutan |
| **Lenis** | Smooth scroll | Rasa halus global |
| **AutoAnimate** | Animasi list otomatis | Filter proyek |
| **View Transitions API** | Transisi halaman native | A11 (progressive) |
| **@formkit/auto-animate** | Sama seperti AutoAnimate | — |
| **Animista** (animista.net) | Copy-paste keyframes CSS | Micro-interaction cepat |
| **Hover.dev** | Komponen hover siap pakai | A3/A5/A8 |
| **Magic UI** (magicui.design) | Komponen animasi React | Marquee, blur, dsb |
| **Aceternity UI** (ui.aceternity.com) | Komponen efek (glow, beam) | Aksen hero |
| **React Bits** (reactbits.dev) | Koleksi animasi React | Inspirasi & siap pakai |

## 6. Checklist Motion (per komponen)

- [ ] Durasi dalam rentang yang ditentukan.
- [ ] Hanya `transform`/`opacity` yang dianimasikan.
- [ ] Ada fallback `prefers-reduced-motion`.
- [ ] Tidak memblokir interaksi / tidak menyebabkan layout shift.
- [ ] Terasa halus di perangkat low-end (uji throttle 4× CPU).
