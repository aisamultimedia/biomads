type Props = {
  /** Proporción del encuadre definitivo. La foto real entra sin tocar el layout. */
  proporcion?: "3/2" | "4/5" | "16/9" | "1/1";
  /** Qué debe mostrar la foto cuando llegue. Se convierte en el alt. */
  descripcion: string;
  className?: string;
};

/**
 * Marcador de fotografía de campo.
 *
 * La proporción y el encuadre ya están resueltos: cuando lleguen las
 * fotografías propias reemplazan el contenido de este marco sin mover nada.
 * Ver CONTENIDO.md → "Lo que hay que pedirle a BIOMADS", punto 2.
 */
export function MarcoFoto({ proporcion = "3/2", descripcion, className = "" }: Props) {
  return (
    <div
      className={`marco-imagen flex items-end border border-line bg-paper-alt ${className}`}
      style={{ aspectRatio: proporcion }}
      role="img"
      aria-label={`Pendiente: fotografía de campo — ${descripcion}`}
    >
      <div className="p-6">
        <p className="etiqueta text-ink-muted">[Foto de campo — pendiente]</p>
        <p className="mt-2 max-w-estrecho text-sm text-ink-muted">{descripcion}</p>
      </div>
    </div>
  );
}
