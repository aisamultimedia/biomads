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

export const whatsapp = `https://wa.me/${empresa.telefonoE164.replace("+", "")}`;
export const mailto = `mailto:${empresa.correo}`;

/**
 * Banderas de contenido pendiente de autorización del cliente.
 * Ver CONTENIDO.md → "Lo que hay que pedirle a BIOMADS", punto 3.
 * No poner en true sin autorización escrita.
 */
export const permisos = {
  /** Nombrar y mostrar logo de Autopista Río Magdalena, IBAL y Grupo Energía Bogotá. */
  nombrarClientes: false,
} as const;

export type ItemNav = {
  /** Ancla de la página única, o ruta para las páginas de detalle. */
  href: string;
  rotulo: string;
  /** Páginas hijas. Se despliegan en la barra y se anidan en el menú móvil. */
  hijos?: readonly { href: string; rotulo: string; nota?: string }[];
};

export const navegacion: readonly ItemNav[] = [
  { href: "#nosotros", rotulo: "Nosotros" },
  {
    href: "#servicios",
    rotulo: "Servicios",
    hijos: [
      {
        href: "/servicios/monitoreo-fauna",
        rotulo: "Monitoreo de fauna",
        nota: "Caracterización para el estudio ambiental",
      },
      {
        href: "/servicios/flora-epifita",
        rotulo: "Flora epífita reubicada",
        nota: "Mantenimiento y seguimiento con registros",
      },
    ],
  },
  {
    href: "#proyectos",
    rotulo: "Proyectos",
    hijos: [
      { href: "/proyectos/solinter-2017", rotulo: "SOLINTER", nota: "Huila · 2017 · 6 meses" },
      { href: "/proyectos/ges-2018", rotulo: "GES", nota: "El Quimbo · 2018 · 8 meses" },
    ],
  },
  { href: "#contacto", rotulo: "Contacto" },
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
