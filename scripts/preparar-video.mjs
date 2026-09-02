/**
 * Prepara el video de fondo del hero.
 *
 * El original pesa 22,6 MB a 10,9 Mbps: inservible como fondo web. Se
 * generan dos piezas en `public/video/`:
 *
 *   hero.mp4         H.264, mudo. Un fondo va mudo siempre.
 *   hero-poster.jpg  primer fotograma. Se ve mientras carga y es lo único
 *                    que se muestra si el usuario pidió menos movimiento.
 *
 * **Sobre el códec.** Se probaron VP9 y AV1 y los dos salen MÁS pesados que
 * el H.264 con esta imagen: AV1 (libsvtav1, preset 6) da 2,1 MB en su ajuste
 * más agresivo frente a 0,9 MB del H.264. El follaje en movimiento es justo
 * el caso donde los códecs modernos no rinden a tasas bajas. Así que una
 * sola pista, y la reproduce todo el mundo.
 *
 * Lo que sí bajó el peso a la mitad —de 1,67 MB a 0,89 MB— fue reducir
 * resolución y cadencia. El video vive detrás de un velo al 72 %: el detalle
 * que se pierde no llega a verse.
 *
 *   node scripts/preparar-video.mjs
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const aqui = dirname(fileURLToPath(import.meta.url));
const origen = resolve(aqui, "../../Foto/Background BioMads.mp4");
const destino = resolve(aqui, "../public/video");
mkdirSync(destino, { recursive: true });

const mb = (f) => (statSync(f).size / 1048576).toFixed(1);
const correr = (args) => execFileSync("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"] });

console.log(`original: ${mb(origen)} MB`);

/* 1280 de ancho y 24 fps. El velo del hero se come el detalle fino, así que
   la resolución de más solo pesa; y una panorámica lenta a 24 no se
   distingue de una a 30. Entre los dos recortan un 29 % del archivo. */
const escala = "scale=1280:-2,fps=24";

const mp4 = resolve(destino, "hero.mp4");
correr([
  "-y", "-i", origen,
  "-an",
  "-vf", escala,
  /* CRF 36 en vez de 34: comparados fotograma a fotograma se distinguen a
     duras penas en el follaje, y bajo el velo no se distinguen. */
  "-c:v", "libx264", "-crf", "36", "-preset", "slow",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  mp4,
]);
console.log(`hero.mp4   ${mb(mp4)} MB`);

const poster = resolve(destino, "hero-poster.jpg");
correr([
  "-y", "-i", origen,
  "-ss", "0.5", "-frames:v", "1",
  "-q:v", "7", "-vf", "scale=1200:-2",
  poster,
]);
console.log(`hero-poster.jpg  ${(statSync(poster).size / 1024).toFixed(0)} KB`);
