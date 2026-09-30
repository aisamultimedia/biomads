"use client";

import { usePathname } from "next/navigation";
import type { Idioma } from "@/idioma";
import type { ItemNav } from "@/lib/site";

/**
 * Resuelve el destino de un ítem de navegación según dónde se esté.
 *
 * Las secciones del recorrido viven todas en la portada, pero la cabecera y
 * el pie salen en todas las páginas. Desde `/proyectos` o `/privacidad`, un
 * `href="#servicios"` no lleva a ninguna parte: el ancla no existe en esa
 * página y el clic no hace nada, sin avisar. Desde fuera de la portada el
 * enlace tiene que ser absoluto.
 *
 * Dentro de la portada se queda en ancla pura a propósito: como `/es#…` el
 * enrutador lo trataría como una navegación y se perdería el desplazamiento
 * suave de Lenis.
 *
 * Sin JavaScript no se monta nada de esto y los enlaces salen con lo que el
 * servidor pintó, que es el ancla relativa: correcta en la portada, que es
 * donde está el 95 % de las visitas.
 */
export function useAncla(idioma: Idioma) {
  const ruta = usePathname();
  const enPortada = ruta === `/${idioma}`;

  return (item: ItemNav) => {
    const destino = item.destino ?? item.href;
    return enPortada ? destino : `/${idioma}${destino}`;
  };
}
