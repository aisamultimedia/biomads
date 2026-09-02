import type { Metadata } from "next";
import { Foto } from "@/components/ui/Foto";
import { DetalleServicio } from "@/components/secciones/DetalleServicio";
import { serviciosDetallados } from "@/content/servicios";
import areaEstudio from "@/fotos/area-estudio.jpg";

const servicio = serviciosDetallados.find((s) => s.slug === "monitoreo-fauna")!;

export const metadata: Metadata = {
  title: "Monitoreo de biodiversidad de fauna",
  description:
    "Caracterización y monitoreo de fauna como soporte del estudio ambiental: registros verificables, metodología aplicada y resultados técnicamente sustentados.",
};

export default function Pagina() {
  return (
    <DetalleServicio
      servicio={servicio}
      lineasTitulo={["Monitoreo y estudio", "de biodiversidad de fauna"]}
      autoridad="ANLA o autoridad regional"
      medio={
        <Foto
          imagen={areaEstudio}
          alt="Ladera abierta cubierta de pasto con una línea de cerca y un operario de BIOMADS trabajando a media distancia, en un área de estudio."
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
