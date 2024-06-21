import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  // console.log("searchParams :>> ", params);
  // console.log("searchParams.q :>> ", params.get("query"));

  useEffect(() => {
    console.log("useEffect :>> ");
    const fetcMovies = async () => {
      if (query === "") {
        setMovies([]);
        return;
      }
      try {
        setIsLoading(true);
        const data = await searchMovies(query);
        setMovies(data);
      } catch (error) {
        setError(true);
        console.log("Failed to fetch movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetcMovies();
    // }, [query]);
  }, [searchQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("(e.target.value :>> ", e.target.value);
    const query = params.get("query") ?? "";
    if (query === "") {
      setError("Please enter a valid search query.");
      return;
    }
    setSearchQuery(query);
    // setParams({ query: query });
    // setSearchQuery("");
    setError(null);
  };

  const handleChange = ({ target: { value } }) => {
    console.log("handleChange.value :>> ", value);
    // setSearchQuery(value);
    params.set("query", value);
    setParams(params);
  };
  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          // value={query}
          value={params.get("query") ?? ""}
          onChange={handleChange}
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          //value={searchParams.get("query")}
          placeholder="Search movies..."
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      {error && <p className={css.error}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
