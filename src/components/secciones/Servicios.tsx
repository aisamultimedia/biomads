"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useState, type CSSProperties } from "react";
import { Icono } from "@/components/ui/Icono";
import type { CategoriaServicio } from "@/content/servicios";
import type { Diccionario } from "@/idioma";

type Props = {
  categorias: readonly CategoriaServicio[];
  /** Una fotografía por categoría, en el mismo orden. */
  imagenes: readonly { clave: string; imagen: StaticImageData }[];
  /** Es componente de cliente: el texto llega resuelto por props. */
  textos: Diccionario["servicios"];
  alts: Diccionario["fotos"];
};

/**
 * Servicios: una lista que se explora, no cuatro cajas iguales.
 *
 * **Qué cambió y por qué.** Eran cuatro tarjetas del mismo tamaño con la
 * misma estructura, una al lado de la otra. Se leían las cuatro a la vez y
 * ninguna destacaba; el cliente lo llamó genérico y tenía razón: cuatro
 * rectángulos iguales son la retícula por defecto de cualquier plantilla.
 *
 * Ahora los cuatro nombres van en una columna, a tamaño de titular, y al
 * recorrerlos con el cursor —o con el tabulador, o tocándolos— el panel de
 * al lado cambia: la fotografía, el icono y la lista de frentes de esa
 * categoría. El contenido no se esconde detrás de un clic que lleva a otra
 * página; está aquí, y la interacción sirve para elegir qué mirar.
 *
 * **En móvil no hay cursor que recorrer**, así que la misma información se
 * pinta como acordeón: se toca una categoría y se despliega debajo, con su
 * foto. Es el mismo árbol de datos y el mismo componente; lo que cambia es
 * qué se muestra, no qué existe, así que el buscador y los lectores de
 * pantalla ven siempre las cuatro categorías completas.
 *
 * **Accesibilidad.** Los nombres son botones de verdad con `aria-expanded`,
 * se activan con foco además de con cursor, y el panel va enlazado por
 * `aria-controls`. Sin JavaScript queda la primera categoría abierta y el
 * resto legible: ningún panel se pinta vacío.
 */
export function Servicios({ categorias, imagenes, textos, alts }: Props) {
  const [activa, setActiva] = useState(0);
  const id = useId();

  return (
    <div className="servicios-explorador">
      {/* ---- La columna de nombres ---- */}
      <ul className="servicios-lista">
        {categorias.map((categoria, i) => {
          const { nombre, items } = textos.categorias[categoria.clave];
          const abierta = i === activa;

          return (
            <li
              key={categoria.clave}
              className="servicio-fila"
              data-abierta={abierta ? "" : undefined}
              style={{ "--indice": i } as CSSProperties}
            >
              <button
                type="button"
                id={`${id}-${i}`}
                aria-expanded={abierta}
                aria-controls={`${id}-panel-${i}`}
                onClick={() => setActiva(i)}
                onPointerEnter={() => setActiva(i)}
                onFocus={() => setActiva(i)}
                className="servicio-disparador"
              >
                <span className="dato servicio-numero">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="servicio-nombre">{nombre}</span>
                <span aria-hidden="true" className="servicio-insignia">
                  <Icono nombre={categoria.icono} tamano={22} />
                </span>
              </button>

              {/* El detalle en móvil: se despliega bajo su propio nombre. */}
              <div
                id={`${id}-panel-${i}`}
                role="region"
                aria-labelledby={`${id}-${i}`}
                className="servicio-detalle"
              >
                <ul className="servicio-frentes">
                  {items.map((item) => (
                    <li key={item.nombre} className="servicio-frente">
                      <span>
                        {item.nombre}
                        {item.nota ? (
                          <span className="dato categoria-nota">{item.nota}</span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      {/* ---- El panel de escritorio: una foto por categoría ---- */}
      <div aria-hidden="true" className="servicios-panel">
        {imagenes.map((foto, i) => (
          <div
            key={foto.clave}
            data-activa={i === activa ? "" : undefined}
            className="servicios-panel-capa"
          >
            <Image
              src={foto.imagen}
              alt=""
              sizes="(min-width: 1024px) 46vw, 1px"
              placeholder="blur"
              className="servicios-panel-imagen"
            />
          </div>
        ))}

        {/* Los frentes de la categoría activa, sobre la foto. Duplican los
            que ya están en la lista, así que no se anuncian dos veces. */}
        <div className="servicios-panel-frentes">
          {categorias.map((categoria, i) => (
            <ul
              key={categoria.clave}
              data-activa={i === activa ? "" : undefined}
              className="servicios-panel-lista"
            >
              {textos.categorias[categoria.clave].items.map((item, j) => (
                <li
                  key={item.nombre}
                  className="servicios-panel-frente"
                  style={{ "--indice": j } as CSSProperties}
                >
                  {item.nombre}
                  {item.nota ? <span className="dato categoria-nota">{item.nota}</span> : null}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* El alt de la foto activa, para quien no la ve. */}
      <p className="sr-only" aria-live="polite">
        {alts[imagenes[activa].clave as keyof typeof alts]}
      </p>
    </div>
  );
}
