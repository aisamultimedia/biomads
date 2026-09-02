import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import logoClaro from "@/logo/logo-header-claro.png";
import logoOscuro from "@/logo/logo-header.png";

type Props = {
  /** Sobre superficie oscura: la palabra va en --ink-invert. */
  invertido?: boolean;
  /**
   * Pinta las dos variantes y deja que el CSS muestre la que toque. Lo usa
   * la barra, que cambia de tema al pasar el hero. Son ~12 kB cada una y el
   * alternativo —cambiar el `src` con JavaScript— parpadearía en cada
   * cambio de tema.
   */
  adaptable?: boolean;
  /** Alto en píxeles. El ancho sale de la proporción del archivo. */
  alto?: number;
  /**
   * Carga con prioridad. Por defecto no: precargar una imagen que puede
   * quedar oculta —o que está al pie— desperdicia ancho de banda que
   * necesitan las fuentes.
   */
  prioridad?: boolean;
  className?: string;
};

/**
 * Logo de BIOMADS.
 *
 * Las piezas las genera `scripts/preparar-logo.mjs` a partir del PNG
 * entregado: recorta las guías de espaciado y arma isotipo + palabra. La
 * variante clara solo repinta las letras, nunca el isotipo.
 */
export function Logotipo({
  invertido = false,
  adaptable = false,
  alto = 34,
  prioridad = false,
  className = "",
}: Props) {
  const pieza = (fuente: StaticImageData, clase: string) => (
    <Image
      src={fuente}
      alt="BIOMADS"
      height={alto}
      width={Math.round((fuente.width * alto) / fuente.height)}
      priority={prioridad}
      className={`w-auto transition-opacity duration-[var(--duracion-micro)] ease-base group-hover:opacity-80 ${clase}`}
      style={{ height: alto }}
    />
  );

  return (
    <Link
      href="/"
      className={`group inline-flex items-center ${className}`}
      aria-label="BIOMADS — ir al inicio"
    >
      {adaptable ? (
        <>
          {pieza(logoOscuro, "logo-sobre-claro")}
          {/* La segunda no aporta nombre: sería leerlo dos veces. */}
          <span aria-hidden="true" className="contents">
            {pieza(logoClaro, "logo-sobre-oscuro")}
          </span>
        </>
      ) : (
        pieza(invertido ? logoClaro : logoOscuro, "")
      )}
    </Link>
  );
}
