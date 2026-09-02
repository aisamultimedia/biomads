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

export type CamposContacto = {
  nombre: string;
  empresa: string;
  correo: string;
  mensaje: string;
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
  | "mensajeVacio"
  | "mensajeCorto";

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
  mensaje: "",
};

/** Mínimo para que el mensaje sirva de algo al responder. */
const MINIMO_MENSAJE = 20;

export function validarCampo(
  campo: keyof CamposContacto,
  valor: string,
): CodigoError | undefined {
  const v = valor.trim();

  switch (campo) {
    case "nombre":
      return v ? undefined : "nombreVacio";

    case "empresa":
      return v ? undefined : "empresaVacia";

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
      return undefined;
    }

    case "mensaje": {
      if (!v) return "mensajeVacio";
      if (v.length < MINIMO_MENSAJE) return "mensajeCorto";
      return undefined;
    }
  }
}

export function validarTodo(campos: CamposContacto): ErroresContacto {
  const errores: ErroresContacto = {};
  for (const campo of Object.keys(campos) as (keyof CamposContacto)[]) {
    const codigo = validarCampo(campo, campos[campo]);
    if (codigo) errores[campo] = codigo;
  }
  return errores;
}

/** Texto plano del mensaje, para el correo y para el respaldo por WhatsApp. */
export function componerMensaje(campos: CamposContacto) {
  return [
    `Nombre: ${campos.nombre.trim()}`,
    `Empresa: ${campos.empresa.trim()}`,
    `Correo: ${campos.correo.trim()}`,
    "",
    campos.mensaje.trim(),
  ].join("\n");
}
