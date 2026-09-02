# Web BIOMADS

Sitio corporativo de BIOMADS S.A.S — estudios y gestión ambiental, Ibagué.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion · Resend.

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
│   ├── secciones/  hero, etapas, servicios, proyectos, clientes, formulario
│   └── ui/         botón, enlace, campo, ficha, foto, icono, sección
├── content/        servicios, proyectos, respaldo, institucional, clientes  ← la verdad del sitio
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

**Rutas.** La portada es la página; solo quedan aparte las fichas de detalle
(`/proyectos`, `/proyectos/[slug]`, `/servicios/[slug]`) para quien llegue por
buscador o comparta un enlace. Los índices `/nosotros`, `/servicios` y
`/contacto` se borraron porque repetían lo que la portada ya dice, y `/estilo`
—la página interna de tokens— también: estaba pública.

---

## Scripts de preparación de recursos

Regeneran los binarios a partir de los originales. **Necesitan las carpetas
`Foto/` y `Logos/` y el archivo `Logo-Biomads.png` un nivel por encima del
proyecto**, que no están en el repositorio por peso. Los resultados sí están
versionados, así que un clon nuevo compila sin ejecutarlos.

```bash
node scripts/preparar-fotos.mjs           # PNG de 3,5 MB → JPEG servibles
node scripts/preparar-video.mjs           # 21,6 MB → 0,9 MB + póster
node scripts/preparar-logo.mjs            # recorta guías y arma las variantes
node scripts/preparar-logos-clientes.mjs  # iguala por área los tres logos de cliente
node scripts/preparar-og.mjs              # imagen para compartir (1200×630)
```

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
7. **Datos operativos:** dirección, NIT, redes, horario.
8. **Logo en vector (SVG).** Hoy se recorta del PNG entregado.
