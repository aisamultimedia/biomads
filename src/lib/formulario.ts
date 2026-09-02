import { diccionario, type Diccionario } from "@/idioma";
import { CLAVES_SERVICIO, type ClaveServicioFormulario } from "@/lib/validacion";

/**
 * Opciones del desplegable "tipo de servicio", con su rótulo en el idioma
 * del visitante. Los nombres no se escriben dos veces: son los mismos que
 * ya usa la sección de servicios, tomados del diccionario.
 *
 * Solo para el servidor. El formulario es componente de cliente y recibe
 * el resultado por props: así no arrastra el diccionario entero al
 * navegador por diez rótulos.
 */
export type OpcionServicio = { valor: ClaveServicioFormulario; rotulo: string };

export function opcionesDeServicio(t: Diccionario): OpcionServicio[] {
  return CLAVES_SERVICIO.map((valor) => ({ valor, rotulo: rotuloServicio(valor, t) }));
}

/**
 * Rótulo de una clave de servicio. Sin diccionario usa el español: es el
 * idioma en el que BIOMADS lee el correo, sea cual sea el del visitante.
 */
export function rotuloServicio(
  clave: ClaveServicioFormulario,
  t: Diccionario = diccionario("es"),
): string {
  if (clave === "otro") return t.contacto.formulario.servicioOtro;
  if (clave in t.servicios.detallados) {
    return t.servicios.detallados[clave as keyof typeof t.servicios.detallados].titulo;
  }
  return t.servicios.listados[clave as keyof typeof t.servicios.listados];
}
