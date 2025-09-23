// hooks/useFavorites.tsx
"use client";
import { useCallback, useEffect, useState } from "react";
import { FAVORITES_KEY, getFavorites, setFavorites } from "@/lib/favoritesStorage";

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    setFavs(getFavorites());
  }, []);

  useEffect(() => {
    const handler = () => setFavs(getFavorites());
    window.addEventListener("storage", handler);
    window.addEventListener("pelis_favs_changed", handler);

    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("pelis_favs_changed", handler);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const current = getFavorites();
    let updated;
    if (current.includes(id)) {
      updated = current.filter((fav) => fav !== id);
    } else {
      updated = [...current, id];
    }
    setFavorites(updated);
    setFavs(updated);
    window.dispatchEvent(new Event("pelis_favs_changed"));
  }, []);

  const isFavorite = useCallback(
    (id: string) => favs.includes(id),
    [favs]
  );

  return { favs, toggle, isFavorite };
}
