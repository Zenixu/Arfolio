import type { Metadata } from "next";
import { rchibnu } from "@arufolio/data";
import { SectionHeading, Button, Reveal } from "@arufolio/ui";

export const metadata: Metadata = { title: "Kontak", description: "Hubungi saya." };

export default function ContactPage() {
  const links = [
    { label: "Email", value: rchibnu.contact.email, href: `mailto:${rchibnu.contact.email}` },
    { label: "GitHub", value: "@Zenixu", href: rchibnu.contact.github },
    { label: "Instagram", value: "@zennrch", href: rchibnu.contact.instagram },
  ].filter((l) => l.href);

  return (
    <section className="section container max-w-2xl">
      <SectionHeading eyebrow="Kontak" title="Mari terhubung" description="Terbuka untuk kolaborasi, proyek, atau sekadar berdiskusi soal teknologi." />
      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {links.map((l, i) => (
          <Reveal key={l.label} delay={i * 60}>
            <a href={l.href!} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-5">
              <span className="mono-label">{l.label}</span>
              <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">{l.value} ↗</span>
            </a>
          </Reveal>
        ))}
      </div>
      <div className="mt-10">
        <Button href="https://aruthtales.my.id" variant="ghost">Lihat Portofolio Karya</Button>
      </div>
    </section>
  );
}
