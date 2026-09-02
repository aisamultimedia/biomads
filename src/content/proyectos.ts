import type { ClaveFoto, ClaveProyecto, ClaveServicio } from "@/idioma";
import siembraLadera from "@/fotos/siembra-ladera.jpg";
import trasladoMaterial from "@/fotos/traslado-material.jpg";

/**
 * Proyectos ejecutados — estructura.
 *
 * Aquí solo vive lo que no cambia al cambiar de idioma: la clave, el año y
 * la duración como números. Cliente, encargo, dificultad, resolución y
 * ubicación son texto y viven en el diccionario, bajo `proyectos.casos`,
 * con esta misma clave.
 *
 * De CONTENIDO.md → "Proyectos". Los dos están marcados como publicables en
 * el brief. No hay un tercero con ficha completa.
 *
 * La relación recurrente con Autopista Río Magdalena —cuatro contrataciones
 * en cuatro frentes— estaba aquí y se retiró: el cliente pidió dejar de
 * destacarla y nada la renderiza. Los datos siguen en CONTENIDO.md.
 */

export type Proyecto = {
  slug: ClaveProyecto;
  anio: number;
  duracionMeses: number;
  servicio: ClaveServicio;
  /** Fotografía de campo. El alt vive en el diccionario, bajo esta clave. */
  imagen: typeof siembraLadera;
  claveFoto: ClaveFoto;
  /**
   * Ocupa el doble de ancho en la rejilla. Hoy ninguno: con dos proyectos,
   * hacer uno más grande que el otro es ruido, no jerarquía. Existe para
   * cuando haya más de tres y alguno merezca destacarse.
   */
  destacado?: boolean;
};

/* El set entregado no incluye tomas de monitoreo de fauna ni de flora
   epífita, así que cada alt describe lo que se ve en la imagen y no el
   servicio al que acompaña. */
export const proyectos: readonly Proyecto[] = [
  {
    slug: "solinter-2017",
    anio: 2017,
    duracionMeses: 6,
    servicio: "monitoreo-fauna",
    imagen: siembraLadera,
    claveFoto: "siembra-ladera",
  },
  {
    slug: "ges-2018",
    anio: 2018,
    duracionMeses: 8,
    servicio: "flora-epifita",
    imagen: trasladoMaterial,
    claveFoto: "traslado-material",
  },
];
