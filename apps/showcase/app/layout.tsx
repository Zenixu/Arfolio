import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { sites, nav } from "@arufolio/config";
import {
  Navbar, Footer, ThemeToggle, ScrollProgress, CursorDot,
  GitHub, Instagram, Mail, WhatsApp,
} from "@arufolio/ui";
import { aruthtale } from "@arufolio/data";
import "./globals.css";

/**
 * Tipografi:
 * — Bricolage Grotesque : display, grotesk variabel berkarakter (bukan Inter/Geist)
 * — Instrument Sans     : body, netral & mudah dibaca
 * — JetBrains Mono      : label teknis, angka, nomor indeks
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"], variable: "--font-bricolage", display: "swap",
});
const body = Instrument_Sans({
  subsets: ["latin"], variable: "--font-instrument", display: "swap", style: ["normal", "italic"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"], variable: "--font-jetbrains", display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(sites.showcase.url),
  title: { default: sites.showcase.title, template: "%s — aruthtale" },
  description: sites.showcase.description,
  openGraph: {
    type: "website", url: sites.showcase.url,
    title: sites.showcase.title, description: sites.showcase.description,
    siteName: "aruthtale",
  },
  twitter: { card: "summary_large_image" },
};

// Menandai bahwa JS hidup: animasi reveal baru diaktifkan lewat kelas .js ini.
// Tanpa JS, konten tetap terlihat penuh (tidak ada halaman kosong).
const themeScript = `try{document.documentElement.classList.add("js");var t=localStorage.getItem("theme")||"dark";document.documentElement.dataset.theme=t}catch(e){}`;

const socials = [
  { label: "GitHub", href: aruthtale.contact.github ?? "#", icon: <GitHub size={16} /> },
  { label: "Instagram", href: aruthtale.contact.instagram ?? "#", icon: <Instagram size={16} /> },
  { label: "Email", href: `mailto:${aruthtale.contact.email}`, icon: <Mail size={16} /> },
  { label: "WhatsApp", href: `https://wa.me/${aruthtale.contact.whatsapp}`, icon: <WhatsApp size={16} /> },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      data-site="showcase"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-white"
        >
          Lompat ke konten
        </a>

        <ScrollProgress />
        <CursorDot />

        <Navbar
          brand="aruthtale"
          site="showcase"
          links={nav.showcase}
          right={<ThemeToggle />}
          socials={socials}
          crossLink={{ label: "Profil: Rchibnu", href: "https://rchibnu.aruthtales.my.id" }}
        />

        <main id="main">{children}</main>

        <Footer
          brand="aruthtale"
          site="showcase"
          tagline={aruthtale.brand.tagline}
          note={aruthtale.brand.domain}
          email={aruthtale.contact.email ?? undefined}
          whatsapp={aruthtale.contact.whatsapp ?? undefined}
          columns={[
            {
              title: "Jelajahi",
              links: [
                { label: "The Work", href: "/work" },
                { label: "Learning Vault", href: "/lab" },
                { label: "Kontak", href: "/contact" },
              ],
            },
            {
              title: "Tentang",
              links: [
                { label: "Profil Saya", href: "https://rchibnu.aruthtales.my.id" },
                { label: "Filosofi Nama", href: "/#filosofi" },
              ],
            },
          ]}
          socials={socials}
          status={{ available: true, location: "Cianjur, Indonesia", since: "2024" }}
        />
      </body>
    </html>
  );
}
