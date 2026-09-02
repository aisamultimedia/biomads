import type { ClaveCliente } from "@/idioma";
import autopistaRioMagdalena from "@/logo/clientes/autopista-rio-magdalena.png";
import grupoEnergiaBogota from "@/logo/clientes/grupo-energia-bogota.png";
import ibal from "@/logo/clientes/ibal.png";

/**
 * Clientes declarados en el portafolio — estructura.
 *
 * Los nombres son texto y viven en el diccionario, bajo `clientes.nombres`.
 * Aquí solo la clave y el logo.
 *
 * No hay nada más que nombre y logo a propósito: el portafolio no documenta
 * alcance, año ni duración de estos encargos, y aquí no se completa lo que
 * no consta. Toda la banda depende de `permisos.nombrarClientes`.
 */
export const clientes: readonly { clave: ClaveCliente; logo: typeof ibal }[] = [
  { clave: "autopista-rio-magdalena", logo: autopistaRioMagdalena },
  { clave: "ibal", logo: ibal },
  { clave: "grupo-energia-bogota", logo: grupoEnergiaBogota },
];
