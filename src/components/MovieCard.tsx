"use client";

import React from "react";

interface MovieCardProps {
  title: string;
  poster: string;
  year: string;
}

export default function MovieCard({ title, poster, year }: MovieCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform">
      <img
        src={poster !== "N/A" ? poster : "/placeholder.png"}
        alt={title}
        className="w-full h-72 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">{year}</p>
      </div>
    </div>
  );
}
