import type { ClaveFoto } from "@/idioma";
import lineasPiedra from "@/fotos/lineas-piedra.jpg";
import jardinPiedra from "@/fotos/jardin-piedra.jpg";
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
 * cliente; el archivo sigue en src/fotos y su alt en el diccionario, por si
 * vuelve.
 *
 * El 28 de septiembre de 2026 entraron dos del frente de obra junto a vía y
 * abren el slider: son las dos únicas tomas del set nuevo donde se ve la
 * cuadrilla entera y el resultado del trabajo, que es lo que esta sección
 * tiene que enseñar. Las dos son 4:3 de origen, así que entran en el marco
 * sin recorte.
 *
 * Siete diapositivas y ninguna deja hueco: es una pista de una foto por
 * vista, así que el indicador y el avance automático se ajustan solos al
 * número que haya.
 */
export const fotosNosotros: readonly { clave: ClaveFoto; imagen: typeof areaEstudio }[] = [
  { clave: "lineas-piedra", imagen: lineasPiedra },
  { clave: "jardin-piedra", imagen: jardinPiedra },
  { clave: "area-estudio", imagen: areaEstudio },
  { clave: "mantenimiento-individuo", imagen: mantenimientoIndividuo },
  { clave: "marcacion-individuo", imagen: marcacionIndividuo },
  { clave: "control-fitosanitario", imagen: controlFitosanitario },
  { clave: "revision-planta", imagen: revisionPlanta },
];
