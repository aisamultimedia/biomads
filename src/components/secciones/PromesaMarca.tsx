import { Fragment, type CSSProperties } from "react";
import { diccionario, type Idioma } from "@/idioma";

/**
 * Promesa de marca: la pausa del recorrido.
 *
 * Una sola frase, grande y ligera, con mucho aire alrededor. Va entre los
 * dos bloques más densos del sitio —Nosotros con su marco institucional y
 * la banda de etapas— para que haya dónde respirar entre ellos.
 *
 * **Sobre centrar y justificar.** El brief pedía las dos cosas a la vez, y
 * juntas se pelean: justificar reparte el sobrante en los espacios entre
 * palabras, así que en un bloque centrado y de pocas líneas produce ríos y
 * huecos irregulares. Lo que da el efecto de bloque equilibrado que se
 * buscaba es `text-wrap: balance`, que iguala el largo de las líneas
 * moviendo los cortes en vez de estirar los espacios.
 */

export function PromesaMarca({ idioma }: { idioma: Idioma }) {
  const t = diccionario(idioma).promesa;

  return (
    <section className="promesa" aria-labelledby="promesa-titulo">
      <div className="mx-auto w-full max-w-ancho px-6">
        <p className="etiqueta text-center text-accent-deep">{t.rotulo}</p>

        {/* Palabra a palabra, ligado al progreso del scroll: lo lleva
            `animation-timeline: view()`, sin JavaScript y sin observador.
            Donde no está soportado —hoy Firefox— la frase se lee entera y en
            su color final, que es la degradación correcta.

            Se probó también una variante que revelaba frase a frase al
            cruzar el umbral; se descartó porque repetía el gesto de las
            otras ocho secciones y la pausa dejaba de notarse como pausa. */}
        <p id="promesa-titulo" className="promesa-frase promesa-frase--palabras">
          {t.enunciado.split(" ").map((palabra, i) => (
            <Fragment key={`${palabra}-${i}`}>
              <span className="promesa-palabra" style={{ "--indice": i } as CSSProperties}>
                {palabra}
              </span>
              {/* El espacio va fuera del span: dentro, el inline-block que
                  permite desplazar la palabra se lo come y las junta. */}{" "}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
