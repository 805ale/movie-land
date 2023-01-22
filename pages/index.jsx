import Head from 'next/head'
import {useEffect, useState} from 'react'
import Link from 'next/link'
import getConfig from 'next/config'
import MovieCard from './MovieCard'
import SearchIcon from "./search.svg";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`http://www.omdbapi.com?apikey=b6003d8a&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />

        <SearchIcon onClick={() => searchMovies(searchTerm)}/>
        
      </div>


        {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => 
           {
            return(
            <MovieCard movie={movie} />
            )}
          )}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
          
  );
};