import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AvisoCookies } from "@/components/layout/AvisoCookies";
import { DesplazamientoSuave } from "@/components/layout/DesplazamientoSuave";
import { Proveedores } from "@/components/motion/Proveedores";
import { empresa, sitioUrl } from "@/lib/site";
import "./globals.css";

/* Títulos — variable. */
const newsreader = Newsreader({
  subsets: ["latin"],
  /* Sin el eje óptico: Newsreader pasa de 129 kB a 57 kB. Es la fuente del
     título, o sea del elemento que marca el LCP, y el ajuste óptico apenas
     se nota en el rango que usamos (21-65px, porque el cuerpo es Switzer).
     72 kB por un matiz invisible no se pagan. */
  display: "swap",
  variable: "--fuente-newsreader",
});

/* Datos, duraciones y etiquetas de ficha. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  // Instancias estáticas en vez de la variable completa: solo se usan dos
  // pesos —400 en cifras, 500 en las etiquetas— y el archivo variable pesa
  // 129 kB, más que Newsreader y Switzer juntas.
  weight: ["400", "500"],
  display: "swap",
  variable: "--fuente-jetbrains",
});

/* Cuerpo e interfaz — variable, descargada de fontshare.com. */
const switzer = localFont({
  src: "../fonts/Switzer-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--fuente-switzer",
  fallback: ["Helvetica Neue", "Helvetica", "Arial"],
});

export const metadata: Metadata = {
  title: {
    default: `${empresa.nombre} — Estudios y gestión ambiental`,
    template: `%s — ${empresa.nombre}`,
  },
  description:
    "Estudios y gestión ambiental con soporte técnico verificable. Monitoreo de biodiversidad de fauna y seguimiento de flora epífita reubicada.",
  metadataBase: new URL(sitioUrl()),
};

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-CO"
      className={`${newsreader.variable} ${switzer.variable} ${jetbrainsMono.variable}`}
      // El scroll suave es para los anclas. Con este atributo Next lo apaga
      // mientras vuelve arriba al cambiar de página, para que el salto no se
      // anime encima de la transición.
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col">
        <DesplazamientoSuave />

        <Proveedores>
          <a href="#contenido" className="salto-contenido">
            Saltar al contenido
          </a>

          <Header />

          <main id="contenido" className="compensa-cabecera flex-1">
            {children}
          </main>

          <Footer />

          <AvisoCookies />
        </Proveedores>
      </body>
    </html>
  );
}
