/**
 * Pembangun Structured Data (schema.org / JSON-LD).
 *
 * Kenapa ini penting untuk SEO:
 * — Google tidak "melihat" halaman seperti manusia; JSON-LD memberitahu secara
 *   eksplisit SIAPA pemilik situs, APA layanannya, dan APA isi tiap halaman.
 * — Ini yang membuka jalan ke "rich result" (kartu dengan logo, breadcrumb,
 *   rating) dan membantu Google menghubungkan nama merek ↔ orang ↔ situs.
 * — Semua nilai memakai URL absolut, karena JSON-LD tidak mengenal metadataBase.
 *
 * Semua fungsi murni (tanpa efek samping) dan menerima data sebagai argumen,
 * supaya bisa dipakai dari app mana pun tanpa ketergantungan silang.
 */

type Json = Record<string, unknown>;

export interface SocialProfileInput {
  email?: string | null;
  whatsapp?: string | null;
  github?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  x?: string | null;
}

/** Kumpulan URL profil sosial yang valid (untuk `sameAs`). */
export function socialSameAs(contact: SocialProfileInput): string[] {
  const urls = [contact.github, contact.instagram, contact.linkedin, contact.x];
  return urls.filter((u): u is string => typeof u === "string" && u.startsWith("http"));
}

/**
 * WebSite + Organization — dipasang sekali di layout (semua halaman).
 * `@graph` dipakai agar dua entitas saling merujuk dalam satu blok.
 */
export function websiteSchema(opts: {
  siteUrl: string;
  name: string;
  alternateName?: string;
  description: string;
  logoUrl?: string;
  sameAs?: string[];
  founderName?: string;
  founderUrl?: string;
  founderJobTitle?: string;
}): Json {
  const orgId = `${opts.siteUrl}/#organization`;
  const siteId = `${opts.siteUrl}/#website`;

  const organization: Json = {
    "@type": "Organization",
    "@id": orgId,
    name: opts.name,
    url: opts.siteUrl,
    description: opts.description,
  };
  if (opts.alternateName) organization.alternateName = opts.alternateName;
  if (opts.logoUrl) organization.logo = { "@type": "ImageObject", url: opts.logoUrl };
  if (opts.sameAs?.length) organization.sameAs = opts.sameAs;
  if (opts.founderName) {
    organization.founder = {
      "@type": "Person",
      name: opts.founderName,
      ...(opts.founderUrl ? { url: opts.founderUrl } : {}),
      ...(opts.founderJobTitle ? { jobTitle: opts.founderJobTitle } : {}),
    };
  }

  const website: Json = {
    "@type": "WebSite",
    "@id": siteId,
    url: opts.siteUrl,
    name: opts.name,
    description: opts.description,
    publisher: { "@id": orgId },
    inLanguage: "id-ID",
  };

  return { "@context": "https://schema.org", "@graph": [website, organization] };
}

/** Person — profil pemilik (dipakai di situs profil & halaman kontak). */
export function personSchema(opts: {
  name: string;
  alternateName?: string;
  url: string;
  jobTitle: string;
  description: string;
  imageUrl?: string;
  location?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  worksFor?: string;
}): Json {
  const schema: Json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    url: opts.url,
    jobTitle: opts.jobTitle,
    description: opts.description,
  };
  if (opts.alternateName) schema.alternateName = opts.alternateName;
  if (opts.imageUrl) schema.image = { "@type": "ImageObject", url: opts.imageUrl };
  if (opts.location) schema.address = { "@type": "PostalAddress", addressLocality: opts.location };
  if (opts.sameAs?.length) schema.sameAs = opts.sameAs;
  if (opts.knowsAbout?.length) schema.knowsAbout = opts.knowsAbout;
  if (opts.worksFor) schema.worksFor = { "@type": "Organization", name: opts.worksFor };
  return schema;
}

/** Service / ProfessionalService — daftar layanan yang ditawarkan studio. */
export function serviceSchema(opts: {
  siteUrl: string;
  name: string;
  description: string;
  areaServed?: string;
  services: { name: string; description: string }[];
  sameAs?: string[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${opts.siteUrl}/#service`,
    name: opts.name,
    url: opts.siteUrl,
    description: opts.description,
    ...(opts.areaServed ? { areaServed: { "@type": "Country", name: opts.areaServed } } : {}),
    ...(opts.sameAs?.length ? { sameAs: opts.sameAs } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan",
      itemListElement: opts.services.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: s.name, description: s.description },
      })),
    },
  };
}

/** BreadcrumbList — jalur navigasi, muncul di hasil pencarian. */
export function breadcrumbSchema(items: { name: string; url: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** SoftwareApplication — satu proyek/aplikasi di halaman /work/[slug]. */
export function softwareSchema(opts: {
  name: string;
  description: string;
  url: string;
  category?: string;
  keywords?: string[];
  imageUrl?: string;
  authorName: string;
  authorUrl: string;
  sameAs?: string[];
}): Json {
  const schema: Json = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: opts.category ?? "WebApplication",
    operatingSystem: "Web",
    author: { "@type": "Organization", name: opts.authorName, url: opts.authorUrl },
  };
  if (opts.keywords?.length) schema.keywords = opts.keywords.join(", ");
  if (opts.imageUrl) schema.image = { "@type": "ImageObject", url: opts.imageUrl };
  if (opts.sameAs?.length) schema.sameAs = opts.sameAs;
  return schema;
}
