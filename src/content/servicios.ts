import type { NombreIcono } from "@/components/ui/Icono";
import type { ClaveCategoriaServicio, ClaveServicio } from "@/idioma";

/**
 * Servicios — estructura.
 *
 * El texto vive en el diccionario, bajo `servicios.categorias` y
 * `servicios.detallados`, con estas mismas claves. Aquí solo el orden, el
 * icono, la duración de referencia en número y qué ítems de cada categoría
 * tienen ficha propia.
 *
 * De CONTENIDO.md → "Servicios", reorganizado en cuatro categorías por
 * decisión del cliente. Antes eran dos tarjetas con ficha completa más una
 * lista de siete nombres sueltos; ahora los cuatro bloques cubren todo el
 * alcance y las dos fichas se alcanzan desde el ítem que les corresponde.
 */

export type CategoriaServicio = {
  clave: ClaveCategoriaServicio;
  icono: NombreIcono;
  /**
   * Ítems de la categoría que tienen página propia, por posición en la
   * lista del diccionario. Solo los dos frentes que el brief documenta a
   * fondo: al resto no se le inventa alcance ni entregable, así que el
   * nombre va como texto y no como enlace a una página que no existe.
   */
  fichas?: Readonly<Record<number, ClaveServicio>>;
};

export const categoriasServicio: readonly CategoriaServicio[] = [
  {
    clave: "biodiversidad",
    icono: "huella",
    fichas: { 0: "monitoreo-fauna", 1: "flora-epifita" },
  },
  { clave: "forestal", icono: "arbol" },
  { clave: "estudios", icono: "portapapeles" },
  { clave: "sostenibilidad", icono: "libro" },
];

export type ServicioDetallado = {
  slug: ClaveServicio;
  icono: NombreIcono;
  /** Referencia real de ejecución contractual, en meses. */
  duracionReferenciaMeses: number;
};

/**
 * Los dos frentes con ficha completa en el brief. Conservan su página: es
 * el único sitio del web donde consta el marco normativo, el entregable y
 * la duración típica de un servicio.
 */
export const serviciosDetallados: readonly ServicioDetallado[] = [
  { slug: "monitoreo-fauna", icono: "huella", duracionReferenciaMeses: 6 },
  { slug: "flora-epifita", icono: "epifita", duracionReferenciaMeses: 8 },
];
