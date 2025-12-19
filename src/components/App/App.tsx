
import SearchBar from '../SearchBar/SearchBar';
import css from "./App.module.css";
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import fetchMovies from "../../services/movieService";
import type { Movie} from "../../types/movie"
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import ReactPaginate from "react-paginate";


export default function App() {
    const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
const [page, setPage]= useState(1);

const {data, isError,isLoading, isSuccess,refetch}= useQuery({
  placeholderData : keepPreviousData,
  queryKey :["movies", query, page],
  queryFn : () => fetchMovies(query, page),
  enabled: query !== "",
});

useEffect(()=> {
  if (isSuccess && data && data.results.length === 0){
     toast.error("No movies found for your request.");
  }
}, [isSuccess,data]);

const handleSubmit = async (newQuery : string) =>{
       if (!newQuery.trim()) {
      toast.error("Please enter a movie name.");
      return;
    }
    setQuery(newQuery);
    setPage(1);
    refetch();
}

const movies = data?.results || [];
const totalPages = data?.total_pages || 0;
  return (
    <>
    <SearchBar onSubmit = {handleSubmit} />
   <Toaster />
   <div className={css.app}>
   {isLoading && <Loader />}
   {isError && <ErrorMessage />}
   {movies.length > 0 && !isLoading && !isError && <MovieGrid movies={movies} onSelect={setSelectedMovie}/>}
   {isSuccess && movies.length > 0 &&<ReactPaginate
   pageCount={totalPages}
pageRangeDisplayed={5}
marginPagesDisplayed={1}
onPageChange={({ selected }) => setPage(selected + 1)}
forcePage={page - 1}
containerClassName={css.pagination}
activeClassName={css.active}
nextLabel="→"
previousLabel="←"
 />}
   </div>
    {selectedMovie && <MovieModal movie={selectedMovie} onClose={(() => setSelectedMovie(null))} />}
    </>
  )
}


