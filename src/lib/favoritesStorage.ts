// lib/favoritesStorage.ts
export const FAVORITES_KEY = "pelis_favs";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function setFavorites(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    // notificar cambios en la misma pestaña
    window.dispatchEvent(new Event("pelis_favs_changed"));
  } catch {}
}

export function addFavorite(id: string) {
  const cur = getFavorites();
  if (!cur.includes(id)) {
    const next = [...cur, id];
    setFavorites(next);
    return next;
  }
  return cur;
}

export function removeFavorite(id: string) {
  const next = getFavorites().filter((x) => x !== id);
  setFavorites(next);
  return next;
}

export function isFavorite(id: string) {
  return getFavorites().includes(id);
}
