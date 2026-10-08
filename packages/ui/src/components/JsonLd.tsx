/**
 * JsonLd — menyisipkan structured data (schema.org) ke dalam <head>.
 *
 * Kenapa komponen terpisah: JSON-LD harus berupa <script type="application/ld+json">
 * mentah. Komponen ini merapikan pemakaiannya di halaman dan memastikan
 * escaping aman (`<` → `\u003c`) supaya tidak bisa keluar dari blok script.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // Aman: nilai di-escape di atas; data berasal dari konstanta internal, bukan input pengguna.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
