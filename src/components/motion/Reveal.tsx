import type { CSSProperties, ReactNode } from "react";

/** Los cuatro gestos del sistema. El CSS los resuelve por `data-revelar`. */
export type Tipo = "texto" | "lateral" | "titulo" | "panel";

type Etiqueta =
  | "div"
  | "article"
  | "section"
  | "li"
  | "p"
  | "figure"
  | "blockquote"
  | "span"
  | "dl";

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
 * Es un componente de servidor: solo emite atributos. El estado oculto, la
 * curva y el retraso los pone el CSS, y `<Revelador />` —montado una vez en
 * el layout— decide cuándo poner `data-visible`.
 *
 * Sin JavaScript, o con prefers-reduced-motion, el estado oculto ni siquiera
 * se aplica: la consulta que lo define no encaja y el contenido nace visible.
 */
export function Reveal({
  children,
  as: Componente = "div",
  tipo = "texto",
  regla = false,
  indice = 0,
  className = "",
  style,
  id,
}: Props) {
  return (
    <Componente
      id={id}
      data-revelar={tipo}
      className={regla ? `con-regla ${className}` : className}
      style={indice ? ({ ...style, "--indice": indice } as CSSProperties) : style}
    >
      {children}
    </Componente>
  );
}
