import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  componerMensaje,
  validarTodo,
  type CamposContacto,
  type CodigoRespuesta,
} from "@/lib/validacion";
import { empresa } from "@/lib/site";

/**
 * Recibe el formulario de contacto y lo reenvía por correo.
 *
 * Responde con un `codigo`, nunca con una frase: el texto lo pone el
 * diccionario del idioma en el que está el visitante, y el servidor no lo
 * sabe ni tiene por qué.
 *
 * Variables de entorno necesarias (en Vercel → Settings → Environment
 * Variables). Sin ellas la ruta responde 503 con un código claro y el
 * formulario ofrece WhatsApp y correo directo con el texto ya compuesto,
 * así que el visitante nunca queda sin salida:
 *
 *   RESEND_API_KEY     clave de https://resend.com
 *   CONTACTO_REMITENTE remitente verificado, p. ej. "web@biomads.com"
 *   CONTACTO_DESTINO   a dónde llegan los mensajes (por defecto, gerencia)
 */

const responder = (codigo: CodigoRespuesta, status: number, extra: object = {}) =>
  NextResponse.json({ codigo, ...extra }, { status });

export async function POST(peticion: Request) {
  let datos: CamposContacto;

  try {
    datos = (await peticion.json()) as CamposContacto;
  } catch {
    return responder("envioIlegible", 400);
  }

  // Se revalida en el servidor: la validación del navegador se puede saltar.
  const errores = validarTodo(datos);
  if (Object.keys(errores).length > 0) {
    return responder("datosInvalidos", 400, { errores });
  }

  const clave = process.env.RESEND_API_KEY;
  const remitente = process.env.CONTACTO_REMITENTE;

  if (!clave || !remitente) {
    return responder("envioNoConectado", 503);
  }

  try {
    const resend = new Resend(clave);
    const { error } = await resend.emails.send({
      from: remitente,
      to: process.env.CONTACTO_DESTINO ?? empresa.correo,
      replyTo: datos.correo.trim(),
      subject: `Solicitud de propuesta — ${datos.empresa.trim()}`,
      text: componerMensaje(datos),
    });

    if (error) {
      return responder("correoNoSalio", 502);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return responder("correoNoSalio", 502);
  }
}
