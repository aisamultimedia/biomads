/**
 * Marco institucional y etapas del estudio ambiental.
 * De CONTENIDO.md → "Institucional (del portafolio)" y "Estudios ambientales".
 *
 * Es el bloque que dice lo mismo que toda consultora del sector, así que no
 * abre la página ni se usa como argumento: va comprimido, después del equipo
 * y de lo que se puede demostrar.
 */

import type { NombreIcono } from "@/components/ui/Icono";

/** Descriptor del portafolio. Una línea, sin adjetivos añadidos. */
export const descriptor =
  "Aliados estratégicos en gestión ambiental y sostenibilidad empresarial";

export const quienesSomos =
  "Somos BIOMADS, un equipo especializado en diseñar y ejecutar proyectos vanguardia que permitan el desarrollo sostenible de la sociedad y el medio ambiente.";

export const mision =
  "Desarrollar proyectos con excelencia y compromiso, promoviendo la sostenibilidad y el respeto por los recursos naturales.";

/**
 * Aspiración declarada, no alcance operativo. Va siempre rotulada como
 * visión y separada de los datos de operación: las regiones con proyectos
 * ejecutados son Antioquia y Huila, y eso no se matiza aquí.
 */
export const vision =
  "Ser una empresa líder a nivel nacional en soluciones ambientales integrales, reconocida por su innovación, excelencia operativa y compromiso con el desarrollo sostenible.";

export const valores: readonly { icono: NombreIcono; nombre: string; texto: string }[] = [
  {
    icono: "excelencia",
    nombre: "Excelencia técnica",
    texto: "Compromiso con altos estándares de calidad, precisión e innovación en cada proyecto.",
  },
  {
    icono: "sostenibilidad",
    nombre: "Sostenibilidad activa",
    texto: "Promovemos el uso responsable de los recursos naturales y el desarrollo sostenible.",
  },
  {
    icono: "integridad",
    nombre: "Integridad y transparencia",
    texto: "Actuamos con ética, responsabilidad y cumplimiento normativo en todas nuestras operaciones.",
  },
  {
    icono: "innovacion",
    nombre: "Innovación ambiental",
    texto: "Aplicamos soluciones técnicas avanzadas y eficientes para enfrentar los desafíos ambientales.",
  },
  {
    icono: "social",
    nombre: "Compromiso social",
    texto: "Generamos impacto positivo en las comunidades y fomentamos el respeto por el entorno.",
  },
] as const;

export const politicaCalidad = {
  texto: [
    "En BIOMADS nos comprometemos a planificar, ejecutar y supervisar proyectos ambientales con altos estándares de calidad, sostenibilidad y responsabilidad.",
    "Implementamos procesos eficientes y mejora continua, garantizando el cumplimiento de la normatividad ambiental vigente y la satisfacción de nuestros clientes, contribuyendo al desarrollo sostenible y la protección del medio ambiente.",
  ],
  objetivos: [
    "Cumplir con la normativa técnica y ambiental aplicable.",
    "Desarrollar soluciones ambientales integrales y sostenibles.",
    "Optimizar procesos.",
    "Promover la mejora continua.",
    "Garantizar la satisfacción de nuestros clientes.",
  ],
} as const;

/**
 * Etapas del estudio ambiental, tal como las declara el portafolio.
 *
 * Solo el rótulo: CONTENIDO.md marca `[FALTA]` la descripción de cada una.
 * Cuando BIOMADS las entregue se añade el texto aquí y la sección lo recoge
 * sin cambiar de forma. Inventarlas sería describir un método que no consta.
 */
export const etapasEstudio: readonly { icono: NombreIcono; nombre: string }[] = [
  { icono: "identificacion", nombre: "Identificación" },
  { icono: "evaluacion", nombre: "Evaluación" },
  { icono: "prevencion", nombre: "Prevención y mitigación" },
  { icono: "compensacion", nombre: "Corrección y compensación" },
  { icono: "permisos", nombre: "Permisos" },
] as const;
