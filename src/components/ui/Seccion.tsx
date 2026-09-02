import type { ReactNode } from "react";
import type { Tipo } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";

type Props = {
  /** Rótulo sobre el título. Opcional. */
  rotulo?: string;
  titulo?: string;
  children: ReactNode;
  /** Superficie alterna. */
  alterna?: boolean;
  /** Superficie oscura: cambia el anillo de foco y los colores de texto. */
  oscura?: boolean;
  /** Ancla para enlaces internos. */
  id?: string;
  className?: string;
};

/**
 * Envoltura de sección: ancho máximo, respiración lateral y ritmo vertical
 * de 96px en móvil y 160px en escritorio.
 *
 * La cabecera entra como grupo: el rótulo llega lateral y el título se
 * revela tras su máscara, en ese orden.
 */
export function Seccion({
  rotulo,
  titulo,
  children,
  alterna = false,
  oscura = false,
  id,
  className = "",
}: Props) {
  const superficie = oscura
    ? "superficie-oscura bg-dark text-ink-invert"
    : alterna
      ? "bg-paper-alt"
      : "";

  /* Los hijos se arman a mano, no con condicionales dentro del grupo:
     RevealGroup reparte los gestos por posición y un `null` intermedio
     correría el índice, dejando al título con el gesto del rótulo. */
  const cabecera: ReactNode[] = [];
  const gestos: Tipo[] = [];
  if (rotulo) {
    cabecera.push(
      <p key="rotulo" className={`etiqueta ${oscura ? "text-accent" : "text-accent-deep"}`}>
        {rotulo}
      </p>,
    );
    gestos.push("lateral");
  }
  if (titulo) {
    cabecera.push(
      <h2 key="titulo" className="mt-4 text-2xl md:text-3xl">
        {titulo}
      </h2>,
    );
    gestos.push("titulo");
  }

  return (
    <section id={id} className={`${superficie} ${className}`}>
      <div className="mx-auto w-full max-w-ancho px-6 py-24 md:py-40">
        {cabecera.length > 0 && (
          <RevealGroup className="mb-16" tipos={gestos}>
            {cabecera}
          </RevealGroup>
        )}
        {children}
      </div>
    </section>
  );
}
