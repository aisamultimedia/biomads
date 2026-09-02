import type { ReactNode } from "react";
import { Boton } from "@/components/ui/Boton";
import { Enlace } from "@/components/ui/Enlace";
import { FichaDatos } from "@/components/ui/FichaDatos";
import { Seccion } from "@/components/ui/Seccion";
import { Entrada } from "@/components/motion/Entrada";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { TituloPorLineas } from "@/components/motion/TituloPorLineas";
import { SiguientePaso } from "./SiguientePaso";
import { proyectos } from "@/content/proyectos";
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
 * Orden: cuándo se necesita · marco normativo · cómo se ejecuta ·
 * entregable · duración · caso relacionado. Todo sale de CONTENIDO.md.
 *
 * La cabecera entra por CSS en una secuencia: rótulo → líneas del título →
 * entradilla → foto → ficha. Es el mismo patrón de todas las páginas
 * interiores.
 */
export function DetalleServicio({ servicio, idioma, medio }: Props) {
  const t = diccionario(idioma);
  const d = t.servicios.detalle;
  const ficha = t.servicios.detallados[servicio.slug];

  const caso = proyectos.find((p) => p.slug === servicio.casoRelacionado);
  const casoTexto = caso ? t.proyectos.casos[caso.slug] : undefined;
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

        <FichaDatos
          className="mt-16"
          inmediata
          indice={6}
          datos={[
            { rotulo: d.autoridad, valor: ficha.autoridad },
            { rotulo: d.ultimaEjecucion, valor: duracionReferencia, mono: true },
            { rotulo: d.entregable, valor: d.informeTecnico },
            {
              rotulo: d.ejecutadoEn,
              valor: casoTexto ? casoTexto.ubicacion.split(" · ")[0] : "Huila",
            },
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
          Lo único respaldado es cómo se ejecutó en el proyecto real, y así
          va: atribuido, no como método genérico. */}
      <Seccion rotulo={d.metodoRotulo} titulo={d.metodoTitulo}>
        <div className="grid gap-16 md:grid-cols-[1fr_auto] md:gap-24">
          <Reveal>
            <p className="medida text-lg text-ink">{ficha.metodologia}</p>
            <p className="dato mt-8 text-sm text-ink-muted">{ficha.metodologiaFuente}</p>
          </Reveal>

          {casoTexto && (
            <RevealGroup tipos={["lateral", "texto"]} className="md:max-w-estrecho">
              <p className="etiqueta text-ink-muted">{d.dificultadTitulo}</p>
              <p className="mt-4 text-sm text-ink">{casoTexto.dificultad}</p>
            </RevealGroup>
          )}
        </div>
      </Seccion>

      {/* ---------------- Caso relacionado ---------------- */}
      {caso && casoTexto && (
        <Seccion alterna rotulo={d.casoRotulo} titulo={d.casoTitulo}>
          <div className="grid gap-16 md:grid-cols-[1fr_1fr] md:gap-24">
            <RevealGroup tipos={["titulo", "texto", "texto"]}>
              <h3 className="text-xl md:text-2xl">{casoTexto.clienteCorto}</h3>
              <p className="medida mt-4 text-ink">{casoTexto.encargo}</p>
              <div className="mt-8">
                <Boton href={`/${idioma}/proyectos/${caso.slug}`} variante="secundario">
                  {t.proyectos.verCompleto}
                </Boton>
              </div>
            </RevealGroup>

            {/* Sin "cómo se resolvió": es la misma frase que ya va arriba
                como método, y el brief no tiene otra. */}
            <FichaDatos
              datos={[
                { rotulo: t.proyectos.ficha.anio, valor: String(caso.anio), mono: true },
                {
                  rotulo: t.proyectos.ficha.duracion,
                  valor: `${caso.duracionMeses} ${t.unidades.meses}`,
                  mono: true,
                },
                { rotulo: t.proyectos.ficha.ubicacion, valor: casoTexto.ubicacion },
                { rotulo: t.proyectos.ficha.servicio, valor: casoTexto.servicioRotulo },
              ]}
            />
          </div>
        </Seccion>
      )}

      {/* ---------------- Siguiente paso ---------------- */}
      <SiguientePaso idioma={idioma} titulo={t.siguientePaso.tituloServicio}>
        {t.siguientePaso.textoServicio}{" "}
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
