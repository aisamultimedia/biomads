"use client";

import { m } from "motion/react";
import { Enlace } from "@/components/ui/Enlace";
import { FichaDatos } from "@/components/ui/FichaDatos";
import { useRevelado } from "@/hooks/useRevelado";
import { grupoConRegla, texto, titulo } from "@/lib/motion";
import type { Proyecto } from "@/content/proyectos";

type Props = {
  proyecto: Proyecto;
};

/**
 * Proyecto ejecutado: qué encargaron, qué lo hacía difícil y cómo se
 * resolvió. La dificultad va explícita porque es lo que distingue un caso
 * verificable de una lista de logros.
 *
 * Entra como un solo grupo: la regla se traza, el nombre del cliente se
 * revela tras su máscara y el resto se asienta en orden. La ficha, anidada,
 * escalona sus filas en su turno.
 */
export function TarjetaCaso({ proyecto }: Props) {
  const revelado = useRevelado();

  return (
    <m.article data-revelar="" variants={grupoConRegla} {...revelado} className="con-regla pt-8">
      <m.h3 data-revelar="" variants={titulo} className="text-xl md:text-2xl">
        {proyecto.clienteCorto}
      </m.h3>
      <m.p data-revelar="" variants={texto} className="medida mt-4 text-ink">
        {proyecto.encargo}
      </m.p>

      <FichaDatos
        anidada
        className="mt-12"
        datos={[
          { rotulo: "Año", valor: proyecto.anio, mono: true },
          { rotulo: "Duración", valor: proyecto.duracion, mono: true },
          { rotulo: "Ubicación", valor: proyecto.ubicacion },
          { rotulo: "Servicio", valor: proyecto.servicioRotulo },
        ]}
      />

      <m.dl data-revelar="" variants={texto} className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <dt className="etiqueta text-ink-muted">La dificultad</dt>
          <dd className="mt-2 text-sm text-ink">{proyecto.dificultad}</dd>
        </div>
        <div>
          <dt className="etiqueta text-ink-muted">Cómo se resolvió</dt>
          <dd className="mt-2 text-sm text-ink">{proyecto.resolucion}</dd>
        </div>
      </m.dl>

      <m.p data-revelar="" variants={texto} className="mt-8">
        <Enlace flecha href={`/proyectos/${proyecto.slug}`}>
          Ver el proyecto completo
        </Enlace>
      </m.p>
    </m.article>
  );
}
