"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [search, setSearch] = useState("");

  // Inicializa tema (localStorage o preferencia del sistema)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
      return;
    }
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  // Cada vez que cambie tema lo aplicamos y guardamos
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/?q=${encodeURIComponent(search.trim())}&page=1`);
    setSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <nav className="fixed top-0 left-0 w-full shadow-lg z-50 bg-white dark:bg-neutral-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-purple-600">
          🎬 Pelisnow
        </Link>

        <div className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-purple-400 transition">Inicio</Link>
          <Link href="/favorites" className="hover:text-purple-400 transition">Favoritos</Link>
          <Link href="/about" className="hover:text-purple-400 transition">Sobre</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar..."
              className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
