"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type PointerEvent, type MouseEvent } from "react";
import { usePresencia } from "@/hooks/usePresencia";
import { galeria } from "@/content/galeria";
import { interpolar, type Diccionario } from "@/idioma";

type Props = {
  /** Es componente de cliente: el texto llega resuelto por props. */
  textos: Diccionario["galeria"];
  fotos: Diccionario["fotos"];
};

/**
 * Galería de campo: carrusel con flechas, arrastre y gesto táctil, más un
 * visor a pantalla completa.
 *
 * **Sin librería.** El carrusel es una pista con `scroll-snap`: el gesto
 * táctil, la inercia y el encaje los pone el sistema operativo, que lo hace
 * mejor que cualquier reimplementación. Lo único que añade el JavaScript es
 * lo que el navegador no trae: las flechas, el arrastre con ratón, saber
 * qué foto está a la vista y el visor.
 *
 * **Sin JavaScript** sigue funcionando: la pista se desplaza con el dedo o
 * con la barra, y cada foto es un enlace a su archivo. Con JavaScript ese
 * clic abre el visor en vez de salir de la página.
 *
 * Nada se mueve solo: un carrusel que avanza sin que nadie lo pida cambia
 * la foto justo cuando se está mirando.
 */

/** Píxeles de desplazamiento a partir de los cuales un gesto es arrastre y no clic. */
const UMBRAL_ARRASTRE = 6;

export function Galeria({ textos, fotos }: Props) {
  const pistaRef = useRef<HTMLUListElement>(null);
  const enlaces = useRef(new Map<number, HTMLAnchorElement>());
  const [activa, setActiva] = useState(0);
  const [abierta, setAbierta] = useState<number | null>(null);
  const total = galeria.length;

  const suave = useCallback(
    (): ScrollBehavior =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    [],
  );

  /* Qué foto está a la vista: la que más porción de sí misma enseña.
     No vale "la que cruza un umbral": la siguiente asoma un 40 % de la
     pista, que es dos tercios de sí misma, y ganaría por ser la última
     entrada. Se guarda la ratio de cada una y manda la mayor. */
  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista) return;
    const diapositivas = [...pista.querySelectorAll<HTMLElement>("[data-indice]")];
    const ratios = new Map<number, number>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas)
          ratios.set(Number((e.target as HTMLElement).dataset.indice), e.intersectionRatio);
        let mejor = 0;
        let mayor = -1;
        for (const [i, r] of ratios) if (r > mayor) { mayor = r; mejor = i; }
        setActiva(mejor);
      },
      { root: pista, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    for (const d of diapositivas) observador.observe(d);
    return () => observador.disconnect();
  }, []);

  const irA = useCallback(
    (indice: number) => {
      const pista = pistaRef.current;
      const destino = pista?.querySelector<HTMLElement>(`[data-indice="${indice}"]`);
      if (!pista || !destino) return;
      pista.scrollTo({ left: destino.offsetLeft, behavior: suave() });
    },
    [suave],
  );

  /* --- Arrastre con ratón. El táctil ya es nativo. ---
     Mientras se arrastra se apaga el encaje: si no, la pista pelea con el
     scroll programático. Al soltar se encaja en la más cercana. */
  const arrastre = useRef<{ x: number; scroll: number; movido: boolean } | null>(null);

  /* Sin `setPointerCapture`: con la captura, el `click` que sigue al
     soltar se despacha a la pista y no al enlace, y el visor nunca abre.
     Se escucha en `window` mientras dura el arrastre, que es lo que hace
     que siga funcionando aunque el puntero salga de la pista. */
  const alPulsar = (evento: PointerEvent<HTMLUListElement>) => {
    if (evento.pointerType !== "mouse" || evento.button !== 0) return;
    const pista = pistaRef.current;
    if (!pista) return;
    arrastre.current = { x: evento.clientX, scroll: pista.scrollLeft, movido: false };

    const mover = (e: globalThis.PointerEvent) => {
      const a = arrastre.current;
      if (!a) return;
      const dx = e.clientX - a.x;
      if (Math.abs(dx) > UMBRAL_ARRASTRE) {
        a.movido = true;
        pista.dataset.arrastrando = "";
      }
      pista.scrollLeft = a.scroll - dx;
    };

    const soltar = () => {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerup", soltar);
      window.removeEventListener("pointercancel", soltar);
      const a = arrastre.current;
      if (!a) return;
      delete pista.dataset.arrastrando;
      if (!a.movido) {
        arrastre.current = null;
        return;
      }
      /* Encaje en la diapositiva más cercana al soltar. `movido` se
         conserva hasta el clic que sigue, para anularlo. */
      const diapositivas = [...pista.querySelectorAll<HTMLElement>("[data-indice]")];
      const cercana = diapositivas.reduce((mejor, d) =>
        Math.abs(d.offsetLeft - pista.scrollLeft) < Math.abs(mejor.offsetLeft - pista.scrollLeft)
          ? d
          : mejor,
      );
      pista.scrollTo({ left: cercana.offsetLeft, behavior: suave() });
    };

    window.addEventListener("pointermove", mover);
    window.addEventListener("pointerup", soltar);
    window.addEventListener("pointercancel", soltar);
  };

  /* Un arrastre termina en un clic sobre la foto; ese clic no debe abrir
     el visor. */
  const alHacerClicEnPista = (evento: MouseEvent<HTMLUListElement>) => {
    if (arrastre.current?.movido) {
      evento.preventDefault();
      evento.stopPropagation();
      arrastre.current = null;
    }
  };

  const alTeclear = (evento: React.KeyboardEvent<HTMLUListElement>) => {
    if (evento.key === "ArrowRight") {
      evento.preventDefault();
      irA(Math.min(activa + 1, total - 1));
    } else if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      irA(Math.max(activa - 1, 0));
    }
  };

  const abrir = (evento: MouseEvent<HTMLAnchorElement>, indice: number) => {
    evento.preventDefault();
    setAbierta(indice);
  };

  const cerrarVisor = useCallback(() => {
    const indice = abierta;
    setAbierta(null);
    if (indice !== null) enlaces.current.get(indice)?.focus();
  }, [abierta]);

  return (
    <>
      {/* Flechas y posición, en la misma fila que el texto de la sección:
          forman parte de la cabecera, no flotan sobre las fotos. */}
      <div className="galeria-controles">
        <p className="dato text-sm text-ink-muted" aria-live="polite">
          {interpolar(textos.posicion, { n: activa + 1, total })}
        </p>
        <div className="galeria-flechas">
          <button
            type="button"
            className="galeria-flecha"
            onClick={() => irA(activa - 1)}
            aria-disabled={activa === 0 || undefined}
          >
            <span className="sr-only">{textos.anterior}</span>
            <Flecha direccion="izquierda" />
          </button>
          <button
            type="button"
            className="galeria-flecha"
            onClick={() => irA(activa + 1)}
            aria-disabled={activa === total - 1 || undefined}
          >
            <span className="sr-only">{textos.siguiente}</span>
            <Flecha direccion="derecha" />
          </button>
        </div>
      </div>

      <ul
        ref={pistaRef}
        className="galeria-pista"
        role="region"
        aria-roledescription="carrusel"
        aria-label={textos.carrusel}
        tabIndex={0}
        onKeyDown={alTeclear}
        onPointerDown={alPulsar}
        onClickCapture={alHacerClicEnPista}
      >
        {galeria.map((foto, i) => (
          <li key={foto.clave} className="galeria-diapositiva" data-indice={i}>
            {/* Enlace al archivo: sin JavaScript abre la foto a tamaño
                completo; con él, el visor. */}
            <a
              ref={(nodo) => {
                if (nodo) enlaces.current.set(i, nodo);
                else enlaces.current.delete(i);
              }}
              href={foto.imagen.src}
              className="galeria-marco"
              aria-label={interpolar(textos.ampliar, { n: i + 1 })}
              onClick={(evento) => abrir(evento, i)}
              draggable={false}
            >
              <Image
                src={foto.imagen}
                alt={fotos[foto.clave]}
                sizes="(min-width: 1024px) 60vw, 88vw"
                placeholder="blur"
                className="galeria-imagen"
                draggable={false}
              />
            </a>
            <p className="galeria-pie">
              <span className="dato">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-ink-muted">{fotos[foto.clave]}</span>
            </p>
          </li>
        ))}
      </ul>

      {/* Indicador segmentado: un tramo por foto, no puntos. Dialoga con las
          reglas de 1px del resto del sitio y además es navegable. */}
      <ol className="galeria-indicador" aria-label={textos.carrusel}>
        {galeria.map((foto, i) => (
          <li key={foto.clave}>
            <button
              type="button"
              className="galeria-tramo"
              aria-current={i === activa ? "true" : undefined}
              onClick={() => irA(i)}
            >
              <span className="sr-only">{interpolar(textos.irA, { n: i + 1 })}</span>
            </button>
          </li>
        ))}
      </ol>

      <Visor
        indice={abierta}
        textos={textos}
        fotos={fotos}
        onCerrar={cerrarVisor}
        onIr={(i) => setAbierta(((i % total) + total) % total)}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Visor a pantalla completa                                           */
/* ------------------------------------------------------------------ */

function Visor({
  indice,
  textos,
  fotos,
  onCerrar,
  onIr,
}: {
  indice: number | null;
  textos: Diccionario["galeria"];
  fotos: Diccionario["fotos"];
  onCerrar: () => void;
  onIr: (indice: number) => void;
}) {
  const { montado, estado, ref } = usePresencia(indice !== null);
  const total = galeria.length;
  /* Al cerrar, `indice` ya es null pero el visor sigue montado mientras
     sale: se recuerda el último para no pintar vacío durante la salida. Es
     el patrón de React para guardar información de renders anteriores —un
     setState durante el render, condicionado— y no una ref, que no puede
     leerse mientras se pinta. */
  const [actual, setActual] = useState(indice ?? 0);
  if (indice !== null && indice !== actual) setActual(indice);

  useEffect(() => {
    if (!montado || indice === null) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();

    function alPresionar(evento: KeyboardEvent) {
      if (evento.key === "Escape") onCerrar();
      else if (evento.key === "ArrowRight") onIr(indice! + 1);
      else if (evento.key === "ArrowLeft") onIr(indice! - 1);
      else if (evento.key === "Tab") {
        const nodo = ref.current;
        if (!nodo) return;
        const enfocables = nodo.querySelectorAll<HTMLElement>("button");
        const primero = enfocables[0];
        const ultimoNodo = enfocables[enfocables.length - 1];
        if (evento.shiftKey && document.activeElement === primero) {
          evento.preventDefault();
          ultimoNodo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimoNodo) {
          evento.preventDefault();
          primero.focus();
        }
      }
    }
    document.addEventListener("keydown", alPresionar);
    return () => {
      document.removeEventListener("keydown", alPresionar);
      document.body.style.overflow = previo;
    };
  }, [montado, indice, onCerrar, onIr, ref]);

  if (!montado) return null;
  const foto = galeria[actual];

  return (
    <div className="velo-panel velo-visor" data-estado={estado} onClick={onCerrar}>
      <div
        ref={(nodo) => {
          ref.current = nodo;
        }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={textos.visor}
        className="visor"
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className="visor-cabecera">
          <p className="dato text-sm text-ink-invert-muted" aria-live="polite">
            {interpolar(textos.posicion, { n: actual + 1, total })}
          </p>
          <button type="button" onClick={onCerrar} className="visor-boton">
            <span className="sr-only">{textos.cerrar}</span>
            <span aria-hidden="true" className="icono-menu es-cerrar">
              <span />
              <span />
            </span>
          </button>
        </div>

        <figure className="visor-figura">
          <Image
            key={foto.clave}
            src={foto.imagen}
            alt={fotos[foto.clave]}
            sizes="92vw"
            placeholder="blur"
            className="visor-imagen"
          />
          <figcaption className="visor-pie">{fotos[foto.clave]}</figcaption>
        </figure>

        <button
          type="button"
          className="visor-boton visor-flecha visor-flecha--izquierda"
          onClick={() => onIr(actual - 1)}
        >
          <span className="sr-only">{textos.anterior}</span>
          <Flecha direccion="izquierda" />
        </button>
        <button
          type="button"
          className="visor-boton visor-flecha visor-flecha--derecha"
          onClick={() => onIr(actual + 1)}
        >
          <span className="sr-only">{textos.siguiente}</span>
          <Flecha direccion="derecha" />
        </button>
      </div>
    </div>
  );
}

function Flecha({ direccion }: { direccion: "izquierda" | "derecha" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="var(--trazo-icono)"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={direccion === "izquierda" ? { scale: "-1 1" } : undefined}
    >
      <path d="M5 12h14" />
      <path d="m12.5 5.5 6.5 6.5-6.5 6.5" />
    </svg>
  );
}
