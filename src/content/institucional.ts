import type { ClaveEtapa, ClaveValor } from "@/idioma";
import type { NombreIcono } from "@/components/ui/Icono";

/**
 * Marco institucional y etapas del estudio ambiental — estructura.
 *
 * El texto —quiénes somos, misión, visión, los valores y la política de
 * calidad— vive en el diccionario, bajo `institucional` y `etapas`. Aquí
 * solo el orden y el icono de cada uno.
 *
 * De CONTENIDO.md → "Institucional (del portafolio)" y "Estudios
 * ambientales".
 */

export const valores: readonly { clave: ClaveValor; icono: NombreIcono }[] = [
  { clave: "excelencia", icono: "excelencia" },
  { clave: "sostenibilidad", icono: "sostenibilidad" },
  { clave: "integridad", icono: "integridad" },
  { clave: "innovacion", icono: "innovacion" },
  { clave: "social", icono: "social" },
];

/**
 * Las cinco etapas del estudio ambiental, en el orden del portafolio.
 *
 * Solo el rótulo: CONTENIDO.md marca `[FALTA]` la descripción de cada una.
 * Cuando lleguen se añaden al diccionario y la banda las recoge sin cambiar
 * de forma. Inventarlas sería describir un método que no consta.
 */
export const etapasEstudio: readonly { clave: ClaveEtapa; icono: NombreIcono }[] = [
  { clave: "identificacion", icono: "identificacion" },
  { clave: "evaluacion", icono: "evaluacion" },
  { clave: "prevencion", icono: "prevencion" },
  { clave: "compensacion", icono: "compensacion" },
  { clave: "permisos", icono: "permisos" },
];
