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
import parcelaEstacas from "@/fotos/parcela-estacas.jpg";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos ejecutados por BIOMADS en Huila: monitoreo de fauna para EIA de vías terciarias (SOLINTER, 2017) y seguimiento de flora epífita en El Quimbo (GES, 2018).",
};

export default function Pagina() {
  return (
    <>
      {/* ---------------- Cabecera ----------------
          Mismo orden que en las páginas de detalle: rótulo → título →
          entradilla → foto → ficha. */}
      <section className="mx-auto w-full max-w-ancho px-6 pb-24 pt-16 md:pb-40 md:pt-24">
        <Entrada as="p" tipo="lateral" className="etiqueta text-accent-deep">
          Proyectos
        </Entrada>

        <TituloPorLineas
          indice={1}
          className="mt-8 text-3xl md:text-4xl"
          lineas={["Lo que hemos ejecutado,", "con nombre y duración"]}
        />

        <Entrada as="p" indice={4} className="medida mt-8 text-lg text-ink-muted">
          Dos proyectos con ficha completa y un cliente que nos ha vuelto a contratar
          cuatro veces. Publicamos lo que podemos sustentar: no hay contador de
          proyectos ni años acumulados en esta página.
        </Entrada>

        <div className="mt-16">
          <Foto
            imagen={parcelaEstacas}
            alt="Parcela de siembra junto a una vía, con individuos jóvenes alineados, estacas de señalización y un operario trasladando material en carretilla."
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
            { rotulo: "Con ficha completa", valor: String(proyectos.length), mono: true },
            { rotulo: "Regiones", valor: regiones.join(" y ") },
            { rotulo: "Años", valor: "2017 · 2018", mono: true },
            { rotulo: "Duraciones", valor: "6 y 8 meses", mono: true },
          ]}
        />
      </section>


      {/* ---------------- Los dos casos ---------------- */}
      <Seccion rotulo="Casos" titulo="Ejecutados y verificables">
        <div className="flex flex-col gap-24">
          {proyectos.map((proyecto) => (
            <TarjetaCaso key={proyecto.slug} proyecto={proyecto} />
          ))}
        </div>
      </Seccion>

      {/* ---------------- Alcance real ----------------
          Cobertura declarada: Antioquia y Huila. No se dice nacional. */}
      <Seccion alterna rotulo="Dónde" titulo="Regiones con proyectos ejecutados">
        <div className="grid gap-16 md:grid-cols-[auto_1fr] md:gap-24">
          <RevealGroup as="ul" regla className="flex flex-col">
            {regiones.map((region) => (
              <span key={region} className="block py-6 text-2xl text-ink md:text-3xl">
                {region}
              </span>
            ))}
          </RevealGroup>

          <Reveal as="p" indice={2} className="text-ink-muted md:max-w-[42ch]">
            Ahí están los proyectos que podemos documentar. Trabajamos desde Ibagué y
            nos desplazamos según lo pida el frente, pero no vamos a decirle que
            tenemos cobertura nacional para ganarnos una invitación.
          </Reveal>
        </div>
      </Seccion>

      {/* ---------------- Siguiente paso ---------------- */}
      <SiguientePaso titulo="¿Necesita referencias de un frente parecido?">
        Pídanos el detalle del proyecto que más se acerque al suyo y le contamos cómo
        se ejecutó.
      </SiguientePaso>
    </>
  );
}
