import type { Diccionario } from "./tipos";
import { privacidadEs } from "./es.privacidad";

/**
 * Diccionario en español.
 *
 * Todo lo publicado sale de CONTENIDO.md. No se inventan cifras,
 * certificaciones, años de experiencia ni testimonios: si algo no está ahí,
 * no entra aquí.
 *
 * Los datos estructurales —slugs, años, duraciones en número, iconos,
 * imágenes— no viven en este archivo sino en src/content. Aquí solo está lo
 * que cambia al cambiar de idioma.
 */
export const es: Diccionario = {
  nombre: "Español",
  etiquetaHtml: "es-CO",

  meta: {
    titulo: "BIOMADS — Estudios y gestión ambiental",
    plantillaTitulo: "%s — BIOMADS",
    descripcionPortada:
      "BIOMADS S.A.S — estudios y gestión ambiental desde Ibagué. Monitoreo de biodiversidad de fauna y seguimiento de flora epífita reubicada, con registros verificables.",
    tituloProyectos: "Proyectos",
    descripcionProyectos:
      "Seis proyectos de BIOMADS con ficha técnica: PAGA y sistema de alertas tempranas para Autopista Río Magdalena, compensación biótica sobre 88,54 ha, embellecimiento paisajístico, flora epífita en El Quimbo y biodiversidad de fauna para EIA.",
    tituloPrivacidad: "Política de tratamiento de datos personales",
    descripcionPrivacidad:
      "Qué datos recoge el sitio de BIOMADS, para qué los usa, cuánto tiempo los guarda y cómo ejercer sus derechos según la Ley 1581 de 2012.",
  },

  nav: {
    principal: "Principal",
    saltoContenido: "Saltar al contenido",
    abrirMenu: "Abrir menú",
    cerrarMenu: "Cerrar menú",
    menuNavegacion: "Menú de navegación",
    irAlInicio: "BIOMADS — ir al inicio",
    pieDePagina: "Pie de página",
    volverArriba: "Volver arriba",
    secciones: {
      nosotros: "Nosotros",
      servicios: "Servicios",
      proyectos: "Proyectos",
      contacto: "Contacto",
    },
    idioma: "Idioma",
  },

  hero: {
    descriptor: "Aliados estratégicos en gestión ambiental y sostenibilidad empresarial",
    /* Titular de posicionamiento, no de catálogo. Antes decía «Estudios y
       gestión ambiental para obras de infraestructura»: nombraba un solo
       tipo de cliente y dejaba fuera biodiversidad y restauración, que es
       la mitad del alcance. El cliente lo cambió por esto en la ronda del
       25 de septiembre de 2026. Los servicios siguen nombrados —en la
       bajada y en su sección—, que es donde el buscador también los lee. */
    titulo: ["Conocimiento ambiental", "que transforma proyectos", "y territorios."],
    bajada:
      "Integramos experiencia en campo y conocimiento especializado para desarrollar soluciones en biodiversidad, estudios ambientales, restauración y gestión de obligaciones ambientales.",
    ctaPrincipal: "Cuéntenos su proyecto",
    /* Llevaba a «Ver proyectos ejecutados». Retirada la sección de
       proyectos, el segundo enlace apunta a servicios: es el otro sitio al
       que tiene sentido mandar a quien acaba de leer el titular. */
    ctaSecundario: "Ver nuestros servicios",
    ficha: {
      experiencia: "Experiencia",
      constituida: "Constituida",
      sede: "Sede",
      regiones: "Proyectos ejecutados en",
    },
    anios: "años",
    indicadorScroll: "Ir a la siguiente sección",
    pausarVideo: "Pausar el video de fondo",
    reanudarVideo: "Reanudar el video de fondo",
  },

  nosotros: {
    rotulo: "¿Quiénes somos?",
    titulo: "Conocimiento técnico, experiencia en campo y compromiso con el territorio",
    quienesSomos:
      "Somos BIOMADS, una empresa especializada en gestión ambiental y biodiversidad. Desarrollamos soluciones técnicas que responden a las necesidades particulares de cada proyecto, integrando conocimiento, experiencia en campo y comprensión del territorio.",
    /* Sin cifra de integrantes. La había —«un equipo permanente de ≈10
       personas»— en el resumen del pie, y el cliente pidió retirarla: el
       equipo se describe por composición, no por tamaño. */
    fortaleza:
      "Contamos con un equipo multidisciplinario de profesionales y especialistas que nos permite abordar cada proyecto de manera integral, adaptarnos a sus retos y acompañar a nuestros clientes durante las diferentes etapas de su gestión ambiental.",
    proposito:
      "Nuestro propósito es aportar soluciones técnicamente sólidas que contribuyan al cumplimiento ambiental, la conservación de la biodiversidad y el desarrollo sostenible de los proyectos y territorios.",
  },

  institucional: {
    misionRotulo: "Misión",
    mision:
      "BIOMADS ayuda a las organizaciones a cumplir y demostrar sus compromisos ambientales, desde las obligaciones de sus proyectos hasta sus metas de sostenibilidad empresarial, convirtiendo el trabajo de campo en resultados verificables para la biodiversidad, las comunidades y el negocio.",
    visionRotulo: "Visión",
    vision:
      "En 2030, BIOMADS será reconocida en la región andina de Colombia como el aliado técnico de referencia en biodiversidad y sostenibilidad empresarial, por la calidad verificable de sus resultados y por acompañar a empresas de diversos sectores en su transición hacia modelos de negocio positivos para la sostenibilidad.",
    valoresRotulo: "Valores corporativos",
    valores: {
      excelencia: {
        nombre: "Excelencia técnica",
        texto: "Rigor, conocimiento y calidad en cada proyecto.",
      },
      sostenibilidad: {
        nombre: "Sostenibilidad",
        texto:
          "Promovemos soluciones que aportan al equilibrio entre desarrollo y conservación.",
      },
      integridad: {
        nombre: "Integridad y transparencia",
        texto: "Actuamos con ética, responsabilidad y coherencia.",
      },
      innovacion: {
        nombre: "Innovación",
        texto:
          "Buscamos nuevas y mejores formas de responder a los desafíos ambientales.",
      },
      /* PENDIENTE DE CONTENIDO. El cliente pidió mantener cinco valores y
         solo envió cuatro textos nuevos. Este se conserva tal como estaba,
         sin tocar, hasta que llegue el definitivo. No se inventa. */
      social: {
        nombre: "Compromiso social",
        texto:
          "Generamos impacto positivo en las comunidades y fomentamos el respeto por el entorno.",
      },
    },
    /* Era «Política de calidad» y pasó a ser integral: cubre calidad,
       ambiente y seguridad y salud en el trabajo, bajo ISO 9001, 14001 y
       45001. El rótulo se pinta con .etiqueta, que va en versalitas, así
       que en pantalla se lee POLÍTICA INTEGRAL. */
    politicaRotulo: "Política integral",
    politica: [
      "En BIOMADS desarrollamos soluciones ambientales con altos estándares de calidad, promoviendo la protección del medio ambiente, el uso sostenible de los recursos naturales y condiciones de trabajo seguras y saludables.",
      "Nuestro compromiso se fundamenta en la satisfacción de nuestros clientes, el cumplimiento de los requisitos legales y aplicables, la prevención de la contaminación, la gestión de los riesgos y oportunidades, la prevención de lesiones y deterioro de la salud, y la mejora continua de nuestro Sistema Integrado de Gestión, bajo los lineamientos de las normas ISO 9001, ISO 14001 e ISO 45001.",
    ],
    compromisosRotulo: "Compromisos",
    compromisos: [
      "Calidad y satisfacción de nuestros clientes.",
      "Protección del medio ambiente y prevención de la contaminación.",
      "Seguridad, salud y bienestar de nuestros trabajadores.",
      "Cumplimiento de requisitos legales y otros aplicables.",
      "Gestión de riesgos y oportunidades y mejora continua.",
    ],
  },

  promesa: {
    rotulo: "Nuestra promesa",
    enunciado:
      "Soluciones ambientales con rigor técnico, conocimiento del territorio y resultados que generan valor.",
  },

  /* La banda que sigue a la promesa. El rótulo era «Estudios ambientales» y
     ahora nombra el método: las mismas cinco etapas, dichas en primera
     persona del plural para que se lean como algo que se hace y no como un
     índice. La quinta era «Permisos» y ahora cierra en seguimiento. */
  etapas: {
    rotulo: "Nuestra forma de abordar cada proyecto",
    nombres: {
      identificacion: "Identificamos",
      evaluacion: "Evaluamos",
      prevencion: "Prevenimos y mitigamos",
      compensacion: "Corregimos y compensamos",
      seguimiento: "Gestionamos y hacemos seguimiento",
    },
  },

  servicios: {
    rotulo: "Servicios",
    titulo: "Soluciones ambientales para cada proyecto",
    consultarAlcance: "Consultar un alcance",
    categorias: {
      biodiversidad: {
        nombre: "Biodiversidad y ecosistemas",
        items: [
          { nombre: "Monitoreo y caracterización de fauna y flora" },
          { nombre: "Flora epífita" },
          { nombre: "Seguimiento y manejo de biodiversidad" },
        ],
      },
      forestal: {
        nombre: "Gestión forestal y compensaciones",
        items: [
          { nombre: "Inventarios forestales" },
          { nombre: "Actividad forestal" },
          { nombre: "Planes de compensación ambiental" },
          { nombre: "Restauración y seguimiento" },
        ],
      },
      estudios: {
        nombre: "Estudios y gestión ambiental",
        items: [
          { nombre: "Estudios ambientales" },
          { nombre: "Asesoría y gestión ambiental" },
          { nombre: "Seguimiento de obligaciones y requerimientos ambientales" },
        ],
      },
      /* Los dos frentes de sostenibilidad empresarial abren la categoría:
         son los concretos —uno tiene nombre propio y una ley detrás— y los
         otros tres la describen en general. En una lista que se escanea, lo
         específico va arriba. */
      sostenibilidad: {
        nombre: "Sostenibilidad y educación ambiental",
        items: [
          {
            nombre: "Programa «Siembra Verificable» para empresas",
            nota: "Ley 2173 de 2021",
          },
          { nombre: "Voluntariado ambiental corporativo" },
          { nombre: "Educación ambiental" },
          { nombre: "Desarrollo sostenible" },
          { nombre: "Acompañamiento a iniciativas ambientales y territoriales" },
        ],
      },
    },
  },

  /**
   * Los seis proyectos, de las fichas que BIOMADS entregó el 30 de
   * septiembre de 2026. Se corrigieron tres erratas del original —
   * «Embellicimiento», la «y» que faltaba entre las dos especies en veda y
   * el separador decimal de 88,54 ha en la etiqueta— y se normalizaron los
   * estados, que venían en cuatro grafías distintas. Nada más se tocó: las
   * cifras, las resoluciones y los decretos son los que manda la ficha.
   */
  proyectos: {
    rotulo: "Proyectos destacados",
    titulo: "Casos que generan impacto",
    entradilla:
      "Cada proyecto es una muestra de nuestro compromiso con el medio ambiente y con el desarrollo sostenible de los territorios.",
    verTodos: "Ver los seis proyectos",
    verFicha: "Ver la ficha",
    indice: {
      rotulo: "Proyectos",
      lineasTitulo: ["Seis proyectos,", "con su ficha completa"],
      entradilla:
        "Cliente, periodo, sector, servicio y alcance de cada uno, con la resolución o el decreto bajo el que se ejecutó. Publicamos lo que podemos sustentar, así que aquí no hay contador de proyectos ni de años acumulados.",
      volver: "Inicio",
      siguienteTitulo: "¿Tiene un frente parecido?",
      siguienteTexto:
        "Cuéntenos de qué se trata y le decimos cómo lo abordaríamos.",
    },
    estados: {
      "en-ejecucion": "En ejecución",
      ejecutado: "Ejecutado",
    },
    ficha: {
      estado: "Estado",
      cliente: "Cliente",
      periodo: "Periodo",
      sector: "Sector",
      servicio: "Servicio",
      alcance: "Alcance del proyecto",
    },
    casos: {
      paga: {
        titulo: "Actualización y elaboración del PAGA",
        cliente: "Concesionaria Autopista Río Magdalena S.A.S. (ALEATICA)",
        clienteCorto: "Autopista Río Magdalena",
        sector: "Infraestructura vial (concesiones 4G)",
        servicio: "PAGA",
        alcance:
          "Actualización y elaboración del Plan de Adaptación a la Guía Ambiental (PAGA) para cuatro unidades funcionales, bajo la Resolución INVIAS 2335 de 2022.",
        etiquetas: ["PAGA", "SAT", "Seguimiento ambiental", "Gestión ambiental"],
      },
      sat: {
        titulo: "Puesta en marcha del Sistema de Alertas Tempranas (SAT)",
        cliente: "Concesionaria Autopista Río Magdalena S.A.S. (ALEATICA)",
        clienteCorto: "Autopista Río Magdalena",
        sector: "Infraestructura vial · gestión del riesgo",
        servicio: "SAT · monitoreo hidrometeorológico",
        alcance:
          "Automatización y captura de datos hidrometeorológicos desde los satélites GOES-16 y GOES-19 y el IDEAM. Generación de las API que integran las alertas en tiempo real al sistema SCADA y a las pantallas LED del proyecto, conforme al Decreto 2157 de 2017.",
        etiquetas: ["SAT", "SCADA", "Decreto 2157/2017", "Monitoreo ambiental"],
      },
      "compensacion-biotica": {
        titulo: "Plan Integral de Compensación Ambiental Biótica",
        cliente: "Concesionaria Autopista Río Magdalena S.A.S. · Consorcio BioPro",
        clienteCorto: "Autopista Río Magdalena · BioPro",
        sector: "Infraestructura vial",
        servicio: "Compensaciones ambientales",
        alcance:
          "Ejecución y seguimiento del Plan de Compensación por Pérdida de Biodiversidad sobre 88,54 hectáreas, bajo las resoluciones ANLA 707 de 2016 y 1109 de 2017. Incluye la veda forestal con Corantioquia (Tabebuia chrysantha y Hymenaea courbaril), el manejo de flora epífita reubicada y el monitoreo de fauna amenazada (bagre rayado y tortuga de río).",
        etiquetas: [
          "Compensación ambiental",
          "Biodiversidad",
          "88,54 ha",
          "Gestión ambiental",
          "Seguimiento",
        ],
      },
      embellecimiento: {
        titulo: "Embellecimiento y recuperación paisajística",
        cliente: "Concesionaria Autopista Río Magdalena S.A.S.",
        clienteCorto: "Autopista Río Magdalena",
        sector: "Infraestructura vial",
        servicio: "Embellecimiento y paisajismo",
        alcance:
          "Ejecución de actividades orientadas al mejoramiento paisajístico, el enriquecimiento florístico de una hectárea y la restauración vegetal en áreas operativas, glorietas y zonas de influencia del corredor vial de la concesión.",
        etiquetas: [
          "Embellecimiento",
          "Paisajismo",
          "Gestión ambiental",
          "Enriquecimiento florístico",
        ],
      },
      "flora-epifita-quimbo": {
        titulo: "Mantenimiento de flora epífita — hidroeléctrica El Quimbo",
        cliente: "Grupo Empresarial Surcolombiano S.A.S.",
        clienteCorto: "Grupo Empresarial Surcolombiano",
        sector: "Energía · hidroeléctrico",
        servicio: "Conservación y manejo de flora",
        alcance:
          "Mantenimiento, monitoreo y seguimiento técnico de la flora epífita rescatada y reubicada en el municipio de Gigante (Huila), en el área de influencia del proyecto hidroeléctrico El Quimbo.",
        etiquetas: ["Flora epífita", "Gestión ambiental"],
      },
      "fauna-solinter": {
        titulo: "Estudio de biodiversidad de fauna para EIA",
        cliente: "Soluciones Integrales Internacionales S.A.S. (SOLINTER)",
        clienteCorto: "SOLINTER",
        sector: "Infraestructura vial terciaria",
        servicio: "Consultoría y planificación ambiental",
        alcance:
          "Caracterización y monitoreo de la biodiversidad de fauna silvestre para la estructuración del Estudio de Impacto Ambiental (EIA) de vías terciarias en Garzón y Gigante (Huila).",
        etiquetas: ["EIA"],
      },
    },
  },

  galeria: {
    rotulo: "En campo",
    titulo: "Así se ve el trabajo",
    /* Decía «jornadas de siembra, mantenimiento y control fitosanitario».
       Con el frente de obra que entró el 28 de septiembre de 2026 —trazado,
       encalado y líneas de piedra— esa lista se quedaba corta y dejaba fuera
       la mitad de lo que se ve. */
    texto:
      "Jornadas de trazado, adecuación del terreno, siembra y mantenimiento, fotografiadas en los frentes donde se ejecutaron.",
    carrusel: "Fotografías de campo",
    anterior: "Fotografía anterior",
    siguiente: "Fotografía siguiente",
    posicion: "{n} de {total}",
    irA: "Ir a la fotografía {n}",
    ampliar: "Ampliar la fotografía {n}",
    visor: "Visor de fotografías",
    cerrar: "Cerrar el visor",
  },

  clientes: {
    rotulo: "Han confiado en nosotros",
    nombres: {
      "autopista-rio-magdalena": "Autopista Río Magdalena",
      ibal: "IBAL",
      "grupo-energia-bogota": "Grupo Energía Bogotá",
    },
  },

  contacto: {
    rotulo: "Contacto",
    /* Era «Cuéntenos qué tiene que radicar», con una entradilla que
       añadía «con el alcance y la autoridad ante la que responde alcanza
       para armar una propuesta». Las dos se retiraron por decisión del
       cliente: radicar es jerga de trámite y la entradilla pedía deberes
       antes de dejar escribir. El título repite ahora el del botón del
       hero, que es el que trae aquí a casi todo el mundo, y la sección
       entra directa a las vías de contacto. */
    titulo: "Cuéntenos su proyecto",
    /* Era «Directo, sin formulario». Explicaba el formulario en vez de
       nombrar lo que hay debajo, que son el teléfono y el correo. */
    directoRotulo: "Escríbanos directo",
    telefonoNota: "Llamada o WhatsApp",
    correoNota: "Correo de gerencia",
    dondeRotulo: "Dónde estamos",
    regionesNota: "Proyectos ejecutados en",
    formulario: {
      nombre: "Nombre",
      empresa: "Empresa o entidad",
      correo: "Correo",
      telefono: "Teléfono",
      telefonoAyuda: "Opcional. Con indicativo si escribe desde fuera de Colombia.",
      servicio: "Tipo de servicio",
      servicioElegir: "Elija una opción",
      servicioOtro: "Otro o no estoy seguro",
      mensaje: "Mensaje",
      mensajeAyuda: "Con un par de líneas sobre lo que necesita, nos basta para empezar.",
      datosAntes:
        "Autorizo a BIOMADS S.A.S a tratar los datos de este formulario para responder a mi solicitud, según su",
      datosEnlace: "política de tratamiento de datos personales",
      datosDespues: ".",
      grupoQuien: "Quién escribe",
      grupoQue: "Qué necesita",
      asuntoRespaldo: "Solicitud de propuesta — {empresa}",
      enviar: "Enviar mensaje",
      enviando: "Enviando",
      exitoRotulo: "Mensaje enviado",
      exitoGracias: "Gracias, {nombre}.",
      exitoRespuesta: "Le respondemos a {correo}.",
      exitoUrgente: "Si es urgente, escríbanos por WhatsApp al",
      otroMensaje: "Enviar otro mensaje",
      errorRotulo: "No se pudo enviar",
      errorGenerico: "No pudimos enviar el mensaje.",
      errorRespaldo:
        "Su mensaje no se perdió: mándelo directo por cualquiera de estas dos vías y llega igual.",
      oEscribanos: "O escríbanos directo por",
      escribirWhatsapp: "Enviarlo por WhatsApp",
      escribirCorreo: "Enviarlo por correo",
      errores: {
        nombreVacio: "Escriba su nombre.",
        empresaVacia: "Escriba la empresa o entidad desde la que escribe.",
        correoVacio: "Escriba un correo para responderle.",
        correoSinArroba: "El correo necesita un @.",
        correoSinUsuario: "Falta lo que va antes del @.",
        correoDosArrobas: "El correo tiene más de un @.",
        correoSinDominio: "Falta el dominio después del @ — por ejemplo, empresa.com.",
        correoDominioSinPunto: "Al dominio le falta un punto — por ejemplo, empresa.com.",
        correoDominioConPuntoSuelto: "El dominio no puede empezar ni terminar en punto.",
        correoConEspacios: "El correo no puede llevar espacios.",
        telefonoInvalido: "El teléfono debe tener entre 7 y 15 dígitos.",
        servicioVacio: "Elija el tipo de servicio. Si no está seguro, marque «Otro».",
        servicioDesconocido: "Elija una de las opciones de la lista.",
        mensajeVacio: "Cuéntenos qué necesita.",
        mensajeCorto: "Con un poco más de detalle podemos responderle mejor.",
        mensajeLargo: "Es demasiado largo para este formulario. Resuma aquí y adjunte el resto por correo.",
        datosSinAutorizar: "Necesitamos su autorización para tratar los datos y poder responderle.",
      },
      respuestas: {
        envioIlegible: "No entendimos el envío.",
        datosInvalidos: "Revise los datos del formulario.",
        envioNoConectado: "El envío desde el sitio todavía no está conectado.",
        correoNoSalio: "El correo no salió.",
      },
    },
  },

  siguientePaso: {
    solicitarPropuesta: "Solicitar propuesta",
  },

  pie: {
    /* Sin cifra de equipo: decía «un equipo permanente de ≈10 personas» y
       el cliente pidió retirar el número de integrantes. El hueco {equipo}
       desapareció también del componente que interpola. */
    resumen:
      "BIOMADS es una empresa de gestión ambiental y biodiversidad con sede en {sede}, constituida en {constitucion}. Un equipo multidisciplinario de profesionales y especialistas, con trabajo ejecutado en {regiones}.",
    escribanos: "Escríbanos",
    seccionesRotulo: "Secciones",
    llamadaOWhatsapp: "llamada o WhatsApp",
    constituidaEn: "Constituida en",
    politicaDatos: "Política de tratamiento de datos personales",
    desarrollado: "Sitio web desarrollado en {anio}",
  },

  privacidad: privacidadEs,

  fotos: {
    "campo-abierto":
      "Dos operarios con equipos de aspersión de espalda tratan la franja verde entre la calzada y el talud de una vía, con el corte del terreno y un camión al fondo.",
    "individuos-en-hilera":
      "Individuos vegetales jóvenes plantados en hileras sobre terreno cubierto de material vegetal seco, con el borde de bosque al fondo.",
    "cuadrilla-ladera":
      "Dos operarios de BIOMADS ascienden una ladera cubierta de pasto alto en una zona de compensación, con estacas de señalización y árboles jóvenes plantados.",
    "mantenimiento-individuo":
      "Operario con sombrero y guantes revisa un árbol joven rodeado de material vegetal seco durante una jornada de mantenimiento.",
    "control-fitosanitario":
      "Operario con traje de protección, respirador y aspersor de espalda aplicando tratamiento sobre vegetación en campo abierto.",
    "parcela-estacas":
      "Parcela de siembra junto a una vía, con individuos jóvenes alineados, estacas de señalización y un operario trasladando material en carretilla.",
    "marcacion-individuo":
      "Operario con chaleco reflectivo revisa y marca un individuo señalizado con estaca en medio de vegetación alta.",
    "revision-planta":
      "Operario con equipo de protección junto a una planta joven de hojas anchas durante una jornada de revisión en campo.",
    "area-estudio":
      "Ladera abierta cubierta de pasto con una línea de cerca y un operario de BIOMADS trabajando a media distancia, en un área de estudio.",
    "siembra-ladera":
      "Operario de BIOMADS asegura un individuo vegetal joven en una ladera de vegetación densa durante una jornada de campo.",
    "traslado-material":
      "Operario traslada un bulto de material por un frente de trabajo cubierto de vegetación, junto a helechos y arbustos.",
    "siembra-via":
      "Individuos vegetales jóvenes plantados en hileras regulares sobre terreno cubierto de material vegetal seco, listos para seguimiento.",
    "aspersion-ladera":
      "Operario de espaldas, con aspersor al hombro, avanza por una ladera de vegetación densa aplicando producto.",
    "siembra-manual":
      "Operario agachado planta con las manos un individuo joven de hojas anchas, junto a una bolsa de sustrato.",
    "ahoyado-pradera":
      "Operario agachado abre un hoyo con herramienta manual en una pradera abierta bajo el sol.",
    "aplicacion-fitosanitaria":
      "Operario con traje de protección, careta y aspersor de mano aplica producto sobre plántulas; la nube de aspersión es visible.",
    "riego-arbol-potrero":
      "Operario con chaleco reflectivo y bomba de espalda junto a un árbol maduro en un potrero cercado.",
    "ahoyadora-via":
      "Operario con casco maneja una ahoyadora mecánica en un terreno de tierra junto a una vía, con señalización y un remolque al fondo.",
    "ahoyadora-detalle":
      "Primer plano de una ahoyadora mecánica perforando el suelo junto a un acopio de piedra y plántulas recién sembradas.",
    "estaca-tutor":
      "Operario con casco y uniforme reflectivo clava una estaca tutora con una barra junto a un individuo joven en ladera.",
    "plateo-individuo":
      "Operario limpia con azadón el contorno de un individuo joven en una ladera de pasto, dejando el suelo despejado a su alrededor.",
    "guadana-despeje":
      "Operario con guadaña y protección facial despeja vegetación alta entre árboles jóvenes.",
    "fertilizacion-individuo":
      "Operario con una bolsa aplica material al pie de un individuo joven sobre terreno cubierto de hojarasca seca.",
    "cuadrilla-aspersion":
      "Tres operarios con equipos de aspersión trabajan separados a lo largo de una ladera de pasto alto.",

    /* Frente de obra junto a vía. Como en el resto del set, cada alt
       describe lo que se ve y no el servicio al que lo queramos asociar. */
    "trazado-parcela":
      "Operario con casco y chaleco reflectivo marca con cal el trazado de una parcela jalonada con estacas de madera, junto a una vía.",
    "encalado-berma":
      "Operario esparce una enmienda blanca con un balde sobre la berma de una vía, al lado de una cuneta de concreto.",
    "carga-piedra":
      "Operario con casco carga piedra a dos carretillas junto a un acopio, al borde de una vía.",
    "cuadrilla-piedra":
      "Tres operarios alrededor de un acopio de piedra; uno trabaja una roca con herramienta eléctrica alimentada por una planta portátil.",
    "lineas-piedra":
      "Cuadrilla de cuatro operarios coloca líneas de piedra sobre un lote plano, con carretillas y montaña al fondo.",
    "banda-piedra":
      "Franja de piedra ya colocada en primer plano; al fondo, dos operarios preparan la siguiente entre estacas de trazado.",
    "cuadrilla-terreno":
      "Cuatro operarios de BIOMADS, en fila y agachados, trabajan el suelo descubierto de un lote junto a una vía.",
    "talud-cuneta":
      "Dos operarios trabajan con herramienta manual el talud de tierra contiguo a la boca de una alcantarilla, bajo cielo nublado.",
    "jardin-piedra":
      "Operario revisa una franja de piedra entre bandas de cubresuelo verde ya establecido, junto a una vía.",
  },

  unidades: {
    meses: "meses",
    y: "y",
  },
};
