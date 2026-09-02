import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import logoClaro from "@/logo/logo-header-claro.png";
import logoOscuro from "@/logo/logo-header.png";

type Props = {
  /** Sobre superficie oscura: la palabra va en --ink-invert. */
  invertido?: boolean;
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
  alto = 34,
  prioridad = false,
  className = "",
}: Props) {
  /* Antes la barra pintaba las dos variantes y el CSS escondía una, porque
     conmutaba de tema al pasar el hero. Ahora la barra es clara siempre:
     una sola pieza, ~12 kB menos y una petición menos. */
  const fuente: StaticImageData = invertido ? logoClaro : logoOscuro;

  return (
    <Link
      href="/"
      className={`enlace-logotipo group inline-flex items-center ${className}`}
      aria-label="BIOMADS — ir al inicio"
    >
      <Image
        src={fuente}
        alt="BIOMADS"
        height={alto}
        width={Math.round((fuente.width * alto) / fuente.height)}
        priority={prioridad}
        className="w-auto transition-opacity duration-[var(--duracion-micro)] ease-base group-hover:opacity-80"
        style={{ height: alto }}
      />
    </Link>
  );
}
