import { en } from "./en";
import { es } from "./es";
import { IDIOMAS, type Diccionario, type Idioma } from "./tipos";
import { POR_DEFECTO, esIdioma, idiomaPreferido } from "./negociar";

export { IDIOMAS, POR_DEFECTO, esIdioma, idiomaPreferido };
export type { Diccionario, Idioma };
export type * from "./tipos";

const DICCIONARIOS: Readonly<Record<Idioma, Diccionario>> = { es, en };

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
