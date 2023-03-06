import { useEffect, useState } from "react";
import MovieList from '../components/MovieList';
import '../css/movie.css';

function Movie() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async() => {
    const movieData = await (
      await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`)
    ).json();

    setMovies(movieData.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <div className="movie-container">
        <div className="movie-header">
          <h1>CETFLIX</h1>
        </div>
        <div className="movie-wrapper">
          {
            loading
            ? <div className="movie-loading">loading...</div>
            : <ul className="movie-list">
                {movies.slice(0, 12).map((item) =>
                  <MovieList
                    key={item.id}
                    id={item.id}
                    image={item.medium_cover_image}
                    title={item.title}
                    year={item.year}
                    summary={item.summary}
                    rating={item.rating}
                    genres={item.genres}
                  />
                )}
              </ul>
          }
        </div>
      </div>
    </div>
  );
}

export default Movie;
