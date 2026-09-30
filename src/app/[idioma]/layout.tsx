import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BotonSubir } from "@/components/layout/BotonSubir";
import { DesplazamientoSuave } from "@/components/layout/DesplazamientoSuave";
import { Revelador } from "@/components/motion/Revelador";
import { diccionario, IDIOMAS, comoIdioma } from "@/idioma";
import { sitioUrl } from "@/lib/site";
import "../globals.css";

/**
 * Las tres fuentes se sirven desde el propio proyecto.
 *
 * Newsreader y JetBrains Mono se pedían a `next/font/google`, que las
 * descargaba en tiempo de compilación. Dejó de funcionar: el CSS que Google
 * sirve ahora trae varias fuentes por cara y el reemplazador de Turbopack
 * solo admite una —«next/font/google queries have exactly one entry»—, así
 * que el build entero fallaba. Es un fallo del andamiaje, no del sitio, y
 * habría roto también el despliegue.
 *
 * Alojarlas arregla eso y de paso quita una dependencia de red del build,
 * una petición a un tercero en cada visita y el riesgo de que la tipografía
 * del sitio cambie porque Google decida servir otra cosa. Es lo que este
 * proyecto ya hacía con Switzer desde el principio.
 *
 * De cada una se guarda solo el subconjunto latino: es el que usa el sitio,
 * en español y en inglés, y pesa la mitad que el archivo completo.
 */

/* Títulos. Variable de 200 a 800, sin el eje óptico: son 57 kB en vez de
   129, y el ajuste apenas se nota en el rango que usamos (21-65 px). */
const newsreader = localFont({
  src: "../../fonts/Newsreader-Variable.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--fuente-newsreader",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/* Datos, duraciones y etiquetas de ficha. El subconjunto latino del archivo
   variable son 31 kB, menos que las dos instancias estáticas que se servían
   antes. */
const jetbrainsMono = localFont({
  src: "../../fonts/JetBrainsMono-Variable.woff2",
  weight: "400 500",
  style: "normal",
  display: "swap",
  variable: "--fuente-jetbrains",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

/* Cuerpo e interfaz. */
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

      </body>
    </html>
  );
}
