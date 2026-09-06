"use client";

import { useState } from "react";
import Link from "next/link"; // 👈 IMPORTANTE

export default function Register() {

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    clave: "",
  });

  const [mostrarClave, setMostrarClave] = useState(false);

  const validarClave = (clave) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    return regex.test(clave);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.correo || !form.clave) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (!validarClave(form.clave)) {
      alert(
        "La clave debe tener mínimo 8 caracteres, una mayúscula, un número y un símbolo"
      );
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Registrado!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Registro</h2>

        <input
          className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-500"
          placeholder="Nombre"
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />

        <input
          className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-500"
          placeholder="Correo"
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
        />

        <div className="relative">
          <input
            type={mostrarClave ? "text" : "password"}
            className="w-full p-3 pr-12 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-500"
            placeholder="Clave"
            onChange={(e) => setForm({ ...form, clave: e.target.value })}
          />

          <button
            type="button"
            onClick={() => setMostrarClave(!mostrarClave)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-300 hover:text-white"
          >
            {mostrarClave ? "Ocultar" : "Ver"}
          </button>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-medium">
          Registrar
        </button>

        <p className="text-sm text-center text-slate-400">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Ingresa aquí
          </Link>
        </p>

      </form>
    </div>
  );
}