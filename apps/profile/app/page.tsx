import { rchibnu, featuredCertificates, aruthtale } from "@arufolio/data";
import { SectionHeading, Reveal, Button, Tag } from "@arufolio/ui";

export default function ProfileHome() {
  const { identity, bio, education, interests } = rchibnu;

  return (
    <>
      {/* HERO */}
      <section className="section container">
        <Reveal>
          <p className="mono-label mb-5">{identity.location} · {identity.status}</p>
          <h1 className="display afterglow-gradient max-w-3xl">{identity.displayName}</h1>
          <p className="mt-5 max-w-2xl text-lg text-[var(--text-muted)] leading-relaxed">
            {identity.headline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/certificates">Lihat Sertifikat</Button>
            <Button href="https://aruthtales.my.id" variant="ghost">Lihat Karya →</Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <dl className="mt-16 grid gap-6 border-t border-[var(--border)] pt-8 sm:grid-cols-4">
            <div><dt className="mono-label">Usia</dt><dd className="mt-1.5 text-sm">{identity.age} tahun</dd></div>
            <div><dt className="mono-label">Peran</dt><dd className="mt-1.5 text-sm">{identity.role}</dd></div>
            <div><dt className="mono-label">Sekolah</dt><dd className="mt-1.5 text-sm">{education.school}</dd></div>
            <div><dt className="mono-label">Jurusan</dt><dd className="mt-1.5 text-sm">RPL · Kelas {education.grade.replace("Kelas ","")}</dd></div>
          </dl>
        </Reveal>
      </section>

      {/* BIO */}
      <section className="section container max-w-3xl">
        <SectionHeading eyebrow="Tentang" title="Siapa saya" />
        <div className="space-y-5 text-[var(--text-muted)] leading-relaxed">
          {bio.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {interests.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </section>

      {/* CERT PREVIEW */}
      <section className="section container">
        <SectionHeading
          eyebrow="Kredensial"
          title="Sertifikat & penghargaan"
          description={`${featuredCertificates.length} kredensial unggulan, dipilih dari seluruh sertifikat & penghargaan.`}
          action={<Button href="/certificates" variant="link">Semua sertifikat →</Button>}
        />
        <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {featuredCertificates.slice(0, 4).map((c) => (
            <li key={c.id} className="flex flex-wrap items-baseline justify-between gap-3 py-4">
              <span className="text-sm">{c.title}</span>
              <span className="mono-label">{c.issuer} · {c.date.slice(0, 4)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="section container">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-10 text-center">
          <h2 className="h2">Lihat karya saya</h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--text-muted)]">
            Portofolio utama ada di {aruthtale.brand.domain} — tempat semua proyek nyata dipamerkan.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="https://aruthtales.my.id">Kunjungi {aruthtale.brand.domain}</Button>
            <Button href="/contact" variant="ghost">Hubungi Saya</Button>
          </div>
        </div>
      </section>
    </>
  );
}
