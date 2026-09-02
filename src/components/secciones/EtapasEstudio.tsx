import { RevealGroup } from "@/components/motion/RevealGroup";
import { Icono } from "@/components/ui/Icono";
import { etapasEstudio } from "@/content/institucional";
import { diccionario, type Idioma } from "@/idioma";

/**
 * Las cinco etapas del estudio ambiental, tal como las declara el portafolio.
 *
 * Va en superficie oscura y entre dos secciones de papel: es la única banda
 * del recorrido que resume *qué se hace*, y el corte de color la separa de
 * lo que la rodea sin necesidad de un título más grande.
 *
 * Solo rótulos. CONTENIDO.md marca `[FALTA]` la descripción de cada etapa;
 * el día que lleguen se añaden bajo cada nombre y la fila no cambia de
 * forma. El icono acompaña al rótulo, no lo sustituye.
 */
export function EtapasEstudio({ idioma }: { idioma: Idioma }) {
  const t = diccionario(idioma);

  return (
    <section
      id="estudios-ambientales"
      className="superficie-oscura bg-dark text-ink-invert"
    >
      <div className="mx-auto w-full max-w-ancho px-6 py-24 md:py-32">
        <p className="etiqueta text-accent">{t.etapas.rotulo}</p>

        {/* En columna hasta md: cinco pasos apilados en rejilla de dos
            ocupaban pantalla y media y dejaban el quinto huérfano. En fila
            de uno, con el hilo bajando, la secuencia se lee de un vistazo. */}
        <RevealGroup
          as="ol"
          className="mt-12 grid gap-y-6 md:mt-16 md:grid-cols-5 md:gap-x-4"
          itemClassName="etapa-estudio"
        >
          {etapasEstudio.map((etapa) => (
            <span
              key={etapa.clave}
              className="flex items-center gap-6 md:flex-col md:items-start"
            >
              <span className="etapa-estudio-icono">
                <Icono nombre={etapa.icono} tamano={26} />
              </span>
              <span className="text-lg text-ink-invert md:text-base lg:text-lg">
                {t.etapas.nombres[etapa.clave]}
              </span>
            </span>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
