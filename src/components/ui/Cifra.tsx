"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cifra que cuenta hacia arriba al entrar en pantalla, una sola vez.
 *
 * Solo para cantidades. **Un año no se cuenta**: 2017 no es una cantidad
 * sino una etiqueta, y animarlo haría desfilar años que son falsos —1400,
 * 1900— antes de llegar al bueno. Se lee como una máquina tragaperras y
 * dice algo que no es cierto en cada cuadro.
 *
 * El valor final está en el DOM desde el primer render y solo se sustituye
 * si el contador va a correr: sin JavaScript, con `prefers-reduced-motion`
 * o en el servidor, la cifra ya es la definitiva. Y el hueco no cambia de
 * ancho porque `.dato` lleva cifras tabulares.
 */

/** Suficiente para que se vea contar sin hacer esperar. */
const DURACION_MS = 900;

type Props = {
  /** El número al que llega. */
  valor: number;
  /** Lo que va después: "años", "meses". Nunca se anima. */
  sufijo?: string;
  className?: string;
};

export function Cifra({ valor, sufijo, className = "" }: Props) {
  const [actual, setActual] = useState(valor);
  const nodoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const nodo = nodoRef.current;
    if (!nodo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cuadro = 0;
    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas[0]?.isIntersecting) return;
        observador.disconnect();

        const inicio = performance.now();
        const avanzar = (ahora: number) => {
          const progreso = Math.min((ahora - inicio) / DURACION_MS, 1);
          /* La misma frenada larga que el resto del sitio: --ease-base
             expresada como una curva de salida cúbica. */
          const suave = 1 - Math.pow(1 - progreso, 3);
          setActual(Math.round(valor * suave));
          if (progreso < 1) cuadro = requestAnimationFrame(avanzar);
        };
        /* Arranca en cero en el mismo cuadro en que empieza a contar, no
           antes: así nunca se ve un cero parado esperando turno. */
        cuadro = requestAnimationFrame(avanzar);
      },
      { threshold: 0.6 },
    );

    observador.observe(nodo);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(cuadro);
    };
  }, [valor]);

  return (
    <span ref={nodoRef} className={className}>
      {actual}
      {sufijo ? ` ${sufijo}` : null}
    </span>
  );
}
