import type { ClaveServicio, ClaveServicioListado } from "@/idioma/tipos";

/**
 * Validación del formulario de contacto.
 *
 * Devuelve **códigos**, no frases. El texto vive en el diccionario de cada
 * idioma, así que este módulo no tiene que saber en qué lengua está el
 * visitante: se usa igual en el cliente (validación en vivo) y en el
 * servidor (route handler), y ninguno de los dos emite prosa.
 *
 * Los códigos son específicos a propósito. Un único "campo inválido" obliga
 * a adivinar; "al dominio le falta un punto" se arregla solo.
 */

/**
 * Lo que se puede elegir en "tipo de servicio": los dos servicios con ficha,
 * los siete del listado y una salida para quien no sabe cuál es el suyo.
 * Es la lista de valores admitidos; el servidor rechaza cualquier otro.
 */
export const CLAVES_SERVICIO = [
  "monitoreo-fauna",
  "flora-epifita",
  "actividad-forestal",
  "compensacion",
  "inventarios",
  "flora-fauna",
  "educacion",
  "desarrollo-sostenible",
  "asesoria",
  "otro",
] as const;

export type ClaveServicioFormulario = (typeof CLAVES_SERVICIO)[number];

/* Si aparece un servicio nuevo en el diccionario y no se añade arriba, esto
   deja de compilar. Es la única razón de que exista. */
type ServicioSinOpcion = Exclude<
  ClaveServicio | ClaveServicioListado | "otro",
  ClaveServicioFormulario
>;
const _todosLosServiciosTienenOpcion: ServicioSinOpcion extends never ? true : never = true;
void _todosLosServiciosTienenOpcion;

export type CamposContacto = {
  nombre: string;
  empresa: string;
  correo: string;
  /** Opcional: solo se valida si el visitante escribe algo. */
  telefono: string;
  /** Vacío hasta que elige; una clave de CLAVES_SERVICIO después. */
  servicio: string;
  mensaje: string;
  /**
   * Autorización de tratamiento de datos (Ley 1581 de 2012). Obligatoria:
   * sin ella no se puede usar el correo del visitante ni para responderle.
   */
  aceptaDatos: boolean;
};

/** Un código por cosa que puede ir mal, no uno por campo. */
export type CodigoError =
  | "nombreVacio"
  | "empresaVacia"
  | "correoVacio"
  | "correoSinArroba"
  | "correoSinUsuario"
  | "correoDosArrobas"
  | "correoSinDominio"
  | "correoDominioSinPunto"
  | "correoDominioConPuntoSuelto"
  | "correoConEspacios"
  | "telefonoInvalido"
  | "servicioVacio"
  | "servicioDesconocido"
  | "mensajeVacio"
  | "mensajeCorto"
  | "mensajeLargo"
  | "datosSinAutorizar";

export type ErroresContacto = Partial<Record<keyof CamposContacto, CodigoError>>;

/**
 * Lo que puede responder `/api/contacto`. Mismo criterio que arriba: el
 * servidor devuelve un código y el texto lo pone el diccionario del idioma
 * en el que está el visitante, que el servidor no tiene por qué conocer.
 */
export type CodigoRespuesta =
  | "envioIlegible"
  | "datosInvalidos"
  | "envioNoConectado"
  | "correoNoSalio";

export const camposVacios: CamposContacto = {
  nombre: "",
  empresa: "",
  correo: "",
  telefono: "",
  servicio: "",
  mensaje: "",
  aceptaDatos: false,
};

/** Orden visual de los campos: sirve para llevar el foco al primer error. */
export const ORDEN_CAMPOS: readonly (keyof CamposContacto)[] = [
  "nombre",
  "empresa",
  "correo",
  "telefono",
  "servicio",
  "mensaje",
  "aceptaDatos",
];

/** Mínimo para que el mensaje sirva de algo al responder. */
const MINIMO_MENSAJE = 20;
/** Techo generoso: un pliego de condiciones no cabe aquí y no debería. */
const MAXIMO_MENSAJE = 4000;
/** Nombres, empresas y correos: nada legítimo pasa de aquí. */
const MAXIMO_CORTO = 200;

function esClaveServicio(valor: string): valor is ClaveServicioFormulario {
  return (CLAVES_SERVICIO as readonly string[]).includes(valor);
}

export function validarCampo<K extends keyof CamposContacto>(
  campo: K,
  valor: CamposContacto[K],
): CodigoError | undefined {
  /* Del servidor puede llegar cualquier cosa; se normaliza antes de mirar. */
  const v = typeof valor === "string" ? valor.trim() : "";

  switch (campo) {
    case "nombre":
      if (!v) return "nombreVacio";
      return v.length > MAXIMO_CORTO ? "mensajeLargo" : undefined;

    case "empresa":
      if (!v) return "empresaVacia";
      return v.length > MAXIMO_CORTO ? "mensajeLargo" : undefined;

    case "correo": {
      if (!v) return "correoVacio";
      if (/\s/.test(v)) return "correoConEspacios";
      if (!v.includes("@")) return "correoSinArroba";
      const [usuario, ...resto] = v.split("@");
      if (!usuario) return "correoSinUsuario";
      if (resto.length > 1) return "correoDosArrobas";
      const dominio = resto[0];
      if (!dominio) return "correoSinDominio";
      if (dominio.startsWith(".") || dominio.endsWith("."))
        return "correoDominioConPuntoSuelto";
      if (!dominio.includes(".")) return "correoDominioSinPunto";
      return v.length > MAXIMO_CORTO ? "mensajeLargo" : undefined;
    }

    case "telefono": {
      if (!v) return undefined;
      /* Se admite como lo escribe la gente: espacios, guiones, paréntesis y
         un + delante. Lo que cuenta son los dígitos: entre 7 (fijo local)
         y 15 (máximo internacional, E.164). */
      const digitos = v.replace(/^\+/, "").replace(/[\s().-]/g, "");
      if (!/^\d{7,15}$/.test(digitos)) return "telefonoInvalido";
      return undefined;
    }

    case "servicio":
      if (!v) return "servicioVacio";
      return esClaveServicio(v) ? undefined : "servicioDesconocido";

    case "mensaje": {
      if (!v) return "mensajeVacio";
      if (v.length < MINIMO_MENSAJE) return "mensajeCorto";
      if (v.length > MAXIMO_MENSAJE) return "mensajeLargo";
      return undefined;
    }

    case "aceptaDatos":
      return valor === true ? undefined : "datosSinAutorizar";
  }
}

export function validarTodo(campos: CamposContacto): ErroresContacto {
  const errores: ErroresContacto = {};
  for (const campo of ORDEN_CAMPOS) {
    const codigo = validarCampo(campo, campos[campo]);
    if (codigo) errores[campo] = codigo;
  }
  return errores;
}

/**
 * Texto plano del mensaje, para el correo y para el respaldo por WhatsApp.
 * El rótulo del servicio llega de fuera: aquí solo hay claves.
 */
export function componerMensaje(campos: CamposContacto, servicioRotulo: string) {
  return [
    `Nombre: ${campos.nombre.trim()}`,
    `Empresa: ${campos.empresa.trim()}`,
    `Correo: ${campos.correo.trim()}`,
    `Teléfono: ${campos.telefono.trim() || "—"}`,
    `Servicio: ${servicioRotulo}`,
    "",
    campos.mensaje.trim(),
  ].join("\n");
}
