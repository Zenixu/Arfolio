/**
 * Tautan WhatsApp dari nomor gaya internasional tanpa "+" (mis. 62852…).
 * `wa.me` hanya mau angka, jadi semua pemisah dibuang.
 */
export function waLink(number: string, text?: string): string {
  const digits = number.replace(/\D/g, "");
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${q}`;
}

/** 6285283089860 → "+62 852-8308-9860" (hanya untuk tampilan). */
export function waDisplay(number: string): string {
  const d = number.replace(/\D/g, "");
  if (!d.startsWith("62")) return `+${d}`;
  const r = d.slice(2);
  // Pola umum Indonesia: 3-4-4 (11 digit), 3-4-3 (10), 3-3-3 (9).
  const groups =
    r.length === 11 ? [r.slice(0, 3), r.slice(3, 7), r.slice(7)]
    : r.length === 10 ? [r.slice(0, 3), r.slice(3, 7), r.slice(7)]
    : r.length === 9 ? [r.slice(0, 3), r.slice(3, 6), r.slice(6)]
    : [r.replace(/(\d{4})(?=\d)/g, "$1 ")];
  return `+62 ${groups.join("-")}`;
}
