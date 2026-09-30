import type { NombreIcono } from "@/components/ui/Icono";
import type { ClaveCategoriaServicio, ClaveFoto } from "@/idioma";
import marcacionIndividuo from "@/fotos/marcacion-individuo.jpg";
import parcelaEstacas from "@/fotos/parcela-estacas.jpg";
import revisionPlanta from "@/fotos/revision-planta.jpg";
import cuadrillaTerreno from "@/fotos/cuadrilla-terreno.jpg";

/**
 * Servicios — estructura.
 *
 * El texto vive en el diccionario, bajo `servicios.categorias`, con estas
 * mismas claves. Aquí solo el orden y el icono de cada categoría.
 *
 * De CONTENIDO.md → "Servicios", reorganizado en cuatro categorías por
 * decisión del cliente.
 *
 * Dos ítems llevaban a una página de ficha —monitoreo de fauna y flora
 * epífita— y se retiraron por decisión del cliente: no hay profundización
 * de servicio que ofrecer, así que la tarjeta no puede prometer una. Con
 * ellos se fueron las dos páginas, el componente que las pintaba y sus
 * entradas del mapa del sitio. Siguen en el historial de git por si
 * hiciera falta traerlas de vuelta.
 */

export type CategoriaServicio = {
  clave: ClaveCategoriaServicio;
  icono: NombreIcono;
};

export const categoriasServicio: readonly CategoriaServicio[] = [
  { clave: "biodiversidad", icono: "huella" },
  { clave: "forestal", icono: "arbol" },
  { clave: "estudios", icono: "portapapeles" },
  { clave: "sostenibilidad", icono: "libro" },
];

/**
 * La fotografía que acompaña a cada categoría en el panel de escritorio, en
 * el mismo orden que la lista de arriba.
 *
 * Son tomas de campo del archivo elegidas por lo que enseñan, no por el
 * contrato del que salieron: su texto alternativo sigue describiendo lo que
 * se ve. Solo se descargan a partir de 1024 px, que es donde el panel
 * existe; por debajo, `sizes` las deja en 1 px.
 */
export const fotosServicio: readonly { clave: ClaveFoto; imagen: typeof parcelaEstacas }[] = [
  { clave: "marcacion-individuo", imagen: marcacionIndividuo },
  { clave: "parcela-estacas", imagen: parcelaEstacas },
  { clave: "revision-planta", imagen: revisionPlanta },
  { clave: "cuadrilla-terreno", imagen: cuadrillaTerreno },
];
