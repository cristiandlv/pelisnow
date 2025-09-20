"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const uniqueMovies = movies.filter(
    (movie, index, self) =>
      index === self.findIndex((m) => m.imdbID === movie.imdbID)
  );

  async function fetchMovies(search: string, pageNumber = 1) {
    if (!search) {
      setMovies([]);
      setTotalResults(0);
      return;
    }
    setLoading(true);
    const res = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(
        search
      )}&page=${pageNumber}&apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}`
    );
    const data = await res.json();
    setLoading(false);
    setMovies(data.Search || []);
    setTotalResults(Number(data.totalResults) || 0);
  }

  // Al cargar, tomar q y page de la URL
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const p = Number(searchParams.get("page") || "1");
    setQuery(q);
    setPage(p);
    if (q) fetchMovies(q, p);
  }, [searchParams]);

  const handleSearch = () => {
    if (!query) return;
    const nextPage = 1;
    router.push(`/?q=${encodeURIComponent(query)}&page=${nextPage}`);
    setPage(nextPage);
    fetchMovies(query, nextPage);
  };

  const handleChangePage = (nextPage: number) => {
    if (!query) return;
    router.push(`/?q=${encodeURIComponent(query)}&page=${nextPage}`);
    setPage(nextPage);
    fetchMovies(query, nextPage);
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🎬 Pelisnow</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar película..."
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
        >
          Buscar
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          uniqueMovies.map((m) => (
            <MovieCard
              id={m.imdbID}
              key={m.imdbID}
              title={m.Title}
              poster={m.Poster}
              year={m.Year}
              query={query}
              page={page}
            />
          ))
        )}
      </div>

      {/* Paginación simple */}
      {totalResults > 0 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => handleChangePage(page - 1)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-neutral-800 disabled:opacity-50"
          >
            ← Anterior
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-300">
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => handleChangePage(page + 1)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-neutral-800 disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      )}
    </main>
  );
}
