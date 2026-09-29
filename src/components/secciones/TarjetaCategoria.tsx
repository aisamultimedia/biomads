import { Icono } from "@/components/ui/Icono";
import type { CategoriaServicio } from "@/content/servicios";
import type { Diccionario } from "@/idioma";

type Props = {
  categoria: CategoriaServicio;
  /** Numeral de la tarjeta: 01 a 04. */
  numero: string;
  textos: Diccionario["servicios"];
};

/**
 * Una de las cuatro categorías de servicio.
 *
 * **No es enlace ni abre nada.** Los dos ítems que llevaban a una página de
 * ficha se retiraron por decisión del cliente: no hay profundización de
 * servicio que ofrecer y la tarjeta no puede prometer una. Por eso tampoco
 * hay levantamiento al pasar el cursor ni signo de «más»: ningún gesto
 * sugiere un clic que no existe.
 *
 * **Qué la saca de la tarjeta genérica.** Era una caja blanca con un número
 * pequeño, un icono de trazo y una lista de viñetas —lo mismo que cualquier
 * cuadrícula de servicios—. Ahora el numeral es el elemento gráfico: va en
 * la monoespaciada a tamaño de titular, que es el motivo que el sitio ya usa
 * en la ficha del hero, en las etapas y en los pasos del formulario. El
 * icono va en una pastilla de acento, de modo que los cuatro se leen como un
 * juego. Y los frentes van en filas separadas por regla de 1px, no en
 * viñetas: es la misma retícula de reglas finas que ordena el resto de la
 * página.
 *
 * **Por qué todas miden lo mismo.** La rejilla las estira a la altura de su
 * fila y las filas de frentes se reparten el alto sobrante, así que la
 * categoría de tres frentes respira más que la de cinco en vez de dejar un
 * hueco al pie. Sin ese reparto, con 3 y 5 frentes la diferencia era de
 * 111 px de blanco dentro de la tarjeta corta.
 */
export function TarjetaCategoria({ categoria, numero, textos }: Props) {
  const { nombre, items } = textos.categorias[categoria.clave];

  return (
    <div className="tarjeta-categoria">
      <div className="categoria-cabecera">
        <span className="dato categoria-numero">{numero}</span>
        <span className="categoria-insignia">
          <Icono nombre={categoria.icono} tamano={24} />
        </span>
      </div>

      <h3 className="categoria-titulo">{nombre}</h3>

      <ul className="categoria-items">
        {items.map((item) => (
          <li key={item.nombre} className="categoria-item">
            <span>
              {item.nombre}

              {/* La norma que respalda el frente, cuando la hay. Va debajo y
                  en la monoespaciada de las cifras, que es como el sitio
                  cita ya sus otras fuentes. */}
              {item.nota ? <span className="dato categoria-nota">{item.nota}</span> : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
