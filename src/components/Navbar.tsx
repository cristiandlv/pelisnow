"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Inicializa tema (localStorage o preferencia del sistema)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
      return;
    }
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
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
    setMenuOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <nav className="fixed top-0 left-0 w-full shadow-md z-[9999] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
  <Image
    src="/pelisnowlogo2.png"
    alt="Pelisnow Logo"
    width={120}   // ⬅️ más ancho
    height={120}
    priority
    className="h-auto md:h-16 w-auto object-contain" // ⬅️ ocupa más alto en mobile/desktop
  />
</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 font-medium items-center">
          <Link
            href="/"
            className="hover:text-purple-500 dark:hover:text-purple-300 transition"
          >
            Inicio
          </Link>
          <Link
            href="/favorites"
            className="hover:text-purple-500 dark:hover:text-purple-300 transition"
          >
            Favoritos
          </Link>
          <Link
            href="/about"
            className="hover:text-purple-500 dark:hover:text-purple-300 transition"
          >
            Sobre
          </Link>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar..."
              className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile: menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-900 px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 shadow-lg">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="hover:text-purple-500 dark:hover:text-purple-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/favorites"
              className="hover:text-purple-500 dark:hover:text-purple-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Favoritos
            </Link>
            <Link
              href="/about"
              className="hover:text-purple-500 dark:hover:text-purple-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Sobre
            </Link>

            {/* Search en móvil */}
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar..."
                className="w-full px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="self-start p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
