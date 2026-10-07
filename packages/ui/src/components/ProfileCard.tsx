import { cn } from "../lib/cn";
import { Briefcase, MapPin, Sparkle } from "./Icon";
import { RchibnuMark } from "./Logo";
import { SocialLinks, type Social } from "./SocialLinks";

/**
 * Kartu profil — "kartu nama" personal di halaman Profile.
 *
 * Perbaikan tata letak (versi sebelumnya terasa tidak rapi):
 * — foto & keterangan sama-sama punya proporsi tetap, jadi tidak ada sisi
 *   yang kosong menganga saat kolomnya melebar;
 * — nama lengkap + jabatan + lokasi + status disusun berjenjang dengan
 *   garis pemisah, bukan blok teks yang mengambang;
 * — meta (usia/sekolah/jurusan/kelas) jadi kisi 2×2 dengan label kecil;
 * — jejaring sosial dipisah di barisnya sendiri, rata bawah.
 *
 * Foto bersifat OPSIONAL: kalau `photo` masih null, ditampilkan bingkai
 * yang sudah didesain (lambang + catatan), bukan kotak rusak. Begitu file
 * foto ditambahkan ke /public dan path-nya diisi di data, kartu langsung
 * menampilkannya tanpa perubahan kode.
 */
export function ProfileCard({
  name, initials, role, location, status, photo, socials, meta, className,
}: {
  name: string;
  initials: string;
  role?: string;
  location?: string;
  status?: string;
  photo?: string | null;
  socials?: Social[];
  meta?: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <article className={cn("card spotlight profile-card overflow-hidden", className)}>
      <div className="profile-card__grid">
        {/* --- Foto --- */}
        <div className="profile-card__photo relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-sunken)]">
          <div className="portrait-frame relative h-full w-full overflow-hidden">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt={`Foto ${name}`}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            ) : (
              <div
                role="img"
                aria-label={`Foto ${name} — menyusul`}
                className="grid h-full w-full place-items-center"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
                  backgroundSize: "18px 18px",
                }}
              >
                <div className="flex flex-col items-center gap-3 px-6 text-center">
                  <RchibnuMark size={56} />
                  <span className="mono-label opacity-70">foto menyusul</span>
                </div>
              </div>
            )}
            {/* Sisi senja tipis di atas foto */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
              style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--accent) 16%, transparent), transparent)" }}
            />
          </div>
        </div>

        {/* --- Keterangan --- */}
        <div className="flex min-w-0 flex-col p-6 sm:p-7">
          <header className="min-w-0">
            <h3 className="h3 text-balance">{name}</h3>
          </header>

          {role && (
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--accent)]">
              <Sparkle size={13} className="shrink-0" /> {role}
            </p>
          )}

          {/* Lokasi & status — berjenjang, ada garis pemisah */}
          {(location || status) && (
            <dl className="mt-5 space-y-3 border-t border-[var(--border)] pt-5 text-sm">
              {location && (
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-[var(--text-muted)]" />
                  <dt className="sr-only">Lokasi</dt>
                  <dd className="text-[var(--text-muted)]">{location}</dd>
                </div>
              )}
              {status && (
                <div className="flex items-start gap-2.5">
                  <Briefcase size={15} className="mt-0.5 shrink-0 text-[var(--text-muted)]" />
                  <dt className="sr-only">Status</dt>
                  <dd className="text-[var(--text-muted)]">{status}</dd>
                </div>
              )}
            </dl>
          )}

          {/* Meta — daftar spesifikasi: label kiri, nilai kanan. Baris penuh
              selebar kartu, jadi tidak ada lubang kosong seperti pada kisi
              2×2 sebelumnya (nilai panjang vs pendek bikin kolom pincang). */}
          {meta && meta.length > 0 && (
            <dl className="mt-5 border-t border-[var(--border)] pt-1">
              {meta.map((m) => (
                <div
                  key={m.label}
                  className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] py-2.5 last:border-b-0"
                >
                  <dt className="mono-label shrink-0">{m.label}</dt>
                  <dd className="text-right text-sm leading-snug break-words">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* Jejaring sosial — label di atas, ikon di bawahnya. Ditumpuk
              (bukan label-kiri/ikon-kanan) karena kolom teks kartu sempit,
              sehingga ikon tidak terlempar jauh dari labelnya. */}
          {socials && socials.length > 0 && (
            <div className="mt-auto space-y-3 border-t border-[var(--border)] pt-5">
              <span className="mono-label block">Jejaring</span>
              <SocialLinks items={socials} size="sm" />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
