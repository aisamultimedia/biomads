"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "motion/react";
import { texto } from "@/lib/motion";
import { navegacion, type ItemNav } from "@/lib/site";

type Props = {
  /** Ítems a mostrar. Por defecto los cinco de la navegación. */
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

/** ¿La ruta actual corresponde a este ítem? */
function esActivo(ruta: string, href: string) {
  return href === "/" ? ruta === "/" : ruta === href || ruta.startsWith(`${href}/`);
}

export function Nav({
  items = navegacion,
  orientacion = "horizontal",
  tamano = "normal",
  invertido = false,
  animado = false,
  onNavegar,
}: Props) {
  const ruta = usePathname();
  const vertical = orientacion === "vertical";

  const colorActivo = invertido ? "text-ink-invert" : "text-ink";
  const colorReposo = invertido
    ? "text-ink-invert-muted hover:text-ink-invert"
    : "text-ink-muted hover:text-ink";

  return (
    <ul className={vertical ? "flex flex-col" : "flex items-center gap-8"}>
      {items.map((item) => {
        const activo = esActivo(ruta, item.href);
        const contenido = (
          <>
            <Link
              href={item.href}
              onClick={onNavegar}
              aria-current={activo ? "page" : undefined}
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
              {item.rotulo}
            </Link>

            {vertical && tamano === "grande" && item.hijos && (
              <ul className="mb-4 ml-6 flex flex-col border-l border-line pl-6">
                {item.hijos.map((hijo) => (
                  <li key={hijo.href}>
                    <Link
                      href={hijo.href as typeof item.href}
                      onClick={onNavegar}
                      className="flex min-h-[var(--area-tactil)] items-center text-ink-muted transition-colors duration-[var(--duracion-micro)] ease-base hover:text-ink"
                    >
                      {hijo.rotulo}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        );

        return animado ? (
          <m.li key={item.href} variants={texto}>
            {contenido}
          </m.li>
        ) : (
          <li key={item.href}>{contenido}</li>
        );
      })}
    </ul>
  );
}
