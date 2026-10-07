import type { Certificate } from "@arufolio/data";
import { Tag } from "./Tag";
import { Thumb } from "./Thumb";
import { ArrowUpRight, Verified } from "./Icon";

/**
 * Kartu sertifikat. Penghargaan (award) diberi lencana khusus supaya
 * secara visual berbeda dari kursus biasa.
 */
export function CertificateCard({ cert }: { cert: Certificate }) {
  const isAward = cert.type === "award";
  const href = cert.image ?? cert.file;

  return (
    <figure className="group card spotlight flex h-full flex-col hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-lift)]">
      <a href={href} target="_blank" rel="noreferrer" className="relative block shrink-0">
        <div className="aspect-[1.41/1] overflow-hidden bg-[var(--bg-sunken)]">
          <Thumb
            src={cert.thumb}
            alt={cert.title}
            placeholder="gambar menyusul"
            className="h-full w-full object-cover object-top transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.035]"
          />
        </div>
        {isAward && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-white shadow-sm">
            <Verified size={11} /> Penghargaan
          </span>
        )}
      </a>

      <figcaption className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="mono-label">{isAward ? "Penghargaan" : "Sertifikat"}</span>
          <span className="h-2.5 w-px bg-[var(--border-strong)]" aria-hidden="true" />
          <span className="mono-label">{cert.date.slice(0, 4)}</span>
        </div>
        <h3 className="mt-2.5 text-[0.9375rem] font-medium leading-snug">{cert.title}</h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{cert.issuer}</p>
        {cert.skills.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {cert.skills.slice(0, 3).map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
        )}
        <div className="mt-auto flex items-center gap-4 pt-5 text-sm">
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="link-row text-[var(--accent)]"
            >
              Verifikasi <ArrowUpRight size={13} />
            </a>
          )}
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="link-row text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            Lihat
          </a>
        </div>
      </figcaption>
    </figure>
  );
}
