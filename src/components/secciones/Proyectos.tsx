"use client";

import Image from "next/image";
import { useId, useState, type CSSProperties } from "react";
import { Cursor } from "@/components/motion/Cursor";
import { Icono, type NombreIcono } from "@/components/ui/Icono";
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
 * **Índice fuera, mockup dentro.** El cliente entregó un mockup de tarjetas
 * —foto con la píldora de estado encima, insignia circular junto al título,
 * datos con icono en dos columnas, alcance y etiquetas— y después pidió que
 * nada esencial dependiera de un «ver proyecto». Las dos cosas no se
 * peleaban: lo que sobraba era el enlace, no la tarjeta.
 *
 * Así que cerrado esto es un índice de seis renglones, que es lo que permite
 * meter seis fichas técnicas en la portada sin volverla interminable; y
 * abierto, lo que se despliega es la composición del mockup. El título y la
 * insignia viven en la fila porque la fila es el disparador: repetirlos
 * dentro sería decir dos veces lo mismo a dos centímetros.
 *
 * **La píldora de estado se muda.** Cerrada va en la fila, que es donde
 * sirve para comparar seis de un vistazo; al abrir, salta sobre la
 * fotografía, que es donde la puso el mockup. No se duplica en ningún
 * momento.
 *
 * **La fila reacciona al cursor** con un resplandor que lo sigue —lo publica
 * `Cursor` en `--cursor-x`— y con el numeral y la insignia tomando el
 * acento. Con el dedo no hay hover, así que ahí lo que responde es el
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

        /* Las cuatro filas de la ficha, cada una con su icono, como en el
           mockup. El periodo va en la monoespaciada por ser cifra. */
        const datos: { icono: NombreIcono; rotulo: string; valor: string; mono?: boolean }[] = [
          { icono: "persona", rotulo: textos.ficha.cliente, valor: caso.cliente },
          {
            icono: "calendario",
            rotulo: textos.ficha.periodo,
            valor: periodo(proyecto, unidades.meses),
            mono: true,
          },
          { icono: "sector", rotulo: textos.ficha.sector, valor: caso.sector },
          { icono: "engranaje", rotulo: textos.ficha.servicio, valor: caso.servicio },
        ];

        return (
          <Cursor key={proyecto.slug} as="li" intensidad={0} className="proyecto-fila">
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

                  {/* Insignia del mockup: dice de qué va antes de leer el
                      título. */}
                  <span aria-hidden="true" className="proyecto-insignia">
                    <Icono nombre={proyecto.icono} tamano={22} />
                  </span>

                  <span className="proyecto-titular">
                    <span className="proyecto-titulo">{caso.titulo}</span>
                    <span className="proyecto-resumen">
                      <span>{caso.clienteCorto}</span>
                      <span aria-hidden="true" className="proyecto-punto" />
                      <span className="dato">{periodo(proyecto, unidades.meses)}</span>
                    </span>
                  </span>

                  {/* Cerrada la lleva la fila; abierta salta a la foto. */}
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
                    <span
                      className="proyecto-estado proyecto-estado--foto"
                      data-estado={proyecto.estado}
                    >
                      {textos.estados[proyecto.estado]}
                    </span>
                  </div>

                  <div className="proyecto-ficha">
                    <dl className="proyecto-datos">
                      {datos.map((dato) => (
                        <div key={dato.rotulo} className="proyecto-dato">
                          <Icono
                            nombre={dato.icono}
                            tamano={18}
                            className="proyecto-dato-icono"
                          />
                          <div>
                            <dt className="etiqueta text-ink-muted">{dato.rotulo}</dt>
                            <dd className={`mt-1 text-sm text-ink ${dato.mono ? "dato" : ""}`}>
                              {dato.valor}
                            </dd>
                          </div>
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
