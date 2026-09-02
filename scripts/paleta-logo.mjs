/**
 * Paleta anclada al logo: extracción y verificación.
 *
 * Hace dos cosas y las dos hacen falta:
 *
 *   1. Muestrea el isotipo del logo por familias de tono y reporta el valor
 *      real de cada color de marca. Es el origen de --color-accent y
 *      --color-ocre; si el logo cambia, esto dice en qué.
 *
 *   2. Lee los tokens de color de src/styles/tokens.css —no una copia— y
 *      comprueba los pares que el sitio usa de verdad contra su mínimo WCAG.
 *      Sale con código 1 si alguno falla, así que sirve en un hook o en CI.
 *
 * El punto 2 es el que evita que esto se pudra: cualquiera puede tocar un
 * hex en tokens.css, y aquí se entera de que rompió el botón principal.
 *
 *   node scripts/paleta-logo.mjs
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const aqui = dirname(fileURLToPath(import.meta.url));

/* ------------------------------------------------------------------ */
/* Color                                                               */
/* ------------------------------------------------------------------ */

const aRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

/** Luminancia relativa según WCAG 2.x. */
function luminancia(hex) {
  const v = aRgb(hex)
    .map((c) => c / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
}

export function razon(a, b) {
  const [alto, bajo] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (alto + 0.05) / (bajo + 0.05);
}

export function aHsl(hex) {
  const [r, g, b] = aRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (!d) return [0, 0, l * 100];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h =
    (max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4) * 60;
  return [h, s * 100, l * 100];
}

/* ------------------------------------------------------------------ */
/* 1. Extracción del isotipo                                           */
/* ------------------------------------------------------------------ */

/* Celda del isotipo dentro del PNG entregado, por dentro de las guías.
   Es la misma que usa preparar-logo.mjs. */
const ISOTIPO = { left: 76, top: 121, width: 356, height: 370 };

/* Familias por rango de tono. El "café" del logo es en realidad un ocre
   oscuro: vive entre 25 y 64 grados, no en el rojo del café literal. */
const FAMILIAS = {
  "verde · engranaje": [100, 140],
  "lima · hojas": [65, 95],
  "ocre · engranaje": [25, 64],
  "azul · agua": [185, 215],
};

async function extraer() {
  const origen = resolve(aqui, "../../Logo-Biomads.png");
  const { data, info } = await sharp(origen)
    .extract(ISOTIPO)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cubetas = Object.fromEntries(Object.keys(FAMILIAS).map((k) => [k, []]));

  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    /* Alfa parcial es antialiasing: mezcla dos colores y no es ninguno. */
    if (a < 240) continue;
    const [H, S, L] = aHsl(
      "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join(""),
    );
    if (S < 30 || L < 12 || L > 92) continue;
    for (const [nombre, [min, max]] of Object.entries(FAMILIAS))
      if (H >= min && H <= max) cubetas[nombre].push([r, g, b]);
  }

  const mediana = (xs) => xs.slice().sort((a, b) => a - b)[Math.floor(xs.length / 2)];

  console.log("COLORES DEL ISOTIPO\n");
  for (const [nombre, px] of Object.entries(cubetas)) {
    if (!px.length) continue;
    const hex =
      "#" +
      [0, 1, 2]
        .map((c) => mediana(px.map((p) => p[c])).toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();
    const [H, S, L] = aHsl(hex).map(Math.round);
    console.log(
      `  ${nombre.padEnd(20)} ${hex}  hsl(${H} ${S}% ${L}%)  ${String(px.length).padStart(6)} px`,
    );
  }
}

/* ------------------------------------------------------------------ */
/* 2. Verificación de los tokens                                       */
/* ------------------------------------------------------------------ */

/** Lee los --color-* de tokens.css. La fuente es el archivo, no una copia. */
function leerTokens() {
  const css = readFileSync(resolve(aqui, "../src/styles/tokens.css"), "utf8");
  const tokens = {};
  for (const [, nombre, valor] of css.matchAll(/--color-([\w-]+):\s*(#[0-9A-Fa-f]{6})\s*;/g))
    tokens[nombre] = valor.toUpperCase();
  return tokens;
}

/**
 * Los pares que el sitio usa de verdad, con su mínimo.
 *
 * 4.5 = texto normal (WCAG 1.4.3 AA) · 7 = texto AAA
 * 3.0 = texto grande, y bordes o grafismos con significado (1.4.11)
 */
const PARES = [
  ["texto principal sobre papel", "ink", "paper", 7],
  ["texto principal sobre papel-alt", "ink", "paper-alt", 7],
  ["texto secundario sobre papel", "ink-muted", "paper", 4.5],
  ["texto secundario sobre papel-alt", "ink-muted", "paper-alt", 4.5],
  ["texto sobre oscuro", "ink-invert", "dark", 7],
  ["texto sobre el velo del hero", "ink-invert", "velo", 7],
  ["texto secundario sobre oscuro", "ink-invert-muted", "dark", 4.5],
  ["borde con significado sobre papel", "line-strong", "paper", 3],
  ["acento legible sobre papel", "accent-deep", "paper", 4.5],
  ["acento legible sobre papel-alt", "accent-deep", "paper-alt", 4.5],
  ["acento en hover sobre papel", "accent-hondo", "paper", 4.5],
  ["acento sobre oscuro", "accent", "dark", 4.5],
  ["acento sobre el velo del hero", "accent", "velo", 4.5],
  ["relleno suave: texto encima", "ink", "accent-suave", 7],
  ["relleno suave: secundario encima", "ink-muted", "accent-suave", 4.5],
  ["botón de acento: texto sobre relleno", "dark", "accent", 4.5],
  ["botón de acento en hover", "ink-invert", "accent-deep", 4.5],
  ["botón primario", "ink-invert", "dark", 4.5],
  ["ocre como texto sobre papel", "ocre", "paper", 4.5],
  ["ocre como texto sobre papel-alt", "ocre", "paper-alt", 4.5],
  ["texto sobre superficie de ocre", "ink-invert", "ocre-superficie", 4.5],
  ["rótulo sobre superficie de ocre", "ocre-claro", "ocre-superficie", 4.5],
  ["superficie de ocre contra papel", "ocre-superficie", "paper", 3],
];

function verificar() {
  const t = leerTokens();
  console.log("\nCONTRASTE DE LOS PARES EN USO\n");
  let fallos = 0;
  let ausentes = 0;

  for (const [nombre, a, b, minimo] of PARES) {
    if (!t[a] || !t[b]) {
      console.log(`  ? ${nombre.padEnd(38)} falta el token --color-${t[a] ? b : a}`);
      ausentes++;
      continue;
    }
    const r = razon(t[a], t[b]);
    const ok = r >= minimo;
    if (!ok) fallos++;
    console.log(
      `  ${ok ? "✓" : "✗"} ${nombre.padEnd(38)} ${r.toFixed(2).padStart(5)}:1   mínimo ${minimo}` +
        `   ${t[a]} sobre ${t[b]}`,
    );
  }

  if (fallos || ausentes) {
    console.log(`\n${fallos} par(es) por debajo del mínimo, ${ausentes} token(s) ausente(s).`);
    process.exitCode = 1;
  } else {
    console.log(`\n${PARES.length} pares, todos por encima de su mínimo.`);
  }
}

await extraer();
verificar();
