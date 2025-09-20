"use client";

import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";

export default function HomePage() {
  const [query, setQuery] = useState("Matrix");
  const [movies, setMovies] = useState<any[]>([]);

  async function fetchMovies(search: string) {
    const res = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=${process.env.NEXT_PUBLIC_oMDB_KEY}`
    );
    const data = await res.json();
    setMovies(data.Search || []);
  }

  useEffect(() => {
    fetchMovies(query);
  }, []);

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
          onClick={() => fetchMovies(query)}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
        >
          Buscar
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((m) => (
          <MovieCard
            key={m.imdbID}
            title={m.Title}
            poster={m.Poster}
            year={m.Year}
          />
        ))}
      </div>
    </main>
  );
}
