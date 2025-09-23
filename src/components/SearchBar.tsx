"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!searchInput) return;
    router.push(`/?q=${encodeURIComponent(searchInput)}&page=1`);
  };

  return (
    <div className="flex w-full max-w-xl gap-2">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Buscar película..."
        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={handleSearch}
        className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
      >
        Buscar
      </button>
    </div>
  );
}
