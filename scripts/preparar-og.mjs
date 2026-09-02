/**
 * Genera la imagen de Open Graph (1200x630) que se ve al compartir el sitio.
 *
 * Sale del póster del video, oscurecido con el mismo velo del hero, y con el
 * logo claro encima. Es una imagen estática: no cuesta nada en tiempo de
 * ejecución y no depende de fuentes en el servidor.
 *
 *   node scripts/preparar-og.mjs
 */

import { statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const aqui = dirname(fileURLToPath(import.meta.url));
const poster = resolve(aqui, "../public/video/hero-poster.jpg");
const logo = resolve(aqui, "../src/logo/logo-header-claro.png");
const salida = resolve(aqui, "../src/app/opengraph-image.jpg");

const ANCHO = 1200;
const ALTO = 630;

/* Velo: el mismo tono neutro del hero, para que la tarjeta y el sitio se
   reconozcan como lo mismo. Es --color-velo (#0E120E) de tokens.css; aquí
   va en canales porque sharp no lee CSS. Si allí cambia, cambia aquí. */
const velo = await sharp({
  create: { width: ANCHO, height: ALTO, channels: 4, background: { r: 14, g: 18, b: 14, alpha: 0.62 } },
})
  .png()
  .toBuffer();

const marca = await sharp(logo).resize({ height: 78 }).toBuffer();

await sharp(poster)
  .resize(ANCHO, ALTO, { fit: "cover", position: "center" })
  /* Oscurecer antes de componer: el velo por encima no basta y el logo
     tiene que leerse sea cual sea el fotograma. Medido: el peor píxel bajo
     el logo deja 4.4:1, por encima del 3:1 que pide un elemento gráfico. */
  .modulate({ brightness: 0.42 })
  .composite([
    { input: velo, blend: "over" },
    { input: marca, left: 72, top: ALTO - 78 - 72 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(salida);

console.log(`opengraph-image.jpg  ${ANCHO}x${ALTO}  ${(statSync(salida).size / 1024).toFixed(0)} KB`);
