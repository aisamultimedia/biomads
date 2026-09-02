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
    tituloPrivacidad: "Política de tratamiento de datos personales",
    descripcionPrivacidad:
      "Qué datos recoge el sitio de BIOMADS, para qué los usa, cuánto tiempo los guarda y cómo ejercer sus derechos según la Ley 1581 de 2012.",
    descripcionProyectos:
      "Proyectos ejecutados por BIOMADS en Huila: monitoreo de fauna para EIA de vías terciarias (SOLINTER, 2017) y seguimiento de flora epífita en El Quimbo (GES, 2018).",
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
    titulo: ["Estudios ambientales", "hechos para la revisión", "de la autoridad."],
    bajada:
      "Monitoreos de fauna, seguimiento de flora reubicada y gestión de obligaciones ambientales para proyectos de infraestructura.",
    ctaPrincipal: "Cuéntenos su proyecto",
    ctaSecundario: "Ver proyectos ejecutados",
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
    titulo: "Capacidad técnica a la medida del alcance",
    quienesSomos:
      "Somos BIOMADS, un equipo especializado en diseñar y ejecutar proyectos vanguardia que permitan el desarrollo sostenible de la sociedad y el medio ambiente.",
    fortaleza:
      "Nuestra principal fortaleza es la capacidad de adaptarnos a las necesidades específicas de cada proyecto, articulando un equipo multidisciplinario de profesionales y especialistas. Esto nos permite ofrecer soluciones personalizadas y mantener un acompañamiento cercano durante el desarrollo de los proyectos.",
    estructuraRotulo: "Estructura permanente",
    perfiles: {
      gerente: "Gerente",
      "director-administrativo": "Director administrativo",
      "coordinador-ambiental": "Coordinador ambiental / SIG",
      "auxiliar-administrativa": "Auxiliar administrativa",
      "lider-proyectos": "Líder de proyectos",
    },
  },

  institucional: {
    misionRotulo: "Misión",
    mision:
      "Desarrollar proyectos con excelencia y compromiso, promoviendo la sostenibilidad y el respeto por los recursos naturales.",
    visionRotulo: "Visión",
    vision:
      "Ser una empresa líder a nivel nacional en soluciones ambientales integrales, reconocida por su innovación, excelencia operativa y compromiso con el desarrollo sostenible.",
    valoresRotulo: "Valores corporativos",
    valores: {
      excelencia: {
        nombre: "Excelencia técnica",
        texto:
          "Compromiso con altos estándares de calidad, precisión e innovación en cada proyecto.",
      },
      sostenibilidad: {
        nombre: "Sostenibilidad activa",
        texto:
          "Promovemos el uso responsable de los recursos naturales y el desarrollo sostenible.",
      },
      integridad: {
        nombre: "Integridad y transparencia",
        texto:
          "Actuamos con ética, responsabilidad y cumplimiento normativo en todas nuestras operaciones.",
      },
      innovacion: {
        nombre: "Innovación ambiental",
        texto:
          "Aplicamos soluciones técnicas avanzadas y eficientes para enfrentar los desafíos ambientales.",
      },
      social: {
        nombre: "Compromiso social",
        texto:
          "Generamos impacto positivo en las comunidades y fomentamos el respeto por el entorno.",
      },
    },
    politicaRotulo: "Política de calidad",
    politica: [
      "En BIOMADS nos comprometemos a planificar, ejecutar y supervisar proyectos ambientales con altos estándares de calidad, sostenibilidad y responsabilidad.",
      "Implementamos procesos eficientes y mejora continua, garantizando el cumplimiento de la normatividad ambiental vigente y la satisfacción de nuestros clientes, contribuyendo al desarrollo sostenible y la protección del medio ambiente.",
    ],
    objetivosRotulo: "Objetivos",
    objetivos: [
      "Cumplir con la normativa técnica y ambiental aplicable.",
      "Desarrollar soluciones ambientales integrales y sostenibles.",
      "Optimizar procesos.",
      "Promover la mejora continua.",
      "Garantizar la satisfacción de nuestros clientes.",
    ],
  },

  promesa: {
    rotulo: "Nuestra promesa",
    enunciado:
      "Un estudio ambiental se mide por lo que resiste cuando alguien lo revisa.",
  },

  etapas: {
    rotulo: "Estudios ambientales",
    nombres: {
      identificacion: "Identificación",
      evaluacion: "Evaluación",
      prevencion: "Prevención y mitigación",
      compensacion: "Corrección y compensación",
      permisos: "Permisos",
    },
  },

  servicios: {
    rotulo: "Servicios",
    titulo: "Dos frentes documentados a fondo",
    pieTarjeta: "Marco normativo, entregable y duración",
    consultarAlcance: "Consultar un alcance",
    listados: {
      "actividad-forestal": "Actividad forestal",
      compensacion: "Planes de compensación ambiental",
      inventarios: "Inventarios forestales",
      "flora-fauna": "Flora y fauna",
      educacion: "Educación ambiental",
      "desarrollo-sostenible": "Desarrollo sostenible",
      asesoria: "Asesoría y gestión ambiental",
    },
    detallados: {
      "monitoreo-fauna": {
        titulo: "Monitoreo y estudio de biodiversidad de fauna",
        resumen:
          "Caracterización y monitoreo de fauna como soporte de los estudios ambientales del proyecto.",
        cuandoSeNecesita:
          "Cuando se va a desarrollar un proyecto vial o de infraestructura que requiere evaluar sus posibles impactos sobre la fauna, especialmente como parte de los estudios ambientales necesarios para su ejecución.",
        marco:
          "Se ejecuta dentro del marco de los estudios de impacto ambiental y de las obligaciones ambientales del proyecto. Si el proyecto está sujeto a licenciamiento de competencia nacional puede involucrar a la ANLA; en otros casos, a la autoridad ambiental regional correspondiente.",
        entregable:
          "Informe técnico de caracterización y monitoreo de fauna, con registros de las especies encontradas, metodología aplicada, resultados y análisis de la biodiversidad asociada al área del proyecto.",
        duracion:
          "Depende del tamaño y características del área de estudio, tipo de proyecto, grupos de fauna a evaluar, número de jornadas de campo y condiciones climáticas. Puede requerir varias campañas para obtener información representativa.",
        elVacio:
          "Que el estudio no sea simplemente una lista de especies, sino que entregue información de campo confiable, metodología clara, registros verificables y resultados técnicamente sustentados, de manera que pueda usarse como soporte de los estudios ambientales del proyecto.",
        metodologia:
          "Jornadas de monitoreo y aplicación de una metodología de campo que permitiera recopilar y organizar registros confiables para sustentar técnicamente el estudio ambiental.",
        metodologiaFuente: "SOLINTER · vías terciarias en Garzón y Gigante, Huila · 2017",
        lineasTitulo: ["Monitoreo y estudio", "de biodiversidad de fauna"],
        autoridad: "ANLA o autoridad regional",
        metaTitulo: "Monitoreo de biodiversidad de fauna",
        metaDescripcion:
          "Caracterización y monitoreo de fauna como soporte del estudio ambiental: registros verificables, metodología aplicada y resultados técnicamente sustentados.",
      },
      "flora-epifita": {
        titulo: "Mantenimiento y seguimiento de flora epífita reubicada",
        resumen:
          "Seguimiento con registros verificables después del traslado, no solo la reubicación inicial.",
        cuandoSeNecesita:
          "Cuando un proyecto de infraestructura ha requerido el rescate, traslado o reubicación de flora epífita y posteriormente debe garantizar su mantenimiento y seguimiento para demostrar que las medidas ambientales implementadas están funcionando.",
        marco:
          "Bajo las obligaciones ambientales establecidas para el proyecto y las medidas de manejo relacionadas con la flora epífita, ante la autoridad ambiental competente. Pueden estar contenidas en el instrumento de manejo o licenciamiento ambiental y en los actos administrativos correspondientes.",
        entregable:
          "Informes técnicos de mantenimiento y seguimiento donde se documenta el estado de las especies, su supervivencia, evolución y las actividades realizadas.",
        duracion:
          "Depende del número de individuos o especies reubicadas, área, estado de las plantas, frecuencia de mantenimiento y requerimientos de la autoridad. Puede extenderse si hay pérdidas, deterioro o condiciones climáticas adversas.",
        elVacio:
          "Que exista un seguimiento real después de la reubicación, no solamente el traslado inicial. El cliente necesita demostrar que las plantas fueron mantenidas, que se verificó su evolución y que existe trazabilidad mediante registros e informes técnicos.",
        metodologia:
          "Actividades periódicas de mantenimiento y seguimiento, dejando registro del comportamiento y evolución de la flora reubicada.",
        metodologiaFuente: "GES · flora epífita de El Quimbo, Gigante, Huila · 2018",
        lineasTitulo: ["Mantenimiento y seguimiento", "de flora epífita reubicada"],
        autoridad: "Autoridad ambiental competente",
        metaTitulo: "Mantenimiento y seguimiento de flora epífita reubicada",
        metaDescripcion:
          "Seguimiento con registros verificables después del traslado: estado de las especies, supervivencia y evolución documentadas en informes técnicos.",
      },
    },
    panel: {
      cuandoSeNecesita: "Cuándo se necesita",
      marco: "Marco normativo",
      entregable: "Entregable",
      duracion: "Duración típica",
      metodo: "Método aplicado en campo",
      ultimaEjecucion: "Última ejecución",
      cta: "Cuéntenos su proyecto",
      cerrar: "Cerrar",
      paginaCompleta: "Ver la página completa",
    },
    detalle: {
      volver: "Servicios",
      fichaRotulo: "La ficha",
      fichaTitulo: "Qué cubre y bajo qué marco",
      metodoRotulo: "Cómo se ejecuta",
      metodoTitulo: "Método aplicado en campo",
      dificultadTitulo: "Qué lo hacía difícil",
      casoRotulo: "Caso relacionado",
      casoTitulo: "Dónde se ejecutó",
      autoridad: "Autoridad",
      ultimaEjecucion: "Última ejecución",
      entregable: "Entregable",
      informeTecnico: "Informe técnico",
      ejecutadoEn: "Ejecutado en",
      ejecucionContractual: "Última ejecución contractual",
      marcoYMetodologia: "Marco normativo y metodología",
      siguienteTitulo: "Cuéntenos el alcance y la autoridad",
    },
  },

  proyectos: {
    rotulo: "Proyectos",
    titulo: "Ejecutados y verificables",
    verCompleto: "Ver el proyecto completo",
    dificultadRotulo: "La dificultad",
    resolucionRotulo: "Cómo se resolvió",
    ficha: {
      anio: "Año",
      duracion: "Duración",
      ubicacion: "Ubicación",
      servicio: "Servicio",
    },
    abrirFicha: "Ver la ficha de {cliente}",
    cerrar: "Cerrar",
    verPaginaCompleta: "Ver la página completa",
    certificadosRotulo: "Certificados y constancias",
    certificadosTexto:
      "Se publican aquí en PDF. Mientras tanto las enviamos por correo a quien las pida.",
    certificadoPendiente: "Constancia pendiente de cargar",
    pedirCertificados: "Pedir las constancias",
    detalle: {
      cliente: "Cliente",
      encargoRotulo: "El encargo",
      encargoTitulo: "Qué lo hacía difícil y cómo se resolvió",
      razonSocial: "Razón social del cliente",
      servicioRotulo: "El servicio",
      verFichaServicio: "Ver la ficha del servicio",
      otroProyecto: "También puede ver el otro proyecto documentado:",
    },
    indice: {
      lineasTitulo: ["Lo que hemos ejecutado,", "con nombre y duración"],
      entradilla:
        "Dos proyectos con ficha completa: encargo, dificultad, cómo se resolvió y duración contractual. Publicamos lo que podemos sustentar, así que aquí no hay contador de proyectos ni de años acumulados.",
      conFichaCompleta: "Con ficha completa",
      regiones: "Regiones",
      anios: "Años",
      duraciones: "Duraciones",
      casosRotulo: "Casos",
      dondeRotulo: "Dónde",
      dondeTitulo: "Regiones con proyectos ejecutados",
      dondeTexto:
        "Ahí están los proyectos que podemos documentar. Trabajamos desde Ibagué y nos desplazamos según lo pida el frente, pero no vamos a decirle que tenemos cobertura nacional para ganarnos una invitación.",
    },
    casos: {
      "solinter-2017": {
        cliente: "Soluciones Integrales Internacionales S.A.S. — SOLINTER",
        clienteCorto: "SOLINTER",
        ubicacion: "Garzón y Gigante, Huila",
        encargo:
          "Monitoreo y estudio de la biodiversidad de fauna asociado al Estudio de Impacto Ambiental para proyectos de vías terciarias.",
        dificultad:
          "Obtener información representativa de la biodiversidad de fauna en campo, dadas las características del área y las condiciones propias de los muestreos.",
        resolucion:
          "Jornadas de monitoreo y aplicación de una metodología de campo que permitiera recopilar y organizar registros confiables para sustentar técnicamente el estudio ambiental.",
        servicioRotulo: "Monitoreo de fauna",
      },
      "ges-2018": {
        cliente: "Grupo Empresarial Surcolombiano S.A.S. — GES",
        clienteCorto: "GES",
        ubicacion: "Gigante, Huila · proyecto hidroeléctrico El Quimbo",
        encargo:
          "Mantenimiento y seguimiento de la flora epífita reubicada, perteneciente al proyecto hidroeléctrico El Quimbo.",
        dificultad:
          "Garantizar la continuidad del mantenimiento y seguimiento de la flora epífita después de su reubicación, verificando su estado durante el periodo contractual.",
        resolucion:
          "Actividades periódicas de mantenimiento y seguimiento, dejando registro del comportamiento y evolución de la flora reubicada.",
        servicioRotulo: "Flora epífita",
      },
    },
  },

  galeria: {
    rotulo: "En campo",
    titulo: "Así se ve el trabajo",
    texto:
      "Jornadas de siembra, mantenimiento y control fitosanitario, fotografiadas en los frentes donde se ejecutaron.",
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
    titulo: "Cuéntenos qué tiene que radicar",
    intro:
      "Con el alcance y la autoridad ante la que responde alcanza para armar una propuesta.",
    directoRotulo: "Directo, sin formulario",
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
      mensajeAyuda:
        "El alcance y la autoridad ante la que responde nos bastan para empezar.",
      datosAntes:
        "Autorizo a BIOMADS S.A.S a tratar los datos de este formulario para responder a mi solicitud, según su",
      datosEnlace: "política de tratamiento de datos personales",
      datosDespues: ".",
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
        mensajeVacio: "Cuéntenos qué necesita radicar o ejecutar.",
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
    rotulo: "Siguiente paso",
    solicitarPropuesta: "Solicitar propuesta",
    escribirWhatsapp: "Escribir por WhatsApp",
    tituloProyectos: "¿Necesita referencias de un frente parecido?",
    textoProyectos:
      "Pídanos el detalle del proyecto que más se acerque al suyo y le contamos cómo se ejecutó.",
    tituloServicio: "Cuéntenos el alcance y la autoridad",
    textoServicio:
      "Con eso alcanza para decirle si el frente es nuestro y armar una propuesta.",
  },

  pie: {
    resumen:
      "BIOMADS es una empresa de estudios y gestión ambiental con sede en {sede}, constituida en {constitucion}. Un equipo permanente de {equipo} personas más los especialistas que pida cada proyecto, con trabajo ejecutado en {regiones}.",
    escribanos: "Escríbanos",
    seccionesRotulo: "Secciones",
    llamadaOWhatsapp: "llamada o WhatsApp",
    constituidaEn: "Constituida en",
    notaCookies: "No usamos cookies de seguimiento; solo se guarda su respuesta al aviso.",
    politicaDatos: "Política de tratamiento de datos personales",
    desarrollado: "Sitio web desarrollado en {anio}",
    lema: "Dejando huella",
  },

  privacidad: privacidadEs,
  cookies: {
    region: "Aviso sobre cookies",
    texto: "No usamos cookies de seguimiento.",
    cerrar: "Entendido, cerrar el aviso",
  },

  fotos: {
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
  },

  unidades: {
    meses: "meses",
    personas: "personas",
    y: "y",
  },
};
