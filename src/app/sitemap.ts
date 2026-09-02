import type { MetadataRoute } from "next";
import { proyectos } from "@/content/proyectos";
import { serviciosDetallados } from "@/content/servicios";
import { diccionario, IDIOMAS } from "@/idioma";
import { sitioUrl } from "@/lib/site";

/**
 * Mapa del sitio.
 *
 * Una entrada por página y por idioma, cada una declarando sus alternativas
 * con `hreflang`. Es lo que le dice al buscador que dos URL son la misma
 * página en distintas lenguas y no contenido duplicado.
 *
 * La portada es una sola página con todo el recorrido, así que va primero y
 * con la prioridad más alta. Lo único aparte son las fichas de detalle,
 * para quien llegue por buscador o comparta un enlace: los índices
 * `/servicios`, `/nosotros` y `/contacto` se borraron porque repetían lo que
 * la portada ya dice.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = sitioUrl();
  const hoy = new Date();

  /** Rutas del sitio sin el prefijo de idioma, con su prioridad. */
  const rutas: readonly { ruta: string; prioridad: number }[] = [
    { ruta: "", prioridad: 1 },
    { ruta: "/proyectos", prioridad: 0.6 },
    { ruta: "/privacidad", prioridad: 0.3 },
    ...serviciosDetallados.map((s) => ({ ruta: `/servicios/${s.slug}`, prioridad: 0.8 })),
    ...proyectos.map((p) => ({ ruta: `/proyectos/${p.slug}`, prioridad: 0.7 })),
  ];

  return rutas.flatMap(({ ruta, prioridad }) =>
    IDIOMAS.map((idioma) => ({
      url: `${base}/${idioma}${ruta}`,
      lastModified: hoy,
      changeFrequency: (ruta === "" ? "monthly" : "yearly") as "monthly" | "yearly",
      priority: prioridad,
      alternates: {
        languages: Object.fromEntries(
          IDIOMAS.map((i) => [diccionario(i).etiquetaHtml, `${base}/${i}${ruta}`]),
        ),
      },
    })),
  );
}
