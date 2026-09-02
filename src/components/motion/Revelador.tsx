"use client";

import { useEffect } from "react";

/**
 * Enciende el revelado por scroll de toda la página.
 *
 * Se monta una vez en el layout. Los elementos que se revelan son
 * componentes de servidor que solo emiten `data-revelar`: el gesto lo hace
 * el CSS y aquí únicamente se marca cuándo. Eso mantiene el árbol de
 * cliente en un solo módulo en vez de convertir en cliente cada párrafo.
 *
 * Se observan solo las raíces —los `[data-revelar]` que no están dentro de
 * otro— porque un grupo revela a sus hijos de una vez y el escalonado lo
 * pone el CSS. Un observador para todo el documento, una entrada por grupo.
 */

/** Un 12 % por encima del borde inferior: nada arranca pegado al borde. */
const MARGEN = "0px 0px -12% 0px";

export function Revelador() {
  useEffect(() => {
    /* Con menos movimiento el CSS ya deja todo en su estado final: montar
       el observador solo serviría para poner un atributo que nadie lee. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          const raiz = entrada.target as HTMLElement;

          raiz.dataset.visible = "";
          for (const hijo of raiz.querySelectorAll<HTMLElement>("[data-revelar]"))
            hijo.dataset.visible = "";

          /* Revelado se queda revelado: subir y volver a bajar no repite. */
          observador.unobserve(raiz);
        }
      },
      { rootMargin: MARGEN, threshold: 0 },
    );

    for (const nodo of document.querySelectorAll<HTMLElement>("[data-revelar]")) {
      /* Los hijos de un grupo los marca su raíz, no el observador. */
      if (nodo.parentElement?.closest("[data-revelar]")) continue;
      observador.observe(nodo);
    }

    return () => observador.disconnect();
  }, []);

  return null;
}
