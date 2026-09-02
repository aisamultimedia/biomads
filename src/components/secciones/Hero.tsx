import { Boton } from "@/components/ui/Boton";
import { Enlace } from "@/components/ui/Enlace";
import { Entrada } from "@/components/motion/Entrada";
import { TituloPorLineas } from "@/components/motion/TituloPorLineas";
import { VideoFondo } from "./VideoFondo";
import { descriptor } from "@/content/institucional";
import { regiones } from "@/content/respaldo";
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
  { rotulo: "Experiencia", valor: `${aniosDesdeConstitucion()} años`, mono: true },
  { rotulo: "Constituida", valor: String(empresa.constitucion), mono: true },
  { rotulo: "Sede", valor: empresa.sede, mono: false },
  { rotulo: "Proyectos ejecutados en", valor: regiones.join(" y "), mono: false },
] as const;

/* Posiciones en la secuencia de carga. El descriptor comparte paso con la
   primera línea del título: llegan juntos y no retrasan el LCP. */
const PASO = { descriptor: 0, titulo: 0, bajada: 3, acciones: 4, ficha: 5 } as const;

export function Hero() {
  return (
    <section className="hero-completo superficie-oscura">
      <VideoFondo fuente="/video/hero.mp4" poster="/video/hero-poster.jpg" />
      <div className="hero-velo" aria-hidden="true" />

      <div className="hero-contenido">
        <div className="mx-auto w-full max-w-ancho px-6">
          <Entrada
            as="p"
            indice={PASO.descriptor}
            className="descriptor mb-6 text-sm text-ink-invert"
          >
            {descriptor}
          </Entrada>

          <TituloPorLineas
            indice={PASO.titulo}
            className="max-w-[19ch] text-3xl text-ink-invert md:text-4xl xl:text-5xl"
            lineas={["Estudios ambientales", "hechos para la revisión", "de la autoridad."]}
          />

          {/* Una frase, no dos. La segunda —metodología, registros,
              informes— la repiten la sección de servicios y cada ficha de
              proyecto, y en móvil empujaba los botones fuera de la primera
              pantalla. */}
          <Entrada
            as="p"
            indice={PASO.bajada}
            className="mt-8 max-w-[52ch] text-lg text-ink-invert"
          >
            Monitoreos de fauna, seguimiento de flora reubicada y gestión de
            obligaciones ambientales para proyectos de infraestructura.
          </Entrada>

          <Entrada indice={PASO.acciones} className="mt-12 flex flex-wrap items-center gap-8">
            <Boton href="#contacto" variante="acento">
              Cuéntenos su proyecto
            </Boton>
            <Enlace href="#proyectos" className="text-ink-invert">
              Ver proyectos ejecutados
            </Enlace>
          </Entrada>

          <Entrada
            as="dl"
            indice={PASO.ficha}
            className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line-invert pt-8 md:grid-cols-4"
          >
            {ficha.map((dato) => (
              <div key={dato.rotulo}>
                <dt className="etiqueta text-ink-invert-muted">{dato.rotulo}</dt>
                <dd className={`mt-2 text-lg text-ink-invert ${dato.mono ? "dato" : ""}`}>
                  {dato.valor}
                </dd>
              </div>
            ))}
          </Entrada>
        </div>
      </div>
    </section>
  );
}
