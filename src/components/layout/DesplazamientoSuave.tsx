"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Desplazamiento suave con Lenis.
 *
 * Tres cuidados que un scroll suave mal puesto rompe:
 *
 * 1. `prefers-reduced-motion`. Si el usuario lo pidió, Lenis no se monta:
 *    el desplazamiento nativo es instantáneo y eso es exactamente lo que
 *    esa preferencia significa.
 * 2. El teclado. Al tabular a un elemento fuera de pantalla el navegador
 *    salta a él de golpe; Lenis pelearía con ese salto. Se escucha `focusin`
 *    y se lleva el desplazamiento al elemento sin animar.
 * 3. Los anclas. Lenis toma el control de `scroll-behavior`, así que los
 *    enlaces internos se resuelven con `scrollTo`, respetando el hueco de
 *    la cabecera fija.
 *
 * No pinta nada: solo instala el comportamiento.
 */
export function DesplazamientoSuave() {
  const ruta = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      /* La misma curva del sistema, expresada como easing de salida. */
      easing: (t) => 1 - Math.pow(1 - t, 3),
      /* La rueda se suaviza; el gesto táctil se deja al sistema operativo,
         que ya tiene su propia inercia y hacerlo dos veces se siente mal. */
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let cuadro = 0;
    const avanzar = (tiempo: number) => {
      lenis.raf(tiempo);
      cuadro = requestAnimationFrame(avanzar);
    };
    cuadro = requestAnimationFrame(avanzar);

    /* La cabecera es fija: al saltar a un ancla hay que descontar su alto. */
    const hueco = () => {
      const valor = getComputedStyle(document.documentElement).getPropertyValue(
        "--altura-cabecera",
      );
      return -(parseInt(valor, 10) || 96);
    };

    function alPulsar(evento: MouseEvent) {
      const enlace = (evento.target as HTMLElement | null)?.closest("a");
      const href = enlace?.getAttribute("href");
      if (!href?.startsWith("#") || href === "#") return;
      const destino = document.querySelector(href);
      if (!destino) return;
      evento.preventDefault();
      lenis.scrollTo(destino as HTMLElement, { offset: hueco() });
    }

    /* Si el foco se va a algo que no está en pantalla, ir sin animación:
       el usuario de teclado necesita llegar ya, no viajar. */
    function alEnfocar(evento: FocusEvent) {
      const objetivo = evento.target as HTMLElement | null;
      if (!objetivo) return;
      const caja = objetivo.getBoundingClientRect();
      const fuera = caja.top < 0 || caja.bottom > window.innerHeight;
      if (fuera) lenis.scrollTo(objetivo, { offset: hueco(), immediate: true });
    }

    document.addEventListener("click", alPulsar);
    document.addEventListener("focusin", alEnfocar);

    return () => {
      cancelAnimationFrame(cuadro);
      document.removeEventListener("click", alPulsar);
      document.removeEventListener("focusin", alEnfocar);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* Al cambiar de página, arriba y sin viaje. */
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [ruta]);

  return null;
}
