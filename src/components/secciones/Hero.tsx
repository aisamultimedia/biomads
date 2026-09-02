import { Boton } from "@/components/ui/Boton";
import { Enlace } from "@/components/ui/Enlace";
import { Entrada } from "@/components/motion/Entrada";
import { TituloPorLineas } from "@/components/motion/TituloPorLineas";
import { VideoFondo } from "./VideoFondo";
import { proyectos } from "@/content/proyectos";
import { equipo, regiones } from "@/content/respaldo";
import { empresa } from "@/lib/site";

/**
 * Hero a sangre completa, con video de fondo en bucle.
 *
 * El texto va sobre imagen en movimiento, así que la legibilidad depende de
 * un velo. Es neutro, no verde: oscurece sin teñir. Y es funcional, no
 * decorativo — sin él el blanco no llega a 4.5:1 sobre el pasto, y con video
 * el fondo cambia en cada fotograma.
 *
 * Las tarjetas de cifra son sólidas, no de vidrio: el glassmorphism está
 * descartado y además su contraste dependería de lo que pase por detrás.
 *
 * Todo entra por CSS en la secuencia de `--paso-entrada`. Nada usa `Reveal`:
 * su estado oculto espera a la hidratación y eso retrasa el LCP.
 */

/** Cifras del hero. Las dos salen de CONTENIDO.md. */
const cifras = [
  {
    valor: String(proyectos.length),
    rotulo: "Proyectos con ficha completa",
    nota: "Encargo, dificultad y duración publicados",
  },
  {
    valor: equipo.permanentes,
    rotulo: "Equipo permanente",
    nota: "Más especialistas por proyecto",
  },
] as const;

/** Ficha de identidad al pie del hero. */
const ficha = [
  { rotulo: "Constituida", valor: String(empresa.constitucion), mono: true },
  { rotulo: "Sede", valor: empresa.sede, mono: false },
  { rotulo: "Proyectos ejecutados en", valor: regiones.join(" y "), mono: false },
] as const;

/* Posiciones en la secuencia de carga. */
const PASO = { titulo: 0, bajada: 3, acciones: 4, cifras: 5, ficha: 6 } as const;

export function Hero() {
  return (
    <section className="hero-completo superficie-oscura">
      <VideoFondo fuente="/video/hero.mp4" poster="/video/hero-poster.jpg" />
      <div className="hero-velo" aria-hidden="true" />

      <div className="hero-contenido">
        <div className="mx-auto w-full max-w-ancho px-6">
          <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div>
              <TituloPorLineas
                indice={PASO.titulo}
                className="max-w-[19ch] text-3xl text-ink-invert md:text-4xl xl:text-5xl"
                lineas={["Estudios ambientales", "hechos para la revisión", "de la autoridad."]}
              />

              <Entrada
                as="p"
                indice={PASO.bajada}
                className="mt-8 max-w-[62ch] text-lg text-ink-invert"
              >
                Monitoreos de fauna, seguimiento de flora reubicada y gestión de
                obligaciones ambientales para proyectos de infraestructura. Con
                metodología documentada, registros verificables e informes técnicos que
                sirven de soporte para su licenciamiento.
              </Entrada>

              <Entrada
                indice={PASO.acciones}
                className="mt-12 flex flex-wrap items-center gap-8"
              >
                <Boton href="/contacto" variante="acento">
                  Cuéntenos su proyecto
                </Boton>
                <Enlace href="/proyectos" className="text-ink-invert">
                  Ver proyectos ejecutados
                </Enlace>
              </Entrada>
            </div>

            <Entrada
              indice={PASO.cifras}
              className="flex flex-col gap-4 sm:flex-row lg:flex-col"
            >
              {cifras.map((cifra) => (
                <article key={cifra.rotulo} className="hero-cifra">
                  <p className="dato text-4xl text-ink-invert">{cifra.valor}</p>
                  <p className="etiqueta mt-4 text-ink-invert">{cifra.rotulo}</p>
                  <p className="mt-2 text-sm text-ink-invert-muted">{cifra.nota}</p>
                </article>
              ))}
            </Entrada>
          </div>

          <Entrada
            as="dl"
            indice={PASO.ficha}
            className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line-invert pt-8 md:grid-cols-3"
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
