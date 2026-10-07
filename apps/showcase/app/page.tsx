import {
  featuredProjects, projects, lab, aruthtale,
} from "@arufolio/data";
import {
  ProjectCard, SectionHeading, Reveal, Button, Tag,
  Marquee, CountUp, SpotlightCard, TechStack, ArrowRight, ArrowDown, Quote, Star,
  Parallax, TextReveal, ScrollTicker, AruthtaleMark, VideoBanner,
  Code, Layers, Shield, Globe, Sparkle, MapPin, ArrowUpRight, LearningVault,
  CrossLink,
} from "@arufolio/ui";

/** Teknologi untuk marquee — diambil dari tag proyek + daftar inti. */
const MARQUEE = [
  "TypeScript", "React 19", "Next.js", "Laravel", "Node.js", "PostgreSQL",
  "Tailwind CSS v4", "Supabase", "Capacitor", "Vite", "Flutter", "PHP",
  "MySQL", "Firebase", "Docker", "Git", "Figma", "Python",
];

/** Ikon per layanan — supaya sel tidak terasa kosong. */
const SERVICE_ICONS = [Globe, Sparkle, Layers, Code, Shield, Star];

export default function HomePage() {
  const services = aruthtale.services as { slug: string; name: string; description: string }[];
  const philosophy = aruthtale.philosophy as {
    summary: string; statement: string;
    nameOrigin: { explanation: string };
    elements: { element: string; symbol: string; meaning: string }[];
  };

  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden pt-[clamp(64px,12vh,132px)] pb-[clamp(48px,8vh,96px)]">
        {/* Latar bergerak: klip aurora 58 KB + poster WebP.
            Mati otomatis saat pengguna minta gerak dikurangi. */}
        <VideoBanner src="/media/banner-aurora.mp4" poster="/media/banner-poster.webp" opacity={0.5} />

        {/* Bercak gradien yang mengapung pelan + bergerak mengikuti gulir */}
        <Parallax speed={0.16} className="pointer-events-none absolute inset-0">
          <div
            aria-hidden="true"
            className="aurora -left-24 -top-24 h-[420px] w-[420px] rounded-full"
            style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 42%, transparent), transparent 68%)" }}
          />
        </Parallax>
        <Parallax speed={-0.1} className="pointer-events-none absolute inset-0">
          <div
            aria-hidden="true"
            className="aurora right-0 top-40 h-[320px] w-[320px] rounded-full"
            style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--accent-2) 26%, transparent), transparent 68%)", animationDelay: "-8s" }}
          />
        </Parallax>

        <div className="container relative">
          {/* Baris meta atas ala editorial */}
          <Reveal>
            <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="mono-label inline-flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-2)] opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-2)]" />
                </span>
                Tersedia untuk proyek
              </span>
              <span className="h-3 w-px bg-[var(--border-strong)]" aria-hidden="true" />
              <span className="mono-label inline-flex items-center gap-1.5"><MapPin size={11} /> Cianjur, Indonesia</span>
              <span className="h-3 w-px bg-[var(--border-strong)]" aria-hidden="true" />
              <span className="mono-label">Est. 2026</span>
            </div>
          </Reveal>

          {/* Judul utama — muncul kata demi kata */}
          <h1 className="display max-w-[15ch] text-balance">
            <TextReveal text="Karya," delay={80} />
            <br />
            <TextReveal text="bukan kata." delay={240} className="grad-text" />
          </h1>

          {/* Identitas pemilik — sebelumnya nama ini tidak terlihat sama sekali */}
          <Reveal delay={360}>
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--bg-elevated)_70%,transparent)] px-3.5 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                <span className="text-[0.8125rem] font-medium">Ibnu Hambal</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  Fullstack Developer
                </span>
              </span>
              <span className="font-mono text-[11px] text-[var(--text-muted)]">
                brand <span className="text-[var(--accent)]">aruthtale</span> · handle{" "}
                <span className="text-[var(--text)]">rchibnu</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <p className="lede mt-6">
              {aruthtale.brand.description} Setiap karya di sini adalah satu bab — bukan
              pajangan, tapi bukti bahwa sesuatu benar-benar dibangun.
            </p>
          </Reveal>

          <Reveal delay={480}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/work" size="lg" withArrow>Lihat Karya</Button>
              <a
                href="/contact"
                className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                Mulai percakapan
                <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          {/* "Kenal Saya" — sengaja dibuat lebih spesial daripada tombol ghost:
              kartu lintas-situs dengan lambang, keterangan, dan garis aksen yang
              menyala saat hover. Ini jalur utama menuju profil personal. */}
          <Reveal delay={520}>
            <CrossLink
              href="https://rchibnu.aruthtales.my.id"
              site="profile"
              label="Kenal Saya"
              sub="Siapa orang di balik aruthtale — perjalanan, keahlian, dan sertifikat."
              className="mt-6"
            />
          </Reveal>

          {/* Statistik — angka berhitung naik saat masuk viewport */}
          <Reveal delay={540}>
            <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[var(--border)] pt-9 sm:grid-cols-4">
              <div>
                <dd className="font-mono text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-none tracking-tight">
                  <CountUp to={projects.length} />
                </dd>
                <dt className="mono-label mt-2.5">Proyek nyata</dt>
              </div>
              <div>
                <dd className="font-mono text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-none tracking-tight">
                  <CountUp to={lab.length} />
                </dd>
                <dt className="mono-label mt-2.5">Eksperimen</dt>
              </div>
              <div>
                <dd className="font-mono text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-none tracking-tight">
                  <CountUp to={services.length} />
                </dd>
                <dt className="mono-label mt-2.5">Layanan</dt>
              </div>
              <div>
                <dd className="font-mono text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-none tracking-tight">
                  2026
                </dd>
                <dt className="mono-label mt-2.5">Berdiri sejak</dt>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Marquee logo teknologi */}
        <Reveal delay={600}>
          <div className="mt-14 border-y border-[var(--border)] py-7">
            <Marquee duration={44}>
              {MARQUEE.map((t) => (
                <span key={t} className="mx-6 inline-flex items-center gap-3">
                  <TechStack items={[t]} size={22} />
                  <span className="whitespace-nowrap font-mono text-xs text-[var(--text-muted)]">{t}</span>
                </span>
              ))}
            </Marquee>
          </div>
        </Reveal>

        <div className="container">
          <Reveal delay={640}>
            <span className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
              <ArrowDown size={14} /> Karya, lab, dan kisahnya
            </span>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════ PITA PERNYATAAN ═══════════════════════
          Teks raksasa bergaris yang bergerak mengikuti gulir — memberi
          "napas" pada halaman, bukan bagian yang diam & kaku.
          Ruang bawah ekstra supaya ekor huruf (p, y, g) tidak terpangkas. */}
      <section className="relative overflow-hidden border-y border-[var(--border)] py-14 sm:py-20" aria-label={philosophy.statement}>
        <ScrollTicker baseSpeed={0.32}>
          <div className="flex items-center gap-8 whitespace-nowrap sm:gap-10">
            {[0, 1].map((k) => (
              <span key={k} className="inline-flex items-center gap-8 sm:gap-10">
                <span
                  className="pb-[0.14em] font-bold tracking-[-0.04em]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.9rem, 7vw, 6rem)",
                    lineHeight: 1.06,
                    color: "transparent",
                    WebkitTextStroke: "1px var(--border-strong)",
                  }}
                >
                  Karya, bukan kata
                </span>
                <AruthtaleMark size={40} className="shrink-0" />
                <span
                  className="pb-[0.14em] font-bold tracking-[-0.04em]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.9rem, 7vw, 6rem)",
                    lineHeight: 1.06,
                    color: "transparent",
                    WebkitTextStroke: "1px color-mix(in srgb, var(--accent) 55%, transparent)",
                  }}
                >
                  aruthtale
                </span>
                <AruthtaleMark size={40} className="shrink-0" />
              </span>
            ))}
          </div>
        </ScrollTicker>
      </section>

      {/* ═══════════════════════ FILOSOFI ═══════════════════════ */}
      <section id="filosofi" className="section container scroll-mt-24">
        <SectionHeading
          index="01"
          eyebrow="Filosofi"
          title={<>Kenapa namanya <span className="text-[var(--accent)]">aruthtale</span>?</>}
          description={philosophy.nameOrigin.explanation}
        />

        <div className="grid-12">
          {/* Kutipan besar */}
          <Reveal className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <AruthtaleMark size={52} />
              <Quote size={26} className="mt-6 text-[var(--accent)] opacity-60" />
              <p className="pull-quote mt-5">{philosophy.statement}</p>
              <p className="mt-6 text-sm leading-relaxed text-[var(--text-muted)]">
                {philosophy.summary}
              </p>
            </div>
          </Reveal>

          {/* Empat unsur pembentuk nama */}
          <div className="col-span-12 grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {philosophy.elements.map((el, i) => (
              <Reveal key={el.element} delay={i * 80} className="h-full">
                <SpotlightCard className="card h-full p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="h3">{el.element}</h3>
                    <span className="index-num">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-3 text-xs italic leading-relaxed text-[var(--accent)] opacity-90">
                    {el.symbol}
                  </p>
                  <p className="mt-3.5 text-sm leading-relaxed text-[var(--text-muted)]">
                    {el.meaning}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ KARYA ═══════════════════════ */}
      <section id="karya" className="section container scroll-mt-24">
        <SectionHeading
          index="02"
          eyebrow="The Work"
          title="Karya terpilih"
          description={`${projects.length} proyek nyata — dari aplikasi Android sampai platform SaaS. Tiap proyek punya peran, stack, dan hasil yang bisa diperiksa.`}
          action={<Button href="/work" variant="link">Semua karya</Button>}
        />

        {/* Di HP kartu ini jadi rel yang digeser ke samping (snap per kartu);
            di layar lebar kembali menjadi grid 2–3 kolom. */}
        <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] md:hidden">
          <ArrowRight size={12} /> Geser ke samping
        </div>
        <div className="rail-hint">
          <div className="snap-rail">
            {featuredProjects.slice(0, 6).map((p, i) => (
              <Reveal key={p.slug} delay={i * 70} className="h-full">
                <ProjectCard project={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ LAYANAN ═══════════════════════ */}
      <section className="section container">
        <SectionHeading
          index="03"
          eyebrow="Layanan"
          title="Yang bisa saya bangun"
          description="Dari situs portofolio sederhana sampai aplikasi bersistem. Semua dikerjakan dengan pendekatan yang sama: rapi, cepat, dan benar."
        />
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
            return (
              <Reveal key={s.slug} delay={i * 55} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden bg-[var(--bg-elevated)] p-6 transition-colors duration-300 hover:bg-[var(--bg-sunken)]">
                  {/* Garis aksen yang tumbuh dari kiri saat hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:scale-x-100"
                  />
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-10 w-10 place-items-center rounded-[10px] border border-[var(--border)] text-[var(--text-muted)] transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                      <Icon size={17} />
                    </span>
                    <span className="index-num">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="h3 mt-5">{s.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-muted)]">
                    {s.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]">
                    Diskusikan
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════ LEARNING VAULT ═══════════════════════ */}
      <section className="section container">
        <SectionHeading
          index="04"
          eyebrow="Learning Vault"
          title={<>Things I built to learn — <span className="accent-italic">not to impress.</span></>}
          description={`${lab.length} eksperimen kecil sepanjang perjalanan belajar. Sebelum ada proyek besar, ada repo-repo kecil yang membuat saya paham cara kerjanya.`}
          action={<Button href="/lab" variant="link">Masuk vault</Button>}
        />
        <LearningVault items={lab.filter((l) => l.thumb).slice(0, 5)} total={lab.length} />
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="section container">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] px-8 py-14 text-center sm:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{ background: "var(--glow)" }}
            />
            {/* Logo raksasa samar di latar — memberi kedalaman, bukan polos */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 opacity-[0.06]">
              <AruthtaleMark size={260} />
            </div>
            <div className="relative">
              <span className="mono-label inline-flex items-center gap-2">
                <Star size={12} /> Kolaborasi
              </span>
              <h2 className="h1 mx-auto mt-5 max-w-2xl text-balance">
                Punya proyek atau ingin merekrut?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[var(--text-muted)] leading-relaxed">
                Saya terbuka untuk proyek freelance, kolaborasi, maupun peluang kerja.
                Ceritakan idemu — kita bahas bagaimana mewujudkannya.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button href="/contact" size="lg" withArrow>Hubungi Saya</Button>
              </div>
              <Reveal delay={120}>
                <CrossLink
                  href="https://rchibnu.aruthtales.my.id"
                  site="profile"
                  label="Lihat Profil"
                  sub="Perjalanan, keahlian, dan sertifikat saya."
                  className="mt-5"
                />
              </Reveal>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
