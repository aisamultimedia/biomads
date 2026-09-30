import type { ClaveFoto, ClaveProyecto } from "@/idioma";
import campoAbierto from "@/fotos/campo-abierto.jpg";
import taludCuneta from "@/fotos/talud-cuneta.jpg";
import cuadrillaLadera from "@/fotos/cuadrilla-ladera.jpg";
import individuosEnHilera from "@/fotos/individuos-en-hilera.jpg";
import siembraLadera from "@/fotos/siembra-ladera.jpg";
import areaEstudio from "@/fotos/area-estudio.jpg";

/**
 * Proyectos con ficha técnica — estructura.
 *
 * Aquí vive lo que no cambia al cambiar de idioma: la clave, el estado, los
 * años, la duración en meses y la fotografía. Título, cliente, sector,
 * servicio, alcance y etiquetas son texto y viven en el diccionario, bajo
 * `proyectos.casos`, con esta misma clave.
 *
 * De CONTENIDO.md → "Proyectos". Los seis salen de las fichas que BIOMADS
 * entregó el 30 de septiembre de 2026. Nada se redondea ni se completa: si
 * un dato no está en la ficha, no aparece.
 *
 * **Sobre las fotografías.** Son tomas de campo del archivo, elegidas
 * porque enseñan el tipo de trabajo que describe cada ficha, no porque
 * consten como registro de ese contrato. Por eso el texto alternativo
 * sigue describiendo lo que se ve y no el proyecto al que acompaña, igual
 * que en la galería. Cuando BIOMADS entregue la foto de cada frente, se
 * cambia la línea `claveFoto` y ya está.
 */

/** En ejecución o ejecutado. No hay un tercer estado en las fichas. */
export type EstadoProyecto = "en-ejecucion" | "ejecutado";

export type Proyecto = {
  slug: ClaveProyecto;
  estado: EstadoProyecto;
  /** Año de inicio. */
  desde: number;
  /** Año de cierre. Igual al de inicio en los contratos de un solo año. */
  hasta: number;
  /** Duración contractual en meses, solo donde la ficha la declara. */
  meses?: number;
  imagen: typeof campoAbierto;
  claveFoto: ClaveFoto;
  /**
   * Va en la sección del home. Son los tres del mockup que entregó el
   * cliente; los otros tres viven solo en la página, que es la que crece.
   */
  destacado?: boolean;
};

export const proyectos: readonly Proyecto[] = [
  {
    slug: "paga",
    estado: "en-ejecucion",
    desde: 2025,
    hasta: 2027,
    imagen: campoAbierto,
    claveFoto: "campo-abierto",
    destacado: true,
  },
  {
    slug: "sat",
    estado: "ejecutado",
    desde: 2025,
    hasta: 2026,
    imagen: taludCuneta,
    claveFoto: "talud-cuneta",
  },
  {
    slug: "compensacion-biotica",
    estado: "ejecutado",
    desde: 2021,
    hasta: 2026,
    meses: 60,
    imagen: cuadrillaLadera,
    claveFoto: "cuadrilla-ladera",
    destacado: true,
  },
  {
    slug: "embellecimiento",
    estado: "ejecutado",
    desde: 2024,
    hasta: 2026,
    imagen: individuosEnHilera,
    claveFoto: "individuos-en-hilera",
    destacado: true,
  },
  {
    slug: "flora-epifita-quimbo",
    estado: "ejecutado",
    desde: 2018,
    hasta: 2018,
    meses: 8,
    imagen: siembraLadera,
    claveFoto: "siembra-ladera",
  },
  {
    slug: "fauna-solinter",
    estado: "ejecutado",
    desde: 2017,
    hasta: 2017,
    meses: 6,
    imagen: areaEstudio,
    claveFoto: "area-estudio",
  },
];

/** Los que van en el home, en el orden en que se declaran arriba. */
export const proyectosDestacados = proyectos.filter((p) => p.destacado);
