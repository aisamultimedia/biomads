import type { ReactNode } from "react";
import { Enlace } from "@/components/ui/Enlace";
import { FichaDatos } from "@/components/ui/FichaDatos";
import { Seccion } from "@/components/ui/Seccion";
import { Entrada } from "@/components/motion/Entrada";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { TituloPorLineas } from "@/components/motion/TituloPorLineas";
import { SiguientePaso } from "./SiguientePaso";
import { serviciosDetallados, type ServicioDetallado } from "@/content/servicios";
import { diccionario, type Idioma } from "@/idioma";

type Props = {
  servicio: ServicioDetallado;
  idioma: Idioma;
  /** Fotografía de cabecera. Trae su propio paso en la secuencia (5). */
  medio: ReactNode;
};

/**
 * Página de un servicio con ficha completa.
 *
 * Orden: cuándo se necesita · marco normativo · entregable · duración ·
 * cómo se ejecuta. Todo sale de CONTENIDO.md.
 *
 * Cerraba con una sección de «caso relacionado» —cliente, año, duración y
 * dificultad del proyecto que respaldaba el servicio— y con la ficha de ese
 * proyecto. Se retiró con la sección de proyectos, por decisión del
 * cliente. Lo que queda del trabajo real es la atribución del método, que
 * no es una ficha de proyecto sino la fuente de lo que se afirma: un método
 * sin decir dónde se aplicó es un método sin respaldo.
 *
 * La cabecera entra por CSS en una secuencia: rótulo → líneas del título →
 * entradilla → foto → ficha. Es el mismo patrón de todas las páginas
 * interiores.
 */
export function DetalleServicio({ servicio, idioma, medio }: Props) {
  const t = diccionario(idioma);
  const d = t.servicios.detalle;
  const ficha = t.servicios.detallados[servicio.slug];

  const otro = serviciosDetallados.find((s) => s.slug !== servicio.slug)!;

  const bloques = [
    { rotulo: t.servicios.panel.cuandoSeNecesita, texto: ficha.cuandoSeNecesita },
    { rotulo: t.servicios.panel.marco, texto: ficha.marco },
    { rotulo: t.servicios.panel.entregable, texto: ficha.entregable },
    { rotulo: t.servicios.panel.duracion, texto: ficha.duracion },
  ];

  const duracionReferencia = `${servicio.duracionReferenciaMeses} ${t.unidades.meses}`;

  return (
    <>
      {/* ---------------- Cabecera ---------------- */}
      <section className="mx-auto w-full max-w-ancho px-6 pb-24 pt-16 md:pb-40 md:pt-24">
        <Entrada as="p" tipo="lateral" className="etiqueta text-accent-deep">
          <Enlace href={`/${idioma}#servicios`}>{d.volver}</Enlace>
        </Entrada>

        <TituloPorLineas
          indice={1}
          className="mt-8 text-3xl md:text-4xl"
          lineas={ficha.lineasTitulo}
        />

        <Entrada as="p" indice={4} className="medida mt-8 text-lg text-ink-muted">
          {ficha.elVacio}
        </Entrada>

        <div className="mt-16">{medio}</div>

        {/* Tres datos y no cuatro: el cuarto era «Ejecutado en», que salía
            de la ubicación del proyecto relacionado. La rejilla de FichaDatos
            reparte las columnas que reciba, así que tres quedan repartidos
            sin hueco vacío al final. */}
        <FichaDatos
          className="mt-16"
          inmediata
          indice={6}
          datos={[
            { rotulo: d.autoridad, valor: ficha.autoridad },
            { rotulo: d.ultimaEjecucion, valor: duracionReferencia, mono: true },
            { rotulo: d.entregable, valor: d.informeTecnico },
          ]}
        />
      </section>

      {/* ---------------- Ficha técnica ---------------- */}
      <Seccion alterna rotulo={d.fichaRotulo} titulo={d.fichaTitulo}>
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <RevealBloques bloques={bloques.slice(0, 2)} />
          <RevealBloques bloques={bloques.slice(2)} desplazado />
        </div>
      </Seccion>

      {/* ---------------- Metodología ----------------
          El brief no documenta diseño de muestreo, esfuerzo ni equipos.
          Lo único respaldado es cómo se ejecutó en campo, y así va:
          atribuido, no como método genérico.

          Ocupaba media rejilla, con «Qué lo hacía difícil» al lado. Ese
          bloque salía del proyecto relacionado y se fue con él; sin
          compañero, el método ocupa la medida de lectura y no una columna
          estrecha con la mitad derecha vacía. */}
      <Seccion rotulo={d.metodoRotulo} titulo={d.metodoTitulo}>
        <Reveal>
          <p className="medida text-lg text-ink">{ficha.metodologia}</p>
          <p className="dato mt-8 text-sm text-ink-muted">{ficha.metodologiaFuente}</p>
        </Reveal>
      </Seccion>

      {/* ---------------- Siguiente paso ---------------- */}
      <SiguientePaso idioma={idioma} alterna titulo={t.siguientePaso.tituloServicio}>
        {t.siguientePaso.textoServicio} {d.otraFicha}{" "}
        <Enlace href={`/${idioma}/servicios/${otro.slug}`}>
          {t.servicios.detallados[otro.slug].titulo.toLowerCase()}
        </Enlace>
        .
      </SiguientePaso>
    </>
  );
}

/** Bloques de la ficha, revelados en grupo con su regla. */
function RevealBloques({
  bloques,
  desplazado = false,
}: {
  bloques: readonly { rotulo: string; texto: string }[];
  desplazado?: boolean;
}) {
  return (
    <RevealGroup as="dl" regla className="flex flex-col gap-12" itemClassName="pt-6">
      {bloques.map((bloque) => (
        <div key={bloque.rotulo} className={desplazado ? "md:mt-12" : undefined}>
          <dt className="etiqueta text-ink-muted">{bloque.rotulo}</dt>
          <dd className="medida mt-3 text-ink">{bloque.texto}</dd>
        </div>
      ))}
    </RevealGroup>
  );
}
