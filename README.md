# Web BIOMADS

Sitio corporativo de BIOMADS S.A.S — estudios y gestión ambiental, Ibagué.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Resend. Sin librería de animación: ver MOTION.md.

---

## Arranque

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # compilación de producción
npm start          # servirla en local
npm run lint
```

---

## Variables de entorno

Copie `.env.example` a `.env.local` para desarrollo y cargue las mismas en
Vercel → *Settings → Environment Variables*.

| Variable | Para qué | ¿Obligatoria? |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Dominio público. Alimenta `metadataBase`, el sitemap y el Open Graph. | No en vistas previas: sin ella se usa la URL del despliegue |
| `RESEND_API_KEY` | Envío del formulario de contacto | No, pero sin ella el formulario no envía |
| `CONTACTO_REMITENTE` | Remitente verificado en Resend, del dominio propio | Junto con la anterior |
| `CONTACTO_DESTINO` | A dónde llegan los mensajes | No. Por defecto `gerencia@biomads.com` |

**Qué lleva el formulario.** Nombre, empresa, correo, teléfono (opcional), tipo de servicio, mensaje y la casilla de autorización de tratamiento de datos (Ley 1581 de 2012), que enlaza a `/[idioma]/privacidad`. La autorización viaja en el correo con fecha y hora, como constancia. Hay un campo trampa para robots (`sitio_web`): si llega relleno, la ruta responde «enviado» y no envía nada. Validación en `src/lib/validacion.ts`, la misma en el navegador y en el servidor; devuelve códigos, y el texto lo pone el diccionario.

**Sin `RESEND_API_KEY` el sitio funciona igual.** `/api/contacto` responde 503
con un mensaje claro y el formulario ofrece WhatsApp y correo directo con el
mensaje ya compuesto: nadie se queda sin poder escribir.

---

## Despliegue en Vercel

1. Importar el repositorio. **Root Directory se deja vacío** — el repositorio
   ya es la aplicación. El framework lo fija `vercel.json`, así que no
   depende de la autodetección: si se importa el repo vacío, Vercel elige
   "Other", sirve solo `public/` y todas las rutas dan 404.
2. Cargar las variables de arriba.
3. Comprobar en la URL `*.vercel.app` antes de conectar el dominio.

### Dominio: biomads.aisacreative.com

Es un subdominio, así que va por CNAME. En el DNS de `aisacreative.com`:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| CNAME | `biomads` | el que muestre Vercel al añadir el dominio |

Vercel indica el destino exacto en *Project → Settings → Domains*; cópielo de
ahí en vez de suponerlo, porque cambia según la cuenta.

Después ponga `NEXT_PUBLIC_SITE_URL=https://biomads.aisacreative.com` y
redespliegue: esa variable alimenta `metadataBase`, el sitemap y el Open
Graph, y solo se lee en tiempo de compilación.

---

## Estructura

```text
src/
├── app/            rutas, API de contacto, sitemap, robots, imagen social
├── components/
│   ├── layout/     cabecera, pie, navegación, menú móvil, cookies
│   ├── motion/     vocabulario de entradas y revelados
│   ├── secciones/  hero, promesa, etapas, servicios, proyectos, galería, clientes, formulario
│   └── ui/         botón, enlace, campo, ficha, foto, icono, sección
├── content/        servicios, proyectos, galería, respaldo, institucional, clientes  ← la verdad del sitio
├── fotos/          fotografía de campo procesada
├── logo/           piezas del logo (y clientes/ para la banda de logos)
├── lib/            configuración, validación, movimiento
└── styles/         tokens.css
```

**Regla de contenido.** Todo lo publicado sale de `CONTENIDO.md`. No se
inventan cifras, certificaciones, años de experiencia ni testimonios. Si algo
no está ahí, no entra al sitio.

`src/lib/site.ts` tiene la bandera `permisos.nombrarClientes`. Está en `true`
desde que BIOMADS entregó los tres logos —Autopista Río Magdalena, IBAL y
Grupo Energía Bogotá— para publicarlos. Ponerla en `false` retira la banda
entera sin dejar hueco.

## Idiomas

Español e inglés. El idioma es el **primer segmento de la ruta**: `/es` y
`/en`. La raíz `/` la decide `src/proxy.ts` en el servidor leyendo
`Accept-Language` (pesos `q` incluidos) y responde 307 —temporal a
propósito: un 308 se quedaría cacheado y el visitante que cambia el idioma
del sistema seguiría cayendo en el anterior—. Sin preferencia reconocible,
español.

Solo la raíz. Una URL interior nunca cambia de idioma por el navegador:
quien comparte `/es/proyectos` quiere que se abra en español, y un
rastreador con `Accept-Language: en` habría acabado indexando la versión
inglesa de cada URL española. El selector (ES | EN en la cabecera) recuerda
la elección explícita en `localStorage` y la aplica en visitas siguientes.

```text
src/idioma/
├── tipos.ts          la FORMA del diccionario; no contiene texto
├── es.ts             el diccionario en español
├── es.privacidad.ts  la política de datos en español (texto base, ver cabecera)
├── en.ts             el diccionario en inglés
├── en.privacidad.ts  la política en inglés
├── negociar.ts       esIdioma(), idiomaPreferido(), preferenciasDeCabecera() — sin diccionarios, para el proxy
└── index.ts          IDIOMAS, diccionario(), comoIdioma(), interpolar(), rutaEnIdioma()
```

**El inglés es una traducción base**, hecha el 2 de septiembre de 2026 y
pendiente de revisión por BIOMADS. Los criterios están en la cabecera de
`en.ts`: las normas colombianas conservan su nombre en español con una glosa
(Ley 1581 de 2012, ANLA), «radicar» es *file*, los nombres propios no se
traducen y el lema «Dejando huella» tampoco. La política en inglés dice que
en caso de duda prevalece la española.

**Añadir un tercer idioma son dos pasos:** crear su archivo tipado como
`Diccionario` y añadirlo a `IDIOMAS`. Nada más. Las rutas estáticas, el
`lang`, los `hreflang`, el sitemap, el selector y la negociación de la raíz
ya están montados y se encienden solos.

Y no se puede olvidar nada: **el tipo `Diccionario` es la lista de
comprobación de traducción**, y es la misma que hace funcionar el sitio. Si
falta una clave, no compila. Eso incluye lo que no se ve —textos
alternativos, `aria-label`, mensajes de error y metadatos—, que es justo lo
que se queda sin traducir cuando el diccionario solo cubre lo visible.

**Ni el validador ni la API emiten prosa.** `validarCampo` devuelve códigos
(`correoSinArroba`) y `/api/contacto` responde `{ codigo }`: el texto lo pone
el diccionario del idioma en el que está el visitante, que el servidor no
tiene por qué conocer. Los tipos `CodigoError` y `CodigoRespuesta` se
importan en `tipos.ts`, así que añadir una comprobación obliga a escribir su
mensaje en todos los idiomas.

**Qué va en `src/content` y qué en el diccionario.** En `content` solo lo
estructural: claves, años, duraciones en número, iconos e imágenes. Todo lo
que cambia al cambiar de idioma vive en el diccionario, bajo la misma clave.

---

**Rutas.** La portada es la página; solo quedan aparte las fichas de detalle
(`/proyectos`, `/proyectos/[slug]`, `/servicios/[slug]`) para quien llegue por
buscador o comparta un enlace, y `/privacidad`, la política de tratamiento
de datos personales, enlazada desde el pie y desde la casilla del formulario.
Su texto vive en `src/idioma/es.privacidad.ts` y es un **texto base**: la
cabecera del archivo dice qué tiene que confirmar un abogado antes de darlo
por definitivo. Los índices `/nosotros`, `/servicios` y
`/contacto` se borraron porque repetían lo que la portada ya dice, y `/estilo`
—la página interna de tokens— también: estaba pública.

---

## Scripts de preparación de recursos

Regeneran los binarios a partir de los originales. **Necesitan las carpetas
`Foto/` y `Logos/` y el archivo `Logo-Biomads.png` un nivel por encima del
proyecto**, que no están en el repositorio por peso. Los resultados sí están
versionados, así que un clon nuevo compila sin ejecutarlos.

```bash
node scripts/preparar-fotos.mjs           # PNG de 3,5 MB → JPEG servibles (24 de las 29 entregadas)
node scripts/preparar-favicon.mjs         # favicon.ico (16/32/48), icon.png y apple-icon.png desde el isotipo
node scripts/preparar-video.mjs           # 21,6 MB → 0,9 MB + póster
node scripts/preparar-logo.mjs            # recorta guías y arma las variantes
node scripts/preparar-logos-clientes.mjs  # iguala por área los tres logos de cliente
node scripts/preparar-og.mjs              # imagen para compartir (1200×630)
node scripts/paleta-logo.mjs              # extrae el color del logo y verifica contraste
node scripts/medir-lectura.mjs            # cuenta caracteres por línea en cuatro anchos
node scripts/contraste-hero.mjs           # contraste del texto sobre el video, fotograma a fotograma
```

**Sobre la paleta.** Todo el color sale del isotipo. `paleta-logo.mjs` hace dos
cosas: muestrea el logo por familias de tono y comprueba los 23 pares de
contraste que el sitio usa de verdad, leyendo `tokens.css` —no una copia—.
Sale con código 1 si alguno cae por debajo de su mínimo WCAG, así que sirve
en un hook o en CI. El logo tiene cuatro cromáticos y solo se usan dos: el
verde y el ocre del engranaje. El lima de las hojas y el azul del agua se
descartaron por decisión del cliente.

**Sobre el hero.** Es el único sitio donde el contraste no se puede leer del
DOM: el fondo de cada letra es un fotograma de video bajo un degradado y cambia
treinta veces por segundo. `contraste-hero.mjs` recorre el bucle parando en
siete fotogramas, captura la pantalla en cada uno y muestrea los píxeles detrás
de cada línea de texto, en tres anchos. Se queda con el peor caso: basta un
fotograma malo para que una frase deje de leerse.

**Sobre la medida de lectura.** `--container-medida` va en `ch`, que es el ancho
del cero de la fuente y no un carácter promedio: en Switzer ese cero vale 1.30
caracteres, así que 60ch son 78 caracteres, no 60. `medir-lectura.mjs` parte
cada nodo de texto en renglones con un Range y cuenta lo que el navegador
pinta de verdad, en 1440, 1024, 768 y 390 px. También sale con código 1 si
alguna línea llena pasa de 75.

**Sobre el video.** Una sola pista H.264. VP9 y AV1 se probaron los dos y
salen más pesados con esta imagen —follaje en movimiento a tasa baja es el
peor caso para ellos—, así que no hay `<source>` alternativo. El peso bajó a
la mitad recortando resolución y cadencia, no cambiando de códec.

---

## Lo que falta pedirle a BIOMADS

En orden de urgencia:

1. **Fotografía de monitoreo de fauna y de flora epífita.** Las 28 imágenes
   entregadas son de siembra, mantenimiento y control fitosanitario. Ninguna
   muestra los dos servicios que el sitio documenta a fondo, así que las
   fotos que los acompañan describen en su `alt` lo que realmente se ve.
2. **Metodología.** El brief no documenta diseño de muestreo, esfuerzo ni
   equipos. Lo único publicado sobre método es cómo se ejecutó en cada
   proyecto, atribuido a ese proyecto.
3. **Descripción de las cinco etapas del estudio ambiental.** Hoy solo
   existen los rótulos y así se publican. Cuando lleguen, entran bajo cada
   nombre en `src/content/institucional.ts` y la banda no cambia de forma.
4. **Confirmar la autorización escrita** de los tres clientes. Los logos ya
   están publicados por instrucción de BIOMADS; si alguna no está en firme,
   `permisos.nombrarClientes` los retira.
5. **Fecha exacta de constitución.** El hero publica los años de experiencia
   como diferencia de años contra 2017. Con el mes, la cifra deja de poder
   adelantarse en uno.
6. **Constancias de ejecución** en PDF con texto seleccionable: las ranuras
   ya están dimensionadas en la sección de proyectos.
7. **Datos operativos:** dirección, NIT, redes, horario. La política de
   datos los necesita: la ley pide identificar al responsable con NIT y
   dirección, y hoy solo van la ciudad, el correo y el teléfono.
8. **Logo en vector (SVG).** Hoy se recorta del PNG entregado.
9. **Revisión jurídica de la política de datos.** Es un texto base sobre la
   Ley 1581 de 2012 y el Decreto 1377 de 2013. Lo que debe validar el
   abogado está listado en la cabecera de `src/idioma/es.privacidad.ts`:
   plazo de conservación propuesto (doce meses), transmisión internacional a
   Vercel y Resend, autorización por conducta inequívoca por correo y
   WhatsApp, y si existe registro en el RNBD.
