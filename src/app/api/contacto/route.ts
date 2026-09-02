import { NextResponse } from "next/server";
import { Resend } from "resend";
import { componerMensaje, validarTodo, type CamposContacto } from "@/lib/validacion";
import { empresa } from "@/lib/site";

/**
 * Recibe el formulario de contacto y lo reenvía por correo.
 *
 * Variables de entorno necesarias (en Vercel → Settings → Environment
 * Variables). Sin ellas la ruta responde 503 con un mensaje claro y el
 * formulario ofrece WhatsApp y correo directo con el texto ya compuesto,
 * así que el visitante nunca queda sin salida:
 *
 *   RESEND_API_KEY     clave de https://resend.com
 *   CONTACTO_REMITENTE remitente verificado, p. ej. "web@biomads.com"
 *   CONTACTO_DESTINO   a dónde llegan los mensajes (por defecto, gerencia)
 */

export async function POST(peticion: Request) {
  let datos: CamposContacto;

  try {
    datos = (await peticion.json()) as CamposContacto;
  } catch {
    return NextResponse.json(
      { mensaje: "No entendimos el envío." },
      { status: 400 },
    );
  }

  // Se revalida en el servidor: la validación del navegador se puede saltar.
  const errores = validarTodo(datos);
  if (Object.keys(errores).length > 0) {
    return NextResponse.json(
      { mensaje: "Revise los datos del formulario.", errores },
      { status: 400 },
    );
  }

  const clave = process.env.RESEND_API_KEY;
  const remitente = process.env.CONTACTO_REMITENTE;

  if (!clave || !remitente) {
    return NextResponse.json(
      { mensaje: "El envío desde el sitio todavía no está conectado." },
      { status: 503 },
    );
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
      return NextResponse.json(
        { mensaje: "El correo no salió." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ mensaje: "El correo no salió." }, { status: 502 });
  }
}
