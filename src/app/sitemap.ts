import type { MetadataRoute } from "next";
import { proyectos } from "@/content/proyectos";
import { serviciosDetallados } from "@/content/servicios";
import { sitioUrl } from "@/lib/site";

/**
 * Mapa del sitio.
 *
 * La home es una sola página con todo el recorrido, así que va primero y con
 * la prioridad más alta. Las páginas de detalle existen para quien llegue
 * por buscador o comparta un enlace. `/estilo` queda fuera: es interna.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = sitioUrl();
  const hoy = new Date();

  return [
    { url: base, lastModified: hoy, changeFrequency: "monthly", priority: 1 },
    ...["/servicios", "/proyectos", "/nosotros", "/contacto"].map((ruta) => ({
      url: `${base}${ruta}`,
      lastModified: hoy,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...serviciosDetallados.map((servicio) => ({
      url: `${base}/servicios/${servicio.slug}`,
      lastModified: hoy,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...proyectos.map((proyecto) => ({
      url: `${base}/proyectos/${proyecto.slug}`,
      lastModified: hoy,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
