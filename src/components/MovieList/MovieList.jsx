// import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  console.log("MovieList.location :>> ", location);

  const base_path = "https://image.tmdb.org/t/p/w500";
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <img src={`${base_path}${movie.poster_path}`} alt="" />
            {/* <img src={`${base_path}${movie.backdrop_path}`} alt="" /> */}
          </Link>
          <div>
            <h2>{movie.title}</h2>
            <p>{movie.release_date}</p>
            <p>{movie.overview}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
