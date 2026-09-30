import type { CSSProperties } from "react";
import { Icono } from "@/components/ui/Icono";
import { etapasEstudio } from "@/content/institucional";
import { diccionario, type Idioma } from "@/idioma";

/**
 * Las cinco etapas con que BIOMADS aborda un proyecto.
 *
 * Es la continuación de la promesa de marca, que va justo encima: primero
 * qué se promete, luego cómo se aborda. Por eso el rótulo dejó de ser
 * «Estudios ambientales» y es ahora «Nuestra forma de abordar cada
 * proyecto»: el bloque no es un índice de servicios sino un método.
 *
 * Va en superficie oscura y entre dos secciones de papel: es la única banda
 * del recorrido que resume *cómo se trabaja*, y el corte de color la separa
 * de lo que la rodea sin necesidad de un título más grande.
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
    <section id="proceso" className="superficie-oscura bg-dark text-ink-invert">
      <div className="mx-auto w-full max-w-ancho px-6 py-24 md:py-32">
        {/* Título de verdad, no el rótulo en versalitas que había antes.
            Lo que la banda enuncia dejó de ser una categoría —«Estudios
            ambientales»— y es ahora el método, así que se pinta con el
            mismo peso que el título de cualquier otra sección: en
            versalitas a 12px se habría leído como el pie de la promesa que
            tiene encima y no como el encabezado de lo que sigue. */}
        <h2 className="max-w-titulo-seccion text-2xl text-ink-invert md:text-3xl">
          {t.etapas.rotulo}
        </h2>

        {/* En columna hasta md; en fila de cinco desde ahí. La quinta
            etapa —«Gestionamos y hacemos seguimiento»— es bastante más
            larga que las otras cuatro, así que en fila rompe en dos o tres
            líneas: la rejilla las iguala por altura y el hilo sigue
            entrando por el eje de los círculos, que es lo que ordena. */}
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
                    {/* El numeral pasa a tamaño de titular: es el motivo que
                        ordena el método, igual que ordena los servicios y el
                        índice de proyectos. */}
                    <span className="dato etapa-estudio-numero">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="etapa-estudio-nombre">
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
