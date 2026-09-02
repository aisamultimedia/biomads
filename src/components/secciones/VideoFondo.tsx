"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Ruta del mp4 dentro de /public. */
  fuente: string;
  /** Primer fotograma. Se ve mientras carga y sustituye al video si hace falta. */
  poster: string;
  className?: string;
};

/**
 * Video de fondo en bucle, mudo.
 *
 * Lleva un control de pausa porque lo exige WCAG 2.2.2: cualquier movimiento
 * automático de más de cinco segundos tiene que poder detenerse. Y si el
 * usuario pidió menos movimiento, arranca detenido en el póster.
 *
 * El estado del botón no se fija a mano: se escucha `play` y `pause` del
 * propio elemento, así que el botón siempre dice la verdad aunque el
 * navegador decida pausar por su cuenta (batería baja, pestaña oculta).
 *
 * El video no se pide hasta que la página terminó de cargar. Son 1,6 MB: si
 * salen a la vez que las fuentes, retrasan el título más de un segundo. Se
 * ve el póster desde el primer instante y el video entra después, sin que
 * nadie note el relevo.
 */
export function VideoFondo({ fuente, poster, className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [pausado, setPausado] = useState(false);
  const [fuenteLista, setFuenteLista] = useState<string | undefined>(undefined);

  /* Espera a que la página cargue y a que el hilo esté ocioso. */
  useEffect(() => {
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

    const alReproducir = () => setPausado(false);
    const alPausar = () => setPausado(true);
    video.addEventListener("play", alReproducir);
    video.addEventListener("pause", alPausar);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
    }

    return () => {
      video.removeEventListener("play", alReproducir);
      video.removeEventListener("pause", alPausar);
    };
  }, []);

  function alternar() {
    const video = videoRef.current;
    if (!video) return;
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
          {pausado ? "Reanudar el video de fondo" : "Pausar el video de fondo"}
        </span>
        <span aria-hidden="true" className={`icono-video ${pausado ? "es-play" : ""}`}>
          <span />
          <span />
        </span>
      </button>
    </>
  );
}
