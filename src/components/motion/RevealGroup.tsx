import { Children, type CSSProperties, type ReactNode } from "react";
import type { Tipo } from "./Reveal";

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
 * El contenedor lleva `data-revelar="grupo"`, que no tiene gesto propio: es
 * solo la marca que hace que el observador lo mire. Al entrar marca a todos
 * sus hijos a la vez y cada uno espera su turno por el `transition-delay`
 * que el CSS calcula desde `--indice`.
 *
 * Así el escalonado no lo orquesta nadie en JavaScript, y hace falta un solo
 * IntersectionObserver por grupo en vez de uno por hijo.
 */
export function RevealGroup({
  children,
  as: Contenedor = "div",
  itemAs,
  tipo = "texto",
  tipos,
  regla = false,
  escalonado,
  className = "",
  itemClassName = "",
}: Props) {
  const Hijo = itemAs ?? (CONTENEDORES_LISTA.has(Contenedor) ? "li" : "div");

  const reglaContenedor = regla === "contenedor";
  const reglaHijos = regla === true;
  const claseHijo = reglaHijos ? `con-regla ${itemClassName}` : itemClassName;

  return (
    <Contenedor
      data-revelar="grupo"
      className={reglaContenedor ? `con-regla ${className}` : className}
      style={
        escalonado !== undefined
          ? ({ "--stagger-grupo": `${escalonado}s` } as CSSProperties)
          : undefined
      }
    >
      {Children.toArray(children).map((hijo, i) => (
        <Hijo
          key={i}
          data-revelar={tipos?.[i] ?? tipo}
          className={claseHijo}
          style={{ "--indice": i } as CSSProperties}
        >
          {hijo}
        </Hijo>
      ))}
    </Contenedor>
  );
}
