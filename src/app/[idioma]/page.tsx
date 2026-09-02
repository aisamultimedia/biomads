import { Boton } from "@/components/ui/Boton";
import { Enlace } from "@/components/ui/Enlace";
import { Foto } from "@/components/ui/Foto";
import { Icono } from "@/components/ui/Icono";
import { perfilesPermanentes } from "@/content/institucional";
import { Seccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Clientes } from "@/components/secciones/Clientes";
import { EtapasEstudio } from "@/components/secciones/EtapasEstudio";
import { FichaServicio } from "@/components/secciones/FichaServicio";
import { FormularioContacto } from "@/components/secciones/FormularioContacto";
import { Galeria } from "@/components/secciones/Galeria";
import { Hero } from "@/components/secciones/Hero";
import { MarcoInstitucional } from "@/components/secciones/MarcoInstitucional";
import { PromesaMarca } from "@/components/secciones/PromesaMarca";
import { Proyectos } from "@/components/secciones/Proyectos";
import { proyectos } from "@/content/proyectos";
import { regiones } from "@/content/respaldo";
import { serviciosDetallados, serviciosListados } from "@/content/servicios";
import { diccionario, comoIdioma } from "@/idioma";
import { opcionesDeServicio } from "@/lib/formulario";
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

            {/* Los cinco cargos con su icono. La lista de especialistas
                que se vinculan por proyecto y la nota de la tarjeta
                profesional se retiraron por decisión del cliente. */}
            <Reveal regla className="mt-12 pt-6">
              <p className="etiqueta text-ink-muted">{t.nosotros.estructuraRotulo}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {perfilesPermanentes.map((perfil) => (
                  <li key={perfil.clave} className="perfil-permanente">
                    <span className="perfil-permanente-icono" aria-hidden="true">
                      <Icono nombre={perfil.icono} tamano={22} />
                    </span>
                    <span className="text-ink">{t.nosotros.perfiles[perfil.clave]}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Tres fotos en composición escalonada: la ancha arriba con
              parallax, y debajo dos verticales con la segunda descolgada,
              para que el bloque no se lea como una rejilla de catálogo. */}
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            <Foto
              className="col-span-2"
              imagen={cuadrillaLadera}
              alt={t.fotos["cuadrilla-ladera"]}
              proporcion="3/2"
              sizes="(min-width: 768px) 45vw, 90vw"
              parallax
            />
            <Foto
              imagen={mantenimientoIndividuo}
              alt={t.fotos["mantenimiento-individuo"]}
              proporcion="4/5"
              sizes="(min-width: 768px) 22vw, 45vw"
            />
            <Foto
              className="mt-12 md:mt-16"
              imagen={controlFitosanitario}
              alt={t.fotos["control-fitosanitario"]}
              proporcion="4/5"
              sizes="(min-width: 768px) 22vw, 45vw"
            />
          </div>
        </div>

        {/* Misión, visión, valores y política. Al final de la sección, nunca
            abriéndola: es lo mismo que declara toda consultora del sector. */}
        <MarcoInstitucional idioma={idioma} />
      </Seccion>

      {/* ================================================================
          La pausa del recorrido, entre los dos bloques más densos.
          ================================================================ */}
      <PromesaMarca idioma={idioma} />

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

        {/* Los siete servicios sin ficha, en dos columnas. El rótulo
            «También prestamos» y su nota se retiraron por decisión del
            cliente: queda la lista y la llamada a consultar. */}
        <RevealGroup
          as="ul"
          regla
          className="mt-24 grid md:grid-cols-2 md:gap-x-16"
          itemClassName="servicio-listado"
        >
          {serviciosListados.map((servicio) => (
            <span key={servicio.clave} className="servicio-listado-fila">
              <Icono nombre={servicio.icono} className="servicio-listado-icono" />
              <span className="servicio-listado-texto">
                {t.servicios.listados[servicio.clave]}
              </span>
            </span>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <Boton href="#contacto" variante="secundario">
            {t.servicios.consultarAlcance}
          </Boton>
        </Reveal>
      </Seccion>

      {/* ================================================================
          Proyectos, con el espacio reservado para las constancias.
          ================================================================ */}
      <Seccion id="proyectos" rotulo={t.proyectos.rotulo} titulo={t.proyectos.titulo}>
        <Proyectos
          idioma={idioma}
          textos={t.proyectos}
          unidades={t.unidades}
          fotos={t.fotos}
        />

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
          Galería de campo: la prueba visual de la ejecución, justo después
          de los proyectos que la sustentan.
          ================================================================ */}
      <Seccion id="galeria" alterna rotulo={t.galeria.rotulo} titulo={t.galeria.titulo}>
        <p className="medida -mt-8 mb-16 text-ink-muted">{t.galeria.texto}</p>
        <Galeria textos={t.galeria} fotos={t.fotos} />
      </Seccion>

      {/* ================================================================
          Clientes. Solo logos: el portafolio no documenta estos encargos.
          ================================================================ */}
      <Clientes idioma={idioma} />

      {/* ================================================================
          Contacto.
          ================================================================ */}
      <Seccion id="contacto" rotulo={t.contacto.rotulo} titulo={t.contacto.titulo}>
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
            <FormularioContacto
              idioma={idioma}
              textos={t.contacto.formulario}
              opcionesServicio={opcionesDeServicio(t)}
            />
          </Reveal>
        </div>
      </Seccion>
    </>
  );
}
