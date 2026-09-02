/**
 * Forma del diccionario del sitio.
 *
 * Este archivo no contiene texto: contiene la *estructura* del texto. Cada
 * idioma es un objeto de este tipo, así que TypeScript obliga a que todos
 * tengan exactamente las mismas claves. Añadir un idioma es crear un archivo
 * y tipar la constante: el compilador enumera lo que falta traducir y no
 * deja compilar hasta que esté completo.
 *
 * Es la única lista de comprobación de traducción que no se puede olvidar
 * de actualizar, porque es la misma que hace funcionar el sitio.
 *
 * Regla: si una cadena la lee una persona, vive aquí. Incluye lo que no se
 * ve —textos alternativos, `aria-label`, marcadores de posición, mensajes
 * de error y los metadatos de la página—, que es justo lo que se queda sin
 * traducir cuando el diccionario solo cubre lo visible.
 */

import type { CodigoError, CodigoRespuesta } from "@/lib/validacion";

/**
 * Idiomas del sitio. El primero es el que se sirve por defecto.
 *
 * Hoy solo hay uno: el andamiaje está montado y el inglés se escribe en su
 * fase. Añadirlo es crear `en.ts` y añadir `"en"` a esta lista; el resto
 * —rutas estáticas, `lang`, `hreflang`, selector, persistencia— ya está y
 * se enciende solo.
 */
export const IDIOMAS = ["es"] as const;

export type Idioma = (typeof IDIOMAS)[number];

/** Claves estructurales que viven en src/content y aquí solo se nombran. */
type PorClave<T extends string, V = string> = Readonly<Record<T, V>>;

export type ClaveValor =
  | "excelencia"
  | "sostenibilidad"
  | "integridad"
  | "innovacion"
  | "social";

export type ClaveEtapa =
  | "identificacion"
  | "evaluacion"
  | "prevencion"
  | "compensacion"
  | "permisos";

export type ClaveServicio = "monitoreo-fauna" | "flora-epifita";

export type ClaveServicioListado =
  | "actividad-forestal"
  | "compensacion"
  | "inventarios"
  | "flora-fauna"
  | "educacion"
  | "desarrollo-sostenible"
  | "asesoria";

export type ClaveProyecto = "solinter-2017" | "ges-2018";

export type ClaveCliente =
  | "autopista-rio-magdalena"
  | "ibal"
  | "grupo-energia-bogota";

export type ClaveFoto =
  | "cuadrilla-ladera"
  | "mantenimiento-individuo"
  | "control-fitosanitario"
  | "parcela-estacas"
  | "marcacion-individuo"
  | "revision-planta"
  | "area-estudio"
  | "siembra-via"
  | "siembra-ladera"
  | "traslado-material";

export type Diccionario = {
  /** Nombre del idioma en su propia lengua, para el selector. */
  nombre: string;
  /** Código BCP 47 para el atributo lang y los hreflang. */
  etiquetaHtml: string;

  meta: {
    /** Título de la portada. */
    titulo: string;
    /** Plantilla para las páginas de detalle: "%s — BIOMADS". */
    plantillaTitulo: string;
    descripcionPortada: string;
    descripcionProyectos: string;
    tituloProyectos: string;
  };

  nav: {
    principal: string;
    saltoContenido: string;
    abrirMenu: string;
    cerrarMenu: string;
    menuNavegacion: string;
    irAlInicio: string;
    pieDePagina: string;
    secciones: PorClave<"nosotros" | "servicios" | "proyectos" | "contacto">;
    /** Rótulo del selector de idioma. */
    idioma: string;
  };

  hero: {
    descriptor: string;
    /** Una entrada por línea del titular: el salto es decisión de diseño. */
    titulo: readonly string[];
    bajada: string;
    ctaPrincipal: string;
    ctaSecundario: string;
    ficha: PorClave<"experiencia" | "constituida" | "sede" | "regiones">;
    anios: string;
    pausarVideo: string;
    reanudarVideo: string;
  };

  nosotros: {
    rotulo: string;
    titulo: string;
    quienesSomos: string;
    fortaleza: string;
    estructuraRotulo: string;
    tarjetaProfesional: string;
    especialistasRotulo: string;
    perfilesPermanentes: readonly string[];
    especialistas: readonly string[];
  };

  institucional: {
    misionRotulo: string;
    mision: string;
    visionRotulo: string;
    vision: string;
    valoresRotulo: string;
    valores: PorClave<ClaveValor, { readonly nombre: string; readonly texto: string }>;
    politicaRotulo: string;
    politica: readonly string[];
    objetivosRotulo: string;
    objetivos: readonly string[];
  };

  etapas: {
    rotulo: string;
    nombres: PorClave<ClaveEtapa>;
  };

  servicios: {
    rotulo: string;
    titulo: string;
    /** Pie de la tarjeta: anuncia lo que hay dentro del panel. */
    pieTarjeta: string;
    tambienRotulo: string;
    tambienTexto: string;
    consultarAlcance: string;
    listados: PorClave<ClaveServicioListado>;
    detallados: PorClave<
      ClaveServicio,
      {
        readonly titulo: string;
        readonly resumen: string;
        readonly cuandoSeNecesita: string;
        readonly marco: string;
        readonly entregable: string;
        readonly duracion: string;
        readonly elVacio: string;
        readonly metodologia: string;
        readonly metodologiaFuente: string;
        /** Una entrada por línea: el salto del titular es decisión de diseño. */
        readonly lineasTitulo: readonly string[];
        /** Ante quién responde el proyecto. */
        readonly autoridad: string;
        readonly metaTitulo: string;
        readonly metaDescripcion: string;
      }
    >;
    panel: PorClave<
      | "cuandoSeNecesita"
      | "marco"
      | "entregable"
      | "duracion"
      | "metodo"
      | "ultimaEjecucion"
      | "cta"
      | "cerrar"
      | "paginaCompleta"
    >;
    /** Rótulos de la página de detalle de un servicio. */
    detalle: PorClave<
      | "volver"
      | "fichaRotulo"
      | "fichaTitulo"
      | "metodoRotulo"
      | "metodoTitulo"
      | "dificultadTitulo"
      | "casoRotulo"
      | "casoTitulo"
      | "autoridad"
      | "ultimaEjecucion"
      | "entregable"
      | "informeTecnico"
      | "ejecutadoEn"
      | "ejecucionContractual"
      | "marcoYMetodologia"
      | "siguienteTitulo"
    >;
  };

  proyectos: {
    rotulo: string;
    titulo: string;
    verCompleto: string;
    dificultadRotulo: string;
    resolucionRotulo: string;
    ficha: PorClave<"anio" | "duracion" | "ubicacion" | "servicio">;
    certificadosRotulo: string;
    certificadosTexto: string;
    certificadoPendiente: string;
    pedirCertificados: string;
    /** Rótulos de la página de detalle de un proyecto. */
    detalle: PorClave<
      | "cliente"
      | "encargoRotulo"
      | "encargoTitulo"
      | "razonSocial"
      | "servicioRotulo"
      | "verFichaServicio"
      | "otroProyecto"
    >;
    /** Rótulos del índice /proyectos, que no repite la portada. */
    indice: {
      lineasTitulo: readonly string[];
      entradilla: string;
      conFichaCompleta: string;
      regiones: string;
      anios: string;
      duraciones: string;
      casosRotulo: string;
      dondeRotulo: string;
      dondeTitulo: string;
      dondeTexto: string;
    };
    casos: PorClave<
      ClaveProyecto,
      {
        readonly cliente: string;
        readonly clienteCorto: string;
        readonly ubicacion: string;
        readonly encargo: string;
        readonly dificultad: string;
        readonly resolucion: string;
        readonly servicioRotulo: string;
      }
    >;
  };

  clientes: {
    rotulo: string;
    nombres: PorClave<ClaveCliente>;
  };

  contacto: {
    rotulo: string;
    titulo: string;
    intro: string;
    directoRotulo: string;
    telefonoNota: string;
    correoNota: string;
    dondeRotulo: string;
    regionesNota: string;
    formulario: {
      nombre: string;
      empresa: string;
      correo: string;
      mensaje: string;
      mensajeAyuda: string;
      enviar: string;
      enviando: string;
      exitoRotulo: string;
      /** Lleva {nombre}. */
      exitoGracias: string;
      /** Lleva {correo}. */
      exitoRespuesta: string;
      /** Termina justo antes del enlace al teléfono. */
      exitoUrgente: string;
      otroMensaje: string;
      errorRotulo: string;
      errorGenerico: string;
      errorRespaldo: string;
      /** Termina justo antes del enlace de WhatsApp. */
      oEscribanos: string;
      escribirWhatsapp: string;
      escribirCorreo: string;
      /* Un mensaje por código de `validarCampo`. El tipo se importa de
         src/lib/validacion.ts para que añadir una comprobación allí obligue
         a escribir su mensaje aquí, en todos los idiomas. */
      errores: PorClave<CodigoError>;
      /** Un mensaje por código de respuesta de /api/contacto. */
      respuestas: PorClave<CodigoRespuesta>;
    };
  };

  /** Bloque de cierre que repiten las páginas de detalle. */
  siguientePaso: PorClave<
    | "rotulo"
    | "solicitarPropuesta"
    | "escribirWhatsapp"
    | "tituloProyectos"
    | "textoProyectos"
    | "tituloServicio"
    | "textoServicio"
  >;

  pie: {
    resumen: string;
    escribanos: string;
    seccionesRotulo: string;
    llamadaOWhatsapp: string;
    constituidaEn: string;
    notaCookies: string;
    lema: string;
  };

  cookies: {
    region: string;
    texto: string;
    cerrar: string;
  };

  /** Textos alternativos. Describen lo que se ve, no lo que se querría ver. */
  fotos: PorClave<ClaveFoto>;

  /** Unidades y conectores que se interpolan con datos estructurales. */
  unidades: {
    meses: string;
    personas: string;
    /** Conector de listas: "Antioquia y Huila". */
    y: string;
  };
};
