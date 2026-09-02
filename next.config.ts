import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Ancla la raíz al proyecto. Sin esto Turbopack sube por el árbol de
    // directorios y encuentra un package-lock.json ajeno en el home.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
