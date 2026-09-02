import type { Metadata } from "next";
import { FichaDatos } from "@/components/ui/FichaDatos";
import { Foto } from "@/components/ui/Foto";
import { Seccion } from "@/components/ui/Seccion";
import { Entrada } from "@/components/motion/Entrada";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { TituloPorLineas } from "@/components/motion/TituloPorLineas";
import { SiguientePaso } from "@/components/secciones/SiguientePaso";
import { TarjetaCaso } from "@/components/secciones/TarjetaCaso";
import { proyectos } from "@/content/proyectos";
import { regiones } from "@/content/respaldo";
import { diccionario, comoIdioma } from "@/idioma";
import parcelaEstacas from "@/fotos/parcela-estacas.jpg";

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]/proyectos">): Promise<Metadata> {
  const { idioma: segmento } = await params;
  const idioma = comoIdioma(segmento);
  const t = diccionario(idioma);
  return { title: t.meta.tituloProyectos, description: t.meta.descripcionProyectos };
}

export default async function Pagina({ params }: PageProps<"/[idioma]/proyectos">) {
  const { idioma: segmento } = await params;
  const idioma = comoIdioma(segmento);
  const t = diccionario(idioma);

  return (
    <>
      {/* ---------------- Cabecera ----------------
          Mismo orden que en las páginas de detalle: rótulo → título →
          entradilla → foto → ficha. */}
      <section className="mx-auto w-full max-w-ancho px-6 pb-24 pt-16 md:pb-40 md:pt-24">
        <Entrada as="p" tipo="lateral" className="etiqueta text-accent-deep">
          {t.proyectos.rotulo}
        </Entrada>

        <TituloPorLineas
          indice={1}
          className="mt-8 text-3xl md:text-4xl"
          lineas={t.proyectos.indice.lineasTitulo}
        />

        {/* Antes esta entradilla abría con las cuatro recontrataciones de un
            mismo cliente. Se retiró por decisión del cliente: la relación
            existe y está en CONTENIDO.md, pero no es lo que se destaca. */}
        <Entrada as="p" indice={4} className="medida mt-8 text-lg text-ink-muted">
          {t.proyectos.indice.entradilla}
        </Entrada>

        <div className="mt-16">
          <Foto
            imagen={parcelaEstacas}
            alt={t.fotos["parcela-estacas"]}
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
            {
              rotulo: t.proyectos.indice.conFichaCompleta,
              valor: String(proyectos.length),
              mono: true,
            },
            {
              rotulo: t.proyectos.indice.regiones,
              valor: regiones.join(` ${t.unidades.y} `),
            },
            {
              rotulo: t.proyectos.indice.anios,
              valor: proyectos.map((p) => p.anio).join(" · "),
              mono: true,
            },
            {
              rotulo: t.proyectos.indice.duraciones,
              valor: `${proyectos.map((p) => p.duracionMeses).join(` ${t.unidades.y} `)} ${t.unidades.meses}`,
              mono: true,
            },
          ]}
        />
      </section>

      {/* ---------------- Los dos casos ---------------- */}
      <Seccion rotulo={t.proyectos.indice.casosRotulo} titulo={t.proyectos.titulo}>
        <div className="flex flex-col gap-24">
          {proyectos.map((proyecto) => (
            <TarjetaCaso
              key={proyecto.slug}
              proyecto={proyecto}
              idioma={idioma}
              textos={t.proyectos}
              unidades={t.unidades}
            />
          ))}
        </div>
      </Seccion>

      {/* ---------------- Alcance real ----------------
          Cobertura declarada: Antioquia y Huila. No se dice nacional. */}
      <Seccion
        alterna
        rotulo={t.proyectos.indice.dondeRotulo}
        titulo={t.proyectos.indice.dondeTitulo}
      >
        <div className="grid gap-16 md:grid-cols-[auto_1fr] md:gap-24">
          <RevealGroup as="ul" regla className="flex flex-col">
            {regiones.map((region) => (
              <span key={region} className="block py-6 text-2xl text-ink md:text-3xl">
                {region}
              </span>
            ))}
          </RevealGroup>

          <Reveal as="p" indice={2} className="text-ink-muted md:max-w-estrecho">
            {t.proyectos.indice.dondeTexto}
          </Reveal>
        </div>
      </Seccion>

      {/* ---------------- Siguiente paso ---------------- */}
      <SiguientePaso idioma={idioma} titulo={t.siguientePaso.tituloProyectos}>
        {t.siguientePaso.textoProyectos}
      </SiguientePaso>
    </>
  );
}
