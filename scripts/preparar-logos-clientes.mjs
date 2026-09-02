/**
 * Normaliza los logos de los clientes para la banda "Han confiado en nosotros".
 *
 * Los tres PNG entregados vienen con transparencia pero con lienzos y
 * proporciones distintas (2.8:1, 2.2:1 y 3.9:1). Puestos en fila sin tocar,
 * el más ancho se lee como el cliente más importante, que no es lo que dice
 * el contenido: los tres son clientes y punto.
 *
 * Por eso no se normaliza por altura sino por caja: cada logo se recorta al
 * contenido real y se ajusta *dentro* de la misma caja. Así el ancho tira
 * hacia abajo a los logotipos alargados y las tres piezas acaban ocupando un
 * área parecida, que es como el ojo mide "igual de grande".
 *
 *   node scripts/preparar-logos-clientes.mjs
 */

import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const aqui = dirname(fileURLToPath(import.meta.url));
const origen = resolve(aqui, "../../Logos");
const destino = resolve(aqui, "../src/logo/clientes");
mkdirSync(destino, { recursive: true });

/* Área común en píxeles, a 2x de la presentación. Igualar el área —y no la
   altura— es lo que hace que un logotipo alargado y uno apilado se lean del
   mismo tamaño: el ojo compara superficie ocupada, no una sola dimensión. */
const AREA = 112 * 340;

/* Topes para que la normalización por área no descuadre la fila: ninguna
   pieza más alta que esto ni más ancha que aquello. */
const ALTO_MAX = 128;
const ANCHO_MAX = 440;

const piezas = [
  { archivo: "Autopista Rio Magdalena.png", salida: "autopista-rio-magdalena.png" },
  { archivo: "IBAL.png", salida: "ibal.png" },
  { archivo: "Grupo Energía y Bogotá.png", salida: "grupo-energia-bogota.png" },
];

for (const pieza of piezas) {
  /* Umbral bajo: el recorte lo decide el canal alfa, y los bordes traen
     antialias muy tenue que sí es parte del dibujo. */
  const recortado = await sharp(resolve(origen, pieza.archivo))
    .trim({ threshold: 1 })
    .png()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = recortado.info;

  /* Escala que iguala el área, luego recortada por los dos topes. */
  const porArea = Math.sqrt(AREA / (width * height));
  const escala = Math.min(porArea, ALTO_MAX / height, ANCHO_MAX / width);

  const { data, info } = await sharp(recortado.data)
    .resize({ width: Math.round(width * escala), height: Math.round(height * escala) })
    .png({ compressionLevel: 9 })
    .toBuffer({ resolveWithObject: true });

  await sharp(data).toFile(resolve(destino, pieza.salida));
  console.log(
    `${pieza.salida.padEnd(30)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)}` +
      ` área ${String(info.width * info.height).padStart(6)}  ${(data.length / 1024).toFixed(1)} KB`,
  );
}
