"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MovieCard from "./MovieCard";

const TOP_MOVIE_IDS = [
  "tt1375666", // Inception
  "tt0816692", // Interstellar
  "tt0468569", // The Dark Knight
  "tt0110912", // Pulp Fiction
  "tt0109830", // Forrest Gump
];

export default function FeaturedSlider() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const results = await Promise.all(
          TOP_MOVIE_IDS.map(async (id) => {
            const res = await fetch(
              `https://www.omdbapi.com/?i=${id}&apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}`
            );
            return res.json();
          })
        );
        setMovies(results.filter((m) => m.Response === "True"));
      } catch (error) {
        console.error("Error fetching top movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMovies();
  }, []);

  if (loading) return <p className="text-center text-gray-400">Cargando destacados...</p>;

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">⭐ Películas más valoradas</h2>
      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="pb-6"
      >
        {movies.map((m) => (
          <SwiperSlide key={m.imdbID}>
            <MovieCard
              id={m.imdbID}
              title={m.Title}
              poster={m.Poster}
              year={m.Year}
            />
            <p className="text-sm text-center text-yellow-400 mt-1">
              ⭐ {m.imdbRating}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
