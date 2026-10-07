import { cn } from "../lib/cn";
import { Briefcase, MapPin, Sparkle } from "./Icon";
import { RchibnuMark } from "./Logo";
import { SocialLinks, type Social } from "./SocialLinks";

/**
 * Kartu profil — "kartu nama" personal di halaman Profile.
 *
 * Foto bersifat OPSIONAL: kalau `photo` masih null, ditampilkan bingkai
 * kosong yang sudah didesain (inisial + catatan), bukan kotak rusak.
 * Begitu file foto ditambahkan ke /public dan path-nya diisi di data,
 * kartu langsung menampilkannya tanpa perubahan kode.
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
    <article className={cn("card spotlight overflow-hidden", className)}>
      <div className="grid gap-0 sm:grid-cols-[minmax(0,240px)_1fr]">
        {/* --- Foto --- */}
        <div className="relative border-b border-[var(--border)] bg-[var(--bg-sunken)] sm:border-b-0 sm:border-r">
          <div className="portrait-frame relative aspect-[4/5] w-full overflow-hidden sm:h-full sm:aspect-auto">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt={`Foto ${name}`}
                className="h-full w-full object-cover"
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
                  <RchibnuMark size={64} />
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
        <div className="flex flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="h3">{name}</h3>
              {role && (
                <p className="mt-1.5 inline-flex items-center gap-2 text-sm text-[var(--accent)]">
                  <Sparkle size={13} /> {role}
                </p>
              )}
            </div>
          </div>

          <dl className="mt-6 space-y-3 text-sm">
            {location && (
              <div className="flex items-center gap-2.5 text-[var(--text-muted)]">
                <MapPin size={15} className="shrink-0 text-[var(--text-muted)]" />
                <dt className="sr-only">Lokasi</dt>
                <dd>{location}</dd>
              </div>
            )}
            {status && (
              <div className="flex items-center gap-2.5 text-[var(--text-muted)]">
                <Briefcase size={15} className="shrink-0" />
                <dt className="sr-only">Status</dt>
                <dd>{status}</dd>
              </div>
            )}
          </dl>

          {meta && meta.length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-5">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="mono-label">{m.label}</dt>
                  <dd className="mt-1 text-sm">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {socials && socials.length > 0 && (
            <div className="mt-auto pt-7">
              <SocialLinks items={socials} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
