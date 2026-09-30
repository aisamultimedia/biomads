import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Cursor } from "@/components/motion/Cursor";
import { Icono } from "@/components/ui/Icono";
import { valores } from "@/content/institucional";
import { diccionario, type Idioma } from "@/idioma";

/**
 * Misión, visión, valores y política integral.
 *
 * Va al final de Nosotros, nunca al principio: es lo mismo que declara toda
 * consultora del sector, así que no puede ser lo primero que alguien lee.
 * Existe porque en una licitación lo piden.
 *
 * **Qué cambió en el rediseño.** Era el bloque más convencional del sitio:
 * dos tarjetas iguales, una cuadrícula de cinco valores idénticos y un
 * desplegable. Sigue siendo lo mismo en contenido —no hay nada que añadir
 * que el cliente no haya escrito— pero ahora se mira:
 *
 * - Misión y visión llevan numeral y rótulo grande, y son asimétricas: la
 *   visión está fechada en 2030 y ocupa más, porque es la que mira lejos.
 * - Cada valor reacciona al cursor con un resplandor que lo sigue, y el
 *   icono se rellena de acento. Entran escalonados al cruzar la pantalla.
 * - La política abre con el numeral de la norma —ISO 9001, 14001, 45001—
 *   en la monoespaciada, que es lo que de verdad la distingue de cualquier
 *   otra declaración de intenciones.
 */
export function MarcoInstitucional({ idioma }: { idioma: Idioma }) {
  const t = diccionario(idioma).institucional;

  return (
    <div className="mt-24 md:mt-32">
      {/* Misión y visión sobre el ocre del logo: el único color de marca que
          aguanta como fondo de bloque con texto claro encima (7.78:1). Las
          dos cards igualan altura por la rejilla, no por una altura fija. */}
      <RevealGroup as="dl" className="marco-declaraciones" tipo="panel">
        {[
          { rotulo: t.misionRotulo, texto: t.mision },
          { rotulo: t.visionRotulo, texto: t.vision },
        ].map((decl, i) => (
          <Cursor key={decl.rotulo} intensidad={0} className="tarjeta-institucional">
            <dt className="marco-declaracion-rotulo">
              <span className="dato marco-declaracion-numero">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="etiqueta text-ocre-claro">{decl.rotulo}</span>
            </dt>
            <dd className="mt-6 text-lg text-ink-invert">{decl.texto}</dd>
          </Cursor>
        ))}
      </RevealGroup>

      <Reveal as="p" className="etiqueta mt-24 text-ink-muted">
        {t.valoresRotulo}
      </Reveal>

      <RevealGroup
        as="ul"
        /* Hueco vertical generoso a propósito: la regla es el techo de cada
           valor, y con poco aire se leía como el subrayado del de arriba. */
        className="mt-8 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        itemClassName="valor"
      >
        {valores.map((valor, i) => (
          <Cursor
            key={valor.clave}
            intensidad={0}
            className="valor-caja"
            as="span"
          >
            <span className="valor-numero dato">{String(i + 1).padStart(2, "0")}</span>
            <Icono nombre={valor.icono} tamano={26} className="valor-icono" />
            <span className="mt-4 block text-lg text-ink">
              {t.valores[valor.clave].nombre}
            </span>
            <span className="mt-2 block text-sm text-ink-muted">
              {t.valores[valor.clave].texto}
            </span>
          </Cursor>
        ))}
      </RevealGroup>

      <Reveal className="mt-24">
        <details className="politica">
          <summary>
            <span className="politica-titular">
              <span className="etiqueta text-ink">{t.politicaRotulo}</span>
              {/* Las tres normas, en la monoespaciada: es lo que separa esta
                  declaración de cualquier otra, y lo que busca quien la
                  está leyendo para una licitación. */}
              <span className="dato politica-normas">ISO 9001 · 14001 · 45001</span>
            </span>
            <span aria-hidden="true" className="politica-signo" />
          </summary>

          <div className="pb-2">
            {t.politica.map((parrafo) => (
              <p key={parrafo} className="medida mt-4 text-ink-muted">
                {parrafo}
              </p>
            ))}

            <p className="etiqueta mt-12 text-ink-muted">{t.compromisosRotulo}</p>
            <ul className="compromisos">
              {t.compromisos.map((compromiso, i) => (
                <li
                  key={compromiso}
                  className="compromiso"
                  style={{ "--indice": i } as CSSProperties}
                >
                  <span aria-hidden="true" className="compromiso-marca" />
                  {compromiso}
                </li>
              ))}
            </ul>
          </div>
        </details>
      </Reveal>
    </div>
  );
}
