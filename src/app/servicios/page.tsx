import type { Metadata } from "next";
import { Boton } from "@/components/ui/Boton";
import { Foto } from "@/components/ui/Foto";
import { Seccion } from "@/components/ui/Seccion";
import { Entrada } from "@/components/motion/Entrada";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { TituloPorLineas } from "@/components/motion/TituloPorLineas";
import { BloqueServicio } from "@/components/secciones/BloqueServicio";
import { SiguientePaso } from "@/components/secciones/SiguientePaso";
import {
  etapasEstudio,
  serviciosDetallados,
  serviciosListados,
} from "@/content/servicios";
import { diferencial } from "@/content/respaldo";
import marcacionIndividuo from "@/fotos/marcacion-individuo.jpg";
import revisionPlanta from "@/fotos/revision-planta.jpg";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Monitoreo de biodiversidad de fauna y seguimiento de flora epífita reubicada, con ficha completa. Y los demás frentes de gestión ambiental que prestamos.",
};

export default function Pagina() {
  return (
    <>
      {/* ---------------- Cabecera ---------------- */}
      <section className="mx-auto w-full max-w-ancho px-6 pb-24 pt-16 md:pb-40 md:pt-24">
        <Entrada as="p" tipo="lateral" className="etiqueta text-accent-deep">
          Servicios
        </Entrada>

        <TituloPorLineas
          indice={1}
          className="mt-8 text-3xl md:text-4xl"
          lineas={["Dos frentes documentados", "a fondo, siete más"]}
        />

        <Entrada as="p" indice={4} className="medida mt-8 text-lg text-ink-muted">
          Publicamos ficha completa de los dos servicios que podemos sustentar con un
          proyecto ejecutado. Los otros siete se nombran y nada más: si no tenemos con
          qué documentar el alcance, no lo escribimos.
        </Entrada>
      </section>

      {/* ---------------- Los dos con ficha ---------------- */}
      <Seccion alterna rotulo="Con ficha completa" titulo="Los dos que cargan el peso">
        <div className="flex flex-col gap-32">
          <BloqueServicio
            numero="01"
            servicio={serviciosDetallados[0]}
            medio={
              <Foto
                imagen={marcacionIndividuo}
                alt="Operario con chaleco reflectivo revisa y marca un individuo señalizado con estaca en medio de vegetación alta."
                proporcion="4/5"
                sizes="(min-width: 768px) 45vw, 90vw"
                parallax
              />
            }
          />
          <BloqueServicio
            numero="02"
            invertido
            servicio={serviciosDetallados[1]}
            medio={
              <Foto
                imagen={revisionPlanta}
                alt="Operario con equipo de protección junto a una planta joven de hojas anchas durante una jornada de revisión en campo."
                proporcion="4/5"
                sizes="(min-width: 768px) 45vw, 90vw"
                parallax
              />
            }
          />
        </div>
      </Seccion>

      {/* ---------------- Los siete listados ---------------- */}
      <Seccion rotulo="También" titulo="Otros servicios que prestamos">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <RevealGroup as="ul" regla className="flex flex-col">
            {serviciosListados.map((servicio) => (
              <span key={servicio} className="block py-6 text-lg text-ink">
                {servicio}
              </span>
            ))}
          </RevealGroup>

          <Reveal indice={2}>
            <p className="medida text-ink-muted">{diferencial.fortaleza}</p>
            <p className="medida mt-6 text-ink-muted">
              Lo que no tomamos: proyectos para los que no tengamos las competencias,
              los recursos ni las condiciones de ejecutarlos bien.
            </p>
            <div className="mt-8">
              <Boton href="/contacto" variante="secundario">
                Consultar un alcance
              </Boton>
            </div>
          </Reveal>
        </div>
      </Seccion>

      {/* ---------------- Etapas ----------------
          El portafolio declara los cinco rótulos y nada más. Se muestran
          como secuencia, sin descripción inventada para ninguno. Las cinco
          reglas se trazan de izquierda a derecha: se lee como un recorrido. */}
      <Seccion alterna rotulo="El recorrido" titulo="Etapas de un estudio ambiental">
        <RevealGroup
          as="ol"
          regla
          escalonado={0.1}
          className="flex flex-col md:flex-row md:gap-8"
          itemClassName="flex-1 pt-6"
        >
          {etapasEstudio.map((etapa, i) => (
            <span key={etapa} className="flex items-baseline gap-4 py-2 md:flex-col md:gap-4">
              <span className="dato text-sm text-accent-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg text-ink">{etapa}</span>
            </span>
          ))}
        </RevealGroup>
      </Seccion>

      {/* ---------------- Siguiente paso ---------------- */}
      <SiguientePaso titulo="Cuéntenos qué tiene que radicar">
        Con el alcance y la autoridad ante la que responde alcanza para armar una
        propuesta.
      </SiguientePaso>
    </>
  );
}
