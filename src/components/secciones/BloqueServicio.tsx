import type { ReactNode } from "react";
import { Boton } from "@/components/ui/Boton";
import { Reveal } from "@/components/motion/Reveal";
import type { ServicioDetallado } from "@/content/servicios";
import { diccionario, type Idioma } from "@/idioma";

type Props = {
  servicio: ServicioDetallado;
  idioma: Idioma;
  /** Numeral del bloque: 01, 02. */
  numero: string;
  /** La imagen queda a la derecha en escritorio. */
  invertido?: boolean;
  /** Fotografía o marcador. La foto trae su propio revelado. */
  medio: ReactNode;
};

/**
 * Uno de los dos servicios con ficha completa, con espacio propio.
 *
 * Deliberadamente no es una tarjeta de grilla: estos dos cargan el peso
 * comercial y los otros siete se listan aparte.
 *
 * Orden de entrada: numeral lateral → título tras su máscara → párrafo →
 * ficha con regla trazada → botón. La foto se revela por su cuenta.
 */
export function BloqueServicio({
  servicio,
  idioma,
  numero,
  invertido = false,
  medio,
}: Props) {
  const t = diccionario(idioma);
  const ficha = t.servicios.detallados[servicio.slug];
  const d = t.servicios.detalle;
  return (
    <article className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
      <div className={invertido ? "md:order-2" : undefined}>{medio}</div>

      <div className={invertido ? "md:order-1" : undefined}>
        <Reveal tipo="lateral" as="p" className="dato text-sm text-ink-muted">
          {numero}
        </Reveal>

        <Reveal tipo="titulo" className="mt-4">
          <h3 className="text-xl md:text-2xl">{ficha.titulo}</h3>
        </Reveal>

        <Reveal as="p" indice={1} className="medida mt-6 text-ink">
          {ficha.elVacio}
        </Reveal>

        <Reveal regla indice={2} className="mt-12 pt-6">
          <dl className="flex flex-col gap-6">
            <div>
              <dt className="etiqueta text-ink-muted">{t.servicios.panel.cuandoSeNecesita}</dt>
              <dd className="medida mt-2 text-sm text-ink">{ficha.cuandoSeNecesita}</dd>
            </div>
            <div>
              <dt className="etiqueta text-ink-muted">{t.servicios.panel.entregable}</dt>
              <dd className="medida mt-2 text-sm text-ink">{ficha.entregable}</dd>
            </div>
            <div>
              <dt className="etiqueta text-ink-muted">{d.ejecucionContractual}</dt>
              <dd className="dato mt-2 text-sm text-ink">
                {servicio.duracionReferenciaMeses} {t.unidades.meses}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal indice={3} className="mt-8">
          <Boton href={`/${idioma}/servicios/${servicio.slug}`} variante="secundario">
            {d.marcoYMetodologia}
          </Boton>
        </Reveal>
      </div>
    </article>
  );
}
