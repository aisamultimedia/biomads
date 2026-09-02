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

1. Importar el repositorio en Vercel. El preajuste de Next.js sirve tal cual:
   no hace falta tocar comandos de build ni directorio de salida.
2. Cargar las variables de arriba.
3. Apuntar el dominio y poner `NEXT_PUBLIC_SITE_URL` al dominio definitivo.

---

## Estructura

```text
src/
├── app/            rutas, API de contacto, sitemap, robots, imagen social
├── components/
│   ├── layout/     cabecera, pie, navegación, menú móvil, cookies
│   ├── motion/     vocabulario de entradas y revelados
│   ├── secciones/  hero, servicios, proyectos, formulario
│   └── ui/         botón, enlace, campo, ficha, foto, sección
├── content/        servicios, proyectos, respaldo  ← la verdad del sitio
├── fotos/          fotografía de campo procesada
├── logo/           piezas del logo
├── lib/            configuración, validación, movimiento
└── styles/         tokens.css
```

**Regla de contenido.** Todo lo publicado sale de `CONTENIDO.md`. No se
inventan cifras, certificaciones, años de experiencia ni testimonios. Si algo
no está ahí, no entra al sitio.

`src/lib/site.ts` tiene la bandera `permisos.nombrarClientes`: en `false`
mientras no llegue la autorización escrita para nombrar y mostrar logos de
Autopista Río Magdalena, IBAL y Grupo Energía Bogotá.

---

## Scripts de preparación de recursos

Regeneran los binarios a partir de los originales. **Necesitan la carpeta
`Foto/` y `Logo-Biomads.png` un nivel por encima del proyecto**, que no están
en el repositorio por peso. Los resultados sí están versionados, así que un
clon nuevo compila sin ejecutarlos.

```bash
node scripts/preparar-fotos.mjs   # PNG de 3,5 MB → JPEG servibles
node scripts/preparar-video.mjs   # 21,6 MB → 1,6 MB + póster
node scripts/preparar-logo.mjs    # recorta guías y arma las variantes
node scripts/preparar-og.mjs      # imagen para compartir (1200×630)
```

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
3. **Autorización escrita** para nombrar a los tres clientes del portafolio.
4. **Constancias de ejecución** en PDF con texto seleccionable: las ranuras
   ya están dimensionadas en la sección de proyectos.
5. **Datos operativos:** dirección, NIT, redes, horario.
6. **Logo en vector (SVG).** Hoy se recorta del PNG entregado.
