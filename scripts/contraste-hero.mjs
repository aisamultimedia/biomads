/**
 * Contraste del texto del hero sobre el video.
 *
 * Es el único sitio del sitio donde el contraste **no se puede leer del
 * DOM**: el fondo de cada letra es un fotograma de video bajo un degradado,
 * y cambia treinta veces por segundo. Comprobarlo con los tokens da un
 * resultado que no significa nada.
 *
 * Así que se mide lo que el navegador pinta: se recorre el bucle parando en
 * varios fotogramas, se captura la pantalla en cada uno y, para cada línea
 * de texto, se muestrean los píxeles de su caja. El peor de todos es el que
 * cuenta —basta un fotograma malo para que una frase deje de leerse—.
 *
 * Los píxeles claros de la caja son la propia letra, no el fondo, así que
 * se descartan por percentil: el fondo es la parte oscura de la caja.
 *
 *   node scripts/contraste-hero.mjs [url]
 */

import { chromium } from "playwright";
import sharp from "sharp";

const BASE = process.argv[2] ?? "http://localhost:3000/es";

/** Fotogramas del bucle donde se para a medir, en segundos. */
const INSTANTES = [0, 2.5, 5, 7.5, 10, 12.5, 15];

/** Anchos a comprobar: el degradado cambia entre móvil y escritorio. */
const VISTAS = [
  { nombre: "escritorio", width: 1440, height: 900 },
  { nombre: "tableta", width: 900, height: 900 },
  { nombre: "móvil", width: 390, height: 844 },
];

/** Mínimo WCAG 1.4.3 para texto normal; el grande basta con 3:1. */
const MINIMO_NORMAL = 4.5;
const MINIMO_GRANDE = 3;

const luminancia = ([r, g, b]) => {
  const v = [r, g, b]
    .map((c) => c / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
};

const razon = (a, b) => {
  const [alto, bajo] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (alto + 0.05) / (bajo + 0.05);
};

const navegador = await chromium.launch({ channel: "chrome" });
let fallos = 0;

for (const vista of VISTAS) {
  const contexto = await navegador.newContext({
    viewport: { width: vista.width, height: vista.height },
    deviceScaleFactor: 1,
  });
  const pagina = await contexto.newPage();
  await pagina.goto(BASE, { waitUntil: "load", timeout: 60000 });

  /* El video se pide en diferido y en móvil no se pide nunca. Se fuerza,
     porque lo que se quiere medir es justo el peor caso: con video. */
  await pagina.evaluate(() => {
    const v = document.querySelector("video");
    if (v && !v.getAttribute("src")) v.setAttribute("src", "/video/hero.mp4");
  });
  await pagina.waitForFunction(
    () => {
      const v = document.querySelector("video");
      return v && v.readyState >= 2;
    },
    { timeout: 30000 },
  );
  await pagina.evaluate(() => document.querySelector(".aviso-cookies")?.setAttribute("hidden", ""));

  /* Cajas y color de cada línea de texto del hero. Se parte por línea, no
     por elemento: un título de tres renglones puede tener un fondo bueno
     arriba y malo abajo. */
  const lineas = await pagina.evaluate(() => {
    const salida = [];
    const hero = document.querySelector(".hero-completo");
    if (!hero) return salida;

    for (const el of hero.querySelectorAll("p, span, h1, dt, dd, a")) {
      if (el.children.length || !el.textContent.trim()) continue;
      const estilo = getComputedStyle(el);
      if (estilo.visibility === "hidden" || estilo.display === "none") continue;

      /* Solo interesa lo que se apoya en el video. Si el elemento o alguno
         de sus contenedores dentro del hero pinta un fondo opaco —el botón
         de acento, por ejemplo—, su contraste no depende del fotograma y ya
         lo verifica paleta-logo.mjs contra los tokens. Además invertiría la
         polaridad del muestreo, que da por hecho letra clara sobre fondo
         oscuro. */
      let conFondoPropio = false;
      for (let n = el; n && n !== hero; n = n.parentElement) {
        const fondo = getComputedStyle(n).backgroundColor;
        const alfa = fondo.startsWith("rgba") ? parseFloat(fondo.split(",")[3]) : 1;
        if (fondo !== "transparent" && alfa > 0.1) {
          conFondoPropio = true;
          break;
        }
      }
      if (conFondoPropio) continue;

      const nodo = el.firstChild;
      if (!nodo || nodo.nodeType !== Node.TEXT_NODE) continue;

      const rango = document.createRange();
      rango.selectNodeContents(el);
      const color = estilo.color.match(/\d+/g).slice(0, 3).map(Number);
      const px = parseFloat(estilo.fontSize);
      const grande = px >= 24 || (px >= 18.66 && Number(estilo.fontWeight) >= 700);

      for (const caja of rango.getClientRects()) {
        if (caja.width < 8 || caja.height < 6) continue;
        salida.push({
          texto: el.textContent.trim().slice(0, 28),
          color,
          grande,
          caja: {
            x: Math.round(caja.x),
            y: Math.round(caja.y),
            w: Math.round(caja.width),
            h: Math.round(caja.height),
          },
        });
      }
    }
    return salida;
  });

  /* Peor caso por línea a lo largo del bucle. */
  const peor = new Map();

  for (const instante of INSTANTES) {
    await pagina.evaluate(async (t) => {
      const v = document.querySelector("video");
      if (!v) return;
      v.pause();
      v.currentTime = t % (v.duration || 16);
      await new Promise((r) => v.addEventListener("seeked", r, { once: true }));
    }, instante);
    await pagina.waitForTimeout(120);

    const captura = await pagina.screenshot({ type: "png" });
    const { data, info } = await sharp(captura).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

    for (const linea of lineas) {
      const { x, y, w, h } = linea.caja;
      if (y < 0 || y + h > info.height || x < 0 || x + w > info.width) continue;

      /* Luminancias de la caja. Las claras son la letra; el fondo es lo
         oscuro, así que se toma el percentil 35 como fondo efectivo. */
      const muestras = [];
      for (let fy = y; fy < y + h; fy += 2) {
        for (let fx = x; fx < x + w; fx += 2) {
          const i = (fy * info.width + fx) * info.channels;
          muestras.push([data[i], data[i + 1], data[i + 2]]);
        }
      }
      if (!muestras.length) continue;

      muestras.sort((a, b) => luminancia(a) - luminancia(b));
      const fondo = muestras[Math.floor(muestras.length * 0.35)];
      const r = razon(linea.color, fondo);

      const clave = `${linea.texto}|${y}`;
      const previo = peor.get(clave);
      if (!previo || r < previo.razon) peor.set(clave, { ...linea, razon: r, instante });
    }
  }

  console.log(`\n${vista.nombre.toUpperCase()} (${vista.width}px) — ${peor.size} líneas`);
  const ordenadas = [...peor.values()].sort((a, b) => a.razon - b.razon);
  for (const l of ordenadas) {
    const minimo = l.grande ? MINIMO_GRANDE : MINIMO_NORMAL;
    const ok = l.razon >= minimo;
    if (!ok) fallos++;
    /* Solo se listan las cinco peores y todo lo que falle. */
    if (ok && ordenadas.indexOf(l) >= 5) continue;
    console.log(
      `  ${ok ? "✓" : "✗"} ${l.razon.toFixed(2).padStart(6)}:1  mín ${minimo}  ` +
        `t=${String(l.instante).padStart(4)}s  «${l.texto}»`,
    );
  }
}

await navegador.close();

if (fallos) {
  console.log(`\n${fallos} línea(s) por debajo del mínimo en algún fotograma del bucle.`);
  process.exitCode = 1;
} else {
  console.log("\nTodas las líneas del hero pasan su mínimo en todos los fotogramas medidos.");
}
