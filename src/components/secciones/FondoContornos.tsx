"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

/**
 * Fondo de curvas de nivel para el hero.
 *
 * Dos capas de líneas que derivan a distinta velocidad. Son curvas de nivel:
 * el lenguaje del sistema son líneas, no sombras ni degradados, y además
 * leen como cartografía, que es de lo que vive la empresa.
 *
 * Lo que se anima es el `transform` de un div, no el de un `<g>` dentro del
 * SVG: transformar un grupo SVG obliga al navegador a repintar el dibujo en
 * cada cuadro, mientras que el div lo compone la GPU.
 *
 * El bucle es continuo, así que va en `linear`: con una curva de aceleración
 * un movimiento infinito late, y eso llamaría la atención en vez de quedarse
 * detrás. Se pausa cuando el hero sale de pantalla y bajo
 * `prefers-reduced-motion` se queda quieto (ver globals.css).
 */

const ANCHO = 800;
const ALTO = 380;

/** Curvas de nivel de un mosaico, dibujadas a partir de `origen`. */
function curvas(origen: number, desfase: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const y = 30 + i * 66 + desfase;
    const a = 34 + (i % 3) * 16;
    const x = origen;
    return `M ${x} ${y}
            C ${x + 100} ${y - a}, ${x + 200} ${y + a}, ${x + 300} ${y}
            S ${x + 500} ${y - a}, ${x + 600} ${y}
            S ${x + 700} ${y + a}, ${x + 800} ${y}`;
  });
}

/** Un mosaico doble: el patrón se repite para que el bucle cierre sin salto. */
function Capa({ clase, desfase }: { clase: string; desfase: number }) {
  const trazos = [...curvas(0, desfase), ...curvas(ANCHO, desfase)];
  return (
    <div className={`capa-contornos ${clase}`}>
      <svg
        viewBox={`0 0 ${ANCHO * 2} ${ALTO}`}
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      >
        {trazos.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
    </div>
  );
}

export function FondoContornos() {
  const ref = useRef<HTMLDivElement>(null);
  /* `initial: true`: hasta que el observador responda se asume visible, así
     que la deriva arranca con la página y no espera a la hidratación. */
  const enPantalla = useInView(ref, { initial: true });

  return (
    <div
      ref={ref}
      className="fondo-contornos"
      data-pausado={enPantalla ? undefined : ""}
      aria-hidden="true"
    >
      <Capa clase="capa-contornos--lenta" desfase={0} />
      <Capa clase="capa-contornos--rapida" desfase={31} />
    </div>
  );
}
