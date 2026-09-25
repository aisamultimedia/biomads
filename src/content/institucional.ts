import type { ClaveEtapa, ClaveValor } from "@/idioma";
import type { NombreIcono } from "@/components/ui/Icono";

/**
 * Marco institucional y forma de abordar un proyecto — estructura.
 *
 * El texto —quiénes somos, misión, visión, los valores y la política
 * integral— vive en el diccionario, bajo `institucional` y `etapas`. Aquí
 * solo el orden y el icono de cada uno.
 *
 * De CONTENIDO.md → "Institucional (del portafolio)" y "Nuestra promesa".
 */

/**
 * Los valores corporativos, en el orden del portafolio.
 *
 * Son cinco. El cliente actualizó el texto de los cuatro primeros en la
 * ronda del 25 de septiembre de 2026 y pidió mantener cinco, pero no envió
 * el quinto: «Compromiso social» se conserva tal como estaba hasta que
 * llegue el definitivo. No se inventa.
 */
export const valores: readonly { clave: ClaveValor; icono: NombreIcono }[] = [
  { clave: "excelencia", icono: "excelencia" },
  { clave: "sostenibilidad", icono: "sostenibilidad" },
  { clave: "integridad", icono: "integridad" },
  { clave: "innovacion", icono: "innovacion" },
  { clave: "social", icono: "social" },
];

/**
 * Las cinco etapas con que BIOMADS aborda un proyecto, en orden.
 *
 * Solo el rótulo: CONTENIDO.md marca `[FALTA]` la descripción de cada una.
 * Cuando lleguen se añaden al diccionario y la banda las recoge sin cambiar
 * de forma. Inventarlas sería describir un método que no consta.
 *
 * La quinta era «Permisos» y pasó a ser «Gestionamos y hacemos seguimiento»
 * por decisión del cliente: el proceso ya no termina en el trámite sino en
 * el acompañamiento posterior. El icono cambió con ella —de documento
 * sellado a ciclo—, que es lo que dice que esa etapa no se cierra.
 */
export const etapasEstudio: readonly { clave: ClaveEtapa; icono: NombreIcono }[] = [
  { clave: "identificacion", icono: "identificacion" },
  { clave: "evaluacion", icono: "evaluacion" },
  { clave: "prevencion", icono: "prevencion" },
  { clave: "compensacion", icono: "compensacion" },
  { clave: "seguimiento", icono: "ciclo" },
];
