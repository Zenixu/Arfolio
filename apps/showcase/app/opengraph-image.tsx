import { ImageResponse } from "next/og";
import { sites } from "@arufolio/config";

/**
 * Kartu share (og:image) untuk situs showcase.
 *
 * Dibuat dinamis lewat next/og supaya selalu sinkron dengan identitas di
 * packages/config — tidak ada gambar yang bisa jadi usang.
 * Ukuran 1200×630 = rasio standar Open Graph / Twitter large card.
 */
export const alt = "Aruthtale — Studio Web & Fullstack Developer Cianjur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#08080A",
          backgroundImage:
            "radial-gradient(60% 55% at 15% 0%, rgba(99,102,241,0.38), transparent 70%), radial-gradient(45% 45% at 100% 100%, rgba(56,225,176,0.20), transparent 70%)",
          color: "#F5F5F7",
          fontFamily: "sans-serif",
        }}
      >
        {/* Kepala: tanda + nama brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              display: "flex",
              width: 74,
              height: 74,
              borderRadius: 20,
              background: "linear-gradient(135deg, #6366F1, #38E1B0)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 700,
              color: "#08080A",
            }}
          >
            a
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>aruthtale</div>
            <div style={{ fontSize: 19, color: "#9AA0AE", letterSpacing: 3, textTransform: "uppercase" }}>
              Work, not words.
            </div>
          </div>
        </div>

        {/* Inti: judul besar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 82, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2.5 }}>
            Studio Web &amp;
          </div>
          <div style={{ fontSize: 82, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2.5, color: "#818CF8" }}>
            Fullstack Developer
          </div>
          <div style={{ fontSize: 28, color: "#B4B9C6", marginTop: 8, maxWidth: 900 }}>
            Aplikasi web yang fungsional, interaktif, dan rapi — dari Cianjur, Indonesia.
          </div>
        </div>

        {/* Kaki: domain */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 26, color: "#E7E9EE", letterSpacing: 0.5 }}>{sites.showcase.url.replace("https://", "")}</div>
          <div style={{ display: "flex", gap: 12 }}>
            {["Website", "Web App", "POS", "SaaS"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "9px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.22)",
                  fontSize: 20,
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
