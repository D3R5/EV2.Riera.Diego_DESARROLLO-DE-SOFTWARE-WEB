"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({
    correo: "",
    clave: "",
  });

  const [mostrarClave, setMostrarClave] = useState(false); // 👈 nuevo

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.correo.trim() || !form.clave.trim()) {
      alert("Debes completar todos los campos");
      return;
    }

    const res = await fetch("/api/auth/login", {
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

    // ✅ GUARDAR TODO
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // 🔥 Notifica a otros componentes (ej: Navbar)
    window.dispatchEvent(new Event("storage"));

    alert("Login OK");

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <input
          className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600"
          placeholder="Correo"
          onChange={(e) =>
            setForm({ ...form, correo: e.target.value })
          }
        />

        {/* 🔐 Input con botón */}
        <div className="relative">
          <input
            type={mostrarClave ? "text" : "password"}
            className="w-full p-3 pr-12 rounded-lg bg-slate-700 border border-slate-600"
            placeholder="Clave"
            onChange={(e) =>
              setForm({ ...form, clave: e.target.value })
            }
          />

          <button
            type="button"
            onClick={() => setMostrarClave(!mostrarClave)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-300 hover:text-white"
          >
            {mostrarClave ? "Ocultar" : "Ver"}
          </button>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg">
          Ingresar
        </button>
      </form>
    </div>
  );
}