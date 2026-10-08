import type { Metadata } from "next";
import { aruthtale } from "@arufolio/data";
import {
  SectionHeading, Button, Reveal, SpotlightCard, SocialLinks,
  GitHub, Instagram, Mail, WhatsApp, ArrowUpRight, Globe, waLink, waDisplay,
} from "@arufolio/ui";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi saya untuk proyek atau kolaborasi.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const links = [
    {
      label: "Email",
      value: aruthtale.contact.email,
      href: `mailto:${aruthtale.contact.email}`,
      note: "Cara tercepat. Biasanya saya balas dalam 1×24 jam.",
      icon: <Mail size={18} />,
    },
    {
      label: "GitHub",
      value: "@aruthtale",
      href: aruthtale.contact.github,
      note: "Kode sumber proyek-proyek nyata.",
      icon: <GitHub size={18} />,
    },
    {
      label: "Instagram",
      value: "@aruthtale",
      href: aruthtale.contact.instagram,
      note: "Proses, cuplikan, dan hal-hal kecil di antaranya.",
      icon: <Instagram size={18} />,
    },
    ...(aruthtale.contact.whatsapp
      ? [{
          label: "WhatsApp",
          value: waDisplay(aruthtale.contact.whatsapp),
          href: waLink(aruthtale.contact.whatsapp),
          note: "Untuk obrolan cepat — biasanya saya balas di hari yang sama.",
          icon: <WhatsApp size={18} />,
        }]
      : []),
  ].filter((l) => l.href);

  const socials = [
    { label: "GitHub", href: aruthtale.contact.github ?? "#", icon: <GitHub size={16} /> },
    { label: "Instagram", href: aruthtale.contact.instagram ?? "#", icon: <Instagram size={16} /> },
    ...(aruthtale.contact.whatsapp
      ? [{ label: "WhatsApp", href: waLink(aruthtale.contact.whatsapp), icon: <WhatsApp size={16} /> }]
      : []),
    { label: "Email", href: `mailto:${aruthtale.contact.email}`, icon: <Mail size={16} /> },
  ];

  return (
    <section className="section container">
      <SectionHeading
        index="05"
        eyebrow="Kontak"
        title={<>Mari <span className="text-[var(--accent)]">bicara</span>.</>}
        description="Terbuka untuk proyek freelance, kolaborasi, atau peluang kerja. Pilih jalur yang paling nyaman untukmu."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((l, i) => (
          <Reveal key={l.label} delay={i * 70} className="h-full">
            <SpotlightCard as="a" href={l.href!} target="_blank" rel="noreferrer" className="card group flex h-full flex-col p-6 hover:-translate-y-1 hover:border-[var(--border-strong)]">
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

      {/* Panel penutup */}
      <Reveal delay={220}>
        <div className="relative mt-10 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-8 sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "var(--glow)" }} />
          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-lg">
              <p className="mono-label inline-flex items-center gap-2">
                <Globe size={12} /> Situs lainnya
              </p>
              <h2 className="h2 mt-3">Kenali orang di balik aruthtale</h2>
              <p className="mt-3 text-[var(--text-muted)] leading-relaxed">
                Halaman personal saya berisi perjalanan, keahlian, dan sertifikat —
                kalau kamu ingin tahu siapa yang akan mengerjakan proyekmu.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="https://rchibnu.aruthtales.my.id" withArrow>Lihat Profil</Button>
                <Button href="/work" variant="ghost">Lihat Karya</Button>
              </div>
            </div>
            <SocialLinks items={socials} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
