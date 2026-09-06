import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

// Obtener todos los proyectos
export async function GET(req) {
  try {
    const user = getUserFromRequest(req);

    if (!user) {
      return Response.json({ error: "No autorizado" }, { status: 401 });
    }

    const proyectos = await prisma.proyecto.findMany({
      where: { created_by: user.id },
    });

    return Response.json(proyectos, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}

// ➕ Crear proyecto
export async function POST(req) {
  try {
    const user = getUserFromRequest(req);

    if (!user) {
      return Response.json({ error: "No autorizado" }, { status: 401 });
    }

    const data = await req.json();

    if (
      !data.nombre ||
      !data.fechaInicio ||
      !data.estado ||
      !data.responsable ||
      data.monto == null
    ) {
      return Response.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 },
      );
    }

    const proyecto = await prisma.proyecto.create({
      data: {
        nombre: data.nombre,
        fechaInicio: new Date(data.fechaInicio),
        estado: data.estado,
        responsable: data.responsable,
        monto: Number(data.monto),
        created_by: user.id,
      },
    });

    //  201 requerido
    return Response.json(proyecto, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}
