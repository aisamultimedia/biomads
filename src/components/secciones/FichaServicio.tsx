"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Boton } from "@/components/ui/Boton";
import { Icono } from "@/components/ui/Icono";
import type { ServicioDetallado } from "@/content/servicios";
import type { Proyecto } from "@/content/proyectos";
import type { Diccionario } from "@/idioma";

type Props = {
  servicio: ServicioDetallado;
  /** Numeral de la tarjeta: 01, 02. */
  numero: string;
  /** Proyecto que lo respalda, para el bloque de método. */
  caso?: Proyecto;
  /** Es componente de cliente: el texto llega resuelto por props. */
  textos: Diccionario["servicios"];
  proyectos: Diccionario["proyectos"];
  unidades: Diccionario["unidades"];
  /** Prefijo de idioma para el enlace a la ficha completa. */
  idioma: string;
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
export function FichaServicio({
  servicio,
  numero,
  caso,
  textos,
  proyectos,
  unidades,
  idioma,
}: Props) {
  const ficha = textos.detallados[servicio.slug];
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
    { rotulo: textos.panel.cuandoSeNecesita, texto: ficha.cuandoSeNecesita },
    { rotulo: textos.panel.marco, texto: ficha.marco },
    { rotulo: textos.panel.entregable, texto: ficha.entregable },
    { rotulo: textos.panel.duracion, texto: ficha.duracion },
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
        {/* Numeral e icono en la misma línea: el numeral ordena las dos
            tarjetas y el icono dice de qué va antes de leer el título. */}
        <span className="flex items-center justify-between gap-4">
          <span className="dato text-sm text-accent-deep">{numero}</span>
          <Icono nombre={servicio.icono} tamano={28} className="text-accent-deep" />
        </span>

        <span className="mt-6 block font-titulo text-xl text-ink md:text-2xl">
          {ficha.titulo}
        </span>

        <span className="medida mt-4 block text-ink-muted">{ficha.resumen}</span>

        <span className="tarjeta-servicio-pie">
          <span className="etiqueta text-accent-deep">{textos.pieTarjeta}</span>
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
            aria-label={ficha.titulo}
            /* Lenis captura la rueda en todo el documento y la aplica a la
               página, bloqueada mientras el panel está abierto: sin este
               atributo el panel no se desplazaba con el ratón. */
            data-lenis-prevent=""
            className="panel-servicio"
            onClick={(evento) => evento.stopPropagation()}
          >
            {/* Cabecera fija: el título y el botón de cerrar no se van con
                el desplazamiento del cuerpo. */}
            <div className="panel-servicio-cabecera">
              <div>
                <p className="dato text-sm text-accent-deep">{numero}</p>
                <h3 className="mt-4 font-titulo text-2xl text-ink md:text-3xl">
                  {ficha.titulo}
                </h3>
              </div>
              <button type="button" onClick={cerrar} className="panel-servicio-cerrar">
                <span className="sr-only">{textos.panel.cerrar}</span>
                <span aria-hidden="true" className="icono-menu es-cerrar">
                  <span />
                  <span />
                </span>
              </button>
            </div>

            <div className="panel-servicio-cuerpo">
              <p className="medida text-lg text-ink">{ficha.elVacio}</p>

              <dl className="mt-12 grid gap-8 md:grid-cols-2">
                {bloques.map((bloque) => (
                  <div key={bloque.rotulo} className="border-t border-line pt-4">
                    <dt className="etiqueta text-ink-muted">{bloque.rotulo}</dt>
                    <dd className="medida mt-2 text-sm text-ink">{bloque.texto}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-12 border-t border-line pt-6">
                <p className="etiqueta text-ink-muted">{textos.panel.metodo}</p>
                <p className="medida mt-3 text-sm text-ink">{ficha.metodologia}</p>
                <p className="dato mt-3 text-xs text-ink-muted">
                  {ficha.metodologiaFuente}
                </p>
              </div>

              {caso && (
                <p className="mt-8 text-sm text-ink-muted">
                  {textos.panel.ultimaEjecucion}:{" "}
                  <span className="dato">
                    {caso.duracionMeses} {unidades.meses}
                  </span>{" "}
                  — {proyectos.casos[caso.slug].ubicacion}.
                </p>
              )}

              <div className="mt-12 flex flex-wrap gap-4">
                <Boton href="#contacto" variante="acento">
                  {textos.panel.cta}
                </Boton>
                <Boton href={`/${idioma}/servicios/${servicio.slug}`} variante="secundario">
                  {textos.panel.paginaCompleta}
                </Boton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
