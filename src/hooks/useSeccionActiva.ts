"use client";

import { useEffect, useState } from "react";
import { navegacion } from "@/lib/site";

/**
 * Franja del viewport que decide qué sección está activa: la banda central,
 * de 45% a 50%. Una sección "es la actual" cuando la cruza, no cuando
 * asoma: con el criterio de asomar, dos secciones son la actual a la vez
 * durante todo el trayecto entre ambas.
 */
const BANDA = "-45% 0px -50% 0px";

/**
 * Ancla de la sección que el visitante está mirando.
 *
 * En una página única el indicador de la navegación no puede salir de la
 * ruta —siempre es "/"— así que lo decide el scroll. Devuelve `null` en el
 * hero y en cualquier hueco entre secciones, que es lo correcto: ahí no hay
 * ningún ítem del menú al que corresponda.
 *
 * Sin JavaScript no hay indicador y no pasa nada: la navegación son enlaces
 * de ancla que funcionan igual.
 */
export function useSeccionActiva(): string | null {
  const [activa, setActiva] = useState<string | null>(null);

  useEffect(() => {
    const secciones = navegacion
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((nodo): nodo is HTMLElement => nodo !== null);

    if (secciones.length === 0) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          /* Se actualiza por entrada, no recalculando el conjunto: al cruzar
             la banda solo cambia una, y la que sale lo hace porque otra
             entra —salvo en el hero y en los huecos, donde debe quedar
             `null`, que es justo lo que produce no reponer nada. */
          if (entrada.isIntersecting) setActiva(`#${entrada.target.id}`);
          else setActiva((previa) => (previa === `#${entrada.target.id}` ? null : previa));
        }
      },
      { rootMargin: BANDA },
    );

    for (const seccion of secciones) observador.observe(seccion);
    return () => observador.disconnect();
  }, []);

  return activa;
}
