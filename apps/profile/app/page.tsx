import { rchibnu, featuredCertificates, aruthtale } from "@arufolio/data";
import {
  SectionHeading, Reveal, Button, Tag, ProfileCard, SocialLinks,
  SpotlightCard, TechList, Marquee, TechStack, CountUp,
  GitHub, Instagram, Mail, ArrowUpRight, Trophy, Briefcase, MapPin, Quote,
  Parallax, TextReveal, RchibnuMark,
} from "@arufolio/ui";

/** Warna tiap tahap tema — urutan senja dari gelap ke terang. */
const THEME_COLORS: Record<string, string> = {
  Indigo: "#6366F1", Wisteria: "#B79CE0", Fox: "#E3A57C", Autumn: "#C97F4E",
  Drizzle: "#8FA6BC", Mirror: "#9AA6B2", Ramen: "#F3E7D6", Afterglow: "#EFBE9C",
};

export default function ProfileHome() {
  const { identity, bio, education, interests, skills, experience } = rchibnu;
  const theme = rchibnu.theme as unknown as {
    name: string; concept: string; tagline: string; summary: string;
    core: string[];
    elements: { name: string; meaning: string }[];
  };

  const socials = [
    { label: "GitHub", href: rchibnu.contact.github ?? "#", icon: <GitHub size={16} /> },
    { label: "Instagram", href: rchibnu.contact.instagram ?? "#", icon: <Instagram size={16} /> },
    { label: "Email", href: `mailto:${rchibnu.contact.email}`, icon: <Mail size={16} /> },
  ];

  const topSkills = skills.groups.flatMap((g) => g.items).slice(0, 18);
  const current = experience.find((e) => e.current);
  const awards = featuredCertificates.filter((c) => c.type === "award").length;

  return (
    <>
      {/* ═══════════════════════ HERO + KARTU PROFIL ═══════════════════════ */}
      <section className="relative overflow-hidden pt-[clamp(56px,10vh,112px)] pb-[clamp(40px,6vh,72px)]">
        <Parallax speed={0.14} className="pointer-events-none absolute inset-0">
          <div
            aria-hidden="true"
            className="aurora -left-24 -top-20 h-[420px] w-[420px] rounded-full"
            style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 38%, transparent), transparent 68%)" }}
          />
        </Parallax>
        <Parallax speed={-0.09} className="pointer-events-none absolute inset-0">
          <div
            aria-hidden="true"
            className="aurora right-0 top-32 h-[300px] w-[300px] rounded-full"
            style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--wisteria) 30%, transparent), transparent 68%)", animationDelay: "-9s" }}
          />
        </Parallax>

        <div className="container relative grid-12 items-center">
          {/* Kiri: sapaan */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <p className="mono-label mb-6 inline-flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                </span>
                {identity.location}
              </p>
            </Reveal>

            <h1 className="display max-w-[14ch] text-balance">
              <TextReveal text="Hai, saya" delay={80} />{" "}
              <TextReveal text={identity.displayName + "."} delay={260} className="afterglow-gradient" />
            </h1>

            <Reveal delay={420}>
              <p className="lede mt-6">{identity.headline}</p>
            </Reveal>

            <Reveal delay={480}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/certificates" size="lg" withArrow>Lihat Sertifikat</Button>
                <Button href="https://aruthtales.my.id" variant="ghost" size="lg">Lihat Karya</Button>
              </div>
            </Reveal>

            <Reveal delay={540}>
              <SocialLinks items={socials} className="mt-8" />
            </Reveal>
          </div>

          {/* Kanan: KARTU PROFIL — tempat foto kamu nanti */}
          <div className="col-span-12 mt-12 lg:col-span-5 lg:mt-0">
            <Reveal variant="scale" delay={160}>
              <ProfileCard
                name={identity.fullName}
                initials={identity.displayName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                role={identity.role}
                location={identity.location}
                status={identity.status}
                photo={identity.photo}
                socials={socials}
                meta={[
                  { label: "Usia", value: `${identity.age} tahun` },
                  { label: "Sekolah", value: education.school },
                  { label: "Jurusan", value: "RPL" },
                  { label: "Kelas", value: education.grade.replace("Kelas ", "") },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ MARQUEE TEKNOLOGI ═══════════════════════ */}
      <Reveal>
        <div className="border-y border-[var(--border)] py-7">
          <Marquee duration={48}>
            {topSkills.map((t) => (
              <span key={t} className="mx-5 inline-flex items-center gap-2.5">
                <TechStack items={[t]} size={20} />
                <span className="whitespace-nowrap font-mono text-xs text-[var(--text-muted)]">{t}</span>
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>

      {/* ═══════════════════════ TENTANG ═══════════════════════ */}
      <section className="section container">
        <SectionHeading
          index="01"
          eyebrow="Tentang"
          title="Siapa saya"
          description={bio.short}
        />
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="space-y-5 leading-relaxed text-[var(--text-muted)]">
              {bio.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {interests.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>

          <aside className="col-span-12 mt-10 space-y-4 lg:col-span-5 lg:mt-0 lg:pl-8">
            {current && (
              <SpotlightCard className="card p-6">
                <p className="mono-label inline-flex items-center gap-2">
                  <Briefcase size={12} /> Sekarang
                </p>
                <p className="h3 mt-3">{current.role}</p>
                <p className="mt-1.5 text-sm text-[var(--accent)]">{current.organization}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {current.description}
                </p>
              </SpotlightCard>
            )}

            <SpotlightCard className="card p-6">
              <p className="mono-label inline-flex items-center gap-2">
                <MapPin size={12} /> Berbasis di
              </p>
              <p className="mt-3 text-sm leading-relaxed">{identity.location}</p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{education.school} · {education.major}</p>
            </SpotlightCard>

            {awards > 0 && (
              <SpotlightCard className="card p-6">
                <p className="mono-label inline-flex items-center gap-2">
                  <Trophy size={12} /> Penghargaan
                </p>
                <p className="font-mono text-[clamp(1.6rem,3vw,2rem)] font-medium leading-none tracking-tight mt-3">
                  <CountUp to={awards} />
                </p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Termasuk Juara II STEAM Fair UNS 2024 (tingkat internasional).
                </p>
              </SpotlightCard>
            )}
          </aside>
        </div>
      </section>

      {/* ═══════════════════════ TEMA AFTERGLOW ═══════════════════════ */}
      <section className="section container">
        <SectionHeading
          index="02"
          eyebrow="Tema"
          title={<>Kenapa <span className="afterglow-gradient">{theme.name}</span>?</>}
          description={theme.summary}
        />

        <div className="grid-12">
          <Reveal className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <RchibnuMark size={52} />
              <Quote size={26} className="mt-6 text-[var(--accent)] opacity-60" />
              <p className="pull-quote mt-5">{theme.tagline}</p>
              <p className="mt-6 text-sm leading-relaxed text-[var(--text-muted)]">
                {theme.core.length > 0 && (
                  <>Inti dari delapan metafora ini: <strong className="font-medium text-[var(--text)]">{theme.core.join(" + ")}</strong>.</>
                )}
              </p>
            </div>
          </Reveal>

          <div className="col-span-12 lg:col-span-7">
            {/* Pita warna urutan tema: Indigo → Wisteria → Fox → Autumn →
                Drizzle → Mirror → Ramen → Afterglow */}
            <Reveal>
              <div className="mb-6">
                <div className="flex h-2.5 overflow-hidden rounded-full border border-[var(--border)]">
                  {theme.elements.map((el) => (
                    <span
                      key={el.name}
                      className="flex-1 transition-transform duration-300 hover:scale-y-150"
                      style={{ background: THEME_COLORS[el.name] ?? "var(--border)" }}
                      title={el.name}
                    />
                  ))}
                </div>
                <div className="mt-2.5 flex justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  <span>{theme.elements[0]?.name}</span>
                  <span className="hidden sm:inline">{theme.elements[3]?.name}</span>
                  <span>{theme.elements[theme.elements.length - 1]?.name}</span>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2">
              {theme.elements.map((el, i) => (
                <Reveal key={el.name} delay={i * 55} className="h-full">
                  <div className="card group h-full p-5 transition-colors duration-300 hover:border-[var(--border-strong)]">
                    <div className="flex items-center justify-between gap-3">
                      <p className="inline-flex items-center gap-2.5 text-[0.9375rem] font-medium">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-125"
                          style={{ background: THEME_COLORS[el.name] ?? "var(--accent)" }}
                          aria-hidden="true"
                        />
                        {el.name}
                      </p>
                      <span className="index-num">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-muted)]">{el.meaning}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ KEAHLIAN ═══════════════════════ */}
      <section className="section container">
        <SectionHeading
          index="03"
          eyebrow="Keahlian"
          title="Teknologi & tools"
          description="Yang saya pakai sehari-hari untuk membangun aplikasi."
          action={<Button href="/skills" variant="link">Selengkapnya</Button>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((g, i) => (
            <Reveal key={g.name} delay={i * 50} className="h-full">
              <SpotlightCard className="card h-full p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="mono-label">{g.name}</h3>
                  <span className="index-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <TechList items={g.items} className="mt-5 grid-cols-1" />
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ KREDENSIAL ═══════════════════════ */}
      <section className="section container">
        <SectionHeading
          index="04"
          eyebrow="Kredensial"
          title="Sertifikat & penghargaan"
          description={`${featuredCertificates.length} kredensial unggulan, dipilih dari seluruh sertifikat & penghargaan.`}
          action={<Button href="/certificates" variant="link">Semua sertifikat</Button>}
        />
        <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {featuredCertificates.slice(0, 5).map((c, i) => (
            <Reveal key={c.id} delay={i * 45} as="li">
              <a
                href={c.verifyUrl ?? c.image ?? c.file}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-wrap items-center justify-between gap-3 py-5 transition-colors hover:text-[var(--accent)]"
              >
                <div className="flex items-center gap-4">
                  <span className="index-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm">{c.title}</span>
                  {c.type === "award" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                      <Trophy size={10} /> Juara
                    </span>
                  )}
                </div>
                <span className="mono-label inline-flex items-center gap-2">
                  {c.issuer} · {c.date.slice(0, 4)}
                  <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="section container">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] px-8 py-14 text-center sm:px-14">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "var(--glow)" }} />
            <div className="relative">
              <h2 className="h1 mx-auto max-w-2xl text-balance">Lihat karya saya</h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[var(--text-muted)]">
                Portofolio utama ada di {aruthtale.brand.domain} — tempat semua proyek nyata
                dipamerkan dan dibuktikan.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="https://aruthtales.my.id" size="lg" withArrow>
                  Kunjungi {aruthtale.brand.domain}
                </Button>
                <Button href="/contact" variant="ghost" size="lg">Hubungi Saya</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
