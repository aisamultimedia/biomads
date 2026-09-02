/**
 * Equipo, modelo de trabajo y alcance real.
 * De CONTENIDO.md → "Respaldo" y "Diferencial".
 */

export const equipo = {
  /** Estructura permanente. El brief dice ≈10 personas; no se redondea hacia arriba. */
  permanentes: "≈10",
  perfilesPermanentes: [
    "Gerente",
    "Director administrativo",
    "Coordinador ambiental / SIG",
    "Auxiliar administrativa",
    "Líder de proyectos",
  ],
  /** Se vinculan según las necesidades de cada proyecto. */
  especialistas: [
    "Ingenieros ambientales",
    "Ingenieros civiles",
    "Ingenieros forestales",
    "Biólogos",
    "Ecólogos",
    "Geólogos",
    "Topógrafos",
    "Arquitectos",
    "Médicos veterinarios",
    "Ingenieros de sistemas",
    "Economistas",
    "Profesionales de trabajo social",
  ],
  modelo:
    "Mixto. Personal permanente más profesionales, especialistas, proveedores, contratistas, conductores y operarios según las necesidades de cada proyecto.",
} as const;

/** Regiones con proyectos ejecutados. No es cobertura nacional. */
export const regiones: readonly string[] = ["Antioquia", "Huila"];

/**
 * Diferencial frente a consultoras más grandes, en palabras de BIOMADS.
 */
export const diferencial = {
  fortaleza:
    "Nuestra principal fortaleza es la capacidad de adaptarnos a las necesidades específicas de cada proyecto, articulando un equipo multidisciplinario de profesionales y especialistas. Esto nos permite ofrecer soluciones personalizadas y mantener un acompañamiento cercano durante el desarrollo de los proyectos.",
  loQueNoAceptan:
    "Proyectos que no estén relacionados con sus capacidades técnicas y profesionales o para los cuales no cuente con las competencias, recursos y condiciones necesarias para garantizar una adecuada ejecución.",
} as const;

/**
 * Estado de habilitaciones. No hay ninguna certificación vigente y el RUP
 * está en trámite: no puede presentarse ni insinuarse como obtenido.
 */
export const habilitaciones = {
  rup: "En trámite",
  certificaciones: "Ninguna vigente",
} as const;
