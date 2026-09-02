import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Boton } from "@/components/ui/Boton";
import { Enlace } from "@/components/ui/Enlace";
import { FichaDatos } from "@/components/ui/FichaDatos";
import { MarcoFoto } from "@/components/ui/MarcoFoto";
import { Entrada } from "@/components/motion/Entrada";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { TituloPorLineas } from "@/components/motion/TituloPorLineas";

export const metadata: Metadata = {
  title: "Sistema de diseño",
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */

function Seccion({
  rotulo,
  titulo,
  children,
  alterna = false,
}: {
  rotulo: string;
  titulo: string;
  children: ReactNode;
  alterna?: boolean;
}) {
  return (
    <section className={alterna ? "bg-paper-alt" : undefined}>
      <div className="mx-auto w-full max-w-ancho px-6 py-24 md:py-40">
        <RevealGroup tipos={["lateral", "titulo"]}>
          <p className="etiqueta text-accent-deep">{rotulo}</p>
          <h2 className="mt-4 text-2xl">{titulo}</h2>
        </RevealGroup>
        <div className="mt-16">{children}</div>
      </div>
    </section>
  );
}

function Muestra({
  nombre,
  valor,
  contraste,
  clase,
  borde = false,
}: {
  nombre: string;
  valor: string;
  contraste?: string;
  clase: string;
  borde?: boolean;
}) {
  return (
    <div>
      <div
        className={`h-24 rounded-md ${clase} ${borde ? "border border-line-strong" : ""}`}
      />
      <p className="etiqueta mt-3 text-ink">{nombre}</p>
      <p className="dato mt-1 text-xs text-ink-muted">{valor}</p>
      {contraste ? <p className="dato mt-1 text-xs text-ink-muted">{contraste}</p> : null}
    </div>
  );
}

function Linea({
  token,
  medidas,
  clase,
  nota,
}: {
  token: string;
  medidas: string;
  clase: string;
  nota: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 border-t border-line py-8 md:grid-cols-[200px_1fr] md:gap-8">
      <div>
        <p className="etiqueta text-ink">{token}</p>
        <p className="dato mt-1 text-xs text-ink-muted">{medidas}</p>
        <p className="mt-1 text-xs text-ink-muted">{nota}</p>
      </div>
      {/* La muestra se ve a tamaño real. En pantallas angostas una palabra
          de 65px no cabe, así que desborda dentro de su propia caja en vez
          de empujar la página. */}
      <div className="overflow-x-auto">
        <p className={`font-titulo text-ink ${clase}`}>
          Monitoreo de biodiversidad de fauna
        </p>
      </div>
    </div>
  );
}

const escalaEspaciado = [
  ["1", "4px"],
  ["2", "8px"],
  ["3", "12px"],
  ["4", "16px"],
  ["6", "24px"],
  ["8", "32px"],
  ["12", "48px"],
  ["16", "64px"],
  ["24", "96px"],
  ["32", "128px"],
  ["40", "160px"],
] as const;

const familias = [
  {
    familia: "Newsreader",
    uso: "Títulos",
    clase: "font-titulo",
    muestra: "Aa Bb Cc",
    nota: "Variable, eje óptico automático",
  },
  {
    familia: "Switzer",
    uso: "Cuerpo e interfaz",
    clase: "font-cuerpo",
    muestra: "Aa Bb Cc",
    nota: "Variable 100–900, local",
  },
  {
    familia: "JetBrains Mono",
    uso: "Datos y etiquetas",
    clase: "font-mono",
    muestra: "Aa 0123",
    nota: "Cifras tabulares",
  },
] as const;

/* Cada muestra entra con el gesto que describe. */
const vocabulario = [
  {
    tipo: "texto",
    titulo: "Asentar · texto",
    nota: "Opacidad 0→1 y 16px→0. Párrafos, filas de ficha, ítems, botones.",
  },
  {
    tipo: "titulo",
    titulo: "Revelar · título",
    nota: "Máscara que sube mientras el bloque se asienta. Los h2 y h3.",
  },
  {
    tipo: "panel",
    titulo: "Asentar · panel",
    nota: "Opacidad, escala 0,98→1 y 12px. Tarjetas y avisos.",
  },
  {
    tipo: "lateral",
    titulo: "Lateral",
    nota: "Opacidad y −12px→0 desde la izquierda. Numerales y rótulos.",
  },
  {
    tipo: "texto",
    titulo: "Trazar · regla",
    nota: "La línea de 1px se dibuja de izquierda a derecha. Esta misma que ve arriba.",
  },
  {
    tipo: "texto",
    titulo: "Revelar · imagen",
    nota: "El marco descubre desde abajo y la foto se asienta de 1,08 a 1. Ver abajo.",
  },
] as const;

const duraciones = [
  ["180ms", "Micro", "Hover, foco, pulsación, subrayados."],
  ["250ms", "Corta", "Paneles, cabecera, salidas, menú."],
  ["600ms", "Entrada", "Texto y paneles, una sola vez."],
  ["700ms", "Título", "Máscara ascendente."],
  ["800ms", "Regla", "Trazo de izquierda a derecha."],
  ["1000ms", "Imagen", "Máscara y escala 1,08→1."],
  ["60ms", "Escalonado", "Entre hermanos de un grupo."],
  ["70ms", "Paso de carga", "Entre índices de la secuencia del hero."],
  ["250ms", "Entre páginas", "La página vieja sale en 150ms; la nueva entra en 250ms."],
] as const;

/* ------------------------------------------------------------------ */

export default function PaginaEstilo() {
  return (
    <>
      {/* ---------------- Hero: título por líneas ---------------- */}
      <section className="mx-auto w-full max-w-ancho px-6 pb-24 pt-24 md:pb-40 md:pt-32">
        <Entrada as="p" tipo="lateral" className="etiqueta text-accent-deep">
          Fase 1 · para aprobación
        </Entrada>
        <TituloPorLineas
          indice={1}
          className="mt-8 text-4xl md:text-5xl"
          lineas={["Sistema de diseño", "de la web de BIOMADS"]}
        />
        <Entrada as="p" indice={4} className="medida mt-8 text-lg text-ink-muted">
          Paleta, escala tipográfica, espaciado y movimiento. Todo sale de{" "}
          <span className="dato text-ink">src/styles/tokens.css</span>. Las relaciones
          de contraste están medidas, no estimadas.
        </Entrada>
        <Entrada className="mt-12" indice={5}>
          <div className="flex flex-wrap gap-4">
            <Boton href="/">Volver al inicio</Boton>
            <Boton variante="secundario" href="/servicios">
              Recorrer la navegación
            </Boton>
          </div>
        </Entrada>
      </section>

      {/* ---------------- Color ---------------- */}
      <Seccion rotulo="01" titulo="Color" alterna>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <Muestra nombre="paper" valor="#FAF9F6" clase="bg-paper" borde />
          <Muestra nombre="paper-alt" valor="#F1F3EE" clase="bg-paper-alt" borde />
          <Muestra nombre="dark" valor="#12261B" clase="bg-dark" />
          <Muestra nombre="line" valor="#DCDFD6" clase="bg-line" />
          <Muestra
            nombre="ink"
            valor="#1B3D2A"
            contraste="11.41:1 sobre paper · AAA"
            clase="bg-ink"
          />
          <Muestra
            nombre="ink-muted"
            valor="#4A5D50"
            contraste="6.71:1 sobre paper · AA"
            clase="bg-ink-muted"
          />
          <Muestra
            nombre="accent"
            valor="#4CAF50"
            contraste="2.64:1 sobre paper · nunca texto"
            clase="bg-accent"
          />
          <Muestra
            nombre="accent-deep"
            valor="#2E7D3E"
            contraste="4.84:1 sobre paper · AA"
            clase="bg-accent-deep"
          />
        </div>

        <div className="mt-24 grid gap-12 md:grid-cols-2">
          <div>
            <p className="etiqueta text-ink">Regla del acento</p>
            <p className="medida mt-4 text-ink-muted">
              <span className="text-accent-deep">Este texto va en accent-deep</span> y
              alcanza 4.84:1. El verde del logo se reserva para subrayados, viñetas,
              bordes e indicadores de estado, donde no carga legibilidad.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Viñeta en accent",
                "Borde de estado en accent",
                "Subrayado de enlace en accent",
              ].map((item) => (
                <li key={item} className="flex items-baseline gap-3 text-ink">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 flex-none translate-y-[-0.15em] rounded-sm bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="superficie-oscura rounded-md bg-dark p-8">
            <p className="etiqueta text-ink-invert-muted">Sobre superficie oscura</p>
            <p className="mt-4 text-ink-invert">ink-invert sobre dark: 14.25:1 · AAA</p>
            <p className="mt-2 text-ink-invert-muted">
              ink-invert-muted sobre dark: 7.67:1 · AAA
            </p>
            <p className="mt-6 border-t border-line-invert pt-6 text-sm text-ink-invert-muted">
              Dos tokens añadidos a la paleta original: sobre --dark, --ink-muted solo
              llega a 2.25:1 y --line se lee como un trazo blanco.
            </p>
            <div className="mt-8">
              <Boton variante="invertido">Botón invertido</Boton>
            </div>
          </div>
        </div>
      </Seccion>

      {/* ---------------- Tipografía ---------------- */}
      <Seccion rotulo="02" titulo="Tipografía">
        <div className="grid gap-8 md:grid-cols-3">
          {familias.map((f) => (
            <div key={f.familia} className="border-t border-line pt-6">
              <p className={`text-4xl text-ink ${f.clase}`}>{f.muestra}</p>
              <p className="etiqueta mt-6 text-ink">{f.familia}</p>
              <p className="mt-1 text-sm text-ink-muted">{f.uso}</p>
              <p className="dato mt-1 text-xs text-ink-muted">{f.nota}</p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <p className="etiqueta text-ink-muted">
            Escala de razón 1.25 · anclada en 17px
          </p>
          <div className="mt-8">
            <Linea token="text-5xl" medidas="65px / 1.05 / -0.02em" clase="text-5xl" nota="hero" />
            <Linea
              token="text-4xl"
              medidas="52px / 1.1 / -0.02em"
              clase="text-4xl"
              nota="título de página"
            />
            <Linea
              token="text-3xl"
              medidas="42px / 1.1 / -0.02em"
              clase="text-3xl"
              nota="título de sección"
            />
            <Linea token="text-2xl" medidas="33px / 1.2" clase="text-2xl" nota="título mediano" />
            <Linea token="text-xl" medidas="27px / 1.2" clase="text-xl" nota="título mediano" />
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="border-t border-line pt-6">
              <p className="etiqueta text-ink">text-lg · 21px / 1.5</p>
              <p className="medida mt-4 text-lg text-ink">
                Entrada de sección. Que el estudio no sea simplemente una lista de
                especies, sino información de campo confiable.
              </p>
            </div>
            <div className="border-t border-line pt-6">
              <p className="etiqueta text-ink">text-base · 17px / 1.6</p>
              <p className="medida mt-4 text-ink">
                Cuerpo. La medida de lectura está limitada a 68 caracteres con la clase{" "}
                <span className="dato">.medida</span>, así que este párrafo no se
                ensancha por más grande que sea la pantalla. El color es --ink, que
                alcanza AAA sobre papel.
              </p>
            </div>
            <div className="border-t border-line pt-6">
              <p className="etiqueta text-ink">text-sm · 15px / 1.6</p>
              <p className="mt-4 text-sm text-ink-muted">
                Texto secundario y notas al pie de un bloque. En --ink-muted, 6.71:1.
              </p>
            </div>
            <div className="border-t border-line pt-6">
              <p className="etiqueta text-ink">text-xs · 13px · .etiqueta</p>
              <p className="etiqueta mt-4 text-ink-muted">Rótulo de ficha en versalitas</p>
              <p className="dato mt-3 text-sm text-ink">6 meses · 2017 · 311 527 6301</p>
            </div>
          </div>
        </div>
      </Seccion>

      {/* ---------------- Espaciado ---------------- */}
      <Seccion rotulo="03" titulo="Espaciado" alterna>
        <p className="medida text-ink-muted">
          Escala de 8px. Las utilidades intermedias de Tailwind (
          <span className="dato">p-5</span>, <span className="dato">p-7</span>…) están
          anuladas en los tokens: un valor fuera de escala no existe, así que no puede
          colarse sin que se note.
        </p>
        <ul className="mt-12 flex flex-col gap-4">
          {escalaEspaciado.map(([nombre, px]) => (
            <li key={nombre} className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="dato w-16 flex-none text-xs text-ink-muted">{px}</span>
              <span aria-hidden="true" className="h-4 bg-accent" style={{ width: px }} />
              <span className="dato text-xs text-ink-muted">--spacing-{nombre}</span>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-sm text-ink-muted">
          Ritmo vertical entre secciones en esta página:{" "}
          <span className="dato">96px</span> en móvil, <span className="dato">160px</span>{" "}
          en escritorio.
        </p>
      </Seccion>

      {/* ---------------- Componentes ---------------- */}
      <Seccion rotulo="04" titulo="Componentes e interacción">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <p className="etiqueta text-ink">Botones · todos los estados</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Boton>Primario</Boton>
              <Boton variante="secundario">Secundario</Boton>
              <Boton cargando>Enviando</Boton>
              <Boton disabled>Deshabilitado</Boton>
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              Pase el cursor y luego recorra con Tab: el foco usa anillo propio de 2px en
              --accent-deep, nunca el azul del navegador. Al pulsar, escala 0,98.
            </p>
          </div>

          <div>
            <p className="etiqueta text-ink">Enlaces de texto</p>
            <p className="medida mt-6 text-ink">
              El subrayado crece desde la izquierda al pasar el cursor o al recibir foco.
              Ejemplo: <Enlace href="/proyectos">ver proyectos</Enlace>, o escribir a{" "}
              <Enlace href="mailto:gerencia@biomads.com" externo>
                gerencia@biomads.com
              </Enlace>
              . Con flecha, para &ldquo;ver más&rdquo;:{" "}
              <Enlace flecha href="/proyectos">
                ver el proyecto completo
              </Enlace>
            </p>
          </div>
        </div>

        <div className="mt-24">
          <p className="etiqueta text-ink">Ficha de datos · regla trazada y filas escalonadas</p>
          <FichaDatos
            className="mt-6"
            datos={[
              { rotulo: "Cliente", valor: "SOLINTER S.A.S." },
              { rotulo: "Año", valor: "2017", mono: true },
              { rotulo: "Duración", valor: "6 meses", mono: true },
              { rotulo: "Ubicación", valor: "Garzón y Gigante, Huila" },
            ]}
          />
          <p className="mt-6 text-sm text-ink-muted">
            A 390px se reordena a dos columnas —cuatro datos en dos filas— en vez de
            encogerse hasta ser ilegible.
          </p>
        </div>

        <div className="mt-24">
          <p className="etiqueta text-ink">Marcador de fotografía</p>
          <p className="medida mt-4 text-sm text-ink-muted">
            La proporción y el encuadre ya están resueltos. Cuando lleguen las
            fotografías propias de campo entran sin mover el layout.
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <Reveal tipo="panel" indice={0}>
              <MarcoFoto
                proporcion="3/2"
                descripcion="Jornada de monitoreo de fauna en campo, equipo trabajando."
              />
            </Reveal>
            <Reveal tipo="panel" indice={1}>
              <MarcoFoto
                proporcion="3/2"
                descripcion="Registro de flora epífita reubicada, con instrumento de medición."
              />
            </Reveal>
            <Reveal tipo="panel" indice={2}>
              <MarcoFoto
                proporcion="3/2"
                descripcion="Trabajo de gabinete: revisión de registros e informe."
              />
            </Reveal>
          </div>
        </div>
      </Seccion>

      {/* ---------------- Movimiento ---------------- */}
      <Seccion rotulo="05" titulo="Movimiento" alterna>
        <p className="medida text-ink-muted">
          Tres verbos: <span className="text-ink">revelar</span> (títulos y fotos tras
          una máscara que sube), <span className="text-ink">trazar</span> (las reglas se
          dibujan de izquierda a derecha) y <span className="text-ink">asentar</span>{" "}
          (texto y paneles llegan con un desplazamiento corto y frenada larga). Dos
          curvas: <span className="dato text-ink">cubic-bezier(0.22, 1, 0.36, 1)</span>{" "}
          para lo que entra y{" "}
          <span className="dato text-ink">cubic-bezier(0.4, 0, 1, 1)</span> para lo que
          sale. Sin rebote. Solo transform, opacity y clip-path. El detalle está en{" "}
          <span className="dato text-ink">MOTION.md</span>.
        </p>

        <p className="etiqueta mt-16 text-ink">Vocabulario · cada muestra entra con su gesto</p>
        <RevealGroup
          regla
          tipos={vocabulario.map((v) => v.tipo)}
          className="mt-6 grid gap-8 md:grid-cols-3"
          itemClassName="pt-6"
        >
          {vocabulario.map((v) => (
            <div key={v.titulo}>
              <p className="etiqueta text-ink">{v.titulo}</p>
              <p className="mt-2 text-sm text-ink-muted">{v.nota}</p>
            </div>
          ))}
        </RevealGroup>

        <p className="etiqueta mt-24 text-ink">Duraciones</p>
        <RevealGroup className="mt-6 grid gap-8 md:grid-cols-3" regla itemClassName="pt-6">
          {duraciones.map(([duracion, titulo, nota]) => (
            <div key={titulo}>
              <p className="dato text-2xl text-ink">{duracion}</p>
              <p className="etiqueta mt-4 text-ink">{titulo}</p>
              <p className="mt-2 text-sm text-ink-muted">{nota}</p>
            </div>
          ))}
        </RevealGroup>

        <Reveal regla className="mt-24 pt-8">
          <p className="etiqueta text-ink">Salvaguardas</p>
          <ul className="medida mt-6 flex flex-col gap-4 text-ink-muted">
            <li>
              Con <span className="dato text-ink">prefers-reduced-motion: reduce</span> no
              se mueve nada y el contenido aparece en su estado final. No hay versión
              suavizada. El parallax y las curvas de nivel se apagan.
            </li>
            <li>
              Sin JavaScript (<span className="dato text-ink">scripting: none</span>) los
              estados ocultos se anulan y todo nace visible. La mitad superior de cada
              página entra por CSS y no espera a la hidratación.
            </li>
            <li>
              Cada elemento se revela una sola vez, cuando cruza una línea un 12 % por
              encima del borde inferior: nada arranca pegado al borde.
            </li>
            <li>
              El parallax de las fotos solo existe en escritorio (≥ 1024px) y escribe
              en el transform sin pasar por React.
            </li>
          </ul>
        </Reveal>
      </Seccion>
    </>
  );
}
