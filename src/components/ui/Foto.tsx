import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

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
   * la mitad superior: el revelado por scroll solo se levanta cuando el
   * observador se monta, y eso retrasa el LCP.
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
   * La foto deriva ±6 % dentro del marco al hacer scroll. Lo resuelve
   * `animation-timeline: view()` en CSS: sin JavaScript, solo en escritorio
   * y solo donde el navegador lo soporta. En el resto queda quieta.
   */
  parallax?: boolean;
  className?: string;
};

/**
 * Fotografía de campo. Se revela detrás de una máscara que sube mientras la
 * imagen se asienta de 1,08 a 1 (ver `imagen` en MOTION.md). Una sola vez.
 *
 * Es un componente de servidor: no hay estado ni medición: la máscara la
 * dispara `[data-revelar="imagen"]` y la deriva la lleva la línea de tiempo
 * de scroll del navegador.
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
  const claseMarco = [
    "marco-imagen",
    llenarAlto ? "lg:h-full lg:!aspect-auto" : "",
    className,
  ].join(" ");

  const estilo = { aspectRatio: proporcion, "--indice": indice } as CSSProperties;

  return (
    <div
      {...(inmediata ? { "data-entrada": "imagen" } : { "data-revelar": "imagen" })}
      {...(parallax ? { "data-parallax": "" } : {})}
      className={claseMarco}
      style={estilo}
    >
      {/* La capa de parallax va escalada un 12 % para que el desplazamiento
          de ±6 % nunca deje ver el borde del marco. */}
      <div className="capa-parallax h-full w-full">
        <div className="imagen-interior h-full w-full">
          <Image
            src={imagen}
            alt={alt}
            sizes={sizes}
            priority={prioridad}
            placeholder="blur"
            className="imagen-revelada"
          />
        </div>
      </div>
    </div>
  );
}
