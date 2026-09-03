"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { interpolar, type ClaveFoto, type Diccionario } from "@/idioma";

type Props = {
  fotos: readonly { clave: ClaveFoto; imagen: StaticImageData }[];
  /** Es componente de cliente: el texto llega resuelto por props. */
  textos: Diccionario["galeria"];
  alts: Diccionario["fotos"];
  sizes?: string;
};

/** Desplazamiento horizontal de un hijo dentro de la pista, medido con rects. */
function posicionEnPista(pista: HTMLElement, hijo: HTMLElement): number {
  return hijo.getBoundingClientRect().left - pista.getBoundingClientRect().left + pista.scrollLeft;
}

/** Cuánto sigue pausado el avance después de levantar el dedo. */
const REPOSO_TACTIL_MS = 8000;

/** Intervalo del avance, leído del CSS; mira la unidad porque el compilador minifica `5000ms` a `5s`. */
function intervalo(): number {
  const valor = getComputedStyle(document.documentElement)
    .getPropertyValue("--duracion-galeria")
    .trim();
  const numero = Number.parseFloat(valor);
  if (Number.isNaN(numero)) return 5000;
  return valor.endsWith("ms") ? numero : numero * 1000;
}

/**
 * Slider de fotos a una por vista, para acompañar un bloque de texto.
 *
 * Es la galería reducida a lo esencial: una pista con `scroll-snap`, las
 * flechas, el indicador segmentado y el avance automático con las mismas
 * pausas (cursor encima, foco dentro, dedo en la pista, pestaña oculta,
 * fuera de pantalla, `prefers-reduced-motion`). Sin visor ni pies de foto:
 * aquí las fotos acompañan, no protagonizan. Sin JavaScript la pista se
 * desplaza con el dedo o con la barra, y se ven todas.
 */
export function Diapositivas({ fotos, textos, alts, sizes = "(min-width: 768px) 45vw, 90vw" }: Props) {
  const pistaRef = useRef<HTMLUListElement>(null);
  const [activa, setActiva] = useState(0);
  const [atendida, setAtendida] = useState(false);
  const [enPantalla, setEnPantalla] = useState(false);
  const [oculta, setOculta] = useState(false);
  const [sinMovimiento, setSinMovimiento] = useState(true);
  const reposoTactil = useRef<number | null>(null);
  const total = fotos.length;

  const suave = useCallback(
    (): ScrollBehavior =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    [],
  );

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const leer = () => setSinMovimiento(consulta.matches);
    leer();
    consulta.addEventListener("change", leer);
    const visibilidad = () => setOculta(document.hidden);
    document.addEventListener("visibilitychange", visibilidad);
    return () => {
      consulta.removeEventListener("change", leer);
      document.removeEventListener("visibilitychange", visibilidad);
    };
  }, []);

  /* Qué foto está a la vista: la de mayor porción visible dentro de la pista. */
  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista) return;
    const ratios = new Map<number, number>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          ratios.set(Number((e.target as HTMLElement).dataset.indice), e.intersectionRatio);
        }
        let mejor = 0;
        let mayor = -1;
        for (const [i, r] of ratios) if (r > mayor) { mayor = r; mejor = i; }
        setActiva(mejor);
      },
      { root: pista, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    for (const d of pista.querySelectorAll<HTMLElement>("[data-indice]")) observador.observe(d);
    const visible = new IntersectionObserver(
      ([entrada]) => setEnPantalla(entrada.intersectionRatio >= 0.5),
      { threshold: [0, 0.5, 1] },
    );
    visible.observe(pista);
    return () => {
      observador.disconnect();
      visible.disconnect();
    };
  }, []);

  const irA = useCallback(
    (indice: number) => {
      const pista = pistaRef.current;
      const destino = pista?.querySelector<HTMLElement>(`[data-indice="${indice}"]`);
      if (!pista || !destino) return;
      /* Posición de la diapositiva dentro de la pista medida con rects, que
         no dependen de cuál sea el ancestro posicionado. Con `offsetLeft`
         el destino se pasaba una foto entera cuando la pista no era el
         `offsetParent` y se quedaba corto cuando lo era. */
      pista.scrollTo({ left: posicionEnPista(pista, destino), behavior: suave() });
    },
    [suave],
  );

  const reproduciendo = !sinMovimiento && enPantalla && !oculta && !atendida;

  useEffect(() => {
    if (!reproduciendo) return;
    const id = window.setTimeout(() => irA((activa + 1) % total), intervalo());
    return () => window.clearTimeout(id);
  }, [reproduciendo, activa, irA, total]);

  const alTocar = () => {
    if (reposoTactil.current) window.clearTimeout(reposoTactil.current);
    setAtendida(true);
  };
  const alSoltarDedo = () => {
    if (reposoTactil.current) window.clearTimeout(reposoTactil.current);
    reposoTactil.current = window.setTimeout(() => setAtendida(false), REPOSO_TACTIL_MS);
  };

  return (
    <div
      className="diapositivas"
      onPointerEnter={(e) => e.pointerType === "mouse" && setAtendida(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setAtendida(false)}
      onFocus={() => setAtendida(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setAtendida(false);
      }}
      onTouchStart={alTocar}
      onTouchEnd={alSoltarDedo}
      onTouchCancel={alSoltarDedo}
    >
      <ul
        ref={pistaRef}
        className="diapositivas-pista"
        role="region"
        aria-roledescription="carrusel"
        aria-label={textos.carrusel}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); irA((activa + 1) % total); }
          if (e.key === "ArrowLeft") { e.preventDefault(); irA((activa - 1 + total) % total); }
        }}
      >
        {fotos.map((foto, i) => (
          <li
            key={foto.clave}
            className="diapositivas-diapositiva"
            data-indice={i}
            data-activa={i === activa ? "" : undefined}
          >
            <div className="diapositivas-marco">
              <Image
                src={foto.imagen}
                alt={alts[foto.clave]}
                sizes={sizes}
                placeholder="blur"
                className="diapositivas-imagen"
                draggable={false}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="galeria-controles mt-6">
        <p className="dato text-sm text-ink-muted" aria-live="polite">
          {interpolar(textos.posicion, { n: activa + 1, total })}
        </p>
        <div className="galeria-flechas">
          <button type="button" className="galeria-flecha" onClick={() => irA((activa - 1 + total) % total)}>
            <span className="sr-only">{textos.anterior}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>
          <button type="button" className="galeria-flecha" onClick={() => irA((activa + 1) % total)}>
            <span className="sr-only">{textos.siguiente}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <ol
        className="galeria-indicador mt-2"
        aria-label={textos.carrusel}
        data-reproduciendo={reproduciendo ? "" : undefined}
      >
        {fotos.map((foto, i) => (
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
    </div>
  );
}
