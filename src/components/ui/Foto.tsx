"use client";

import Image, { type StaticImageData } from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { useEscritorio } from "@/hooks/useEscritorio";
import { useRevelado } from "@/hooks/useRevelado";
import { imagenInterior, imagenMarco } from "@/lib/motion";

type Props = {
  imagen: StaticImageData;
  /**
   * Qué se ve en la foto. Se usa tal cual como alt, así que describe la
   * imagen, no el servicio al que acompaña.
   */
  alt: string;
  /** Proporción del encuadre. La foto se recorta a ella. */
  proporcion?: "3/2" | "4/5" | "16/9" | "1/1";
  /** Tamaños servidos, para que next/image no descargue de más. */
  sizes?: string;
  /** Carga con prioridad: la foto del hero y las de cabecera de página. */
  prioridad?: boolean;
  /**
   * Entra al cargar, por CSS, sin esperar a la hidratación. Obligatorio en
   * la mitad superior: el revelado por scroll solo se levanta cuando React
   * hidrata, y eso retrasa el LCP.
   */
  inmediata?: boolean;
  /**
   * Con `inmediata`, posición en la secuencia de carga (pasos de
   * --paso-entrada). Sin ella, retraso en pasos de --stagger-grupo.
   */
  indice?: number;
  /**
   * En pantallas grandes ocupa todo el alto disponible en vez de respetar
   * la proporción. La proporción se sigue usando por debajo de `lg`.
   */
  llenarAlto?: boolean;
  /**
   * La foto se desplaza ±6 % dentro del marco al hacer scroll. Solo en
   * escritorio y sin prefers-reduced-motion; en el resto queda quieta.
   */
  parallax?: boolean;
  className?: string;
};

/**
 * Fotografía de campo. Se revela detrás de una máscara que sube mientras la
 * imagen se asienta de 1,08 a 1 (ver `imagen` en MOTION.md). Una sola vez.
 */
export function Foto({
  imagen,
  alt,
  proporcion = "3/2",
  sizes = "(min-width: 768px) 50vw, 100vw",
  prioridad = false,
  inmediata = false,
  indice = 0,
  llenarAlto = false,
  parallax = false,
  className = "",
}: Props) {
  const marcoRef = useRef<HTMLDivElement>(null);
  const revelado = useRevelado();
  const reducido = useReducedMotion();
  const escritorio = useEscritorio();

  /* El progreso va de 0 (el marco asoma por abajo) a 1 (sale por arriba).
     Escribe en el transform directamente, sin pasar por React. */
  const { scrollYProgress } = useScroll({
    target: marcoRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const conParallax = parallax && escritorio && !reducido;

  const claseMarco = [
    "marco-imagen",
    llenarAlto ? "lg:h-full lg:!aspect-auto" : "",
    className,
  ].join(" ");

  const foto = (
    <Image
      src={imagen}
      alt={alt}
      sizes={sizes}
      priority={prioridad}
      placeholder="blur"
      className="imagen-revelada"
    />
  );

  /* La capa de parallax va escalada un 12 % para que el desplazamiento de
     ±6 % nunca deje ver el borde del marco. */
  const capaParallax = (interior: React.ReactNode) => (
    <m.div className="h-full w-full" style={conParallax ? { y, scale: 1.12 } : undefined}>
      {interior}
    </m.div>
  );

  if (inmediata) {
    return (
      <div
        ref={marcoRef}
        data-entrada="imagen"
        className={claseMarco}
        style={{ aspectRatio: proporcion, "--indice": indice } as CSSProperties}
      >
        {capaParallax(<div className="imagen-interior h-full w-full">{foto}</div>)}
      </div>
    );
  }

  return (
    <m.div
      ref={marcoRef}
      data-revelar=""
      variants={imagenMarco}
      custom={indice}
      {...revelado}
      className={claseMarco}
      style={{ aspectRatio: proporcion }}
    >
      {capaParallax(
        <m.div data-revelar="" variants={imagenInterior} custom={indice} className="h-full w-full">
          {foto}
        </m.div>,
      )}
    </m.div>
  );
}
