import type { ClaveFoto } from "@/idioma";
import cuadrillaLadera from "@/fotos/cuadrilla-ladera.jpg";
import mantenimientoIndividuo from "@/fotos/mantenimiento-individuo.jpg";
import controlFitosanitario from "@/fotos/control-fitosanitario.jpg";
import areaEstudio from "@/fotos/area-estudio.jpg";
import marcacionIndividuo from "@/fotos/marcacion-individuo.jpg";
import revisionPlanta from "@/fotos/revision-planta.jpg";

/**
 * Fotos del slider de «Quiénes somos»: seis tomas de equipo en campo que no
 * van en la galería de jornadas. Los alt viven en el diccionario, bajo
 * `fotos`, con estas mismas claves.
 */
export const fotosNosotros: readonly { clave: ClaveFoto; imagen: typeof cuadrillaLadera }[] = [
  { clave: "cuadrilla-ladera", imagen: cuadrillaLadera },
  { clave: "area-estudio", imagen: areaEstudio },
  { clave: "mantenimiento-individuo", imagen: mantenimientoIndividuo },
  { clave: "marcacion-individuo", imagen: marcacionIndividuo },
  { clave: "control-fitosanitario", imagen: controlFitosanitario },
  { clave: "revision-planta", imagen: revisionPlanta },
];
