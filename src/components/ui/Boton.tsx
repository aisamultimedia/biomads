import Link from "next/link";
import type { Route } from "next";
import type { ComponentProps, ReactNode } from "react";

type Variante = "primario" | "secundario" | "invertido" | "acento";

const base = [
  "inline-flex items-center justify-center gap-2",
  "min-h-[var(--area-tactil)] px-8 py-4",
  // Caja alta y baja, no versalitas: con la forma redonda las versalitas
  // apretadas se leen como una etiqueta de sistema, no como una acción.
  "font-cuerpo text-boton font-semibold",
  "rounded-[var(--radius-pill)] border",
  // Tailwind 4 mueve con las propiedades `translate` y `scale`, no con
  // `transform`: hay que nombrarlas para que el hover transicione de verdad.
  "transition-[translate,scale,color,background-color,border-color]",
  "duration-[var(--duracion-micro)] ease-base",
  "hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.98]",
  "disabled:pointer-events-none disabled:opacity-60",
].join(" ");

const variantes: Record<Variante, string> = {
  // Fondo oscuro, texto claro: 14.25:1. El acento entra por el borde,
  // nunca como relleno — --accent no pasa contraste sobre papel.
  primario: "bg-dark text-ink-invert border-dark hover:border-accent",
  // Contorno sobre papel. El texto queda en --ink, 11.41:1.
  secundario:
    "bg-transparent text-ink border-line-strong hover:border-accent-deep hover:text-accent-deep",
  // Para bloques con .superficie-oscura.
  invertido:
    "bg-transparent text-ink-invert border-line-invert hover:border-accent hover:text-accent",
  // Relleno de acento con texto oscuro: 5.73:1. Solo en piezas pequeñas
  // —el acento no se usa como fondo de bloques grandes—.
  acento: "bg-accent text-dark border-accent hover:bg-accent-deep hover:border-accent-deep hover:text-ink-invert",
};

type PropsComunes = {
  children: ReactNode;
  variante?: Variante;
  /** Muestra el estado de carga y bloquea la interacción. */
  cargando?: boolean;
  className?: string;
};

type PropsBoton = PropsComunes &
  Omit<ComponentProps<"button">, keyof PropsComunes> & {
    href?: undefined;
    externo?: false;
  };

type PropsEnlace = PropsComunes &
  Omit<ComponentProps<typeof Link>, keyof PropsComunes | "href"> & {
    /** Ruta del sitio, o un ancla: de esta página o de la portada. */
    href: Route | `#${string}` | `/#${string}`;
    externo?: false;
  };

type PropsExterno = PropsComunes &
  Omit<ComponentProps<"a">, keyof PropsComunes | "href"> & {
    href: string;
    /** Correo, WhatsApp o cualquier destino fuera del sitio. */
    externo: true;
  };

/** mailto: y tel: se abren en la misma pestaña. */
const MISMA_PESTANA = /^(mailto:|tel:)/;

/**
 * Botón del sitio. Cubre reposo, hover, foco, pulsación, cargando y
 * deshabilitado. Con `href` se renderiza como enlace —interno o externo— y
 * conserva la misma apariencia.
 */
export function Boton(props: PropsBoton | PropsEnlace | PropsExterno) {
  const {
    children,
    variante = "primario",
    cargando = false,
    className = "",
    externo,
    ...resto
  } = props;

  const clases = `${base} ${variantes[variante]} ${className}`;

  const contenido = (
    <>
      {cargando ? <span className="indicador-carga" aria-hidden="true" /> : null}
      <span>{children}</span>
    </>
  );

  if (externo) {
    const { href, ...atributos } = resto as Omit<PropsExterno, keyof PropsComunes | "externo">;
    const nuevaPestana = !MISMA_PESTANA.test(href);
    return (
      <a
        href={href}
        className={clases}
        target={nuevaPestana ? "_blank" : undefined}
        rel={nuevaPestana ? "noopener noreferrer" : undefined}
        {...(atributos as ComponentProps<"a">)}
      >
        {contenido}
      </a>
    );
  }

  /* Ninguna ancla pasa por el enrutador. La de esta página porque sería una
     navegación que no cambia de página y perdería el desplazamiento suave;
     la de la portada ("/#seccion", desde una ficha de detalle) porque el
     enrutador tipado no la reconoce como ruta. */
  if (typeof resto.href === "string" && resto.href.includes("#")) {
    const { href, ...atributos } = resto as { href: string } & ComponentProps<"a">;
    return (
      <a href={href} className={clases} {...atributos}>
        {contenido}
      </a>
    );
  }

  if (resto.href !== undefined) {
    const { href, ...atributos } = resto as Omit<PropsEnlace, keyof PropsComunes | "externo">;
    return (
      <Link href={href as Route} className={clases} {...atributos}>
        {contenido}
      </Link>
    );
  }

  const atributos = resto as Omit<PropsBoton, keyof PropsComunes | "href" | "externo">;

  return (
    <button
      type="button"
      {...atributos}
      className={clases}
      aria-busy={cargando || undefined}
      disabled={atributos.disabled || cargando}
    >
      {contenido}
    </button>
  );
}
