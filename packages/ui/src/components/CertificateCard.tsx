import type { Certificate } from "@arufolio/data";
import { Tag } from "./Tag";
import { Thumb } from "./Thumb";

export function CertificateCard({ cert }: { cert: Certificate }) {
  return (
    <figure className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)]">
      <a href={cert.image ?? cert.file} target="_blank" rel="noreferrer" className="block shrink-0">
        <div className="aspect-[1.41/1] overflow-hidden bg-[var(--bg)]">
          <Thumb
            src={cert.thumb}
            alt={cert.title}
            placeholder="gambar menyusul"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </a>
      <figcaption className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="mono-label">{cert.type === "award" ? "Penghargaan" : "Sertifikat"}</span>
          <span className="mono-label">·</span>
          <span className="mono-label">{cert.date.slice(0, 4)}</span>
        </div>
        <h3 className="mt-2 text-sm font-medium leading-snug">{cert.title}</h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{cert.issuer}</p>
        {cert.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {cert.skills.slice(0, 3).map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
        )}
        <div className="mt-auto flex gap-4 pt-4 text-sm">
          {cert.verifyUrl && (
            <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:underline underline-offset-4">
              Verifikasi ↗
            </a>
          )}
          <a href={cert.image ?? cert.file} target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
            Lihat
          </a>
        </div>
      </figcaption>
    </figure>
  );
}
