import type { ClaveFoto } from "@/idioma";
import mantenimientoIndividuo from "@/fotos/mantenimiento-individuo.jpg";
import controlFitosanitario from "@/fotos/control-fitosanitario.jpg";
import areaEstudio from "@/fotos/area-estudio.jpg";
import marcacionIndividuo from "@/fotos/marcacion-individuo.jpg";
import revisionPlanta from "@/fotos/revision-planta.jpg";

/**
 * Fotos del slider de «Quiénes somos»: tomas de equipo en campo que no van
 * en la galería de jornadas. Los alt viven en el diccionario, bajo `fotos`,
 * con estas mismas claves.
 *
 * Eran seis. La primera —`cuadrilla-ladera`, que era también la primera
 * fotografía que aparecía en todo el sitio— se retiró por decisión del
 * cliente. El slider queda en cinco y no deja hueco: es una pista de una
 * foto por vista, así que el indicador y el avance automático se ajustan
 * solos al número de diapositivas. El archivo sigue en src/fotos y su alt
 * en el diccionario, por si vuelve.
 */
export const fotosNosotros: readonly { clave: ClaveFoto; imagen: typeof areaEstudio }[] = [
  { clave: "area-estudio", imagen: areaEstudio },
  { clave: "mantenimiento-individuo", imagen: mantenimientoIndividuo },
  { clave: "marcacion-individuo", imagen: marcacionIndividuo },
  { clave: "control-fitosanitario", imagen: controlFitosanitario },
  { clave: "revision-planta", imagen: revisionPlanta },
];
