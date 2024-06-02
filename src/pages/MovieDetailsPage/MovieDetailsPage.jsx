import { useEffect, useState, useRef, Suspense, lazy } from "react";
import { useParams, useLocation, NavLink, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../../api/api";
import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const location = useLocation();
  const backLinkRef = useRef(location.state?.pathname ?? "/movies");
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
      <NavLink to={backLinkRef.current} className={css.backLink}>
        Go back
      </NavLink>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <nav className={css.nav}>
            <NavLink
              to="cast"
              className={({ isActive }) =>
                isActive ? css.activeLink : css.link
              }
            >
              Cast
            </NavLink>
            <NavLink
              to="reviews"
              className={({ isActive }) =>
                isActive ? css.activeLink : css.link
              }
            >
              Reviews
            </NavLink>
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
