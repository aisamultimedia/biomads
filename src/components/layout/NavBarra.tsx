"use client";

import { m } from "motion/react";
import { useSeccionActiva } from "@/hooks/useSeccionActiva";
import { RESORTE } from "@/lib/motion";
import { navegacion } from "@/lib/site";

/** Contacto sale del menú: vive como botón siempre visible en la barra. */
const items = navegacion.filter((item) => item.href !== "#contacto");

const enlaceBase = [
  "enlace-barra relative inline-flex items-center",
  "min-h-[var(--area-tactil)] text-sm",
  "transition-colors duration-[var(--duracion-micro)] ease-base",
].join(" ");

/* Subrayado de hover para los ítems que no están activos: crece desde la
   izquierda. El activo lleva en su lugar el indicador compartido. */
const subrayadoHover = [
  "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:bg-accent",
  "after:origin-left after:scale-x-0 after:transition-transform",
  "after:duration-[var(--duracion-micro)] after:ease-base",
  "hover:after:scale-x-100",
].join(" ");

/**
 * Navegación de la barra flotante.
 *
 * Tres anclas y nada más. Antes dos de ellas abrían un panel con las fichas
 * de detalle; en un sitio de una sola página eso era un submenú cuyo único
 * propósito era sacar al visitante de ella, así que se quitó junto con los
 * temporizadores de cierre, la gestión de foco y el chevron.
 *
 * El indicador de sección activa es un solo elemento con `layoutId`: al
 * desplazarse se desliza de un ítem al siguiente en vez de aparecer de
 * golpe. Cuál está activa lo decide el scroll, no la ruta —en una página
 * única la ruta siempre es "/"—.
 */
export function NavBarra() {
  const seccionActiva = useSeccionActiva();

  return (
    <ul className="flex items-center gap-8">
      {items.map((item) => {
        const activo = seccionActiva === item.href;
        return (
          <li key={item.href} className="relative">
            {/* Ancla de la misma página: <a> y no <Link>, para no perder el
                desplazamiento suave en una navegación que no cambia de
                página. */}
            <a
              href={item.href}
              aria-current={activo ? "true" : undefined}
              /* El color lo pone el tema de la barra, no una clase fija. */
              className={[enlaceBase, activo ? "es-activo" : subrayadoHover].join(" ")}
            >
              {item.rotulo}
              {activo && (
                <m.span
                  layoutId="nav-activo"
                  transition={RESORTE}
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-2 h-px bg-accent"
                />
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
