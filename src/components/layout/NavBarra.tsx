"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useSeccionActiva } from "@/hooks/useSeccionActiva";
import type { Diccionario } from "@/idioma";
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
 * Tres anclas y nada más. El indicador de sección activa es **un solo
 * elemento** que se desliza de un ítem al siguiente en vez de aparecer de
 * golpe; antes lo hacía el `layoutId` de motion, que obligaba a cargar
 * `domMax` —el paquete con proyección de layout y arrastre— por este único
 * gesto. Ahora se resuelve midiendo el ítem activo y moviendo el indicador
 * con `translate` y `scaleX`: solo transform, nada que dispare layout.
 *
 * Cuál está activa lo decide el scroll, no la ruta: en una página única la
 * ruta siempre es la misma.
 */
export function NavBarra({ textos }: { textos: Diccionario["nav"]["secciones"] }) {
  const seccionActiva = useSeccionActiva();
  const listaRef = useRef<HTMLUListElement>(null);
  const [indicador, setIndicador] = useState<{ x: number; ancho: number } | null>(null);

  useEffect(() => {
    const lista = listaRef.current;
    if (!lista) return;

    const medir = () => {
      const activo = lista.querySelector<HTMLElement>("[aria-current]");
      if (!activo) {
        setIndicador(null);
        return;
      }
      setIndicador({ x: activo.offsetLeft, ancho: activo.offsetWidth });
    };

    medir();

    /* La barra se compacta al bajar y las anchuras cambian con el idioma,
       así que la medida no vale para siempre. */
    const observador = new ResizeObserver(medir);
    observador.observe(lista);
    return () => observador.disconnect();
  }, [seccionActiva]);

  return (
    <ul ref={listaRef} className="relative flex items-center gap-8">
      {items.map((item) => {
        const activo = seccionActiva === item.href;
        return (
          <li key={item.href}>
            {/* Ancla de la misma página: <a> y no <Link>, para no perder el
                desplazamiento suave en una navegación que no cambia de
                página. */}
            <a
              href={item.href}
              aria-current={activo ? "true" : undefined}
              /* El color lo pone el tema de la barra, no una clase fija. */
              className={[enlaceBase, activo ? "es-activo" : subrayadoHover].join(" ")}
            >
              {textos[item.clave]}
            </a>
          </li>
        );
      })}

      {indicador && (
        <span
          aria-hidden="true"
          className="indicador-nav"
          style={
            {
              "--x": `${indicador.x}px`,
              /* Sin unidad: `scale` toma un número, y con "88px" la
                 declaración entera es inválida y el indicador se queda de
                 1px sin que nada avise. */
              "--ancho": indicador.ancho,
            } as CSSProperties
          }
        />
      )}
    </ul>
  );
}
