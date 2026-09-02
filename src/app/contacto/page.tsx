import type { Metadata } from "next";
import { Enlace } from "@/components/ui/Enlace";
import { Seccion } from "@/components/ui/Seccion";
import { Entrada } from "@/components/motion/Entrada";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { TituloPorLineas } from "@/components/motion/TituloPorLineas";
import { FormularioContacto } from "@/components/secciones/FormularioContacto";
import { serviciosDetallados } from "@/content/servicios";
import { empresa, mailto, whatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbanos a gerencia@biomads.com o al 311 527 6301 (llamada o WhatsApp). Con el alcance y la autoridad ante la que responde armamos una propuesta.",
};

const pasos = [
  [
    "Leemos el alcance",
    "Revisamos si el frente está dentro de nuestras competencias, recursos y condiciones.",
  ],
  [
    "Le decimos que sí o que no",
    "Si no podemos garantizar una buena ejecución, se lo decimos en vez de cotizarlo.",
  ],
  [
    "Armamos el equipo",
    "Definimos qué especialistas entran según lo que el proyecto necesite.",
  ],
] as const;

export default function Pagina() {
  return (
    <>
      {/* ---------------- Cabecera ---------------- */}
      <section className="mx-auto w-full max-w-ancho px-6 pb-16 pt-16 md:pb-24 md:pt-24">
        <Entrada as="p" tipo="lateral" className="etiqueta text-accent-deep">
          Contacto
        </Entrada>

        <TituloPorLineas
          indice={1}
          className="mt-8 text-3xl md:text-4xl"
          lineas={["Cuéntenos qué", "tiene que radicar"]}
        />

        <Entrada as="p" indice={4} className="medida mt-8 text-lg text-ink-muted">
          Con el alcance y la autoridad ante la que responde alcanza para armar una
          propuesta. Si el frente no es nuestro, se lo decimos de una vez.
        </Entrada>
      </section>

      {/* ---------------- Vías directas y formulario ----------------
          Los canales directos van primero y no escondidos: en este sector
          mucha gente prefiere escribir por WhatsApp antes que llenar un
          formulario. Todo entra con la página, en la misma secuencia. */}
      <section className="mx-auto w-full max-w-ancho px-6 pb-24 md:pb-40">
        <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
          <div>
            <Entrada regla indice={5} className="pt-6">
              <p className="etiqueta text-ink-muted">Directo, sin formulario</p>
              <ul className="mt-6 flex flex-col gap-6">
                <li>
                  <Enlace href={whatsapp} externo className="dato text-xl">
                    {empresa.telefono}
                  </Enlace>
                  <p className="mt-1 text-sm text-ink-muted">Llamada o WhatsApp</p>
                </li>
                <li>
                  <Enlace href={mailto} externo className="text-xl">
                    {empresa.correo}
                  </Enlace>
                  <p className="mt-1 text-sm text-ink-muted">Correo de gerencia</p>
                </li>
              </ul>
            </Entrada>

            <Entrada regla indice={6} className="mt-16 pt-6">
              <p className="etiqueta text-ink-muted">Dónde estamos</p>
              <p className="mt-4 text-ink">{empresa.sede}</p>
              <p className="mt-1 text-sm text-ink-muted">
                Nos desplazamos según lo pida el frente.
              </p>
            </Entrada>

            <Entrada regla indice={7} className="mt-16 pt-6">
              <p className="etiqueta text-ink-muted">Qué documentamos a fondo</p>
              <ul className="mt-4 flex flex-col gap-3">
                {serviciosDetallados.map((servicio) => (
                  <li key={servicio.slug}>
                    <Enlace href={`/servicios/${servicio.slug}`} className="text-ink">
                      {servicio.titulo}
                    </Enlace>
                  </li>
                ))}
              </ul>
            </Entrada>
          </div>

          <div>
            <Entrada as="p" regla indice={5} className="etiqueta pt-6 text-ink-muted">
              O escriba aquí
            </Entrada>
            <Entrada indice={6} className="mt-8">
              <FormularioContacto />
            </Entrada>
          </div>
        </div>
      </section>

      {/* ---------------- Qué esperar ---------------- */}
      <Seccion alterna rotulo="Qué sigue" titulo="Después de escribirnos">
        <RevealGroup
          as="ol"
          regla
          escalonado={0.1}
          className="grid gap-12 md:grid-cols-3 md:gap-16"
          itemClassName="pt-6"
        >
          {pasos.map(([titulo, texto], i) => (
            <div key={titulo}>
              <span className="dato text-sm text-accent-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg text-ink">{titulo}</h3>
              <p className="mt-2 text-sm text-ink-muted">{texto}</p>
            </div>
          ))}
        </RevealGroup>
      </Seccion>
    </>
  );
}
