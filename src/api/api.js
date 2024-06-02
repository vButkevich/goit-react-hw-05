import axios from "axios";

const bearer_token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDhjYjRhMjE0OGVjODUzODQ4MDVkZGJkNjExMGUyNyIsInN1YiI6IjY2NWIxNDM0Nzg1NGEwZjkxNzEwMzU4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v1ujo4TTOWG8pQb4EToClARNvdN7K-v3ZEWNTcm11eU";
const api_key = "8d8cb4a2148ec85384805ddbd6110e27";
const BASE_URL = "https://api.themoviedb.org/3";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: bearer_token,
  },
});

export const fetchTrendingMovies = async () => {
  const response = await instance.get("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await instance.get("/search/movie", {
    params: {
      query,
      page: 1,
      language: "en-US",
      include_adult: true,
    },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
