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
      "Desarrollar soluciones ambientales con rigor técnico y experiencia en campo, contribuyendo a la conservación de la biodiversidad y a la gestión sostenible de los proyectos y territorios.",
    visionRotulo: "Visión",
    vision:
      "Ser una empresa referente en Colombia en gestión ambiental y biodiversidad, reconocida por su excelencia técnica, innovación y capacidad para generar soluciones sostenibles.",
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
    conFicha: "Ver la ficha técnica",
    categorias: {
      biodiversidad: {
        nombre: "Biodiversidad y ecosistemas",
        items: [
          "Monitoreo y caracterización de fauna y flora",
          "Flora epífita",
          "Seguimiento y manejo de biodiversidad",
        ],
      },
      forestal: {
        nombre: "Gestión forestal y compensaciones",
        items: [
          "Inventarios forestales",
          "Actividad forestal",
          "Planes de compensación ambiental",
          "Restauración y seguimiento",
        ],
      },
      estudios: {
        nombre: "Estudios y gestión ambiental",
        items: [
          "Estudios ambientales",
          "Asesoría y gestión ambiental",
          "Seguimiento de obligaciones y requerimientos ambientales",
        ],
      },
      sostenibilidad: {
        nombre: "Sostenibilidad y educación ambiental",
        items: [
          "Educación ambiental",
          "Desarrollo sostenible",
          "Acompañamiento a iniciativas ambientales y territoriales",
        ],
      },
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
    },
    detalle: {
      volver: "Servicios",
      fichaRotulo: "La ficha",
      fichaTitulo: "Qué cubre y bajo qué marco",
      metodoRotulo: "Cómo se ejecuta",
      metodoTitulo: "Método aplicado en campo",
      autoridad: "Autoridad",
      ultimaEjecucion: "Última ejecución",
      entregable: "Entregable",
      informeTecnico: "Informe técnico",
      siguienteTitulo: "Cuéntenos el alcance y la autoridad",
      /* El cierre de la ficha enlazaba la otra sin decir a qué venía: el
         párrafo terminaba en punto y detrás quedaba el título del otro
         servicio suelto, como una frase a medias. */
      otraFicha: "También puede ver la ficha de",
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
    tituloServicio: "Cuéntenos el alcance y la autoridad",
    textoServicio:
      "Con eso alcanza para decirle si el frente es nuestro y armar una propuesta.",
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
    y: "y",
  },
};
