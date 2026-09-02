import { Enlace } from "@/components/ui/Enlace";
import { FichaDatos } from "@/components/ui/FichaDatos";
import type { Proyecto } from "@/content/proyectos";
import type { Diccionario, Idioma } from "@/idioma";

type Props = {
  proyecto: Proyecto;
  idioma: Idioma;
  textos: Diccionario["proyectos"];
  unidades: Diccionario["unidades"];
};

/**
 * Proyecto ejecutado: qué encargaron, qué lo hacía difícil y cómo se
 * resolvió. La dificultad va explícita porque es lo que distingue un caso
 * verificable de una lista de logros.
 *
 * Entra como un solo grupo: la regla se traza, el nombre del cliente se
 * revela tras su máscara y el resto se asienta en orden. La ficha, anidada,
 * escalona sus filas en su turno.
 */
export function TarjetaCaso({ proyecto, idioma, textos, unidades }: Props) {
  const caso = textos.casos[proyecto.slug];

  return (
    <article data-revelar="grupo" className="con-regla pt-8">
      <h3 data-revelar="titulo" className="text-xl md:text-2xl">
        {caso.clienteCorto}
      </h3>
      <p data-revelar="texto" className="medida mt-4 text-ink">
        {caso.encargo}
      </p>

      <FichaDatos
        className="mt-12"
        datos={[
          { rotulo: textos.ficha.anio, valor: String(proyecto.anio), mono: true },
          {
            rotulo: textos.ficha.duracion,
            valor: `${proyecto.duracionMeses} ${unidades.meses}`,
            mono: true,
          },
          { rotulo: textos.ficha.ubicacion, valor: caso.ubicacion },
          { rotulo: textos.ficha.servicio, valor: caso.servicioRotulo },
        ]}
      />

      <dl data-revelar="texto" className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <dt className="etiqueta text-ink-muted">{textos.dificultadRotulo}</dt>
          <dd className="medida mt-2 text-sm text-ink">{caso.dificultad}</dd>
        </div>
        <div>
          <dt className="etiqueta text-ink-muted">{textos.resolucionRotulo}</dt>
          <dd className="medida mt-2 text-sm text-ink">{caso.resolucion}</dd>
        </div>
      </dl>

      <p data-revelar="texto" className="mt-8">
        <Enlace flecha href={`/${idioma}/proyectos/${proyecto.slug}`}>
          {textos.verCompleto}
        </Enlace>
      </p>
    </article>
  );
}
