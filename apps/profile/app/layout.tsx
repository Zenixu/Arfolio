import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import { sites, nav } from "@arufolio/config";
import { Navbar, Footer, ThemeToggle } from "@arufolio/ui";
import { rchibnu } from "@arufolio/data";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(sites.profile.url),
  title: { default: sites.profile.title, template: "%s — Rchibnu" },
  description: sites.profile.description,
  openGraph: { type: "profile", url: sites.profile.url, title: sites.profile.title, description: sites.profile.description },
  twitter: { card: "summary_large_image" },
};

// Menandai bahwa JS hidup: animasi reveal baru diaktifkan lewat kelas .js ini.
// Tanpa JS, konten tetap terlihat penuh (tidak ada halaman kosong).
const themeScript = `try{document.documentElement.classList.add("js");var t=localStorage.getItem("theme")||"dark";document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-site="profile" suppressHydrationWarning
      className={`${inter.variable} ${geist.variable} ${mono.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-white">
          Lompat ke konten
        </a>
        <Navbar brand="rchibnu" links={nav.profile} right={<ThemeToggle />} />
        <main id="main">{children}</main>
        <Footer
          brand="Rchibnu"
          tagline={rchibnu.theme.tagline}
          columns={[
            { title: "Profil", links: [{ label: "About", href: "/about" }, { label: "Certificates", href: "/certificates" }, { label: "Skills", href: "/skills" }] },
            { title: "Karya", links: [{ label: "aruthtales.my.id", href: "https://aruthtales.my.id" }] },
          ]}
          socials={[
            { label: "GitHub", href: rchibnu.contact.github ?? "#" },
            { label: "Instagram", href: rchibnu.contact.instagram ?? "#" },
            { label: "Email", href: `mailto:${rchibnu.contact.email}` },
          ]}
        />
      </body>
    </html>
  );
}
