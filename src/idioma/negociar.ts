import { IDIOMAS, type Idioma } from "./tipos";

/**
 * Elección de idioma sin diccionarios.
 *
 * Vive aparte de index.ts porque lo usa el proxy de la raíz, que corre en
 * cada petición a `/` y no tiene por qué cargar los textos del sitio para
 * leer una cabecera.
 */

/** El que se sirve cuando no hay elección previa ni preferencia del navegador. */
export const POR_DEFECTO: Idioma = IDIOMAS[0];

/** ¿Es un idioma que el sitio sirve? Estrecha el tipo, no solo comprueba. */
export function esIdioma(valor: string | undefined): valor is Idioma {
  return IDIOMAS.includes(valor as Idioma);
}

/**
 * Elige idioma a partir de una lista de preferencias, en orden.
 *
 * Compara solo la subetiqueta primaria: quien tiene "es-419" o "en-GB"
 * quiere español o inglés, y exigir la coincidencia exacta lo mandaría al
 * idioma por defecto sin motivo.
 */
export function idiomaPreferido(preferencias: readonly string[]): Idioma {
  for (const preferencia of preferencias) {
    const primaria = preferencia.toLowerCase().split("-")[0];
    if (esIdioma(primaria)) return primaria;
  }
  return POR_DEFECTO;
}

/**
 * Preferencias de una cabecera `Accept-Language`, ordenadas por peso.
 *
 * "es-CO,es;q=0.9,en;q=0.8" → ["es-CO", "es", "en"]. Sin `q` el peso es 1.
 * El orden de llegada desempata, que es lo que hace el navegador.
 */
export function preferenciasDeCabecera(cabecera: string | null): string[] {
  if (!cabecera) return [];
  return cabecera
    .split(",")
    .map((parte, orden) => {
      const [etiqueta, ...parametros] = parte.trim().split(";");
      const q = parametros
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      const peso = q === undefined ? 1 : Number.parseFloat(q);
      return { etiqueta: etiqueta.trim(), peso: Number.isNaN(peso) ? 0 : peso, orden };
    })
    .filter((p) => p.etiqueta && p.etiqueta !== "*" && p.peso > 0)
    .sort((a, b) => b.peso - a.peso || a.orden - b.orden)
    .map((p) => p.etiqueta);
}
