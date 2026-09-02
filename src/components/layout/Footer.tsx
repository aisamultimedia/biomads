import { Enlace } from "@/components/ui/Enlace";
import { Icono } from "@/components/ui/Icono";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Logotipo } from "./Logotipo";
import { Nav } from "./Nav";
import { equipo, regiones } from "@/content/respaldo";
import { empresa, mailto, whatsapp } from "@/lib/site";

export function Footer() {
  return (
    <footer className="superficie-oscura bg-dark text-ink-invert">
      <div className="mx-auto w-full max-w-ancho px-6 py-24">
        <Logotipo invertido alto={40} className="mb-12" />

        {/* Quiénes somos, en tres líneas. Quien llega al pie desde una página
            de detalle no tiene por qué haber pasado por la sección Nosotros. */}
        <Reveal as="p" className="medida mb-16 text-lg text-ink-invert">
          BIOMADS es una empresa de estudios y gestión ambiental con sede en{" "}
          {empresa.sede}, constituida en {empresa.constitucion}. Un equipo permanente de{" "}
          {equipo.permanentes} personas más los especialistas que pida cada proyecto,
          con trabajo ejecutado en {regiones.join(" y ")}.
        </Reveal>

        <RevealGroup className="grid gap-16 md:grid-cols-[1fr_auto]">
          {/* Contacto: el paso siguiente desde cualquier página */}
          <div>
            <p className="etiqueta text-ink-invert-muted">Escríbanos</p>
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
                <span className="text-sm text-ink-invert-muted">llamada o WhatsApp</span>
              </li>
            </ul>
          </div>

          <nav aria-label="Pie de página">
            <p className="etiqueta text-ink-invert-muted">Secciones</p>
            <div className="mt-6">
              <Nav orientacion="vertical" invertido />
            </div>
          </nav>
        </RevealGroup>

        <Reveal
          regla
          className="mt-24 flex flex-col gap-6 pt-8 md:flex-row md:items-baseline md:justify-between"
        >
          {/* La nota de cookies vive aquí de forma permanente: el aviso
              flotante se retira solo en escritorio y lo que dice no puede
              dejar de estar disponible por eso. */}
          <p className="text-sm text-ink-invert-muted">
            {empresa.razonSocial} · {empresa.sede} · Constituida en{" "}
            <span className="dato">{empresa.constitucion}</span>
            <span className="mt-2 block">
              No usamos cookies de seguimiento; solo se guarda su respuesta al aviso.
            </span>
          </p>
          {/* El lema va como firma, nunca como argumento de venta. */}
          <p className="etiqueta text-ink-invert-muted">{empresa.lema}</p>
        </Reveal>
      </div>
    </footer>
  );
}
