import { Button } from "@arufolio/ui";

export default function NotFound() {
  return (
    <section className="section container text-center">
      <p className="mono-label mb-4">404</p>
      <h1 className="display">Halaman tidak ditemukan</h1>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">Beranda</Button>
        <Button href="https://aruthtales.my.id" variant="ghost">Lihat karya</Button>
      </div>
    </section>
  );
}
