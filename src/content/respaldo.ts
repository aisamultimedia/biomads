/**
 * Equipo y alcance real — estructura.
 *
 * Los perfiles y los especialistas son texto y viven en el diccionario,
 * bajo `nosotros`. Aquí queda lo que no se traduce: el tamaño del equipo y
 * los nombres de las regiones.
 *
 * De CONTENIDO.md → "Respaldo".
 *
 * El modelo de trabajo, lo que no aceptan y el estado de las habilitaciones
 * vivían aquí y alimentaban las páginas /nosotros y /servicios, que se
 * borraron. Nada los renderiza, así que se retiraron: los hechos siguen en
 * CONTENIDO.md y volver a traerlos es copiarlos de ahí.
 */

export const equipo = {
  /** El brief dice ≈10 personas; no se redondea hacia arriba. */
  permanentes: "≈10",
} as const;

/** Regiones con proyectos ejecutados. No es cobertura nacional. */
export const regiones: readonly string[] = ["Antioquia", "Huila"];
