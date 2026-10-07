import { featuredProjects, projects, lab, aruthtale } from "@arufolio/data";
import { ProjectCard, SectionHeading, Reveal, Button, Tag } from "@arufolio/ui";

export default function HomePage() {
  const skills = ["TypeScript", "React 19", "Next.js", "Laravel", "Node.js", "PostgreSQL", "Supabase", "Tailwind CSS", "Capacitor"];

  return (
    <>
      {/* HERO */}
      <section className="section container">
        <Reveal>
          <p className="mono-label mb-5">{aruthtale.brand.handle} · Fullstack Developer</p>
          <h1 className="display max-w-4xl">
            Proof, not promises.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--text-muted)] leading-relaxed">
            {aruthtale.brand.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/work">Lihat Karya →</Button>
            <Button href="https://rchibnu.aruthtales.my.id" variant="ghost">Kenal Saya</Button>
          </div>
        </Reveal>

        {/* Skills marquee-ish */}
        <Reveal delay={120}>
          <div className="mt-16 flex flex-wrap gap-2 border-t border-[var(--border)] pt-8">
            {skills.map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
        </Reveal>
      </section>

      {/* FEATURED */}
      <section className="section container">
        <SectionHeading
          eyebrow="The Work"
          title="Karya terpilih"
          description={`${projects.length} proyek nyata — dari aplikasi Android sampai platform SaaS.`}
          action={<Button href="/work" variant="link">Semua karya →</Button>}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.slice(0, 6).map((p, i) => (
            <Reveal key={p.slug} delay={i * 60} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* LEARNING VAULT TEASER */}
      <section className="section container">
        <SectionHeading
          eyebrow="Learning Vault"
          title="Yang saya bangun untuk belajar"
          description={`${lab.length} eksperimen kecil — arsip proses, bukan pajangan.`}
          action={<Button href="/lab" variant="link">Masuk vault →</Button>}
        />
        <div className="flex flex-wrap gap-2">
          {lab.slice(0, 12).map((l) => <Tag key={l.slug}>{l.title}</Tag>)}
        </div>
      </section>

      {/* CTA */}
      <section className="section container">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-10 text-center">
          <h2 className="h2">Punya proyek atau ingin merekrut?</h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--text-muted)]">
            Saya terbuka untuk proyek freelance, kolaborasi, maupun peluang kerja.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Hubungi Saya</Button>
            <Button href="https://rchibnu.aruthtales.my.id" variant="ghost">Lihat Profil</Button>
          </div>
        </div>
      </section>
    </>
  );
}
