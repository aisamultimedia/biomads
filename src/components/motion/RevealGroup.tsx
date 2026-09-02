"use client";

import { m } from "motion/react";
import { Children, useMemo, type ReactNode } from "react";
import { useRevelado } from "@/hooks/useRevelado";
import {
  conRegla,
  grupo,
  vocabulario,
  vocabularioRegla,
  type Tipo,
} from "@/lib/motion";

type Contenedor = "div" | "ul" | "ol" | "dl" | "section" | "article";
type Item = "div" | "li" | "article";

type Props = {
  children: ReactNode;
  /** Etiqueta del contenedor. */
  as?: Contenedor;
  /**
   * Etiqueta de cada hijo. Si el contenedor es una lista se asume `li`: un
   * `<ul>` con hijos `<div>` es estructura inválida y los lectores de
   * pantalla dejan de anunciarla como lista.
   */
  itemAs?: Item;
  /** Gesto de cada hijo. Por defecto `texto`. */
  tipo?: Tipo;
  /** Gesto por hijo, por posición. Donde falte, aplica `tipo`. */
  tipos?: readonly Tipo[];
  /**
   * `true`: cada hijo traza su regla superior. `"contenedor"`: la traza el
   * grupo, una sola vez, mientras escalona a los hijos. Ambos añaden
   * `.con-regla`; el relleno superior lo pone quien lo usa.
   */
  regla?: boolean | "contenedor";
  /** Segundos entre hijos. Por defecto --stagger-grupo. */
  escalonado?: number;
  className?: string;
  itemClassName?: string;
};

const CONTENEDORES_LISTA = new Set<Contenedor>(["ul", "ol"]);

/**
 * Revela a sus hijos escalonados cuando el grupo entra en pantalla.
 *
 * El escalonado lo orquesta el contenedor (`staggerChildren`), así que los
 * hijos no necesitan índice ni observador propio: un solo
 * IntersectionObserver por grupo.
 */
export function RevealGroup({
  children,
  as = "div",
  itemAs,
  tipo = "texto",
  tipos,
  regla = false,
  escalonado,
  className = "",
  itemClassName = "",
}: Props) {
  const revelado = useRevelado();
  const etiquetaHijo: Item = itemAs ?? (CONTENEDORES_LISTA.has(as) ? "li" : "div");
  const Contenedor = m[as] as typeof m.div;
  const Hijo = m[etiquetaHijo] as typeof m.div;

  const reglaContenedor = regla === "contenedor";
  const reglaHijos = regla === true;

  const variantesGrupo = useMemo(
    () => (reglaContenedor ? conRegla(grupo(escalonado)) : grupo(escalonado)),
    [escalonado, reglaContenedor],
  );
  const vocabularioHijo = reglaHijos ? vocabularioRegla : vocabulario;
  const claseHijo = reglaHijos ? `con-regla ${itemClassName}` : itemClassName;

  return (
    <Contenedor
      data-revelar=""
      variants={variantesGrupo}
      {...revelado}
      className={reglaContenedor ? `con-regla ${className}` : className}
    >
      {Children.toArray(children).map((hijo, i) => (
        <Hijo
          key={i}
          data-revelar=""
          variants={vocabularioHijo[tipos?.[i] ?? tipo]}
          className={claseHijo}
        >
          {hijo}
        </Hijo>
      ))}
    </Contenedor>
  );
}
