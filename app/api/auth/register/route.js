import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { nombre, correo, clave } = await req.json();

  if (!nombre?.trim() || !correo?.trim() || !clave?.trim()) {
    return Response.json(
      { error: "Todos los campos son obligatorios" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return Response.json(
      { error: "Correo inválido" },
      { status: 400 }
    );
  }

 const validarClave = (clave) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  return regex.test(clave.trim());
};

  if (!validarClave(clave)) {
    return Response.json(
      {
        error:
          "La clave debe tener mínimo 8 caracteres, una mayúscula, un número y un símbolo",
      },
      { status: 400 }
    );
  }

  const existe = await prisma.usuario.findUnique({
    where: { correo },
  });

  if (existe) {
    return Response.json(
      { error: "Usuario ya existe" },
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(clave, 10);

  const usuario = await prisma.usuario.create({
    data: {
      nombre,
      correo,
      clave: hash,
    },
  });

  return Response.json(usuario);
}