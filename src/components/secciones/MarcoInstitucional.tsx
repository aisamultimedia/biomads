import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Icono } from "@/components/ui/Icono";
import { valores } from "@/content/institucional";
import { diccionario, type Idioma } from "@/idioma";

/**
 * Misión, visión, valores y política de calidad.
 *
 * Va al final de Nosotros, nunca al principio: es lo mismo que declara toda
 * consultora del sector, así que no puede ser lo primero que alguien lee.
 * Existe porque en una licitación lo piden.
 *
 * Los valores son cinco frases cortas con icono, no un párrafo. La política
 * de calidad —el texto más largo del bloque y el que menos gente lee— va
 * plegada en un <details>: sigue en el HTML para quien la busque o la
 * indexe, sin ocupar pantalla para quien no.
 */
export function MarcoInstitucional({ idioma }: { idioma: Idioma }) {
  const t = diccionario(idioma).institucional;

  return (
    <div className="mt-24 md:mt-32">
      <RevealGroup
        as="dl"
        className="grid gap-12 md:grid-cols-2 md:gap-16"
        itemClassName="con-regla pt-6"
        regla
      >
        <div>
          <dt className="etiqueta text-ink-muted">{t.misionRotulo}</dt>
          <dd className="medida mt-4 text-ink">{t.mision}</dd>
        </div>
        <div>
          <dt className="etiqueta text-ink-muted">{t.visionRotulo}</dt>
          <dd className="medida mt-4 text-ink">{t.vision}</dd>
        </div>
      </RevealGroup>

      <Reveal as="p" className="etiqueta mt-24 text-ink-muted">
        {t.valoresRotulo}
      </Reveal>

      <RevealGroup
        as="ul"
        /* Hueco vertical generoso a propósito: la regla es el techo de cada
           valor, y con poco aire se leía como el subrayado del de arriba. */
        className="mt-8 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        itemClassName="border-t border-line pt-6"
      >
        {valores.map((valor) => (
          <span key={valor.clave} className="flex flex-col gap-4">
            <Icono nombre={valor.icono} tamano={26} className="text-accent-deep" />
            <span className="text-lg text-ink">{t.valores[valor.clave].nombre}</span>
            <span className="text-sm text-ink-muted">{t.valores[valor.clave].texto}</span>
          </span>
        ))}
      </RevealGroup>

      <Reveal className="mt-24">
        <details className="politica">
          <summary>
            <span className="etiqueta text-ink">{t.politicaRotulo}</span>
            <span aria-hidden="true" className="politica-signo" />
          </summary>

          <div className="pb-8">
            {t.politica.map((parrafo) => (
              <p key={parrafo} className="medida mt-4 text-ink-muted">
                {parrafo}
              </p>
            ))}

            <p className="etiqueta mt-12 text-ink-muted">{t.objetivosRotulo}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {t.objetivos.map((objetivo) => (
                <li key={objetivo} className="flex items-baseline gap-3 text-ink">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 flex-none translate-y-[-0.15em] rounded-sm bg-accent"
                  />
                  {objetivo}
                </li>
              ))}
            </ul>
          </div>
        </details>
      </Reveal>
    </div>
  );
}
