"use client";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/hook/useFavorites";
import { Heart } from "lucide-react";

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  year: string;
  query?: string;
  page?: number;
}


export default function MovieCard({ id, title, poster, year }: MovieCardProps) {
  const { toggle, isFavorite } = useFavorites();
  const fav = isFavorite(id);

  return (
    <div className="group rounded-xl overflow-hidden shadow-md transition-all">
  <Link href={`/movies/${id}`} className="block">
    <div className="relative w-full aspect-[2/3]">
      
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(id);
        }}
        aria-pressed={fav}
        className="fav-btn absolute top-2 right-2 "
      >
        <Heart
          className={`${fav ? "text-purple-500" : "text-purple-300"} w-5 h-5`}
          strokeWidth={1.6}
          style={{ fill: fav ? "currentColor" : "none" }}
        />
      </button>

      {/* Poster */}
      {poster && poster !== "N/A" ? (
        <Image
          src={poster}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
          priority={false}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-neutral-800 text-gray-500">
          No image
        </div>
      )}
    </div>

    {/* Texto debajo */}
    <div className="p-2 bg-white/80 dark:bg-neutral-900/70">
      <h3 className="font-semibold text-base line-clamp-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{year}</p>
    </div>
  </Link>
</div>


  );
}
