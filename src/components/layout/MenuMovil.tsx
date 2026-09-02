"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Nav } from "./Nav";
import { usePresencia } from "@/hooks/usePresencia";
import { diccionario, type Idioma } from "@/idioma";
import { empresa, mailto, navegacion, whatsapp } from "@/lib/site";

type Props = {
  abierto: boolean;
  onCerrar: () => void;
  idioma: Idioma;
};

/**
 * Menú móvil a pantalla completa.
 *
 * Bloquea el desplazamiento del fondo, cierra con Escape, atrapa el foco
 * dentro del panel y lleva su propio botón de cierre: el conmutador de la
 * cabecera queda debajo del panel, así que no serviría ni con el cursor ni
 * con el teclado.
 */
export function MenuMovil({ abierto, onCerrar, idioma }: Props) {
  const t = diccionario(idioma);
  const panelRef = useRef<HTMLDivElement>(null);
  const { montado, estado, ref: presenciaRef } = usePresencia(abierto);

  /* Dos referencias sobre el mismo nodo: la del foco y la que usa
     usePresencia para escuchar el final de la transición de salida. */
  const fijarPanel = (nodo: HTMLDivElement | null) => {
    panelRef.current = nodo;
    presenciaRef.current = nodo;
  };

  useEffect(() => {
    if (!abierto) return;

    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panelRef.current?.focus();

    function alPresionar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        onCerrar();
        return;
      }
      if (evento.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const enfocables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (enfocables.length === 0) return;

      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];

      if (evento.shiftKey && document.activeElement === primero) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
      }
    }

    document.addEventListener("keydown", alPresionar);
    return () => {
      document.removeEventListener("keydown", alPresionar);
      document.body.style.overflow = previo;
    };
  }, [abierto, onCerrar]);

  if (!montado) return null;

  return (
    <div
      ref={fijarPanel}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.menuNavegacion}
      data-estado={estado}
      // Mismo corte que el botón que lo abre (lg): en tablet también
      // hace falta.
      className="menu-movil fixed inset-0 z-50 flex flex-col bg-paper px-6 pb-12 pt-24 lg:hidden"
    >
          <button
            type="button"
            onClick={onCerrar}
            className="absolute right-6 top-6 inline-flex h-[var(--area-tactil)] w-[var(--area-tactil)] items-center justify-center"
          >
            <span className="sr-only">{t.nav.cerrarMenu}</span>
            <span aria-hidden="true" className="icono-menu es-cerrar">
              <span />
              <span />
            </span>
          </button>

          <nav aria-label={t.nav.principal}>
            <Nav
              textos={t.nav.secciones}
              items={navegacion}
              orientacion="vertical"
              tamano="grande"
              animado
              onNavegar={onCerrar}
            />
          </nav>

      <div
        data-entrada="texto"
        style={{ "--indice": navegacion.length + 1 } as CSSProperties}
        className="con-regla mt-auto pt-8"
      >
            <p className="etiqueta text-ink-muted">{t.contacto.directoRotulo}</p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dato flex min-h-[var(--area-tactil)] items-center text-lg text-ink"
                >
                  {empresa.telefono}
                  <span className="sr-only"> — {t.contacto.formulario.escribirWhatsapp}</span>
                </a>
              </li>
              <li>
                <a
                  href={mailto}
                  className="flex min-h-[var(--area-tactil)] items-center text-lg text-ink"
                >
                  {empresa.correo}
                </a>
              </li>
            </ul>
      </div>
    </div>
  );
}
