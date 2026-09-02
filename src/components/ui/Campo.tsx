"use client";

import { AnimatePresence, m } from "motion/react";
import type { ComponentProps } from "react";
import { aviso } from "@/lib/motion";

type Base = {
  id: string;
  etiqueta: string;
  /** Mensaje de error. Si viene, el campo se marca como inválido. */
  error?: string;
  /** Ayuda breve bajo la etiqueta. */
  ayuda?: string;
};

type PropsInput = Base & { multilinea?: false } & Omit<
    ComponentProps<"input">,
    "id" | "className"
  >;

type PropsTextarea = Base & { multilinea: true } & Omit<
    ComponentProps<"textarea">,
    "id" | "className"
  >;

const control = [
  "w-full rounded-sm border bg-paper px-4 py-3",
  "text-base text-ink",
  "min-h-[var(--area-tactil)]",
  "placeholder:text-ink-muted",
  "transition-colors duration-[var(--duracion-micro)] ease-base",
  "hover:border-ink-muted",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

/**
 * Campo de formulario con etiqueta, ayuda y error.
 *
 * El borde en reposo usa --line-strong (3.12:1) porque es un borde con
 * significado: WCAG 1.4.11 pide 3:1 y --line se queda en 1.28:1.
 * El error se anuncia por aria-describedby y por role="alert", no solo por
 * el color del borde. Entra y sale sin llamar la atención (`aviso`).
 */
export function Campo(props: PropsInput | PropsTextarea) {
  const { id, etiqueta, error, ayuda, multilinea, ...resto } = props;

  const idError = `${id}-error`;
  const idAyuda = `${id}-ayuda`;
  const descrito = [error ? idError : null, ayuda ? idAyuda : null]
    .filter(Boolean)
    .join(" ");

  const clases = `${control} ${
    error ? "border-accent-deep" : "border-line-strong"
  }`;

  return (
    <div>
      <label htmlFor={id} className="etiqueta block text-ink">
        {etiqueta}
      </label>

      {ayuda && (
        <p id={idAyuda} className="mt-2 text-sm text-ink-muted">
          {ayuda}
        </p>
      )}

      <div className="mt-3">
        {multilinea ? (
          <textarea
            id={id}
            rows={6}
            aria-invalid={error ? true : undefined}
            aria-describedby={descrito || undefined}
            className={clases}
            {...(resto as ComponentProps<"textarea">)}
          />
        ) : (
          <input
            id={id}
            aria-invalid={error ? true : undefined}
            aria-describedby={descrito || undefined}
            className={clases}
            {...(resto as ComponentProps<"input">)}
          />
        )}
      </div>

      <AnimatePresence>
        {error && (
          <m.p
            key="error"
            id={idError}
            role="alert"
            variants={aviso}
            initial="oculto"
            animate="visible"
            exit="salida"
            className="mt-2 flex items-baseline gap-2 text-sm text-accent-deep"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 flex-none translate-y-[-0.15em] rounded-sm bg-accent-deep"
            />
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
