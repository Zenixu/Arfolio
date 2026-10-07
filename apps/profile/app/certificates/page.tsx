import type { Metadata } from "next";
import { certificates, courses, awards } from "@arufolio/data";
import { SectionHeading, CertificateCard, Reveal } from "@arufolio/ui";

export const metadata: Metadata = { title: "Sertifikat", description: "Sertifikat kursus dan penghargaan kompetisi." };

export default function CertificatesPage() {
  return (
    <section className="section container">
      <SectionHeading
        eyebrow="Kredensial"
        title="Sertifikat & penghargaan"
        description={`${certificates.length} kredensial — ${courses.length} sertifikasi kursus dan ${awards.length} penghargaan kompetisi.`}
      />

      {awards.length > 0 && (
        <>
          <h2 className="mono-label mb-5">Penghargaan</h2>
          <div className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((c, i) => (
              <Reveal key={c.id} delay={i * 50} className="h-full"><CertificateCard cert={c} /></Reveal>
            ))}
          </div>
        </>
      )}

      <h2 className="mono-label mb-5">Sertifikasi kursus</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c, i) => (
          <Reveal key={c.id} delay={i * 50} className="h-full"><CertificateCard cert={c} /></Reveal>
        ))}
      </div>
    </section>
  );
}
