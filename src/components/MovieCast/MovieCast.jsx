import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../api/api";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const data = await fetchMovieCredits(movieId);
      setCast(data);
    };
    fetchCast();
  }, [movieId]);

  return (
    <div className={css.container}>
      <h2>Cast</h2>

      <ul className={css.list}>
        {cast.map((actor) => (
          <li key={actor.cast_id} className={css.item}>
            <img
              src={`https://media.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
