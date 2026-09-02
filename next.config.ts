import path from "node:path";
import type { NextConfig } from "next";
import { IDIOMAS } from "./src/idioma/tipos";

const POR_DEFECTO = IDIOMAS[0];

const nextConfig: NextConfig = {
  turbopack: {
    // Ancla la raíz al proyecto. Sin esto Turbopack sube por el árbol de
    // directorios y encuentra un package-lock.json ajeno en el home.
    root: path.resolve(__dirname),
  },

  /**
   * El idioma es el primer segmento de la ruta, así que las URL sin él
   * —las que el sitio sirvió antes de tener idiomas— tienen que ir a algún
   * sitio en vez de dar 404.
   *
   * Todas permanentes (308): esa página ya no vive ahí y nunca volverá.
   * La raíz `/` no está aquí: la decide src/proxy.ts según el idioma del
   * navegador, y por eso responde 307.
   */
  async redirects() {
    return [
      {
        source: "/proyectos/:ruta*",
        destination: `/${POR_DEFECTO}/proyectos/:ruta*`,
        permanent: true,
      },
      {
        source: "/privacidad",
        destination: `/${POR_DEFECTO}/privacidad`,
        permanent: true,
      },
      {
        source: "/servicios/:ruta*",
        destination: `/${POR_DEFECTO}/servicios/:ruta*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
