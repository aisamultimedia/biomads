import Link from "next/link";
import type { Route } from "next";
import type { ComponentProps, ReactNode } from "react";

const base = [
  "enlace-subrayado",
  "transition-colors duration-[var(--duracion-micro)] ease-base",
  "hover:text-accent-deep",
].join(" ");

/* Con flecha, el subrayado va en un span interior para que no pase bajo la
   flecha; el hover lo gobierna `.enlace-flecha` en globals.css. */
const baseFlecha = [
  "enlace-flecha",
  "transition-colors duration-[var(--duracion-micro)] ease-base",
  "hover:text-accent-deep",
].join(" ");

type PropsComunes = {
  children: ReactNode;
  /** Añade una flecha que se desplaza al pasar el cursor. Para "ver más". */
  flecha?: boolean;
  className?: string;
};

type PropsInterno = PropsComunes &
  Omit<ComponentProps<typeof Link>, keyof PropsComunes | "href"> & {
    href: Route;
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
 * Enlace de texto. El subrayado crece desde la izquierda al pasar el cursor
 * o al recibir foco (ver `.enlace-subrayado` en globals.css).
 */
export function Enlace(props: PropsInterno | PropsExterno) {
  const { children, className = "", externo, flecha = false, href, ...atributos } = props;
  const clases = `${flecha ? baseFlecha : base} ${className}`;

  const contenido = flecha ? (
    <>
      <span className="enlace-subrayado">{children}</span>
      <span aria-hidden="true" className="flecha">
        →
      </span>
    </>
  ) : (
    children
  );

  if (externo) {
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

  return (
    <Link
      href={href as Route}
      className={clases}
      {...(atributos as Omit<ComponentProps<typeof Link>, "href">)}
    >
      {contenido}
    </Link>
  );
}
