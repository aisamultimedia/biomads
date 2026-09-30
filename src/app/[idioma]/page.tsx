import { Boton } from "@/components/ui/Boton";
import { Enlace } from "@/components/ui/Enlace";
import { Icono } from "@/components/ui/Icono";
import { Seccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Cursor } from "@/components/motion/Cursor";
import { Clientes } from "@/components/secciones/Clientes";
import { EtapasEstudio } from "@/components/secciones/EtapasEstudio";
import { Servicios } from "@/components/secciones/Servicios";
import { Proyectos } from "@/components/secciones/Proyectos";
import { Diapositivas } from "@/components/secciones/Diapositivas";
import { FormularioContacto } from "@/components/secciones/FormularioContacto";
import { Galeria } from "@/components/secciones/Galeria";
import { Hero } from "@/components/secciones/Hero";
import { MarcoInstitucional } from "@/components/secciones/MarcoInstitucional";
import { PromesaMarca } from "@/components/secciones/PromesaMarca";
import { proyectos } from "@/content/proyectos";
import { regiones } from "@/content/respaldo";
import { categoriasServicio, fotosServicio } from "@/content/servicios";
import { diccionario, comoIdioma } from "@/idioma";
import { opcionesDeServicio } from "@/lib/formulario";
import { empresa, mailto, whatsapp } from "@/lib/site";
import { fotosNosotros } from "@/content/nosotros";

/**
 * Página única, y ahora única de verdad.
 *
 * El cliente pidió que nada esencial dependa de abrir una ficha, un modal o
 * una página aparte. Así que aquí está todo: quiénes somos, el marco
 * institucional, la promesa, el método, los cuatro frentes de servicio con
 * lo que cubre cada uno y las seis fichas de proyecto completas. Fuera queda
 * solo la política de tratamiento de datos, que es un documento legal y se
 * comparte por su URL.
 *
 * **Lo que evita que sea un rollo interminable** no es esconder contenido,
 * es darle forma. Los servicios son una lista que se recorre y cambia un
 * panel; los proyectos, un índice de seis renglones que despliega la ficha
 * en su sitio. Cerrados ocupan poco, abiertos lo que pida lo que se está
 * leyendo, y en ningún caso se sale de la página.
 *
 * **El recorrido.** Qué prometemos (hero) → quiénes somos y qué nos mueve →
 * la promesa, como pausa → cómo trabajamos (método) → qué hacemos
 * (servicios) → dónde lo hemos hecho (proyectos) → cómo se ve (campo) →
 * quién ha confiado → hablemos.
 */
export default async function Portada({ params }: PageProps<"/[idioma]">) {
  const { idioma: segmento } = await params;
  const idioma = comoIdioma(segmento);
  const t = diccionario(idioma);

  const cifras = [
    {
      valor: String(proyectos.length).padStart(2, "0"),
      rotulo: t.proyectos.cifras.fichas,
    },
    { valor: "88,54", rotulo: t.proyectos.cifras.hectareas },
    { valor: String(empresa.constitucion), rotulo: t.proyectos.cifras.desde },
  ];

  return (
    <>
      <Hero idioma={idioma} />

      {/* ================================================================
          Nosotros. La columna de texto se queda fija mientras las fotos
          pasan al lado: es lo que convierte dos bloques quietos en algo
          que se recorre.
          ================================================================ */}
      <Seccion id="nosotros" rotulo={t.nosotros.rotulo} titulo={t.nosotros.titulo}>
        <div className="nosotros-reja">
          <div className="nosotros-texto">
            <Reveal as="p" className="medida text-lg text-ink">
              {t.nosotros.quienesSomos}
            </Reveal>

            <Reveal as="p" indice={1} className="medida mt-6 text-ink-muted">
              {t.nosotros.fortaleza}
            </Reveal>

            <Reveal regla className="mt-10 pt-6">
              <p className="etiqueta text-ink-muted">{t.contacto.dondeRotulo}</p>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="text-ink">{empresa.sede}</span>
                <span className="dato coordenada">{empresa.coordenadas}</span>
              </p>
            </Reveal>
          </div>

          <Reveal indice={2} className="nosotros-fotos">
            <Diapositivas fotos={fotosNosotros} textos={t.galeria} alts={t.fotos} />
          </Reveal>
        </div>

        {/* El propósito cierra la sección a ancho completo. */}
        <Reveal as="p" regla className="medida mt-16 pt-8 text-lg text-ink">
          {t.nosotros.proposito}
        </Reveal>

        <MarcoInstitucional idioma={idioma} />
      </Seccion>

      {/* ================================================================
          La pausa del recorrido, entre los dos bloques más densos.
          ================================================================ */}
      <PromesaMarca idioma={idioma} />

      {/* ================================================================
          Las cinco etapas del método, en banda oscura.
          ================================================================ */}
      <EtapasEstudio idioma={idioma} />

      {/* ================================================================
          Servicios: cuatro frentes que se recorren, con todo lo que cubre
          cada uno a la vista.
          ================================================================ */}
      <Seccion id="servicios" alterna rotulo={t.servicios.rotulo} titulo={t.servicios.titulo}>
        <Servicios
          categorias={categoriasServicio}
          imagenes={fotosServicio}
          textos={t.servicios}
          alts={t.fotos}
        />

        <Reveal className="mt-16">
          <Cursor as="span" className="inline-block">
            <Boton href="#formulario" variante="secundario">
              {t.servicios.consultarAlcance}
            </Boton>
          </Cursor>
        </Reveal>
      </Seccion>

      {/* ================================================================
          Proyectos: las seis fichas técnicas, enteras y en su sitio.
          ================================================================ */}
      <Seccion id="proyectos" rotulo={t.proyectos.rotulo} titulo={t.proyectos.titulo}>
        <div className="proyectos-cabecera">
          <Reveal as="p" className="medida text-ink-muted">
            {t.proyectos.entradilla}
          </Reveal>

          {/* Tres cifras, las tres comprobables en las fichas que hay justo
              debajo. Ni una más: el sitio no lleva contador de años
              acumulados ni de proyectos totales. */}
          <RevealGroup as="dl" tipo="panel" className="proyectos-cifras">
            {cifras.map((cifra) => (
              <div key={cifra.rotulo}>
                <dt className="etiqueta text-ink-muted">{cifra.rotulo}</dt>
                <dd className="dato proyectos-cifra">{cifra.valor}</dd>
              </div>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-16">
          <Proyectos
            proyectos={proyectos}
            textos={t.proyectos}
            unidades={t.unidades}
            fotos={t.fotos}
          />
        </Reveal>
      </Seccion>

      {/* ================================================================
          Galería de campo: la prueba visual de la ejecución.
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
          <div className="columna-contacto">
            <Reveal regla className="pt-6">
              <p className="etiqueta text-ink-muted">{t.contacto.directoRotulo}</p>
              {/* El icono va fuera del enlace: dentro ampliaría el área
                  pulsable con una zona que no parece parte del enlace. */}
              <ul className="mt-6 flex flex-col gap-6">
                <li className="via-directa flex items-start gap-4">
                  <Icono nombre="telefono" className="via-directa-icono mt-1 text-accent-deep" />
                  <span>
                    <Enlace href={whatsapp} externo className="dato text-xl">
                      {empresa.telefono}
                    </Enlace>
                    <span className="mt-1 block text-sm text-ink-muted">
                      {t.contacto.telefonoNota}
                    </span>
                  </span>
                </li>
                <li className="via-directa flex items-start gap-4">
                  <Icono nombre="correo" className="via-directa-icono mt-1 text-accent-deep" />
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
                  <span className="dato coordenada mt-1 block">{empresa.coordenadas}</span>
                  <span className="mt-2 block text-sm text-ink-muted">
                    {t.contacto.regionesNota} {regiones.join(` ${t.unidades.y} `)}.
                  </span>
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal id="formulario">
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
