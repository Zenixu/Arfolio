import type { Metadata } from "next";
import { aruthtale } from "@arufolio/data";
import { SectionHeading, Button, Reveal } from "@arufolio/ui";

export const metadata: Metadata = { title: "Kontak", description: "Hubungi saya untuk proyek atau kolaborasi." };

export default function ContactPage() {
  const links = [
    { label: "Email", value: aruthtale.contact.email, href: `mailto:${aruthtale.contact.email}` },
    { label: "GitHub", value: "@aruthtale", href: aruthtale.contact.github },
    { label: "Instagram", value: "@aruthtale", href: aruthtale.contact.instagram },
  ].filter((l) => l.href);

  return (
    <section className="section container max-w-2xl">
      <SectionHeading eyebrow="Kontak" title="Mari bicara" description="Terbuka untuk proyek freelance, kolaborasi, atau peluang kerja." />
      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {links.map((l, i) => (
          <Reveal key={l.label} delay={i * 60}>
            <a href={l.href!} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-5">
              <span className="mono-label">{l.label}</span>
              <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                {l.value} ↗
              </span>
            </a>
          </Reveal>
        ))}
      </div>
      <div className="mt-10">
        <Button href="https://rchibnu.aruthtales.my.id" variant="ghost">Lihat Profil Saya</Button>
      </div>
    </section>
  );
}
