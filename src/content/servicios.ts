import type { NombreIcono } from "@/components/ui/Icono";
import type {
  ClaveProyecto,
  ClaveServicio,
  ClaveServicioListado,
} from "@/idioma";

/**
 * Servicios — estructura.
 *
 * El texto vive en el diccionario, bajo `servicios.detallados` y
 * `servicios.listados`, con estas mismas claves. Aquí solo el orden, el
 * icono, la duración de referencia en número y el proyecto que respalda
 * cada frente.
 *
 * De CONTENIDO.md → "Servicios". Los dos primeros tienen ficha completa en
 * el brief. Los otros siete solo se pueden nombrar: no se les inventa
 * alcance, metodología, duración ni entregable.
 */

export type ServicioDetallado = {
  slug: ClaveServicio;
  icono: NombreIcono;
  /** Referencia real de ejecución contractual, en meses. */
  duracionReferenciaMeses: number;
  /** Proyecto ejecutado que lo respalda. */
  casoRelacionado: ClaveProyecto;
};

export const serviciosDetallados: readonly ServicioDetallado[] = [
  {
    slug: "monitoreo-fauna",
    icono: "huella",
    duracionReferenciaMeses: 6,
    casoRelacionado: "solinter-2017",
  },
  {
    slug: "flora-epifita",
    icono: "epifita",
    duracionReferenciaMeses: 8,
    casoRelacionado: "ges-2018",
  },
];

/**
 * Servicios que se prestan y solo se pueden nombrar. El brief no entrega
 * alcance ni entregables para ninguno.
 *
 * El icono acompaña al nombre; no aporta información que el nombre no
 * tenga, porque no hay ninguna que se pueda publicar.
 */
export const serviciosListados: readonly {
  clave: ClaveServicioListado;
  icono: NombreIcono;
}[] = [
  { clave: "actividad-forestal", icono: "arbol" },
  { clave: "compensacion", icono: "compensacion" },
  { clave: "inventarios", icono: "portapapeles" },
  { clave: "flora-fauna", icono: "prismaticos" },
  { clave: "educacion", icono: "libro" },
  { clave: "desarrollo-sostenible", icono: "ciclo" },
  { clave: "asesoria", icono: "conversacion" },
];
