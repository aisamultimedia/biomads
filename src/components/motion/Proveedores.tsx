"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";
import type { ReactNode } from "react";
import { CURVA_ENTRADA, DURACION } from "@/lib/motion";

/**
 * Contexto de motion para todo el sitio.
 *
 * - `LazyMotion` con `domMax` en modo estricto: los componentes usan `m.*`
 *   (no `motion.*`) y el motor de animación se carga una sola vez. `domMax`
 *   en vez de `domAnimation` porque el indicador de la barra usa `layoutId`.
 * - `MotionConfig reducedMotion="user"`: con prefers-reduced-motion se
 *   apagan las transformaciones y queda solo la opacidad. Los revelados,
 *   además, arrancan en su estado final (ver Reveal).
 * - La transición por defecto es la curva y duración de entrada del sitio.
 */
export function Proveedores({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: DURACION.entrada, ease: CURVA_ENTRADA }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
