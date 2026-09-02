import type { Metadata } from "next";
import { FichaDatos } from "@/components/ui/FichaDatos";
import { Foto } from "@/components/ui/Foto";
import { Seccion } from "@/components/ui/Seccion";
import { Entrada } from "@/components/motion/Entrada";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { TituloPorLineas } from "@/components/motion/TituloPorLineas";
import { SiguientePaso } from "@/components/secciones/SiguientePaso";
import { diferencial, equipo, habilitaciones, regiones } from "@/content/respaldo";
import { empresa } from "@/lib/site";
import controlFitosanitario from "@/fotos/control-fitosanitario.jpg";
import cuadrillaLadera from "@/fotos/cuadrilla-ladera.jpg";
import mantenimientoIndividuo from "@/fotos/mantenimiento-individuo.jpg";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "BIOMADS S.A.S: equipo permanente de unas diez personas en Ibagué más especialistas vinculados por proyecto. Constituida en 2017. Proyectos en Antioquia y Huila.",
};

/* Institucional del portafolio. Existe, pero no es argumento de venta:
   vive en una sección secundaria y no abre la página. */
const institucional = [
  {
    rotulo: "Misión",
    texto:
      "Desarrollar proyectos con excelencia y compromiso, promoviendo la sostenibilidad y el respeto por los recursos naturales.",
  },
  {
    rotulo: "Visión",
    texto:
      "Ser una empresa líder a nivel nacional en soluciones ambientales integrales, reconocida por su innovación, excelencia operativa y compromiso con el desarrollo sostenible.",
  },
  {
    rotulo: "Política de calidad",
    texto:
      "Planificar, ejecutar y supervisar proyectos ambientales con altos estándares de calidad, sostenibilidad y responsabilidad; procesos eficientes y mejora continua, garantizando el cumplimiento de la normatividad ambiental vigente y la satisfacción de los clientes.",
  },
];

const valores = [
  "Excelencia técnica",
  "Sostenibilidad activa",
  "Integridad y transparencia",
  "Innovación ambiental",
  "Compromiso social",
];

export default function Pagina() {
  return (
    <>
      {/* ---------------- Cabecera: el tamaño, dicho de frente ---------------- */}
      <section className="mx-auto w-full max-w-ancho px-6 pb-24 pt-16 md:pb-40 md:pt-24">
        <Entrada as="p" tipo="lateral" className="etiqueta text-accent-deep">
          Nosotros
        </Entrada>

        <TituloPorLineas
          indice={1}
          className="mt-8 text-3xl md:text-4xl"
          lineas={["Somos unos diez.", "El equipo lo arma el proyecto"]}
        />

        <Entrada as="p" indice={4} className="medida mt-8 text-lg text-ink-muted">
          {diferencial.fortaleza}
        </Entrada>

        <FichaDatos
          className="mt-16"
          inmediata
          indice={5}
          datos={[
            { rotulo: "Constituida", valor: String(empresa.constitucion), mono: true },
            { rotulo: "Sede", valor: empresa.sede },
            { rotulo: "Equipo permanente", valor: `${equipo.permanentes} personas`, mono: true },
            { rotulo: "Proyectos en", valor: regiones.join(" y ") },
          ]}
        />
      </section>

      {/* ---------------- Modelo de trabajo ---------------- */}
      <Seccion alterna rotulo="Cómo trabajamos" titulo="Un modelo mixto, sin disfrazarlo">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <Reveal>
              <p className="medida text-lg text-ink">{equipo.modelo}</p>
              <p className="medida mt-6 text-ink-muted">
                Esa es la ventaja de ser pequeños: el equipo se define por lo que el
                proyecto necesita, no por quién está disponible en la nómina. Y quien
                contrata habla con quien ejecuta.
              </p>
            </Reveal>

            <Reveal regla indice={1} className="mt-16 pt-6">
              <p className="etiqueta text-ink-muted">Estructura permanente</p>
              <ul className="mt-4 flex flex-col gap-2">
                {equipo.perfilesPermanentes.map((perfil) => (
                  <li key={perfil} className="flex items-baseline gap-3 text-ink">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 flex-none translate-y-[-0.15em] rounded-sm bg-accent"
                    />
                    {perfil}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink-muted">Todos con tarjeta profesional.</p>
            </Reveal>
          </div>

          {/* Doce reglas que se trazan una tras otra: la lista más larga del
              sitio se lee como una ficha de campo, no como un bloque. */}
          <div>
            <Reveal as="p" tipo="lateral" className="etiqueta text-ink-muted">
              Se vinculan por proyecto
            </Reveal>
            <RevealGroup as="ul" regla className="mt-4 flex flex-col" itemClassName="py-3">
              {equipo.especialistas.map((especialista) => (
                <span key={especialista} className="block text-ink">
                  {especialista}
                </span>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Seccion>

      {/* ---------------- Trabajo en campo ---------------- */}
      <Seccion rotulo="En campo" titulo="Dónde pasa el trabajo">
        <div className="grid gap-6 md:grid-cols-3">
          <Foto
            imagen={cuadrillaLadera}
            alt="Dos operarios ascienden una ladera cubierta de pasto alto en una zona de compensación, con estacas de señalización y árboles jóvenes plantados."
            proporcion="4/5"
            sizes="(min-width: 768px) 30vw, 90vw"
          />
          <Foto
            indice={1}
            imagen={mantenimientoIndividuo}
            alt="Operario con sombrero y guantes revisa un árbol joven rodeado de material vegetal seco durante una jornada de mantenimiento."
            proporcion="4/5"
            sizes="(min-width: 768px) 30vw, 90vw"
          />
          <Foto
            indice={2}
            imagen={controlFitosanitario}
            alt="Operario con traje de protección, respirador y aspersor de espalda aplicando tratamiento sobre vegetación en campo abierto."
            proporcion="4/5"
            sizes="(min-width: 768px) 30vw, 90vw"
          />
        </div>
      </Seccion>

      {/* ---------------- Qué no aceptamos + habilitaciones ---------------- */}
      <Seccion alterna rotulo="Los límites" titulo="Lo que no tomamos">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <Reveal as="p" className="medida text-lg text-ink">
            {diferencial.loQueNoAceptan}
          </Reveal>

          <Reveal regla indice={1} className="pt-6">
            <p className="etiqueta text-ink-muted">Habilitaciones</p>
            <dl className="mt-4 flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-6">
                <dt className="text-ink">RUP</dt>
                <dd className="dato text-sm text-ink-muted">{habilitaciones.rup}</dd>
              </div>
            </dl>
            <p className="mt-6 text-sm text-ink-muted">
              Lo decimos tal como está. No presentamos como obtenido lo que todavía está
              en proceso.
            </p>
          </Reveal>
        </div>
      </Seccion>

      {/* ---------------- Institucional ----------------
          Existe y puede consultarse, pero no abre la página ni es
          argumento de venta: es lo mismo que dice toda consultora. */}
      <Seccion rotulo="Marco institucional" titulo="Misión, visión y valores">
        <div className="grid gap-16 md:grid-cols-[1fr_auto] md:gap-24">
          <dl className="flex flex-col gap-12">
            {institucional.map((bloque, i) => (
              <Reveal key={bloque.rotulo} regla indice={i} className="pt-6">
                <dt className="etiqueta text-ink-muted">{bloque.rotulo}</dt>
                <dd className="medida mt-4 text-ink">{bloque.texto}</dd>
              </Reveal>
            ))}
          </dl>

          <Reveal regla indice={1} className="pt-6 md:max-w-[30ch]">
            <p className="etiqueta text-ink-muted">Valores</p>
            <ul className="mt-4 flex flex-col gap-2">
              {valores.map((valor) => (
                <li key={valor} className="flex items-baseline gap-3 text-ink">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 flex-none translate-y-[-0.15em] rounded-sm bg-accent"
                  />
                  {valor}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Seccion>

      {/* ---------------- Siguiente paso ---------------- */}
      <SiguientePaso alterna titulo="Hable directo con quien va a ejecutar">
        En una empresa de unas diez personas no hay capa comercial de por medio.
      </SiguientePaso>
    </>
  );
}
