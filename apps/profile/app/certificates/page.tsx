import type { Metadata } from "next";
import { certificates, courses, awards } from "@arufolio/data";
import { SectionHeading, CertificateCard, Reveal, CountUp } from "@arufolio/ui";

export const metadata: Metadata = {
  title: "Sertifikat",
  description: "Sertifikat kursus dan penghargaan kompetisi.",
  alternates: { canonical: "/certificates" },
};

export default function CertificatesPage() {
  return (
    <section className="section container">
      <SectionHeading
        index="01"
        eyebrow="Kredensial"
        title={<>Sertifikat & <span className="afterglow-gradient">penghargaan</span></>}
        description={`${certificates.length} kredensial — ${courses.length} sertifikasi kursus dan ${awards.length} penghargaan kompetisi.`}
      />

      <div className="mb-14 grid grid-cols-3 gap-x-8 border-y border-[var(--border)] py-9">
        <div>
          <dd className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-tight">
            <CountUp to={certificates.length} />
          </dd>
          <dt className="mono-label mt-2.5">Total</dt>
        </div>
        <div>
          <dd className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-tight">
            <CountUp to={courses.length} />
          </dd>
          <dt className="mono-label mt-2.5">Kursus</dt>
        </div>
        <div>
          <dd className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-tight">
            <CountUp to={awards.length} />
          </dd>
          <dt className="mono-label mt-2.5">Penghargaan</dt>
        </div>
      </div>

      {awards.length > 0 && (
        <div className="mb-16">
          <div className="mb-6 flex items-center gap-4">
            <span className="index-num">01</span>
            <h2 className="mono-label">Penghargaan</h2>
            <span className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
            <span className="mono-label">{String(awards.length).padStart(2, "0")}</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 60} className="h-full">
                <CertificateCard cert={c} />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="mb-6 flex items-center gap-4">
          <span className="index-num">02</span>
          <h2 className="mono-label">Sertifikasi kursus</h2>
          <span className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
          <span className="mono-label">{String(courses.length).padStart(2, "0")}</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 60} className="h-full">
              <CertificateCard cert={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
