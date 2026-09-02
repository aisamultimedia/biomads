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

type Props = {
  servicio: ServicioDetallado;
  /** Título partido en líneas por quien escribe, no por el ancho. */
  lineasTitulo: readonly string[];
  /** Autoridad ante la que responde, para la ficha de cabecera. */
  autoridad: string;
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
export function DetalleServicio({ servicio, lineasTitulo, autoridad, medio }: Props) {
  const caso = proyectos.find((p) => p.slug === servicio.casoRelacionado);
  const otro = serviciosDetallados.find((s) => s.slug !== servicio.slug)!;

  const bloques = [
    { rotulo: "Cuándo se necesita", texto: servicio.cuandoSeNecesita },
    { rotulo: "Marco normativo", texto: servicio.marco },
    { rotulo: "Entregable", texto: servicio.entregable },
    { rotulo: "Duración típica", texto: servicio.duracion },
  ];

  return (
    <>
      {/* ---------------- Cabecera ---------------- */}
      <section className="mx-auto w-full max-w-ancho px-6 pb-24 pt-16 md:pb-40 md:pt-24">
        <Entrada as="p" tipo="lateral" className="etiqueta text-accent-deep">
          <Enlace href="/servicios">Servicios</Enlace>
        </Entrada>

        <TituloPorLineas
          indice={1}
          className="mt-8 text-3xl md:text-4xl"
          lineas={lineasTitulo}
        />

        <Entrada as="p" indice={4} className="medida mt-8 text-lg text-ink-muted">
          {servicio.elVacio}
        </Entrada>

        <div className="mt-16">{medio}</div>

        <FichaDatos
          className="mt-16"
          inmediata
          indice={6}
          datos={[
            { rotulo: "Autoridad", valor: autoridad },
            { rotulo: "Última ejecución", valor: servicio.duracionReferencia, mono: true },
            { rotulo: "Entregable", valor: "Informe técnico" },
            {
              rotulo: "Ejecutado en",
              valor: caso ? caso.ubicacion.split(" · ")[0] : "Huila",
            },
          ]}
        />
      </section>

      {/* ---------------- Ficha técnica ---------------- */}
      <Seccion alterna rotulo="La ficha" titulo="Qué cubre y bajo qué marco">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <RevealBloques bloques={bloques.slice(0, 2)} />
          <RevealBloques bloques={bloques.slice(2)} desplazado />
        </div>
      </Seccion>

      {/* ---------------- Metodología ----------------
          El brief no documenta diseño de muestreo, esfuerzo ni equipos.
          Lo único respaldado es cómo se ejecutó en el proyecto real, y así
          va: atribuido, no como método genérico. */}
      <Seccion rotulo="Cómo se ejecuta" titulo="Método aplicado en campo">
        <div className="grid gap-16 md:grid-cols-[1fr_auto] md:gap-24">
          <Reveal>
            <p className="medida text-lg text-ink">{servicio.metodologia}</p>
            <p className="dato mt-8 text-sm text-ink-muted">{servicio.metodologiaFuente}</p>
          </Reveal>

          {caso && (
            <RevealGroup tipos={["lateral", "texto"]} className="md:max-w-[34ch]">
              <p className="etiqueta text-ink-muted">Qué lo hacía difícil</p>
              <p className="mt-4 text-sm text-ink">{caso.dificultad}</p>
            </RevealGroup>
          )}
        </div>
      </Seccion>

      {/* ---------------- Caso relacionado ---------------- */}
      {caso && (
        <Seccion alterna rotulo="Caso relacionado" titulo="Dónde se ejecutó">
          <div className="grid gap-16 md:grid-cols-[1fr_1fr] md:gap-24">
            <RevealGroup tipos={["titulo", "texto", "texto"]}>
              <h3 className="text-xl md:text-2xl">{caso.clienteCorto}</h3>
              <p className="medida mt-4 text-ink">{caso.encargo}</p>
              <div className="mt-8">
                <Boton href={`/proyectos/${caso.slug}`} variante="secundario">
                  Ver el proyecto
                </Boton>
              </div>
            </RevealGroup>

            {/* Sin "cómo se resolvió": es la misma frase que ya va arriba
                como método, y el brief no tiene otra. */}
            <FichaDatos
              datos={[
                { rotulo: "Año", valor: caso.anio, mono: true },
                { rotulo: "Duración", valor: caso.duracion, mono: true },
                { rotulo: "Ubicación", valor: caso.ubicacion },
                { rotulo: "Servicio", valor: caso.servicioRotulo },
              ]}
            />
          </div>
        </Seccion>
      )}

      {/* ---------------- Siguiente paso ---------------- */}
      <SiguientePaso titulo="Cuéntenos el alcance y la autoridad">
        Con eso alcanza para estimar campañas, duración y equipo. También puede revisar
        el otro frente que documentamos a fondo:{" "}
        <Enlace href={`/servicios/${otro.slug}`}>{otro.titulo.toLowerCase()}</Enlace>.
      </SiguientePaso>
    </>
  );
}

/** Columna de bloques rótulo + texto: cada uno traza su regla y se asienta. */
function RevealBloques({
  bloques,
  desplazado = false,
}: {
  bloques: readonly { rotulo: string; texto: string }[];
  desplazado?: boolean;
}) {
  return (
    <dl className="flex flex-col gap-16">
      {bloques.map((bloque, i) => (
        <Reveal key={bloque.rotulo} regla indice={desplazado ? i + 1 : i} className="pt-6">
          <dt className="etiqueta text-ink-muted">{bloque.rotulo}</dt>
          <dd className="medida mt-4 text-ink">{bloque.texto}</dd>
        </Reveal>
      ))}
    </dl>
  );
}
