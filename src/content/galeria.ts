import type { ClaveFoto } from "@/idioma";
import aspersionLadera from "@/fotos/aspersion-ladera.jpg";
import siembraManual from "@/fotos/siembra-manual.jpg";
import ahoyadoPradera from "@/fotos/ahoyado-pradera.jpg";
import aplicacionFitosanitaria from "@/fotos/aplicacion-fitosanitaria.jpg";
import riegoArbolPotrero from "@/fotos/riego-arbol-potrero.jpg";
import ahoyadoraVia from "@/fotos/ahoyadora-via.jpg";
import ahoyadoraDetalle from "@/fotos/ahoyadora-detalle.jpg";
import estacaTutor from "@/fotos/estaca-tutor.jpg";
import plateoIndividuo from "@/fotos/plateo-individuo.jpg";
import guadanaDespeje from "@/fotos/guadana-despeje.jpg";
import fertilizacionIndividuo from "@/fotos/fertilizacion-individuo.jpg";
import cuadrillaAspersion from "@/fotos/cuadrilla-aspersion.jpg";

/**
 * Galería de campo — estructura.
 *
 * El orden cuenta una jornada: preparar el terreno, sembrar, tutorar,
 * mantener, proteger. El texto alternativo de cada una vive en el
 * diccionario, bajo `fotos`, con esta misma clave, y describe lo que se ve
 * y no el servicio: el set entregado no incluye tomas de monitoreo de fauna
 * ni de flora epífita.
 *
 * Son las doce que quedaban sin usar de las veintinueve entregadas, menos
 * las que repetían encuadre con alguna ya publicada. Las del slider de
 * «Quiénes somos» no se repiten aquí a propósito.
 *
 * Con la sección de proyectos retirada quedaron sin usar `siembra-ladera` y
 * `traslado-material`, que eran sus dos fotos. No se han añadido aquí: el
 * cliente pidió quitar una foto, no cambiar la galería. Los archivos y sus
 * textos alternativos siguen en el repositorio y añadirlas es una línea.
 */
export const galeria: readonly { clave: ClaveFoto; imagen: typeof aspersionLadera }[] = [
  { clave: "ahoyadora-via", imagen: ahoyadoraVia },
  { clave: "ahoyadora-detalle", imagen: ahoyadoraDetalle },
  { clave: "ahoyado-pradera", imagen: ahoyadoPradera },
  { clave: "siembra-manual", imagen: siembraManual },
  { clave: "estaca-tutor", imagen: estacaTutor },
  { clave: "plateo-individuo", imagen: plateoIndividuo },
  { clave: "fertilizacion-individuo", imagen: fertilizacionIndividuo },
  { clave: "riego-arbol-potrero", imagen: riegoArbolPotrero },
  { clave: "guadana-despeje", imagen: guadanaDespeje },
  { clave: "aspersion-ladera", imagen: aspersionLadera },
  { clave: "aplicacion-fitosanitaria", imagen: aplicacionFitosanitaria },
  { clave: "cuadrilla-aspersion", imagen: cuadrillaAspersion },
];
