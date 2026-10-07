/** Identitas situs & domain — sumber tunggal. */
export const sites = {
  showcase: {
    name: "aruthtale",
    url: "https://aruthtales.my.id",
    title: "aruthtale — Proof, not promises.",
    description:
      "Studio pengembangan web yang mengubah ide menjadi aplikasi fungsional, interaktif, dan rapi.",
  },
  profile: {
    name: "Rchibnu",
    url: "https://rchibnu.aruthtales.my.id",
    title: "Rchibnu — Fullstack Developer",
    description:
      "Fullstack Developer berusia 17 tahun dari Cianjur. Membangun aplikasi web yang fungsional, interaktif, dan berpusat pada pengguna.",
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
