import type { Diccionario } from "./tipos";
import { privacidadEn } from "./en.privacidad";

/**
 * English dictionary.
 *
 * TRANSLATION BASE — written on 2 September 2026 from es.ts, to be reviewed
 * by BIOMADS (or a translator they trust) before it is considered final.
 * Every string here has a Spanish original with the same key: the
 * `Diccionario` type will not compile if one is missing.
 *
 * What was decided, so the reviewer does not have to guess:
 *
 * - Colombian legal instruments keep their Spanish name with a short gloss
 *   the first time they appear (Ley 1581 de 2012, ANLA, EIA). A foreign
 *   reader searching for them will find them under those names.
 * - "Radicar" —filing a study with the authority— becomes "file", which is
 *   what a permitting consultant in English would say.
 * - Client names, project names (El Quimbo) and places stay as they are.
 * - The tagline "Dejando huella" is a brand asset and is not translated.
 * - Register: professional, direct, second person. No marketing filler
 *   that the Spanish does not have.
 *
 * Nothing here says anything the Spanish does not say. Figures, clients,
 * years and claims are the ones in CONTENIDO.md.
 */
export const en: Diccionario = {
  nombre: "English",
  etiquetaHtml: "en",

  meta: {
    titulo: "BIOMADS — Environmental studies and management",
    plantillaTitulo: "%s — BIOMADS",
    descripcionPortada:
      "BIOMADS S.A.S — environmental studies and management from Ibagué, Colombia. Wildlife biodiversity monitoring and follow-up of relocated epiphytic flora, with verifiable records.",
    tituloPrivacidad: "Personal data policy",
    descripcionPrivacidad:
      "What data the BIOMADS site collects, what it is used for, how long it is kept and how to exercise your rights under Colombia's Law 1581 of 2012.",
  },

  nav: {
    principal: "Main",
    saltoContenido: "Skip to content",
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
    menuNavegacion: "Navigation menu",
    irAlInicio: "BIOMADS — go to the top",
    pieDePagina: "Footer",
    volverArriba: "Back to top",
    secciones: {
      nosotros: "About",
      servicios: "Services",
      contacto: "Contact",
    },
    idioma: "Language",
  },

  hero: {
    descriptor: "Strategic partners in environmental management and corporate sustainability",
    titulo: ["Environmental knowledge", "that transforms projects", "and territories."],
    bajada:
      "We combine field experience and specialist knowledge to develop solutions in biodiversity, environmental studies, restoration and the management of environmental obligations.",
    ctaPrincipal: "Tell us about your project",
    ctaSecundario: "See our services",
    ficha: {
      experiencia: "Experience",
      constituida: "Incorporated",
      sede: "Based in",
      regiones: "Projects delivered in",
    },
    anios: "years",
    indicadorScroll: "Go to the next section",
    pausarVideo: "Pause the background video",
    reanudarVideo: "Resume the background video",
  },

  nosotros: {
    rotulo: "Who we are",
    titulo: "Technical knowledge, field experience and commitment to the territory",
    quienesSomos:
      "We are BIOMADS, a company specialising in environmental management and biodiversity. We develop technical solutions that answer the particular needs of each project, bringing together knowledge, field experience and an understanding of the territory.",
    fortaleza:
      "We have a multidisciplinary team of professionals and specialists that lets us approach each project as a whole, adapt to its challenges and support our clients through the different stages of their environmental management.",
    proposito:
      "Our purpose is to contribute technically sound solutions that support environmental compliance, the conservation of biodiversity and the sustainable development of projects and territories.",
  },

  institucional: {
    misionRotulo: "Mission",
    mision:
      "To develop environmental solutions with technical rigour and field experience, contributing to the conservation of biodiversity and the sustainable management of projects and territories.",
    visionRotulo: "Vision",
    vision:
      "To be a benchmark company in Colombia in environmental management and biodiversity, recognised for its technical excellence, innovation and capacity to generate sustainable solutions.",
    valoresRotulo: "Corporate values",
    valores: {
      excelencia: {
        nombre: "Technical excellence",
        texto: "Rigour, knowledge and quality in every project.",
      },
      sostenibilidad: {
        nombre: "Sustainability",
        texto:
          "We promote solutions that contribute to the balance between development and conservation.",
      },
      integridad: {
        nombre: "Integrity and transparency",
        texto: "We act with ethics, responsibility and consistency.",
      },
      innovacion: {
        nombre: "Innovation",
        texto:
          "We look for new and better ways to answer environmental challenges.",
      },
      /* PENDING CONTENT. The client asked to keep five values and sent only
         four new texts. This one is kept exactly as it was until the final
         wording arrives. Nothing is invented. */
      social: {
        nombre: "Social commitment",
        texto:
          "We create a positive impact in communities and foster respect for the environment.",
      },
    },
    politicaRotulo: "Integrated policy",
    politica: [
      "At BIOMADS we develop environmental solutions to high standards of quality, promoting the protection of the environment, the sustainable use of natural resources and safe, healthy working conditions.",
      "Our commitment rests on the satisfaction of our clients, compliance with legal and other applicable requirements, the prevention of pollution, the management of risks and opportunities, the prevention of injury and ill health, and the continual improvement of our Integrated Management System, following the ISO 9001, ISO 14001 and ISO 45001 standards.",
    ],
    compromisosRotulo: "Commitments",
    compromisos: [
      "Quality and the satisfaction of our clients.",
      "Protection of the environment and prevention of pollution.",
      "Safety, health and wellbeing of our workers.",
      "Compliance with legal and other applicable requirements.",
      "Management of risks and opportunities, and continual improvement.",
    ],
  },

  promesa: {
    rotulo: "Our promise",
    enunciado:
      "Environmental solutions with technical rigour, knowledge of the territory and results that create value.",
  },

  etapas: {
    rotulo: "How we approach every project",
    nombres: {
      identificacion: "We identify",
      evaluacion: "We assess",
      prevencion: "We prevent and mitigate",
      compensacion: "We correct and compensate",
      seguimiento: "We manage and follow up",
    },
  },

  servicios: {
    rotulo: "Services",
    titulo: "Environmental solutions for every project",
    consultarAlcance: "Ask about a scope",
    conFicha: "See the technical fact sheet",
    categorias: {
      biodiversidad: {
        nombre: "Biodiversity and ecosystems",
        items: [
          "Wildlife and flora monitoring and characterisation",
          "Epiphytic flora",
          "Biodiversity follow-up and management",
        ],
      },
      forestal: {
        nombre: "Forest management and compensation",
        items: [
          "Forest inventories",
          "Forestry activities",
          "Environmental compensation plans",
          "Restoration and follow-up",
        ],
      },
      estudios: {
        nombre: "Environmental studies and management",
        items: [
          "Environmental studies",
          "Environmental advisory and management",
          "Follow-up of environmental obligations and requirements",
        ],
      },
      sostenibilidad: {
        nombre: "Sustainability and environmental education",
        items: [
          "Environmental education",
          "Sustainable development",
          "Support for environmental and territorial initiatives",
        ],
      },
    },
    detallados: {
      "monitoreo-fauna": {
        titulo: "Wildlife biodiversity monitoring and study",
        resumen:
          "Wildlife characterisation and monitoring in support of the project's environmental studies.",
        cuandoSeNecesita:
          "When a road or infrastructure project needs to assess its possible impacts on wildlife, especially as part of the environmental studies required before it can go ahead.",
        marco:
          "Carried out within the framework of environmental impact studies (EIA) and the project's environmental obligations. If the project is licensed at national level it may involve ANLA, Colombia's national environmental licensing authority; otherwise, the relevant regional environmental authority.",
        entregable:
          "Technical report of wildlife characterisation and monitoring, with records of the species found, the methodology applied, results and an analysis of the biodiversity associated with the project area.",
        duracion:
          "Depends on the size and characteristics of the study area, the type of project, the wildlife groups to assess, the number of field days and weather conditions. It may take several campaigns to obtain representative information.",
        elVacio:
          "That the study is not merely a list of species, but delivers reliable field information, a clear methodology, verifiable records and technically supported results, so that it can serve as the basis for the project's environmental studies.",
        metodologia:
          "Monitoring days and a field methodology designed to collect and organise reliable records that technically support the environmental study.",
        metodologiaFuente: "SOLINTER · rural roads in Garzón and Gigante, Huila · 2017",
        lineasTitulo: ["Wildlife biodiversity", "monitoring and study"],
        autoridad: "ANLA or regional authority",
        metaTitulo: "Wildlife biodiversity monitoring",
        metaDescripcion:
          "Wildlife characterisation and monitoring in support of the environmental study: verifiable records, applied methodology and technically supported results.",
      },
      "flora-epifita": {
        titulo: "Maintenance and follow-up of relocated epiphytic flora",
        resumen:
          "Follow-up with verifiable records after the transfer, not just the initial relocation.",
        cuandoSeNecesita:
          "When an infrastructure project has required the rescue, transfer or relocation of epiphytic flora and must then ensure its maintenance and follow-up to show that the environmental measures are working.",
        marco:
          "Under the environmental obligations set for the project and the management measures for epiphytic flora, before the competent environmental authority. They may be contained in the environmental management or licensing instrument and in the corresponding administrative acts.",
        entregable:
          "Technical maintenance and follow-up reports documenting the condition of the species, their survival, their development and the activities carried out.",
        duracion:
          "Depends on the number of relocated individuals or species, the area, the condition of the plants, the maintenance frequency and the authority's requirements. It may be extended if there are losses, deterioration or adverse weather.",
        elVacio:
          "That there is real follow-up after relocation, not only the initial transfer. The client needs to show that the plants were maintained, that their development was verified and that there is traceability through records and technical reports.",
        metodologia:
          "Periodic maintenance and follow-up activities, recording the behaviour and development of the relocated flora.",
        metodologiaFuente: "GES · epiphytic flora at El Quimbo, Gigante, Huila · 2018",
        lineasTitulo: ["Maintenance and follow-up", "of relocated epiphytic flora"],
        autoridad: "Competent environmental authority",
        metaTitulo: "Maintenance and follow-up of relocated epiphytic flora",
        metaDescripcion:
          "Follow-up with verifiable records after the transfer: condition of the species, survival and development documented in technical reports.",
      },
    },
    panel: {
      cuandoSeNecesita: "When it is needed",
      marco: "Regulatory framework",
      entregable: "Deliverable",
      duracion: "Typical duration",
      metodo: "Method applied in the field",
    },
    detalle: {
      volver: "Services",
      fichaRotulo: "The fact sheet",
      fichaTitulo: "What it covers and under which framework",
      metodoRotulo: "How it is carried out",
      metodoTitulo: "Method applied in the field",
      autoridad: "Authority",
      ultimaEjecucion: "Most recent delivery",
      entregable: "Deliverable",
      informeTecnico: "Technical report",
      siguienteTitulo: "Tell us the scope and the authority",
      otraFicha: "You can also see the fact sheet for",
    },
  },

  galeria: {
    rotulo: "In the field",
    titulo: "What the work looks like",
    texto:
      "Planting, maintenance and phytosanitary control days, photographed at the sites where they were carried out.",
    carrusel: "Field photographs",
    anterior: "Previous photograph",
    siguiente: "Next photograph",
    posicion: "{n} of {total}",
    irA: "Go to photograph {n}",
    ampliar: "Enlarge photograph {n}",
    visor: "Photo viewer",
    cerrar: "Close the viewer",
  },

  clientes: {
    rotulo: "Clients who have trusted us",
    nombres: {
      "autopista-rio-magdalena": "Autopista Río Magdalena",
      ibal: "IBAL",
      "grupo-energia-bogota": "Grupo Energía Bogotá",
    },
  },

  contacto: {
    rotulo: "Contact",
    titulo: "Tell us about your project",
    directoRotulo: "Direct, no form",
    telefonoNota: "Call or WhatsApp",
    correoNota: "Management email",
    dondeRotulo: "Where we are",
    regionesNota: "Projects delivered in",
    formulario: {
      nombre: "Name",
      empresa: "Company or organisation",
      correo: "Email",
      telefono: "Phone",
      telefonoAyuda: "Optional. Include the country code if you are outside Colombia.",
      servicio: "Type of service",
      servicioElegir: "Choose an option",
      servicioOtro: "Other, or not sure",
      mensaje: "Message",
      mensajeAyuda: "A couple of lines about what you need is enough to get started.",
      datosAntes:
        "I authorise BIOMADS S.A.S to process the data in this form in order to respond to my request, under its",
      datosEnlace: "personal data policy",
      datosDespues: ".",
      grupoQuien: "Who is writing",
      grupoQue: "What you need",
      asuntoRespaldo: "Proposal request — {empresa}",
      enviar: "Send message",
      enviando: "Sending",
      exitoRotulo: "Message sent",
      exitoGracias: "Thank you, {nombre}.",
      exitoRespuesta: "We will reply to {correo}.",
      exitoUrgente: "If it is urgent, write to us on WhatsApp at",
      otroMensaje: "Send another message",
      errorRotulo: "Could not send",
      errorGenerico: "We could not send your message.",
      errorRespaldo:
        "Your message is not lost: send it directly through either of these two channels and it will reach us all the same.",
      oEscribanos: "Or write to us directly on",
      escribirWhatsapp: "Send it on WhatsApp",
      escribirCorreo: "Send it by email",
      errores: {
        nombreVacio: "Enter your name.",
        empresaVacia: "Enter the company or organisation you are writing from.",
        correoVacio: "Enter an email address so we can reply.",
        correoSinArroba: "The email address needs an @.",
        correoSinUsuario: "The part before the @ is missing.",
        correoDosArrobas: "The email address has more than one @.",
        correoSinDominio: "The domain after the @ is missing — for example, company.com.",
        correoDominioSinPunto: "The domain needs a dot — for example, company.com.",
        correoDominioConPuntoSuelto: "The domain cannot start or end with a dot.",
        correoConEspacios: "The email address cannot contain spaces.",
        telefonoInvalido: "The phone number must have between 7 and 15 digits.",
        servicioVacio: "Choose the type of service. If you are not sure, pick “Other”.",
        servicioDesconocido: "Choose one of the options in the list.",
        mensajeVacio: "Tell us what you need.",
        mensajeCorto: "With a little more detail we can give you a better answer.",
        mensajeLargo: "It is too long for this form. Summarise here and send the rest by email.",
        datosSinAutorizar: "We need your authorisation to process the data in order to reply.",
      },
      respuestas: {
        envioIlegible: "We could not read the submission.",
        datosInvalidos: "Check the form data.",
        envioNoConectado: "Sending from the site is not connected yet.",
        correoNoSalio: "The email did not go out.",
      },
    },
  },

  siguientePaso: {
    rotulo: "Next step",
    solicitarPropuesta: "Request a proposal",
    escribirWhatsapp: "Write on WhatsApp",
    tituloServicio: "Tell us the scope and the authority",
    textoServicio:
      "That is enough for us to tell you whether the front is ours and to put together a proposal.",
  },

  pie: {
    resumen:
      "BIOMADS is an environmental management and biodiversity company based in {sede}, Colombia, incorporated in {constitucion}. A multidisciplinary team of professionals and specialists, with work delivered in {regiones}.",
    escribanos: "Write to us",
    seccionesRotulo: "Sections",
    llamadaOWhatsapp: "call or WhatsApp",
    constituidaEn: "Incorporated in",
    politicaDatos: "Personal data policy",
    desarrollado: "Website developed in {anio}",
  },

  privacidad: privacidadEn,

  fotos: {
    "cuadrilla-ladera":
      "Two BIOMADS workers climb a slope covered in tall grass in a compensation area, with marker stakes and young planted trees.",
    "mantenimiento-individuo":
      "A worker in a hat and gloves checks a young tree surrounded by dry plant material during a maintenance day.",
    "control-fitosanitario":
      "A worker in a protective suit, respirator and backpack sprayer applies treatment to vegetation in open ground.",
    "parcela-estacas":
      "A planting plot beside a road, with young individuals in rows, marker stakes and a worker moving material in a wheelbarrow.",
    "marcacion-individuo":
      "A worker in a reflective vest checks and marks an individual flagged with a stake amid tall vegetation.",
    "revision-planta":
      "A worker in protective equipment beside a young broad-leaved plant during a field inspection.",
    "area-estudio":
      "An open grassy slope with a fence line and a BIOMADS worker at mid-distance, in a study area.",
    "siembra-ladera":
      "A BIOMADS worker secures a young plant on a slope of dense vegetation during a field day.",
    "traslado-material":
      "A worker carries a sack of material across a work site covered in vegetation, beside ferns and shrubs.",
    "siembra-via":
      "Young plants set in regular rows on ground covered with dry plant material, ready for follow-up.",
    "aspersion-ladera":
      "A worker seen from behind, sprayer on shoulder, moves along a slope of dense vegetation applying product.",
    "siembra-manual":
      "A crouching worker plants a young broad-leaved individual by hand, next to a bag of substrate.",
    "ahoyado-pradera":
      "A crouching worker digs a hole with a hand tool in an open meadow under the sun.",
    "aplicacion-fitosanitaria":
      "A worker in a protective suit, face shield and hand sprayer applies product to seedlings; the spray cloud is visible.",
    "riego-arbol-potrero":
      "A worker in a reflective vest with a backpack pump beside a mature tree in a fenced pasture.",
    "ahoyadora-via":
      "A worker in a helmet operates a mechanical auger on bare ground beside a road, with signage and a trailer in the background.",
    "ahoyadora-detalle":
      "Close-up of a mechanical auger drilling the ground beside a pile of stone and freshly planted seedlings.",
    "estaca-tutor":
      "A worker in a helmet and reflective uniform drives in a support stake with a bar beside a young individual on a slope.",
    "plateo-individuo":
      "A worker clears the ring around a young individual with a hoe on a grassy slope, leaving bare soil around it.",
    "guadana-despeje":
      "A worker with a brush cutter and face protection clears tall vegetation between young trees.",
    "fertilizacion-individuo":
      "A worker with a bag applies material at the base of a young individual on ground covered in dry leaf litter.",
    "cuadrilla-aspersion":
      "Three workers with spraying equipment work spaced out along a slope of tall grass.",
  },

  unidades: {
    meses: "months",
    y: "and",
  },
};
