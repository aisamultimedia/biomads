import { NextResponse, type NextRequest } from "next/server";
import { idiomaPreferido, preferenciasDeCabecera } from "@/idioma/negociar";

/**
 * La raíz `/` no es una página: es la pregunta «¿en qué idioma?».
 *
 * Se responde aquí, en el servidor, leyendo `Accept-Language`, y se manda a
 * `/es` o `/en` con un 307. Temporal a propósito: un 308 se quedaría
 * cacheado en el navegador y el mismo visitante, cambiando de idioma en el
 * sistema, seguiría cayendo en el anterior.
 *
 * Solo la raíz. Las páginas interiores no se redirigen por idioma del
 * navegador: quien comparte `/es/proyectos` quiere que se abra en español,
 * y un rastreador con `Accept-Language: en` indexaría la versión inglesa
 * de cada URL española. La elección explícita del visitante la recuerda el
 * selector, en el cliente.
 *
 * Sin diccionarios: `negociar.ts` no los importa, así que esto pesa lo que
 * pesa leer una cabecera.
 */
export function proxy(peticion: NextRequest) {
  const preferencias = preferenciasDeCabecera(peticion.headers.get("accept-language"));
  const idioma = idiomaPreferido(preferencias);
  const destino = peticion.nextUrl.clone();
  destino.pathname = `/${idioma}`;
  return NextResponse.redirect(destino, 307);
}

export const config = {
  matcher: "/",
};
