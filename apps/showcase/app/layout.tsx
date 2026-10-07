import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import { sites, nav } from "@arufolio/config";
import { Navbar, Footer, ThemeToggle } from "@arufolio/ui";
import { aruthtale } from "@arufolio/data";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(sites.showcase.url),
  title: { default: sites.showcase.title, template: "%s — aruthtale" },
  description: sites.showcase.description,
  openGraph: { type: "website", url: sites.showcase.url, title: sites.showcase.title, description: sites.showcase.description },
  twitter: { card: "summary_large_image" },
};

// Menandai bahwa JS hidup: animasi reveal baru diaktifkan lewat kelas .js ini.
// Tanpa JS, konten tetap terlihat penuh (tidak ada halaman kosong).
const themeScript = `try{document.documentElement.classList.add("js");var t=localStorage.getItem("theme")||"dark";document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-site="showcase" suppressHydrationWarning
      className={`${inter.variable} ${geist.variable} ${mono.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-white">
          Lompat ke konten
        </a>
        <Navbar brand="aruthtale" links={nav.showcase} right={<ThemeToggle />} />
        <main id="main">{children}</main>
        <Footer
          brand="aruthtale"
          tagline={aruthtale.brand.tagline}
          columns={[
            { title: "Jelajahi", links: [{ label: "The Work", href: "/work" }, { label: "Learning Vault", href: "/lab" }, { label: "Kontak", href: "/contact" }] },
            { title: "Tentang", links: [{ label: "Profil Saya", href: "https://rchibnu.aruthtales.my.id" }] },
          ]}
          socials={[
            { label: "GitHub", href: aruthtale.contact.github ?? "#" },
            { label: "Instagram", href: aruthtale.contact.instagram ?? "#" },
            { label: "Email", href: `mailto:${aruthtale.contact.email}` },
          ]}
        />
      </body>
    </html>
  );
}
