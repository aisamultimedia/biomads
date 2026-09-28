/**
 * Convierte las fotografías de campo originales a JPEG listos para web.
 *
 * Los originales son PNG de ~3,5 MB por imagen. Se guardan en `src/fotos/`
 * como importaciones estáticas para que next/image conozca sus dimensiones
 * y no haya salto de layout.
 *
 *   node scripts/preparar-fotos.mjs
 */

import { mkdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const aqui = dirname(fileURLToPath(import.meta.url));
const destino = resolve(aqui, "../src/fotos");

/**
 * Carpetas de originales. La segunda llegó el 28 de septiembre de 2026 con
 * un frente distinto —trazado de parcelas, encalado, líneas de piedra y
 * taludes junto a una vía— y los nombres de archivo son UUID, así que el
 * nombre de destino es lo único que dice qué hay dentro.
 */
const carpetas = {
  original: resolve(aqui, "../../Foto"),
  nuevas: resolve(aqui, "../../Foto/Nuevas fotos"),
};

/** Ancho máximo servido. next/image genera desde aquí los tamaños menores. */
const ANCHO_MAXIMO = 1600;

/**
 * Selección curada. El nombre de destino describe lo que se ve en la foto,
 * no el servicio al que la queramos asociar: el alt sale de aquí y no puede
 * afirmar algo que la imagen no muestra.
 */
/**
 * Recortes especiales. El hero va a sangre completa y necesita formato
 * panorámico; se recorta desde arriba para conservar el cielo, donde va el
 * texto de fondo.
 */
const recortes = {
  "campo-abierto.jpg": { ancho: 1448, alto: 762, posicion: "top" },
};

const seleccion = [
  { de: "IMG_7428.PNG", a: "campo-abierto.jpg" },
  { de: "IMG_7448.PNG", a: "cuadrilla-ladera.jpg" },
  { de: "IMG_7429.PNG", a: "siembra-via.jpg" },
  { de: "IMG_7408.PNG", a: "mantenimiento-individuo.jpg" },
  { de: "IMG_7452.PNG", a: "control-fitosanitario.jpg" },
  { de: "IMG_7414.PNG", a: "area-estudio.jpg" },
  { de: "IMG_7449.PNG", a: "individuos-en-hilera.jpg" },
  { de: "IMG_7455.PNG", a: "marcacion-individuo.jpg" },
  { de: "IMG_7454.PNG", a: "revision-planta.jpg" },
  { de: "IMG_7413.PNG", a: "siembra-ladera.jpg" },
  { de: "IMG_7450.PNG", a: "traslado-material.jpg" },
  { de: "IMG_7435.PNG", a: "parcela-estacas.jpg" },

  /* Galería. Doce más, elegidas sobre una hoja de contactos de las dieciséis
     que quedaban sin usar: se descartaron las que repetían encuadre con una
     ya publicada. Siguen siendo siembra, mantenimiento y control
     fitosanitario —no hay tomas de fauna ni de epífitas— y el nombre lo
     dice tal cual. */
  { de: "IMG_7412.PNG", a: "aspersion-ladera.jpg" },
  { de: "IMG_7415.PNG", a: "siembra-manual.jpg" },
  { de: "IMG_7416.PNG", a: "ahoyado-pradera.jpg" },
  { de: "IMG_7417.PNG", a: "aplicacion-fitosanitaria.jpg" },
  { de: "IMG_7421.PNG", a: "riego-arbol-potrero.jpg" },
  { de: "IMG_7430.PNG", a: "ahoyadora-via.jpg" },
  { de: "IMG_7432.PNG", a: "ahoyadora-detalle.jpg" },
  { de: "IMG_7451.PNG", a: "estaca-tutor.jpg" },
  { de: "IMG_7453.PNG", a: "plateo-individuo.jpg" },
  { de: "IMG_7463.PNG", a: "guadana-despeje.jpg" },
  { de: "IMG_7465.PNG", a: "fertilizacion-individuo.jpg" },
  { de: "IMG_7467.PNG", a: "cuadrilla-aspersion.jpg" },

  /* Frente de obra junto a vía, entregado el 28 de septiembre de 2026. Nueve
     útiles de las diez: 21AD7FF7 repetía encuadre exacto con 19561198 y se
     descartó. El orden es el de la jornada: trazar, encalar, acopiar la
     piedra, colocarla, cerrar la banda, y el resultado ya con cubresuelo. */
  { carpeta: "nuevas", de: "19561198-3A81-4DCB-8568-88E879068E80.PNG", a: "trazado-parcela.jpg" },
  { carpeta: "nuevas", de: "06456AEF-8476-485A-AE31-18C5288ADB95.PNG", a: "encalado-berma.jpg" },
  { carpeta: "nuevas", de: "C982DEC4-1284-41BB-BED7-90DBAD1BDB40.PNG", a: "carga-piedra.jpg" },
  { carpeta: "nuevas", de: "01D96271-556A-4722-A9FC-BE9242A85F0B.PNG", a: "cuadrilla-piedra.jpg" },
  { carpeta: "nuevas", de: "96B94ECC-A9C8-4167-B30A-5398AE38F9EC.PNG", a: "lineas-piedra.jpg" },
  { carpeta: "nuevas", de: "A0E72B56-670C-4A8C-9B53-CC501D588B61.PNG", a: "banda-piedra.jpg" },
  { carpeta: "nuevas", de: "826AFBE6-DB6C-437B-9274-4D776AE67A8E.PNG", a: "cuadrilla-terreno.jpg" },
  { carpeta: "nuevas", de: "8AA6ABC3-563C-4863-A056-050FD4B8BC79.PNG", a: "talud-cuneta.jpg" },
  { carpeta: "nuevas", de: "B5BDE690-22E6-4A43-AC86-55F1B026555F.PNG", a: "jardin-piedra.jpg" },
];

mkdirSync(destino, { recursive: true });

for (const { de, a, carpeta = "original" } of seleccion) {
  const entrada = resolve(carpetas[carpeta], de);
  const salida = resolve(destino, a);

  const recorte = recortes[a];
  const info = await sharp(entrada)
    .rotate()
    .resize(
      recorte
        ? { width: recorte.ancho, height: recorte.alto, fit: "cover", position: recorte.posicion }
        : { width: ANCHO_MAXIMO, withoutEnlargement: true },
    )
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(salida);

  const antes = (statSync(entrada).size / 1048576).toFixed(1);
  const despues = (info.size / 1024).toFixed(0);
  console.log(
    `${de} → ${a}  ${info.width}x${info.height}  ${antes} MB → ${despues} KB`,
  );
}
