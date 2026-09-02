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
import { diccionario, type ClaveFoto, comoIdioma } from "@/idioma";
import siembraLadera from "@/fotos/siembra-ladera.jpg";
import trasladoMaterial from "@/fotos/traslado-material.jpg";

/* Fotografía de campo por proyecto. El texto alternativo vive en el
   diccionario y describe lo que se ve en la imagen, no el servicio: el set
   entregado no incluye tomas de monitoreo de fauna ni de flora epífita. */
const fotoPorProyecto: Record<string, { imagen: typeof siembraLadera; clave: ClaveFoto }> = {
  "solinter-2017": { imagen: siembraLadera, clave: "siembra-ladera" },
  "ges-2018": { imagen: trasladoMaterial, clave: "traslado-material" },
};

export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]/proyectos/[slug]">): Promise<Metadata> {
  const { idioma: segmento, slug } = await params;
  const idioma = comoIdioma(segmento);
  const t = diccionario(idioma);
  const proyecto = proyectos.find((p) => p.slug === slug);
  if (!proyecto) return { title: t.proyectos.rotulo };

  const caso = t.proyectos.casos[proyecto.slug];
  return {
    title: `${caso.clienteCorto} · ${proyecto.anio}`,
    description: caso.encargo,
  };
}

export default async function Pagina({ params }: PageProps<"/[idioma]/proyectos/[slug]">) {
  const { idioma: segmento, slug } = await params;
  const idioma = comoIdioma(segmento);
  const proyecto = proyectos.find((p) => p.slug === slug);
  if (!proyecto) notFound();

  const t = diccionario(idioma);
  const caso = t.proyectos.casos[proyecto.slug];
  const d = t.proyectos.detalle;

  const servicio = serviciosDetallados.find((s) => s.slug === proyecto.servicio);
  const otro = proyectos.find((p) => p.slug !== proyecto.slug);
  const foto = fotoPorProyecto[proyecto.slug];

  return (
    <>
      {/* ---------------- Cabecera ---------------- */}
      <section className="mx-auto w-full max-w-ancho px-6 pb-24 pt-16 md:pb-40 md:pt-24">
        <Entrada as="p" tipo="lateral" className="etiqueta text-accent-deep">
          <Enlace href={`/${idioma}/proyectos`}>{t.proyectos.rotulo}</Enlace>
        </Entrada>

        <TituloPorLineas
          indice={1}
          className="mt-8 text-3xl md:text-4xl"
          lineas={[caso.clienteCorto, String(proyecto.anio)]}
        />

        <Entrada as="p" indice={4} className="medida mt-8 text-lg text-ink-muted">
          {caso.encargo}
        </Entrada>

        <div className="mt-16">
          <Foto
            imagen={foto.imagen}
            alt={t.fotos[foto.clave]}
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
            { rotulo: d.cliente, valor: caso.clienteCorto },
            { rotulo: t.proyectos.ficha.anio, valor: String(proyecto.anio), mono: true },
            {
              rotulo: t.proyectos.ficha.duracion,
              valor: `${proyecto.duracionMeses} ${t.unidades.meses}`,
              mono: true,
            },
            { rotulo: t.proyectos.ficha.ubicacion, valor: caso.ubicacion },
          ]}
        />
      </section>

      {/* ---------------- Dificultad y resolución ---------------- */}
      <Seccion alterna rotulo={d.encargoRotulo} titulo={d.encargoTitulo}>
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <Reveal regla className="pt-6">
            <p className="etiqueta text-ink-muted">{t.proyectos.dificultadRotulo}</p>
            <p className="medida mt-4 text-ink">{caso.dificultad}</p>
          </Reveal>

          <Reveal regla indice={1} className="pt-6">
            <p className="etiqueta text-ink-muted">{t.proyectos.resolucionRotulo}</p>
            <p className="medida mt-4 text-ink">{caso.resolucion}</p>
          </Reveal>
        </div>

        <Reveal as="p" className="dato mt-24 text-sm text-ink-muted">
          {d.razonSocial}: {caso.cliente}
        </Reveal>
      </Seccion>

      {/* ---------------- Servicio relacionado ---------------- */}
      {servicio && (
        <Seccion
          rotulo={d.servicioRotulo}
          titulo={t.servicios.detallados[servicio.slug].titulo}
        >
          <div className="grid gap-16 md:grid-cols-[1fr_auto] md:gap-24">
            <Reveal as="p" className="medida text-lg text-ink">
              {t.servicios.detallados[servicio.slug].elVacio}
            </Reveal>
            <Reveal indice={1}>
              <Boton href={`/${idioma}/servicios/${servicio.slug}`} variante="secundario">
                {d.verFichaServicio}
              </Boton>
            </Reveal>
          </div>
        </Seccion>
      )}

      {/* ---------------- Siguiente paso ---------------- */}
      <SiguientePaso idioma={idioma} alterna titulo={t.contacto.titulo}>
        {otro ? (
          <>
            {d.otroProyecto}{" "}
            <Enlace href={`/${idioma}/proyectos/${otro.slug}`}>
              {t.proyectos.casos[otro.slug].clienteCorto}, {otro.anio}
            </Enlace>
            .
          </>
        ) : (
          t.contacto.intro
        )}
      </SiguientePaso>
    </>
  );
}
