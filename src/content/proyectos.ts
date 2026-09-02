/**
 * Proyectos ejecutados.
 *
 * De CONTENIDO.md → "Proyectos". Los dos están marcados como publicables en
 * el brief. No hay un tercero con ficha completa.
 */

export type Proyecto = {
  slug: string;
  cliente: string;
  /** Nombre corto para titulares. */
  clienteCorto: string;
  anio: string;
  ubicacion: string;
  duracion: string;
  encargo: string;
  dificultad: string;
  resolucion: string;
  /** Slug del servicio al que corresponde. */
  servicio: string;
  /** Nombre corto del servicio, para fichas. */
  servicioRotulo: string;
};

export const proyectos: readonly Proyecto[] = [
  {
    slug: "solinter-2017",
    cliente: "Soluciones Integrales Internacionales S.A.S. — SOLINTER",
    clienteCorto: "SOLINTER",
    anio: "2017",
    ubicacion: "Garzón y Gigante, Huila",
    duracion: "6 meses",
    encargo:
      "Monitoreo y estudio de la biodiversidad de fauna asociado al Estudio de Impacto Ambiental para proyectos de vías terciarias.",
    dificultad:
      "Obtener información representativa de la biodiversidad de fauna en campo, dadas las características del área y las condiciones propias de los muestreos.",
    resolucion:
      "Jornadas de monitoreo y aplicación de una metodología de campo que permitiera recopilar y organizar registros confiables para sustentar técnicamente el estudio ambiental.",
    servicio: "monitoreo-fauna",
    servicioRotulo: "Monitoreo de fauna",
  },
  {
    slug: "ges-2018",
    cliente: "Grupo Empresarial Surcolombiano S.A.S. — GES",
    clienteCorto: "GES",
    anio: "2018",
    ubicacion: "Gigante, Huila · proyecto hidroeléctrico El Quimbo",
    duracion: "8 meses",
    encargo:
      "Mantenimiento y seguimiento de la flora epífita reubicada, perteneciente al proyecto hidroeléctrico El Quimbo.",
    dificultad:
      "Garantizar la continuidad del mantenimiento y seguimiento de la flora epífita después de su reubicación, verificando su estado durante el periodo contractual.",
    resolucion:
      "Actividades periódicas de mantenimiento y seguimiento, dejando registro del comportamiento y evolución de la flora reubicada.",
    servicio: "flora-epifita",
    servicioRotulo: "Flora epífita",
  },
];

/**
 * Relación recurrente con un mismo cliente: cuatro contrataciones en cuatro
 * frentes distintos.
 *
 * **Hoy no se publica en ninguna parte.** El cliente pidió dejar de
 * destacarla, así que el componente que la mostraba se borró. Los datos se
 * conservan aquí porque están en CONTENIDO.md y son verificables: si mañana
 * se decide recuperarla, no hay que volver a levantarlos del brief.
 */
export const relacionRecurrente = {
  nombreCliente: "Autopista Río Magdalena",
  frentes: [
    "Plan de Compensación Ambiental",
    "PAGA",
    "Sistema de Alertas Tempranas (SAT)",
    "Embellecimiento de una glorieta",
  ],
  /** Por qué creen que los recontratan, en sus palabras. */
  porQue:
    "La confianza generada a partir del trabajo realizado y nuestra capacidad para responder a diferentes necesidades ambientales dentro de sus proyectos.",
} as const;
