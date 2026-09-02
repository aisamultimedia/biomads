import Image from "next/image";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Reveal } from "@/components/motion/Reveal";
import { clientes } from "@/content/clientes";
import { diccionario, type Idioma } from "@/idioma";
import { permisos } from "@/lib/site";

/**
 * Banda de clientes: solo logos y nombre.
 *
 * No hay cifra de proyectos, ni año, ni descripción del encargo: el
 * portafolio nombra a los tres clientes y nada más, y aquí no se completa
 * lo que no consta. Los dos proyectos con ficha detallada son otros y
 * viven en su propia sección.
 *
 * Va sobre la misma superficie que la galería, separada por una regla: una
 * banda corta de papel entre dos superficies verdes se leía como un error
 * de fondo. Los logos van a color —cada marca con el suyo— y se levantan
 * al pasar el cursor.
 *
 * Toda la banda depende de `permisos.nombrarClientes`. En `false` no
 * renderiza nada y la página cierra el hueco sola.
 */
export function Clientes({ idioma }: { idioma: Idioma }) {
  if (!permisos.nombrarClientes) return null;
  const t = diccionario(idioma);

  return (
    <section className="bg-paper-alt">
      <div className="mx-auto w-full max-w-ancho border-t border-line px-6 pb-24 pt-16 md:pb-32 md:pt-24">
        <Reveal as="p" tipo="lateral" className="etiqueta text-ink-muted">
          {t.clientes.rotulo}
        </Reveal>

        <RevealGroup
          as="ul"
          tipo="panel"
          className="mt-12 grid grid-cols-2 items-center gap-x-12 gap-y-12 sm:grid-cols-3 sm:gap-x-16"
          itemClassName="logo-cliente"
        >
        {clientes.map((cliente) => (
          <Image
            key={cliente.clave}
            src={cliente.logo}
            /* El nombre va en el alt porque el logo es la única forma en que
               aparece: no hay rótulo de texto al lado que lo repita. */
            alt={t.clientes.nombres[cliente.clave]}
            /* Alturas normalizadas por área en preparar-logos-clientes.mjs;
               aquí solo se sirven a la mitad de su tamaño para pantallas
               de densidad doble. */
            height={cliente.logo.height / 2}
            width={cliente.logo.width / 2}
            sizes="(min-width: 768px) 220px, 40vw"
          />
        ))}
        </RevealGroup>
      </div>
    </section>
  );
}
