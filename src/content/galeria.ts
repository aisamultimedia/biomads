import type { ClaveFoto } from "@/idioma";
import trazadoParcela from "@/fotos/trazado-parcela.jpg";
import encaladoBerma from "@/fotos/encalado-berma.jpg";
import cargaPiedra from "@/fotos/carga-piedra.jpg";
import cuadrillaPiedra from "@/fotos/cuadrilla-piedra.jpg";
import bandaPiedra from "@/fotos/banda-piedra.jpg";
import cuadrillaTerreno from "@/fotos/cuadrilla-terreno.jpg";
import taludCuneta from "@/fotos/talud-cuneta.jpg";
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
 * Son dos jornadas, cada una en su orden y una detrás de la otra.
 *
 * Primero el frente de obra junto a vía, entregado el 28 de septiembre de
 * 2026: trazar la parcela, encalar, acopiar la piedra, colocarla, cerrar la
 * banda, adecuar el talud y el resultado ya con cubresuelo. Va delante
 * porque es lo último ejecutado y porque el recorrido de esa jornada se lee
 * entero sin salir de las primeras vistas del carrusel.
 *
 * Detrás, las doce de siembra y mantenimiento en ladera que había: preparar
 * el terreno, sembrar, tutorar, mantener, proteger.
 *
 * Las dos del slider de «Quiénes somos» —`lineas-piedra` y
 * `jardin-piedra`— no se repiten aquí a propósito, que es la regla que ya
 * seguían las de aquel bloque.
 *
 * Con la sección de proyectos retirada quedaron sin usar `siembra-ladera` y
 * `traslado-material`, que eran sus dos fotos. No se han añadido: el cliente
 * pidió quitar una foto, no cambiar la galería. Los archivos y sus textos
 * alternativos siguen en el repositorio y añadirlas es una línea.
 */
export const galeria: readonly { clave: ClaveFoto; imagen: typeof aspersionLadera }[] = [
  /* Frente de obra junto a vía */
  { clave: "trazado-parcela", imagen: trazadoParcela },
  { clave: "encalado-berma", imagen: encaladoBerma },
  { clave: "carga-piedra", imagen: cargaPiedra },
  { clave: "cuadrilla-piedra", imagen: cuadrillaPiedra },
  { clave: "banda-piedra", imagen: bandaPiedra },
  { clave: "cuadrilla-terreno", imagen: cuadrillaTerreno },
  { clave: "talud-cuneta", imagen: taludCuneta },

  /* Siembra y mantenimiento en ladera */
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
