import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import logoClaro from "@/logo/logo-header-claro.png";
import logoOscuro from "@/logo/logo-header.png";
import { diccionario, type Idioma } from "@/idioma";

type Props = {
  /** Idioma activo: fija el destino del enlace y su nombre accesible. */
  idioma: Idioma;
  /** Sobre superficie oscura: la palabra va en --ink-invert. */
  invertido?: boolean;
  /**
   * Alto en píxeles. En la barra no se pasa: lo gobierna --alto-logo, que
   * cambia al compactarse. Aquí solo se fija para el pie, donde es fijo.
   */
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
/** Alto máximo del logo en la barra; el CSS lo baja al compactar. */
const ALTO_BARRA = 40;

export function Logotipo({
  idioma,
  invertido = false,
  alto = ALTO_BARRA,
  prioridad = false,
  className = "",
}: Props) {
  /* Antes la barra pintaba las dos variantes y el CSS escondía una, porque
     conmutaba de tema al pasar el hero. Ahora la barra es clara siempre:
     una sola pieza, ~12 kB menos y una petición menos. */
  const fuente: StaticImageData = invertido ? logoClaro : logoOscuro;
  const t = diccionario(idioma);

  return (
    <Link
      href={`/${idioma}`}
      /* flex-none: si la barra se queda sin sitio, lo que cede es el resto,
         no el logo. Sin esto el ancho se comprimía mientras el CSS mantenía
         el alto, y la marca salía deformada. */
      className={`enlace-logotipo group inline-flex flex-none items-center ${className}`}
      aria-label={t.nav.irAlInicio}
    >
      {/* Los atributos llevan el alto máximo para que el navegador reserve
          la caja correcta desde el primer momento; el alto real lo pone el
          CSS, que puede cambiarlo al compactar sin provocar salto. */}
      <Image
        src={fuente}
        alt="BIOMADS"
        height={alto}
        width={Math.round((fuente.width * alto) / fuente.height)}
        priority={prioridad}
        className="logo-imagen w-auto transition-opacity duration-[var(--duracion-micro)] ease-base group-hover:opacity-80"
        style={alto !== ALTO_BARRA ? { height: alto } : undefined}
      />
    </Link>
  );
}
