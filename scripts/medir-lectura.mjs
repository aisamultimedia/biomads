/**
 * Mide la longitud de línea real del sitio, en caracteres.
 *
 * No se puede deducir del CSS. `--container-medida` va en `ch`, que es el
 * ancho del cero de la fuente, y en Switzer ese cero vale 1.30 caracteres
 * promedio: 60ch no son 60 caracteres sino 78. La única forma de saberlo es
 * contar lo que el navegador pinta.
 *
 * Por eso parte cada nodo de texto en renglones con un Range —un carácter
 * por vez, agrupando por coordenada vertical— en lugar de dividir el ancho
 * del bloque por un ancho de carácter supuesto. Descarta la última línea de
 * cada párrafo, que casi nunca va llena.
 *
 * Sale con código 1 si alguna línea llena se sale de la banda cómoda.
 *
 *   node scripts/medir-lectura.mjs [url]        (por defecto localhost:3000)
 */

import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3000";

/* Banda cómoda de lectura. El suelo solo se aplica a párrafos largos: uno
   corto ocupa las líneas que ocupe y eso no es un defecto. */
const MAXIMO = 75;
const ANCHOS = [1440, 1024, 768, 390];

const recuento = () => {
  const camino = (el) => {
    const partes = [];
    let n = el;
    while (n && n.tagName !== "BODY") {
      const clases =
        typeof n.className === "string" && n.className.trim()
          ? "." + n.className.trim().split(/\s+/).slice(0, 2).join(".")
          : "";
      partes.unshift(n.tagName.toLowerCase() + (n.id ? `#${n.id}` : "") + clases);
      n = n.parentElement;
    }
    return partes.slice(-2).join(" > ");
  };

  const lineas = [];
  const excesos = [];

  for (const el of document.querySelectorAll("p, li, dd, blockquote")) {
    /* Solo nodos de texto puro: con hijos, los rects del Range no
       corresponden a un único renglón de este elemento. */
    if (el.children.length || !el.textContent.trim()) continue;
    const nodo = el.firstChild;
    if (!nodo || nodo.nodeType !== Node.TEXT_NODE) continue;
    const texto = nodo.textContent;
    if (texto.trim().length < 40) continue;

    const rango = document.createRange();
    const porFila = new Map();
    for (let i = 0; i < texto.length; i++) {
      rango.setStart(nodo, i);
      rango.setEnd(nodo, i + 1);
      const caja = rango.getBoundingClientRect();
      if (!caja.height) continue;
      const fila = Math.round(caja.top);
      porFila.set(fila, (porFila.get(fila) ?? 0) + 1);
    }

    const cuentas = [...porFila.values()];
    if (cuentas.length > 1) cuentas.pop(); // la última línea no va llena
    for (const n of cuentas) {
      lineas.push(n);
      if (n > 75)
        excesos.push({
          n,
          texto: texto.trim().slice(0, 40),
          donde: camino(el),
          tam: getComputedStyle(el).fontSize,
          medida: el.classList.contains("medida"),
        });
    }
  }

  lineas.sort((a, b) => a - b);
  const pct = (q) => lineas[Math.floor((lineas.length - 1) * q)];
  return {
    lineas: lineas.length,
    p50: pct(0.5),
    p90: pct(0.9),
    max: lineas.at(-1),
    excesos,
  };
};

const navegador = await chromium.launch({ channel: "chrome" });
let fallos = 0;

for (const ancho of ANCHOS) {
  const contexto = await navegador.newContext({ viewport: { width: ancho, height: 900 } });
  const pagina = await contexto.newPage();
  await pagina.goto(BASE, { waitUntil: "load", timeout: 60000 });
  await pagina.waitForTimeout(2000);

  const r = await pagina.evaluate(recuento);
  const ok = r.excesos.length === 0;
  if (!ok) fallos++;

  console.log(
    `${ok ? "✓" : "✗"} ${String(ancho).padStart(4)}px   ${String(r.lineas).padStart(3)} líneas   ` +
      `mediana ${String(r.p50).padStart(2)}   p90 ${String(r.p90).padStart(2)}   máx ${String(r.max).padStart(2)}`,
  );
  for (const e of r.excesos)
    console.log(
      `        ${String(e.n).padStart(3)} car  ${e.tam.padEnd(5)} ${e.medida ? "medida" : "      "}  ` +
        `${e.donde}  «${e.texto}…»`,
    );
}

await navegador.close();

if (fallos) {
  console.log(`\n${fallos} de ${ANCHOS.length} anchos con líneas de más de ${MAXIMO} caracteres.`);
  process.exitCode = 1;
} else {
  console.log(`\nNinguna línea llena pasa de ${MAXIMO} caracteres en ${ANCHOS.length} anchos.`);
}
