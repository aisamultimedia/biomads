import type { MetadataRoute } from "next";
import { proyectos } from "@/content/proyectos";
import { serviciosDetallados } from "@/content/servicios";
import { sitioUrl } from "@/lib/site";

/**
 * Mapa del sitio.
 *
 * La home es una sola página con todo el recorrido, así que va primero y con
 * la prioridad más alta.
 *
 * Lo único que queda aparte son las fichas de detalle, para quien llegue por
 * buscador o comparta un enlace. Los índices `/servicios`, `/nosotros` y
 * `/contacto` se borraron: repetían lo que la portada ya dice, y tener dos
 * URL con el mismo contenido reparte la señal entre las dos.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = sitioUrl();
  const hoy = new Date();

  return [
    { url: base, lastModified: hoy, changeFrequency: "monthly", priority: 1 },
    {
      url: `${base}/proyectos`,
      lastModified: hoy,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
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
