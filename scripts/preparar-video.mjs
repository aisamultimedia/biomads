/**
 * Prepara el video de fondo del hero.
 *
 * El original pesa 22,6 MB a 10,9 Mbps: inservible como fondo web. Se
 * generan tres piezas en `public/video/`:
 *
 *   hero.mp4     H.264. Se descartó el VP9: con esta imagen salía más
 *                pesado que el H.264, y el H.264 lo reproduce todo.
 *   hero-poster.jpg  primer fotograma, se ve mientras carga y es lo único
 *                    que se muestra si el usuario pidió menos movimiento
 *
 * Sin pista de audio: un fondo va mudo siempre.
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

/* Escala a 1600 de ancho: por encima de eso, un fondo desenfocado por el
   velo no aporta nada y sí pesa. */
const escala = "scale=1600:-2";

const mp4 = resolve(destino, "hero.mp4");
correr([
  "-y", "-i", origen,
  "-an",
  "-vf", escala,
  "-c:v", "libx264", "-crf", "34", "-preset", "slow",
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
