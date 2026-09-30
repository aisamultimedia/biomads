import type { MetadataRoute } from "next";
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
 * con la prioridad más alta. Aparte van la página de proyectos —seis fichas
 * técnicas con cliente, periodo y la norma bajo la que se ejecutó cada una,
 * que es el contenido por el que el sitio puede aparecer en una búsqueda
 * técnica— y la política de tratamiento de datos.
 *
 * Las fichas de cada proyecto y las dos de servicio tuvieron aquí su
 * entrada y salieron con sus secciones. Las URL ya no existen y responden
 * 404, que es lo que corresponde cuando una página se retira.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = sitioUrl();
  const hoy = new Date();

  /** Rutas del sitio sin el prefijo de idioma, con su prioridad. */
  const rutas: readonly { ruta: string; prioridad: number }[] = [
    { ruta: "", prioridad: 1 },
    { ruta: "/privacidad", prioridad: 0.3 },
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
