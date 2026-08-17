"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [proyectos, setProyectos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    fechaInicio: "",
    estado: "",
    responsable: "",
    monto: "",
  });

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const cargar = async () => {
    const res = await fetch("/api/projects", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    setProyectos(data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const crear = async (e) => {
    e.preventDefault();

    await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(form),
    });

    cargar();
  };

  const eliminar = async (id) => {
    await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    cargar();
  };

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-semibold">Dashboard</h2>

      <form
        onSubmit={crear}
        className="bg-slate-800 p-6 rounded-2xl shadow space-y-4"
      >
        <h3 className="text-xl">Nuevo Proyecto</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="Nombre"
            onChange={(e) =>
              setForm({ ...form, nombre: e.target.value })
            }
          />
          <input
            type="date"
            className="input"
            onChange={(e) =>
              setForm({ ...form, fechaInicio: e.target.value })
            }
          />
          <input
            className="input"
            placeholder="Estado"
            onChange={(e) =>
              setForm({ ...form, estado: e.target.value })
            }
          />
          <input
            className="input"
            placeholder="Responsable"
            onChange={(e) =>
              setForm({ ...form, responsable: e.target.value })
            }
          />
          <input
            className="input md:col-span-2"
            placeholder="Monto"
            onChange={(e) =>
              setForm({
                ...form,
                monto: parseFloat(e.target.value),
              })
            }
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg">
          Crear
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl">Mis proyectos</h3>

        <ul className="space-y-3">
          {Array.isArray(proyectos) &&
            proyectos.map((p) => (
              <li
                key={p.id}
                className="bg-slate-800 p-4 rounded-xl flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{p.nombre}</p>
                  <p className="text-sm text-gray-400">
                    ${p.monto}
                  </p>
                </div>

                <button
                  onClick={() => eliminar(p.id)}
                  className="text-red-400 hover:text-red-500 text-sm"
                >
                  Eliminar
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}