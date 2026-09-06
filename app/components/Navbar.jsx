"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    router.push("/login");
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-white font-semibold text-lg">Tech Solutions EVA3</Link>

      <div className="flex gap-4 items-center text-sm">
        <Link href="/register" className="text-zinc-300 hover:text-white">
          Register
        </Link>

        <Link href="/login" className="text-zinc-300 hover:text-white">
          Login
        </Link>

        <Link href="/dashboard" className="text-zinc-300 hover:text-white">
          Dashboard
        </Link>

        <button
          onClick={logout}
          className="bg-red-600 px-3 py-1 rounded-md text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
