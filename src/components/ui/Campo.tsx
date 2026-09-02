"use client";

import type { ComponentProps } from "react";

type Base = {
  id: string;
  etiqueta: string;
  /** Mensaje de error. Si viene, el campo se marca como inválido. */
  error?: string;
  /** Ayuda breve bajo la etiqueta. */
  ayuda?: string;
};

type PropsInput = Base & { multilinea?: false; opciones?: undefined } & Omit<
    ComponentProps<"input">,
    "id" | "className"
  >;

type PropsTextarea = Base & { multilinea: true; opciones?: undefined } & Omit<
    ComponentProps<"textarea">,
    "id" | "className"
  >;

type PropsSelect = Base & {
  multilinea?: false;
  opciones: readonly { valor: string; rotulo: string }[];
  /** Primera opción, sin valor: lo que se lee antes de elegir. */
  vacio: string;
} & Omit<ComponentProps<"select">, "id" | "className" | "children">;

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
 * Campo de formulario con etiqueta, ayuda y error. Cubre entrada de una
 * línea, área de texto y desplegable.
 *
 * El borde en reposo usa --line-strong (3.12:1) porque es un borde con
 * significado: WCAG 1.4.11 pide 3:1 y --line se queda en 1.28:1.
 * El error se anuncia por aria-describedby y por role="alert", no solo por
 * el color del borde. Entra y sale sin llamar la atención (`aviso`).
 *
 * El desplegable es un `select` nativo: en móvil abre la rueda del sistema,
 * que es lo que la gente sabe usar, y no hay que reinventar el teclado ni
 * el lector de pantalla. Solo se le quita la flecha del navegador y se
 * dibuja una coherente con los iconos del sitio.
 */
export function Campo(props: PropsInput | PropsTextarea | PropsSelect) {
  const { id, etiqueta, error, ayuda } = props;

  const idError = `${id}-error`;
  const idAyuda = `${id}-ayuda`;
  const descrito = [error ? idError : null, ayuda ? idAyuda : null]
    .filter(Boolean)
    .join(" ");

  const clases = `${control} ${
    error ? "border-accent-deep" : "border-line-strong"
  }`;
  const comunes = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": descrito || undefined,
    className: clases,
  };

  let elemento: React.ReactNode;

  if (props.opciones) {
    const { opciones, vacio, ...resto } = props;
    const { etiqueta: _e, error: _r, ayuda: _a, id: _i, ...selectProps } = resto;
    void _e;
    void _r;
    void _a;
    void _i;
    elemento = (
      <span className="selector">
        <select {...comunes} {...(selectProps as ComponentProps<"select">)}>
          <option value="">{vacio}</option>
          {opciones.map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.rotulo}
            </option>
          ))}
        </select>
      </span>
    );
  } else if (props.multilinea) {
    const { multilinea: _m, etiqueta: _e, error: _r, ayuda: _a, id: _i, ...resto } = props;
    void _m;
    void _e;
    void _r;
    void _a;
    void _i;
    elemento = (
      <textarea {...comunes} rows={6} {...(resto as ComponentProps<"textarea">)} />
    );
  } else {
    const { multilinea: _m, etiqueta: _e, error: _r, ayuda: _a, id: _i, ...resto } = props;
    void _m;
    void _e;
    void _r;
    void _a;
    void _i;
    elemento = <input {...comunes} {...(resto as ComponentProps<"input">)} />;
  }

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

      <div className="mt-3">{elemento}</div>

      {/* Entra con su propio gesto y se va sin ceremonia: un error
          desaparece porque el visitante acaba de corregirlo, y animar esa
          salida solo retrasaría la confirmación de que ya está bien. */}
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
