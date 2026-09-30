"use client";

import Image from "next/image";
import { useId, useState, type CSSProperties } from "react";
import { Cursor } from "@/components/motion/Cursor";
import type { Proyecto } from "@/content/proyectos";
import type { Diccionario } from "@/idioma";

type Props = {
  proyectos: readonly Proyecto[];
  /** Es componente de cliente: el texto llega resuelto por props. */
  textos: Diccionario["proyectos"];
  unidades: Diccionario["unidades"];
  fotos: Diccionario["fotos"];
};

/** Periodo tal como lo declara la ficha. Las cifras no se traducen. */
function periodo(proyecto: Proyecto, meses: string): string {
  const años =
    proyecto.desde === proyecto.hasta
      ? String(proyecto.desde)
      : `${proyecto.desde} – ${proyecto.hasta}`;
  return proyecto.meses ? `${años} · ${proyecto.meses} ${meses}` : años;
}

/**
 * Los seis proyectos, con su ficha entera, dentro del home.
 *
 * **Qué cambió.** Estaban en una página aparte y el home enseñaba tres en
 * resumen, con un «ver la ficha» por tarjeta. El cliente pidió lo contrario:
 * que la información esencial no dependa de irse a otro sitio. Así que la
 * página se retiró y las seis fichas viven aquí, completas.
 *
 * **Y no por eso el home se vuelve interminable.** Es un índice: seis filas
 * con lo que sirve para elegir —numeral, título, cliente, periodo y
 * estado—, y la ficha entera se despliega en su sitio, sin sacar a nadie de
 * la página y sin tapar nada. Cerrado ocupa seis renglones; abierto, lo que
 * pida la ficha que se está leyendo.
 *
 * Abre el primero por defecto: un acordeón con las seis filas cerradas
 * parece una lista de enlaces rotos y no enseña de qué va.
 *
 * **La fila reacciona al cursor** con un resplandor que sigue al puntero
 * —lo publica `Cursor` en `--cursor-x`— y con el numeral y la regla tomando
 * el acento. Con el dedo no hay hover, así que ahí lo que responde es el
 * despliegue.
 */
export function Proyectos({ proyectos, textos, unidades, fotos }: Props) {
  const [abierto, setAbierto] = useState<string | null>(proyectos[0]?.slug ?? null);
  const id = useId();

  return (
    <ul className="indice-proyectos">
      {proyectos.map((proyecto, i) => {
        const caso = textos.casos[proyecto.slug];
        const activo = abierto === proyecto.slug;

        return (
          <Cursor
            key={proyecto.slug}
            as="li"
            intensidad={0}
            className="proyecto-fila"
          >
            <div data-abierto={activo ? "" : undefined} className="proyecto-caja">
              <h3>
                <button
                  type="button"
                  id={`${id}-${proyecto.slug}`}
                  aria-expanded={activo}
                  aria-controls={`${id}-panel-${proyecto.slug}`}
                  onClick={() => setAbierto(activo ? null : proyecto.slug)}
                  className="proyecto-disparador"
                >
                  <span className="dato proyecto-numero">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="proyecto-titular">
                    <span className="proyecto-titulo">{caso.titulo}</span>
                    <span className="proyecto-resumen">
                      <span>{caso.clienteCorto}</span>
                      <span aria-hidden="true" className="proyecto-punto" />
                      <span className="dato">{periodo(proyecto, unidades.meses)}</span>
                    </span>
                  </span>

                  <span className="proyecto-estado" data-estado={proyecto.estado}>
                    {textos.estados[proyecto.estado]}
                  </span>

                  <span aria-hidden="true" className="proyecto-signo" />
                </button>
              </h3>

              <div
                id={`${id}-panel-${proyecto.slug}`}
                role="region"
                aria-labelledby={`${id}-${proyecto.slug}`}
                hidden={!activo}
                className="proyecto-panel"
              >
                <div className="proyecto-panel-cuerpo">
                  <div className="proyecto-marco">
                    <Image
                      src={proyecto.imagen}
                      alt={fotos[proyecto.claveFoto]}
                      sizes="(min-width: 1024px) 40vw, 92vw"
                      placeholder="blur"
                      className="proyecto-imagen"
                    />
                  </div>

                  <div className="proyecto-ficha">
                    <dl className="proyecto-datos">
                      {[
                        { rotulo: textos.ficha.cliente, valor: caso.cliente },
                        { rotulo: textos.ficha.sector, valor: caso.sector },
                        { rotulo: textos.ficha.servicio, valor: caso.servicio },
                      ].map((dato) => (
                        <div key={dato.rotulo}>
                          <dt className="etiqueta text-ink-muted">{dato.rotulo}</dt>
                          <dd className="mt-1 text-sm text-ink">{dato.valor}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="proyecto-alcance">
                      <p className="etiqueta text-ink-muted">{textos.ficha.alcance}</p>
                      <p className="medida mt-2 text-sm text-ink">{caso.alcance}</p>
                    </div>

                    <ul className="proyecto-etiquetas">
                      {caso.etiquetas.map((etiqueta, j) => (
                        <li
                          key={etiqueta}
                          className="proyecto-etiqueta"
                          style={{ "--indice": j } as CSSProperties}
                        >
                          {etiqueta}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Cursor>
        );
      })}
    </ul>
  );
}
