/**
 * Juego de iconos del sitio.
 *
 * Dibujados aquí, no importados: una librería traería mil glifos con otra
 * rejilla, otro grosor y otro criterio de redondeo. Todos comparten rejilla
 * de 24, trazo `currentColor` y `stroke-width` del token `--trazo-icono`,
 * así que heredan el color de la superficie sin excepciones y no hay que
 * declarar una variante clara y otra oscura de cada uno.
 *
 * Son decorativos: acompañan a un rótulo que ya dice lo mismo. Por eso van
 * con `aria-hidden` y sin `<title>`. Si alguno llegara a quedarse solo,
 * el texto tiene que estar en el elemento que lo contiene.
 */

export type NombreIcono =
  /* Etapas del estudio ambiental */
  | "identificacion"
  | "evaluacion"
  | "prevencion"
  | "compensacion"
  | "permisos"
  /* Valores corporativos */
  | "excelencia"
  | "sostenibilidad"
  | "integridad"
  | "innovacion"
  | "social"
  /* Servicios */
  | "huella"
  | "epifita"
  | "arbol"
  | "portapapeles"
  | "prismaticos"
  | "libro"
  | "ciclo"
  | "conversacion"
  /* Contacto */
  | "correo"
  | "telefono"
  | "ubicacion";

/* Cada entrada es el interior del <svg>, sobre la rejilla de 24×24.
   Sin `fill`: todo se resuelve con trazo, que es lo que permite que el
   grosor sea uniforme y que el icono funcione a cualquier tamaño. */
const trazos: Record<NombreIcono, React.ReactNode> = {
  /* Lupa: reconocer lo que hay antes de medirlo. */
  identificacion: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.4 15.4 21 21" />
    </>
  ),

  /* Serie de barras sobre eje: la medición. */
  evaluacion: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8.5 20v-5" />
      <path d="M13 20v-9" />
      <path d="M17.5 20v-6.5" />
    </>
  ),

  /* Escudo: evitar el impacto y contenerlo. */
  prevencion: (
    <>
      <path d="M12 3 4.5 6v5.7c0 4.2 3 7.7 7.5 9.3 4.5-1.6 7.5-5.1 7.5-9.3V6L12 3Z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </>
  ),

  /* Brote de dos hojas: reponer lo que se afectó. */
  compensacion: (
    <>
      <path d="M12 21v-7.5" />
      <path d="M12 13.5c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6Z" />
      <path d="M12 17c-2.8 0-5-2.2-5-5 2.8 0 5 2.2 5 5Z" />
    </>
  ),

  /* Documento sellado: el trámite ante la autoridad. */
  permisos: (
    <>
      <path d="M13 3H6v18h12V8l-5-5Z" />
      <path d="M13 3v5h5" />
      <circle cx="12" cy="14.5" r="2.2" />
      <path d="M10.4 16.3 9.9 19.4l2.1-1.1 2.1 1.1-.5-3.1" />
    </>
  ),

  /* Diana: precisión, no volumen. */
  excelencia: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="12" cy="12" r="0.6" />
    </>
  ),

  /* Hoja con nervadura. */
  sostenibilidad: (
    <>
      <path d="M4 20C4 11.7 10.7 5 19 5c0 8.3-6.7 15-15 15Z" />
      <path d="M4 20 13.5 10.5" />
    </>
  ),

  /* Balanza: lo que se declara pesa lo que dice pesar. Los platos van como
     cuencos y no como triángulos —en triángulo se leían como dos flechas. */
  integridad: (
    <>
      <path d="M12 4.2V20" />
      <path d="M7.5 20h9" />
      <path d="M4 8h16" />
      <path d="M4 8v5.4" />
      <path d="M20 8v5.4" />
      <path d="M1.3 13.4h5.4" />
      <path d="M1.3 13.4q2.7 4 5.4 0" />
      <path d="M17.3 13.4h5.4" />
      <path d="M17.3 13.4q2.7 4 5.4 0" />
    </>
  ),

  /* Bombilla: la solución técnica que no existía. El casquillo es lo que la
     separa de un globo; sin él el arco solo se lee como un círculo. */
  innovacion: (
    <>
      <path d="M9 16.2a6 6 0 1 1 6 0" />
      <path d="M9 16.2v1.8q0 1.5 1.5 1.5h3q1.5 0 1.5-1.5v-1.8" />
    </>
  ),

  /* Dos figuras: la comunidad alrededor del frente de obra. */
  social: (
    <>
      <circle cx="9.2" cy="8" r="3.2" />
      <path d="M3.4 20c0-3.2 2.6-5.8 5.8-5.8s5.8 2.6 5.8 5.8" />
      <path d="M16.2 5.4a3.2 3.2 0 0 1 0 5.2" />
      <path d="M17.6 14.8c1.9 1 3 2.9 3 5.2" />
    </>
  ),

  /* Huella: el monitoreo de fauna se documenta con registros, no con
     retratos de animales. */
  huella: (
    <>
      <ellipse cx="12" cy="16.4" rx="4.3" ry="3.4" />
      <ellipse cx="5.9" cy="10.9" rx="1.9" ry="2.5" />
      <ellipse cx="10" cy="7.9" rx="1.8" ry="2.6" />
      <ellipse cx="14.6" cy="7.9" rx="1.8" ry="2.6" />
      <ellipse cx="18.4" cy="11.1" rx="1.9" ry="2.5" />
    </>
  ),

  /* Roseta sobre una rama: la epífita se define por dónde vive. Las hojas
     salen verticales del centro y luego se arquean; rectas se leían como
     una flecha apuntando a la rama. */
  epifita: (
    <>
      <path d="M3 18h18" />
      <path d="M12 18V6.6" />
      <path d="M12 18c0-4.4-1.1-7.6-3.4-9.7" />
      <path d="M12 18c0-4.4 1.1-7.6 3.4-9.7" />
    </>
  ),

  /* Conífera: copa y tronco. Con copa redonda se leía como una piruleta y
     chocaba con la lupa y con la diana. */
  arbol: (
    <>
      <path d="M12 3 7 10.5h10L12 3Z" />
      <path d="M12 9 5 18.5h14L12 9Z" />
      <path d="M12 18.5V21" />
    </>
  ),

  /* Portapapeles: el inventario se levanta anotando. */
  portapapeles: (
    <>
      <rect x="5.5" y="4" width="13" height="17" rx="1.5" />
      <rect x="9" y="2.5" width="6" height="3" rx="1" />
      <path d="M9 11.5h6" />
      <path d="M9 15.5h4" />
    </>
  ),

  /* Prismáticos: flora y fauna se caracterizan observando en campo. */
  prismaticos: (
    <>
      <circle cx="6.5" cy="15" r="4.2" />
      <circle cx="17.5" cy="15" r="4.2" />
      <path d="M10.7 15h2.6" />
      <path d="M5 11.2V6a1.5 1.5 0 0 1 1.5-1.5h1A1.5 1.5 0 0 1 9 6v5.4" />
      <path d="M19 11.2V6a1.5 1.5 0 0 0-1.5-1.5h-1A1.5 1.5 0 0 0 15 6v5.4" />
    </>
  ),

  /* Libro abierto: educación ambiental. */
  libro: (
    <>
      <path d="M12 7c-1.8-1.5-4.3-2.3-7.5-2.3H3.5v13.6h1c3.2 0 5.7.8 7.5 2.3" />
      <path d="M12 7c1.8-1.5 4.3-2.3 7.5-2.3h1v13.6h-1c-3.2 0-5.7.8-7.5 2.3" />
      <path d="M12 7v13.6" />
    </>
  ),

  /* Ciclo: el desarrollo sostenible es lo que se puede repetir. */
  ciclo: (
    <>
      <path d="M4 12a8 8 0 0 1 13.3-6" />
      <path d="M20 12a8 8 0 0 1-13.3 6" />
      <path d="M17.3 2.2V6h-3.8" />
      <path d="M6.7 21.8V18h3.8" />
    </>
  ),

  /* Globo con dos renglones: la asesoría es una conversación. */
  conversacion: (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-5 4V5.5Z" />
      <path d="M8 8.5h8" />
      <path d="M8 12h5" />
    </>
  ),

  correo: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.9 6.6 7.2 5.3a1.5 1.5 0 0 0 1.8 0l7.2-5.3" />
    </>
  ),

  telefono: (
    <>
      <path d="M5 3.5h3.2l1.6 4-2 1.5a11.5 11.5 0 0 0 5.7 5.7l1.5-2 4 1.6V19a1.5 1.5 0 0 1-1.6 1.5C9.6 19.9 4.1 14.4 3.5 5.1A1.5 1.5 0 0 1 5 3.5Z" />
    </>
  ),

  ubicacion: (
    <>
      <path d="M12 21.5s7-6.1 7-11.2a7 7 0 1 0-14 0c0 5.1 7 11.2 7 11.2Z" />
      <circle cx="12" cy="10.1" r="2.6" />
    </>
  ),
};

type Props = {
  nombre: NombreIcono;
  /** Lado del icono en píxeles. Por defecto 24, la rejilla nativa. */
  tamano?: number;
  className?: string;
};

export function Icono({ nombre, tamano = 24, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={tamano}
      height={tamano}
      fill="none"
      stroke="currentColor"
      strokeWidth="var(--trazo-icono)"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`flex-none ${className}`}
    >
      {trazos[nombre]}
    </svg>
  );
}
