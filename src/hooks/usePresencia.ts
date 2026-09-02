"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mantiene un elemento montado mientras se anima su salida.
 *
 * Es lo único que `AnimatePresence` hacía y que el navegador no resuelve
 * solo: React desmonta en el mismo cuadro en que la condición pasa a falsa,
 * y el elemento desaparece de golpe sin darle tiempo a la transición.
 *
 * La **entrada** no la gestiona: eso lo hace `@starting-style` en el CSS,
 * que es exactamente para lo que existe. Aquí solo se retrasa el desmontaje
 * hasta que la transición de salida termina, y quien lo dice es
 * `transitionend`, no un temporizador que haya que mantener en sincronía
 * con la duración escrita en el CSS.
 *
 * Devuelve `montado` —si hay que renderizar—, `estado` para que el CSS sepa
 * si está entrando o saliendo, y la `ref` que hay que poner en el nodo que
 * transiciona.
 */
export type EstadoPresencia = "entrando" | "saliendo";

/** Si la transición no llega a correr, el panel no se queda colgado. */
const RESPALDO_MS = 400;

export function usePresencia(abierto: boolean) {
  const [montado, setMontado] = useState(abierto);
  const nodoRef = useRef<HTMLElement | null>(null);

  /* Derivado, no estado: el estado visual es siempre función de `abierto`. */
  const estado: EstadoPresencia = abierto ? "entrando" : "saliendo";

  useEffect(() => {
    if (abierto) {
      /* En el cuadro siguiente, no en el cuerpo del efecto: así montar no
         encadena un segundo render dentro del mismo. */
      const cuadro = requestAnimationFrame(() => setMontado(true));
      return () => cancelAnimationFrame(cuadro);
    }

    const nodo = nodoRef.current;
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!nodo || sinMovimiento) {
      const cuadro = requestAnimationFrame(() => setMontado(false));
      return () => cancelAnimationFrame(cuadro);
    }

    /* `transitionend` burbujea desde los hijos: solo cuenta el del propio
       elemento, o un hijo que tarde más dejaría el panel colgado. */
    const alTerminar = (evento: TransitionEvent) => {
      if (evento.target === nodo) setMontado(false);
    };
    nodo.addEventListener("transitionend", alTerminar);
    const respaldo = window.setTimeout(() => setMontado(false), RESPALDO_MS);

    return () => {
      nodo.removeEventListener("transitionend", alTerminar);
      window.clearTimeout(respaldo);
    };
  }, [abierto]);

  return { montado, estado, ref: nodoRef };
}
