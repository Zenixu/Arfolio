/**
 * Identitas situs & domain — sumber tunggal.
 *
 * Catatan SEO:
 * — `title` dipakai sebagai <title> utama; sisipkan kata kunci yang benar-benar
 *   dicari orang ("Studio Web", "Fullstack Developer", lokasi) supaya halaman
 *   bisa ditemukan lewat pencarian umum, bukan hanya lewat nama merek.
 * — `description` jadi meta description (cuplikan di hasil pencarian).
 * — `shortTitle` dipakai untuk og:site_name & nama brand di structured data.
 * — `keywords` bukan faktor peringkat Google, tapi menjaga konsistensi istilah.
 */
export const sites = {
  showcase: {
    name: "aruthtale",
    url: "https://aruthtales.my.id",
    title: "Aruthtale — Studio Web & Fullstack Developer Cianjur",
    shortTitle: "Aruthtale",
    description:
      "Studio pengembangan web yang mengubah ide menjadi aplikasi fungsional, interaktif, dan rapi. Jasa pembuatan website, web app, POS, dan SaaS dari Cianjur, Indonesia.",
    keywords: [
      "Aruthtale",
      "aruthtales",
      "studio web Cianjur",
      "jasa pembuatan website",
      "jasa pembuatan web Cianjur",
      "fullstack developer Cianjur",
      "fullstack developer Indonesia",
      "web developer Indonesia",
      "pembuatan web app",
      "jasa POS",
      "jasa SaaS",
    ],
    locale: "id_ID",
    language: "id",
  },
  profile: {
    name: "Rchibnu",
    url: "https://rchibnu.aruthtales.my.id",
    title: "Rchibnu — Fullstack Developer Cianjur",
    shortTitle: "Rchibnu",
    description:
      "Ibnu Hambal Al Bantani Rch (Rchibnu) — Fullstack Developer dari Cianjur, Jawa Barat. Membangun aplikasi web yang fungsional, interaktif, dan berpusat pada pengguna.",
    keywords: [
      "Rchibnu",
      "Rch Ibnu",
      "Ibnu Hambal",
      "Ibnu Hambal Al Bantani Rch",
      "fullstack developer Cianjur",
      "web developer Cianjur",
      "programmer Cianjur",
      "portofolio developer Indonesia",
      "Aruthtale",
    ],
    locale: "id_ID",
    language: "id",
  },
} as const;

export const nav = {
  showcase: [
    { label: "Work", href: "/work" },
    { label: "Lab", href: "/lab" },
    { label: "Contact", href: "/contact" },
  ],
  profile: [
    { label: "About", href: "/about" },
    { label: "Certificates", href: "/certificates" },
    { label: "Skills", href: "/skills" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
