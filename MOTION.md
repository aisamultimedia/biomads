# Motion — sistema de movimiento de la web de BIOMADS

Plan y referencia del sistema de animación. Se lee junto a `PRODUCT.md` (a quién
le hablamos) y `src/styles/tokens.css` (los valores). Lo que no está aquí no se
anima.

---

## 1. Auditoría del sitio antes de intervenir

### Lo que ya estaba bien y se conserva

- Una sola curva de entrada (`cubic-bezier(0.22, 1, 0.36, 1)`), duraciones en
  tokens, `prefers-reduced-motion` respetado, solo `transform` y `opacity`.
- La mitad superior de cada página entra por CSS puro (`Entrada`,
  `TituloPorLineas`): no espera a que React hidrate y no retrasa el LCP.
- Estado oculto de los revelados tras `@media (scripting: enabled)`: sin
  JavaScript el contenido nace visible.
- Título del hero por líneas con máscara ascendente. Es el gesto más
  reconocible del sitio y se convierte en la base del vocabulario.
- Fondo de curvas de nivel en el hero: lento, lineal, cartográfico. Es el único
  elemento ambiental y se queda.

### Problemas encontrados

| # | Problema | Dónde | Efecto |
|---|---|---|---|
| 1 | **Un solo gesto para todo**: títulos, párrafos, listas, fichas, tarjetas e imágenes entran con el mismo `opacity 0→1 + 24px`. | `Reveal`, `RevealGroup`, `FichaDatos`, `Foto` | Monotonía. Nada distingue jerarquías; el movimiento no dice qué es cada cosa. |
| 2 | **Transición entre páginas muerta**: el CSS de `::view-transition-*` existe pero nadie invoca la transición (no hay `<ViewTransition>` de React). | `globals.css` | Cada navegación es un corte seco. |
| 3 | **Contenido duplicado en el primer pantallazo**: el hero incluye la tarjeta "4 contrataciones" con sus cuatro frentes y la sección inmediatamente inferior (`PruebaRecontratacion`) repite exactamente lo mismo. | `Hero`, `page.tsx` | El dato más fuerte del sitio se lee dos veces seguidas y pierde peso. |
| 4 | **El hero no está coreografiado**: dentro de la tarjeta oscura solo anima el título; rótulo, párrafo y botones aparecen de golpe. La foto entra con fade genérico, no como imagen. | `Hero` | La entrada más importante del sitio se siente a medio hacer. |
| 5 | **Menú móvil inoperante entre 768 y 1024 px**: el panel es `md:hidden` pero el botón que lo abre es `lg:hidden`. | `MenuMovil` | En tablet el menú no abre. |
| 6 | **Foto del hero sin `priority`**: `Foto` recibe `inmediata` pero no `prioridad`, así que el LCP se carga lazy. | `Hero`, `Foto` | LCP peor de lo necesario. |
| 7 | **Hueco muerto en Proyectos**: la foto panorámica vive en una sección aparte con 160 px de respiro arriba y abajo. En las páginas de detalle la misma foto vive dentro de la cabecera. | `proyectos/page.tsx` | Ritmo inconsistente entre páginas hermanas. |
| 8 | **El panel desplegable de la barra entra pero no sale**: se oculta con `hidden`. | `NavBarra` | Corte seco en la interacción más frecuente del escritorio. |
| 9 | **Los revelados disparan en el borde exacto del viewport** (`threshold 0.15`, sin margen). | `useReveal` | Se ve el arranque de la animación pegado al borde inferior. |
| 10 | **Nada reacciona al desplazamiento**: cero uso de scroll-progress. | Todo el sitio | Las fotos, que son el argumento, están inertes. |
| 11 | **Sin estados de salida** en errores de formulario y en el cambio formulario → éxito. | `Campo`, `FormularioContacto` | Aparecen y desaparecen de golpe. |
| 12 | **El hover de los botones no transiciona**: Tailwind 4 mueve con la propiedad `translate`, y la lista `transition-[transform,…]` no la incluye. | `Boton` | El "1 px arriba" salta en vez de deslizarse. |
| 13 | Un `IntersectionObserver` por elemento revelado y un `setState` por elemento. | `useReveal` | Aceptable a esta escala; se resuelve gratis con el cambio de motor. |

### Cambios de layout que se hacen

- **Hero.** Sale la tarjeta de "4 contrataciones" (duplicada con la sección
  siguiente). La ficha de identidad (Constituida · Sede · Equipo · Proyectos
  en) sube a la columna izquierda, bajo la tarjeta oscura, en 2×2. La foto
  ocupa las dos filas de la derecha. El hero termina donde termina la foto.
  En móvil el orden es tarjeta → foto → ficha.
- **Proyectos.** La foto panorámica entra en la cabecera, entre la entradilla
  y la ficha, igual que en las páginas de servicio y de proyecto.
- **Menú móvil.** `lg:hidden`, para que coincida con el botón.

---

## 2. Filosofía: levantamiento de campo

BIOMADS entrega informes que otros revisan. El sitio habla así: líneas,
fichas, registros. El movimiento se comporta como un instrumento preciso, no
como un escaparate. Tres verbos y nada más:

- **Revelar.** Lo importante aparece detrás de una máscara que sube: títulos y
  fotografías. Es el gesto del hero extendido a todo el sitio.
- **Trazar.** Las reglas de 1 px que estructuran fichas y listas se dibujan de
  izquierda a derecha. La línea es el motivo del sistema (curvas de nivel,
  subrayado de enlaces, divisiones) y ahora también se mueve.
- **Asentar.** El texto y los paneles llegan con un desplazamiento corto y una
  desaceleración larga. Sin rebote.

Todo lo demás —hover, foco, paneles, formularios— es micro: rápido, seco,
al servicio de la tarea.

### Lo que NO se hace

- No se anima todo. Los párrafos secundarios dentro de un bloque ya revelado
  no se revelan aparte.
- Nada de contadores que suben (no hay cifras que inflar y el brief lo
  prohíbe).
- Sin parallax de fondo, sin pinning, sin secciones que secuestran el
  scroll, sin smooth-scroll por JavaScript.
- Sin springs con rebote. Un solo spring en todo el sitio: el indicador de
  página activa en la barra, amortiguado sin sobrepaso.
- Sin hover que escale fotografías ni tarjetas (no hay tarjetas enlazadas;
  escalar una foto de campo la convierte en banco de imágenes).
- Sin animaciones por letra ni por palabra. Por línea, y solo en el h1,
  donde el corte lo decide quien escribe.
- Sin blur, sin desenfoques, sin degradados animados, sin cursor
  personalizado.
- Sin animar `width`, `height`, `top`, `left`, `border` ni colores de
  fondo de bloques grandes.

---

## 3. Sistema global

### Curvas

| Nombre | Valor | Uso |
|---|---|---|
| `--ease-base` | `cubic-bezier(0.22, 1, 0.36, 1)` | Todo lo que entra. |
| `--ease-salida` | `cubic-bezier(0.4, 0, 1, 1)` | Todo lo que sale: rápido, no compite con lo que llega. |
| `linear` | — | Bucles continuos (curvas de nivel). |
| spring `500 / 40` | sin rebote | Solo el indicador de navegación. |

### Duraciones

| Token | Valor | Uso |
|---|---|---|
| `--duracion-micro` | 180 ms | hover, foco, pulsación, subrayados |
| `--duracion-corta` | 250 ms | paneles, salidas, cabecera, menú |
| `--duracion-entrada` | 600 ms | texto, paneles |
| `--duracion-titulo` | 700 ms | máscara de títulos |
| `--duracion-regla` | 800 ms | trazo de reglas |
| `--duracion-imagen` | 1000 ms | máscara + escala de fotografías |
| `--duracion-pagina` | 250 ms | entrada de página (la salida dura 150 ms) |
| `--duracion-ambiente` | 90 s | deriva de curvas de nivel |
| `--duracion-flotar` | 12 s | anotaciones del hero |

### Escalonado

- `--stagger-grupo` 60 ms entre hermanos (listas, fichas, columnas).
- `--stagger-titulo` 80 ms entre líneas del h1.
- `--paso-entrada` 70 ms por índice en la secuencia de carga (hero y
  cabeceras).
- Un grupo de 12 elementos (la lista de especialistas) termina en 0,72 s +
  0,6 s. No se necesita tope.

### Distancias

- Asentar: 16 px verticales. En móvil, igual (es corto).
- Lateral: 12 px para numerales y rótulos.
- Imágenes: escala 1,08 → 1 dentro del marco.
- Paneles: escala 0,98 → 1 y 12 px.
- Parallax: ±6 % del alto de la foto. Solo en ≥ 1024 px y sin
  `prefers-reduced-motion`.

### Vocabulario (variantes reutilizables)

Definido una sola vez en `src/lib/motion.ts` y reflejado en CSS
(`data-entrada`) para lo que entra al cargar.

| Variante | Qué hace | Dónde |
|---|---|---|
| `texto` | opacidad 0→1, y 16→0 | párrafos, entradillas, filas de ficha, ítems de lista, botones |
| `titulo` | máscara `clip-path` ascendente + y 12→0 | h2 de sección, h3 de tarjeta |
| `imagen` | marco: máscara ascendente · interior: escala 1,08→1 | toda fotografía |
| `panel` | opacidad + escala 0,98→1 + y 12→0 | tarjeta oscura del hero, paneles desplegables, bloque de éxito |
| `lateral` | opacidad + x −12→0 | numerales mono (01, 02), rótulos de sección |
| `regla` | línea de 1 px que se traza de izquierda a derecha | toda regla estructural (`.con-regla`) |
| `grupo` | contenedor que escalona a sus hijos | listas, fichas, cabeceras de sección |

Un elemento puede combinar `regla` con cualquier otra variante: la regla se
traza mientras el contenido se asienta.

### Motor

- **Carga (mitad superior):** CSS puro con `data-entrada="texto|lateral|panel|imagen|regla|anotacion"`
  e índice de secuencia (`--indice`). No espera a la hidratación.
- **Scroll (resto):** `motion` con `m` + `LazyMotion` (`domMax`, modo
  estricto) + variantes + `whileInView` una sola vez, con margen inferior de
  −12 % para que nada arranque pegado al borde.
- **Interacción:** `AnimatePresence` para salidas (panel de barra, menú
  móvil, errores de formulario, éxito), `layoutId` para el indicador de
  navegación, `useScroll` + `useTransform` para el parallax.
- **Transición de página:** `<ViewTransition>` de React en `app/template.tsx`.
  La página vieja sale en 150 ms; la nueva entra en 250 ms; la cabecera queda
  anclada. La coreografía interna de cada página corre dentro de la
  transición.

### Accesibilidad y respaldo

- `prefers-reduced-motion`: CSS deja todo en su estado final (ya existía).
  Los componentes de `motion` arrancan con `initial={false}` —nada se
  mueve, todo se ve— y `MotionConfig reducedMotion="user"` cubre el resto.
  Parallax y curvas de nivel se apagan.
- `@media (scripting: none)`: los estados iniciales que `motion` escribe en
  línea se anulan y el contenido nace visible.
- Todo el texto está siempre en el DOM. Ninguna máscara afecta a lectores de
  pantalla ni al buscador.
- El foco visible, el orden de tabulación y los `aria-*` no dependen de la
  animación.

### Rendimiento

- Solo `transform`, `opacity` y `clip-path` (inset simple).
- La cabecera lee el desplazamiento como estado externo
  (`useSyncExternalStore`, listener pasivo): sin efectos ni renders en
  cascada. El parallax usa el observador de `motion` y escribe en el
  `transform` directamente, sin re-render.

> **Nota (2 sep 2026).** En paralelo a este trabajo, y fuera de este plan,
> se añadió `DesplazamientoSuave` (Lenis) al layout y un `VideoFondo` aún
> sin usar. Lenis mueve el scroll nativo, así que `useScroll`, el parallax,
> `whileInView` y la transición de página siguen funcionando igual; con
> `prefers-reduced-motion` no se monta. Lo que sí cambia es la premisa "sin
> smooth-scroll por JavaScript" de la sección 2: queda a decisión del equipo.
- Las curvas de nivel se pausan cuando el hero sale de pantalla.
- Las reglas se trazan sobre un pseudo-elemento gobernado por una custom
  property (`--regla`), sin nodos extra en el DOM.
- Foto del hero y fotos de cabecera con `priority`.

---

## 4. Plan sección por sección

### Global

- **Cabecera.** La barra entra al cargar (y −12 → 0). Se compacta con el
  desplazamiento (se conserva). El indicador de página activa se desliza
  entre ítems con `layoutId`. El panel desplegable entra (opacidad, y −6,
  escala 0,98 desde arriba, 250 ms) y sale (150 ms). Anclada durante la
  transición de página.
- **Menú móvil.** El velo entra en 250 ms; los ítems se asientan
  escalonados (50 ms); el bloque de contacto al final. Salida inversa y
  rápida. Arreglo del breakpoint.
- **Botones.** Hover: 1 px arriba + borde de acento (se conserva, ahora
  transiciona de verdad). Pulsación: escala 0,98. Estado de carga (se
  conserva).
- **Enlaces.** Subrayado que crece (se conserva). Variante con flecha que se
  desplaza 4 px al hover, para "ver el proyecto completo".
- **Pie.** Contacto y secciones se asientan como un grupo; la regla de la
  línea legal se traza.
- **Entre páginas.** Crossfade corto con cabecera fija.

### Inicio

1. **Hero.** Secuencia de carga en pasos de 70 ms: tarjeta oscura (panel) →
   rótulo → líneas del título (máscara) → párrafo → botones · foto (máscara +
   escala, arranca a los 70 ms para no retrasar el LCP) → anotaciones (escala
   0,9 → 1, luego flotan) → ficha 2×2 (regla trazada + filas). Parallax
   suave en la foto al desplazar. Curvas de nivel derivando detrás.
2. **La prueba (oscura).** Título con máscara; numerales 01–04 entran
   laterales y sus reglas se trazan en secuencia (lee como una lista de
   campo); la cita a la derecha se asienta al final.
3. **Servicios con ficha.** Foto con máscara y parallax; numeral lateral;
   título con máscara; párrafo; ficha con regla trazada y filas
   escalonadas; botón.
4. **Otros servicios.** Siete reglas que se trazan una tras otra con su
   texto; la columna de texto se asienta.
5. **Proyectos.** Cada caso: regla, título con máscara, encargo, ficha
   escalonada, dificultad/resolución, enlace con flecha.
6. **Equipo.** Columna de texto por bloques; las tres fotos con máscara
   escalonadas (sin parallax: son pequeñas).
7. **Siguiente paso.** Rótulo lateral, título con máscara, botones.

### Servicios

Cabecera por CSS (título por líneas, entradilla). Los dos bloques con ficha
igual que en inicio. Etapas del estudio: cinco reglas que se trazan en fila,
de izquierda a derecha, con el numeral lateral: se lee como un recorrido.

### Detalle de servicio

Cabecera: título por líneas → entradilla → foto panorámica (máscara +
parallax, `priority`) → ficha 2×4 con regla trazada. Ficha técnica: cuatro
bloques rótulo/texto con regla, en dos columnas desfasadas. Método: texto +
dificultad. Caso relacionado: título con máscara + ficha.

### Proyectos

Cabecera reorganizada (foto dentro de la cabecera). Prueba de
recontratación en oscuro. Los dos casos. Regiones: dos reglas que se trazan
con los nombres grandes. Cierre.

### Detalle de proyecto

Como el detalle de servicio: cabecera con foto y ficha, dificultad/resolución
en dos columnas con regla, servicio relacionado, cierre.

### Nosotros

Cabecera con ficha. Modelo mixto: texto + lista de especialistas (12 reglas
trazadas en secuencia). Tres fotos con máscara escalonadas. Límites y
habilitaciones. Institucional: tres bloques con regla.

### Contacto

Cabecera. Columna de vías directas por CSS (entra con la página). El
formulario: errores entran (y −4, 200 ms) y salen (150 ms); el envío
cruza a la confirmación (formulario sale en 150 ms, éxito entra como
panel). "Qué sigue": tres reglas con numeral lateral.

### /estilo

Se actualiza la sección de movimiento para documentar el vocabulario nuevo.

---

## 5. Revisión crítica del plan (qué se simplificó)

- Se descartó ocultar la cabecera al bajar y mostrarla al subir: el botón de
  contacto debe estar siempre a un vistazo (`PRODUCT.md`) y la barra ya es
  compacta.
- Se descartó el parallax en las fotos pequeñas de equipo y "en campo":
  tres fotos moviéndose a distinta velocidad en una grilla distraen.
- Se descartó una barra de progreso de lectura: es un sitio corporativo de
  cinco páginas, no un artículo.
- Se descartó dividir h2 en líneas por JavaScript: el corte sería distinto
  en cada ancho. La máscara se aplica al h2 como bloque.
- Se descartó el `spring` en el menú móvil y en los paneles: un solo spring
  en el sitio, en el indicador de la barra.
- Se descartó animar la salida de página con `AnimatePresence` sobre el App
  Router (frágil): `<ViewTransition>` es nativo, más barato y con salida real.
- Se descartó cambiar el texto de las anotaciones del hero: el contenido se
  conserva; lo que cambia es cómo entran.
- Se descartó reducir distancias en móvil vía JavaScript: 16 px ya es corto;
  lo que sí cambia en móvil es que no hay parallax ni hover.

---

## 6. Lista de comprobación final

- [x] ¿Se distingue a simple vista qué es título, qué es texto, qué es foto y
      qué es estructura solo por cómo entra?
- [x] ¿Alguna animación retrasa un clic o una lectura? (No debe.)
- [x] ¿La navegación entre páginas se siente continua con la cabecera fija?
- [x] Móvil a 390 px: hero en orden tarjeta → foto → ficha; menú abre en
      tablet; nada se desborda.
- [x] `prefers-reduced-motion`: nada se mueve; todo se ve.
- [x] Sin JavaScript: todo se ve.
- [x] `next build`, `tsc` y `eslint` limpios.
