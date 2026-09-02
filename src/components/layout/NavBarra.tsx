"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Route } from "next";
import { RESORTE, desplegable } from "@/lib/motion";
import { navegacion, type ItemNav } from "@/lib/site";

/** Contacto sale del menú: vive como botón siempre visible en la barra. */
const items = navegacion.filter((item) => item.href !== "/contacto");

function esActivo(ruta: string, href: string) {
  return href === "/" ? ruta === "/" : ruta === href || ruta.startsWith(`${href}/`);
}

const enlaceBase = [
  "enlace-barra relative inline-flex items-center gap-2",
  "min-h-[var(--area-tactil)] text-sm",
  "transition-colors duration-[var(--duracion-micro)] ease-base",
  "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:bg-accent",
  "after:origin-left after:transition-transform",
  "after:duration-[var(--duracion-micro)] after:ease-base",
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
 * Los ítems con páginas hijas despliegan un panel. Se abre al pasar el
 * cursor y también al entrar con el teclado, así que tabular por la barra
 * recorre los hijos sin necesidad de activar nada. Escape lo cierra.
 *
 * El indicador de página activa es un solo elemento con `layoutId`: al
 * navegar se desliza de un ítem al siguiente en vez de aparecer de golpe.
 */
export function NavBarra() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState<string | null>(null);
  const contenedorRef = useRef<HTMLUListElement>(null);
  const cierreRef = useRef<number | undefined>(undefined);
  const idBase = useId();

  const cerrar = useCallback(() => setAbierto(null), []);

  /* Un respiro antes de cerrar: el cursor cruza el hueco entre el ítem y el
     panel sin que el menú se le escape. */
  const programarCierre = useCallback(() => {
    window.clearTimeout(cierreRef.current);
    cierreRef.current = window.setTimeout(cerrar, 180);
  }, [cerrar]);

  const cancelarCierre = useCallback(() => {
    window.clearTimeout(cierreRef.current);
  }, []);

  useEffect(() => {
    if (!abierto) return;
    function alPresionar(evento: KeyboardEvent) {
      if (evento.key === "Escape") cerrar();
    }
    document.addEventListener("keydown", alPresionar);
    return () => document.removeEventListener("keydown", alPresionar);
  }, [abierto, cerrar]);

  /* Si el foco sale del grupo entero, el panel se cierra. */
  function alSalirFoco(evento: React.FocusEvent<HTMLUListElement>) {
    if (!contenedorRef.current?.contains(evento.relatedTarget as Node)) cerrar();
  }

  return (
    <ul
      ref={contenedorRef}
      className="flex items-center gap-8"
      onBlur={alSalirFoco}
      onMouseLeave={programarCierre}
      onMouseEnter={cancelarCierre}
    >
      {items.map((item) => (
        <ItemBarra
          key={item.href}
          item={item}
          activo={esActivo(ruta, item.href)}
          abierto={abierto === item.href}
          idPanel={`${idBase}-${item.rotulo}`}
          onCerrar={cerrar}
          onAbrir={() => {
            cancelarCierre();
            setAbierto(item.hijos ? item.href : null);
          }}
          onCerrarDiferido={programarCierre}
        />
      ))}
    </ul>
  );
}

function ItemBarra({
  item,
  activo,
  abierto,
  idPanel,
  onAbrir,
  onCerrar,
  onCerrarDiferido,
}: {
  item: ItemNav;
  activo: boolean;
  abierto: boolean;
  idPanel: string;
  onAbrir: () => void;
  onCerrar: () => void;
  onCerrarDiferido: () => void;
}) {
  const tieneHijos = Boolean(item.hijos?.length);

  return (
    <li
      className="relative"
      onMouseEnter={onAbrir}
      onMouseLeave={onCerrarDiferido}
      onFocus={onAbrir}
    >
      <Link
        href={item.href}
        onClick={onCerrar}
        aria-current={activo ? "page" : undefined}
        aria-expanded={tieneHijos ? abierto : undefined}
        aria-controls={tieneHijos ? idPanel : undefined}
        className={[
          enlaceBase,
          // El color lo pone el tema de la barra, no una clase fija: la
          // barra pasa de oscura a clara al dejar atrás el hero.
          activo ? "es-activo" : subrayadoHover,
        ].join(" ")}
      >
        {item.rotulo}
        {tieneHijos && (
          <svg
            aria-hidden="true"
            viewBox="0 0 10 6"
            className={[
              "h-[6px] w-[10px] flex-none",
              "transition-transform duration-[var(--duracion-micro)] ease-base",
              abierto ? "-scale-y-100" : "",
            ].join(" ")}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M1 1l4 4 4-4" />
          </svg>
        )}
        {activo && (
          <m.span
            layoutId="nav-activo"
            transition={RESORTE}
            aria-hidden="true"
            className="absolute inset-x-0 bottom-2 h-px bg-accent"
          />
        )}
      </Link>

      <AnimatePresence>
        {tieneHijos && abierto && (
          <m.div
            key="panel"
            id={idPanel}
            variants={desplegable}
            initial="oculto"
            animate="visible"
            exit="salida"
            className="panel-desplegable superficie-clara origin-top-left"
          >
            <ul className="flex flex-col">
              {item.hijos!.map((hijo) => (
                <li key={hijo.href}>
                  <Link
                    href={hijo.href as Route}
                    onClick={onCerrar}
                    className="block rounded-[var(--radius-md)] px-4 py-3 transition-colors duration-[var(--duracion-micro)] ease-base hover:bg-paper-alt"
                  >
                    <span className="block text-sm text-ink">{hijo.rotulo}</span>
                    {hijo.nota && (
                      <span className="mt-1 block text-xs text-ink-muted">{hijo.nota}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}
