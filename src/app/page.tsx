"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import Hero from "@/components/Hero";
import FeaturedSlider from "@/components/FeaturedSlider";

function MoviesGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState<string>("");
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
    if (!search) return;
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

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const p = Number(searchParams.get("page") || "1");

    if (!q) {
      setQuery("");
      setPage(1);
      setMovies([]);
      setTotalResults(0);
      return;
    }

    setQuery(q);
    setPage(p);
    fetchMovies(q, p);
  }, [searchParams]);

  const handleSearch = () => {
    if (!searchInput) return;
    const nextPage = 1;
    setQuery(searchInput);
    router.push(`/?q=${encodeURIComponent(searchInput)}&page=${nextPage}`, {
      scroll: false,
    });
    setPage(nextPage);
    fetchMovies(searchInput, nextPage);
  };

  const handleChangePage = (nextPage: number) => {
    if (!query) return;
    router.push(`/?q=${encodeURIComponent(query)}&page=${nextPage}`, {
      scroll: false,
    });
    setPage(nextPage);
    fetchMovies(query, nextPage);
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <>
      <Hero
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
      />

      <main className="p-6 max-w-7xl mx-auto">
        {loading && (
          <main className="min-h-screen flex items-center justify-center">
            <div className="loading-spinner"></div>
          </main>
        )}

        {!loading && query && uniqueMovies.length === 0 && (
          <p className="no-results">
            No se encontraron resultados para "{query}" 😢
          </p>
        )}

        {!loading && uniqueMovies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {uniqueMovies.map((m) => (
              <MovieCard
                id={m.imdbID}
                key={m.imdbID}
                title={m.Title}
                poster={m.Poster}
                year={m.Year}
                query={query}
                page={page}
              />
            ))}
          </div>
        )}

        {query && totalResults > 0 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => handleChangePage(page - 1)}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-neutral-800 disabled:opacity-50"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
              .map((p) => (
                <button
                  key={p}
                  onClick={() => handleChangePage(p)}
                  className={`px-3 py-1 rounded ${
                    p === page
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700"
                  }`}
                >
                  {p}
                </button>
              ))}

            <button
              disabled={page >= totalPages}
              onClick={() => handleChangePage(page + 1)}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-neutral-800 disabled:opacity-50"
            >
              →
            </button>
          </div>
        )}
      </main>
      <FeaturedSlider />
    </>
  );
}

export default function HomePage() {
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <Suspense fallback={<p className="text-center">Cargando PelisNow...</p>}>
        <MoviesGrid />
      </Suspense>
    </div>
  );
}
