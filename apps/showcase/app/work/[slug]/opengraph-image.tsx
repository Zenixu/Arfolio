import { ImageResponse } from "next/og";
import { getProject, projects } from "@arufolio/data";
import { sites } from "@arufolio/config";

/**
 * Kartu share per proyek (og:image), dibuat saat build.
 *
 * Kenapa PNG dinamis, bukan thumbnail WebP yang sudah ada:
 * Facebook, LinkedIn, dan WhatsApp TIDAK mendukung WebP pada og:image —
 * kartunya akan gagal tampil. next/og menghasilkan PNG yang didukung semua.
 *
 * CATATAN PENTING (Satori): setiap <div> WAJIB punya `display: flex`
 * (atau `none`) — termasuk div berisi satu potong teks. Kalau tidak,
 * build gagal dengan "Expected <div> to have explicit display: flex".
 * Teks juga ditulis sebagai SATU string, bukan beberapa potongan bersebelahan.
 */
export const alt = "Proyek Aruthtale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  const title = p?.title ?? "Aruthtale";
  const summary = p?.summary ?? sites.showcase.description;
  const role = p?.role ?? "Proyek";
  const year = String(p?.year ?? "");
  const tags = (p?.tags ?? []).slice(0, 4);
  const footer = `${sites.showcase.url.replace("https://", "")}/work/${slug}`;
  const body = summary.length > 165 ? `${summary.slice(0, 162)}…` : summary;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          background: "#08080A",
          backgroundImage:
            "radial-gradient(55% 50% at 10% 0%, rgba(99,102,241,0.34), transparent 70%), radial-gradient(45% 45% at 100% 100%, rgba(56,225,176,0.18), transparent 70%)",
          color: "#F5F5F7",
          fontFamily: "sans-serif",
        }}
      >
        {/* Kepala */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                width: 58,
                height: 58,
                borderRadius: 16,
                background: "linear-gradient(135deg, #6366F1, #38E1B0)",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 700,
                color: "#08080A",
              }}
            >
              a
            </div>
            <div style={{ display: "flex", fontSize: 26, fontWeight: 700 }}>aruthtale</div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#9AA0AE",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {role}
          </div>
        </div>

        {/* Inti */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 30, color: "#818CF8", letterSpacing: 1 }}>{year}</div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#B4B9C6",
              marginTop: 6,
              maxWidth: 960,
              lineHeight: 1.35,
            }}
          >
            {body}
          </div>
        </div>

        {/* Kaki */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, color: "#E7E9EE", letterSpacing: 0.5 }}>{footer}</div>
          <div style={{ display: "flex", gap: 11 }}>
            {tags.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.22)",
                  fontSize: 19,
                  color: "#D7DAE2",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

/** Hanya proyek nyata yang punya halaman (lab tidak masuk /work). */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
