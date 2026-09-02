"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { useRevelado } from "@/hooks/useRevelado";
import { grupo, lateral, titulo as varianteTitulo } from "@/lib/motion";

type Props = {
  /** Rótulo mono sobre el título. Opcional. */
  rotulo?: string;
  titulo?: string;
  children: ReactNode;
  /** Superficie alterna. */
  alterna?: boolean;
  /** Superficie oscura: cambia el anillo de foco y los colores de texto. */
  oscura?: boolean;
  /** Ancla para enlaces internos. */
  id?: string;
  className?: string;
};

const cabecera = grupo();

/**
 * Envoltura de sección: ancho máximo, respiración lateral y ritmo vertical
 * de 96px en móvil y 160px en escritorio.
 *
 * La cabecera entra como grupo: el rótulo llega lateral y el título se
 * revela tras su máscara, en ese orden.
 */
export function Seccion({
  rotulo,
  titulo,
  children,
  alterna = false,
  oscura = false,
  id,
  className = "",
}: Props) {
  const revelado = useRevelado();

  const superficie = oscura
    ? "superficie-oscura bg-dark text-ink-invert"
    : alterna
      ? "bg-paper-alt"
      : "";

  return (
    <section id={id} className={`${superficie} ${className}`}>
      <div className="mx-auto w-full max-w-ancho px-6 py-24 md:py-40">
        {(rotulo || titulo) && (
          <m.div data-revelar="" variants={cabecera} {...revelado} className="mb-16">
            {rotulo && (
              <m.p
                data-revelar=""
                variants={lateral}
                className={`etiqueta ${oscura ? "text-accent" : "text-accent-deep"}`}
              >
                {rotulo}
              </m.p>
            )}
            {titulo && (
              <m.h2
                data-revelar=""
                variants={varianteTitulo}
                className="mt-4 text-2xl md:text-3xl"
              >
                {titulo}
              </m.h2>
            )}
          </m.div>
        )}
        {children}
      </div>
    </section>
  );
}
