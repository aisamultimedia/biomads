"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /**
   * Cuánto se desplaza el contenido hacia el cursor, en píxeles, cuando el
   * puntero está en el borde del elemento. Por encima de ~10 el gesto deja
   * de leerse como respuesta y empieza a leerse como que algo falla.
   */
  intensidad?: number;
  as?: "div" | "span" | "li" | "article";
  className?: string;
};

/**
 * Reacción al cursor: el contenido se inclina hacia el puntero y la caja
 * sabe dónde está, para que el CSS pueda dibujar con esa posición.
 *
 * Publica dos cosas en el elemento: un `translate` propio, que es el gesto
 * magnético, y las variables `--cursor-x` y `--cursor-y` en porcentaje, que
 * cualquier regla puede usar —un resplandor que sigue al puntero, un borde
 * que se enciende por el lado por el que se entra—.
 *
 * **Por qué así y no con estado de React.** Un `setState` por cada
 * `mousemove` reconcilia el árbol sesenta veces por segundo. Aquí solo se
 * escriben propiedades personalizadas sobre el nodo, dentro de un
 * `requestAnimationFrame`: no hay render, y el navegador compone el
 * movimiento fuera del hilo principal porque únicamente cambia `translate`.
 *
 * **Dónde no aplica.** Con puntero grueso —el dedo— no hay hover que seguir,
 * así que no se registra nada; y con `prefers-reduced-motion` el gesto
 * magnético se anula, aunque las variables se siguen publicando para que un
 * cambio de color sí pueda responder.
 */
export function Cursor({ children, intensidad = 6, as: Etiqueta = "div", className = "" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  /* Referencia por función y no por objeto: la etiqueta la elige quien usa
     el componente —div, span, li o article— y un RefObject tipado a uno de
     ellos no encaja en los otros. Una función que acepta HTMLElement sí. */
  const fijar = useCallback((nodo: HTMLElement | null) => {
    ref.current = nodo;
  }, []);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    /* Solo donde hay un puntero fino de verdad. */
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pedido = 0;
    let x = 0;
    let y = 0;

    const pintar = () => {
      pedido = 0;
      const caja = nodo.getBoundingClientRect();
      if (caja.width === 0) return;

      /* Posición dentro de la caja, 0–100, para el CSS. */
      const px = ((x - caja.left) / caja.width) * 100;
      const py = ((y - caja.top) / caja.height) * 100;
      nodo.style.setProperty("--cursor-x", `${px}%`);
      nodo.style.setProperty("--cursor-y", `${py}%`);

      if (sinMovimiento.matches) return;

      /* Y el desplazamiento magnético, desde el centro y normalizado. */
      const dx = (x - (caja.left + caja.width / 2)) / (caja.width / 2);
      const dy = (y - (caja.top + caja.height / 2)) / (caja.height / 2);
      nodo.style.setProperty("--iman-x", `${dx * intensidad}px`);
      nodo.style.setProperty("--iman-y", `${dy * intensidad}px`);
    };

    const alMover = (evento: PointerEvent) => {
      x = evento.clientX;
      y = evento.clientY;
      pedido ||= requestAnimationFrame(pintar);
    };

    const alSalir = () => {
      if (pedido) cancelAnimationFrame(pedido);
      pedido = 0;
      nodo.style.removeProperty("--iman-x");
      nodo.style.removeProperty("--iman-y");
    };

    nodo.addEventListener("pointermove", alMover);
    nodo.addEventListener("pointerleave", alSalir);
    return () => {
      nodo.removeEventListener("pointermove", alMover);
      nodo.removeEventListener("pointerleave", alSalir);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, [intensidad]);

  return (
    <Etiqueta ref={fijar} data-cursor="" className={className}>
      {children}
    </Etiqueta>
  );
}
