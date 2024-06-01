// src/pages/MovieDetailsPage/MovieDetailsPage.jsx
import React, { useEffect, useState, Suspense, lazy } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../../api/api";
import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchMovieDetails(movieId);
      setMovie(data);
    };
    fetchDetails();
  }, [movieId]);

  return (
    <div className={css.container}>
      {movie && (
        <>
          <Link to="/">Go to HomePage</Link>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <nav>
            <Link to="cast">Cast</Link>
            <Link to="reviews">Reviews</Link>
          </nav>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
