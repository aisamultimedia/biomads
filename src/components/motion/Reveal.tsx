"use client";

import { m } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { useRevelado } from "@/hooks/useRevelado";
import { vocabulario, vocabularioRegla, type Tipo } from "@/lib/motion";

type Etiqueta =
  | "div"
  | "article"
  | "section"
  | "li"
  | "p"
  | "figure"
  | "blockquote"
  | "span";

type Props = {
  children: ReactNode;
  /** Etiqueta a renderizar. Por defecto div. */
  as?: Etiqueta;
  /** Gesto de entrada. Por defecto `texto` (opacidad + 16px). */
  tipo?: Tipo;
  /**
   * Traza la regla superior de 1px mientras entra. Añade `.con-regla`; el
   * relleno superior (pt-6) lo pone quien lo usa.
   */
  regla?: boolean;
  /** Retraso propio, en pasos de --stagger-grupo, para hermanos sueltos. */
  indice?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

/**
 * Revela su contenido al entrar en pantalla, una sola vez.
 *
 * El gesto lo decide `tipo` (ver src/lib/motion.ts). El estado oculto lo
 * escribe motion en línea al renderizar en el servidor; si JavaScript no
 * corre, globals.css lo anula bajo `@media (scripting: none)`. Con
 * prefers-reduced-motion arranca directamente en su estado final.
 */
export function Reveal({
  children,
  as = "div",
  tipo = "texto",
  regla = false,
  indice = 0,
  className = "",
  style,
  id,
}: Props) {
  const revelado = useRevelado();
  const Componente = m[as] as typeof m.div;
  const variantes = regla ? vocabularioRegla[tipo] : vocabulario[tipo];

  return (
    <Componente
      id={id}
      data-revelar=""
      variants={variantes}
      custom={indice}
      {...revelado}
      className={regla ? `con-regla ${className}` : className}
      style={style}
    >
      {children}
    </Componente>
  );
}
