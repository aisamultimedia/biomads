import { Enlace } from "@/components/ui/Enlace";
import { Icono } from "@/components/ui/Icono";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Logotipo } from "./Logotipo";
import { Nav } from "./Nav";
import { equipo, regiones } from "@/content/respaldo";
import { diccionario, interpolar, type Idioma } from "@/idioma";
import { empresa, mailto, sitioDesarrolladoEn, whatsapp } from "@/lib/site";

export function Footer({ idioma }: { idioma: Idioma }) {
  const t = diccionario(idioma);

  return (
    <footer className="superficie-oscura bg-dark text-ink-invert">
      <div className="mx-auto w-full max-w-ancho px-6 py-24">
        <Logotipo idioma={idioma} invertido alto={40} className="mb-12" />

        {/* Quiénes somos, en tres líneas. Quien llega al pie desde una página
            de detalle no tiene por qué haber pasado por la sección Nosotros.
            El texto va con huecos y no concatenado: el orden de las palabras
            alrededor de los datos cambia con el idioma. */}
        <Reveal as="p" className="medida-documento mb-16 text-lg text-ink-invert">
          {interpolar(t.pie.resumen, {
            sede: empresa.sede,
            constitucion: empresa.constitucion,
            equipo: equipo.permanentes,
            regiones: regiones.join(` ${t.unidades.y} `),
          })}
        </Reveal>

        <RevealGroup className="grid gap-16 md:grid-cols-[1fr_auto]">
          {/* Contacto: el paso siguiente desde cualquier página */}
          <div>
            <p className="etiqueta text-ink-invert-muted">{t.pie.escribanos}</p>
            {/* El icono queda fuera del enlace: dentro alargaría el área
                pulsable con una zona que no parece parte del enlace. */}
            <ul className="mt-6 flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <Icono nombre="correo" className="text-accent" />
                <Enlace href={mailto} externo className="text-xl">
                  {empresa.correo}
                </Enlace>
              </li>
              <li className="flex items-center gap-4">
                <Icono nombre="telefono" className="text-accent" />
                <Enlace href={whatsapp} externo className="dato text-xl">
                  {empresa.telefono}
                </Enlace>
                <span className="text-sm text-ink-invert-muted">
                  {t.pie.llamadaOWhatsapp}
                </span>
              </li>
            </ul>
          </div>

          <nav aria-label={t.nav.pieDePagina}>
            <p className="etiqueta text-ink-invert-muted">{t.pie.seccionesRotulo}</p>
            <div className="mt-6">
              <Nav textos={t.nav.secciones} orientacion="vertical" invertido />
            </div>
          </nav>
        </RevealGroup>

        {/* Cierre en tres columnas: la razón social a la izquierda, el lema
            en el centro como firma —nunca como argumento de venta— y el año
            del sitio a la derecha. Debajo, la nota de cookies y la política:
            viven aquí de forma permanente porque el aviso flotante se retira
            solo y lo que dice no puede dejar de estar disponible. */}
        <Reveal regla className="mt-24 pt-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
            <p className="text-sm text-ink-invert-muted">
              {empresa.razonSocial} · {empresa.sede} · {t.pie.constituidaEn}{" "}
              <span className="dato">{empresa.constitucion}</span>
            </p>
            <p className="pie-lema">{t.pie.lema}</p>
            <p className="text-sm text-ink-invert-muted md:text-right">
              {interpolar(t.pie.desarrollado, { anio: sitioDesarrolladoEn })}
            </p>
          </div>
          <p className="mt-8 text-sm text-ink-invert-muted">
            {t.pie.notaCookies}{" "}
            <Enlace href={`/${idioma}/privacidad`}>{t.pie.politicaDatos}</Enlace>
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
