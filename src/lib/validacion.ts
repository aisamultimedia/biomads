/**
 * Validación del formulario de contacto.
 *
 * Los mensajes dicen qué pasa y cómo arreglarlo. Nunca "campo inválido".
 * Se usan igual en el cliente (en vivo) y en el servidor (route handler),
 * así que no dependen del DOM.
 */

export type CamposContacto = {
  nombre: string;
  empresa: string;
  correo: string;
  mensaje: string;
};

export type ErroresContacto = Partial<Record<keyof CamposContacto, string>>;

export const camposVacios: CamposContacto = {
  nombre: "",
  empresa: "",
  correo: "",
  mensaje: "",
};

/** Mínimo para que el mensaje sirva de algo al responder. */
const MINIMO_MENSAJE = 20;

export function validarCampo(campo: keyof CamposContacto, valor: string): string | undefined {
  const v = valor.trim();

  switch (campo) {
    case "nombre":
      if (!v) return "Escriba su nombre.";
      return undefined;

    case "empresa":
      if (!v) return "Escriba la empresa o entidad desde la que escribe.";
      return undefined;

    case "correo": {
      if (!v) return "Escriba un correo para responderle.";
      if (!v.includes("@")) return "El correo necesita un @.";
      const [usuario, ...resto] = v.split("@");
      if (!usuario) return "Falta lo que va antes del @.";
      if (resto.length > 1) return "El correo tiene más de un @.";
      const dominio = resto[0];
      if (!dominio) return "Falta el dominio después del @ — por ejemplo, empresa.com.";
      if (!dominio.includes(".")) return "Al dominio le falta un punto — por ejemplo, empresa.com.";
      if (dominio.startsWith(".") || dominio.endsWith("."))
        return "El dominio no puede empezar ni terminar en punto.";
      if (/\s/.test(v)) return "El correo no puede llevar espacios.";
      return undefined;
    }

    case "mensaje": {
      if (!v) return "Cuéntenos qué necesita radicar o ejecutar.";
      if (v.length < MINIMO_MENSAJE)
        return "Con un poco más de detalle podemos responderle mejor.";
      return undefined;
    }
  }
}

export function validarTodo(campos: CamposContacto): ErroresContacto {
  const errores: ErroresContacto = {};
  for (const campo of Object.keys(campos) as (keyof CamposContacto)[]) {
    const error = validarCampo(campo, campos[campo]);
    if (error) errores[campo] = error;
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
