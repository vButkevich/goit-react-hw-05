import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  //   const [query, setQuery] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (query === "") return;
    async function fetcMovies() {
      const data = await searchMovies(query);
      setMovies(data);
    }
    fetcMovies();
  }, [query]);

  const handleSearch = async (event) => {
    event.preventDefault();
    // const data = await searchMovies(query);
    // setMovies(data);
    const form = event.currentTarget;
    const value = form.elements.query.value.trim();
    setSearchParams({ query: value });
    form.reset();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          value={query}
          //   onChange={(e) => setQuery(e.target.value)}
          onChange={(e) => setSearchParams({ query: e.target.value })}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
