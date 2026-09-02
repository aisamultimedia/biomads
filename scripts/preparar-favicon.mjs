/**
 * Iconos del sitio a partir del isotipo del logo entregado.
 *
 * El favicon.ico que había era el de create-next-app (25 931 bytes, el
 * triángulo de Vercel). Se sustituye por el engranaje de BIOMADS, tomado de
 * src/logo/logo-marca.png, que preparar-logo.mjs ya recorta del original.
 *
 *   src/app/favicon.ico    16, 32 y 48 px — pestañas y marcadores
 *   src/app/icon.png       512 px, fondo transparente — Android, PWA, Google
 *   src/app/apple-icon.png 180 px, sobre papel — iOS no admite transparencia
 *
 * Next los descubre por el nombre y escribe los <link> él solo. sharp no
 * escribe .ico, así que el contenedor se arma a mano: es una cabecera, un
 * directorio y los PNG uno detrás de otro (formato admitido desde Vista).
 *
 *   node scripts/preparar-favicon.mjs
 */

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const aqui = dirname(fileURLToPath(import.meta.url));
const origen = resolve(aqui, "../src/logo/logo-marca.png");
const app = resolve(aqui, "../src/app");

/* --color-paper de tokens.css, escrito a mano: aquí no hay CSS. */
const PAPEL = { r: 250, g: 249, b: 246, alpha: 1 };

/** Isotipo recortado al contenido y centrado en un cuadrado con margen. */
async function isotipo(lado, margen, fondo) {
  const recorte = await sharp(origen).trim({ threshold: 1 }).png().toBuffer();
  const util = Math.round(lado * (1 - 2 * margen));
  return sharp(recorte)
    .resize(util, util, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: Math.floor((lado - util) / 2),
      bottom: Math.ceil((lado - util) / 2),
      left: Math.floor((lado - util) / 2),
      right: Math.ceil((lado - util) / 2),
      background: fondo ?? { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

/** Contenedor ICO con PNG dentro. */
function ico(imagenes) {
  const cabecera = Buffer.alloc(6);
  cabecera.writeUInt16LE(0, 0); // reservado
  cabecera.writeUInt16LE(1, 2); // tipo: icono
  cabecera.writeUInt16LE(imagenes.length, 4);

  const directorio = Buffer.alloc(16 * imagenes.length);
  let desplazamiento = 6 + directorio.length;
  imagenes.forEach(({ lado, datos }, i) => {
    const e = i * 16;
    directorio.writeUInt8(lado === 256 ? 0 : lado, e); // ancho (0 = 256)
    directorio.writeUInt8(lado === 256 ? 0 : lado, e + 1); // alto
    directorio.writeUInt8(0, e + 2); // paleta
    directorio.writeUInt8(0, e + 3); // reservado
    directorio.writeUInt16LE(1, e + 4); // planos
    directorio.writeUInt16LE(32, e + 6); // bits por píxel
    directorio.writeUInt32LE(datos.length, e + 8);
    directorio.writeUInt32LE(desplazamiento, e + 12);
    desplazamiento += datos.length;
  });

  return Buffer.concat([cabecera, directorio, ...imagenes.map((i) => i.datos)]);
}

/* En 16 px el margen sobra: cada píxel cuenta. */
const favicon = ico(
  await Promise.all(
    [16, 32, 48].map(async (lado) => ({ lado, datos: await isotipo(lado, lado <= 16 ? 0 : 0.04) })),
  ),
);
writeFileSync(resolve(app, "favicon.ico"), favicon);

writeFileSync(resolve(app, "icon.png"), await isotipo(512, 0.06));
/* iOS redondea las esquinas y no admite alfa: papel detrás, margen amplio. */
writeFileSync(resolve(app, "apple-icon.png"), await isotipo(180, 0.14, PAPEL));

console.log(
  `favicon.ico ${favicon.length} bytes (16/32/48) · icon.png 512 · apple-icon.png 180 → ${app}`,
);
