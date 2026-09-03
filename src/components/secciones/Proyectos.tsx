"use client";

import Image from "next/image";
import { flushSync } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Boton } from "@/components/ui/Boton";
import { usePresencia } from "@/hooks/usePresencia";
import { proyectos, type Proyecto } from "@/content/proyectos";
import { interpolar, type ClaveProyecto, type Diccionario, type Idioma } from "@/idioma";

type Props = {
  idioma: Idioma;
  /** Es componente de cliente: el texto llega resuelto por props. */
  textos: Diccionario["proyectos"];
  unidades: Diccionario["unidades"];
  fotos: Diccionario["fotos"];
};

/**
 * Proyectos: tarjeta escaneable, ficha completa en la misma página.
 *
 * Antes cada proyecto era un bloque de texto plano, todos iguales y sin
 * imagen: no se podían comparar de un vistazo. Ahora la tarjeta lleva lo
 * que sirve para comparar —cliente, servicio, dónde, cuándo y cuánto duró—
 * y el detalle se abre encima sin sacar a nadie de la página.
 *
 * **La transición.** Donde el navegador tiene View Transitions, la imagen de
 * la tarjeta se transforma en la del panel: es un solo elemento que crece,
 * no dos que se cruzan. Donde no —hoy Firefox—, el panel entra con su propia
 * animación y el resultado sigue siendo correcto. El nombre de transición
 * se pone solo en el elemento que participa: si dos lo llevan a la vez el
 * navegador aborta la transición sin decir nada.
 *
 * El panel es un diálogo de verdad: atrapa el foco, bloquea el fondo, cierra
 * con Escape y con clic fuera, y devuelve el foco a la tarjeta que lo abrió.
 */

/** Nombre compartido entre la imagen de la tarjeta y la del panel. */
const NOMBRE_TRANSICION = "proyecto-imagen";

export function Proyectos({ idioma, textos, unidades, fotos }: Props) {
  const [abierto, setAbierto] = useState<ClaveProyecto | null>(null);
  /* La tarjeta que va a participar en la transición. Se marca un render
     antes de abrir para que el navegador tenga de dónde partir. */
  const [enTransicion, setEnTransicion] = useState<ClaveProyecto | null>(null);
  const disparadores = useRef(new Map<ClaveProyecto, HTMLButtonElement>());

  const { montado, estado, ref: panelRef } = usePresencia(abierto !== null);
  const proyecto = proyectos.find((p) => p.slug === abierto);

  const conTransicion = (cambio: () => void) => {
    /* `flushSync` dentro del callback: View Transitions necesita que el DOM
       ya esté actualizado cuando la función retorna, y React agrupa por
       defecto. */
    if (!document.startViewTransition) {
      cambio();
      return;
    }
    document.startViewTransition(() => flushSync(cambio));
  };

  const abrir = (slug: ClaveProyecto) => {
    flushSync(() => setEnTransicion(slug));
    conTransicion(() => setAbierto(slug));
  };

  const cerrar = useCallback(() => {
    const slug = abierto;
    if (!slug) return;
    if (!document.startViewTransition) {
      setAbierto(null);
      setEnTransicion(null);
      disparadores.current.get(slug)?.focus();
      return;
    }
    const transicion = document.startViewTransition(() => flushSync(() => setAbierto(null)));
    void transicion.finished.then(() => {
      setEnTransicion(null);
      disparadores.current.get(slug)?.focus();
    });
  }, [abierto]);

  /* Escape, bloqueo del fondo y foco dentro del panel. */
  useEffect(() => {
    if (!montado || !abierto) return;

    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    /* Un diálogo modal tiene que recibir el foco al abrirse: si no, quien
       navega con teclado se queda en la tarjeta que está detrás del velo. */
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
  }, [montado, abierto, cerrar, panelRef]);

  return (
    <>
      <ul className="grid gap-6 md:grid-cols-2">
        {proyectos.map((p) => (
          <li key={p.slug} className={p.destacado ? "md:col-span-2" : undefined}>
            <TarjetaProyecto
              proyecto={p}
              textos={textos}
              unidades={unidades}
              fotos={fotos}
              /* Solo la lleva mientras el panel no está: dos elementos con
                 el mismo nombre abortan la transición. */
              conNombre={enTransicion === p.slug && abierto === null}
              alAbrir={() => abrir(p.slug)}
              refDisparador={(nodo) => {
                if (nodo) disparadores.current.set(p.slug, nodo);
                else disparadores.current.delete(p.slug);
              }}
            />
          </li>
        ))}
      </ul>

      {montado && proyecto ? (
        <div className="velo-panel" data-estado={estado} onClick={cerrar}>
          <div
            ref={(nodo) => {
              panelRef.current = nodo;
            }}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={textos.casos[proyecto.slug].clienteCorto}
            /* Lenis captura la rueda en todo el documento y la aplica a la
               página, bloqueada mientras el panel está abierto: sin este
               atributo el panel no se desplazaba con el ratón. */
            data-lenis-prevent=""
            className="panel-proyecto"
            onClick={(evento) => evento.stopPropagation()}
          >
            <FichaProyecto
              proyecto={proyecto}
              idioma={idioma}
              textos={textos}
              unidades={unidades}
              fotos={fotos}
              onCerrar={cerrar}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Tarjeta                                                             */
/* ------------------------------------------------------------------ */

function TarjetaProyecto({
  proyecto,
  textos,
  unidades,
  fotos,
  conNombre,
  alAbrir,
  refDisparador,
}: {
  proyecto: Proyecto;
  textos: Diccionario["proyectos"];
  unidades: Diccionario["unidades"];
  fotos: Diccionario["fotos"];
  conNombre: boolean;
  alAbrir: () => void;
  refDisparador: (nodo: HTMLButtonElement | null) => void;
}) {
  const caso = textos.casos[proyecto.slug];

  return (
    <button
      ref={refDisparador}
      type="button"
      onClick={alAbrir}
      className="tarjeta-proyecto"
      aria-label={interpolar(textos.abrirFicha, { cliente: caso.clienteCorto })}
    >
      <span
        className="tarjeta-proyecto-marco"
        style={conNombre ? { viewTransitionName: NOMBRE_TRANSICION } : undefined}
      >
        <Image
          src={proyecto.imagen}
          alt={fotos[proyecto.claveFoto]}
          sizes="(min-width: 768px) 45vw, 92vw"
          placeholder="blur"
          className="tarjeta-proyecto-imagen"
        />
      </span>

      <span className="tarjeta-proyecto-cuerpo">
        <span className="tarjeta-proyecto-tag">{caso.servicioRotulo}</span>

        <span className="mt-4 block font-titulo text-xl text-ink md:text-2xl">
          {caso.clienteCorto}
        </span>

        <span className="mt-2 block text-sm text-ink-muted">{caso.ubicacion}</span>

        <span className="tarjeta-proyecto-pie">
          <span className="dato text-sm text-ink-muted">
            {proyecto.anio} · {proyecto.duracionMeses} {unidades.meses}
          </span>
          <span aria-hidden="true" className="tarjeta-servicio-mas">
            +
          </span>
        </span>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Ficha completa, dentro del panel                                    */
/* ------------------------------------------------------------------ */

function FichaProyecto({
  proyecto,
  idioma,
  textos,
  unidades,
  fotos,
  onCerrar,
}: {
  proyecto: Proyecto;
  idioma: Idioma;
  textos: Diccionario["proyectos"];
  unidades: Diccionario["unidades"];
  fotos: Diccionario["fotos"];
  onCerrar: () => void;
}) {
  const caso = textos.casos[proyecto.slug];
  const d = textos.detalle;

  const datos = [
    { rotulo: textos.ficha.anio, valor: String(proyecto.anio), mono: true },
    {
      rotulo: textos.ficha.duracion,
      valor: `${proyecto.duracionMeses} ${unidades.meses}`,
      mono: true,
    },
    { rotulo: textos.ficha.ubicacion, valor: caso.ubicacion },
    { rotulo: textos.ficha.servicio, valor: caso.servicioRotulo },
  ];

  return (
    <>
      <div className="panel-proyecto-cabecera">
        <div>
          <p className="etiqueta text-accent-deep">{caso.servicioRotulo}</p>
          <h3 className="mt-3 font-titulo text-2xl text-ink md:text-3xl">
            {caso.clienteCorto}
          </h3>
        </div>
        <button type="button" onClick={onCerrar} className="panel-servicio-cerrar">
          <span className="sr-only">{textos.cerrar}</span>
          <span aria-hidden="true" className="icono-menu es-cerrar">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div className="panel-proyecto-cuerpo">
        <div
          className="panel-proyecto-marco"
          style={{ viewTransitionName: NOMBRE_TRANSICION }}
        >
          <Image
            src={proyecto.imagen}
            alt={fotos[proyecto.claveFoto]}
            sizes="(min-width: 1024px) 880px, 92vw"
            placeholder="blur"
            className="tarjeta-proyecto-imagen"
          />
        </div>

        <p className="medida mt-8 text-lg text-ink">{caso.encargo}</p>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-6 md:grid-cols-4">
          {datos.map((dato) => (
            <div key={dato.rotulo}>
              <dt className="etiqueta text-ink-muted">{dato.rotulo}</dt>
              <dd className={`mt-2 text-lg text-ink ${dato.mono ? "dato" : ""}`}>
                {dato.valor}
              </dd>
            </div>
          ))}
        </dl>

        <dl className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="border-t border-line pt-4">
            <dt className="etiqueta text-ink-muted">{textos.dificultadRotulo}</dt>
            <dd className="medida mt-2 text-sm text-ink">{caso.dificultad}</dd>
          </div>
          <div className="border-t border-line pt-4">
            <dt className="etiqueta text-ink-muted">{textos.resolucionRotulo}</dt>
            <dd className="medida mt-2 text-sm text-ink">{caso.resolucion}</dd>
          </div>
        </dl>

        <p className="dato mt-12 text-xs text-ink-muted">
          {d.razonSocial}: {caso.cliente}
        </p>

        {/* El botón de pedir constancias se retiró por decisión del
            cliente: los PDF se publicarán aquí cuando lleguen. */}
        <div className="mt-12 flex flex-wrap gap-4">
          <Boton href={`/${idioma}/proyectos/${proyecto.slug}`} variante="primario">
            {textos.verPaginaCompleta}
          </Boton>
        </div>
      </div>
    </>
  );
}
