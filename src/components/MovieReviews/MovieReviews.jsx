import { fetchMovieReviews } from "../../api/api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await fetchMovieReviews(movieId);
      setReviews(data);
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div className={css.container}>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li key={review.id} className={css.item}>
              <img
                src={`https://media.themoviedb.org/t/p/w45_and_h45_face${review.author_details.avatar_path}`}
                alt={review.author_details.username}
              />
              <div>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
