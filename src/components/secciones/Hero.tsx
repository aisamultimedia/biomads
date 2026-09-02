import { Boton } from "@/components/ui/Boton";
import { Cifra } from "@/components/ui/Cifra";
import { Enlace } from "@/components/ui/Enlace";
import { Entrada } from "@/components/motion/Entrada";
import { TituloPorLineas } from "@/components/motion/TituloPorLineas";
import { VideoFondo } from "./VideoFondo";
import { regiones } from "@/content/respaldo";
import type { CSSProperties } from "react";
import { diccionario, type Idioma } from "@/idioma";
import { aniosDesdeConstitucion, empresa } from "@/lib/site";

/**
 * Hero a sangre completa, con video de fondo en bucle.
 *
 * El texto va sobre imagen en movimiento, así que la legibilidad depende de
 * un velo. Es neutro, no verde: oscurece sin teñir. Y es funcional, no
 * decorativo — sin él el blanco no llega a 4.5:1 sobre el pasto, y con video
 * el fondo cambia en cada fotograma.
 *
 * Todo entra por CSS en la secuencia de `--paso-entrada`. Nada usa `Reveal`:
 * su estado oculto espera a la hidratación y eso retrasa el LCP.
 */

/* Posiciones en la secuencia de carga. El descriptor comparte paso con la
   primera línea del título: llegan juntos y no retrasan el LCP. */
const PASO = { descriptor: 0, titulo: 0, bajada: 3, acciones: 4, ficha: 5 } as const;

export function Hero({ idioma }: { idioma: Idioma }) {
  const t = diccionario(idioma);

  /**
   * Ficha de identidad al pie del hero.
   *
   * Sustituye a las dos tarjetas de cifra que había antes —número de
   * proyectos y tamaño del equipo—: un contador de dos y otro de diez no
   * impresionan a nadie y ocupaban la mitad del hero. Aquí todo es texto
   * plano, sin tarjeta.
   *
   * Los años van junto al año de constitución a propósito: la cifra se
   * calcula de ahí y así queda comprobable de un vistazo.
   */
  const ficha = [
    {
      rotulo: t.hero.ficha.experiencia,
      /* La única cantidad de la ficha, y la única que cuenta. */
      valor: <Cifra valor={aniosDesdeConstitucion()} sufijo={t.hero.anios} />,
      mono: true,
    },
    { rotulo: t.hero.ficha.constituida, valor: String(empresa.constitucion), mono: true },
    { rotulo: t.hero.ficha.sede, valor: empresa.sede, mono: false },
    {
      rotulo: t.hero.ficha.regiones,
      valor: regiones.join(` ${t.unidades.y} `),
      mono: false,
    },
  ];

  return (
    <section className="hero-completo superficie-oscura">
      <VideoFondo
        fuente="/video/hero.mp4"
        poster="/video/hero-poster.jpg"
        textos={{ pausar: t.hero.pausarVideo, reanudar: t.hero.reanudarVideo }}
      />
      <div className="hero-velo" aria-hidden="true" />

      <div className="hero-contenido">
        <div className="mx-auto w-full max-w-ancho px-6">
          <Entrada
            as="p"
            indice={PASO.descriptor}
            className="descriptor mb-6 text-sm text-ink-invert"
          >
            {t.hero.descriptor}
          </Entrada>

          <TituloPorLineas
            indice={PASO.titulo}
            className="max-w-titulo text-3xl text-ink-invert md:text-4xl xl:text-5xl"
            lineas={t.hero.titulo}
          />

          {/* Una frase, no dos. La segunda —metodología, registros,
              informes— la repiten la sección de servicios y cada ficha de
              proyecto, y en móvil empujaba los botones fuera de la primera
              pantalla. */}
          <Entrada
            as="p"
            indice={PASO.bajada}
            className="mt-8 max-w-bajada text-lg text-ink-invert"
          >
            {t.hero.bajada}
          </Entrada>

          <Entrada indice={PASO.acciones} className="mt-12 flex flex-wrap items-center gap-8">
            <Boton href="#contacto" variante="acento">
              {t.hero.ctaPrincipal}
            </Boton>
            <Enlace href="#proyectos" className="text-ink-invert">
              {t.hero.ctaSecundario}
            </Enlace>
          </Entrada>

          {/* El contenedor no anima: si lo hiciera, cada bloque entraría dos
              veces —una con la lista y otra por su cuenta— y el escalonado
              se leería como un retardo, no como una secuencia. */}
          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line-invert pt-8 md:grid-cols-4">
            {ficha.map((dato, i) => (
              <div
                key={dato.rotulo}
                data-entrada="texto"
                style={{ "--indice": PASO.ficha + i } as CSSProperties}
              >
                <dt className="etiqueta text-ink-invert-muted">{dato.rotulo}</dt>
                <dd className={`mt-2 text-lg text-ink-invert ${dato.mono ? "dato" : ""}`}>
                  {dato.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Enlace, no adorno: dice que hay más abajo y además lleva. */}
      {/* El rótulo va solo para lectores: escrito se leía como una fila
          más de la ficha de datos que tiene justo encima. El riel ya dice
          "hay más abajo" sin necesidad de nombrarlo. */}
      <a href="#nosotros" className="indicador-scroll">
        <span className="sr-only">{t.hero.indicadorScroll}</span>
      </a>
    </section>
  );
}
