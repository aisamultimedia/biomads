import { es } from "./es";
import { IDIOMAS, type Diccionario, type Idioma } from "./tipos";

export { IDIOMAS };
export type { Diccionario, Idioma };
export type * from "./tipos";

/** El que se sirve cuando no hay elección previa ni preferencia del navegador. */
export const POR_DEFECTO: Idioma = IDIOMAS[0];

const DICCIONARIOS: Readonly<Record<Idioma, Diccionario>> = { es };

/** ¿Es un idioma que el sitio sirve? Estrecha el tipo, no solo comprueba. */
export function esIdioma(valor: string | undefined): valor is Idioma {
  return IDIOMAS.includes(valor as Idioma);
}

/**
 * Estrecha el parámetro de ruta a `Idioma`.
 *
 * Next tipa los segmentos dinámicos como `string` porque no puede saber que
 * `generateStaticParams` los limita. Con `dynamicParams = false` aquí solo
 * llegan valores de la lista, así que el respaldo no debería ejecutarse
 * nunca; existe para que no haya un `as` mintiéndole al compilador.
 */
export function comoIdioma(valor: string): Idioma {
  return esIdioma(valor) ? valor : POR_DEFECTO;
}

/** Diccionario del idioma pedido; el de por defecto si no se reconoce. */
export function diccionario(idioma: string | undefined): Diccionario {
  return DICCIONARIOS[esIdioma(idioma) ? idioma : POR_DEFECTO];
}

/** ¿Hace falta ofrecer un selector? Con un solo idioma, no. */
export const HAY_VARIOS_IDIOMAS = IDIOMAS.length > 1;

/**
 * Elige idioma a partir de las preferencias del navegador.
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

/** Clave de localStorage donde se recuerda la elección. */
export const CLAVE_IDIOMA = "biomads:idioma";

/**
 * Ruta equivalente en otro idioma.
 *
 * Las rutas llevan el idioma como primer segmento, así que cambiarlo es
 * sustituir ese segmento y nada más: quien está en una ficha de proyecto se
 * queda en la misma ficha.
 */
export function rutaEnIdioma(ruta: string, idioma: Idioma): string {
  const segmentos = ruta.split("/").filter(Boolean);
  if (segmentos.length && esIdioma(segmentos[0])) segmentos[0] = idioma;
  else segmentos.unshift(idioma);
  return "/" + segmentos.join("/");
}

/**
 * Rellena los huecos `{clave}` de una cadena del diccionario.
 *
 * Se usa donde el texto envuelve un dato estructural —la sede, el año de
 * constitución— y el orden de las palabras cambia entre idiomas. Concatenar
 * trozos sueltos funciona en español y se rompe en cualquier otra lengua.
 */
export function interpolar(plantilla: string, valores: Record<string, string | number>) {
  return plantilla.replace(/\{(\w+)\}/g, (coincidencia, clave: string) =>
    clave in valores ? String(valores[clave]) : coincidencia,
  );
}
