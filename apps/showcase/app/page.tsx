import {
  featuredProjects, projects, lab, aruthtale, certificates, github,
} from "@arufolio/data";
import {
  SectionHeading, Reveal, Button,
  CountUp, SpotlightCard, TechStack, ArrowRight, Quote, Star,
  Parallax, TextReveal, ScrollSweep, AruthtaleMark, VideoBanner,
  Code, Layers, Shield, Globe, Sparkle, ArrowUpRight, LearningVault,
  CrossLink, Ouroboros, WorkStage,
} from "@arufolio/ui";

/** Teknologi untuk legenda — diambil dari tag proyek + daftar inti. */
const MARQUEE = [
  "TypeScript", "React 19", "Next.js", "Laravel", "Node.js", "PostgreSQL",
  "Tailwind CSS v4", "Supabase", "Capacitor", "Vite", "Flutter", "PHP",
  "MySQL", "Firebase", "Docker", "Git", "Figma", "Python",
];

/** 10 logo terkuat untuk cincin ouroboros (sisanya tetap ada di legenda).
 *  Dipilih supaya mewakili tiap lapis: bahasa, frontend, backend, data,
 *  mobile, dan tools. Cincin dengan 18 ikon akan terlalu besar & padat. */
const OUROBOROS_CORE = [
  "TypeScript", "React 19", "Next.js", "Laravel", "Node.js",
  "PostgreSQL", "Flutter", "Docker", "Figma", "Python",
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
          {/* Judul utama — muncul kata demi kata */}
          <h1 className="display max-w-[15ch] text-balance">
            <TextReveal text="Work," delay={80} />
            <br />
            <TextReveal text="not words." delay={240} className="grad-text" />
          </h1>

          <Reveal delay={360}>
            <p className="lede mt-7">
              A web development studio turning ideas into functional, interactive,
              user-centered applications. Every piece of work here is a chapter — not a
              display, but proof that something was actually built.
            </p>
          </Reveal>

          <Reveal delay={480}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/work" size="lg" withArrow>See the Work</Button>
              <a
                href="/contact"
                className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                Start a conversation
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

          {/* ── Buku besar (ledger) ──
              Dulu blok ini adalah 4 angka raksasa berjajar — pola template
              yang terasa generik. Sekarang bergaya kolofon cetak: tiap entri
              punya label, titik pemandu, angka tabular, DAN catatan kecil
              yang menjelaskan angkanya. Angka tanpa keterangan = tidak jelas;
              catatan inilah yang membuatnya bisa dipercaya. */}
          <Reveal delay={540}>
            <div className="ledger">
              <div className="ledger__head">
                <span className="mono-label">By the numbers</span>
                <span className="mono-label">Ledger · 2024 — now</span>
              </div>

              <div className="ledger__row">
                <span className="ledger__label">Real projects</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="ledger__num"><CountUp to={projects.length} /></span>
                <span className="ledger__note">Shipped &amp; documented</span>
              </div>

              <div className="ledger__row">
                <span className="ledger__label">Experiments</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="ledger__num"><CountUp to={lab.length} /></span>
                <span className="ledger__note">Built to learn</span>
              </div>

              <div className="ledger__row">
                <span className="ledger__label">Certificates</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="ledger__num"><CountUp to={certificates.length} /></span>
                <span className="ledger__note">Verified programs</span>
              </div>

              <div className="ledger__row">
                <span className="ledger__label">Commits</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="ledger__num"><CountUp to={github.commits} /></span>
                <span className="ledger__note">on GitHub · @{github.login}</span>
              </div>

              <div className="ledger__row">
                <span className="ledger__label">Services offered</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="ledger__num"><CountUp to={services.length} /></span>
                <span className="ledger__note">Open for work</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Ouroboros + legenda ──
            Tech stack sebagai SATU cincin berputar tanpa ujung (10 logo
            terkuat), dengan inti lambang aruthtale. Nama teknologi muncul
            saat wajahnya disorot. Karena nama tidak ikut berputar, ke-18
            nama tetap tersedia di legenda statis di sebelahnya — jadi tidak
            ada informasi yang hilang. Ini juga menyisakan SATU pita bergerak
            di halaman (cincin ini), sesuai keputusan sebelumnya. */}
        <div className="container relative mt-14 border-t border-[var(--border)] pt-10">
          <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <Reveal>
              <div className="flex justify-center lg:justify-start">
                <Ouroboros items={OUROBOROS_CORE} size={22} />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <span className="mono-label">Stack — {MARQUEE.length} tools</span>
                  {/* Layar sentuh tidak punya hover — jadi petunjuknya dibedakan
                      per breakpoint, bukan menyuruh sesuatu yang tak bisa. */}
                  <span className="mono-label hidden sm:inline">Hover the ring to read names</span>
                  <span className="mono-label sm:hidden">Tap a logo to read its name</span>
                </div>
                <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                  {MARQUEE.map((t, i) => (
                    <li key={t} className="inline-flex items-center gap-2.5">
                      <span className="font-mono text-[10px] tabular-nums text-[var(--text-muted)] opacity-60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <TechStack items={[t]} size={16} />
                      <span className="truncate text-sm text-[var(--text-muted)]">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PITA MANIFESTO ═══════════════════════
          SATU pita bergerak — dan ia BERISI. Versi lama hanya mengulang
          slogan kosong; sekarang pita bergantian antara PERNYATAAN dan
          BUKTI (angka nyata dari repo). Yang bergulir adalah substansi. */}
      <section
        className="relative overflow-hidden border-y border-[var(--border)] py-14 sm:py-20"
        aria-label={philosophy.statement}
      >
        {/* Label running-head yang menempel di tepi kiri — supaya tidak ada
            teks yang terasing tanpa konteks (dulu baris hint melayang). */}
        <div className="container mb-8 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          <span className="mono-label">Manifesto — aruthtale</span>
        </div>

        <ScrollSweep>
          <div className="flex items-center gap-10 whitespace-nowrap sm:gap-14">
            {/* SATU salinan (≈3371px) sudah lebih lebar dari layar: saat
                berada di tengah sapuan, layar tertutup penuh. Fase "masuk
                dari kiri" & "keluar ke kanan" memang memperlihatkan sisi
                yang belum/tidak lagi terisi — itulah efek sapuannya. Satu
                salinan juga membuat geraknya tidak melesat. */}
            <span className="inline-flex items-center gap-10 sm:gap-14">
              <span className="manifesto__word">Work, not words</span>

              <span className="manifesto__proof">
                <b>{projects.length}</b> real projects <span className="manifesto__sep">◆</span>
              </span>

              <span className="manifesto__word manifesto__word--accent">aruthtale</span>

              <span className="manifesto__proof">
                <b>{lab.length}</b> experiments <span className="manifesto__sep">◆</span>
              </span>

              <span className="manifesto__word">Portfolio · SaaS · POS · Web</span>

              <span className="manifesto__proof">
                <b>{github.commits}</b> commits <span className="manifesto__sep">◆</span>
              </span>

              <span className="manifesto__word manifesto__word--accent">Since 2024</span>

              <AruthtaleMark size={36} className="shrink-0" />
            </span>
          </div>
        </ScrollSweep>
      </section>

      {/* ═══════════════════════ FILOSOFI ═══════════════════════ */}
      <section id="filosofi" className="section container scroll-mt-24">
        <SectionHeading
          index="01"
          eyebrow="Filosofi"
          title={<>Why <span className="text-[var(--accent)]">Aruthtale</span>?</>}
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

        {/* Panggung lengket: kolom kiri menempel & menampilkan tangkapan layar
            besar yang berganti mengikuti baris yang sedang dibaca. Jadi gambar
            yang sudah ada benar-benar hadir, bukan hanya saat hover. */}
        <WorkStage projects={featuredProjects.slice(0, 5)} />
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
