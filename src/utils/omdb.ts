// src/utils/omdb.ts

const API_KEY = process.env.NEXT_PUBLIC_OMDB_KEY; 
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query: string) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();
  return data.Search || [];
}

export async function getMovieById(id: string) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  return res.json();
}
