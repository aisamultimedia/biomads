import type { Metadata } from "next";
import { Boton } from "@/components/ui/Boton";
import { Enlace } from "@/components/ui/Enlace";
import { Seccion } from "@/components/ui/Seccion";
import { Entrada } from "@/components/motion/Entrada";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { TituloPorLineas } from "@/components/motion/TituloPorLineas";
import { FichaProyecto } from "@/components/secciones/FichaProyecto";
import { proyectos } from "@/content/proyectos";
import { diccionario, comoIdioma } from "@/idioma";
import { whatsapp } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]/proyectos">): Promise<Metadata> {
  const { idioma: segmento } = await params;
  const idioma = comoIdioma(segmento);
  const t = diccionario(idioma);
  return {
    title: t.meta.tituloProyectos,
    description: t.meta.descripcionProyectos,
    alternates: { canonical: `/${idioma}/proyectos` },
  };
}

/**
 * Las seis fichas técnicas, una debajo de otra.
 *
 * Es la única página interior del sitio, y existe porque hay algo que no
 * cabe en la portada: cliente, periodo, sector, servicio, alcance y la
 * resolución bajo la que se ejecutó cada proyecto. La portada enseña tres
 * en resumen y trae aquí; aquí están los seis, con todo.
 *
 * Cada ficha lleva el `id` de su clave, así que las tarjetas del home
 * enlazan directamente a la suya y el enlace se puede compartir.
 *
 * La cabecera entra por CSS en la misma secuencia que el resto de páginas
 * interiores: rótulo → líneas del título → entradilla.
 */
export default async function Proyectos({ params }: PageProps<"/[idioma]/proyectos">) {
  const { idioma: segmento } = await params;
  const idioma = comoIdioma(segmento);
  const t = diccionario(idioma);
  const d = t.proyectos.indice;

  return (
    <>
      <section className="mx-auto w-full max-w-ancho px-6 pb-16 pt-16 md:pb-24 md:pt-24">
        <Entrada as="p" tipo="lateral" className="etiqueta text-accent-deep">
          <Enlace href={`/${idioma}`}>{d.volver}</Enlace>
        </Entrada>

        <TituloPorLineas
          indice={1}
          className="mt-8 max-w-titulo-seccion text-3xl md:text-4xl"
          lineas={d.lineasTitulo}
        />

        <Entrada as="p" indice={4} className="medida mt-8 text-lg text-ink-muted">
          {d.entradilla}
        </Entrada>
      </section>

      <Seccion alterna>
        <RevealGroup as="ul" tipo="panel" className="flex flex-col gap-6">
          {proyectos.map((proyecto) => (
            <FichaProyecto
              key={proyecto.slug}
              proyecto={proyecto}
              textos={t.proyectos}
              unidades={t.unidades}
              fotos={t.fotos}
              variante="completa"
            />
          ))}
        </RevealGroup>
      </Seccion>

      <Seccion>
        <div className="grid gap-16 md:grid-cols-[1fr_auto] md:items-end md:gap-24">
          <RevealGroup tipos={["lateral", "titulo", "texto"]}>
            <p className="etiqueta text-accent-deep">{t.contacto.rotulo}</p>
            <h2 className="mt-4 max-w-titulo-seccion text-2xl md:text-3xl">
              {d.siguienteTitulo}
            </h2>
            <p className="medida mt-6 text-lg text-ink-muted">{d.siguienteTexto}</p>
          </RevealGroup>

          <Reveal indice={2}>
            <div className="flex flex-wrap gap-4">
              <Boton href={`/${idioma}#formulario`}>
                {t.siguientePaso.solicitarPropuesta}
              </Boton>
              <Boton href={whatsapp} variante="secundario" externo>
                {t.contacto.formulario.escribirWhatsapp}
              </Boton>
            </div>
          </Reveal>
        </div>
      </Seccion>
    </>
  );
}
