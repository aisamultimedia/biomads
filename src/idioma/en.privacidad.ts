import type { Diccionario } from "./tipos";

/**
 * Personal data policy — English.
 *
 * TRANSLATION of es.privacidad.ts, which is itself a BASE TEXT pending
 * review by a lawyer (the list of what to confirm is in that file's
 * header). Whatever the lawyer changes in Spanish has to be mirrored here:
 * the Spanish version is the one that binds, and this one says so.
 *
 * Colombian legal instruments keep their Spanish name with a gloss on
 * first mention. Terms of art follow Law 1581 of 2012: data subject
 * (titular), data controller (responsable), data processor (encargado).
 *
 * The controller's details are not written here: {razonSocial}, {sede},
 * {correo} and {telefono} are filled in by the page from src/lib/site.ts.
 */
export const privacidadEn: Diccionario["privacidad"] = {
  rotulo: "Personal data",
  lineasTitulo: ["Personal data", "policy"],
  entradilla:
    "What data this site collects, what {razonSocial} uses it for, how long it is kept, and how you can access it, correct it or ask for it to be deleted. This is a translation; in case of doubt, the Spanish version prevails.",
  vigenciaRotulo: "In force since",
  vigencia: "2 September 2026",
  indiceRotulo: "Contents",
  secciones: [
    {
      id: "responsable",
      titulo: "Who the data controller is",
      parrafos: [
        "{razonSocial}, a company incorporated in Colombia and domiciled in {sede}, Colombia, is the controller of the personal data collected through this site.",
        "For anything related to your personal data you can write to {correo} or call {telefono}.",
      ],
    },
    {
      id: "marco-legal",
      titulo: "Legal framework",
      parrafos: [
        "This policy is governed by Article 15 of the Constitution of Colombia, Law 1581 of 2012 (Ley 1581 de 2012, Colombia's personal data protection statute), Decree 1377 of 2013 (Decreto 1377 de 2013, its implementing regulation, now compiled in Decree 1074 of 2015) and any rules that amend or supplement them.",
        "The terms “personal data”, “data subject”, “controller”, “processor”, “processing” and “authorisation” are used here with the meaning given to them by Article 3 of Law 1581 of 2012.",
      ],
    },
    {
      id: "datos",
      titulo: "What data we collect and how",
      parrafos: [
        "This site collects personal data only when you choose to send it. There are no user accounts and no profiling.",
      ],
      lista: [
        "Contact form: name, company or organisation, email address, phone number (optional), the type of service you are interested in and the message you write.",
        "Email or WhatsApp: whatever data you include when you write to us directly through those channels.",
        "Technical connection data: the provider that hosts the site may log, for security and to operate the service, data such as your IP address, the date and time of the request and the browser type. BIOMADS does not cross-reference it with the form data.",
      ],
      parrafosFinales: [
        "We do not collect sensitive data or data about minors, and we ask you not to include either in your message.",
      ],
    },
    {
      id: "finalidades",
      titulo: "What we use it for",
      parrafos: [
        "The data you send through the form, by email or on WhatsApp is processed for these purposes:",
      ],
      lista: [
        "To respond to your request and contact you through the channel you indicated.",
        "To prepare and send you a technical and financial proposal when your request calls for one.",
        "To manage the pre-contractual relationship and, if a contract follows, the contractual one, including invoicing and the legal obligations that arise from it.",
        "To keep a record of your authorisation for processing.",
      ],
      parrafosFinales: [
        "We do not use your data to send you advertising or newsletters. If we ever wanted to, we would ask for a separate authorisation, which you could refuse without affecting your request.",
        "We do not sell or hand over your data to third parties. It is seen only by the BIOMADS staff handling your request and by the providers described under “Who we share it with”.",
      ],
    },
    {
      id: "autorizacion",
      titulo: "How you authorise us",
      parrafos: [
        "In the contact form, authorisation is given by ticking the box “I authorise {razonSocial} to process the data in this form…”. Without that box the form does not send. The message we receive carries the date and time at which you ticked it, and that is the record of your authorisation, which you can ask us for at any time.",
        "When you write to us directly by email or WhatsApp, we understand that by sending us your data so that we can reply you authorise us to process it for that purpose, under Article 7 of Decree 1377 of 2013.",
        "You can withdraw your authorisation at any time through the channels described under “How to exercise your rights”, unless a legal or contractual duty requires us to keep the data.",
      ],
    },
    {
      id: "conservacion",
      titulo: "How long we keep it",
      parrafos: [
        "Data from a request that does not lead to a contract is kept while the conversation with you lasts and for up to twelve (12) months after the last communication. After that it is deleted.",
        "If the request leads to a contract, the data is kept for the duration of the contractual relationship and, afterwards, for as long as the applicable legal, accounting and tax obligations require.",
        "Messages from the form arrive at the management mailbox. The site does not store them in a database of its own.",
      ],
    },
    {
      id: "encargados",
      titulo: "Who we share it with",
      parrafos: [
        "For the site to work, two providers process data on behalf of BIOMADS, as data processors, under contractual obligations of confidentiality and security:",
      ],
      lista: [
        "Vercel Inc., which hosts the site and serves its pages.",
        "Resend, which carries the email with your message from the site to the BIOMADS mailbox.",
      ],
      parrafosFinales: [
        "These providers operate servers outside Colombia, mainly in the United States. By ticking the box in the form you authorise that transfer, which is in any case made under contracts requiring the providers to maintain adequate levels of protection, in accordance with Article 26 of Law 1581 of 2012 and Article 25 of Decree 1377 of 2013.",
        "Beyond those cases, we would hand over your data only to an authority requesting it in the exercise of its legal functions.",
      ],
    },
    {
      id: "derechos",
      titulo: "Your rights",
      parrafos: [
        "As the data subject, and in accordance with Article 8 of Law 1581 of 2012, you have the right to:",
      ],
      lista: [
        "Know, update and correct your data.",
        "Request proof of the authorisation you gave us.",
        "Be informed of the use that has been made of it.",
        "File complaints with the Superintendencia de Industria y Comercio (SIC), Colombia's data protection authority, for breaches of the law.",
        "Withdraw your authorisation or request the deletion of your data when no legal or contractual duty requires us to keep it.",
        "Access your data free of charge.",
      ],
    },
    {
      id: "ejercer",
      titulo: "How to exercise your rights",
      parrafos: [
        "Write to {correo} with the subject “Personal data”, stating your name, the channel through which you want to receive a reply and what you are requesting: to access, correct or delete your data, to withdraw your authorisation or to obtain proof of it.",
        "Enquiries are answered within a maximum of ten (10) business days from receipt. If that is not possible, we will tell you why and when we will reply, within the five (5) business days following the end of the first period.",
        "Claims are handled within a maximum of fifteen (15) business days counted from the day after receipt. If that is not possible, we will tell you why and when, within the following eight (8) business days. If a claim is incomplete, we will ask you to complete it within five (5) days; if two (2) months pass without a reply, we will take it as withdrawn.",
        "These are the periods set by Articles 14 and 15 of Law 1581 of 2012. Once the procedure before BIOMADS has been exhausted, you can turn to the Superintendencia de Industria y Comercio.",
      ],
    },
    {
      id: "seguridad",
      titulo: "How we protect it",
      parrafos: [
        "The site is served only over HTTPS, so what you type into the form travels encrypted. Messages arrive in a mailbox that only the staff handling requests can access.",
        "The hosting and email providers apply the security measures proper to their business and are bound by contract to maintain them.",
      ],
    },
    {
      id: "cookies",
      titulo: "Cookies and local storage",
      parrafos: [
        "This site does not use tracking cookies or analytics tools, and it does not load third-party scripts that track your browsing.",
        "The only things it stores in your browser, through local storage, are your answer to the cookie notice and, if you change it, your choice of language. Neither leaves your browser or makes it possible to identify you. You can delete them from your browser settings.",
        "If we ever added audience measurement, we would say so here and in the notice, and it would only be activated with your consent.",
      ],
    },
    {
      id: "vigencia",
      titulo: "Validity and changes",
      parrafos: [
        "This policy is in force from {vigencia}. If we change it, we will publish the new version on this same page with its date and, if the change affects data we already hold, we will let you know through the channel you gave us.",
      ],
    },
    {
      id: "autoridad",
      titulo: "Data protection authority",
      parrafos: [
        "The personal data protection authority in Colombia is the Superintendencia de Industria y Comercio, through its Delegatura para la Protección de Datos Personales (Deputy Superintendence for Personal Data Protection).",
      ],
      enlace: { texto: "Superintendencia de Industria y Comercio", url: "https://www.sic.gov.co" },
    },
  ],
  dudasRotulo: "Questions about this policy?",
  dudasTexto: "Write to us at",
  volver: "Back to the home page",
};
