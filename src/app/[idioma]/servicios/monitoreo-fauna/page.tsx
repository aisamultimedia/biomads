import type { Metadata } from "next";
import { Foto } from "@/components/ui/Foto";
import { DetalleServicio } from "@/components/secciones/DetalleServicio";
import { serviciosDetallados } from "@/content/servicios";
import { diccionario, comoIdioma } from "@/idioma";
import areaEstudio from "@/fotos/area-estudio.jpg";

const servicio = serviciosDetallados.find((s) => s.slug === "monitoreo-fauna")!;

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]/servicios/monitoreo-fauna">): Promise<Metadata> {
  const { idioma: segmento } = await params;
  const idioma = comoIdioma(segmento);
  const ficha = diccionario(idioma).servicios.detallados["monitoreo-fauna"];
  return { title: ficha.metaTitulo, description: ficha.metaDescripcion };
}

export default async function Pagina({ params }: PageProps<"/[idioma]/servicios/monitoreo-fauna">) {
  const { idioma: segmento } = await params;
  const idioma = comoIdioma(segmento);
  const t = diccionario(idioma);

  return (
    <DetalleServicio
      servicio={servicio}
      idioma={idioma}
      medio={
        <Foto
          imagen={areaEstudio}
          alt={t.fotos["area-estudio"]}
          proporcion="16/9"
          sizes="(min-width: 1200px) 1200px, 100vw"
          inmediata
          prioridad
          parallax
          indice={5}
        />
      }
    />
  );
}
