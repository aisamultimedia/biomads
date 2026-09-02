"use client";

import type { CSSProperties } from "react";
import { useSeccionActiva } from "@/hooks/useSeccionActiva";
import type { Diccionario } from "@/idioma";
import { navegacion, type ItemNav } from "@/lib/site";

type Props = {
  /** Rótulos de sección. Es componente de cliente: el texto llega por props. */
  textos: Diccionario["nav"]["secciones"];
  /** Ítems a mostrar. Por defecto los cuatro de la navegación. */
  items?: readonly ItemNav[];
  orientacion?: "horizontal" | "vertical";
  /** Tamaño de los rótulos. `grande` es para el menú a pantalla completa. */
  tamano?: "normal" | "grande";
  /** Sobre superficie oscura. */
  invertido?: boolean;
  /**
   * Cada ítem es un hijo animable: hereda las variantes del padre (el menú
   * móvil) y entra en su turno del escalonado.
   */
  animado?: boolean;
  /** Cierra el menú móvil al navegar. */
  onNavegar?: () => void;
};

export function Nav({
  textos,
  items = navegacion,
  orientacion = "horizontal",
  tamano = "normal",
  invertido = false,
  animado = false,
  onNavegar,
}: Props) {
  const seccionActiva = useSeccionActiva();
  const vertical = orientacion === "vertical";

  const colorActivo = invertido ? "text-ink-invert" : "text-ink";
  const colorReposo = invertido
    ? "text-ink-invert-muted hover:text-ink-invert"
    : "text-ink-muted hover:text-ink";

  return (
    <ul className={vertical ? "flex flex-col" : "flex items-center gap-8"}>
      {items.map((item, indice) => {
        const activo = seccionActiva === item.href;
        /* Ancla de la misma página: <a> y no <Link>. El enrutador trataría
           esto como una navegación que no cambia de página y se perdería el
           desplazamiento suave. */
        const contenido = (
          <>
            <a
              href={item.href}
              onClick={onNavegar}
              aria-current={activo ? "true" : undefined}
              className={[
                "relative inline-flex items-center",
                "min-h-[var(--area-tactil)]",
                tamano === "grande" ? "font-titulo text-2xl" : "text-sm",
                "transition-colors duration-[var(--duracion-micro)] ease-base",
                activo ? colorActivo : colorReposo,
                // Marca del ítem activo: una barra de acento que crece desde
                // la izquierda. Nunca un relleno de color.
                "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:bg-accent",
                "after:origin-left after:transition-transform",
                "after:duration-[var(--duracion-micro)] after:ease-base",
                activo ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
              ].join(" ")}
            >
              {textos[item.clave]}
            </a>
          </>
        );

        /* En el menú móvil los ítems entran escalonados; el retraso lo
           calcula el CSS desde --indice, igual que en los revelados. */
        return animado ? (
          <li
            key={item.href}
            data-entrada="texto"
            style={{ "--indice": indice + 1 } as CSSProperties}
          >
            {contenido}
          </li>
        ) : (
          <li key={item.href}>{contenido}</li>
        );
      })}
    </ul>
  );
}
