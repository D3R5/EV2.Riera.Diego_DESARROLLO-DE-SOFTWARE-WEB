import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req) {
  const user = getUserFromRequest(req);

  if (!user) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const proyectos = await prisma.proyecto.findMany({
    where: { created_by: user.id },
  });

  return Response.json(proyectos);
}

// ➕ Crear proyecto
export async function POST(req) {
  const user = getUserFromRequest(req);

  if (!user) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const data = await req.json();

  const proyecto = await prisma.proyecto.create({
    data: {
      ...data,
      fechaInicio: new Date(data.fechaInicio),
      created_by: user.id,
    },
  });

  return Response.json(proyecto);
}