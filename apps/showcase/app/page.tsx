import {
  featuredProjects, projects, lab, aruthtale, certificates, github,
} from "@arufolio/data";
import {
  SectionHeading, Reveal, Button,
  CountUp, SpotlightCard, TechStack, ArrowRight, Quote, Star,
  Parallax, TextReveal, ScrollSweep, AruthtaleMark,
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

/** Label kategori untuk pita karya — supaya tidak menampilkan slug Inggris. */
const CATEGORY_LABEL: Record<string, string> = {
  application: "aplikasi",
  automation: "otomasi",
  saas: "SaaS",
  website: "situs",
  tool: "alat",
};

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
        {/* Latar polos. Sebelumnya di sini ada klip aurora ungu-hijau plus dua
            bercak gradien yang bergerak mengikuti gulir. Kombinasi itu yang
            paling khas "situs buatan model", dan warnanya tidak mungkin
            disamakan dengan navy + kuningan. Dibuang, bukan ditambahi. */}
        <div className="container relative">
          {/* Judul utama: nama, lalu satu kalimat yang menyebut siapa & di mana.
              Versi lama ("aruthtale — not words.") adalah aforisme yang tidak
              bisa diperiksa; pembaca tidak dapat apa-apa darinya. */}
          <h1 className="display max-w-[18ch] text-balance">
            <TextReveal text="aruthtale" delay={80} />
            <span className="hero-place">Aruthtales Studio</span>
          </h1>

          <Reveal delay={360}>
            <p className="lede mt-7">
              Aplikasi kasir, katalog produk, dan dashboard internal. Dari sketsa
              sampai deploy, dikerjakan sendiri. Tujuh proyek sudah selesai dan
              bisa diperiksa satu per satu di halaman Karya.
            </p>
          </Reveal>

          <Reveal delay={480}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/work" size="lg" withArrow>Lihat karya</Button>
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
              sub="Perjalanan, keahlian, dan sertifikat."
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
                <span className="mono-label">Angka</span>
                <span className="mono-label">Catatan · 2024–2026</span>
              </div>

              <div className="ledger__row">
                <span className="ledger__label">Proyek nyata</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="ledger__num"><CountUp to={projects.length} /></span>
                <span className="ledger__note">Selesai &amp; terdokumentasi</span>
              </div>

              <div className="ledger__row">
                <span className="ledger__label">Eksperimen</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="ledger__num"><CountUp to={lab.length} /></span>
                <span className="ledger__note">Dibuat untuk belajar</span>
              </div>

              <div className="ledger__row">
                <span className="ledger__label">Sertifikat</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="ledger__num"><CountUp to={certificates.length} /></span>
                <span className="ledger__note">Program terverifikasi</span>
              </div>

              <div className="ledger__row">
                <span className="ledger__label">Commit</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="ledger__num"><CountUp to={github.commits} /></span>
                <span className="ledger__note">GitHub · @{github.login}</span>
              </div>

              <div className="ledger__row">
                <span className="ledger__label">Layanan</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="ledger__num"><CountUp to={services.length} /></span>
                <span className="ledger__note">Terbuka untuk kerja</span>
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
                  <span className="mono-label">Stack · {MARQUEE.length} alat</span>
                  {/* Layar sentuh tidak punya hover — jadi petunjuknya dibedakan
                      per breakpoint, bukan menyuruh sesuatu yang tak bisa. */}
                  <span className="mono-label hidden sm:inline">Arahkan kursor untuk membaca nama</span>
                  <span className="mono-label sm:hidden">Ketuk logo untuk membaca namanya</span>
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

      {/* ═══════════════════════ PITA KARYA ═══════════════════════
          Dulu pita ini mengulang slogan "Work, not words" — aforisme yang
          tidak memberi informasi apa pun. Sekarang isinya daftar yang benar-
          benar ada: nama proyek unggulan + tahun rilisnya. Kalau pita ini
          gagal dimuat, tidak ada informasi penting yang hilang. */}
      <section
        className="relative overflow-hidden border-y border-[var(--border)] py-14 sm:py-20"
        aria-label="Proyek unggulan aruthtale"
      >
        <div className="container mb-8 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          <span className="mono-label">Karya unggulan</span>
        </div>

        <ScrollSweep>
          <div className="flex items-center gap-10 whitespace-nowrap sm:gap-14">
            {/* SATU salinan sudah lebih lebar dari layar: saat berada di tengah
                sapuan, layar tertutup penuh. Satu salinan juga membuat
                geraknya tidak melesat. */}
            <span className="inline-flex items-center gap-10 sm:gap-14">
              {featuredProjects.map((p) => (
                <span key={p.slug} className="inline-flex items-baseline gap-5">
                  <span className="manifesto__word">{p.title.split(" (")[0]}</span>
                  <span className="manifesto__proof">
                    <b>{p.year}</b> {CATEGORY_LABEL[p.category] ?? p.category}
                  </span>
                </span>
              ))}
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
          title={<>Kenapa <span className="text-[var(--accent)]">aruthtale</span>?</>}
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
          description={`${projects.length} proyek nyata, dari aplikasi Android sampai platform SaaS. Tiap proyek mencatat peran, stack, dan hasil yang bisa diperiksa.`}
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
          description="Dari landing page sampai sistem kasir yang dipakai tiap hari. Lingkup, waktu, dan hasil disepakati sebelum pekerjaan dimulai."
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
          title={<>{lab.length} eksperimen sebelum proyek besar.</>}
          description="Repo kecil tempat saya mempelajari satu hal pada satu waktu. Sebagian masih saya pakai, sebagian sudah diarsipkan."
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
                Ceritakan kebutuhanmu lewat formulir atau WhatsApp.
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
