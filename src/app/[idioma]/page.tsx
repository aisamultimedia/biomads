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
import { proyectos } from "@/content/proyectos";
import { regiones } from "@/content/respaldo";
import { serviciosDetallados, serviciosListados } from "@/content/servicios";
import { diccionario, comoIdioma } from "@/idioma";
import { empresa, mailto, whatsapp } from "@/lib/site";
import controlFitosanitario from "@/fotos/control-fitosanitario.jpg";
import cuadrillaLadera from "@/fotos/cuadrilla-ladera.jpg";
import mantenimientoIndividuo from "@/fotos/mantenimiento-individuo.jpg";

/**
 * Página única.
 *
 * Todo el recorrido vive aquí, en secciones ancladas: nosotros, las etapas
 * del estudio ambiental, servicios, proyectos y contacto. Las páginas de
 * detalle siguen existiendo para quien llegue por buscador o comparta un
 * enlace, pero la visita normal no sale de esta pantalla.
 */
export default async function Portada({ params }: PageProps<"/[idioma]">) {
  const { idioma: segmento } = await params;
  const idioma = comoIdioma(segmento);
  const t = diccionario(idioma);

  return (
    <>
      <Hero idioma={idioma} />

      {/* ================================================================
          Nosotros — inmediatamente después del hero.
          ================================================================ */}
      <Seccion id="nosotros" rotulo={t.nosotros.rotulo} titulo={t.nosotros.titulo}>
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <Reveal as="p" className="medida text-lg text-ink">
              {t.nosotros.quienesSomos}
            </Reveal>

            <Reveal as="p" indice={1} className="medida mt-6 text-ink-muted">
              {t.nosotros.fortaleza}
            </Reveal>

            <Reveal regla className="mt-12 pt-6">
              <p className="etiqueta text-ink-muted">{t.nosotros.estructuraRotulo}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {t.nosotros.perfilesPermanentes.map((perfil) => (
                  <li key={perfil} className="flex items-baseline gap-3 text-ink">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 flex-none translate-y-[-0.15em] rounded-sm bg-accent"
                    />
                    {perfil}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink-muted">{t.nosotros.tarjetaProfesional}</p>
            </Reveal>

            <Reveal regla className="mt-12 pt-6">
              <p className="etiqueta text-ink-muted">{t.nosotros.especialistasRotulo}</p>
              <p className="medida mt-4 text-sm text-ink">
                {t.nosotros.especialistas.join(" · ")}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Foto
              className="col-span-2"
              imagen={cuadrillaLadera}
              alt={t.fotos["cuadrilla-ladera"]}
              proporcion="16/9"
              sizes="(min-width: 768px) 45vw, 90vw"
            />
            <Foto
              imagen={mantenimientoIndividuo}
              alt={t.fotos["mantenimiento-individuo"]}
              proporcion="1/1"
              sizes="(min-width: 768px) 22vw, 45vw"
            />
            <Foto
              imagen={controlFitosanitario}
              alt={t.fotos["control-fitosanitario"]}
              proporcion="1/1"
              sizes="(min-width: 768px) 22vw, 45vw"
            />
          </div>
        </div>

        {/* Misión, visión, valores y política. Al final de la sección, nunca
            abriéndola: es lo mismo que declara toda consultora del sector. */}
        <MarcoInstitucional idioma={idioma} />
      </Seccion>

      {/* ================================================================
          Las cinco etapas del estudio ambiental, en banda oscura.
          ================================================================ */}
      <EtapasEstudio idioma={idioma} />

      {/* ================================================================
          Servicios — título y resumen a la vista; la ficha, al abrir.
          ================================================================ */}
      <Seccion id="servicios" alterna rotulo={t.servicios.rotulo} titulo={t.servicios.titulo}>
        <div className="grid gap-8 md:grid-cols-2">
          {serviciosDetallados.map((servicio, i) => (
            <FichaServicio
              key={servicio.slug}
              servicio={servicio}
              numero={String(i + 1).padStart(2, "0")}
              caso={proyectos.find((p) => p.slug === servicio.casoRelacionado)}
              textos={t.servicios}
              proyectos={t.proyectos}
              unidades={t.unidades}
              idioma={idioma}
            />
          ))}
        </div>

        <div className="mt-24 grid gap-16 md:grid-cols-2 md:gap-24">
          <RevealGroup as="ul" regla className="flex flex-col" itemClassName="py-5">
            {serviciosListados.map((servicio) => (
              <span key={servicio.clave} className="flex items-center gap-4 text-lg text-ink">
                <Icono nombre={servicio.icono} className="text-accent-deep" />
                {t.servicios.listados[servicio.clave]}
              </span>
            ))}
          </RevealGroup>

          <Reveal>
            <p className="etiqueta text-ink-muted">{t.servicios.tambienRotulo}</p>
            <p className="medida mt-4 text-ink-muted">{t.servicios.tambienTexto}</p>
            <div className="mt-8">
              <Boton href="#contacto" variante="secundario">
                {t.servicios.consultarAlcance}
              </Boton>
            </div>
          </Reveal>
        </div>
      </Seccion>

      {/* ================================================================
          Proyectos, con el espacio reservado para las constancias.
          ================================================================ */}
      <Seccion id="proyectos" rotulo={t.proyectos.rotulo} titulo={t.proyectos.titulo}>
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

        {/* Espacio reservado para los certificados. Cuando lleguen los PDF
            entran en estas ranuras sin mover nada del layout. */}
        <Reveal regla className="mt-24 pt-8">
          <p className="etiqueta text-ink-muted">{t.proyectos.certificadosRotulo}</p>
          <p className="medida mt-4 text-ink-muted">{t.proyectos.certificadosTexto}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proyectos.map((proyecto) => (
              <div key={proyecto.slug} className="ranura-certificado">
                <p className="etiqueta text-ink-muted">
                  {t.proyectos.casos[proyecto.slug].clienteCorto}
                </p>
                <p className="dato mt-2 text-sm text-ink">{proyecto.anio}</p>
                <p className="mt-6 text-xs text-ink-muted">
                  {t.proyectos.certificadoPendiente}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Boton href="#contacto" variante="secundario">
              {t.proyectos.pedirCertificados}
            </Boton>
          </div>
        </Reveal>
      </Seccion>

      {/* ================================================================
          Clientes. Solo logos: el portafolio no documenta estos encargos.
          ================================================================ */}
      <Clientes idioma={idioma} />

      {/* ================================================================
          Contacto.
          ================================================================ */}
      <Seccion id="contacto" alterna rotulo={t.contacto.rotulo} titulo={t.contacto.titulo}>
        <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
          <div>
            <Reveal as="p" className="medida text-lg text-ink">
              {t.contacto.intro}
            </Reveal>

            <Reveal regla className="mt-12 pt-6">
              <p className="etiqueta text-ink-muted">{t.contacto.directoRotulo}</p>
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
                      {t.contacto.telefonoNota}
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
                      {t.contacto.correoNota}
                    </span>
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal regla className="mt-12 pt-6">
              <p className="etiqueta text-ink-muted">{t.contacto.dondeRotulo}</p>
              <div className="mt-4 flex items-start gap-4">
                <Icono nombre="ubicacion" className="mt-1 text-accent-deep" />
                <p>
                  <span className="text-ink">{empresa.sede}</span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    {t.contacto.regionesNota} {regiones.join(` ${t.unidades.y} `)}.
                  </span>
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <FormularioContacto textos={t.contacto.formulario} />
          </Reveal>
        </div>
      </Seccion>
    </>
  );
}
