"use client";

import { useSyncExternalStore } from "react";

const CONSULTA = "(min-width: 1024px)";

function suscribir(alCambiar: () => void) {
  const consulta = window.matchMedia(CONSULTA);
  consulta.addEventListener("change", alCambiar);
  return () => consulta.removeEventListener("change", alCambiar);
}

/**
 * ¿Pantalla de escritorio (≥ 1024px)? En el servidor y antes de hidratar
 * responde `false`: los efectos que dependen de esto —el parallax— se
 * encienden después, nunca antes.
 */
export function useEscritorio() {
  return useSyncExternalStore(
    suscribir,
    () => window.matchMedia(CONSULTA).matches,
    () => false,
  );
}
