"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function MovieDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [movie, setMovie] = useState<any | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}`
      );
      const data = await res.json();
      setMovie(data);
    }
    fetchMovie();
  }, [id]);

  if (!movie) return <p className="p-6">Cargando...</p>;

  const previousQuery = searchParams.get("q");
  const previousPage = searchParams.get("page");

  const handleBack = () => {
    if (previousQuery) {
      // Volver al home con la búsqueda y página exacta
      router.push(`/?q=${encodeURIComponent(previousQuery)}${previousPage ? `&page=${previousPage}` : ""}`);
    } else if (typeof window !== "undefined" && window.history.length > 1) {
      // fallback: volver por historial si existe
      router.back();
    } else {
      // fallback final: ir al home vacío
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen p-6 bg-neutral-100 dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md"
        />

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {movie.Year} • {movie.Runtime}
          </p>

          <p className="mb-4">{movie.Plot}</p>

          <ul className="space-y-2 text-sm">
            <li><span className="font-semibold">Género:</span> {movie.Genre}</li>
            <li><span className="font-semibold">Director:</span> {movie.Director}</li>
            <li><span className="font-semibold">Actores:</span> {movie.Actors}</li>
            <li><span className="font-semibold">Rating IMDb:</span> ⭐ {movie.imdbRating}</li>
          </ul>

          {/* Botón volver */}
          <button
            onClick={handleBack}
            className="mt-6 px-4 py-2 rounded-lg bg-purple-600 text-white font-medium shadow-md hover:bg-purple-700 hover:shadow-lg transition"
          >
            ← Volver
          </button>
        </div>
      </div>
    </main>
  );
}
