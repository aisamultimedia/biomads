import type { ReactNode } from "react";
import { Boton } from "@/components/ui/Boton";
import { Seccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { diccionario, type Idioma } from "@/idioma";
import { whatsapp } from "@/lib/site";

type Props = {
  idioma: Idioma;
  titulo: string;
  /** La entradilla. Puede llevar enlaces. */
  children: ReactNode;
  /** Superficie alterna. */
  alterna?: boolean;
};

/**
 * Cierre de página: el paso siguiente. Aparece al final de todas las
 * superficies con el mismo gesto —rótulo lateral, título tras su máscara,
 * entradilla y los dos botones— para que el final de cada recorrido se
 * sienta igual.
 *
 * No repite el correo y el teléfono en crudo: eso lo carga el pie, que está
 * justo debajo. Aquí van las acciones.
 */
export function SiguientePaso({ idioma, titulo, children, alterna = false }: Props) {
  const t = diccionario(idioma).siguientePaso;
  return (
    <Seccion alterna={alterna}>
      <div className="grid gap-16 md:grid-cols-[1fr_auto] md:items-end md:gap-24">
        <RevealGroup tipos={["lateral", "titulo", "texto"]}>
          <p className="etiqueta text-accent-deep">{t.rotulo}</p>
          <h2 className="mt-4 max-w-titulo text-2xl md:text-3xl">{titulo}</h2>
          <p className="medida mt-6 text-lg text-ink-muted">{children}</p>
        </RevealGroup>

        <Reveal indice={2}>
          <div className="flex flex-wrap gap-4">
            <Boton href={`/${idioma}#contacto`}>{t.solicitarPropuesta}</Boton>
            <Boton href={whatsapp} variante="secundario" externo>
              {t.escribirWhatsapp}
            </Boton>
          </div>
        </Reveal>
      </div>
    </Seccion>
  );
}
