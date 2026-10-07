import { Button } from "@arufolio/ui";

export default function NotFound() {
  return (
    <section className="section container text-center">
      <p className="mono-label mb-4">404</p>
      <h1 className="display">Halaman tidak ditemukan</h1>
      <p className="mx-auto mt-4 max-w-md text-[var(--text-muted)]">
        Tautan yang kamu buka tidak ada atau sudah dipindahkan.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">Kembali ke beranda</Button>
        <Button href="/work" variant="ghost">Lihat karya</Button>
      </div>
    </section>
  );
}
