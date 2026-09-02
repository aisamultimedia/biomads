import type { CSSProperties, ElementType } from "react";

type Props = {
  /** Cada elemento es una línea. El corte lo decide quien escribe, no el ancho. */
  lineas: readonly string[];
  as?: ElementType;
  /**
   * Posición del título dentro de la secuencia de carga, en pasos de
   * --paso-entrada. Las líneas se escalonan a partir de ahí.
   */
  indice?: number;
  className?: string;
};

/**
 * Título que entra línea por línea con máscara ascendente, escalonado en
 * pasos de --stagger-titulo (80ms).
 *
 * La animación es CSS puro con `animation-fill-mode: both`, así que corre
 * aunque JavaScript falle, y queda anulada bajo prefers-reduced-motion.
 * El texto siempre está en el DOM: para lectores de pantalla y para el
 * buscador es un título normal.
 */
export function TituloPorLineas({
  lineas,
  as: Etiqueta = "h1",
  indice = 0,
  className,
}: Props) {
  return (
    <Etiqueta className={className}>
      <span
        className="titulo-lineas"
        style={{ "--retraso-base": `calc(var(--paso-entrada) * ${indice})` } as CSSProperties}
      >
        {lineas.map((linea, i) => (
          <span
            key={linea}
            className="titulo-linea"
            style={{ "--indice": i } as CSSProperties}
          >
            <span>{linea}</span>
          </span>
        ))}
      </span>
    </Etiqueta>
  );
}
