import { z } from "zod";
import { WorkItemSchema, CertificateSchema, BrandSchema, ProfileSchema } from "./schema";

import brandRaw from "./aruthtales.json" with { type: "json" };
import profileRaw from "./rchibnu.json" with { type: "json" };
import accountRaw from "./account.json" with { type: "json" };
import projectsRaw from "./projects.json" with { type: "json" };
import certificatesRaw from "./certificates.json" with { type: "json" };

/* --------------------------- Validasi saat impor --------------------------- */
const work = z.array(WorkItemSchema).parse(projectsRaw);
const certificates = z.array(CertificateSchema).parse(certificatesRaw);
const brand = BrandSchema.parse(brandRaw);
const profile = ProfileSchema.parse(profileRaw);

export { certificates };

/* --------------------------------- Karya ---------------------------------- */

/** Real Projects → halaman /work */
export const projects = work.filter((w) => w.type === "project");

/** Learning Vault → halaman /lab */
export const lab = work.filter((w) => w.type === "lab");

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getLab = (slug: string) => lab.find((l) => l.slug === slug);

/** Kelompok lab berdasarkan kategori (urutan tampil) */
export const labGroups = [
  { key: "foundations", label: "Foundations — HTML, CSS & JavaScript", items: ["maybehtml","html-css-exercise1","javascript","zlisttask","z-api-pokemon","bun-course"] },
  { key: "php-laravel", label: "PHP & Laravel", items: ["ziebukutamu","komikizen","laravel-pos","ziemart","invenzie","react-fullstack"] },
  { key: "frontend", label: "Frontend & Landing Page", items: ["react-learning","tefa-pos-merch","cozwin-coffee-landingpage","tanjosu-landing-page"] },
  { key: "mobile-python", label: "Mobile & Python", items: ["muslim-app","ku-money","data-siswa","qrcode","pythonzie"] },
].map((g) => ({
  ...g,
  items: g.items
    .map((slug) => lab.find((l) => l.slug === slug))
    .filter((l): l is (typeof lab)[number] => l !== undefined),
}));

/* ------------------------------- Sertifikat ------------------------------- */

export const featuredCertificates = certificates.filter((c) => c.featured);
export const courses = certificates.filter((c) => c.type === "course");
export const awards = certificates.filter((c) => c.type === "award");

/* ----------------------------- Brand & Profil ----------------------------- */

export const aruthtale = brand;
export const rchibnu = profile;
export const accounts = accountRaw;

/* ---------------------------------- Tipe ---------------------------------- */
export type { Project, Lab, WorkItem, Certificate } from "./schema";
