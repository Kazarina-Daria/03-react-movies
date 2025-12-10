
import Searchbar from '../SearchBar/SearchBar';
import css from "./App.module.css";
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import fetchMovies from "../../services/movieService";
import type { Movie} from "../../types/movie"
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  
const [movies, setMovies] = useState<Movie[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(false);
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

const handleSubmit = async (query : string) =>{
    setMovies([]);
    setError(false);
    setIsLoading(true);
    try{
      const results = await fetchMovies(query);
 if(results.length == 0){
    toast.error("No movies found for your request.");
    setMovies([]);
    setIsLoading(false);
    return;
  } 
      setMovies(results);
      setIsLoading(false);
  } catch (error){
console.error("error fetching movies", error);
    toast.error("There was an error, please try again...");
    setError(true);
    setIsLoading(false);
  }

}

  return (
    <>
    <Searchbar onSubmit = {handleSubmit} />
   <Toaster />
   <div className={css.app}>
   {isLoading && <Loader />}
   {error && <ErrorMessage />}
   {movies.length > 0 && !isLoading && !error && <MovieGrid movies={movies} onSelect={setSelectedMovie}/>}
   </div>
    {selectedMovie && <MovieModal movie={selectedMovie} onClose={(() => setSelectedMovie(null))} />}
    </>
  )
}


