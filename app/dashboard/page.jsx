"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [proyectos, setProyectos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    fechaInicio: "",
    estado: "",
    responsable: "",
    monto: "",
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Cargar proyectos
  const cargar = async () => {
    try {
      const res = await fetch("/api/projects", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();
      setProyectos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  // Crear o actualizar
  const guardar = async (e) => {
    e.preventDefault();

    if (editandoId) {
      const confirmar = confirm(
        "¿Seguro que quieres actualizar este proyecto?",
      );
      if (!confirmar) return;
    }

    try {
      const method = editandoId ? "PUT" : "POST";
      const url = editandoId ? `/api/projects/${editandoId}` : "/api/projects";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Error");
        return;
      }

      setForm({
        nombre: "",
        fechaInicio: "",
        estado: "",
        responsable: "",
        monto: "",
      });

      setEditandoId(null);
      cargar();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // Eliminar
  const eliminar = async (id) => {
    const confirmacion = confirm("¿Seguro que quieres eliminar este proyecto?");
    if (!confirmacion) return;

    try {
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setProyectos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // ✏️ Cargar en formulario
  const editar = (p) => {
    setForm({
      nombre: p.nombre,
      fechaInicio: p.fechaInicio?.split("T")[0],
      estado: p.estado,
      responsable: p.responsable,
      monto: p.monto,
    });

    setEditandoId(p.id);
  };

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-semibold">Dashboard</h2>

      {/* FORM */}
      <form
        onSubmit={guardar}
        className="bg-slate-800 p-6 rounded-2xl shadow space-y-4"
      >
        <h3 className="text-xl">
          {editandoId ? "Editar Proyecto" : "Nuevo Proyecto"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />

          <input
            type="date"
            className="input"
            value={form.fechaInicio}
            onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
          />

          <select
            className="input bg-slate-800 text-white"
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value })}
            required
          >
            <option value="" className="text-white">
              Seleccionar estado
            </option>
            <option value="Activo" className="text-white">
              Activo
            </option>
            <option value="Rechazado" className="text-white">
              Rechazado
            </option>
            <option value="En Desarrollo" className="text-white">
              En Desarrollo
            </option>
          </select>

          <input
            className="input"
            placeholder="Responsable"
            value={form.responsable}
            onChange={(e) => setForm({ ...form, responsable: e.target.value })}
          />

          <input
            className="input md:col-span-2"
            placeholder="Monto"
            type="number"
            min="0"
            step="1"
            value={form.monto}
            onChange={(e) => {
              const value = e.target.value;

              // Solo números positivos
              if (/^\d*$/.test(value)) {
                setForm({
                  ...form,
                  monto: value,
                });
              }
            }}
            required
          />
        </div>

        <div className="flex gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg">
            {editandoId ? "Actualizar" : "Crear"}
          </button>

          {editandoId && (
            <button
              type="button"
              onClick={() => {
                setEditandoId(null);
                setForm({
                  nombre: "",
                  fechaInicio: "",
                  estado: "",
                  responsable: "",
                  monto: "",
                });
              }}
              className="bg-gray-500 px-6 py-2 rounded-lg"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* LISTA */}
      <div className="space-y-4">
        <h3 className="text-xl">Mis proyectos</h3>

        <ul className="space-y-3">
          {proyectos.map((p) => (
            <li
              key={p.id}
              className="bg-slate-800 p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{p.nombre}</p>
                <p className="text-sm text-gray-400">${p.monto}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setProyectoSeleccionado(p)}
                  className="text-blue-400 text-sm"
                >
                  Ver
                </button>
                <button
                  onClick={() => editar(p)}
                  className="text-yellow-400 text-sm"
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminar(p.id)}
                  className="text-red-400 hover:text-red-500 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
        {proyectoSeleccionado && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-slate-800 p-6 rounded-xl w-full max-w-md space-y-3">
              <h3 className="text-xl font-semibold">Detalle del Proyecto</h3>

              <p>
                <strong>Nombre:</strong> {proyectoSeleccionado.nombre}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {proyectoSeleccionado.fechaInicio?.split("T")[0]}
              </p>
              <p>
                <strong>Estado:</strong> {proyectoSeleccionado.estado}
              </p>
              <p>
                <strong>Responsable:</strong> {proyectoSeleccionado.responsable}
              </p>
              <p>
                <strong>Monto:</strong> ${proyectoSeleccionado.monto}
              </p>

              <button
                onClick={() => setProyectoSeleccionado(null)}
                className="bg-red-500 px-4 py-2 rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
