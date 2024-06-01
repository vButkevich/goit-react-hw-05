import React, { useState } from "react";
import styles from "./MovieDetailsPage.module.css";

const MoviesDetailsPage = () => {
  // const [query, setQuery] = useState("");
  // const [movies, setMovies] = useState([]);

  // const handleSearch = async (event) => {
  //   event.preventDefault();
  //   const data = []; //await searchMovies(query);
  //   setMovies(data);
  // };

  return (
    <div className={styles.container}>
      {/* <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} /> */}
    </div>
  );
};

export default MoviesDetailsPage;
