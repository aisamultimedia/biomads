"use client";

import type { ComponentProps, ReactNode } from "react";

type Props = {
  id: string;
  /** Texto de la casilla. Admite un enlace dentro. */
  etiqueta: ReactNode;
  error?: string;
} & Omit<ComponentProps<"input">, "id" | "type" | "className" | "children">;

/**
 * Casilla de verificación con etiqueta larga y error.
 *
 * La casilla nativa se oculta (`appearance: none`) y se dibuja con CSS
 * para que tenga el tamaño y los colores del sitio: la del sistema mide
 * 13 px y no llega al mínimo táctil. Sigue siendo un `input` de verdad:
 * teclado, lector de pantalla y `:checked` son los del navegador.
 *
 * El enlace a la política va dentro de la etiqueta porque forma parte de
 * la frase. Pulsarlo no marca la casilla —el navegador no propaga la
 * activación de un `label` cuando el clic cae en otro control— y abre en
 * pestaña nueva para no perder lo escrito.
 */
export function Casilla({ id, etiqueta, error, ...resto }: Props) {
  const idError = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="casilla">
        <input
          id={id}
          type="checkbox"
          className="casilla-control"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? idError : undefined}
          {...resto}
        />
        <span className="casilla-texto">{etiqueta}</span>
      </label>

      {error && (
        <p
          id={idError}
          role="alert"
          data-entrada="aviso"
          className="mt-2 flex items-baseline gap-2 text-sm text-accent-deep"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 flex-none translate-y-[-0.15em] rounded-sm bg-accent-deep"
          />
          {error}
        </p>
      )}
    </div>
  );
}
