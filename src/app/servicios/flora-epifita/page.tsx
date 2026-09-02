import type { Metadata } from "next";
import { Foto } from "@/components/ui/Foto";
import { DetalleServicio } from "@/components/secciones/DetalleServicio";
import { serviciosDetallados } from "@/content/servicios";
import individuosEnHilera from "@/fotos/individuos-en-hilera.jpg";

const servicio = serviciosDetallados.find((s) => s.slug === "flora-epifita")!;

export const metadata: Metadata = {
  title: "Mantenimiento y seguimiento de flora epífita reubicada",
  description:
    "Seguimiento con registros verificables después del traslado de flora epífita: estado, supervivencia y evolución documentados en informes técnicos.",
};

export default function Pagina() {
  return (
    <DetalleServicio
      servicio={servicio}
      lineasTitulo={["Mantenimiento y seguimiento", "de flora epífita reubicada"]}
      autoridad="Autoridad ambiental competente"
      medio={
        <Foto
          imagen={individuosEnHilera}
          alt="Individuos vegetales jóvenes plantados en hileras regulares sobre terreno cubierto de material vegetal seco, listos para seguimiento."
          proporcion="16/9"
          sizes="(min-width: 1200px) 1200px, 100vw"
          inmediata
          prioridad
          parallax
          indice={5}
        />
      }
    />
  );
}
