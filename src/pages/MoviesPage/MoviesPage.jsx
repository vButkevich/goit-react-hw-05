import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query === "") {
      setError("Please enter a valid search query.");
      return;
    }
    setSearchParams({ query: query });
    setSearchQuery("");
    setError(null);

    try {
      const data = await searchMovies(query);
      setMovies(data);
    } catch (error) {
      setError("Failed to fetch movies. Please try again later.");
    }
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className={css.error}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
