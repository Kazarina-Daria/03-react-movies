import axios from "axios";
import type { Movie } from "../types/movie";
const BASE_URL = "https://api.themoviedb.org/3";

interface FetchMoviesResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
} 


export default async function fetchMovies (query : string, page : number) : Promise<FetchMoviesResponse>{
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

 const config = {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page : page,
    },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };
  const {data} = await axios.get<FetchMoviesResponse>(`${BASE_URL}/search/movie`, config);
  return data;
}