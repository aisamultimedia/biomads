import type { Diccionario } from "./tipos";

/**
 * Política de tratamiento de datos personales — español.
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ TEXTO BASE. Redactado el 2 de septiembre de 2026 a partir de la     │
 * │ Ley 1581 de 2012 y el Decreto 1377 de 2013 para que el sitio no    │
 * │ salga sin política. Tiene que revisarlo un abogado antes de darlo  │
 * │ por definitivo. Lo que hay que confirmar o completar:              │
 * │                                                                     │
 * │ 1. NIT y dirección física del responsable (CONTENIDO.md los marca  │
 * │    [FALTA]). La ley pide identificar al responsable con domicilio  │
 * │    y datos de contacto; hoy va la ciudad, el correo y el teléfono. │
 * │ 2. Plazo de conservación de solicitudes sin contrato: aquí se      │
 * │    propone doce meses. Es una decisión de BIOMADS, no un dato.     │
 * │ 3. Transmisión internacional a los proveedores (Vercel, Resend):   │
 * │    el encaje con el art. 26 de la Ley 1581 y el art. 25 del        │
 * │    Decreto 1377 lo debe validar el abogado.                        │
 * │ 4. La autorización por «conducta inequívoca» cuando escriben por   │
 * │    correo o WhatsApp (art. 7 del Decreto 1377).                    │
 * │ 5. Si BIOMADS tiene un manual interno de políticas y un registro   │
 * │    ante la SIC (RNBD), enlazarlos o citarlos aquí.                 │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * Los datos del responsable no se escriben aquí: van como {razonSocial},
 * {sede}, {correo} y {telefono} y la página los rellena desde src/lib/site.ts,
 * que es el único sitio donde viven.
 */
export const privacidadEs: Diccionario["privacidad"] = {
  rotulo: "Datos personales",
  lineasTitulo: ["Política de tratamiento", "de datos personales"],
  entradilla:
    "Qué datos recoge este sitio, para qué los usa {razonSocial}, cuánto tiempo los guarda y cómo puede usted consultarlos, corregirlos o pedir que se borren.",
  vigenciaRotulo: "Vigente desde",
  vigencia: "2 de septiembre de 2026",
  indiceRotulo: "Contenido",
  secciones: [
    {
      id: "responsable",
      titulo: "Quién es el responsable",
      parrafos: [
        "{razonSocial}, sociedad constituida en Colombia con domicilio en {sede}, es la responsable del tratamiento de los datos personales que se recogen a través de este sitio.",
        "Para cualquier asunto relacionado con sus datos personales puede escribir a {correo} o llamar al {telefono}.",
      ],
    },
    {
      id: "marco-legal",
      titulo: "Marco legal",
      parrafos: [
        "Esta política se rige por el artículo 15 de la Constitución Política de Colombia, la Ley 1581 de 2012, el Decreto 1377 de 2013 —hoy compilado en el Decreto 1074 de 2015— y las normas que los modifiquen o complementen.",
        "Los términos «dato personal», «titular», «responsable», «encargado», «tratamiento» y «autorización» se usan aquí con el significado que les da el artículo 3 de la Ley 1581 de 2012.",
      ],
    },
    {
      id: "datos",
      titulo: "Qué datos recogemos y por qué vía",
      parrafos: [
        "Este sitio recoge datos personales solo cuando usted decide enviarlos. No hay registro de usuarios ni se construyen perfiles.",
      ],
      lista: [
        "Formulario de contacto: nombre, empresa o entidad, correo electrónico, teléfono (opcional), tipo de servicio que le interesa y el mensaje que escriba.",
        "Correo electrónico o WhatsApp: los datos que usted incluya al escribirnos directamente por esas vías.",
        "Datos técnicos de conexión: el proveedor que aloja el sitio puede registrar, con fines de seguridad y operación del servicio, datos como la dirección IP, la fecha y hora de la petición y el tipo de navegador. BIOMADS no los cruza con los datos del formulario.",
      ],
      parrafosFinales: [
        "No recogemos datos sensibles ni datos de menores de edad, y le pedimos que no los incluya en el mensaje.",
      ],
    },
    {
      id: "finalidades",
      titulo: "Para qué los usamos",
      parrafos: [
        "Los datos que envía por el formulario, por correo o por WhatsApp se tratan con estas finalidades:",
      ],
      lista: [
        "Responder a su solicitud y ponernos en contacto con usted por el medio que indicó.",
        "Preparar y enviarle una propuesta técnica y económica cuando su solicitud lo requiera.",
        "Gestionar la relación precontractual y, si se llega a un contrato, la contractual, incluidas la facturación y las obligaciones legales que se deriven.",
        "Conservar la constancia de su autorización para el tratamiento.",
      ],
      parrafosFinales: [
        "No usamos sus datos para enviarle publicidad ni boletines. Si en el futuro quisiéramos hacerlo, le pediríamos una autorización aparte, que podría negar sin que afecte a su solicitud.",
        "No vendemos ni cedemos sus datos a terceros. Solo los ven las personas de BIOMADS que atienden su solicitud y los proveedores que se describen en «Con quién los compartimos».",
      ],
    },
    {
      id: "autorizacion",
      titulo: "Cómo nos autoriza",
      parrafos: [
        "En el formulario de contacto, la autorización se da marcando la casilla «Autorizo a {razonSocial} a tratar los datos de este formulario…». Sin esa casilla el formulario no se envía. El mensaje que recibimos lleva la fecha y la hora en que la marcó, y esa es la constancia de su autorización, que puede pedirnos en cualquier momento.",
        "Cuando nos escribe directamente por correo o por WhatsApp, entendemos que al enviarnos sus datos para que le respondamos nos autoriza a tratarlos con ese fin, en los términos del artículo 7 del Decreto 1377 de 2013.",
        "Puede revocar la autorización en cualquier momento por los medios que se indican en «Cómo ejercer sus derechos», salvo que un deber legal o contractual nos obligue a conservar los datos.",
      ],
    },
    {
      id: "conservacion",
      titulo: "Cuánto tiempo los conservamos",
      parrafos: [
        "Los datos de una solicitud que no llega a contrato se conservan mientras dure la conversación con usted y hasta doce (12) meses después de la última comunicación. Cumplido ese plazo se eliminan.",
        "Si la solicitud da lugar a un contrato, los datos se conservan durante la relación contractual y, después, por el tiempo que exijan las obligaciones legales, contables y fiscales aplicables.",
        "Los mensajes del formulario llegan al correo de gerencia. El sitio no los almacena en una base de datos propia.",
      ],
    },
    {
      id: "encargados",
      titulo: "Con quién los compartimos",
      parrafos: [
        "Para que el sitio funcione, dos proveedores tratan datos por cuenta de BIOMADS, como encargados del tratamiento, con obligaciones contractuales de confidencialidad y seguridad:",
      ],
      lista: [
        "Vercel Inc., que aloja el sitio y sirve sus páginas.",
        "Resend, que transporta el correo con su mensaje desde el sitio hasta el buzón de BIOMADS.",
      ],
      parrafosFinales: [
        "Estos proveedores operan servidores fuera de Colombia, principalmente en Estados Unidos. Al marcar la casilla del formulario usted autoriza esa transmisión, que en todo caso se hace bajo contratos que les exigen niveles adecuados de protección, conforme al artículo 26 de la Ley 1581 de 2012 y al artículo 25 del Decreto 1377 de 2013.",
        "Fuera de esos casos, solo entregaríamos sus datos a una autoridad que los requiera en ejercicio de sus funciones legales.",
      ],
    },
    {
      id: "derechos",
      titulo: "Sus derechos",
      parrafos: [
        "Como titular de los datos, y de acuerdo con el artículo 8 de la Ley 1581 de 2012, usted tiene derecho a:",
      ],
      lista: [
        "Conocer, actualizar y rectificar sus datos.",
        "Solicitar prueba de la autorización que nos dio.",
        "Ser informado del uso que se les ha dado.",
        "Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley.",
        "Revocar la autorización o pedir la supresión de sus datos cuando no exista un deber legal o contractual que obligue a conservarlos.",
        "Acceder gratuitamente a sus datos.",
      ],
    },
    {
      id: "ejercer",
      titulo: "Cómo ejercer sus derechos",
      parrafos: [
        "Escríbanos a {correo} con el asunto «Datos personales», indicando su nombre, el medio por el que quiere recibir respuesta y qué solicita: consultar, corregir, suprimir, revocar la autorización o pedir prueba de ella.",
        "Las consultas se responden en un plazo máximo de diez (10) días hábiles desde que se reciben. Si no fuera posible, le diremos por qué y cuándo responderemos, dentro de los cinco (5) días hábiles siguientes al vencimiento del primer plazo.",
        "Los reclamos se atienden en un plazo máximo de quince (15) días hábiles contados desde el día siguiente a su recepción. Si no fuera posible, le diremos por qué y cuándo, dentro de los ocho (8) días hábiles siguientes. Si el reclamo está incompleto, le pediremos completarlo en cinco (5) días; si pasan dos (2) meses sin respuesta, entenderemos que desistió.",
        "Son los plazos de los artículos 14 y 15 de la Ley 1581 de 2012. Agotado el trámite ante BIOMADS, puede acudir a la Superintendencia de Industria y Comercio.",
      ],
    },
    {
      id: "seguridad",
      titulo: "Cómo los protegemos",
      parrafos: [
        "El sitio se sirve solo por HTTPS, así que lo que escribe en el formulario viaja cifrado. Los mensajes llegan a un buzón al que solo accede el personal que atiende las solicitudes.",
        "Los proveedores de alojamiento y de correo aplican medidas de seguridad propias de su actividad y están obligados por contrato a mantenerlas.",
      ],
    },
    {
      id: "cookies",
      titulo: "Cookies y almacenamiento local",
      parrafos: [
        "Este sitio no usa cookies de seguimiento ni herramientas de analítica, y no carga scripts de terceros que rastreen su navegación.",
        "Lo único que guarda en su navegador, mediante almacenamiento local, es su respuesta al aviso de cookies y, si la cambia, la elección de idioma. Ninguno de los dos datos sale de su navegador ni permite identificarle. Puede borrarlos desde la configuración del navegador.",
        "Si algún día añadiéramos medición de audiencia, lo diríamos aquí y en el aviso, y solo se activaría con su consentimiento.",
      ],
    },
    {
      id: "vigencia",
      titulo: "Vigencia y cambios",
      parrafos: [
        "Esta política rige desde el {vigencia}. Si la cambiamos, publicaremos la nueva versión en esta misma página con su fecha y, si el cambio afecta a datos que ya tenemos, se lo comunicaremos por el medio que nos haya indicado.",
      ],
    },
    {
      id: "autoridad",
      titulo: "Autoridad de protección de datos",
      parrafos: [
        "La autoridad de protección de datos personales en Colombia es la Superintendencia de Industria y Comercio, a través de la Delegatura para la Protección de Datos Personales.",
      ],
      enlace: { texto: "Superintendencia de Industria y Comercio", url: "https://www.sic.gov.co" },
    },
  ],
  dudasRotulo: "¿Dudas sobre esta política?",
  /** Termina justo antes del enlace al correo. */
  dudasTexto: "Escríbanos a",
  volver: "Volver a la portada",
};
