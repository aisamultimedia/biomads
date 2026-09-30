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
    descripcionProyectos:
      "Six BIOMADS projects with a full record: PAGA and an early-warning system for Autopista Río Magdalena, biotic compensation over 88.54 ha, landscape recovery, epiphytic flora at El Quimbo and wildlife biodiversity for an EIA.",
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
      proyectos: "Projects",
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
      "BIOMADS helps organisations meet and demonstrate their environmental commitments, from the obligations of their projects to their corporate sustainability targets, turning field work into verifiable results for biodiversity, communities and the business.",
    visionRotulo: "Vision",
    vision:
      "By 2030, BIOMADS will be recognised across Colombia's Andean region as the reference technical partner in biodiversity and corporate sustainability, for the verifiable quality of its results and for supporting companies in many sectors through their transition towards business models that are positive for sustainability.",
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
    categorias: {
      biodiversidad: {
        nombre: "Biodiversity and ecosystems",
        items: [
          { nombre: "Wildlife and flora monitoring and characterisation" },
          { nombre: "Epiphytic flora" },
          { nombre: "Biodiversity follow-up and management" },
        ],
      },
      forestal: {
        nombre: "Forest management and compensation",
        items: [
          { nombre: "Forest inventories" },
          { nombre: "Forestry activities" },
          { nombre: "Environmental compensation plans" },
          { nombre: "Restoration and follow-up" },
        ],
      },
      estudios: {
        nombre: "Environmental studies and management",
        items: [
          { nombre: "Environmental studies" },
          { nombre: "Environmental advisory and management" },
          { nombre: "Follow-up of environmental obligations and requirements" },
        ],
      },
      sostenibilidad: {
        nombre: "Sustainability and environmental education",
        items: [
          {
            /* El nombre del programa es un activo de marca y no se traduce,
               igual que «Dejando huella»: va tal cual con una glosa que dice
               de qué es. */
            nombre: "«Siembra Verificable» corporate planting programme",
            nota: "Colombia's Law 2173 of 2021",
          },
          { nombre: "Corporate environmental volunteering" },
          { nombre: "Environmental education" },
          { nombre: "Sustainable development" },
          { nombre: "Support for environmental and territorial initiatives" },
        ],
      },
    },
  },

  proyectos: {
    rotulo: "Featured projects",
    titulo: "Work that makes a difference",
    entradilla:
      "Projects we have delivered, each with its full technical record. Open them right here, without leaving the page.",
    cifras: {
      fichas: "Projects on record",
      hectareas: "Hectares in compensation",
      desde: "First contract",
    },
    estados: {
      "en-ejecucion": "In progress",
      ejecutado: "Delivered",
    },
    ficha: {
      estado: "Status",
      cliente: "Client",
      periodo: "Period",
      sector: "Sector",
      servicio: "Service",
      alcance: "Project scope",
    },
    casos: {
      paga: {
        titulo: "Update and preparation of the PAGA",
        cliente: "Concesionaria Autopista Río Magdalena S.A.S. (ALEATICA)",
        clienteCorto: "Autopista Río Magdalena",
        sector: "Road infrastructure (4G concessions)",
        servicio: "PAGA",
        alcance:
          "Update and preparation of the PAGA —Colombia's environmental guideline adaptation plan for road works— for four functional units, under INVIAS Resolution 2335 of 2022.",
        etiquetas: ["PAGA", "SAT", "Environmental follow-up", "Environmental management"],
      },
      sat: {
        titulo: "Roll-out of the early warning system (SAT)",
        cliente: "Concesionaria Autopista Río Magdalena S.A.S. (ALEATICA)",
        clienteCorto: "Autopista Río Magdalena",
        sector: "Road infrastructure · risk management",
        servicio: "SAT · hydrometeorological monitoring",
        alcance:
          "Automated capture of hydrometeorological data from the GOES-16 and GOES-19 satellites and from IDEAM, Colombia's weather service. Development of the APIs that feed real-time alerts into the project's SCADA system and LED signs, under Decree 2157 of 2017.",
        etiquetas: ["SAT", "SCADA", "Decree 2157/2017", "Environmental monitoring"],
      },
      "compensacion-biotica": {
        titulo: "Integrated biotic environmental compensation plan",
        cliente: "Concesionaria Autopista Río Magdalena S.A.S. · Consorcio BioPro",
        clienteCorto: "Autopista Río Magdalena · BioPro",
        sector: "Road infrastructure",
        servicio: "Environmental compensation",
        alcance:
          "Delivery and follow-up of the biodiversity loss compensation plan over 88.54 hectares, under ANLA Resolutions 707 of 2016 and 1109 of 2017. Includes the forest protection order with Corantioquia (Tabebuia chrysantha and Hymenaea courbaril), management of relocated epiphytic flora and monitoring of threatened wildlife (striped catfish and river turtle).",
        etiquetas: [
          "Environmental compensation",
          "Biodiversity",
          "88.54 ha",
          "Environmental management",
          "Follow-up",
        ],
      },
      embellecimiento: {
        titulo: "Landscape recovery and enhancement",
        cliente: "Concesionaria Autopista Río Magdalena S.A.S.",
        clienteCorto: "Autopista Río Magdalena",
        sector: "Road infrastructure",
        servicio: "Landscape enhancement",
        alcance:
          "Delivery of landscape improvement works, floristic enrichment of one hectare and vegetation restoration in operating areas, roundabouts and the zones of influence of the concession's road corridor.",
        etiquetas: [
          "Landscape enhancement",
          "Landscaping",
          "Environmental management",
          "Floristic enrichment",
        ],
      },
      "flora-epifita-quimbo": {
        titulo: "Epiphytic flora maintenance — El Quimbo hydroelectric project",
        cliente: "Grupo Empresarial Surcolombiano S.A.S.",
        clienteCorto: "Grupo Empresarial Surcolombiano",
        sector: "Energy · hydroelectric",
        servicio: "Flora conservation and management",
        alcance:
          "Maintenance, monitoring and technical follow-up of epiphytic flora rescued and relocated in the municipality of Gigante (Huila), within the area of influence of the El Quimbo hydroelectric project.",
        etiquetas: ["Epiphytic flora", "Environmental management"],
      },
      "fauna-solinter": {
        titulo: "Wildlife biodiversity study for an EIA",
        cliente: "Soluciones Integrales Internacionales S.A.S. (SOLINTER)",
        clienteCorto: "SOLINTER",
        sector: "Rural road infrastructure",
        servicio: "Environmental consultancy and planning",
        alcance:
          "Characterisation and monitoring of wildlife biodiversity for the Environmental Impact Assessment (EIA) of rural roads in Garzón and Gigante (Huila).",
        etiquetas: ["EIA"],
      },
    },
  },

  galeria: {
    rotulo: "In the field",
    titulo: "What the work looks like",
    texto:
      "Days of setting out, ground preparation, planting and maintenance, photographed at the sites where they were carried out.",
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
    directoRotulo: "Write to us directly",
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
    solicitarPropuesta: "Request a proposal",
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
    "campo-abierto":
      "Two workers with backpack sprayers treat the green strip between the carriageway and the cut slope of a road, with the earth cut and a truck behind.",
    "individuos-en-hilera":
      "Young plants set in rows on ground covered with dry plant material, with the forest edge behind.",
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

    "trazado-parcela":
      "A worker in a helmet and reflective vest marks out a plot with lime, staked with wooden pegs, beside a road.",
    "encalado-berma":
      "A worker spreads a white soil amendment from a bucket over a road verge, next to a concrete drainage channel.",
    "carga-piedra":
      "A worker in a helmet loads stone into two wheelbarrows beside a pile, at the edge of a road.",
    "cuadrilla-piedra":
      "Three workers around a pile of stone; one works a rock with a power tool run off a portable generator.",
    "lineas-piedra":
      "A crew of four lays lines of stone across a flat plot, with wheelbarrows and hills behind.",
    "banda-piedra":
      "A finished band of stone in the foreground; behind it, two workers prepare the next one among layout stakes.",
    "cuadrilla-terreno":
      "Four BIOMADS workers, in a row and bent over, work the bare soil of a plot beside a road.",
    "talud-cuneta":
      "Two workers use hand tools on the earth slope next to a culvert mouth, under a cloudy sky.",
    "jardin-piedra":
      "A worker checks a band of stone between strips of established green groundcover, beside a road.",
  },

  unidades: {
    meses: "months",
    y: "and",
  },
};
