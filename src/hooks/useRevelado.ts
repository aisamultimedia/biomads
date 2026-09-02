"use client";

import { useReducedMotion } from "motion/react";
import { viewport } from "@/lib/motion";

/**
 * Props comunes de todo revelado por scroll: arranca oculto y se hace
 * visible una sola vez al entrar en pantalla.
 *
 * Si el usuario pidió menos movimiento, arranca ya en `visible`: motion
 * escribe ese estado al montar y pisa el estado oculto que llegó del
 * servidor. Nada se mueve, nada se desvanece, todo se ve.
 *
 *   const revelado = useRevelado();
 *   <m.div variants={texto} {...revelado} />
 */
export function useRevelado() {
  const reducido = useReducedMotion();
  return {
    initial: reducido ? "visible" : "oculto",
    whileInView: "visible",
    viewport,
  } as const;
}
