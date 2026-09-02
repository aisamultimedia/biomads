import { Seccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { relacionRecurrente } from "@/content/proyectos";
import { permisos } from "@/lib/site";

/**
 * El dato más fuerte del brief: un mismo cliente contratando cuatro veces
 * en cuatro frentes distintos.
 *
 * El nombre (Autopista Río Magdalena) está detrás de
 * `permisos.nombrarClientes`. Sin la autorización escrita el hecho se cuenta
 * sin nombrarlo: los cuatro frentes se sostienen solos.
 *
 * Los cuatro frentes entran como una lista de campo: cada regla se traza y
 * su renglón se asienta, uno tras otro.
 */
export function PruebaRecontratacion({ alterna = false }: { alterna?: boolean }) {
  const apagado = alterna ? "text-ink-muted" : "text-ink-invert-muted";
  const encendido = alterna ? "text-ink" : "text-ink-invert";

  return (
    <Seccion
      oscura={!alterna}
      alterna={alterna}
      rotulo="La prueba"
      titulo="Cuatro contrataciones, cuatro frentes distintos"
    >
      <div className="grid gap-16 md:grid-cols-[1fr_auto] md:gap-24">
        <div>
          <Reveal as="p" className={`medida text-lg ${encendido}`}>
            {permisos.nombrarClientes ? (
              <>
                <strong className="font-semibold">{relacionRecurrente.nombreCliente}</strong>{" "}
                nos ha vuelto a contratar.
              </>
            ) : (
              "Un mismo cliente nos ha vuelto a contratar."
            )}{" "}
            Empezamos con un Plan de Compensación Ambiental y seguimos en frentes que no
            se parecen entre sí.
          </Reveal>

          <RevealGroup as="ol" regla className="mt-16 flex flex-col" itemClassName="py-6">
            {relacionRecurrente.frentes.map((frente, i) => (
              <span key={frente} className="flex items-baseline gap-6">
                <span className={`dato text-sm ${alterna ? "text-accent-deep" : "text-accent"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-lg ${encendido}`}>{frente}</span>
              </span>
            ))}
          </RevealGroup>
        </div>

        <RevealGroup tipos={["lateral", "texto", "texto"]} className="md:max-w-[38ch]">
          <p className={`etiqueta ${apagado}`}>Por qué nos recontratan</p>
          <blockquote className={`mt-4 ${apagado}`}>{relacionRecurrente.porQue}</blockquote>
          {!permisos.nombrarClientes && (
            <p
              className={`mt-8 border-t pt-6 text-sm ${
                alterna ? "border-line" : "border-line-invert"
              } ${apagado}`}
            >
              Publicamos el nombre de un cliente solo con su autorización.
            </p>
          )}
        </RevealGroup>
      </div>
    </Seccion>
  );
}
