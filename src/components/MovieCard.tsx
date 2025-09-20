"use client";

import Link from "next/link";
import Image from "next/image";

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  year: string;
  query?: string;
  page?: number;
}

export default function MovieCard({ id, title, poster, year, query, page }: MovieCardProps) {
  const qPart = query ? `?q=${encodeURIComponent(query)}${page ? `&page=${page}` : ""}` : "";
  return (
    <Link
      href={`/movies/${id}${qPart}`}
      className="block group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gray-900/50 backdrop-blur-sm p-3"
    >
      <div className="relative w-full aspect-[2/3]">
        {poster && poster !== "N/A" ? (
          <Image
            src={poster}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="font-semibold text-base text-white group-hover:text-purple-300 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-400">{year}</p>
      </div>
    </Link>
  );
}
