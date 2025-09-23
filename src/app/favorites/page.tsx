"use client";
import { useEffect, useState } from "react";
import { useFavorites } from "@/hook/useFavorites";
import MovieCard from "@/components/MovieCard";
import { Heart } from "lucide-react";
import Image from "next/image";


export default function FavoritesPage() {
  const { favs } = useFavorites();  // 👈 ahora sí usamos favs
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!favs.length) {
      setMovies([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      const res = await Promise.all(
        favs.map((id) =>
          fetch(
            `https://www.omdbapi.com/?i=${id}&apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}`
          )
            .then((r) => r.json())
            .catch(() => null)
        )
      );
      if (!cancelled) {
        setMovies(res.filter(Boolean));
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [favs]);

 return (
 <main className="min-h-screen px-6 py-10 flex flex-col items-center"> 
  <h1 className="flex items-center justify-center text-3xl font-bold mb-10 mt-16">
   
    <span className="bg-gradient-to-r from-purple-800 to-purple-900 bg-clip-text text-transparent">
       
              <Image
                src="/favs.png"
                alt="Pelisnow favs"
                width={40}   
                height={40}
                priority
                className="drop-shadow-lg"
              /> 
    </span>
  </h1>

    
          

    {loading && <p className="text-gray-400">Cargando favoritos...</p>}

    {!loading && movies.length === 0 && (
      <p className="text-gray-400 text-lg">No tenés favoritos aún.</p>
    )}

    <div
      className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        xl:grid-cols-6
        gap-6 
        mt-6 
        w-full 
        max-w-7xl
      "
    >
      {movies.map((m) => (
        <MovieCard
          key={m.imdbID}
          id={m.imdbID}
          title={m.Title}
          poster={m.Poster}
          year={m.Year}
        />
      ))}
    </div>
  </main>
);

}
