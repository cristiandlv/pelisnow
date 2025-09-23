"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface HeroProps {
  searchInput: string;
  setSearchInput: (val: string) => void;
  onSearch: () => void;
}

// 🎥 Colección curada de backdrops de películas/cine
const movieImages = [
  "https://wallpapers.com/images/hd/1920x1080-hd-movie-1920-x-1080-cg9m1fvi3n1wpdmk.jpg", // Interstellar
  "https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg", // The Batman
  "https://m.media-amazon.com/images/S/pv-target-images/1cab09d337e2e87b8cd622243998334d27ecd9860a11a8d670f799e7c9a13d1e.png", // Blade Runner 2049
  "https://image.tmdb.org/t/p/original/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg", // The Godfather
  "https://image.tmdb.org/t/p/original/iaNk0tQ6xHHPx2PobDSI5Lr6sMK.jpg", // Inception
  "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg", // Lord of the Rings
  "https://cdn.mos.cms.futurecdn.net/VgrvP9xWNBFxE7zdh4Ad2a.jpg", // Joker
  "https://cdn.mos.cms.futurecdn.net/bb8YmxMtSyFHgK959BK3TH.jpg" , // Avengers Endgame
  "https://m.media-amazon.com/images/S/pv-target-images/fe5fb13cf94c30b88dbe92c858e6da9727a7cc8b689da2c807353796b54247d3.jpg", // Spirited Away
  // Fondo de sala de cine (unsplash, neutro)
  "https://www.shutterstock.com/image-photo/cinema-blank-wide-screen-people-600nw-2314929885.jpg",
];

export default function Hero({ searchInput, setSearchInput, onSearch }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotación automática
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movieImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center text-gray-900 dark:text-white overflow-hidden">
      {/* Imagenes rotativas */}
      {movieImages.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Fondo ${idx}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            idx === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-white/60 dark:to-black/70" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Descubrí las mejores películas
        </h1>
        <p className="text-lg md:text-xl mb-6 drop-shadow-md">
          Buscá, explorá y encontrá tu próxima favorita 🍿
        </p>

        {/* Buscador */}
        <div className="flex w-full max-w-xl gap-2 bg-white dark:bg-neutral-900 rounded-lg p-2 shadow-lg">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Escribí el título..."
            className="flex-grow px-3 py-2 text-gray-800 dark:text-gray-100 bg-transparent rounded-md focus:outline-none"
          />
          <button
            onClick={onSearch}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition"
          >
            <Search size={18} />
            Buscar
          </button>
        </div>
      </div>
    </section>
  );
}
