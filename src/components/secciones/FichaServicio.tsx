"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Boton } from "@/components/ui/Boton";
import type { ServicioDetallado } from "@/content/servicios";
import type { Proyecto } from "@/content/proyectos";

type Props = {
  servicio: ServicioDetallado;
  /** Numeral de la tarjeta: 01, 02. */
  numero: string;
  /** Proyecto que lo respalda, para el bloque de método. */
  caso?: Proyecto;
};

/**
 * Tarjeta de servicio: título y resumen a la vista, ficha completa al
 * abrir.
 *
 * Toda la tarjeta es el botón —no un enlace pequeño al final—, y el pie
 * anuncia lo que hay dentro para que valga la pena abrirla: "marco
 * normativo, entregable y duración". Un "ver más" no dice nada.
 *
 * El panel es un diálogo de verdad: atrapa el foco, cierra con Escape y con
 * clic fuera, y devuelve el foco a la tarjeta que lo abrió.
 */
export function FichaServicio({ servicio, numero, caso }: Props) {
  const [abierto, setAbierto] = useState(false);
  const idPanel = useId();
  const disparadorRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;

    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    function alPresionar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        cerrar();
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
  }, [abierto]);

  function cerrar() {
    setAbierto(false);
    disparadorRef.current?.focus();
  }

  const bloques = [
    { rotulo: "Cuándo se necesita", texto: servicio.cuandoSeNecesita },
    { rotulo: "Marco normativo", texto: servicio.marco },
    { rotulo: "Entregable", texto: servicio.entregable },
    { rotulo: "Duración típica", texto: servicio.duracion },
  ];

  return (
    <>
      <button
        ref={disparadorRef}
        type="button"
        onClick={() => setAbierto(true)}
        aria-expanded={abierto}
        aria-controls={idPanel}
        className="tarjeta-servicio"
      >
        <span className="dato text-sm text-accent-deep">{numero}</span>

        <span className="mt-6 block font-titulo text-xl text-ink md:text-2xl">
          {servicio.titulo}
        </span>

        <span className="medida mt-4 block text-ink-muted">{servicio.resumen}</span>

        <span className="tarjeta-servicio-pie">
          <span className="etiqueta text-accent-deep">
            Marco normativo, entregable y duración
          </span>
          <span aria-hidden="true" className="tarjeta-servicio-mas">
            +
          </span>
        </span>
      </button>

      {abierto && (
        <div className="velo-panel" onClick={cerrar}>
          <div
            id={idPanel}
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={servicio.titulo}
            className="panel-servicio"
            onClick={(evento) => evento.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="dato text-sm text-accent-deep">{numero}</p>
                <h3 className="mt-4 font-titulo text-2xl text-ink md:text-3xl">
                  {servicio.titulo}
                </h3>
              </div>
              <button type="button" onClick={cerrar} className="panel-servicio-cerrar">
                <span className="sr-only">Cerrar</span>
                <span aria-hidden="true" className="icono-menu es-cerrar">
                  <span />
                  <span />
                </span>
              </button>
            </div>

            <p className="medida mt-8 text-lg text-ink">{servicio.elVacio}</p>

            <dl className="mt-12 grid gap-8 md:grid-cols-2">
              {bloques.map((bloque) => (
                <div key={bloque.rotulo} className="border-t border-line pt-4">
                  <dt className="etiqueta text-ink-muted">{bloque.rotulo}</dt>
                  <dd className="mt-2 text-sm text-ink">{bloque.texto}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 border-t border-line pt-6">
              <p className="etiqueta text-ink-muted">Método aplicado en campo</p>
              <p className="medida mt-3 text-sm text-ink">{servicio.metodologia}</p>
              <p className="dato mt-3 text-xs text-ink-muted">
                {servicio.metodologiaFuente}
              </p>
            </div>

            {caso && (
              <p className="mt-8 text-sm text-ink-muted">
                Última ejecución: <span className="dato">{caso.duracion}</span> en{" "}
                {caso.ubicacion}.
              </p>
            )}

            <div className="mt-12 flex flex-wrap gap-4">
              <Boton href="#contacto" variante="acento">
                Cuéntenos su proyecto
              </Boton>
              <Boton href={`/servicios/${servicio.slug}`} variante="secundario">
                Ver la página completa
              </Boton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
