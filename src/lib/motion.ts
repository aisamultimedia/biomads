import type { TargetAndTransition, Transition, Variant, Variants } from "motion/react";

/**
 * Vocabulario de movimiento del sitio.
 *
 * Espejo en JavaScript de la sección "Movimiento" de tokens.css: motion
 * necesita números, no custom properties. Si cambia un valor aquí cambia
 * allá, y al revés. El porqué de cada gesto está en MOTION.md.
 *
 * Tres verbos: revelar (títulos e imágenes tras una máscara que sube),
 * trazar (las reglas de 1px se dibujan de izquierda a derecha) y asentar
 * (texto y paneles llegan con un desplazamiento corto y frenada larga).
 */

type Bezier = [number, number, number, number];

/** La curva de entrada. La misma que --ease-base. */
export const CURVA_ENTRADA: Bezier = [0.22, 1, 0.36, 1];
/** Lo que sale, sale rápido y sin competir con lo que llega. --ease-salida. */
export const CURVA_SALIDA: Bezier = [0.4, 0, 1, 1];

/** Segundos. Mismos valores que --duracion-* en tokens.css. */
export const DURACION = {
  micro: 0.18,
  corta: 0.25,
  entrada: 0.6,
  titulo: 0.7,
  regla: 0.8,
  imagen: 1,
} as const;

/** Segundos entre hermanos de un grupo. --stagger-grupo. */
export const STAGGER = 0.06;

/** El único spring del sitio: el indicador de página activa. Sin sobrepaso. */
export const RESORTE: Transition = { type: "spring", stiffness: 500, damping: 40 };

const entrada = (duration: number): Transition => ({ duration, ease: CURVA_ENTRADA });

/** Salida común: 150ms con la curva de salida. */
export const salida: Transition = { duration: 0.15, ease: CURVA_SALIDA };

/**
 * Cuándo dispara un revelado: una sola vez, cuando cualquier parte del
 * elemento cruza una línea situada un 12 % por encima del borde inferior.
 * Así nada arranca pegado al borde de la pantalla.
 */
export const viewport = {
  once: true,
  amount: "some",
  margin: "0px 0px -12% 0px",
} as const;

/**
 * Retraso propio de un elemento suelto, en pasos de STAGGER. Solo se escribe
 * cuando hay índice: un `delay: 0` explícito anularía el escalonado que
 * impone un grupo padre.
 */
function retraso(indice?: number): Transition {
  return indice ? { delay: indice * STAGGER } : {};
}

/* -------------------------------------------------------------------------
   Vocabulario
   ------------------------------------------------------------------------- */

/** Asentar: párrafos, filas de ficha, ítems de lista, botones. */
export const texto: Variants = {
  oculto: { opacity: 0, y: 16 },
  visible: (i?: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...entrada(DURACION.entrada), ...retraso(i) },
  }),
  salida: { opacity: 0, y: -8, transition: salida },
};

/** Lateral: numerales mono y rótulos, que llegan desde la izquierda. */
export const lateral: Variants = {
  oculto: { opacity: 0, x: -12 },
  visible: (i?: number) => ({
    opacity: 1,
    x: 0,
    transition: { ...entrada(DURACION.entrada), ...retraso(i) },
  }),
  salida: { opacity: 0, transition: salida },
};

/**
 * Revelar un título: máscara que sube mientras el texto se asienta. El
 * inset negativo deja sitio a ascendentes y descendentes.
 */
export const titulo: Variants = {
  oculto: { clipPath: "inset(100% 0% -20% 0%)", y: 12 },
  visible: (i?: number) => ({
    clipPath: "inset(-20% 0% -20% 0%)",
    y: 0,
    transition: { ...entrada(DURACION.titulo), ...retraso(i) },
  }),
};

/** Panel: tarjetas y bloques que llegan como una pieza. */
export const panel: Variants = {
  oculto: { opacity: 0, y: 12, scale: 0.98 },
  visible: (i?: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...entrada(DURACION.entrada), ...retraso(i) },
  }),
  salida: { opacity: 0, y: -6, transition: salida },
};

/** Revelar una fotografía, parte 1: el marco descubre desde abajo. */
export const imagenMarco: Variants = {
  oculto: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: (i?: number) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { ...entrada(DURACION.imagen), ...retraso(i) },
  }),
};

/** Revelar una fotografía, parte 2: la imagen se asienta de 1,08 a 1. */
export const imagenInterior: Variants = {
  oculto: { scale: 1.08 },
  visible: (i?: number) => ({
    scale: 1,
    transition: { ...entrada(DURACION.imagen), ...retraso(i) },
  }),
};

/** Panel desplegable de la barra: rápido, desde arriba. */
export const desplegable: Variants = {
  oculto: { opacity: 0, y: -6, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: entrada(DURACION.corta) },
  salida: { opacity: 0, y: -4, transition: salida },
};

/** Aviso de formulario: entra y sale sin llamar la atención. */
export const aviso: Variants = {
  oculto: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0, transition: entrada(0.2) },
  salida: { opacity: 0, transition: salida },
};

/** Contenedor que escalona a sus hijos. No anima nada propio. */
export function grupo(escalonado = STAGGER, retrasoHijos = 0): Variants {
  return {
    oculto: {},
    visible: { transition: { staggerChildren: escalonado, delayChildren: retrasoHijos } },
    salida: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  };
}

/* -------------------------------------------------------------------------
   Regla trazada

   La línea es un pseudo-elemento de `.con-regla` cuyo scaleX lee la custom
   property --regla (ver globals.css). Aquí solo se anima ese número de 0 a 1;
   el DOM no crece y cualquier variante puede llevar regla.
   ------------------------------------------------------------------------- */

function resolver(variante: Variant | undefined, custom: unknown): TargetAndTransition {
  if (!variante) return {};
  return (typeof variante === "function" ? variante(custom, {}, {}) : variante) as TargetAndTransition;
}

/** La misma variante, trazando además su regla superior. */
export function conRegla(variante: Variants): Variants {
  return {
    ...variante,
    oculto: { ...resolver(variante.oculto, undefined), "--regla": 0 },
    visible: (custom?: number) => {
      const base = resolver(variante.visible, custom);
      return {
        ...base,
        "--regla": 1,
        transition: {
          ...base.transition,
          "--regla": { ...entrada(DURACION.regla), ...retraso(custom) },
        },
      };
    },
  };
}

/** Variantes que aceptan `tipo` en Reveal, RevealGroup y Entrada. */
export const vocabulario = { texto, lateral, titulo, panel } as const;
export type Tipo = keyof typeof vocabulario;

/** Las mismas, con regla. Precalculadas para no crear objetos por render. */
export const vocabularioRegla: Record<Tipo, Variants> = {
  texto: conRegla(texto),
  lateral: conRegla(lateral),
  titulo: conRegla(titulo),
  panel: conRegla(panel),
};

/** Un grupo que además traza su regla mientras escalona a los hijos. */
export const grupoConRegla = conRegla(grupo());
