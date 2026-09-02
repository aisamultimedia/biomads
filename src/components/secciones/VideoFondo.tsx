"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Ruta del mp4 dentro de /public. */
  fuente: string;
  /** Nombres accesibles del control. Es de cliente: llegan por props. */
  textos: { pausar: string; reanudar: string };
  /** Primer fotograma. Se ve mientras carga y sustituye al video si hace falta. */
  poster: string;
  className?: string;
};

/** `navigator.connection`, que TypeScript todavía no declara. */
type ConexionAhorro = { saveData?: boolean };

/**
 * ¿Hay que evitar bajar los 0,9 MB del video?
 *
 * Dos motivos, misma respuesta. Con el ahorro de datos activado, gastarlos
 * en un fondo decorativo es exactamente lo que el visitante pidió no hacer.
 * Y con `prefers-reduced-motion`, el video arrancaría detenido: bajarlo para
 * dejarlo quieto es tráfico tirado.
 *
 * En los dos casos queda el póster —que es lo que se ve igualmente— y el
 * botón pasa a decir "reanudar": quien quiera el video lo pide y entonces
 * se baja.
 */
function evitarDescarga(): boolean {
  const conexion = (navigator as Navigator & { connection?: ConexionAhorro }).connection;
  if (conexion?.saveData) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Video de fondo en bucle, mudo.
 *
 * Lleva un control de pausa porque lo exige WCAG 2.2.2: cualquier movimiento
 * automático de más de cinco segundos tiene que poder detenerse.
 *
 * El estado del botón no se fija a mano: se escucha `play` y `pause` del
 * propio elemento, así que el botón siempre dice la verdad aunque el
 * navegador decida pausar por su cuenta (batería baja, pestaña oculta).
 *
 * El video no se pide hasta que la página terminó de cargar: si sale a la
 * vez que las fuentes, retrasa el título más de un segundo. Se ve el póster
 * desde el primer instante y el video entra después, sin que nadie note el
 * relevo.
 */
export function VideoFondo({ fuente, poster, textos, className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [pausadoPorEvento, setPausadoPorEvento] = useState(false);
  const [fuenteLista, setFuenteLista] = useState<string | undefined>(undefined);

  /* Sin fuente no hay nada reproduciéndose, así que el botón dice
     "reanudar" sin necesidad de escribir estado: se deduce. */
  const pausado = fuenteLista === undefined || pausadoPorEvento;

  /* Espera a que la página cargue y a que el hilo esté ocioso. */
  useEffect(() => {
    if (evitarDescarga()) return;

    let ocioso = 0;
    const pedir = () => {
      const programar =
        window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
      ocioso = programar(() => setFuenteLista(fuente)) as unknown as number;
    };
    if (document.readyState === "complete") pedir();
    else window.addEventListener("load", pedir, { once: true });
    return () => {
      window.removeEventListener("load", pedir);
      window.cancelIdleCallback?.(ocioso);
    };
  }, [fuente]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const alReproducir = () => setPausadoPorEvento(false);
    const alPausar = () => setPausadoPorEvento(true);
    video.addEventListener("play", alReproducir);
    video.addEventListener("pause", alPausar);

    return () => {
      video.removeEventListener("play", alReproducir);
      video.removeEventListener("pause", alPausar);
    };
  }, []);

  function alternar() {
    const video = videoRef.current;
    if (!video) return;

    /* Todavía sin fuente: el visitante está pidiendo el video que no se
       bajó. Se asigna y `autoPlay` hace el resto. */
    if (!fuenteLista) {
      setFuenteLista(fuente);
      return;
    }

    if (video.paused) void video.play();
    else video.pause();
  }

  return (
    <>
      <video
        ref={videoRef}
        className={`hero-video ${className}`}
        src={fuenteLista}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />

      <button type="button" onClick={alternar} className="hero-control-video">
        <span className="sr-only">
          {pausado ? textos.reanudar : textos.pausar}
        </span>
        <span aria-hidden="true" className={`icono-video ${pausado ? "es-play" : ""}`}>
          <span />
          <span />
        </span>
      </button>
    </>
  );
}
