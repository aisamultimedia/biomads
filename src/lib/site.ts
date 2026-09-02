import type { Diccionario } from "@/idioma/tipos";

export type ClaveSeccion = keyof Diccionario["nav"]["secciones"];

/**
 * Datos de la empresa y configuración del sitio.
 * Todo sale de CONTENIDO.md. Lo que no está ahí no se publica.
 */

export const empresa = {
  razonSocial: "BIOMADS S.A.S",
  nombre: "BIOMADS",
  lema: "Dejando huella",
  constitucion: 2017,
  sede: "Ibagué, Tolima",
  correo: "gerencia@biomads.com",
  telefono: "311 527 6301",
  telefonoE164: "+573115276301",
} as const;

/**
 * Años transcurridos desde la constitución.
 *
 * Se calcula, no se escribe: así no queda un número congelado que hay que
 * acordarse de subir cada enero. Se resuelve en compilación, de modo que
 * cambia con cada despliegue.
 *
 * Es una diferencia de años, y el brief no dice el mes de constitución: si
 * la sociedad se constituyó en diciembre de 2017, hasta diciembre el número
 * real es uno menos. Por eso el año aparece siempre al lado, para que la
 * cifra sea comprobable. Con la fecha exacta esto se vuelve preciso.
 */
export function aniosDesdeConstitucion(): number {
  return new Date().getFullYear() - empresa.constitucion;
}

/** Año en que se desarrolló el sitio; va en el pie. */
export const sitioDesarrolladoEn = 2026;

export const whatsapp = `https://wa.me/${empresa.telefonoE164.replace("+", "")}`;
export const mailto = `mailto:${empresa.correo}`;

/**
 * Banderas de contenido sujeto a autorización del cliente.
 * Ver CONTENIDO.md → "Lo que hay que pedirle a BIOMADS", punto 3.
 */
export const permisos = {
  /**
   * Nombrar y mostrar logo de Autopista Río Magdalena, IBAL y Grupo Energía
   * Bogotá. Activada el 2 de septiembre de 2026, cuando BIOMADS entregó los
   * tres logos para publicarlos. Si la autorización escrita de alguno de los
   * tres no llegara a estar en firme, basta volver a `false`: la banda
   * desaparece del sitio sin dejar hueco.
   */
  nombrarClientes: true,
} as const;

export type ItemNav = {
  /** Ancla de la página única. */
  href: `#${string}`;
  /** Clave en `nav.secciones` del diccionario. El rótulo es texto. */
  clave: ClaveSeccion;
};

/**
 * Navegación: cuatro anclas de la misma página y nada más.
 *
 * Los desplegables que llevaban a las fichas de servicio y de proyecto se
 * quitaron: en un sitio de una sola página abrían un submenú para sacar al
 * visitante de ella. Las fichas siguen existiendo y se alcanzan desde su
 * sección —el popover del servicio y la tarjeta del proyecto—, que es donde
 * la ficha viene a cuento.
 */
export const navegacion: readonly ItemNav[] = [
  { href: "#nosotros", clave: "nosotros" },
  { href: "#servicios", clave: "servicios" },
  { href: "#proyectos", clave: "proyectos" },
  { href: "#contacto", clave: "contacto" },
] as const;

/**
 * URL pública del sitio.
 *
 * En producción sale de NEXT_PUBLIC_SITE_URL (el dominio definitivo). En las
 * vistas previas de Vercel se usa la URL que Vercel asigna a cada
 * despliegue, para que los enlaces canónicos y el Open Graph apunten a lo
 * que el revisor está viendo y no a producción.
 */
export function sitioUrl(): string {
  const propia = process.env.NEXT_PUBLIC_SITE_URL;
  if (propia) return propia.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
