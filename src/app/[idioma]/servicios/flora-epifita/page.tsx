import type { Metadata } from "next";
import { Foto } from "@/components/ui/Foto";
import { DetalleServicio } from "@/components/secciones/DetalleServicio";
import { serviciosDetallados } from "@/content/servicios";
import { diccionario, comoIdioma } from "@/idioma";
import siembraVia from "@/fotos/siembra-via.jpg";

const servicio = serviciosDetallados.find((s) => s.slug === "flora-epifita")!;

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]/servicios/flora-epifita">): Promise<Metadata> {
  const { idioma: segmento } = await params;
  const idioma = comoIdioma(segmento);
  const ficha = diccionario(idioma).servicios.detallados["flora-epifita"];
  return { title: ficha.metaTitulo, description: ficha.metaDescripcion };
}

export default async function Pagina({ params }: PageProps<"/[idioma]/servicios/flora-epifita">) {
  const { idioma: segmento } = await params;
  const idioma = comoIdioma(segmento);
  const t = diccionario(idioma);

  return (
    <DetalleServicio
      servicio={servicio}
      idioma={idioma}
      medio={
        <Foto
          imagen={siembraVia}
          alt={t.fotos["siembra-via"]}
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
