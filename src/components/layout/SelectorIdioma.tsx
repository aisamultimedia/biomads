"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Route } from "next";
import {
  CLAVE_IDIOMA,
  HAY_VARIOS_IDIOMAS,
  IDIOMAS,
  diccionario,
  esIdioma,
  idiomaPreferido,
  rutaEnIdioma,
  type Idioma,
} from "@/idioma";

/**
 * Selector de idioma.
 *
 * Son enlaces, no un desplegable ni un `<select>`: cada idioma tiene su
 * propia URL, así que lo honesto es que se pueda abrir en otra pestaña,
 * copiar y compartir. Funciona sin JavaScript.
 *
 * Lo que sí necesita JavaScript es recordar la elección y respetar la del
 * navegador en la primera visita, y las dos cosas degradan bien: sin él se
 * sirve el idioma por defecto y el visitante cambia con un clic.
 *
 * Con un solo idioma no se pinta. Un selector de una opción no es un
 * selector, es un adorno que promete algo que no hay.
 */
export function SelectorIdioma({ idioma }: { idioma: Idioma }) {
  const ruta = usePathname();
  const router = useRouter();

  /* Primera visita: sin elección guardada, manda el navegador. Se sustituye
     la entrada del historial en vez de añadir una, para que el botón de
     atrás no devuelva al idioma que el visitante no pidió. */
  useEffect(() => {
    if (!HAY_VARIOS_IDIOMAS) return;

    let guardado: string | null = null;
    try {
      guardado = localStorage.getItem(CLAVE_IDIOMA);
    } catch {
      /* Navegación privada o almacenamiento bloqueado: se sirve lo que hay. */
      return;
    }

    if (guardado) {
      if (esIdioma(guardado) && guardado !== idioma)
        router.replace(rutaEnIdioma(ruta, guardado) as Route);
      return;
    }

    const preferido = idiomaPreferido(navigator.languages ?? [navigator.language]);
    if (preferido !== idioma) router.replace(rutaEnIdioma(ruta, preferido) as Route);
  }, [idioma, ruta, router]);

  if (!HAY_VARIOS_IDIOMAS) return null;

  const recordar = (elegido: Idioma) => {
    try {
      localStorage.setItem(CLAVE_IDIOMA, elegido);
    } catch {
      /* Si no se puede guardar, el cambio vale para esta visita igual. */
    }
  };

  return (
    <nav aria-label={diccionario(idioma).nav.idioma} className="selector-idioma">
      <ul className="flex items-center">
        {IDIOMAS.map((codigo) => {
          const activo = codigo === idioma;
          return (
            <li key={codigo}>
              <Link
                href={rutaEnIdioma(ruta, codigo) as Route}
                hrefLang={diccionario(codigo).etiquetaHtml}
                aria-current={activo ? "true" : undefined}
                onClick={() => recordar(codigo)}
                className="selector-idioma-opcion"
              >
                <span className="sr-only">{diccionario(codigo).nombre}</span>
                <span aria-hidden="true">{codigo.toUpperCase()}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
