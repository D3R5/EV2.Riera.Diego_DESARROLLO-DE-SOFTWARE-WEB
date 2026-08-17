import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generarToken } from "@/lib/auth";

export async function POST(req) {
  const { correo, clave } = await req.json();

  if (!correo?.trim() || !clave?.trim()) {
    return Response.json(
      { error: "Todos los campos son obligatorios" },
      { status: 400 }
    );
  }

  const user = await prisma.usuario.findUnique({
    where: { correo },
  });

  if (!user) {
    return Response.json(
      { error: "Usuario no existe" },
      { status: 400 }
    );
  }

  const valid = await bcrypt.compare(clave, user.clave);

  if (!valid) {
    return Response.json(
      { error: "Clave incorrecta" },
      { status: 400 }
    );
  }

  const token = generarToken(user);

  return Response.json({
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
    },
  });
}