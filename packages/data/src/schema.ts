import { z } from "zod";

/* ---------------------------------- Karya ---------------------------------- */

const WorkBase = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  year: z.number().int(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  links: z.object({
    live: z.string().url().nullable().optional(),
    repo: z.string().url().nullable().optional(),
  }),
});

/** Real Project → /work */
export const ProjectSchema = WorkBase.extend({
  type: z.literal("project"),
  role: z.string(),
  duration: z.string().optional(),
  category: z.string(),
  thumbnail: z.string().nullable().optional(),
  gallery: z.array(z.string()).default([]),
  metrics: z.array(z.object({ label: z.string(), value: z.number() })).default([]),
  highlights: z.array(z.string()).default([]),
  body: z.string().optional(),
});

/** Learning Vault → /lab */
export const LabSchema = WorkBase.extend({
  type: z.literal("lab"),
  commits: z.number().default(0),
  activity: z.string().optional(),
  archived: z.boolean().default(false),
  thumb: z.string().nullable().optional(),
});

/** Satu file, dua tipe */
export const WorkItemSchema = z.discriminatedUnion("type", [ProjectSchema, LabSchema]);

/* ------------------------------- Sertifikat -------------------------------- */

export const CertificateSchema = z.object({
  id: z.string(),
  title: z.string(),
  issuer: z.string(),
  credentialId: z.string().nullable().optional(),
  date: z.string(),
  validUntil: z.string().nullable().optional(),
  durationHours: z.number().optional(),
  type: z.enum(["course", "award"]),
  award: z.string().optional(),
  role: z.string().optional(),
  skills: z.array(z.string()).default([]),
  file: z.string(),
  image: z.string().nullable().optional(),
  thumb: z.string().nullable().optional(),
  verifyUrl: z.string().url().nullable().optional(),
  featured: z.boolean().default(false),
});

/* ------------------------------- Profil/brand ------------------------------ */

const Socials = z.object({
  email: z.string().email().nullable().optional(),
  whatsapp: z.string().nullable().optional(),
  github: z.string().url().nullable().optional(),
  instagram: z.string().url().nullable().optional(),
  linkedin: z.string().url().nullable().optional(),
  x: z.string().url().nullable().optional(),
}).passthrough();

export const BrandSchema = z.object({
  brand: z.object({
    name: z.string(), handle: z.string(), tagline: z.string(),
    domain: z.string(), description: z.string(),
    logo: z.string().nullable().optional(),
  }).passthrough(),
  services: z.array(z.object({}).passthrough()).default([]),
  contact: Socials,
}).passthrough();

export const ProfileSchema = z.object({
  identity: z.object({
    fullName: z.string(), displayName: z.string(), handle: z.string(),
    brand: z.string().optional(),
    role: z.string(), headline: z.string(), location: z.string(),
    age: z.number().optional(), status: z.string().optional(),
    photo: z.string().nullable().optional(),
    logo: z.string().nullable().optional(),
  }).passthrough(),
  bio: z.object({ short: z.string(), paragraphs: z.array(z.string()) }).passthrough(),
  interests: z.array(z.string()).default([]),
  education: z.object({
    school: z.string(), major: z.string(),
    grade: z.string(), status: z.string(),
  }).passthrough(),
  experience: z.array(z.object({
    type: z.string(),
    role: z.string(),
    organization: z.string(),
    period: z.string(),
    current: z.boolean().default(false),
    description: z.string().optional(),
  })),
  timeline: z.array(z.object({
    year: z.string(), title: z.string(), detail: z.string(),
  })),
  skills: z.object({
    groups: z.array(z.object({ name: z.string(), items: z.array(z.string()) })),
  }),
  contact: Socials,
  theme: z.object({
    name: z.string(), concept: z.string(), tagline: z.string(),
    summary: z.string().optional(),
    sequence: z.array(z.string()).default([]),
    core: z.array(z.string()).default([]),
    note: z.string().optional(),
    palette: z.record(z.string(), z.string()).optional(),
  }).passthrough(),
  cv: z.string().nullable().optional(),
}).passthrough();

export type Project = z.infer<typeof ProjectSchema>;
export type Lab = z.infer<typeof LabSchema>;
export type WorkItem = z.infer<typeof WorkItemSchema>;
export type Certificate = z.infer<typeof CertificateSchema>;

/* ------------------------------ Statistik GitHub ---------------------------- */

/** Snapshot data GitHub publik (dibuat scripts/fetch-github.mjs). */
export const GithubStatsSchema = z.object({
  login: z.string(),
  name: z.string(),
  url: z.string().url(),
  since: z.string(),
  repositories: z.number().int(),
  followers: z.number().int(),
  totalContributions: z.number().int(),
  commits: z.number().int(),
  pullRequests: z.number().int(),
  issues: z.number().int(),
  days: z.array(
    z.object({
      date: z.string(),
      count: z.number().int(),
      level: z.number().int().min(0).max(4),
    })
  ),
}).passthrough();

export type GithubStats = z.infer<typeof GithubStatsSchema>;
