import Image from "next/image";
import { Enlace } from "@/components/ui/Enlace";
import type { Proyecto } from "@/content/proyectos";
import type { Diccionario, Idioma } from "@/idioma";

type Props = {
  proyecto: Proyecto;
  textos: Diccionario["proyectos"];
  unidades: Diccionario["unidades"];
  fotos: Diccionario["fotos"];
  /**
   * `resumen` es la tarjeta del home: foto, estado, título, tres datos,
   * alcance y etiquetas, con enlace a la ficha completa. `completa` es la de
   * la página: lleva además el sector y no enlaza a ninguna parte, porque ya
   * es el sitio al que se venía.
   */
  variante: "resumen" | "completa";
  /** Solo en la variante resumen, para componer el enlace a la página. */
  idioma?: Idioma;
};

/**
 * Periodo tal como lo declara la ficha: un año o un rango, y la duración
 * contractual en meses donde el portafolio la da.
 *
 * Se compone aquí y no en el diccionario porque son cifras, y las cifras no
 * se traducen: lo único que cambia de idioma es la palabra «meses».
 */
function periodo(proyecto: Proyecto, meses: string): string {
  const años =
    proyecto.desde === proyecto.hasta
      ? String(proyecto.desde)
      : `${proyecto.desde} – ${proyecto.hasta}`;
  return proyecto.meses ? `${años} (${proyecto.meses} ${meses})` : años;
}

/**
 * Ficha técnica de un proyecto.
 *
 * La misma pieza sirve en la sección del home y en la página, con dos
 * variantes: el recorte de datos cambia, el lenguaje visual no.
 *
 * **Qué se publica y qué no.** Cliente, periodo, sector, servicio, alcance y
 * etiquetas salen de la ficha que entregó BIOMADS; la resolución o el
 * decreto van dentro del alcance, que es donde estaban. No hay contador de
 * proyectos, ni de hectáreas acumuladas, ni de años: lo que no consta en la
 * ficha no aparece.
 *
 * **La fotografía es contexto, no registro.** Es una toma de campo del
 * archivo que enseña el tipo de trabajo que describe la ficha; por eso su
 * texto alternativo sigue contando lo que se ve y no el proyecto al que
 * acompaña. Va con `aria-hidden` en la tarjeta del home —el título dice lo
 * mismo dos líneas más abajo— y con su alt completo en la página.
 */
export function FichaProyecto({
  proyecto,
  textos,
  unidades,
  fotos,
  variante,
  idioma,
}: Props) {
  const caso = textos.casos[proyecto.slug];
  const completa = variante === "completa";

  const datos = [
    { rotulo: textos.ficha.cliente, valor: completa ? caso.cliente : caso.clienteCorto },
    { rotulo: textos.ficha.periodo, valor: periodo(proyecto, unidades.meses), mono: true },
    ...(completa ? [{ rotulo: textos.ficha.sector, valor: caso.sector }] : []),
    { rotulo: textos.ficha.servicio, valor: caso.servicio },
  ];

  return (
    <article id={completa ? proyecto.slug : undefined} className="ficha-proyecto">
      <div className="ficha-proyecto-marco">
        <Image
          src={proyecto.imagen}
          alt={completa ? fotos[proyecto.claveFoto] : ""}
          aria-hidden={completa ? undefined : "true"}
          sizes={completa ? "(min-width: 1200px) 1200px, 100vw" : "(min-width: 768px) 33vw, 92vw"}
          placeholder="blur"
          className="ficha-proyecto-imagen"
        />
        <span className="ficha-proyecto-estado">{textos.estados[proyecto.estado]}</span>
      </div>

      <div className="ficha-proyecto-cuerpo">
        {/* En la tarjeta del home el título se queda en --text-xl: a
            --text-2xl, dentro de una columna de un tercio, «Plan Integral de
            Compensación Ambiental Biótica» ocupaba tres líneas y empujaba la
            ficha entera. */}
        <h3 className={completa ? "text-2xl md:text-3xl" : "text-xl"}>{caso.titulo}</h3>

        <dl className="ficha-proyecto-datos">
          {datos.map((dato) => (
            <div key={dato.rotulo}>
              <dt className="etiqueta text-ink-muted">{dato.rotulo}</dt>
              <dd className={`mt-1 text-sm text-ink ${dato.mono ? "dato" : ""}`}>
                {dato.valor}
              </dd>
            </div>
          ))}
        </dl>

        <div className="ficha-proyecto-alcance">
          <p className="etiqueta text-ink-muted">{textos.ficha.alcance}</p>
          <p className="medida mt-2 text-sm text-ink">{caso.alcance}</p>
        </div>

        <ul className="ficha-proyecto-etiquetas">
          {caso.etiquetas.map((etiqueta) => (
            <li key={etiqueta} className="ficha-proyecto-etiqueta">
              {etiqueta}
            </li>
          ))}
        </ul>

        {/* Solo en el home, y lleva a la ficha completa de esta misma obra
            dentro de la página: no promete nada que no esté ahí. */}
        {!completa && idioma ? (
          <p className="ficha-proyecto-pie">
            <Enlace flecha href={`/${idioma}/proyectos#${proyecto.slug}`}>
              {textos.verFicha}
              <span className="sr-only"> — {caso.titulo}</span>
            </Enlace>
          </p>
        ) : null}
      </div>
    </article>
  );
}
