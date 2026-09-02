/**
 * Servicios.
 *
 * Todo sale de CONTENIDO.md → "Servicios". Los dos primeros tienen ficha
 * completa en el brief y merecen página propia. Los otros siete solo se
 * pueden nombrar: no se les inventa alcance, metodología, duración ni
 * entregable.
 */

import type { NombreIcono } from "@/components/ui/Icono";

export type ServicioDetallado = {
  slug: "monitoreo-fauna" | "flora-epifita";
  icono: NombreIcono;
  titulo: string;
  /** Frase corta para listados y navegación. */
  resumen: string;
  cuandoSeNecesita: string;
  marco: string;
  entregable: string;
  duracion: string;
  /** Referencia real de ejecución contractual. */
  duracionReferencia: string;
  /** El vacío que llena, en palabras de BIOMADS. */
  elVacio: string;
  /**
   * Cómo se ejecutó. Es lo único que el brief respalda sobre método: no hay
   * diseño de muestreo, esfuerzo ni equipos documentados, y no se inventan.
   * Va atribuido al proyecto donde se aplicó.
   */
  metodologia: string;
  /** Proyecto del que sale la frase de metodología. */
  metodologiaFuente: string;
  /** Slug del proyecto ejecutado que lo respalda. */
  casoRelacionado: string;
};

export const serviciosDetallados: readonly ServicioDetallado[] = [
  {
    slug: "monitoreo-fauna",
    icono: "huella",
    titulo: "Monitoreo y estudio de biodiversidad de fauna",
    resumen:
      "Caracterización y monitoreo de fauna como soporte de los estudios ambientales del proyecto.",
    cuandoSeNecesita:
      "Cuando se va a desarrollar un proyecto vial o de infraestructura que requiere evaluar sus posibles impactos sobre la fauna, especialmente como parte de los estudios ambientales necesarios para su ejecución.",
    marco:
      "Se ejecuta dentro del marco de los estudios de impacto ambiental y de las obligaciones ambientales del proyecto. Si el proyecto está sujeto a licenciamiento de competencia nacional puede involucrar a la ANLA; en otros casos, a la autoridad ambiental regional correspondiente.",
    entregable:
      "Informe técnico de caracterización y monitoreo de fauna, con registros de las especies encontradas, metodología aplicada, resultados y análisis de la biodiversidad asociada al área del proyecto.",
    duracion:
      "Depende del tamaño y características del área de estudio, tipo de proyecto, grupos de fauna a evaluar, número de jornadas de campo y condiciones climáticas. Puede requerir varias campañas para obtener información representativa.",
    duracionReferencia: "6 meses",
    elVacio:
      "Que el estudio no sea simplemente una lista de especies, sino que entregue información de campo confiable, metodología clara, registros verificables y resultados técnicamente sustentados, de manera que pueda usarse como soporte de los estudios ambientales del proyecto.",
    metodologia:
      "Jornadas de monitoreo y aplicación de una metodología de campo que permitiera recopilar y organizar registros confiables para sustentar técnicamente el estudio ambiental.",
    metodologiaFuente: "SOLINTER · vías terciarias en Garzón y Gigante, Huila · 2017",
    casoRelacionado: "solinter-2017",
  },
  {
    slug: "flora-epifita",
    icono: "epifita",
    titulo: "Mantenimiento y seguimiento de flora epífita reubicada",
    resumen:
      "Seguimiento con registros verificables después del traslado, no solo la reubicación inicial.",
    cuandoSeNecesita:
      "Cuando un proyecto de infraestructura ha requerido el rescate, traslado o reubicación de flora epífita y posteriormente debe garantizar su mantenimiento y seguimiento para demostrar que las medidas ambientales implementadas están funcionando.",
    marco:
      "Bajo las obligaciones ambientales establecidas para el proyecto y las medidas de manejo relacionadas con la flora epífita, ante la autoridad ambiental competente. Pueden estar contenidas en el instrumento de manejo o licenciamiento ambiental y en los actos administrativos correspondientes.",
    entregable:
      "Informes técnicos de mantenimiento y seguimiento donde se documenta el estado de las especies, su supervivencia, evolución y las actividades realizadas.",
    duracion:
      "Depende del número de individuos o especies reubicadas, área, estado de las plantas, frecuencia de mantenimiento y requerimientos de la autoridad. Puede extenderse si hay pérdidas, deterioro o condiciones climáticas adversas.",
    duracionReferencia: "8 meses",
    elVacio:
      "Que exista un seguimiento real después de la reubicación, no solamente el traslado inicial. El cliente necesita demostrar que las plantas fueron mantenidas, que se verificó su evolución y que existe trazabilidad mediante registros e informes técnicos.",
    metodologia:
      "Actividades periódicas de mantenimiento y seguimiento, dejando registro del comportamiento y evolución de la flora reubicada.",
    metodologiaFuente: "GES · flora epífita de El Quimbo, Gigante, Huila · 2018",
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
export const serviciosListados: readonly { icono: NombreIcono; nombre: string }[] = [
  { icono: "arbol", nombre: "Actividad forestal" },
  { icono: "compensacion", nombre: "Planes de compensación ambiental" },
  { icono: "portapapeles", nombre: "Inventarios forestales" },
  { icono: "prismaticos", nombre: "Flora y fauna" },
  { icono: "libro", nombre: "Educación ambiental" },
  { icono: "ciclo", nombre: "Desarrollo sostenible" },
  { icono: "conversacion", nombre: "Asesoría y gestión ambiental" },
];

/** Etapas de los estudios ambientales declaradas en el portafolio. */
export const etapasEstudio: readonly string[] = [
  "Identificación",
  "Evaluación",
  "Prevención y mitigación",
  "Corrección y compensación",
  "Permisos",
];
