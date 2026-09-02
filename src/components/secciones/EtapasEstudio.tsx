import type { CSSProperties } from "react";
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
 * **Por qué línea de tiempo y no acordeón ni pestañas.** Las cinco son un
 * proceso secuencial y el orden *es* el mensaje: un acordeón las presentaría
 * como opciones intercambiables y unas pestañas esconderían cuatro de cinco.
 * Por eso el numeral y el hilo, que son las dos cosas que dicen "esto va en
 * este orden"; y por eso el hilo avanza con el scroll, para que recorrerlo
 * se parezca a recorrer el proceso.
 *
 * **Sobre los paneles.** Cada etapa admite una descripción y solo entonces
 * se vuelve desplegable. Hoy CONTENIDO.md marca `[FALTA]` las cinco, así que
 * ninguna lo es: un acordeón con paneles vacíos —o con texto inventado— es
 * peor que no tenerlo. Cuando lleguen, se añaden al diccionario y la banda
 * los recoge sin cambiar de forma.
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
        <ol className="etapas mt-12 grid gap-y-8 md:mt-16 md:grid-cols-5 md:gap-x-4">
          {etapasEstudio.map((etapa, i) => {
            const descripcion = t.etapas.descripciones?.[etapa.clave];

            return (
              <li
                key={etapa.clave}
                className="etapa-estudio"
                style={{ "--indice": i } as CSSProperties}
              >
                <div className="flex items-center gap-6 md:flex-col md:items-start">
                  <span className="etapa-estudio-icono">
                    <Icono nombre={etapa.icono} tamano={26} />
                  </span>

                  <div className="md:mt-2">
                    <span className="dato etapa-estudio-numero">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block text-lg text-ink-invert md:text-base lg:text-lg">
                      {t.etapas.nombres[etapa.clave]}
                    </span>
                  </div>
                </div>

                {descripcion ? (
                  <p className="etapa-estudio-descripcion">{descripcion}</p>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
