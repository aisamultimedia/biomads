"use client";

import { m } from "motion/react";
import type { CSSProperties } from "react";
import { useRevelado } from "@/hooks/useRevelado";
import { grupoConRegla, texto } from "@/lib/motion";

export type Dato = {
  /** Rótulo en versalitas mono. */
  rotulo: string;
  /** Valor. Si es un dato duro (duración, año, cifra) va en mono. */
  valor: string;
  /** Renderiza el valor en mono con cifras tabulares. */
  mono?: boolean;
};

type Props = {
  datos: readonly Dato[];
  /** Sobre bloques oscuros. */
  invertida?: boolean;
  /**
   * Entra al cargar, por CSS. Obligatorio en la mitad superior: el revelado
   * por scroll solo se levanta cuando React hidrata, y eso retrasa el LCP.
   */
  inmediata?: boolean;
  /**
   * Con `inmediata`, posición en la secuencia de carga: la regla se traza en
   * ese paso y las filas van en los siguientes.
   */
  indice?: number;
  /**
   * Forma parte de un grupo revelado por un padre: no dispara su propio
   * revelado, hereda el del padre y entra en su turno del escalonado.
   */
  anidada?: boolean;
  /** Columnas en escritorio. En móvil siempre son dos. */
  columnas?: 2 | 4;
  className?: string;
};

/**
 * Ficha de datos: rótulo mono arriba, valor abajo. La regla superior se
 * traza mientras las filas entran escalonadas.
 *
 * En móvil se reordena a dos columnas —cuatro datos quedan en dos filas—
 * en vez de encogerse hasta ser ilegible.
 */
export function FichaDatos({
  datos,
  invertida = false,
  inmediata = false,
  indice = 0,
  anidada = false,
  columnas = 4,
  className = "",
}: Props) {
  const revelado = useRevelado();

  const rotuloColor = invertida ? "text-ink-invert-muted" : "text-ink-muted";
  const valorColor = invertida ? "text-ink-invert" : "text-ink";
  const clases = [
    "con-regla grid grid-cols-2 gap-x-6 gap-y-8 pt-6",
    columnas === 4 ? "md:grid-cols-4" : "",
    className,
  ].join(" ");

  const fila = (dato: Dato) => (
    <>
      <dt className={`etiqueta ${rotuloColor}`}>{dato.rotulo}</dt>
      <dd className={`mt-2 text-lg ${valorColor} ${dato.mono ? "dato" : ""}`}>
        {dato.valor}
      </dd>
    </>
  );

  if (inmediata) {
    return (
      <dl
        data-regla-entrada=""
        className={clases}
        style={{ "--indice": indice } as CSSProperties}
      >
        {datos.map((dato, i) => (
          <div
            key={dato.rotulo}
            data-entrada="texto"
            style={{ "--indice": indice + 1 + i } as CSSProperties}
          >
            {fila(dato)}
          </div>
        ))}
      </dl>
    );
  }

  return (
    <m.dl
      data-revelar=""
      variants={grupoConRegla}
      {...(anidada ? {} : revelado)}
      className={clases}
    >
      {datos.map((dato) => (
        <m.div key={dato.rotulo} data-revelar="" variants={texto}>
          {fila(dato)}
        </m.div>
      ))}
    </m.dl>
  );
}
