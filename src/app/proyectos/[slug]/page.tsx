import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Boton } from "@/components/ui/Boton";
import { Enlace } from "@/components/ui/Enlace";
import { FichaDatos } from "@/components/ui/FichaDatos";
import { Foto } from "@/components/ui/Foto";
import { Seccion } from "@/components/ui/Seccion";
import { Entrada } from "@/components/motion/Entrada";
import { Reveal } from "@/components/motion/Reveal";
import { TituloPorLineas } from "@/components/motion/TituloPorLineas";
import { SiguientePaso } from "@/components/secciones/SiguientePaso";
import { proyectos } from "@/content/proyectos";
import { serviciosDetallados } from "@/content/servicios";
import siembraLadera from "@/fotos/siembra-ladera.jpg";
import trasladoMaterial from "@/fotos/traslado-material.jpg";

/* Fotografía de campo por proyecto. El alt describe lo que se ve en la
   imagen, no el servicio: el set entregado no incluye tomas de monitoreo de
   fauna ni de flora epífita. */
const fotoPorProyecto = {
  "solinter-2017": {
    imagen: siembraLadera,
    alt: "Operario de BIOMADS asegura un individuo vegetal joven en una ladera de vegetación densa durante una jornada de campo.",
  },
  "ges-2018": {
    imagen: trasladoMaterial,
    alt: "Operario traslada un bulto de material por un frente de trabajo cubierto de vegetación, junto a helechos y arbustos.",
  },
} as const;

export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = proyectos.find((p) => p.slug === slug);
  if (!proyecto) return { title: "Proyecto" };
  return {
    title: `${proyecto.clienteCorto} · ${proyecto.anio}`,
    description: proyecto.encargo,
  };
}

export default async function Pagina({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const proyecto = proyectos.find((p) => p.slug === slug);
  if (!proyecto) notFound();

  const servicio = serviciosDetallados.find((s) => s.slug === proyecto.servicio);
  const otro = proyectos.find((p) => p.slug !== proyecto.slug);
  const foto = fotoPorProyecto[proyecto.slug as keyof typeof fotoPorProyecto];

  return (
    <>
      {/* ---------------- Cabecera ---------------- */}
      <section className="mx-auto w-full max-w-ancho px-6 pb-24 pt-16 md:pb-40 md:pt-24">
        <Entrada as="p" tipo="lateral" className="etiqueta text-accent-deep">
          <Enlace href="/proyectos">Proyectos</Enlace>
        </Entrada>

        <TituloPorLineas
          indice={1}
          className="mt-8 text-3xl md:text-4xl"
          lineas={[proyecto.clienteCorto, proyecto.anio]}
        />

        <Entrada as="p" indice={4} className="medida mt-8 text-lg text-ink-muted">
          {proyecto.encargo}
        </Entrada>

        <div className="mt-16">
          <Foto
            imagen={foto.imagen}
            alt={foto.alt}
            proporcion="16/9"
            sizes="(min-width: 1200px) 1200px, 100vw"
            inmediata
            prioridad
            parallax
            indice={5}
          />
        </div>

        <FichaDatos
          className="mt-16"
          inmediata
          indice={6}
          datos={[
            { rotulo: "Cliente", valor: proyecto.clienteCorto },
            { rotulo: "Año", valor: proyecto.anio, mono: true },
            { rotulo: "Duración", valor: proyecto.duracion, mono: true },
            { rotulo: "Ubicación", valor: proyecto.ubicacion },
          ]}
        />
      </section>

      {/* ---------------- Dificultad y resolución ---------------- */}
      <Seccion alterna rotulo="El encargo" titulo="Qué lo hacía difícil y cómo se resolvió">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <Reveal regla className="pt-6">
            <p className="etiqueta text-ink-muted">La dificultad</p>
            <p className="medida mt-4 text-ink">{proyecto.dificultad}</p>
          </Reveal>

          <Reveal regla indice={1} className="pt-6">
            <p className="etiqueta text-ink-muted">Cómo se resolvió</p>
            <p className="medida mt-4 text-ink">{proyecto.resolucion}</p>
          </Reveal>
        </div>

        <Reveal as="p" className="dato mt-24 text-sm text-ink-muted">
          Razón social del cliente: {proyecto.cliente}
        </Reveal>
      </Seccion>

      {/* ---------------- Servicio relacionado ---------------- */}
      {servicio && (
        <Seccion rotulo="El servicio" titulo={servicio.titulo}>
          <div className="grid gap-16 md:grid-cols-[1fr_auto] md:gap-24">
            <Reveal as="p" className="medida text-lg text-ink">
              {servicio.elVacio}
            </Reveal>
            <Reveal indice={1}>
              <Boton href={`/servicios/${servicio.slug}`} variante="secundario">
                Ver la ficha del servicio
              </Boton>
            </Reveal>
          </div>
        </Seccion>
      )}

      {/* ---------------- Siguiente paso ---------------- */}
      <SiguientePaso alterna titulo="Cuéntenos qué tiene que radicar">
        {otro ? (
          <>
            También puede ver el otro proyecto documentado:{" "}
            <Enlace href={`/proyectos/${otro.slug}`}>
              {otro.clienteCorto}, {otro.anio}
            </Enlace>
            .
          </>
        ) : (
          "Con el alcance y la autoridad ante la que responde alcanza para armar una propuesta."
        )}
      </SiguientePaso>
    </>
  );
}
