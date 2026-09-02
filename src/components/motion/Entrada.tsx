import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  /**
   * Gesto de entrada. Mismo vocabulario que Reveal, resuelto en CSS
   * (ver `[data-entrada]` en globals.css).
   */
  tipo?: "texto" | "lateral" | "panel";
  /**
   * Traza la regla superior de 1px en el mismo paso. Añade `.con-regla`;
   * el relleno superior (pt-6) lo pone quien lo usa.
   */
  regla?: boolean;
  /** Posición dentro de la secuencia de carga, en pasos de --paso-entrada. */
  indice?: number;
  className?: string;
};

/**
 * Entrada para contenido que ya está en pantalla al cargar (hero, cabeceras
 * de página). Anima con CSS puro, sin JavaScript.
 *
 * No usar `Reveal` sobre la mitad superior: su estado oculto solo se levanta
 * cuando React hidrata, y eso retrasa el Largest Contentful Paint más de un
 * segundo con CPU limitada. `Reveal` es para lo que hay que bajar a ver;
 * `Entrada`, para lo que ya se ve.
 */
export function Entrada({
  children,
  as: Etiqueta = "div",
  tipo = "texto",
  regla = false,
  indice = 0,
  className = "",
}: Props) {
  return (
    <Etiqueta
      data-entrada={tipo}
      data-regla-entrada={regla ? "" : undefined}
      className={regla ? `con-regla ${className}` : className}
      style={{ "--indice": indice } as CSSProperties}
    >
      {children}
    </Etiqueta>
  );
}
