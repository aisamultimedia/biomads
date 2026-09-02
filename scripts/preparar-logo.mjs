/**
 * Prepara el logo de BIOMADS a partir del PNG entregado.
 *
 * El original (1627x649) ya viene con transparencia, pero dentro de un
 * recuadro verde con un divisor vertical: son guías de espaciado, no parte
 * de la marca. Se recortan y se generan tres piezas:
 *
 *   logo-header.png       isotipo + "BIOMADS"          → cabecera, sobre papel
 *   logo-header-claro.png igual, con la palabra clara  → superficie oscura
 *   logo-marca.png        solo el isotipo
 *
 *   node scripts/preparar-logo.mjs
 */

import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const aqui = dirname(fileURLToPath(import.meta.url));
const origen = resolve(aqui, "../../Logo-Biomads.png");
const destino = resolve(aqui, "../src/logo");
mkdirSync(destino, { recursive: true });

/* Celdas medidas sobre el original, por dentro de las líneas guía. */
const MARCA = { left: 76, top: 121, width: 356, height: 370 };
const TEXTO = { left: 438, top: 121, width: 1091, height: 370 };

/** Recorta hasta el contenido real usando el canal alfa. */
const ajustar = (buffer) => sharp(buffer).trim({ threshold: 1 }).png().toBuffer();

/** Encuentra las bandas horizontales con tinta. */
async function bandas(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const conTinta = [];
  for (let y = 0; y < height; y++) {
    let n = 0;
    for (let x = 0; x < width; x++) if (data[(y * width + x) * channels + 3] > 40) n++;
    conTinta.push(n > 0);
  }

  const resultado = [];
  let inicio = null;
  for (let y = 0; y < height; y++) {
    if (conTinta[y] && inicio === null) inicio = y;
    if (!conTinta[y] && inicio !== null) {
      resultado.push({ top: inicio, height: y - inicio });
      inicio = null;
    }
  }
  if (inicio !== null) resultado.push({ top: inicio, height: height - inicio });
  return { bandas: resultado, width };
}

/**
 * Repinta solo las letras, conservando la opacidad de cada píxel.
 * Los píxeles con color —la hoja verde sobre la A— se dejan intactos: son
 * parte del isotipo, no del texto.
 */
async function tenir(buffer, [r, g, b]) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += info.channels) {
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    if (max - min > 28) continue; // tiene color: es la hoja
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }
  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png()
    .toBuffer();
}

/* --- Isotipo --- */
const marca = await ajustar(await sharp(origen).extract(MARCA).png().toBuffer());
await sharp(marca).toFile(resolve(destino, "logo-marca.png"));
const infoMarca = await sharp(marca).metadata();
console.log(`logo-marca.png         ${infoMarca.width}x${infoMarca.height}`);

/* --- Bloque de texto: la primera banda es "BIOMADS", la segunda el lema --- */
const texto = await sharp(origen).extract(TEXTO).png().toBuffer();
const { bandas: encontradas, width: anchoTexto } = await bandas(texto);
console.log(
  "bandas de texto:",
  encontradas.map((b) => `y ${b.top}→${b.top + b.height}`).join("  ·  "),
);

const palabra = await ajustar(
  await sharp(texto)
    .extract({ left: 0, top: encontradas[0].top, width: anchoTexto, height: encontradas[0].height })
    .png()
    .toBuffer(),
);
const infoPalabra = await sharp(palabra).metadata();
console.log(`palabra "BIOMADS"      ${infoPalabra.width}x${infoPalabra.height}`);

/* --- Composición: isotipo + palabra, centrados entre sí --- */
const ALTO = 200; // se sirve a bastante menos; sobra resolución para 2x
const anchoMarca = Math.round((infoMarca.width * ALTO) / infoMarca.height);
const altoPalabra = Math.round(ALTO * 0.42);
const anchoPalabra = Math.round((infoPalabra.width * altoPalabra) / infoPalabra.height);
const SEPARACION = Math.round(ALTO * 0.14);

async function componer(palabraFuente, archivo) {
  await sharp({
    create: {
      width: anchoMarca + SEPARACION + anchoPalabra,
      height: ALTO,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: await sharp(marca).resize({ height: ALTO }).toBuffer(), left: 0, top: 0 },
      {
        input: await sharp(palabraFuente).resize({ height: altoPalabra }).toBuffer(),
        left: anchoMarca + SEPARACION,
        top: Math.round((ALTO - altoPalabra) / 2),
      },
    ])
    .png()
    .toFile(resolve(destino, archivo));
  console.log(`${archivo.padEnd(22)} ${anchoMarca + SEPARACION + anchoPalabra}x${ALTO}`);
}

await componer(palabra, "logo-header.png");
/* Variante para el pie: la palabra en --ink-invert, el isotipo intacto. */
await componer(await tenir(palabra, [241, 243, 238]), "logo-header-claro.png");
