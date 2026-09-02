import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  componerMensaje,
  validarTodo,
  type CamposContacto,
  type ClaveServicioFormulario,
  type CodigoRespuesta,
} from "@/lib/validacion";
import { rotuloServicio } from "@/lib/formulario";
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

/**
 * El cuerpo trae, además de los campos, la trampa para robots: un campo
 * que la página esconde y ninguna persona rellena.
 */
type Envio = CamposContacto & { sitioWeb?: unknown };

const responder = (codigo: CodigoRespuesta, status: number, extra: object = {}) =>
  NextResponse.json({ codigo, ...extra }, { status });

export async function POST(peticion: Request) {
  let datos: Envio;

  try {
    datos = (await peticion.json()) as Envio;
  } catch {
    return responder("envioIlegible", 400);
  }

  if (!datos || typeof datos !== "object") {
    return responder("envioIlegible", 400);
  }

  /* Honeypot. Si viene relleno, quien envía no es una persona. Se responde
     como si todo hubiera ido bien y no se manda nada: un error le diría al
     robot qué cambiar en el siguiente intento. */
  if (typeof datos.sitioWeb === "string" && datos.sitioWeb.trim() !== "") {
    return NextResponse.json({ ok: true });
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

  /* `validarTodo` ya garantiza que `servicio` es una clave admitida. */
  const servicio = rotuloServicio(datos.servicio as ClaveServicioFormulario);

  /* La constancia de la autorización viaja con el mensaje: la Ley 1581 de
     2012 pide poder demostrar que el titular autorizó, y este correo es el
     único registro que existe del envío. */
  const constancia = [
    "",
    "—",
    `Autorización de tratamiento de datos: sí, ${new Date().toISOString()}`,
    "Finalidad: responder a esta solicitud (política de tratamiento de datos del sitio).",
  ].join("\n");

  try {
    const resend = new Resend(clave);
    const { error } = await resend.emails.send({
      from: remitente,
      to: process.env.CONTACTO_DESTINO ?? empresa.correo,
      replyTo: datos.correo.trim(),
      subject: `Solicitud de propuesta — ${datos.empresa.trim()} · ${servicio}`,
      text: componerMensaje(datos, servicio) + constancia,
    });

    if (error) {
      return responder("correoNoSalio", 502);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return responder("correoNoSalio", 502);
  }
}
