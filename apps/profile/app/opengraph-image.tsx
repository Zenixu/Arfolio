import { ImageResponse } from "next/og";
import { sites } from "@arufolio/config";
import { rchibnu } from "@arufolio/data";

/**
 * Kartu share (og:image) untuk situs profil.
 *
 * Memakai tema "Afterglow" (senja hangat) supaya kartu share langsung
 * terasa satu keluarga dengan tampilan situsnya.
 */
export const alt = "Rchibnu — Fullstack Developer Cianjur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { fullName, role, location } = rchibnu.identity;

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
          background: "#121016",
          backgroundImage:
            "radial-gradient(60% 55% at 12% 0%, rgba(227,165,124,0.30), transparent 70%), radial-gradient(45% 45% at 100% 100%, rgba(183,156,224,0.22), transparent 70%)",
          color: "#EFEAF3",
          fontFamily: "sans-serif",
        }}
      >
        {/* Kepala: monogram + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              display: "flex",
              width: 74,
              height: 74,
              borderRadius: 20,
              background: "linear-gradient(135deg, #E3A57C, #B79CE0)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 700,
              color: "#121016",
            }}
          >
            R
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>Rchibnu</div>
            <div style={{ fontSize: 19, color: "#A096AE", letterSpacing: 3, textTransform: "uppercase" }}>
              Portofolio
            </div>
          </div>
        </div>

        {/* Inti */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 74, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>
            {fullName}
          </div>
          <div style={{ fontSize: 44, fontWeight: 600, color: "#E3A57C", letterSpacing: -0.5 }}>
            {role}
          </div>
          <div style={{ fontSize: 27, color: "#B4AEC0", marginTop: 6, maxWidth: 900 }}>
            {`${location} · Membangun aplikasi web yang fungsional, interaktif, dan berpusat pada pengguna.`}
          </div>
        </div>

        {/* Kaki */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 26, color: "#E4DEEA", letterSpacing: 0.5 }}>
            {sites.profile.url.replace("https://", "")}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {["Fullstack", "Next.js", "React", "Laravel"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "9px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.20)",
                  fontSize: 20,
                  color: "#DAD3E0",
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
