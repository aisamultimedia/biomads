import { Enlace } from "@/components/ui/Enlace";
import { Icono } from "@/components/ui/Icono";
import type { CategoriaServicio } from "@/content/servicios";
import type { Diccionario, Idioma } from "@/idioma";

type Props = {
  categoria: CategoriaServicio;
  /** Numeral de la tarjeta: 01 a 04. */
  numero: string;
  textos: Diccionario["servicios"];
  idioma: Idioma;
};

/**
 * Una de las cuatro categorías de servicio.
 *
 * Sustituye al par «dos tarjetas con ficha desplegable + lista de siete
 * nombres sueltos» que había antes: el cliente reorganizó todo el alcance
 * en cuatro categorías, así que los cuatro bloques pesan lo mismo y ninguno
 * se lee como el principal.
 *
 * La tarjeta ya no es un botón. Antes lo era entera porque abría un panel
 * con la ficha; aquí no hay nada que abrir, así que tampoco hay gesto de
 * clic ni levantamiento al pasar el cursor: prometería algo que no ocurre.
 * Lo que sí es enlace son los dos ítems que tienen página propia, y se ven
 * como enlaces —subrayado y flecha— en medio de una lista de texto.
 *
 * Las cuatro igualan altura por la rejilla (`items-stretch`), no por una
 * altura fija: la categoría con cuatro ítems estira a su pareja de fila y
 * los bordes quedan alineados sin recortar nada.
 */
export function TarjetaCategoria({ categoria, numero, textos, idioma }: Props) {
  const { nombre, items } = textos.categorias[categoria.clave];

  return (
    <div className="tarjeta-categoria">
      {/* Numeral e icono en la misma línea: el numeral ordena las cuatro y
          el icono dice de qué va antes de leer el título. */}
      <div className="flex items-center justify-between gap-4">
        <span className="dato text-sm text-accent-deep">{numero}</span>
        <Icono nombre={categoria.icono} tamano={28} className="text-accent-deep" />
      </div>

      <h3 className="categoria-titulo mt-6 text-xl text-ink md:text-2xl">{nombre}</h3>

      <ul className="categoria-items">
        {items.map((item, i) => {
          const ficha = categoria.fichas?.[i];

          return (
            <li key={item} className="categoria-item">
              <span aria-hidden="true" className="categoria-marca" />
              {ficha ? (
                <Enlace flecha href={`/${idioma}/servicios/${ficha}`}>
                  {item}
                  {/* El nombre del ítem no dice que abre una página; la
                      flecha lo dice en pantalla y esto para quien no la ve. */}
                  <span className="sr-only"> — {textos.conFicha}</span>
                </Enlace>
              ) : (
                <span>{item}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
