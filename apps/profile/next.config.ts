import type { NextConfig } from "next";
import { join } from "node:path";

const config: NextConfig = {
  reactStrictMode: true,
  // matikan badge "N" mengambang Next.js di mode dev (mengganggu tangkapan layar)
  devIndicators: false,
  transpilePackages: ["@arufolio/ui", "@arufolio/data", "@arufolio/config"],
  images: { formats: ["image/avif", "image/webp"] },
  // akar monorepo — menghindari deteksi lockfile yang salah
  outputFileTracingRoot: join(import.meta.dirname, "../../"),
};

export default config;
