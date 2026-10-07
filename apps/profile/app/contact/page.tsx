import type { Metadata } from "next";
import { rchibnu } from "@arufolio/data";
import {
  SectionHeading, Button, Reveal, SpotlightCard, SocialLinks,
  GitHub, Instagram, Mail, ArrowUpRight, Globe,
} from "@arufolio/ui";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi saya.",
};

export default function ContactPage() {
  const c = rchibnu.contact;

  const links = [
    {
      label: "Email",
      value: c.email,
      href: `mailto:${c.email}`,
      note: "Cara tercepat. Biasanya saya balas dalam 1×24 jam.",
      icon: <Mail size={18} />,
    },
    {
      label: "GitHub",
      value: "@Zenixu",
      href: c.github,
      note: "Kode sumber, eksperimen, dan proyek belajar.",
      icon: <GitHub size={18} />,
    },
    {
      label: "Instagram",
      value: "@zennrch",
      href: c.instagram,
      note: "Keseharian, proses, dan hal-hal kecil di antaranya.",
      icon: <Instagram size={18} />,
    },
  ].filter((l) => l.href);

  const socials = [
    { label: "GitHub", href: c.github ?? "#", icon: <GitHub size={16} /> },
    { label: "Instagram", href: c.instagram ?? "#", icon: <Instagram size={16} /> },
    { label: "Email", href: `mailto:${c.email}`, icon: <Mail size={16} /> },
  ];

  return (
    <section className="section container">
      <SectionHeading
        index="01"
        eyebrow="Kontak"
        title={<>Mari <span className="afterglow-gradient">terhubung</span>.</>}
        description="Terbuka untuk kolaborasi, proyek, atau sekadar berdiskusi soal teknologi. Pilih jalur yang paling nyaman."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {links.map((l, i) => (
          <Reveal key={l.label} delay={i * 70} className="h-full">
            <SpotlightCard
              as="a"
              href={l.href!}
              target="_blank"
              rel="noreferrer"
              className="card group flex h-full flex-col p-6 hover:-translate-y-1 hover:border-[var(--border-strong)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                  {l.icon}
                </span>
                <ArrowUpRight size={16} className="text-[var(--border-strong)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]" />
              </div>
              <p className="mono-label mt-6">{l.label}</p>
              <p className="mt-1.5 text-[0.9375rem] font-medium transition-colors group-hover:text-[var(--accent)]">
                {l.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{l.note}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={220}>
        <div className="relative mt-10 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-8 sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "var(--glow)" }} />
          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-lg">
              <p className="mono-label inline-flex items-center gap-2">
                <Globe size={12} /> Situs lainnya
              </p>
              <h2 className="h2 mt-3">Lihat karya saya</h2>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
                Portofolio utama ada di aruthtales.my.id — tempat semua proyek nyata
                dan eksperimen belajar dipamerkan.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="https://aruthtales.my.id" withArrow>Kunjungi Karya</Button>
                <Button href="/about" variant="ghost">Tentang Saya</Button>
              </div>
            </div>
            <SocialLinks items={socials} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
