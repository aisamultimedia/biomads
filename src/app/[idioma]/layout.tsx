import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AvisoCookies } from "@/components/layout/AvisoCookies";
import { BotonSubir } from "@/components/layout/BotonSubir";
import { DesplazamientoSuave } from "@/components/layout/DesplazamientoSuave";
import { Revelador } from "@/components/motion/Revelador";
import { diccionario, IDIOMAS, comoIdioma } from "@/idioma";
import { sitioUrl } from "@/lib/site";
import "../globals.css";

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
  src: "../../fonts/Switzer-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--fuente-switzer",
  fallback: ["Helvetica Neue", "Helvetica", "Arial"],
});

/**
 * Una ruta estática por idioma. Con `dynamicParams` apagado, cualquier otro
 * primer segmento da 404 en vez de intentar renderizar un idioma inexistente.
 */
export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LayoutProps<"/[idioma]">): Promise<Metadata> {
  const { idioma: segmento } = await params;
  const idioma = comoIdioma(segmento);
  const t = diccionario(idioma);

  return {
    title: { default: t.meta.titulo, template: t.meta.plantillaTitulo },
    description: t.meta.descripcionPortada,
    metadataBase: new URL(sitioUrl()),
    /* Una alternativa por idioma más `x-default`, que apunta al de por
       defecto: es lo que le dice al buscador qué versión servir a quien no
       encaja en ninguna. */
    alternates: {
      canonical: `/${idioma}`,
      languages: {
        ...Object.fromEntries(IDIOMAS.map((i) => [diccionario(i).etiquetaHtml, `/${i}`])),
        "x-default": `/${IDIOMAS[0]}`,
      },
    },
  };
}

/* Único color literal del código. El navegador lee esto antes de que exista
   CSS, así que no puede salir de una custom property: es --color-paper de
   tokens.css escrito a mano. Si allí cambia, cambia aquí. */
export const viewport: Viewport = {
  themeColor: "#FAF9F6",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[idioma]">) {
  const { idioma: segmento } = await params;
  const idioma = comoIdioma(segmento);
  const t = diccionario(idioma);

  return (
    <html
      lang={t.etiquetaHtml}
      className={`${newsreader.variable} ${switzer.variable} ${jetbrainsMono.variable}`}
      // El scroll suave es para los anclas. Con este atributo Next lo apaga
      // mientras vuelve arriba al cambiar de página, para que el salto no se
      // anime encima de la transición.
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col">
        <DesplazamientoSuave />

        <Revelador />

        <a href="#contenido" className="salto-contenido">
          {t.nav.saltoContenido}
        </a>

        <Header idioma={idioma} />

        {/* Destino del botón de volver arriba. Va antes de la cabecera
            para que el salto llegue al principio de la página y no al
            principio del contenido, que queda por debajo de la barra. */}
        <span id="inicio" aria-hidden="true" />

        <main id="contenido" className="compensa-cabecera flex-1">
          {children}
        </main>

        <Footer idioma={idioma} />

        <BotonSubir etiqueta={t.nav.volverArriba} />

        <AvisoCookies textos={t.cookies} />
      </body>
    </html>
  );
}
