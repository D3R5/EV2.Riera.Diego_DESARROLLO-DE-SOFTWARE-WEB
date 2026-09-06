import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

// Obtener proyecto por ID
export async function GET(req, context) {
  try {
    const params = await context.params; // 👈 🔥 ESTA ES LA CLAVE

    console.log("params completo:", params);

    console.log("id raw:", params?.id);

    const user = getUserFromRequest(req);

    if (!user) {
      return Response.json({ error: "No autorizado" }, { status: 401 });
    }

    const id = parseInt(params?.id, 10);

    if (!params?.id || isNaN(id)) {
      return Response.json({ error: "ID inválido" }, { status: 400 });
    }

    const proyecto = await prisma.proyecto.findFirst({
      where: {
        id,

        created_by: user.id,
      },
    });

    if (!proyecto) {
      return Response.json({ error: "No encontrado" }, { status: 404 });
    }

    return Response.json(proyecto, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}

// Actualizar proyecto
export async function PUT(req, context) {
  try {
    const params = await context.params; // 👈 clave
    console.log("params:", params);

    const user = getUserFromRequest(req);
    if (!user) {
      return Response.json({ error: "No autorizado" }, { status: 401 });
    }

    const id = Number(params?.id);
    console.log("ID recibido:", params?.id);

    if (!params?.id || isNaN(id)) {
      return Response.json({ error: "ID inválido" }, { status: 400 });
    }

    const data = await req.json();

    const existe = await prisma.proyecto.findFirst({
      where: {
        id,
        created_by: user.id,
      },
    });

    if (!existe) {
      return Response.json({ error: "No encontrado" }, { status: 404 });
    }

    const actualizado = await prisma.proyecto.update({
      where: { id },
      data: {
        nombre: data.nombre,
        fechaInicio: new Date(data.fechaInicio),
        estado: data.estado,
        responsable: data.responsable,
        monto: Number(data.monto),
      },
    });

    return Response.json(actualizado, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}

// Eliminar proyecto
export async function DELETE(req, context) {
  try {
    const params = await context.params; // 👈 🔥 CLAVE

    console.log("params:", params);
    console.log("id raw:", params?.id);

    const user = getUserFromRequest(req);

    if (!user) {
      return Response.json({ error: "No autorizado" }, { status: 401 });
    }

    const id = parseInt(params?.id, 10);

    if (!params?.id || isNaN(id)) {
      return Response.json({ error: "ID inválido" }, { status: 400 });
    }

    const proyecto = await prisma.proyecto.findFirst({
      where: {
        id,
        created_by: user.id,
      },
    });

    if (!proyecto) {
      return Response.json({ error: "No encontrado" }, { status: 404 });
    }

    await prisma.proyecto.delete({
      where: { id },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}
