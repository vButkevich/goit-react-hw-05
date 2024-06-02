// src/pages/MovieDetailsPage/MovieDetailsPage.jsx
import { useEffect, useState, useRef, Suspense, lazy } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../../api/api";
import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const location = useLocation();
  const backLinkHref = useRef(location.state?.pathname ?? "/movies");
  // console.log("backLinkHref :>> ", backLinkHref);
  // console.log("location :>> ", location);
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

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
          {/* <Link to="/">Go to HomePage</Link> */}
          <Link to={backLinkHref.current} className={css.backLink}>
            Go back
          </Link>
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
