"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex items-center justify-between shadow-md">
      <h1 className="text-2xl font-bold text-red-500">🎬 Pelisnow</h1>

      <div className="flex gap-6">
        <Link href="/" className="hover:text-red-400">Inicio</Link>
        <Link href="/movies" className="hover:text-red-400">Películas</Link>
        <Link href="/about" className="hover:text-red-400">Sobre</Link>
      </div>
      <div className="flex items-center gap-3">
          <input placeholder="Buscar pelis..." className="rounded-md bg-slate-800 px-3 py-1 text-sm outline-none" />
          <button className="rounded-md border px-3 py-1 text-sm hover:bg-white/5">Sorpréndeme</button>
        </div>
    </nav>
  );
}
