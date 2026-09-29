import { Boton } from "@/components/ui/Boton";
import { Enlace } from "@/components/ui/Enlace";
import { Icono } from "@/components/ui/Icono";
import { Seccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Clientes } from "@/components/secciones/Clientes";
import { EtapasEstudio } from "@/components/secciones/EtapasEstudio";
import { TarjetaCategoria } from "@/components/secciones/TarjetaCategoria";
import { Diapositivas } from "@/components/secciones/Diapositivas";
import { FormularioContacto } from "@/components/secciones/FormularioContacto";
import { Galeria } from "@/components/secciones/Galeria";
import { Hero } from "@/components/secciones/Hero";
import { MarcoInstitucional } from "@/components/secciones/MarcoInstitucional";
import { PromesaMarca } from "@/components/secciones/PromesaMarca";
import { regiones } from "@/content/respaldo";
import { categoriasServicio } from "@/content/servicios";
import { diccionario, comoIdioma } from "@/idioma";
import { opcionesDeServicio } from "@/lib/formulario";
import { empresa, mailto, whatsapp } from "@/lib/site";
import { fotosNosotros } from "@/content/nosotros";

/**
 * Página única.
 *
 * Todo el recorrido vive aquí, en secciones ancladas: nosotros, la forma de
 * abordar un proyecto, servicios y contacto. Las páginas de detalle de los
 * dos servicios con ficha siguen existiendo para quien llegue por buscador o
 * comparta un enlace, pero la visita normal no sale de esta pantalla.
 *
 * La sección de proyectos se retiró por decisión del cliente. Estaba entre
 * servicios y la galería de campo, así que el recorrido cierra ahora
 * servicios → galería → clientes → contacto.
 *
 * Con una sección menos hubo que recolocar una superficie: servicios pasó
 * de la alterna al papel. La galería y la banda de clientes comparten
 * superficie a propósito —separadas solo por una regla— y proyectos era el
 * bloque de papel que las separaba de servicios; sin él, tres superficies
 * alternas seguidas habrían fundido todo el cierre de la página en una.
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

          </div>

          {/* Fotos de equipo en un slider a una por vista. La lista de
              cargos, la de especialistas y la nota de la tarjeta
              profesional se retiraron por decisión del cliente: el texto
              dice quiénes somos y las fotos lo enseñan. */}
          <Reveal indice={2}>
            <Diapositivas fotos={fotosNosotros} textos={t.galeria} alts={t.fotos} />
          </Reveal>
        </div>

        {/* El propósito cierra la sección a ancho completo, fuera de la
            rejilla. El cliente entregó tres párrafos donde antes había dos,
            y el tercero dentro de la columna la estiraba bastante por
            debajo de la foto: en tablet dejaba un palmo de blanco a la
            derecha. Fuera, la columna vuelve a la altura del slider y el
            párrafo gana el peso que le toca, que es el de la conclusión. */}
        <Reveal as="p" regla className="medida mt-16 pt-8 text-lg text-ink">
          {t.nosotros.proposito}
        </Reveal>

        {/* Misión, visión, valores y política integral. Al final de la
            sección, nunca abriéndola: es lo mismo que declara toda
            consultora del sector. */}
        <MarcoInstitucional idioma={idioma} />
      </Seccion>

      {/* ================================================================
          La pausa del recorrido, entre los dos bloques más densos.
          ================================================================ */}
      <PromesaMarca idioma={idioma} />

      {/* ================================================================
          Las cinco etapas del método, en banda oscura. Es la continuación
          de la promesa: primero qué se promete, luego cómo se aborda.
          ================================================================ */}
      <EtapasEstudio idioma={idioma} />

      {/* ================================================================
          Servicios — las cuatro categorías que cubren todo el alcance.
          ================================================================ */}
      <Seccion id="servicios" rotulo={t.servicios.rotulo} titulo={t.servicios.titulo}>
        {/* items-stretch: el cliente las quiere del mismo tamaño. El hueco
            que eso abría en la tarjeta con menos frentes lo absorbe ahora la
            lista, que reparte el alto sobrante entre sus filas. */}
        <RevealGroup
          as="ul"
          tipo="panel"
          /* auto-rows-fr solo desde md, que es donde hay dos columnas: en
             una sola, igualar filas estira las cuatro tarjetas al alto de la
             más larga y regala pantalla en móvil sin que nadie las compare. */
          className="grid items-stretch gap-6 md:auto-rows-fr md:grid-cols-2"
        >
          {categoriasServicio.map((categoria, i) => (
            <TarjetaCategoria
              key={categoria.clave}
              categoria={categoria}
              numero={String(i + 1).padStart(2, "0")}
              textos={t.servicios}
            />
          ))}
        </RevealGroup>

        <Reveal className="mt-16">
          <Boton href="#contacto" variante="secundario">
            {t.servicios.consultarAlcance}
          </Boton>
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
            {/* Sin entradilla: la que había —«con el alcance y la autoridad
                ante la que responde alcanza para armar una propuesta»— se
                retiró por decisión del cliente. La columna arranca en las
                vías directas, así que este primer bloque ya no lleva el
                margen superior que lo separaba del párrafo. */}
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
                  <span className="mt-1 block text-sm text-ink-muted">
                    {t.contacto.regionesNota} {regiones.join(` ${t.unidades.y} `)}.
                  </span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* Ancla propia: «Contacto» en el menú y el botón de la cabecera
              apuntan aquí y no al principio de la sección. En escritorio la
              diferencia es poca —el formulario empieza a la altura del
              primer bloque—, pero en móvil el formulario va debajo de las
              vías directas y quedaba a una pantalla del ancla anterior. */}
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
