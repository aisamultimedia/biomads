"use client";

import { useSyncExternalStore } from "react";

/**
 * Botón flotante de volver arriba.
 *
 * Es un **enlace de ancla**, no un botón con `scrollTo`. Lenis ya intercepta
 * los enlaces internos y los resuelve con su propio desplazamiento suave
 * (ver DesplazamientoSuave), así que el gesto sale gratis y además funciona
 * sin JavaScript: sin él sigue siendo un salto al principio de la página.
 *
 * Lo único que necesita JavaScript es aparecer, y por eso no se monta hasta
 * que hace falta. Con `prefers-reduced-motion` el salto es instantáneo, que
 * es exactamente lo que esa preferencia pide.
 */

/** A partir de aquí volver arriba deja de ser trivial con la rueda. */
const UMBRAL = 600;

function suscribir(alCambiar: () => void) {
  window.addEventListener("scroll", alCambiar, { passive: true });
  return () => window.removeEventListener("scroll", alCambiar);
}

export function BotonSubir({ etiqueta }: { etiqueta: string }) {
  const visible = useSyncExternalStore(
    suscribir,
    () => window.scrollY > UMBRAL,
    /* En el servidor no hay desplazamiento: nace oculto y no parpadea. */
    () => false,
  );

  return (
    <a
      href="#inicio"
      className="boton-subir"
      data-visible={visible ? "" : undefined}
      /* Fuera del orden de tabulación mientras no se ve: tabular hasta un
         enlace invisible es un callejón sin salida. */
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
    >
      <span className="sr-only">{etiqueta}</span>
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="var(--trazo-icono)"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 19V5" />
        <path d="m5.5 11.5 6.5-6.5 6.5 6.5" />
      </svg>
    </a>
  );
}
