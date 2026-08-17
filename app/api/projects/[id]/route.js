import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function DELETE(req, context) {
  try {
    const user = getUserFromRequest(req);

    if (!user) {
      return Response.json({ error: "No autorizado" }, { status: 401 });
    }

    const params = await context.params;
    const id = Number(params.id);

    if (isNaN(id)) {
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

    return Response.json({ ok: true });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}