"use client";

import { AnimatePresence, m, type Variants } from "motion/react";
import { useEffect, useRef } from "react";
import { Nav } from "./Nav";
import { CURVA_ENTRADA, CURVA_SALIDA, DURACION, texto } from "@/lib/motion";
import { empresa, mailto, navegacion, whatsapp } from "@/lib/site";

type Props = {
  abierto: boolean;
  onCerrar: () => void;
};

/**
 * El velo entra en 250ms y va soltando a sus hijos —los ítems de navegación
 * y el bloque de contacto— cada 50ms. Al cerrar, todo se va a la vez en
 * 200ms: cerrar un menú debe ser inmediato.
 */
const velo: Variants = {
  oculto: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURACION.corta,
      ease: CURVA_ENTRADA,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  salida: {
    opacity: 0,
    transition: { duration: 0.2, ease: CURVA_SALIDA },
  },
};

/**
 * Menú móvil a pantalla completa.
 *
 * Bloquea el desplazamiento del fondo, cierra con Escape, atrapa el foco
 * dentro del panel y lleva su propio botón de cierre: el conmutador de la
 * cabecera queda debajo del panel, así que no serviría ni con el cursor ni
 * con el teclado.
 */
export function MenuMovil({ abierto, onCerrar }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

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

  return (
    <AnimatePresence>
      {abierto && (
        <m.div
          key="menu"
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          variants={velo}
          initial="oculto"
          animate="visible"
          exit="salida"
          // Mismo corte que el botón que lo abre (lg): en tablet también
          // hace falta.
          className="fixed inset-0 z-50 flex flex-col bg-paper px-6 pb-12 pt-24 lg:hidden"
        >
          <button
            type="button"
            onClick={onCerrar}
            className="absolute right-6 top-6 inline-flex h-[var(--area-tactil)] w-[var(--area-tactil)] items-center justify-center"
          >
            <span className="sr-only">Cerrar menú</span>
            <span aria-hidden="true" className="icono-menu es-cerrar">
              <span />
              <span />
            </span>
          </button>

          <nav aria-label="Principal">
            <Nav
              items={navegacion}
              orientacion="vertical"
              tamano="grande"
              animado
              onNavegar={onCerrar}
            />
          </nav>

          <m.div variants={texto} className="con-regla mt-auto pt-8">
            <p className="etiqueta text-ink-muted">Contacto directo</p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dato flex min-h-[var(--area-tactil)] items-center text-lg text-ink"
                >
                  {empresa.telefono}
                  <span className="sr-only"> — escribir por WhatsApp</span>
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
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
