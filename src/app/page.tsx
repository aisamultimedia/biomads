import type { Metadata } from "next";
import { Boton } from "@/components/ui/Boton";
import { Enlace } from "@/components/ui/Enlace";
import { Foto } from "@/components/ui/Foto";
import { Icono } from "@/components/ui/Icono";
import { Seccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Clientes } from "@/components/secciones/Clientes";
import { EtapasEstudio } from "@/components/secciones/EtapasEstudio";
import { FichaServicio } from "@/components/secciones/FichaServicio";
import { FormularioContacto } from "@/components/secciones/FormularioContacto";
import { Hero } from "@/components/secciones/Hero";
import { MarcoInstitucional } from "@/components/secciones/MarcoInstitucional";
import { TarjetaCaso } from "@/components/secciones/TarjetaCaso";
import { quienesSomos } from "@/content/institucional";
import { proyectos } from "@/content/proyectos";
import { diferencial, equipo, regiones } from "@/content/respaldo";
import { serviciosDetallados, serviciosListados } from "@/content/servicios";
import { empresa, mailto, whatsapp } from "@/lib/site";
import controlFitosanitario from "@/fotos/control-fitosanitario.jpg";
import cuadrillaLadera from "@/fotos/cuadrilla-ladera.jpg";
import mantenimientoIndividuo from "@/fotos/mantenimiento-individuo.jpg";

export const metadata: Metadata = {
  description:
    "BIOMADS S.A.S — estudios y gestión ambiental desde Ibagué. Monitoreo de biodiversidad de fauna y seguimiento de flora epífita reubicada, con registros verificables.",
};

/**
 * Página única.
 *
 * Todo el recorrido vive aquí, en secciones ancladas: nosotros, las etapas
 * del estudio ambiental, servicios, proyectos y contacto. Las páginas de
 * detalle siguen existiendo para quien llegue por buscador o comparta un
 * enlace, pero la visita normal no sale de esta pantalla.
 */
export default function Home() {
  return (
    <>
      <Hero />

      {/* ================================================================
          Nosotros — inmediatamente después del hero.
          ================================================================ */}
      <Seccion
        id="nosotros"
        rotulo="¿Quiénes somos?"
        titulo="Somos unos diez. El equipo lo arma el proyecto"
      >
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <Reveal as="p" className="medida text-lg text-ink">
              {quienesSomos}
            </Reveal>

            <Reveal as="p" indice={1} className="medida mt-6 text-ink-muted">
              {diferencial.fortaleza}
            </Reveal>

            <Reveal regla className="mt-12 pt-6">
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

            <Reveal regla className="mt-12 pt-6">
              <p className="etiqueta text-ink-muted">Se vinculan por proyecto</p>
              <p className="medida mt-4 text-sm text-ink">
                {equipo.especialistas.join(" · ")}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Foto
              className="col-span-2"
              imagen={cuadrillaLadera}
              alt="Dos operarios de BIOMADS ascienden una ladera cubierta de pasto alto en una zona de compensación, con estacas de señalización y árboles jóvenes plantados."
              proporcion="16/9"
              sizes="(min-width: 768px) 45vw, 90vw"
            />
            <Foto
              imagen={mantenimientoIndividuo}
              alt="Operario con sombrero y guantes revisa un árbol joven rodeado de material vegetal seco durante una jornada de mantenimiento."
              proporcion="1/1"
              sizes="(min-width: 768px) 22vw, 45vw"
            />
            <Foto
              imagen={controlFitosanitario}
              alt="Operario con traje de protección, respirador y aspersor de espalda aplicando tratamiento sobre vegetación en campo abierto."
              proporcion="1/1"
              sizes="(min-width: 768px) 22vw, 45vw"
            />
          </div>
        </div>

        {/* Misión, visión, valores y política. Al final de la sección, nunca
            abriéndola: es lo mismo que declara toda consultora del sector. */}
        <MarcoInstitucional />
      </Seccion>

      {/* ================================================================
          Las cinco etapas del estudio ambiental, en banda oscura.
          ================================================================ */}
      <EtapasEstudio />

      {/* ================================================================
          Servicios — título y resumen a la vista; la ficha, al abrir.
          ================================================================ */}
      <Seccion
        id="servicios"
        alterna
        rotulo="Servicios"
        titulo="Dos frentes documentados a fondo"
      >
        <div className="grid gap-8 md:grid-cols-2">
          {serviciosDetallados.map((servicio, i) => (
            <FichaServicio
              key={servicio.slug}
              servicio={servicio}
              numero={String(i + 1).padStart(2, "0")}
              caso={proyectos.find((p) => p.slug === servicio.casoRelacionado)}
            />
          ))}
        </div>

        <div className="mt-24 grid gap-16 md:grid-cols-2 md:gap-24">
          <RevealGroup as="ul" regla className="flex flex-col" itemClassName="py-5">
            {serviciosListados.map((servicio) => (
              <span key={servicio.nombre} className="flex items-center gap-4 text-lg text-ink">
                <Icono nombre={servicio.icono} className="text-accent-deep" />
                {servicio.nombre}
              </span>
            ))}
          </RevealGroup>

          <Reveal>
            <p className="etiqueta text-ink-muted">También prestamos</p>
            <p className="medida mt-4 text-ink-muted">
              Sin ficha publicada. Si el frente no está dentro de nuestras
              competencias, lo decimos.
            </p>
            <div className="mt-8">
              <Boton href="#contacto" variante="secundario">
                Consultar un alcance
              </Boton>
            </div>
          </Reveal>
        </div>
      </Seccion>

      {/* ================================================================
          Proyectos, con el espacio reservado para las constancias.
          ================================================================ */}
      <Seccion id="proyectos" rotulo="Proyectos" titulo="Ejecutados y verificables">
        <div className="flex flex-col gap-24">
          {proyectos.map((proyecto) => (
            <TarjetaCaso key={proyecto.slug} proyecto={proyecto} />
          ))}
        </div>

        {/* Espacio reservado para los certificados. Cuando lleguen los PDF
            entran en estas ranuras sin mover nada del layout. */}
        <Reveal regla className="mt-24 pt-8">
          <p className="etiqueta text-ink-muted">Certificados y constancias</p>
          <p className="medida mt-4 text-ink-muted">
            Se publican aquí en PDF. Mientras tanto las enviamos por correo a quien
            las pida.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proyectos.map((proyecto) => (
              <div key={proyecto.slug} className="ranura-certificado">
                <p className="etiqueta text-ink-muted">{proyecto.clienteCorto}</p>
                <p className="dato mt-2 text-sm text-ink">{proyecto.anio}</p>
                <p className="mt-6 text-xs text-ink-muted">Constancia pendiente de cargar</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Boton href="#contacto" variante="secundario">
              Pedir las constancias
            </Boton>
          </div>
        </Reveal>
      </Seccion>

      {/* ================================================================
          Clientes. Solo logos: el portafolio no documenta estos encargos.
          ================================================================ */}
      <Clientes />

      {/* ================================================================
          Contacto.
          ================================================================ */}
      <Seccion
        id="contacto"
        alterna
        rotulo="Contacto"
        titulo="Cuéntenos qué tiene que radicar"
      >
        <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
          <div>
            <Reveal as="p" className="medida text-lg text-ink">
              Con el alcance y la autoridad ante la que responde alcanza para armar una
              propuesta.
            </Reveal>

            <Reveal regla className="mt-12 pt-6">
              <p className="etiqueta text-ink-muted">Directo, sin formulario</p>
              {/* El icono va fuera del enlace: dentro ampliaría el área
                  pulsable con una zona que no parece parte del enlace. */}
              <ul className="mt-6 flex flex-col gap-6">
                <li className="flex items-start gap-4">
                  <Icono nombre="telefono" className="mt-1 text-accent-deep" />
                  <span>
                    <Enlace href={whatsapp} externo className="dato text-xl">
                      {empresa.telefono}
                    </Enlace>
                    <span className="mt-1 block text-sm text-ink-muted">
                      Llamada o WhatsApp
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <Icono nombre="correo" className="mt-1 text-accent-deep" />
                  <span>
                    <Enlace href={mailto} externo className="text-xl">
                      {empresa.correo}
                    </Enlace>
                    <span className="mt-1 block text-sm text-ink-muted">
                      Correo de gerencia
                    </span>
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal regla className="mt-12 pt-6">
              <p className="etiqueta text-ink-muted">Dónde estamos</p>
              <div className="mt-4 flex items-start gap-4">
                <Icono nombre="ubicacion" className="mt-1 text-accent-deep" />
                <p>
                  <span className="text-ink">{empresa.sede}</span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    Proyectos ejecutados en {regiones.join(" y ")}.
                  </span>
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <FormularioContacto />
          </Reveal>
        </div>
      </Seccion>
    </>
  );
}
