import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
