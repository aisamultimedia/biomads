"use client";

import type { ComponentProps } from "react";

type Base = {
  id: string;
  etiqueta: string;
  /** Mensaje de error. Si viene, el campo se marca como inválido. */
  error?: string;
  /** Ayuda breve bajo el campo. */
  ayuda?: string;
  /** Tocado y sin error: enseña la marca de válido. */
  valido?: boolean;
};

type PropsInput = Base & { multilinea?: false; opciones?: undefined } & Omit<
    ComponentProps<"input">,
    "id" | "className" | "placeholder"
  >;

type PropsTextarea = Base & { multilinea: true; opciones?: undefined } & Omit<
    ComponentProps<"textarea">,
    "id" | "className" | "placeholder"
  >;

type PropsSelect = Base & {
  multilinea?: false;
  opciones: readonly { valor: string; rotulo: string }[];
  /** Primera opción, sin valor: lo que se lee antes de elegir. */
  vacio: string;
} & Omit<ComponentProps<"select">, "id" | "className" | "children">;

/**
 * Campo de formulario con etiqueta flotante, ayuda, marca de válido y error.
 * Cubre entrada de una línea, área de texto y desplegable.
 *
 * **La etiqueta flota.** En reposo está dentro del campo, donde iría el
 * texto; al enfocar o al escribir sube y se encoge. Es la misma `<label>`
 * de siempre, asociada por `htmlFor`: solo cambia de sitio con transform,
 * así que el lector de pantalla y el clic en ella funcionan igual. El
 * `placeholder=" "` no es un descuido: `:placeholder-shown` es lo que
 * permite saber por CSS si el campo está vacío, sin JavaScript.
 *
 * **Foco.** Un subrayado de acento crece desde el centro y el borde toma
 * el acento: dos señales, ninguna depende del anillo del sistema.
 *
 * **Válido.** Cuando el campo ya se tocó y no tiene error, aparece una
 * marca a la derecha. Confirma sin interrumpir: el visitante sabe que ese
 * ya está antes de llegar al botón.
 *
 * El borde en reposo usa --line-strong (3.12:1) porque es un borde con
 * significado: WCAG 1.4.11 pide 3:1 y --line se queda en 1.28:1. El error
 * se anuncia por aria-describedby y por role="alert", no solo por el color.
 *
 * El desplegable es un `select` nativo: en móvil abre la rueda del sistema
 * y con teclado se recorre con flechas. Su etiqueta va siempre arriba, ya
 * que el `select` no tiene estado «vacío» que el CSS pueda leer.
 */
export function Campo(props: PropsInput | PropsTextarea | PropsSelect) {
  const { id, etiqueta, error, ayuda, valido = false } = props;

  const idError = `${id}-error`;
  const idAyuda = `${id}-ayuda`;
  const descrito = [error ? idError : null, ayuda ? idAyuda : null]
    .filter(Boolean)
    .join(" ");

  const comunes = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": descrito || undefined,
    className: "campo-entrada",
  };

  let elemento: React.ReactNode;
  let tipo: "entrada" | "texto" | "seleccion";

  if (props.opciones) {
    tipo = "seleccion";
    const { opciones, vacio, ...resto } = props;
    const { etiqueta: _e, error: _r, ayuda: _a, id: _i, valido: _v, ...selectProps } = resto;
    void _e;
    void _r;
    void _a;
    void _i;
    void _v;
    elemento = (
      <select {...comunes} {...(selectProps as ComponentProps<"select">)}>
        <option value="">{vacio}</option>
        {opciones.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.rotulo}
          </option>
        ))}
      </select>
    );
  } else if (props.multilinea) {
    tipo = "texto";
    const { multilinea: _m, etiqueta: _e, error: _r, ayuda: _a, id: _i, valido: _v, ...resto } = props;
    void _m;
    void _e;
    void _r;
    void _a;
    void _i;
    void _v;
    elemento = (
      <textarea
        {...comunes}
        rows={5}
        placeholder=" "
        {...(resto as ComponentProps<"textarea">)}
      />
    );
  } else {
    tipo = "entrada";
    const { multilinea: _m, etiqueta: _e, error: _r, ayuda: _a, id: _i, valido: _v, ...resto } = props;
    void _m;
    void _e;
    void _r;
    void _a;
    void _i;
    void _v;
    elemento = <input {...comunes} placeholder=" " {...(resto as ComponentProps<"input">)} />;
  }

  return (
    <div
      className="campo"
      data-tipo={tipo}
      data-error={error ? "" : undefined}
      data-valido={valido && !error ? "" : undefined}
    >
      <div className="campo-control">
        {elemento}
        <label htmlFor={id} className="campo-etiqueta">
          {etiqueta}
        </label>
        <span className="campo-marca" aria-hidden="true" />
      </div>

      {ayuda && (
        <p id={idAyuda} className="campo-ayuda">
          {ayuda}
        </p>
      )}

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
