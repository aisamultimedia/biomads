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
    tituloProyectos: "Projects",
    tituloPrivacidad: "Personal data policy",
    descripcionPrivacidad:
      "What data the BIOMADS site collects, what it is used for, how long it is kept and how to exercise your rights under Colombia's Law 1581 of 2012.",
    descripcionProyectos:
      "Projects delivered by BIOMADS in Huila, Colombia: wildlife monitoring for the EIA of rural roads (SOLINTER, 2017) and follow-up of epiphytic flora at El Quimbo (GES, 2018).",
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
      proyectos: "Projects",
      contacto: "Contact",
    },
    idioma: "Language",
  },

  hero: {
    descriptor: "Strategic partners in environmental management and corporate sustainability",
    titulo: ["Environmental studies", "built to withstand", "the regulator's review."],
    bajada:
      "Wildlife monitoring, follow-up of relocated flora and management of environmental obligations for infrastructure projects.",
    ctaPrincipal: "Tell us about your project",
    ctaSecundario: "See completed projects",
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
    titulo: "Technical capacity sized to the scope",
    quienesSomos:
      "We are BIOMADS, a team that designs and delivers forward-looking projects for the sustainable development of society and the environment.",
    fortaleza:
      "Our main strength is the ability to adapt to the specific needs of each project, assembling a multidisciplinary team of professionals and specialists. That lets us offer tailored solutions and stay close to the client throughout the project.",
    estructuraRotulo: "Permanent structure",
    perfiles: {
      gerente: "General manager",
      "director-administrativo": "Administrative director",
      "coordinador-ambiental": "Environmental / GIS coordinator",
      "auxiliar-administrativa": "Administrative assistant",
      "lider-proyectos": "Project lead",
    },
  },

  institucional: {
    misionRotulo: "Mission",
    mision:
      "To deliver projects with excellence and commitment, promoting sustainability and respect for natural resources.",
    visionRotulo: "Vision",
    vision:
      "To be a leading company in Colombia in integrated environmental solutions, recognised for its innovation, operational excellence and commitment to sustainable development.",
    valoresRotulo: "Corporate values",
    valores: {
      excelencia: {
        nombre: "Technical excellence",
        texto:
          "Commitment to high standards of quality, precision and innovation in every project.",
      },
      sostenibilidad: {
        nombre: "Active sustainability",
        texto:
          "We promote the responsible use of natural resources and sustainable development.",
      },
      integridad: {
        nombre: "Integrity and transparency",
        texto:
          "We act with ethics, responsibility and regulatory compliance in everything we do.",
      },
      innovacion: {
        nombre: "Environmental innovation",
        texto:
          "We apply advanced, efficient technical solutions to environmental challenges.",
      },
      social: {
        nombre: "Social commitment",
        texto:
          "We create a positive impact in communities and foster respect for the environment.",
      },
    },
    politicaRotulo: "Quality policy",
    politica: [
      "At BIOMADS we are committed to planning, delivering and supervising environmental projects to high standards of quality, sustainability and responsibility.",
      "We run efficient processes with continuous improvement, ensuring compliance with current environmental regulations and the satisfaction of our clients, contributing to sustainable development and the protection of the environment.",
    ],
    objetivosRotulo: "Objectives",
    objetivos: [
      "Comply with the applicable technical and environmental regulations.",
      "Develop integrated, sustainable environmental solutions.",
      "Optimise processes.",
      "Promote continuous improvement.",
      "Ensure the satisfaction of our clients.",
    ],
  },

  promesa: {
    rotulo: "Our promise",
    enunciado: "An environmental study is measured by what holds up when someone reviews it.",
  },

  etapas: {
    rotulo: "Environmental studies",
    nombres: {
      identificacion: "Identification",
      evaluacion: "Assessment",
      prevencion: "Prevention and mitigation",
      compensacion: "Correction and compensation",
      permisos: "Permits",
    },
  },

  servicios: {
    rotulo: "Services",
    titulo: "Two fronts, documented in depth",
    pieTarjeta: "Regulatory framework, deliverable and duration",
    consultarAlcance: "Ask about a scope",
    listados: {
      "actividad-forestal": "Forestry activities",
      compensacion: "Environmental compensation plans",
      inventarios: "Forest inventories",
      "flora-fauna": "Flora and fauna",
      educacion: "Environmental education",
      "desarrollo-sostenible": "Sustainable development",
      asesoria: "Environmental advisory and management",
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
      ultimaEjecucion: "Most recent delivery",
      cta: "Tell us about your project",
      cerrar: "Close",
      paginaCompleta: "See the full page",
    },
    detalle: {
      volver: "Services",
      fichaRotulo: "The fact sheet",
      fichaTitulo: "What it covers and under which framework",
      metodoRotulo: "How it is carried out",
      metodoTitulo: "Method applied in the field",
      dificultadTitulo: "What made it difficult",
      casoRotulo: "Related case",
      casoTitulo: "Where it was delivered",
      autoridad: "Authority",
      ultimaEjecucion: "Most recent delivery",
      entregable: "Deliverable",
      informeTecnico: "Technical report",
      ejecutadoEn: "Delivered in",
      ejecucionContractual: "Most recent contract",
      marcoYMetodologia: "Regulatory framework and methodology",
      siguienteTitulo: "Tell us the scope and the authority",
    },
  },

  proyectos: {
    rotulo: "Projects",
    titulo: "Delivered and verifiable",
    verCompleto: "See the full project",
    dificultadRotulo: "The difficulty",
    resolucionRotulo: "How it was solved",
    ficha: {
      anio: "Year",
      duracion: "Duration",
      ubicacion: "Location",
      servicio: "Service",
    },
    abrirFicha: "Open the {cliente} project",
    cerrar: "Close",
    verPaginaCompleta: "See the full page",
    certificadosRotulo: "Certificates and references",
    certificadosTexto:
      "They will be published here as PDF. Until then we send them by email on request.",
    certificadoPendiente: "Certificate pending upload",
    pedirCertificados: "Request the certificates",
    detalle: {
      cliente: "Client",
      encargoRotulo: "The assignment",
      encargoTitulo: "What made it difficult and how it was solved",
      razonSocial: "Client's registered name",
      servicioRotulo: "The service",
      verFichaServicio: "See the service fact sheet",
      otroProyecto: "You can also see the other documented project:",
    },
    indice: {
      lineasTitulo: ["What we have delivered,", "with names and durations"],
      entradilla:
        "Two projects with a full record: assignment, difficulty, how it was solved and contract duration. We publish what we can substantiate, so there is no project counter or accumulated-years figure here.",
      conFichaCompleta: "With a full record",
      regiones: "Regions",
      anios: "Years",
      duraciones: "Durations",
      casosRotulo: "Cases",
      dondeRotulo: "Where",
      dondeTitulo: "Regions with delivered projects",
      dondeTexto:
        "Those are the projects we can document. We work from Ibagué and travel wherever the site requires, but we will not tell you we have nationwide coverage to win an invitation.",
    },
    casos: {
      "solinter-2017": {
        cliente: "Soluciones Integrales Internacionales S.A.S. — SOLINTER",
        clienteCorto: "SOLINTER",
        ubicacion: "Garzón and Gigante, Huila",
        encargo:
          "Wildlife biodiversity monitoring and study for the Environmental Impact Assessment (EIA) of rural road projects.",
        dificultad:
          "Obtaining representative information on wildlife biodiversity in the field, given the characteristics of the area and the conditions of the sampling itself.",
        resolucion:
          "Monitoring days and a field methodology designed to collect and organise reliable records that technically support the environmental study.",
        servicioRotulo: "Wildlife monitoring",
      },
      "ges-2018": {
        cliente: "Grupo Empresarial Surcolombiano S.A.S. — GES",
        clienteCorto: "GES",
        ubicacion: "Gigante, Huila · El Quimbo hydroelectric project",
        encargo:
          "Maintenance and follow-up of the relocated epiphytic flora belonging to the El Quimbo hydroelectric project.",
        dificultad:
          "Ensuring continuity of maintenance and follow-up of the epiphytic flora after relocation, verifying its condition throughout the contract period.",
        resolucion:
          "Periodic maintenance and follow-up activities, recording the behaviour and development of the relocated flora.",
        servicioRotulo: "Epiphytic flora",
      },
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
    titulo: "Tell us what you need to file",
    intro:
      "The scope and the authority you answer to are enough to put together a proposal.",
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
      mensajeAyuda:
        "The scope and the authority you answer to are enough for us to get started.",
      datosAntes:
        "I authorise BIOMADS S.A.S to process the data in this form in order to respond to my request, under its",
      datosEnlace: "personal data policy",
      datosDespues: ".",
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
        mensajeVacio: "Tell us what you need to file or carry out.",
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
    tituloProyectos: "Need references from a similar site?",
    textoProyectos:
      "Ask us for the details of the project closest to yours and we will tell you how it was delivered.",
    tituloServicio: "Tell us the scope and the authority",
    textoServicio:
      "That is enough for us to tell you whether the front is ours and to put together a proposal.",
  },

  pie: {
    resumen:
      "BIOMADS is an environmental studies and management company based in {sede}, Colombia, incorporated in {constitucion}. A permanent team of {equipo} people plus the specialists each project calls for, with work delivered in {regiones}.",
    escribanos: "Write to us",
    seccionesRotulo: "Sections",
    llamadaOWhatsapp: "call or WhatsApp",
    constituidaEn: "Incorporated in",
    notaCookies: "We do not use tracking cookies; only your answer to the notice is stored.",
    politicaDatos: "Personal data policy",
    desarrollado: "Website developed in {anio}",
    lema: "Dejando huella",
  },

  privacidad: privacidadEn,
  cookies: {
    region: "Cookie notice",
    texto: "We do not use tracking cookies.",
    cerrar: "Understood, close the notice",
  },

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
    personas: "people",
    y: "and",
  },
};
