import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { sites, nav } from "@arufolio/config";
import {
  Navbar, Footer, ThemeToggle, ScrollProgress, CursorDot,
  GitHub, Instagram, Mail, WhatsApp,
} from "@arufolio/ui";
import { rchibnu } from "@arufolio/data";
import "./globals.css";

/**
 * Tipografi Afterglow:
 * — Fraunces        : display serif lembut (introspektif, bukan tegas)
 * — Instrument Sans : body netral & tenang
 * — JetBrains Mono  : label kecil
 */
const display = Fraunces({
  subsets: ["latin"], variable: "--font-fraunces", display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});
const body = Instrument_Sans({
  subsets: ["latin"], variable: "--font-instrument", display: "swap", style: ["normal", "italic"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"], variable: "--font-jetbrains", display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(sites.profile.url),
  title: { default: sites.profile.title, template: "%s — Rchibnu" },
  description: sites.profile.description,
  openGraph: {
    type: "profile", url: sites.profile.url,
    title: sites.profile.title, description: sites.profile.description,
    siteName: "Rchibnu",
  },
  twitter: { card: "summary_large_image" },
};

// Menandai bahwa JS hidup: animasi reveal baru diaktifkan lewat kelas .js ini.
// Tanpa JS, konten tetap terlihat penuh (tidak ada halaman kosong).
const themeScript = `try{document.documentElement.classList.add("js");var t=localStorage.getItem("theme")||"dark";document.documentElement.dataset.theme=t}catch(e){}`;

const socials = [
  { label: "GitHub", href: rchibnu.contact.github ?? "#", icon: <GitHub size={16} /> },
  { label: "Instagram", href: rchibnu.contact.instagram ?? "#", icon: <Instagram size={16} /> },
  { label: "Email", href: `mailto:${rchibnu.contact.email}`, icon: <Mail size={16} /> },
  { label: "WhatsApp", href: `https://wa.me/${rchibnu.contact.whatsapp}`, icon: <WhatsApp size={16} /> },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      data-site="profile"
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
          brand="RchIbnu"
          site="profile"
          links={nav.profile}
          right={<ThemeToggle />}
          socials={socials}
          crossLink={{ label: "Karya: aruthtales.my.id", href: "https://aruthtales.my.id" }}
        />

        <main id="main">{children}</main>

        <Footer
          brand="Rchibnu"
          site="profile"
          tagline={rchibnu.theme.tagline}
          email={rchibnu.contact.email ?? undefined}
          whatsapp={rchibnu.contact.whatsapp ?? undefined}
          columns={[
            {
              title: "Profil",
              links: [
                { label: "Tentang", href: "/about" },
                { label: "Keahlian", href: "/skills" },
                { label: "Sertifikat", href: "/certificates" },
                { label: "Kontak", href: "/contact" },
              ],
            },
            {
              title: "Karya",
              links: [
                { label: "aruthtales.my.id", href: "https://aruthtales.my.id" },
                { label: "The Work", href: "https://aruthtales.my.id/work" },
                { label: "Learning Vault", href: "https://aruthtales.my.id/lab" },
              ],
            },
          ]}
          socials={socials}
          status={{ available: true, location: "Cianjur, Indonesia" }}
        />
      </body>
    </html>
  );
}
