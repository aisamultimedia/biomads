import type { ClaveProyecto, ClaveServicio } from "@/idioma";

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
};

export const proyectos: readonly Proyecto[] = [
  { slug: "solinter-2017", anio: 2017, duracionMeses: 6, servicio: "monitoreo-fauna" },
  { slug: "ges-2018", anio: 2018, duracionMeses: 8, servicio: "flora-epifita" },
];
