"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { Boton } from "@/components/ui/Boton";
import { Logotipo } from "./Logotipo";
import { MenuMovil } from "./MenuMovil";
import { NavBarra } from "./NavBarra";
import { SelectorIdioma } from "./SelectorIdioma";
import { diccionario, type Idioma } from "@/idioma";

/** Desplazamiento a partir del cual la barra se compacta. */
const UMBRAL_COMPACTO = 80;

/** Alto de la banda que ocupa la barra: por debajo de eso ya pisa contenido. */
const UMBRAL_TEMA = 96;

function suscribirDesplazamiento(alCambiar: () => void) {
  window.addEventListener("scroll", alCambiar, { passive: true });
  return () => window.removeEventListener("scroll", alCambiar);
}

/**
 * ¿Hay que compactar la barra? Se lee del desplazamiento como estado
 * externo: sin efectos ni setState, y al recargar a media página nace ya
 * compacta en cuanto React hidrata.
 */
function useCompacto() {
  return useSyncExternalStore(
    suscribirDesplazamiento,
    () => window.scrollY > UMBRAL_COMPACTO,
    () => false,
  );
}

/**
 * ¿Qué tiene la barra debajo ahora mismo?
 *
 * Recorre las superficies oscuras declaradas —el hero y todo lo que lleve
 * `.superficie-oscura`, incluido el pie— y mira si alguna cruza la banda que
 * ocupa la barra. Así el tema sigue al fondo real y no a un umbral fijo: la
 * página alterna claro y oscuro, y la barra alterna con ella.
 *
 * El primer pintado lo resuelve el CSS con `:has(.hero-completo)`, sin
 * JavaScript, para que una página sin hero nazca clara y no parpadee.
 */
function useSobreOscuro() {
  return useSyncExternalStore(
    suscribirDesplazamiento,
    () => {
      const oscuras = document.querySelectorAll(".hero-completo, .superficie-oscura");
      for (const el of oscuras) {
        const caja = el.getBoundingClientRect();
        if (caja.top <= UMBRAL_TEMA && caja.bottom >= UMBRAL_TEMA) return true;
      }
      return false;
    },
    () => false,
  );
}

/**
 * Cabecera: una barra flotante oscura, con el logo al centro, la navegación
 * a la izquierda y el contacto a la derecha.
 *
 * La barra va en --dark, no en el verde del logo: el acento no se usa como
 * fondo de bloques grandes. Sobre --dark el texto alcanza 14.25:1 y el
 * anillo de foco conmuta a --accent por `.superficie-oscura`.
 *
 * Entra al cargar (y −12 → 0, por CSS) y queda anclada durante la
 * transición entre páginas: es el punto fijo que le dice al visitante que
 * lo que cambió fue el contenido, no la ventana.
 */
export function Header({ idioma }: { idioma: Idioma }) {
  const t = diccionario(idioma);
  const compacto = useCompacto();
  const sobreOscuro = useSobreOscuro();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const conmutadorRef = useRef<HTMLButtonElement>(null);

  const cerrarMenu = useCallback(() => {
    setMenuAbierto(false);
    conmutadorRef.current?.focus();
  }, []);

  return (
    <>
      <header
        data-compacto={compacto ? "" : undefined}
        data-tema-resuelto=""
        data-sobre-oscuro={sobreOscuro ? "" : undefined}
        className="cabecera"
      >
        <div className="mx-auto w-full max-w-ancho px-6">
          <div data-entrada="barra" className="barra">
            {/* Izquierda: navegación en escritorio, logo en móvil */}
            <div className="flex items-center">
              <nav aria-label={t.nav.principal} className="hidden lg:block">
                <NavBarra textos={t.nav.secciones} />
              </nav>
              {/* Mismo alto que el del centro a propósito: solo uno de los
                  dos se ve, pero con altos distintos el optimizador genera
                  dos URL y el navegador baja las dos. */}
              <div className="lg:hidden">
                <Logotipo idioma={idioma} alto={28} />
              </div>
            </div>

            {/* Centro: el logo, como en una marca de producto */}
            <div className="hidden justify-center lg:flex">
              <Logotipo idioma={idioma} alto={28} />
            </div>

            {/* Derecha: el paso siguiente, siempre visible */}
            <div className="flex items-center justify-end gap-4">
              <SelectorIdioma idioma={idioma} />

              <Boton href="#contacto" variante="acento" className="hidden sm:inline-flex">
                {t.nav.secciones.contacto}
              </Boton>

              <button
                ref={conmutadorRef}
                type="button"
                onClick={() => setMenuAbierto(true)}
                aria-expanded={menuAbierto}
                aria-controls="menu-movil"
                className="inline-flex h-[var(--area-tactil)] w-[var(--area-tactil)] items-center justify-center lg:hidden"
              >
                <span className="sr-only">{t.nav.abrirMenu}</span>
                <span aria-hidden="true" className="icono-menu">
                  <span />
                  <span />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div id="menu-movil">
        <MenuMovil abierto={menuAbierto} onCerrar={cerrarMenu} idioma={idioma} />
      </div>
    </>
  );
}
