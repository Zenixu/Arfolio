import { cn } from "../lib/cn";

/**
 * Peta nama teknologi (seperti tertulis di data) -> slug file logo di /public/logos.
 * Logo diunduh dari Simple Icons (CC0) dan disimpan lokal supaya tidak
 * bergantung pada CDN pihak ketiga saat runtime.
 */
const SLUG: Record<string, string> = {
  // bahasa
  "javascript": "javascript", "js": "javascript",
  "typescript": "typescript", "ts": "typescript",
  "php": "php", "python": "python", "dart": "dart",
  "html": "html5", "html5": "html5", "css": "css", "css3": "css3",
  // frontend
  "react": "react", "react 19": "react", "react.js": "react",
  "next.js": "nextdotjs", "nextjs": "nextdotjs", "next.js 16": "nextdotjs",
  "vite": "vite", "tailwind css": "tailwindcss", "tailwind css v4": "tailwindcss",
  "tailwind": "tailwindcss", "redux": "redux", "zustand": "redux",
  "framer motion": "framer", "gsap": "gsap", "three.js": "threedotjs",
  "bootstrap": "bootstrap", "jquery": "jquery", "sass": "sass", "scss": "sass",
  "inertia": "inertia", "inertia.js": "inertia", "alpine.js": "livewire",
  "markdown": "markdown",
  // backend
  "node.js": "nodedotjs", "nodejs": "nodedotjs", "node": "nodedotjs",
  "express": "express", "express.js": "express",
  "laravel": "laravel", "laravel 12": "laravel", "livewire": "livewire",
  "nestjs": "nestjs", "prisma": "prisma", "graphql": "graphql",
  "postgresql": "postgresql", "postgres": "postgresql",
  "mysql": "mysql", "mariadb": "mysql", "sqlite": "sqlite",
  "mongodb": "mongodb", "redis": "redis",
  "supabase": "supabase", "firebase": "firebase",
  // mobile & lainnya
  "capacitor": "capacitor", "capacitorjs": "capacitor", "capacitor 7": "capacitor",
  "android": "android", "flutter": "flutter",
  "cloudflare workers": "cloudflare", "cloudflare": "cloudflare",
  "docker": "docker", "linux": "linux", "ubuntu": "ubuntu",
  // tools
  "git": "git", "github": "github", "vercel": "vercel", "figma": "figma",
  "vitest": "vitest", "npm": "npm", "pnpm": "pnpm", "yarn": "yarn", "bun": "bun",
  "composer": "composer", "postman": "postman", "eslint": "eslint",
  "prettier": "prettier", "kaggle": "kaggle", "deno": "deno",
  // AI
  "ai": "googlegemini", "gemini": "googlegemini", "openai": "googlegemini",
  "anthropic": "anthropic",
};

/** Apakah ada logo untuk nama teknologi ini? */
export const hasTechIcon = (name: string) => Boolean(SLUG[name.trim().toLowerCase()]);

/** Normalisasi nama -> slug file logo (atau null kalau tidak ada). */
export function techIconSlug(name: string): string | null {
  return SLUG[name.trim().toLowerCase()] ?? null;
}

/**
 * Logo teknologi sebagai <img> dari /public/logos.
 * `title` dipakai sebagai tooltip + alt supaya tetap aksesibel.
 */
export function TechIcon({
  name, size = 20, className, title,
}: { name: string; size?: number; className?: string; title?: string }) {
  const slug = techIconSlug(name);
  if (!slug) return null;
  const label = title ?? name;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/logos/${slug}.svg`}
      alt={label}
      title={label}
      width={size}
      height={size}
      loading="lazy"
      className={cn("shrink-0 select-none opacity-80 transition-opacity duration-200 hover:opacity-100", className)}
    />
  );
}

/** Deretan logo teknologi + label opsional. */
export function TechStack({
  items, size = 18, showLabels = false, className, max,
}: {
  items: string[]; size?: number; showLabels?: boolean; className?: string; max?: number;
}) {
  const list = (max ? items.slice(0, max) : items).filter(hasTechIcon);
  if (list.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      {list.map((t) => (
        <li key={t} className="flex items-center gap-1.5">
          <TechIcon name={t} size={size} />
          {showLabels && <span className="text-xs text-[var(--text-muted)]">{t}</span>}
        </li>
      ))}
    </ul>
  );
}
