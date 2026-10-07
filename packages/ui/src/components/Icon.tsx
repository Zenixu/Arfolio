import type { SVGProps } from "react";

/**
 * Ikon UI & sosial — SVG inline (bukan emoji, bukan font ikon).
 * Semua memakai `currentColor` + viewBox 24x24 + stroke/fill konsisten,
 * sehingga bisa diwarnai lewat CSS dan tidak menambah request jaringan.
 */

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number) => ({
  width: size, height: size, viewBox: "0 0 24 24",
  "aria-hidden": true as const, focusable: "false" as const,
});

const stroke = {
  fill: "none", stroke: "currentColor", strokeWidth: 1.7,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};

/* ------------------------------- UI icons ------------------------------- */

export const ArrowRight = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ size = 14, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>
);
export const ArrowDown = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="M12 5v14" /><path d="m6 13 6 6 6-6" /></svg>
);
export const ChevronLeft = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="m15 5-7 7 7 7" /></svg>
);
export const ChevronRight = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="m9 5 7 7-7 7" /></svg>
);
export const Sun = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);
export const Moon = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
);
export const Menu = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="M3 6h18M3 12h18M3 18h18" /></svg>
);
export const Close = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
);
export const Mail = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
);
export const Download = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M4 21h16" /></svg>
);
export const Sparkle = ({ size = 14, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" /></svg>
);
export const Star = ({ size = 14, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 6-5.3-2.8L6.7 20l1-6L3.4 9.9 9.4 9z" /></svg>
);
export const Trophy = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" /></svg>
);
export const MapPin = ({ size = 14, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const Briefcase = ({ size = 14, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 13h20" /></svg>
);
export const Code = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="m8 6-6 6 6 6M16 6l6 6-6 6" /></svg>
);
export const Layers = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="m12 2 9 5-9 5-9-5z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></svg>
);
export const Shield = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="M12 2 4 6v6c0 5 3.4 9.2 8 10 4.6-.8 8-5 8-10V6z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const Verified = ({ size = 14, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><path d="m12 2 2.4 1.8 3-.2.9 2.9 2.5 1.6-1.1 2.8 1.1 2.8-2.5 1.6-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9-2.5-1.6L4.3 13 3.2 10.2l2.5-1.6.9-2.9 3 .2z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const Quote = ({ size = 20, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}><path d="M9.5 5C6.5 6.5 5 9 5 12v7h6v-7H8.2c0-1.8.8-3.2 2.4-4.2zM19 5c-3 1.5-4.5 4-4.5 7v7h6v-7h-2.8c0-1.8.8-3.2 2.4-4.2z" /></svg>
);

/* --------------------------- Ikon konsep -------------------------------
   Dipakai untuk keahlian yang TIDAK punya logo resmi (OOP, SOLID, RBAC,
   Automation, …). Sebelumnya item seperti ini tampil sebagai kotak berisi
   dua huruf pertama ("oo", "pr", "rb") — terlihat seperti teks rusak.
   Sekarang masing-masing punya ikon yang benar-benar menggambarkan maksudnya.
   ---------------------------------------------------------------------- */
export const Cube = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <path d="M12 2.6 20.5 7v10L12 21.4 3.5 17V7z" />
    <path d="M3.5 7 12 11.6 20.5 7M12 11.6v9.8" />
  </svg>
);
export const Kanban = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    <path d="M8 7v8M12 7v5M16 7v10" />
  </svg>
);
export const Key = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <circle cx="8" cy="15.5" r="4" />
    <path d="m11 12.5 7.5-7.5M17 6l2 2M14.5 8.5l2 2" />
  </svg>
);
export const Network = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <circle cx="12" cy="4.6" r="2.4" />
    <circle cx="4.8" cy="18.4" r="2.4" />
    <circle cx="19.2" cy="18.4" r="2.4" />
    <path d="M12 7v3.4M10.9 9.8 6 16.3M13.1 9.8 18 16.3M7.2 18.4h9.6" />
  </svg>
);
export const Cpu = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2.5" />
    <rect x="9.6" y="9.6" width="4.8" height="4.8" rx="1" />
    <path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" />
  </svg>
);
export const Workflow = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="2" />
    <rect x="14" y="14" width="7" height="7" rx="2" />
    <path d="M6.5 10v3.5a3 3 0 0 0 3 3H14" />
    <path d="m11.8 14.4 2.4 2.1-2.4 2.1" />
  </svg>
);

/* ------------------------------ Brand icons ------------------------------ */

export const GitHub = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
  </svg>
);
export const Instagram = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
export const LinkedIn = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" />
  </svg>
);
export const XTwitter = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.4l4.4 5.8zm-1.1 18h1.7L7.3 3.8H5.5z" />
  </svg>
);
export const WhatsApp = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2m0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8m-3.3 4c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.2-.7.1l-.7.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.2-.3.1-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5z" />
  </svg>
);

export const Globe = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" /></svg>
);

/* --------------------------- Ikon kategori ----------------------------- */
export const Server = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.5h.01" />
  </svg>
);
export const Database = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <ellipse cx="12" cy="6" rx="8" ry="3.2" />
    <path d="M4 6v12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V6" />
    <path d="M4 12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2" />
  </svg>
);
export const Smartphone = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <rect x="6" y="2.5" width="12" height="19" rx="3" />
    <path d="M10.5 18.5h3" />
  </svg>
);
export const Wrench = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...stroke} {...p}>
    <path d="M15.5 3.5a5 5 0 0 0-6.2 6.2L3.6 15.4a2 2 0 0 0 0 2.8l2.2 2.2a2 2 0 0 0 2.8 0l5.7-5.7a5 5 0 0 0 6.2-6.2l-3 3-2.8-2.8z" />
  </svg>
);
