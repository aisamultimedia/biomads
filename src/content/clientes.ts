/**
 * Clientes declarados en el portafolio.
 * De CONTENIDO.md → "Clientes en portafolio".
 *
 * Solo el nombre y el logo. El portafolio no documenta alcance, año ni
 * duración de estos encargos —los dos proyectos con ficha completa son
 * otros—, así que la banda no afirma nada más que la relación. Cualquier
 * cifra o descripción aquí sería inventada.
 *
 * Toda la sección depende de `permisos.nombrarClientes`. En `false`
 * desaparece del sitio sin dejar hueco.
 */

import autopistaRioMagdalena from "@/logo/clientes/autopista-rio-magdalena.png";
import grupoEnergiaBogota from "@/logo/clientes/grupo-energia-bogota.png";
import ibal from "@/logo/clientes/ibal.png";

export const clientes = [
  { nombre: "Autopista Río Magdalena", logo: autopistaRioMagdalena },
  { nombre: "IBAL", logo: ibal },
  { nombre: "Grupo Energía Bogotá", logo: grupoEnergiaBogota },
] as const;
